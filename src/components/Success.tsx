import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { CheckCircle } from 'lucide-react';

const Success: React.FC = () => {
  const { emptyCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Extract session_id from URL query params
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');
    
    if (session_id) {
      setSessionId(session_id);
    }

    // Always empty the cart upon successfully landing here
    emptyCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-color)',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '500px',
        backgroundColor: '#161616',
        padding: '3rem 2rem',
        borderRadius: '16px',
        border: '1px solid #222',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <CheckCircle size={64} style={{ color: 'var(--primary-color)' }} />
        
        <h1 className="font-bebas" style={{ 
          fontSize: '3rem', 
          color: '#fff', 
          lineHeight: 1,
          letterSpacing: '1px',
          margin: 0
        }}>
          PAYMENT SUCCESSFUL
        </h1>
        
        <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Thank you for your order! Your recovery stack is being prepared and will be shipped shortly.
        </p>

        {sessionId && (
          <p style={{ fontSize: '0.8rem', color: '#555', wordBreak: 'break-all' }}>
            Session ID: {sessionId}
          </p>
        )}

        <button 
          onClick={() => window.location.href = '/black-out-protein/'}
          className="clip-btn clip-btn-yellow" 
          style={{ width: '100%', marginTop: '1rem' }}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};

export default Success;
