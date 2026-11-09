import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ThankYou() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!titleRef.current || !section1Ref.current || !section2Ref.current || !containerRef.current) {
      return;
    }

    // Get section elements
    const section1Heading = section1Ref.current.querySelector('h2');
    const section1Paragraphs = section1Ref.current.querySelectorAll('p');
    const section2Heading = section2Ref.current.querySelector('h2');
    const section2Paragraphs = section2Ref.current.querySelectorAll('p');

    // Set initial state for all elements
    gsap.set([titleRef.current, section1Heading, ...section1Paragraphs, section2Heading, ...section2Paragraphs], {
      opacity: 0,
      y: 20
    });

    // Create timeline for sequential top-to-bottom animation
    const tl = gsap.timeline();

    // Animate title first
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Then animate first section heading and paragraphs sequentially
    tl.to(section1Heading, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3'); // Start slightly before previous animation ends

    tl.to(section1Paragraphs, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.2');

    // Then animate second section heading and paragraphs
    tl.to(section2Heading, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2');

    tl.to(section2Paragraphs, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, { scope: containerRef });
  
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
        textAlign: 'left'
      }}>
        <h1 
          ref={titleRef}
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: 'clamp(2rem, 4vh, 3rem)',
            fontFamily: 'var(--font-heading)',
            width: '100%',
            textAlign: 'center'
          }}
        >
          Staffing 2027
        </h1>
    </div>
   </div>
   );
}
