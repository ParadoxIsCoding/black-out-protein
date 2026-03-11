import React from 'react';
import pouchImg from '../assets/saltedc.png';

const Hero: React.FC = () => {
  return (
    <section className="bg-grid" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', position: 'relative' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', height: '100%' }}>
        
        {/* Left Column Text Content */}
        <div className="flex flex-col items-start animate-fade-in" style={{ paddingBottom: '6rem' }}>
          
          <h1 className="font-bebas" style={{ 
            fontSize: '8rem', 
            lineHeight: '0.9', 
            color: '#fff',
            marginBottom: '2rem',
            letterSpacing: '2px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            NOT JUST<br/>PROTEIN.<br/>
            <span className="text-yellow">TOTAL<br/>RECOVERY.</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#ccc', 
            marginBottom: '3rem', 
            maxWidth: '500px',
            lineHeight: '1.6',
            fontWeight: 400
          }}>
            Complete recovery without a premium price tag. Expertly formulated with <span className="text-yellow">creatine, probiotics, and premium protein</span>.
          </p>

          <div className="flex gap-4 mb-8">
            <button className="clip-btn clip-btn-yellow">SHOP THE STACK</button>
            <button className="clip-btn clip-btn-dark">LEARN MORE</button>
          </div>

          {/* Bottom Stats Row */}
          <div className="flex gap-8 items-end" style={{ marginTop: '2rem' }}>
            <div className="flex flex-col items-start">
              <span className="font-bebas text-yellow" style={{ fontSize: '3rem', lineHeight: '1' }}>26g</span>
              <span className="font-bebas text-white" style={{ fontSize: '1rem', letterSpacing: '2px' }}>PROTEIN</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bebas text-yellow" style={{ fontSize: '3rem', lineHeight: '1' }}>4g</span>
              <span className="font-bebas text-white" style={{ fontSize: '1rem', letterSpacing: '2px' }}>CREATINE</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bebas text-yellow" style={{ fontSize: '3rem', lineHeight: '1' }}>10B</span>
              <span className="font-bebas text-white" style={{ fontSize: '1rem', letterSpacing: '2px' }}>CFU PROBIOTICS</span>
            </div>
          </div>
          
        </div>

        {/* Right Column Image Placeholder */}
        <div className="flex justify-center items-center" style={{ position: 'relative', height: '100%' }}>
          {/* Subtle background glow to simulate the studio lighting in screenshot */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '600px',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 60%)',
            zIndex: 0
          }}></div>

          {/* Dummy visual for the 3d floating objects in background */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '30px', height: '30px', background: 'rgba(255,150,50,0.5)', filter: 'blur(5px)', transform: 'rotate(45deg)' }}></div>
            <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '40px', height: '40px', background: 'rgba(255,255,255,0.3)', filter: 'blur(8px)', borderRadius: '50%' }}></div>
          </div>

          {/* Main Product Pouch */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
             <img src={pouchImg} alt="Salted Caramel Protein Pouch" style={{ width: '400px', height: 'auto', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.8))' }} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
