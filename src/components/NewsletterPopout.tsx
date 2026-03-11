import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

const NewsletterPopout = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popout after 5 seconds
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsDismissed(true);
      }, 3000);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!isVisible && !isDismissed) {
      return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 100,
      width: '320px',
      transform: isVisible ? 'translateY(0)' : 'translateY(150%)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}>
      <div style={{ padding: '2rem 1.5rem', position: 'relative', background: '#161616', border: '1px solid #222', borderRadius: '16px' }}>
        <button 
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} className="hover-yellow" />
        </button>

        {!submitted ? (
          <>
            <h3 className="font-bebas" style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem', letterSpacing: '1px' }}>JOIN THE <span className="text-yellow">FAMILY</span></h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
              Sign up to our newsletter for new products, exclusive sales, and updates.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input 
                type="email" 
                placeholder="ENTER EMAIL" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flexGrow: 1,
                  padding: '0.8rem 1rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  background: '#111',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem', borderRadius: '4px' }}>
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h3 className="font-bebas" style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '0.5rem', letterSpacing: '1px' }}>THANK YOU!</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>You've been added to our newsletter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopout;
