import React, { useState } from 'react';
import { useCart } from './CartContext';
import { productsData, type ProductSize } from '../data/products';
import { getDisplayPrices, getEffectivePrice } from '../utils/saleLogic';
import { Star, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

import Header from './Header';
import Footer from './Footer';

import chocolateTable from '../assets/chochlatetable.png';
import saltedCaramelTable from '../assets/scaltable.png';
import strawberryTable from '../assets/strawberrytable.png';
import vanillaTable from '../assets/vanillatable.png';

const nutritionTableImages: Record<string, string> = {
  'salted-caramel': saltedCaramelTable,
  'strawberry': strawberryTable,
  'chocolate': chocolateTable,
  'vanilla': vanillaTable,
};

interface Review {
  name: string;
  text: string;
  stars: number;
}

interface ProductPageContent {
  description: React.ReactNode;
  proteinPerServe: string;
  creatinePerServe: string;
  badges: string[];
  veganBadge: boolean;
  overallRating: number;
  reviews: Review[];
}

const productPageData: Record<string, ProductPageContent> = {
  'salted-caramel': {
    description: (
      <>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Our <strong>Salted Caramel</strong> recovery formula is scientifically curated to be the best tasting and easiest mixing <strong>plant protein</strong> on the market.
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          <strong>No</strong> soy, dairy or fillers in this. Just clean, micronized protein and creatine to boost your recovery and performance in all athletic pursuits.
        </p>
      </>
    ),
    proteinPerServe: '26g',
    creatinePerServe: '4g',
    badges: ['Soy & Dairy Free', 'No Fillers or Gums', 'Aussie Made'],
    veganBadge: true,
    overallRating: 4.9,
    reviews: [
      { name: 'Nate W', text: 'Best protein powder on the market, added creatine saves me money as I don\'t have to buy 2 supplements. The taste is amazing, i would personally recommend the vanilla or salted caramel flavors', stars: 5 },
      { name: 'George F', text: '"Didn\'t expect plant protein to taste this good. The salted caramel flavour is unreal and it mixes way smoother than others I\'ve tried."', stars: 5 },
      { name: 'Stacy M', text: '"Perfect after training. Love that it already has creatine in it so I don\'t need another supplement."', stars: 5 },
      { name: 'Daniel K', text: '"Tastes like an actual dessert shake but still feels clean. Easily the best salted caramel protein I\'ve had."', stars: 5 },
      { name: 'Emma R', text: '"Great flavour and no weird aftertaste. I\'ve been using it after the gym and recovery feels noticeably better."', stars: 5 },
      { name: 'Liam S', text: '"Super smooth for a plant protein and the caramel flavour is spot on. Will definitely buy again."', stars: 5 },
      { name: 'Harry K', text: '"Salted caramel is a nice flavour and sits well in my stomach. Overall great product"', stars: 4 },
      { name: 'Liam R', text: 'I\'ve tried a lot of protein powders and most of them just feel the same. This one genuinely hits different. Recovery is quicker and I feel stronger in my sessions, especially with the creatine already included. Salted caramel flavour is unreal too. Definitely keeping this in my stack.', stars: 5 },
      { name: 'Nick F', text: 'You can tell this isn\'t just another cheap protein. The blend feels quality, no bloating, and it actually supports strength gains. I like that it\'s vegan too. For the price, it\'s honestly hard to beat', stars: 5 },
    ]
  },
  'strawberry': {
    description: (
      <>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Our <strong>Strawberry</strong> recovery formula is scientifically curated to be the best tasting and easiest mixing <strong>collagen and whey protein</strong> available.
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          The <strong>10 grams of hydrolysed collagen</strong> in every serve supports a healthy body and maintain healthier hair, skin and nails. On top of this, the <strong>4g creatine</strong> supports faster recovery, muscle mass gain and boosts energy through ATP regeneration.
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          <strong>25 grams protein</strong> per serve to rebuild muscles through MPS, allowing you to train harder more often.
        </p>
      </>
    ),
    proteinPerServe: '25g',
    creatinePerServe: '4g',
    badges: ['Added Collagen', 'No Fillers or Gums', 'Aussie Made'],
    veganBadge: false,
    overallRating: 4.9,
    reviews: [
      { name: 'Greg W', text: '"Honestly one of the smoothest protein powders I\'ve had. The strawberry flavour is light and creamy rather than overly sweet, which makes it really easy to drink after training. Having whey, collagen, and creatine all in one scoop is super convenient."', stars: 5 },
      { name: 'Molly P', text: '"I usually struggle with protein powders being too heavy or chalky, but this one is the opposite. The texture is really smooth and the strawberry flavour tastes natural. Love that it includes collagen as well."', stars: 5 },
      { name: 'Denise R', text: '"The recovery formula concept is what sold me. Instead of taking separate creatine and protein, it\'s all in one shake. The strawberry flavour is really balanced and mixes perfectly with milk."', stars: 5 },
      { name: 'Emily P', text: '"I\'ve tried a lot of protein powders and this is one of the easiest to drink. It\'s light but still creamy, and the strawberry taste is really nice without being artificial."', stars: 5 },
      { name: 'Kaleb S', text: '"Great post-workout shake. The texture is smooth, no clumps, and the flavour reminds me of a strawberry milkshake but lighter. Definitely a solid recovery product."', stars: 5 },
      { name: 'Ollie Y', text: '"I love that this combines whey protein, collagen, and creatine. It simplifies my supplement routine a lot. The strawberry flavour is fresh and the powder mixes really well."', stars: 5 },
      { name: 'Noah C', text: '"Really impressed with the mixability. It dissolves quickly and doesn\'t leave that gritty feeling some protein powders have. Strawberry flavour is smooth and easy to drink."', stars: 4 },
      { name: 'Serena F', text: '"This has become my go-to after gym sessions. The flavour is creamy but still light, and I like that it supports both recovery and strength with the added creatine."', stars: 5 },
      { name: 'Jimmy G', text: '"The strawberry flavour is spot on. Not overly sweet and it actually tastes like real strawberry rather than candy flavouring. Texture is very smooth."', stars: 5 },
      { name: 'Meg G', text: '"Great all-in-one recovery shake. The combination of whey protein, collagen, and creatine is perfect after workouts, and the strawberry flavour is delicious and really easy to drink."', stars: 5 },
    ]
  },
  'chocolate': {
    description: (
      <>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Our <strong>Chocolate</strong> recovery formula was scientifically curated to be the best tasting and easiest mixing <strong>whey protein and creatine</strong> money can buy. Made on a base of high-quality whey protein concentrate and isolate to accelerate muscular recovery.
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          <strong>Creatine monohydrate</strong> is added to support ATP energy stores, muscle mass gain and brain health. Finally, <strong>probiotics</strong> are added to improve digestion and overall gut health.
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          This mixture is an all-in-one recovery supplement to recover and perform as efficiently as possible.
        </p>
      </>
    ),
    proteinPerServe: '26g',
    creatinePerServe: '4g',
    badges: ['Added Probiotics', 'Digestive Enzymes', 'No Fillers or Gums', 'Aussie Made'],
    veganBadge: false,
    overallRating: 4.5,
    reviews: [
      { name: 'Ollie H', text: '"This chocolate flavour is spot on. It\'s rich enough to taste like real chocolate but not so strong that you get sick of it after a few shakes. Mixed with milk it honestly tastes like classic choccy milk."', stars: 5 },
      { name: 'Bella P', text: '"I love how balanced the chocolate flavour is. Some protein powders are way too sweet, but this one is smooth and easy to drink every day. The added probiotics and creatine are a big bonus."', stars: 5 },
      { name: 'Foster M', text: '"This is one of the most drinkable chocolate proteins I\'ve had. It\'s creamy, mixes easily, and with milk it tastes just like a proper chocolate milkshake."', stars: 4 },
      { name: 'Xavier J', text: '"Great flavour and really smooth texture. I like that the chocolate isn\'t overpowering so it doesn\'t feel heavy after workouts. The probiotics are a nice extra too."', stars: 5 },
      { name: 'Caleb P', text: '"I\'ve tried a lot of chocolate proteins and this one stands out because it\'s balanced. Not too sweet, mixes really well, and makes milk taste amazing."', stars: 4 },
      { name: 'Cooper M', text: '"Super easy to drink after the gym. The chocolate flavour is smooth and natural, and I like knowing I\'m getting creatine and probiotics in the same shake."', stars: 5 },
      { name: 'Murphy F', text: '"This powder mixes perfectly with milk and genuinely tastes like choccy milk from when I was a kid. It\'s not overly sweet which makes it great for everyday use."', stars: 4 },
      { name: 'Fred S', text: '"I love that it\'s a complete recovery formula. The chocolate taste is smooth and creamy without being too strong, and the texture is really nice."', stars: 5 },
      { name: 'Joe E', text: '"Great chocolate flavour that doesn\'t overpower everything else. I sometimes blend it with banana and oats and it works perfectly."', stars: 4 },
      { name: 'Ben D', text: '"Really impressed with this one. Smooth, easy to mix, and the flavour is delicious without being too intense. Makes milk taste like a proper chocolate drink."', stars: 5 },
    ]
  },
  'vanilla': {
    description: (
      <>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Our <strong>Vanilla</strong> recovery formula was scientifically curated to be the best tasting and easiest mixing <strong>whey protein and creatine</strong> ever thought up.
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          By using whey protein concentrate and isolate mixed with <strong>creatine monohydrate</strong> and billions of <strong>probiotics</strong>, then micronizing this, our professional formulators were able to make a smooth and rich all-in-one recovery formula.
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          This formula is good on the gut, great for muscle recovery and builds ATP energy stores.
        </p>
      </>
    ),
    proteinPerServe: '26g',
    creatinePerServe: '4g',
    badges: ['Added Probiotics', 'Digestive Enzymes', 'No Fillers or Gums', 'Aussie Made'],
    veganBadge: false,
    overallRating: 4.9,
    reviews: [
      { name: 'Evie B', text: 'Just bought some of the vanilla protein powder. Taste was really good and not ridiculously sweet like some of the rest, also great to have both protein and creatine. Shared with my co workers and they asked me the brand. Very happy.', stars: 5 },
      { name: 'The Aussie Finish', text: 'We use this regularly for our team\'s recovery and can\'t recommend it enough. The results genuinely speak for themselves.', stars: 5 },
      { name: 'Nathan F', text: 'High quality protein that tastes amazing and is affordable. Added creatine makes this an even better formula since i dont have to buy 2 supplements. Highly recommend the vanilla flavor.', stars: 5 },
      { name: 'Nick F', text: 'You can tell this isn\'t just another cheap protein. The blend feels quality, no bloating, and it actually supports strength gains. I like that it\'s vegan too. For the price, it\'s honestly hard to beat.', stars: 5 },
      { name: 'Ethan C', text: '"This vanilla recovery formula is exactly what I was looking for. The flavour is rich but still smooth, and it mixes incredibly easily with both water and milk. I\'ve been adding it to my morning smoothies and oats and it works perfectly as a base."', stars: 5 },
      { name: 'Hannah M', text: '"I love how versatile this vanilla flavour is. It\'s creamy without being overly sweet and blends really well into smoothies. Having the creatine already included makes it a great all-in-one post-workout shake."', stars: 5 },
      { name: 'Lucas B', text: '"One of the smoothest protein powders I\'ve tried. No clumps at all and it mixes quickly in a shaker. The vanilla flavour is rich and works great when I add fruit or peanut butter."', stars: 5 },
      { name: 'Chloe D', text: '"This has become my go-to for breakfast smoothies. The vanilla flavour is really clean and creamy, and the whey protein plus creatine combo makes it perfect for recovery after training."', stars: 4 },
      { name: 'Noah H', text: '"Really impressed with the texture. It\'s super easy to mix and doesn\'t leave that gritty feeling some proteins have. The vanilla taste is classic and pairs well with oats or frozen berries."', stars: 5 },
      { name: 'Isabella T', text: '"Great flavour and really versatile. I\'ve been using it in overnight oats and shakes and it blends in perfectly. The creamy vanilla taste makes it feel premium while still being easy to drink."', stars: 5 },
    ]
  }
};

const Accordion: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid #333' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}>
        <span style={{ fontSize: '1.1rem', letterSpacing: '1px' }}>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div style={{ paddingBottom: '1.5rem', color: '#ccc', lineHeight: '1.6' }}>{children}</div>}
    </div>
  );
};

interface ProductPageProps {
  productId: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
  const product = productsData.find(p => p.id === productId);
  const [size, setSize] = useState<ProductSize>('440g');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    return <div style={{ paddingTop: '120px', textAlign: 'center', height: '100vh', color: '#fff' }}><h2>Product not found</h2></div>;
  }

  const pageContent = productPageData[product.id];
  const { original, sale, isActive: isSaleActive } = getDisplayPrices(size);
  const priceNumber = getEffectivePrice(original, size);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        size: size,
        price: priceNumber,
        image: size === '880g' ? product.image880g : product.image
      });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', color: '#fff', paddingTop: '120px', paddingBottom: '80px' }}>
      <Header />

      <div className="container">
        <style dangerouslySetInnerHTML={{
          __html: `
          .product-page-title { font-size: 4rem; }
          @media (max-width: 768px) {
            .product-page-title { font-size: 2.2rem !important; text-align: center; }
          }
        `}} />
        <h1 className="font-bebas product-page-title" style={{ marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem', letterSpacing: '2px' }}>
          {product.name} RECOVERY FORMULA
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>

          {/* Left: Product Image */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <img
              src={size === '880g' ? product.image880g : product.image}
              alt={product.name}
              style={{ width: '100%', maxWidth: '500px', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))', transition: 'all 0.3s ease' }}
            />
          </div>

          {/* Right: Product Details */}
          <div>
            {/* Description Box — yellow border */}
            <div style={{ border: '2px solid var(--primary-color)', padding: '2rem', backgroundColor: '#111', borderRadius: '8px', marginBottom: '2rem' }}>
              {pageContent.description}
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                <p style={{ marginBottom: '0.5rem' }}>{pageContent.proteinPerServe} protein <span style={{ fontWeight: 'normal' }}>per serve</span></p>
                <p>{pageContent.creatinePerServe} creatine <span style={{ fontWeight: 'normal' }}>per serve</span></p>
              </div>
            </div>

            {/* Badges — yellow text & border */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', fontSize: '0.9rem' }}>
              {pageContent.badges.map((badge, idx) => (
                <span key={idx} style={{ padding: '0.5rem 1rem', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', borderRadius: '4px' }}>{badge}</span>
              ))}
              {pageContent.veganBadge && <span style={{ padding: '0.5rem 1rem', border: '1px solid #22c55e', color: '#22c55e', borderRadius: '4px' }}>Vegan</span>}
              {isSaleActive && <span style={{ padding: '0.5rem 1rem', border: '1px solid #22c55e', color: '#22c55e', borderRadius: '4px', fontWeight: 'bold' }}>☘️ 15% OFF SALE ACTIVE</span>}
            </div>

            {/* Selectors */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #444', borderRadius: '30px', overflow: 'hidden' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0.5rem 1rem', background: '#222', color: '#fff', border: 'none', cursor: 'pointer' }}><Minus size={16} /></button>
                  <span style={{ padding: '0 1rem', fontWeight: 'bold' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0.5rem 1rem', background: '#222', color: '#fff', border: 'none', cursor: 'pointer' }}><Plus size={16} /></button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['440g', '880g'] as ProductSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    style={{
                      padding: '0.8rem 2rem',
                      backgroundColor: size === s ? 'var(--primary-color)' : '#222',
                      color: size === s ? '#000' : '#fff',
                      border: '1px solid',
                      borderColor: size === s ? 'var(--primary-color)' : '#444',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '1rem'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="font-bebas clip-btn clip-btn-yellow"
              style={{ width: '100%', fontSize: '1.5rem', padding: '1.2rem', marginBottom: '3rem' }}
            >
              ADD TO CART - {isSaleActive ? (
                <>
                  <span style={{ color: '#000', opacity: 0.6, textDecoration: 'line-through', marginRight: '0.5rem' }}>${(original * quantity).toFixed(2)}</span>
                  <span style={{ color: '#000', fontWeight: '800' }}>${(sale * quantity).toFixed(2)}</span>
                </>
              ) : (
                `$${(original * quantity).toFixed(2)}`
              )}
            </button>

            {/* Accordions */}
            <div style={{ backgroundColor: '#161616', padding: '0 2rem', borderRadius: '8px' }}>
              <Accordion title="ALLERGEN INFORMATION">
                {product.allergens} Processed in the same facility as milk and soy.
              </Accordion>
              <Accordion title="HOW TO USE ME" defaultOpen={true}>
                Drop 1 heaped scoop of powder into 250ml of cold milk or water and shake or stir until no solid is visible. 1-2 servings a day recommended. Recovery formula is most effective when taken daily after physical exercise.
              </Accordion>
              <Accordion title="NUTRITIONAL INFORMATION">
                <img
                  src={nutritionTableImages[product.id]}
                  alt={`${product.name} Nutrition Information`}
                  style={{ width: '100%', maxWidth: '450px', height: 'auto', borderRadius: '4px' }}
                />
              </Accordion>
            </div>

          </div>
        </div>

        {/* Reviews Section */}
        {pageContent.reviews.length > 0 && (
          <div style={{ marginTop: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="font-bebas" style={{ fontSize: '3rem', letterSpacing: '1px', marginBottom: '1rem' }}>REVIEWS</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--primary-color)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={22} className={i < Math.round(pageContent.overallRating) ? "fill-current" : ""} />
                  ))}
                </div>
                <span className="font-bebas" style={{ fontSize: '1.6rem', color: '#fff', paddingTop: '3px' }}>{pageContent.overallRating} / 5</span>
                <span style={{ color: '#888', fontSize: '1rem' }}>({pageContent.reviews.length} reviews)</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {pageContent.reviews.map((review, idx) => (
                <div key={idx} style={{ backgroundColor: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid #222' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < review.stars ? "fill-current" : ""} style={i >= review.stars ? { color: '#444' } : {}} />
                    ))}
                  </div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>{review.name}</h4>
                  <p style={{ color: '#aaa', lineHeight: '1.6' }}>{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
