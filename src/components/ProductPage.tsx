import React, { useState } from 'react';
import { useCart } from './CartContext';
import { productsData, type ProductSize } from '../data/products';
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

import { productPageData } from '../data/productContent';


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
  const originalPrice = size === '880g' ? 49.90 : 29.00;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        size: size,
        price: originalPrice,
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
              ADD TO CART - ${(originalPrice * quantity).toFixed(2)}
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
