import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RevealText, usePageReveal } from '../components/RevealText';

import sharna1 from '../assets/images/staffing/sharna-1.jpg';
import sharna2 from '../assets/images/staffing/sharna-2.jpg';
import sharna3 from '../assets/images/staffing/sharna-3.jpg';
import sharna4 from '../assets/images/staffing/sharna-4.jpg';
import matilda1 from '../assets/images/staffing/matilda-1.jpg';
import matilda2 from '../assets/images/staffing/matilda-2.jpg';
import graduates from '../assets/images/staffing/graduates.png';

const sharnaPhotos = [
  { src: sharna1, alt: 'Sharna performing on stage as a student' },
  { src: sharna2, alt: 'Sharna in costume during a performance' },
  { src: sharna3, alt: 'Portrait of Sharna' },
  { src: sharna4, alt: 'Sharna in a bowler hat and blazer' },
];

const matildaPhotos = [
  { src: matilda1, alt: 'Matilda in a Props class' },
  { src: matilda2, alt: 'Matilda seated in the theatre' },
];

const headingStyle: React.CSSProperties = {
  fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
  color: '#ffd700',
  fontFamily: 'var(--font-heading)',
  fontWeight: 600,
  marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
};

const copyStyle: React.CSSProperties = {
  fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
  color: 'rgba(255, 255, 255, 0.9)',
  fontFamily: 'var(--font-body)',
  lineHeight: 1.7,
  marginBottom: 0,
};

export default function ThankYou() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  usePageReveal(containerRef, titleRef);

  return (
    <div className="detail-page" ref={containerRef}>
      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back
      </button>
      <div className="detail-content" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'clamp(2rem, 5vh, 4rem) clamp(1rem, 3vw, 2rem)',
        textAlign: 'left',
      }}>
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: 'clamp(2rem, 4vh, 3rem)',
            fontFamily: 'var(--font-heading)',
            width: '100%',
            textAlign: 'center',
          }}
        >
          Thank You
        </h1>

        <section className="staffing-block" style={{ width: '100%', marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
          <h2 style={headingStyle}>Sharna</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(0.6rem, 1.5vw, 1rem)',
            marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
          }}>
            {sharnaPhotos.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: 'clamp(8px, 1.5vw, 12px)',
                  display: 'block',
                  background: 'rgba(255, 255, 255, 0.04)',
                }}
              />
            ))}
          </div>
          <p className="story-blurb" style={copyStyle}>
            <RevealText text="A beloved student of 10 years to valuable Teacher assistant to graduate to an even more beloved Teacher of 4 years. Sharna is moving on to a wonderful role within a classroom of her very own! We congratulate Sharna on her achievements in her education with a Bachelor of Early Year Education and wish her all the best with her career path. Personally, Alise is extremely proud and honored to be a part of Sharna's life for so long as her teacher, mentor, company director and friend. Her students will also miss her smile, care and laugh." />
          </p>
        </section>

        <section className="staffing-block" style={{ width: '100%', marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
          <h2 style={headingStyle}>Matilda</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(0.6rem, 1.5vw, 1rem)',
            marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
          }}>
            {matildaPhotos.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: 'clamp(8px, 1.5vw, 12px)',
                  display: 'block',
                  background: 'rgba(255, 255, 255, 0.04)',
                }}
              />
            ))}
          </div>
          <p className="story-blurb" style={copyStyle}>
            <RevealText text="This great achiever is headed for greatness and we wish her all the very best in her next adventure — studying Movie Making! Matilda is a joy to teach, mentor, employ and be proud of. After being a student of Alise's, Matilda returned to Teacher Assistant to our benefit and appreciation." />
          </p>
        </section>

        <section className="staffing-block" style={{ width: '100%' }}>
          <h2 style={headingStyle}>Graduates</h2>
          <img
            src={graduates}
            alt="2026 in-theatre performance graduates"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 'clamp(8px, 1.5vw, 12px)',
              display: 'block',
              marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
            }}
          />
          <p className="story-blurb" style={copyStyle}>
            <RevealText text="We adore being a part of your creative lives and honored to be involved for so long! It is a bittersweet goodbye and we will wait applause ready for whatever you reach for in life." />
          </p>
        </section>
      </div>
    </div>
  );
}
