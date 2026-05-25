import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const About = () => {
  const { t } = useContext(LanguageContext);

  const skills = [
    { name: 'Email & Calendar Management', level: 95 },
    { name: 'Notion / Trello / Asana', level: 90 },
    { name: 'Google Workspace', level: 92 },
    { name: 'Canva & Social Media Tools', level: 85 },
  ];

  return (
    <section id="about">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">{t.aboutTag}</span>
          <h2 className="section-title">{t.aboutTitle} <span className="text-gradient">Leo Syafiq</span></h2>
          <p className="section-desc" style={{ margin: '0 auto 3rem auto' }}>
            {t.aboutDesc}
          </p>
        </div>

        <div className="about-grid">
          {/* Bio & Skills column */}
          <div className="glass-panel about-card">
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>{t.aboutPhilosophyTitle}</h3>
            <p className="about-bio">
              {t.aboutPhilosophyDesc}
            </p>

            {/* Quick Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1.5rem',
              marginBottom: '2.5rem',
              textAlign: 'center'
            }}>
              <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 className="text-gradient" style={{ fontSize: '1.75rem', fontWeight: 800 }}>4+</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.aboutStatsExp}</p>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 className="text-gradient" style={{ fontSize: '1.75rem', fontWeight: 800 }}>25+</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.aboutStatsDone}</p>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 className="text-gradient" style={{ fontSize: '1.75rem', fontWeight: 800 }}>99%</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.aboutStatsClients}</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>{t.aboutCapabilities}</h3>
            <div className="skills-wrapper">
              {skills.map((skill, index) => (
                <div key={index} className="skill-bar-container">
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--accent-secondary)' }}>{skill.level}%</span>
                  </div>
                  <div className="skill-track">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <a 
              href="#contact" 
              className="btn btn-primary" 
              style={{ marginTop: '2.5rem', width: '100%', justifyContent: 'center' }}
            >
              {t.aboutBtnResume}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>

          {/* Timeline column */}
          <div className="timeline">
            {t.aboutTimeline.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-panel timeline-card">
                  <div className="timeline-date">{item.date}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <div className="timeline-org">{item.org}</div>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
