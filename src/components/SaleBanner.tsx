import React, { useState } from 'react';

const SaleBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    const closed = sessionStorage.getItem('sale_banner_closed');
    return !closed;
  });

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('sale_banner_closed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="sale-banner">
      <div className="sale-banner-content">
        <div className="sale-banner-text">
          <span className="underline-yellow">FREE</span> SHIPPING ON ORDERS OVER <span className="highlight">$70</span>
        </div>
        <button className="sale-banner-close" onClick={handleClose} aria-label="Close banner">
          ×
        </button>
      </div>
      <style>{`
        .sale-banner {
          background: #000;
          color: white;
          padding: 10px 20px;
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .sale-banner-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .sale-banner-text {
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
        }
        .sale-banner-text .highlight {
          color: var(--primary-color);
        }
        .underline-yellow {
          text-decoration: underline;
          text-decoration-color: var(--primary-color);
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
        }
        .sale-banner-close {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
          padding: 0 5px;
          line-height: 1;
        }
        .sale-banner-close:hover {
          opacity: 1;
          color: var(--primary-color);
        }
        @media (max-width: 768px) {
          .sale-banner-text {
            font-size: 0.75rem;
            padding-right: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default SaleBanner;
