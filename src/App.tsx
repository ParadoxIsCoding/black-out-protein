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
import { Analytics } from "@vercel/analytics/react";
import SaleBanner from './components/SaleBanner';


import Success from './components/Success';
import ProductPage from './components/ProductPage';
import ReviewsPage from './components/ReviewsPage';

function App() {
  const isSuccessPage = window.location.pathname.includes('/success');
  const isProductPage = window.location.pathname.startsWith('/product/');
  const isReviewsPage = window.location.pathname === '/reviews';

  if (isSuccessPage) {
    return (
      <CartProvider>
        <div className="app-wrapper">
          <SaleBanner />
          <Header />
          <Success />
        </div>
      </CartProvider>
    );
  }

  if (isReviewsPage) {
    return (
      <CartProvider>
        <div className="app-wrapper">
          <SaleBanner />
          <ReviewsPage />
          <CartDrawer />
          <Analytics />
        </div>
      </CartProvider>
    );
  }

  if (isProductPage) {
    const productId = window.location.pathname.split('/')[2];
    return (
      <CartProvider>
        <div className="app-wrapper">
          <SaleBanner />
          <ProductPage productId={productId} />
          <CartDrawer />
          <Analytics />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="app-wrapper">
        <SaleBanner />
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
        <Analytics />
      </div>
    </CartProvider>
  );
}

export default App;
