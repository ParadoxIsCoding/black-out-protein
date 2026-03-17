import React, { useState, useEffect } from 'react';
import { isStPatricksSaleActive, getSaleCountdown } from '../utils/saleLogic';

const SaleBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    const closed = sessionStorage.getItem('st_patricks_banner_closed');
    return !closed;
  });
  const [countdown, setCountdown] = useState(getSaleCountdown());
  const [isActive, setIsActive] = useState(isStPatricksSaleActive());

  useEffect(() => {
    const timer = setInterval(() => {
      const currentCountdown = getSaleCountdown();
      const currentActive = isStPatricksSaleActive();
      
      setCountdown(currentCountdown);
      setIsActive(currentActive);
      
      if (currentCountdown.expired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('st_patricks_banner_closed', 'true');
  };

  if (!isActive || !isVisible) return null;

  return (
    <div className="sale-banner">
      <div className="sale-banner-content">
        <div className="sale-banner-badge">☘️ ST PATRICK'S SALE</div>
        <div className="sale-banner-text">
          <span className="sale-highlight">15% OFF ALL PRODUCTS</span> FOR A LIMITED TIME
        </div>
        <div className="sale-countdown">
          <span className="countdown-label">ENDS IN:</span>
          <div className="countdown-timer">
            <span className="timer-unit">{String(countdown.hours).padStart(2, '0')}</span>h
            <span className="timer-divider">:</span>
            <span className="timer-unit">{String(countdown.minutes).padStart(2, '0')}</span>m
            <span className="timer-divider">:</span>
            <span className="timer-unit">{String(countdown.seconds).padStart(2, '0')}</span>s
          </div>
        </div>
        <button className="sale-banner-close" onClick={handleClose} aria-label="Close banner">
          ×
        </button>
      </div>
      <style>{`
        .sale-banner {
          background: linear-gradient(90deg, #0a2e12 0%, #1a4a1a 50%, #0a2e12 100%);
          color: white;
          padding: 12px 20px;
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: 'Inter', sans-serif;
          border-bottom: 2px solid #d4af37;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .sale-banner-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          position: relative;
        }
        .sale-banner-badge {
          background: #d4af37;
          color: #0a2e12;
          padding: 4px 12px;
          border-radius: 4px;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .sale-banner-text {
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
        }
        .sale-highlight {
          color: #22c55e;
          font-weight: 800;
        }
        .sale-countdown {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0,0,0,0.2);
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .countdown-label {
          font-size: 0.7rem;
          font-weight: 700;
          opacity: 0.8;
          color: #d4af37;
        }
        .countdown-timer {
          font-family: 'Monaco', 'Consolas', monospace;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
        }
        .timer-unit {
          color: #fff;
          min-width: 1.2em;
          text-align: center;
        }
        .timer-divider {
          color: #d4af37;
          margin: 0 2px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          50% { opacity: 0.3; }
        }
        .sale-banner-close {
          position: absolute;
          right: -10px;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
          padding: 0 10px;
          line-height: 1;
        }
        .sale-banner-close:hover {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .sale-banner-content {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
          .sale-banner-close {
            top: -5px;
            right: -15px;
          }
          .sale-banner-badge {
            font-size: 0.65rem;
          }
          .sale-banner-text {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SaleBanner;
