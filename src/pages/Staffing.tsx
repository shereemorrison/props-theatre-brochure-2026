import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RevealText, usePageReveal } from '../components/RevealText';

import alisePhoto from '../assets/images/staffing/alise.jpg';
import robPhoto from '../assets/images/staffing/rob.jpg';

const headingStyle: React.CSSProperties = {
  fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
  color: '#ffd700',
  fontFamily: 'var(--font-heading)',
  fontWeight: 600,
  marginBottom: '0.35rem',
};

const roleStyle: React.CSSProperties = {
  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
  color: '#ffd700',
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
  opacity: 0.9,
};

const copyStyle: React.CSSProperties = {
  fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
  color: 'rgba(255, 255, 255, 0.9)',
  fontFamily: 'var(--font-body)',
  lineHeight: 1.7,
  marginBottom: 0,
};

const photoStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  height: 'auto',
  borderRadius: 'clamp(8px, 1.5vw, 12px)',
  display: 'block',
};

export default function Staffing() {
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
          Staffing 2027
        </h1>

        <section className="staffing-block" style={{ width: '100%', marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
          <h2 style={headingStyle}>Alise Amarant</h2>
          <p className="story-blurb" style={roleStyle}>
            <RevealText text="Company Director · Teacher, Monday to Wednesday" />
          </p>
          <img src={alisePhoto} alt="Alise Amarant" style={{ ...photoStyle, marginBottom: 'clamp(1rem, 2vh, 1.5rem)' }} />
          <p className="story-blurb" style={copyStyle}>
            <RevealText text="Alise has a vast experience in creating theatre, with 15 years in drama education in Mildura and Bendigo. Props Theatre was established by Alise and she leads the company through all productions, setting a high standard through her work and relationships with the Bendigo theatre community." />
          </p>
        </section>

        <section className="staffing-block" style={{ width: '100%', marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
          <h2 style={headingStyle}>Rob Martin</h2>
          <p className="story-blurb" style={roleStyle}>
            <RevealText text="Teacher, Thursday, Friday and Saturday · Drama, Musical Theatre, Private and Group Voice" />
          </p>
          <img src={robPhoto} alt="Rob Martin" style={{ ...photoStyle, marginBottom: 'clamp(1rem, 2vh, 1.5rem)' }} />
          <p className="story-blurb" style={copyStyle}>
            <RevealText text="Rob is excited to share his extensive knowledge at Props Theatre in Bendigo. Passionate about bringing high-quality arts training to regional areas, he aims to make a meaningful difference by helping students from Bendigo and beyond learn, grow and enjoy every moment. Rob Martin's distinguished career in theatre and the arts spans more than 40 years and hundreds of professional productions." />
          </p>
        </section>

        <section className="staffing-block" style={{ width: '100%' }}>
          <h2 style={headingStyle}>2027 timetable</h2>
          <p className="story-blurb" style={copyStyle}>
            <RevealText text="Class days and times are on the website:" />{' '}
            <a
              href="https://www.propstheatre.com.au/program-2"
              target="_blank"
              rel="noopener noreferrer"
              className="word"
              style={{ color: '#ffd700', textDecoration: 'underline', display: 'inline-block' }}
            >
              www.propstheatre.com.au/program-2
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
