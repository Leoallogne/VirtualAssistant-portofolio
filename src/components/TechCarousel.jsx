import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const TechCarousel = () => {
  const { t } = useContext(LanguageContext);

  const technologies = [
    { name: 'Google Workspace', color: '#4285F4' },
    { name: 'Notion', color: '#000000' },
    { name: 'Trello', color: '#0052CC' },
    { name: 'Slack', color: '#4A154B' },
    { name: 'Canva', color: '#00C4CC' },
    { name: 'Zoom', color: '#2D8CFF' },
    { name: 'Calendly', color: '#006BFF' },
    { name: 'Asana', color: '#F06A6A' },
    { name: 'Microsoft Office', color: '#D83B01' },
    { name: 'ChatGPT / AI Tools', color: '#10A37F' },
    { name: 'Buffer / Hootsuite', color: '#168EEA' },
    { name: 'Loom', color: '#625DF5' },
  ];

  // Double the array for seamless infinite looping scroll
  const scrollItems = [...technologies, ...technologies, ...technologies];

  return (
    <section id="tech-carousel" style={{ padding: '3.5rem 0', background: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h3 style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)'
        }}>
          {t.techTitle}
        </h3>
      </div>

      {/* Infinite scrolling track container */}
      <div className="marquee-container" style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
      }}>
        {/* Scrolling track wrapper */}
        <div className="marquee-track" style={{
          display: 'flex',
          gap: '1.5rem',
          whiteSpace: 'nowrap',
          animation: 'scroll-infinite 28s linear infinite',
          padding: '0.5rem 0'
        }}>
          {scrollItems.map((tech, index) => (
            <div
              key={index}
              className="glass-panel"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.8rem 1.8rem',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'default',
                userSelect: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = tech.color;
                e.currentTarget.style.boxShadow = `0 0 15px ${tech.color}40, inset 0 0 5px ${tech.color}20`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Colored Indicator Dot */}
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: tech.color,
                boxShadow: `0 0 8px ${tech.color}`
              }} />
              
              <span style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                fontFamily: 'var(--font-heading)'
              }}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-container:hover .marquee-track {
          animation-play-state: paused !important;
        }
        @keyframes scroll-infinite {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.3333%, 0, 0); }
        }
      `}</style>
    </section>
  );
};

export default TechCarousel;
