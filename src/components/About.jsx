import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const About = () => {
  const { language, t } = useContext(LanguageContext);

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
          <h2 className="section-title">{t.aboutTitle} <span className="text-gradient">Muhammad Syafiq</span></h2>
          <p className="section-desc" style={{ margin: '0 auto 3rem auto' }}>
            {t.aboutDesc}
          </p>
        </div>

        <div className="about-grid">
          {/* Profile card grid box */}
          <div className="glass-panel profile-card" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center', height: '100%' }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '3px solid var(--accent-secondary)',
              boxShadow: 'var(--shadow-md), 0 0 20px var(--accent-secondary-glow)',
              background: 'var(--bg-tertiary)'
            }}>
              <img 
                src="/profile.png" 
                alt="Muhammad Syafiq" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            <div style={{ width: '100%' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>Muhammad Syafiq</h3>
              <span className="project-tag" style={{ fontSize: '0.65rem' }}>Virtual Assistant Indonesia</span>
            </div>

            <div style={{
              width: '100%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '1.15rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              textAlign: 'left',
              marginTop: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{language === 'id' ? 'Nama' : 'Name'}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700 }}>Muhammad Syafiq</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{language === 'id' ? 'Umur' : 'Age'}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700 }}>20 {language === 'id' ? 'Tahun' : 'Years'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{language === 'id' ? 'Asal' : 'Origin'}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700 }}>Indonesia 🇮🇩</span>
              </div>
            </div>
          </div>

          {/* Bio & Skills column */}
          <div className="glass-panel about-card" style={{ height: '100%' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>{t.aboutPhilosophyTitle}</h3>
            <p className="about-bio" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
              {t.aboutPhilosophyDesc}
            </p>

            {/* Quick Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>4+</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.aboutStatsExp}</p>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>25+</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.aboutStatsDone}</p>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <h4 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>99%</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.aboutStatsClients}</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>{t.aboutCapabilities}</h3>
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
              style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}
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
          <div className="timeline" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {t.aboutTimeline.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-panel timeline-card" style={{ padding: '1.25rem 1.5rem' }}>
                  <div className="timeline-date" style={{ fontSize: '0.8rem' }}>{item.date}</div>
                  <h3 className="timeline-title" style={{ fontSize: '1.15rem' }}>{item.title}</h3>
                  <div className="timeline-org" style={{ fontSize: '0.85rem' }}>{item.org}</div>
                  <p className="timeline-desc" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</p>
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
