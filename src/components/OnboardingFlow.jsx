import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const OnboardingFlow = () => {
  const { language, t } = useContext(LanguageContext);

  const steps = [
    {
      num: "01",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      title: t.flowStep1Title,
      desc: t.flowStep1Desc
    },
    {
      num: "02",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      title: t.flowStep2Title,
      desc: t.flowStep2Desc
    },
    {
      num: "03",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      title: t.flowStep3Title,
      desc: t.flowStep3Desc
    },
    {
      num: "04",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      title: t.flowStep4Title,
      desc: t.flowStep4Desc
    }
  ];

  return (
    <section id="onboarding-flow" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-tag">{language === 'id' ? 'Alur Onboarding' : 'Onboarding Flow'}</span>
          <h2 className="section-title">
            {t.flowTitle.split(' ').slice(0, 2).join(' ')} <span className="text-gradient">{t.flowTitle.split(' ').slice(2).join(' ')}</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {t.flowSubtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="onboarding-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {steps.map((st, idx) => (
            <div 
              key={st.num}
              className="glass-panel onboarding-card"
              style={{
                padding: '2.25rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Massive back neon number background */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-10px',
                  fontSize: '5.5rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  color: 'rgba(var(--glow-rgb), 0.05)',
                  lineHeight: 1,
                  userSelect: 'none',
                  zIndex: 0
                }}
              >
                {st.num}
              </div>

              {/* Icon Container */}
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }}
              >
                {st.icon}
              </div>

              {/* Text Area */}
              <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OnboardingFlow;
