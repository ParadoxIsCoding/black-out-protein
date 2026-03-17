import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') }); // Load .env from root

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables. Please check your .env file.');
}

console.log(`[Config] STRIPE_SECRET_KEY loaded: ${!!process.env.STRIPE_SECRET_KEY}`);
console.log(`[Config] STRIPE_WEBHOOK_SECRET loaded: ${!!process.env.STRIPE_WEBHOOK_SECRET}`);
console.log(`[Config] PORT: ${process.env.PORT || 3000}`);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const app = express();
const port = process.env.PORT || 3000;

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(cors());

const PRODUCT_PRICE_MAP = {
  'strawberry-880g': 'price_1TBuefAzLUywsIqPk8XTuQWo',
  'vanilla-880g': 'price_1TBueCAzLUywsIqPQjVSwZ7V',
  'chocolate-880g': 'price_1TBufpAzLUywsIqPC1oEy6q7',
  'salted-caramel-880g': 'price_1TBuitAzLUywsIqPhtIrNlRt',
  'vanilla-440g': 'price_1TBudkAzLUywsIqPnTRiQMl6',
  'chocolate-440g': 'price_1TBuhgAzLUywsIqPi2gfzAmO',
  'strawberry-440g': 'price_1TBuexAzLUywsIqPjyMyyOAy',
  'salted-caramel-440g': 'price_1TBuiQAzLUywsIqPSPSyVxjM',
};

// Your active Stripe shipping rate ID
const SHIPPING_RATE_ID = 'shr_1TB5DWAzLUywsIqPA87v8kMq';

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Create Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid' });
    }

    const line_items = cart.map((item) => {
      const priceId = PRODUCT_PRICE_MAP[item.id];

      if (!priceId) {
        throw new Error(`Product price mapping not found for cart item: ${item.id}`);
      }

      return {
        price: priceId,
        quantity: item.quantity,
      };
    });

    // Dynamically get the front-end origin, effectively bypassing hardcoded Vite ports
    const baseUrl = process.env.CLIENT_URL || req.headers.origin || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,

      shipping_address_collection: {
        allowed_countries: ['AU'],
      },

      shipping_options: [
        {
          shipping_rate: SHIPPING_RATE_ID,
        },
      ],

      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook Handler
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log(`Checkout Session ${session.id} was successful!`);
      // Fulfill the purchase (e.g. save to database, send confirmation email)
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on('beforeExit', (code) => console.log('beforeExit', code));
process.on('exit', (code) => console.log('exit', code));
process.on('uncaughtException', (err) => console.error('uncaughtException', err));
process.on('unhandledRejection', (err) => console.error('unhandledRejection', err));