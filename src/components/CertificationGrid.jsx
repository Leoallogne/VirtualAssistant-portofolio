import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const CertificationGrid = () => {
  const { t } = useContext(LanguageContext);

  const certifications = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      title: 'Google Workspace Certification',
      issuer: 'Google Career Certificates',
      date: '2024',
      id: 'GGL-WS-2024',
      color: '#4285F4'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      ),
      title: 'Virtual Assistant Professional',
      issuer: 'Coursera / Meta',
      date: '2024',
      id: 'CVA-PRO-2024',
      color: '#06B6D4'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.603 5.402L5.27 10H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2.27l6.333 4.598A.5.5 0 0 0 12.5 18.2V5.8a.5.5 0 0 0-.897-.398z"></path>
          <path d="M16 8.5c.83 1.17.83 2.83 0 4M19 6c1.67 2.17 1.67 5.83 0 8"></path>
        </svg>
      ),
      title: 'Social Media Marketing',
      issuer: 'HubSpot Academy',
      date: '2023',
      id: 'HBS-SMM-2023',
      color: '#FF7A59'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <polyline points="9 14 11 16 15 12"></polyline>
        </svg>
      ),
      title: 'Project Management Essentials',
      issuer: 'Google / Coursera',
      date: '2024',
      id: 'GGL-PM-2024',
      color: '#8B5CF6'
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
