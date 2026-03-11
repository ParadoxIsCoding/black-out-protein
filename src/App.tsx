import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import SellingPoints from './components/SellingPoints';
import Marquee from './components/Marquee';
import Story from './components/Story';
import Footer from './components/Footer';
import NewsletterPopout from './components/NewsletterPopout';
import { CartProvider } from './components/CartContext';
import CartDrawer from './components/CartDrawer';

import Success from './components/Success';

function App() {
  const isSuccessPage = window.location.pathname.includes('/success');

  if (isSuccessPage) {
    return (
      <CartProvider>
        <div className="app-wrapper">
          <Header />
          <Success />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="app-wrapper">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <SellingPoints />
          <Products />
          <Story />
        </main>
        <Footer />
        <NewsletterPopout />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
