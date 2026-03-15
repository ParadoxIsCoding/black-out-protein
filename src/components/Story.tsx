
import gymPhoto from '../assets/gymphoto.png';

const Story = () => {
  return (
    <section id="story" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-color-light)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container flex flex-col items-center">
        <div className="story-box" style={{ backgroundColor: '#161616', borderRadius: '16px', border: '1px solid #222', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <h2 className="font-bebas story-header" style={{ color: '#fff', marginBottom: '1rem', letterSpacing: '2px', textAlign: 'center' }}>
            OUR <span className="text-yellow">STORY</span>
          </h2>

          <div className="story-text" style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontWeight: 600, textAlign: 'center' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              I was tired of paying for multiple overpriced supplements that I mixed into the same shake everyday. So I decided to do something about it.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              With the connections of my pharmaceutical veteran dad I was able to work with nutritionists and scientists to develop a product that has 26g protein, 4g creatine and flavour specific ingredients. The formula has come to be known as <strong className="text-white">BLACKD OUT PROTEIN</strong> and people love it.
            </p>
            <p>
              So with a helping hand from some more connections I was able to set up a manufacturing facility on the Sunshine Coast and have devoted myself to growing this little business into something that people love and appreciate for the value and authenticity.
            </p>
          </div>

          {/* Founder/Facility Photo */}
          <div style={{
            width: '100%',
            height: '400px',
            borderRadius: '8px',
            marginTop: '1rem',
            overflow: 'hidden',
            border: '1px solid #333',
            position: 'relative'
          }}>
            <img
              src={gymPhoto}
              alt="Blackd Out Protein Facility/Founder"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(30%) contrast(110%)'
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Story;
