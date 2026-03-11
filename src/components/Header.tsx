import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import { useCart } from './CartContext';

const Header: React.FC = () => {
  const { cartCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transition: 'all 0.3s ease',
      backgroundColor: isScrolled ? '#0d0d0d' : 'transparent',
      borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      padding: '1.5rem 0'
    }}>
      <div className="container flex items-center justify-between">
        
        {/* LOGO area */}
        <div className="flex items-center">
          <img src={logoImg} alt="Blackd Out Protein Logo" style={{ height: '60px', width: 'auto' }} />
        </div>

        {/* Desktop Nav - Centered */}
        <nav className="flex items-center gap-8 font-bebas" style={{ fontSize: '1.2rem', letterSpacing: '2px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <a href="#" className="hover-yellow" style={{ color: '#fff' }}>HOME</a>
          <a href="#story" className="hover-yellow" style={{ color: '#fff' }}>ABOUT</a>
          <a href="#products" className="hover-yellow" style={{ color: '#fff' }}>SHOP</a>
        </nav>
        
        {/* Right side buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn-outline-rect" onClick={openCart}>CART ({cartCount})</button>
          <button className="clip-btn clip-btn-yellow">BUY NOW</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
