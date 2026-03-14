import React from 'react';
import { Zap, Activity } from 'lucide-react';

const SellingPoints: React.FC = () => {
  return (
    <section id="why-us" className="bg-grid" style={{ padding: '4rem 0 8rem 0' }}>
      <div className="container flex flex-col items-center">

        <h2 className="font-bebas" style={{ fontSize: '4rem', color: '#fff', marginBottom: '1rem', letterSpacing: '2px', textAlign: 'center' }}>
          EXPERTLY <span className="text-yellow">FORMULATED</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', textAlign: 'center', marginBottom: '4rem' }}>
          We consulted nutritionists and scientists to achieve macros that shatter industry standards.
        </p>

        <div className="features-grid md-gap-4" style={{ display: 'grid', gap: '2rem', width: '100%' }}>

          {/* Card 1 */}
          <div style={{
            backgroundColor: '#161616',
            borderRadius: '16px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #222',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
              <Zap size={40} />
            </div>
            <h3 className="font-bebas" style={{ fontSize: '1.5rem', color: '#fff', letterSpacing: '1px', marginBottom: '1rem' }}>
              4<span style={{ fontFamily: 'Inter, sans-serif', textTransform: 'lowercase', fontSize: '1.2rem', fontWeight: 700 }}>g</span> CREATINE MONOHYDRATE
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Included in every serve. Purposed to enhance focus, increase strength, and support muscle mass gain.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{
            backgroundColor: '#161616',
            borderRadius: '16px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #222',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1 }}>
              💪 {/* Using emoji as a placeholder for the bicep graphic in screenshot */}
            </div>
            <h3 className="font-bebas" style={{ fontSize: '1.5rem', color: '#fff', letterSpacing: '1px', marginBottom: '1rem' }}>
              26<span style={{ fontFamily: 'Inter, sans-serif', textTransform: 'lowercase', fontSize: '1.2rem', fontWeight: 700 }}>g</span> QUALITY PROTEIN
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Whey isolate and concentrate blends, plus premium plant protein options for ultimate flexibility.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{
            backgroundColor: '#161616',
            borderRadius: '16px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #222',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ color: '#d946ef', marginBottom: '1.5rem' }}>
              <Activity size={40} /> {/* Using activity as placeholder for DNA helix */}
            </div>
            <h3 className="font-bebas" style={{ fontSize: '1.5rem', color: '#fff', letterSpacing: '1px', marginBottom: '1rem' }}>
              TARGETED ADDITIVES
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              10 billion CFU probiotics in dairy blends and 10<span style={{ fontFamily: 'Inter, sans-serif', textTransform: 'lowercase', fontSize: '0.9rem', fontWeight: 700 }}>g</span> hydrolyzed collagen in our strawberry formula.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SellingPoints;
