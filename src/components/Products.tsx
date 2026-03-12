import React, { useState } from 'react';
import saltedcImg from '../assets/saltedc.png';
import saltedc880gImg from '../assets/saltedc880g.png';
import strawberryImg from '../assets/strawberry.png';
import strawberry880gImg from '../assets/strawberry880g.png';
import chocImg from '../assets/choc.png';
import choc880gImg from '../assets/choc880g.png';
import vanillaImg from '../assets/vanilla.png';
import vanilla880gImg from '../assets/vanilla880g.png';
import { useCart } from './CartContext';

type ProductSize = '440g' | '880g';

interface ProductData {
  id: string;
  name: string;
  tag: string;
  tagStyle: { bg: string; text: string };
  stats: string;
  ingredients: string;
  allergens: string;
  image: string;
  image880g: string;
}

const productsData: ProductData[] = [
  {
    id: 'salted-caramel',
    name: 'SALTED CARAMEL',
    tag: 'PLANT BASED',
    tagStyle: { bg: '#22c55e', text: '#fff' },
    stats: '26g Plant Protein | 4g Creatine',
    ingredients: 'Protein blend (72%) (faba bean protein isolate, pea protein isolate, brown rice protein isolate), creatine monohydrate, inulin, MCT oil powder, coconut milk powder, natural flavours, salt (1.9%), caramelised sugar (caramelised sugar syrup, maltodextrin, vegetable gum (415), anticaking agent (551), sweeteners (960, 957)',
    allergens: 'Milk, soy.',
    image: saltedcImg,
    image880g: saltedc880gImg
  },
  {
    id: 'strawberry',
    name: 'STRAWBERRY',
    tag: 'NEW FLAVOUR',
    tagStyle: { bg: '#e11d48', text: '#fff' },
    stats: '25g Protein | 4g Creatine | 10g Hyd. Collagen',
    ingredients: 'Protein blend (51%) [whey protein concentrate, milk protein concentrate, whey protein isolate], hydrolysed collagen powder (25%), creatine monohydrate (10%), inulin, natural flavours, vegetable gum (412), emulsifier [322 (soy)], sweetener (955), natural colour (162).',
    allergens: 'Milk, soy.',
    image: strawberryImg,
    image880g: strawberry880gImg
  },
  {
    id: 'chocolate',
    name: 'CHOCOLATE',
    tag: 'BEST SELLER',
    tagStyle: { bg: '#fff', text: '#000' },
    stats: '26g Protein | 4g Creatine | 10B CFU Probiotics',
    ingredients: 'Protein blend (79%) [whey protein concentrate, milk protein concentrate, whey protein isolate], (10%) creatine monohydrate, inulin, cocoa powder (4.5%), natural flavours, vegetable gum (412), emulsifier [322 (soy)], sweetener (955), probiotics (Bacillus coagulans), anticaking agent (551), acidity regulator.',
    allergens: 'Milk, soy.',
    image: chocImg,
    image880g: choc880gImg
  },
  {
    id: 'vanilla',
    name: 'VANILLA',
    tag: 'CLASSIC',
    tagStyle: { bg: '#fff', text: '#000' },
    stats: '26g Protein | 4g Creatine | 10B CFU Probiotics',
    ingredients: 'Protein blend (81%) [whey protein concentrate, milk protein concentrate, whey protein isolate], (10%) creatine monohydrate, inulin, natural flavours, vegetable gum (412), emulsifier [322 (soy)], sweetener (955), probiotics (Bacillus coagulans).',
    allergens: 'Milk, soy.',
    image: vanillaImg,
    image880g: vanilla880gImg
  }
];

const ProductCard: React.FC<{ product: ProductData }> = ({ product }) => {
  const [size, setSize] = useState<ProductSize>('440g');
  const price = size === '440g' ? '$29.00' : '$49.90';
  const priceNumber = size === '440g' ? 29.00 : 49.90;
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      size: size,
      price: priceNumber,
      image: size === '880g' ? product.image880g : product.image
    });
  };

  return (
    <div style={{
      backgroundColor: '#161616',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #222',
      position: 'relative',
      height: '100%'
    }}>
      {/* Image Area */}
      <div style={{
        height: '250px',
        backgroundColor: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '1.5rem',
        borderBottom: '1px solid #222'
      }}>
        {/* Floating Tag */}
        <div className="font-bebas" style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: product.tagStyle.bg,
          color: product.tagStyle.text,
          padding: '0.2rem 0.6rem',
          fontSize: '1rem',
          letterSpacing: '1px',
          borderRadius: '4px',
          zIndex: 10
        }}>
          {product.tag}
        </div>

        {/* Product Image */}
        <img src={size === '880g' ? product.image880g : product.image} alt={product.name} style={{ height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))' }} />
      </div>

      {/* Content Area */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        <h3 className="font-bebas" style={{ fontSize: '2.3rem', color: '#fff', lineHeight: 1, letterSpacing: '1px', marginBottom: '0.5rem' }}>
          {product.name}
        </h3>
        
        {/* Yellow Stats */}
        <div style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
          {product.stats}
        </div>

        <div style={{ width: '100%', height: '1px', backgroundColor: '#333', marginBottom: '1rem' }}></div>

        {/* Size Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {(['440g', '880g'] as ProductSize[]).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                flex: 1,
                padding: '0.4rem',
                backgroundColor: size === s ? 'var(--primary-color)' : '#222',
                color: size === s ? '#000' : '#fff',
                border: '1px solid',
                borderColor: size === s ? 'var(--primary-color)' : '#444',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.85rem'
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="font-bebas" style={{ fontSize: '2.5rem', color: '#fff', lineHeight: 1 }}>{price}</span>
        </div>

        {/* Ingredients / Allergens (Small text) */}
        <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '1.5rem', flexGrow: 1 }}>
          <p style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}><strong style={{ color: '#aaa' }}>Contains:</strong> {product.ingredients}</p>
          <p><strong style={{ color: '#aaa' }}>Allergens:</strong> {product.allergens}</p>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="font-bebas"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.4rem',
            letterSpacing: '1px',
            backgroundColor: 'var(--primary-color)',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)',
            transition: 'background-color 0.3s ease',
            marginTop: 'auto'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-color-hover)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-color)')}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  return (
    <section id="products" style={{ padding: '4rem 0 8rem 0', backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        {/* Compact Grid Layout for 4 items */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '2rem' 
        }}>
          {productsData.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
