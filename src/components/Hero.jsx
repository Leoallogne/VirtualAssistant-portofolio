import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useContext(LanguageContext);
  const titles = t.heroRoles;

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Restart sub-indexes if active language dictionaries rewrite t.heroRoles
  useEffect(() => {
    setIndex(0);
    setSubIndex(0);
    setReverse(false);
    setText('');
  }, [titles]);

  // Typewriter effect logic
  useEffect(() => {
    if (!titles || titles.length === 0) return;

    if (subIndex === titles[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, titles]);

  useEffect(() => {
    if (titles && titles[index]) {
      setText(titles[index].substring(0, subIndex));
    }
  }, [subIndex, index, titles]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero">
      {/* Background glowing gradient spheres */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-1"></div>
        <div className="glow-bubble glow-bubble-2"></div>
      </div>

      <div className="container hero-wrapper">
        <div className="hero-content">
          <span className="section-tag">{t.heroWelcome}</span>

          <h1 className="hero-title">
            {t.heroIntro} <span className="text-gradient">Muhammad Syafiq</span>
          </h1>

          <h2 className="hero-subtitle" style={{ minHeight: '40px' }}>
            I am a <span style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>{text}</span>
            <span className="typewriter-cursor" style={{
              marginLeft: '2px',
              animation: 'blink 0.8s infinite',
              fontWeight: 300,
              color: 'var(--accent-secondary)'
            }}>|</span>
          </h2>

          <p className="hero-desc">
            {t.heroDesc}
          </p>

          <div className="hero-actions">
            <button
              onClick={() => handleScrollTo('projects')}
              className="btn btn-primary"
            >
              {t.heroBtnExplore}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="btn btn-secondary"
            >
              {t.heroBtnContact}
            </button>
          </div>
        </div>

        {/* Hero Visual Graphic (Animated Morphing Mesh) */}
        <div className="hero-visual">
          <div className="hero-canvas-frame">
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.4), transparent 50%)',
              filter: 'blur(10px)',
              zIndex: 1
            }}></div>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'var(--text-main)',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4.5rem',
              fontWeight: 800
            }}>
              <span style={{ filter: 'drop-shadow(0 10px 15px var(--accent-glow))' }}>⚡</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
