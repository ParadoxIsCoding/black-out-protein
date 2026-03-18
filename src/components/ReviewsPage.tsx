import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { productsData } from '../data/products';
import { productPageData, type Review } from '../data/productContent';
import { Star } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  // Consolidate all reviews with their product names
  const allReviews = productsData.flatMap(product => {
    const content = productPageData[product.id];
    if (!content) return [];
    return content.reviews.map(review => ({
      ...review,
      productName: product.name,
      productId: product.id
    }));
  });

  // Calculate overall stats
  const totalReviews = allReviews.length;
  const averageRating = (allReviews.reduce((acc, rev) => acc + rev.stars, 0) / totalReviews).toFixed(1);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', color: '#fff', paddingTop: '120px', paddingBottom: '80px' }}>
      <Header />

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="font-bebas" style={{ fontSize: '4rem', letterSpacing: '2px', marginBottom: '1rem' }}>CUSTOMER REVIEWS</h1>
          <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Hear from our community of athletes and fitness enthusiasts about their experience with Blackd Out Protein.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', backgroundColor: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222', width: 'fit-content', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--primary-color)' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} className={i < Math.round(Number(averageRating)) ? "fill-current" : ""} />
              ))}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="font-bebas" style={{ fontSize: '2rem', lineHeight: 1 }}>{averageRating} / 5</div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>Based on {totalReviews} reviews</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {allReviews.map((review, idx) => (
            <div key={idx} style={{
              backgroundColor: '#111',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid #222',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-color)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < review.stars ? "fill-current" : ""} style={i >= review.stars ? { color: '#444' } : {}} />
                ))}
              </div>

              <h3 style={{ fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '1rem' }}>{review.name}</h3>
              <p style={{ color: '#ccc', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem', flexGrow: 1 }}>{review.text}</p>

              <div style={{
                borderTop: '1px solid #222',
                paddingTop: '1rem',
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Verified Purchase</span>
                <a href={`/product/${review.productId}`} style={{
                  fontSize: '0.85rem',
                  color: 'var(--primary-color)',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}>
                  {review.productName}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
