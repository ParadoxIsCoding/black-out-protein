import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';

const CartDrawer: React.FC = () => {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, cartTotal } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: items }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to initialize checkout');
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was a problem initiating checkout. Please try again later.');
    }
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          onClick={closeCart}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '450px',
        backgroundColor: '#0d0d0d',
        borderLeft: '1px solid #333',
        zIndex: 1000,
        transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ padding: '2rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-bebas" style={{ fontSize: '2.5rem', margin: 0, color: '#fff', letterSpacing: '1px' }}>
            YOUR <span className="text-yellow">CART</span>
          </h2>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={28} className="hover-yellow" />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {items.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
              <ShoppingBag size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p className="font-bebas" style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>YOUR CART IS EMPTY.</p>
              <button 
                onClick={closeCart}
                className="clip-btn clip-btn-yellow" 
                style={{ marginTop: '2rem', width: '100%', maxWidth: '200px' }}
              >
                RETURN TO SHOP
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', backgroundColor: '#161616', padding: '1rem', borderRadius: '8px', border: '1px solid #222' }}>
                  
                  {/* Image */}
                  <div style={{ width: '80px', height: '100px', backgroundColor: '#111', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 className="font-bebas" style={{ fontSize: '1.5rem', margin: 0, color: '#fff', lineHeight: 1 }}>{item.name}</h4>
                        <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 0 }}>
                          <X size={18} className="hover-yellow" />
                        </button>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>{item.size}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem' }}>
                      
                      {/* Quantity Selector */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #333', borderRadius: '4px', overflow: 'hidden' }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ padding: '0.4rem', background: '#222', border: 'none', color: '#fff', cursor: 'pointer' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ width: '30px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ padding: '0.4rem', background: '#222', border: 'none', color: '#fff', cursor: 'pointer' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="font-bebas" style={{ fontSize: '1.5rem', color: '#fff', lineHeight: 1 }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '2rem', borderTop: '1px solid #222', backgroundColor: '#111' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="font-bebas" style={{ fontSize: '1.5rem', color: '#aaa', letterSpacing: '1px' }}>SUBTOTAL</span>
              <span className="font-bebas" style={{ fontSize: '2.5rem', color: '#fff', letterSpacing: '1px', lineHeight: 1 }}>
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="font-bebas"
              style={{
                width: '100%',
                padding: '1.2rem',
                fontSize: '1.6rem',
                letterSpacing: '1px',
                backgroundColor: 'var(--primary-color)',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-color-hover)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-color)')}
            >
              PROCEED TO CHECKOUT
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: '1rem', fontWeight: 'bold' }}>
              Shipping & taxes calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
