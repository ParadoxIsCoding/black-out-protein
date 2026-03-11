import { MapPin, Phone, Mail, FileText, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000000', paddingTop: '5rem', paddingBottom: '2rem' }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          
          {/* Brand & Socials */}
          <div className="flex flex-col gap-4">
            <span className="font-bebas" style={{ fontSize: '3rem', color: '#fff', letterSpacing: '2px', lineHeight: 1 }}>
              BLACKD <span className="text-yellow">OUT</span>
            </span>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Premium, Australian-made supplements designed for maximum recovery and insane taste.</p>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/profile.php?id=61586516759479" target="_blank" rel="noreferrer" style={{ background: '#111', border: '1px solid #333', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', color: '#fff' }}>
                <Facebook size={22} className="hover-yellow" />
              </a>
              <a href="https://www.instagram.com/blackdoutprotein/" target="_blank" rel="noreferrer" style={{ background: '#111', border: '1px solid #333', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', color: '#fff' }}>
                <Instagram size={22} className="hover-yellow" />
              </a>
              <a href="https://www.tiktok.com/@blackdoutprotein" target="_blank" rel="noreferrer" style={{ background: '#111', border: '1px solid #333', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', color: '#fff' }}>
                <span className="hover-yellow font-bebas" style={{ fontSize: '20px', lineHeight: 1, paddingTop: '4px' }}>TT</span>
              </a>
            </div>
          </div>

          {/* Business Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bebas" style={{ fontSize: '1.5rem', color: '#fff', letterSpacing: '2px', borderBottom: '3px solid var(--primary-color)', display: 'inline-block', paddingBottom: '0.5rem', alignSelf: 'flex-start' }}>BUSINESS INFO</h3>
            <div className="flex items-start gap-3 text-muted" style={{ fontWeight: 600 }}>
              <FileText size={18} className="text-yellow" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>ABN: 40 988 201 334</span>
            </div>
            <div className="flex items-start gap-3 text-muted" style={{ fontWeight: 600 }}>
              <MapPin size={18} className="text-yellow" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>33 Lenco Crescent<br/>Landsborough, QLD, 4551</span>
            </div>
            <div className="flex items-start gap-3 text-muted" style={{ fontWeight: 600 }}>
              <Phone size={18} className="text-yellow" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>0411 184 551</span>
            </div>
            <div className="flex items-start gap-3 text-muted" style={{ fontWeight: 600 }}>
              <Mail size={18} className="text-yellow" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>Blackdoutprotein@gmail.com</span>
            </div>
          </div>

          {/* Store Locations */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bebas" style={{ fontSize: '1.5rem', color: '#fff', letterSpacing: '2px', borderBottom: '3px solid var(--primary-color)', display: 'inline-block', paddingBottom: '0.5rem', alignSelf: 'flex-start' }}>STORE LOCATIONS</h3>
            <div className="flex flex-col gap-1 mb-3">
              <strong style={{ color: '#fff', textTransform: 'uppercase' }}>Chill Bistro</strong>
              <span className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 600 }}>89 Esplanade, Golden Beach QLD 4551</span>
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <strong style={{ color: '#fff', textTransform: 'uppercase' }}>Local Grocer IGA </strong>
              <span className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 600 }}>48 Landsborough Pde, Golden Beach QLD 4551</span>
            </div>
            <div className="flex flex-col gap-1">
              <strong style={{ color: '#fff', textTransform: 'uppercase' }}>Salt Gym Currimundi</strong>
              <span className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 600 }}>736-738 Nicklin Way, Currimundi QLD 4551</span>
            </div>
          </div>
          
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', color: '#666', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          &copy; {new Date().getFullYear()} BLACKD OUT PROTEIN. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
