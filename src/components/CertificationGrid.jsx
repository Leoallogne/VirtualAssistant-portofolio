import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const CertificationGrid = () => {
  const { t } = useContext(LanguageContext);

  const certifications = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services (AWS)',
      date: '2025',
      id: 'AWS-ASA-9941',
      color: '#FF9900'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
          <line x1="12" y1="22" x2="12" y2="15.5"></line>
          <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
          <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
          <line x1="12" y1="2" x2="12" y2="8.5"></line>
        </svg>
      ),
      title: 'Meta Frontend Professional Certificate',
      issuer: 'Meta / Coursera',
      date: '2024',
      id: 'META-FEC-8812',
      color: '#06B6D4'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10 8 16 12 10 16 10 8"></polygon>
        </svg>
      ),
      title: 'Advanced React & Redux Architect',
      issuer: 'TechVanguard Systems',
      date: '2025',
      id: 'TVG-ARR-3051',
      color: '#8B5CF6'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
          <path d="M12 6v6l4 2"></path>
        </svg>
      ),
      title: 'Google UX Design Certificate',
      issuer: 'Google Career Academy',
      date: '2023',
      id: 'GGL-UXD-1149',
      color: '#EA4335'
    }
  ];

  return (
    <section id="certifications">
      {/* Visual glowing bubbles */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-2" style={{ top: '20%', right: '-150px' }}></div>
      </div>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">{t.certsTag}</span>
          <h2 className="section-title">
            {t.certsTitle} <span className="text-gradient">{t.certsTitleBold}</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto 3rem auto' }}>
            {t.certsDesc}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="glass-panel"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '1.25rem',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cert.color;
                e.currentTarget.style.boxShadow = `0 10px 25px ${cert.color}15, 0 0 15px ${cert.color}10`;
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Colored ambient glow inside card corner */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: cert.color,
                filter: 'blur(30px)',
                opacity: 0.12,
                pointerEvents: 'none'
              }} />

              {/* Icon Frame */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${cert.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: cert.color,
                border: `1px solid ${cert.color}30`
              }}>
                {cert.icon}
              </div>

              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '0.4rem',
                  lineHeight: 1.4,
                  color: 'var(--text-main)'
                }}>
                  {cert.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '0.25rem'
                }}>
                  {cert.issuer}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}>
                  <span>Issued: {cert.date}</span>
                  <span style={{ fontFamily: 'monospace' }}>ID: {cert.id}</span>
                </div>
              </div>

              {/* Verify Link */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '0.65rem 1rem',
                  fontSize: '0.85rem',
                  justifyContent: 'center',
                  borderRadius: '8px'
                }}
              >
                {t.certsVerifyBtn}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationGrid;
