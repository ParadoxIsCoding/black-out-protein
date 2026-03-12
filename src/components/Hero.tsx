import React, { useState, useEffect } from 'react';
import sc1Img from '../assets/sc1.png';
import ss1Img from '../assets/ss1.png';
import sv1Img from '../assets/sv1.png';

const slideImages = [sc1Img, ss1Img, sv1Img];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3000); // 3 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-grid hero-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', position: 'relative' }}>
      <div className="container md-grid-cols-1 md-text-center" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', height: '100%' }}>
        
        {/* Left Column Text Content */}
        <div className="flex flex-col items-start md-text-center animate-fade-in" style={{ paddingBottom: '6rem' }}>
          
          <h1 className="font-bebas hero-title" style={{ 
            lineHeight: '0.9', 
            color: '#fff',
            marginBottom: '2rem',
            letterSpacing: '2px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            NOT JUST<br/>PROTEIN.<br/>
            <span className="text-yellow">TOTAL<br/>RECOVERY.</span>
          </h1>
          
          <p className="hero-subtitle" style={{ 
            color: '#ccc', 
            marginBottom: '3rem', 
            maxWidth: '500px',
            lineHeight: '1.6',
            fontWeight: 400
          }}>
            Complete recovery without a premium price tag. Expertly formulated with <span className="text-yellow">creatine, probiotics, and premium protein</span>.
          </p>

          <div className="flex gap-4 mb-8">
            <button 
              className="clip-btn clip-btn-yellow"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              SHOP THE STACK
            </button>
            <button 
              className="clip-btn clip-btn-dark"
              onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
            >
              LEARN MORE
            </button>
          </div>

          {/* Bottom Stats Row */}
          <div className="flex gap-8 items-end stats-row" style={{ marginTop: '2rem' }}>
            <div className="flex flex-col items-start md-text-center">
              <span className="font-bebas text-yellow" style={{ fontSize: '3rem', lineHeight: '1' }}>26g</span>
              <span className="font-bebas text-white" style={{ fontSize: '1rem', letterSpacing: '2px' }}>PROTEIN</span>
            </div>
            <div className="flex flex-col items-start md-text-center">
              <span className="font-bebas text-yellow" style={{ fontSize: '3rem', lineHeight: '1' }}>4g</span>
              <span className="font-bebas text-white" style={{ fontSize: '1rem', letterSpacing: '2px' }}>CREATINE</span>
            </div>
            <div className="flex flex-col items-start md-text-center">
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
             <img src={slideImages[currentSlide]} className="hero-image" alt="Protein Pouch" style={{ width: '400px', height: 'auto', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.8))', transition: 'opacity 0.5s ease-in-out' }} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
