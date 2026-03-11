import React from 'react';

const Marquee: React.FC = () => {
  const marqueeText = "MUSCLE-BUILDING SCIENCE • AUSTRALIAN MADE • NO MESSY SUPPLEMENTS • TOTAL RECOVERY STACK • UNCOMPROMISING NUTRITION • ";

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '60px',
      overflow: 'hidden',
      backgroundColor: 'var(--primary-color)',
      transform: 'rotate(-2deg)',
      transformOrigin: 'center',
      marginTop: '2rem',
      marginBottom: '6rem',
      marginLeft: '-50vw',
      left: '50%',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 4px 15px rgba(255, 214, 0, 0.2)'
    }}>
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div 
        className="font-bebas" 
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          fontSize: '2rem',
          color: '#000',
          letterSpacing: '2px',
          animation: 'scroll-left 25s linear infinite',
          paddingTop: '6px' // minor adjustment for vertical centering of Bebas
        }}
      >
        <span>{marqueeText}{marqueeText}{marqueeText}{marqueeText}</span>
      </div>
    </div>
  );
};

export default Marquee;
