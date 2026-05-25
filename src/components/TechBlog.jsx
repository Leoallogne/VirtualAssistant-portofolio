import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const TechBlog = () => {
  const { t } = useContext(LanguageContext);

  const posts = [
    {
      tag: 'Performance',
      date: 'May 12, 2026',
      readTime: '5',
      title: {
        id: 'Mengoptimalkan Performa Render React di Aplikasi Skala Besar',
        en: 'Optimizing React Rendering Performance in Large-Scale Web Apps'
      },
      desc: {
        id: 'Panduan mendalam tentang penanganan rekursi rendering, memoisasi pintar menggunakan useMemo, dan teknik containment CSS visual.',
        en: 'A deep dive into managing high-frequency render loops, intelligent memoization using React hooks, and visual layout containment styles.'
      }
    },
    {
      tag: 'UI/UX Design',
      date: 'April 28, 2026',
      readTime: '4',
      title: {
        id: 'Merancang Sistem Desain Glassmorphic yang Konsisten & Berperforma Tinggi',
        en: 'Architecting High-Performance & Consistent Glassmorphic Design Systems'
      },
      desc: {
        id: 'Bagaimana memanfaatkan token desain HSL, variabel CSS global responsif, dan properti filter backdrop agar tetap memiliki rendering 60FPS.',
        en: 'How to utilize HSL design tokens, responsive custom variables, and hardware-accelerated backdrop-filters to maintain pure 60FPS scrolls.'
      }
    },
    {
      tag: 'Backend',
      date: 'April 15, 2026',
      readTime: '6',
      title: {
        id: 'Membangun Arsitektur API Gerbang yang Aman di Lingkungan Node.js',
        en: 'Building Bulletproof Server API Gateways in Node.js Environments'
      },
      desc: {
        id: 'Mengupas praktik keamanan terbaik mulai dari otorisasi JWT, pembatasan muatan kueri SQL/NoSQL, hingga penanganan serangan brute-force.',
        en: 'Unpacking API security benchmarks including secure JWT controls, rate limiters, database payload sanitization, and brute-force mitigation.'
      }
    }
  ];

  return (
    <section id="blog">
      {/* Dynamic ambient bubbles */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-3" style={{ bottom: '10%', right: '-150px' }}></div>
      </div>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">{t.blogTag}</span>
          <h2 className="section-title">
            {t.blogTitle} <span className="text-gradient">{t.blogTitleBold}</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto 3rem auto' }}>
            {t.blogDesc}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.25rem'
        }}>
          {posts.map((post, index) => (
            <article 
              key={index} 
              className="glass-panel"
              style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '1.25rem',
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-secondary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg), 0 5px 20px var(--accent-secondary-glow)';
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Meta tags */}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span className="project-tag" style={{ fontSize: '0.7rem' }}>{post.tag}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.date}</span>
              </div>

              {/* Title & Excerpt */}
              <div style={{ flexGrow: 1 }}>
                <h3 style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  lineHeight: 1.4,
                  color: 'var(--text-main)'
                }}>
                  {t.contactFormSuccessTitle.includes('Terkirim') ? post.title.id : post.title.en}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)'
                }}>
                  {t.contactFormSuccessTitle.includes('Terkirim') ? post.desc.id : post.desc.en}
                </p>
              </div>

              {/* Reading Metrics & Anchor */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--glass-border)'
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {post.readTime} {t.blogReadTime}
                </span>

                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-btn"
                  style={{
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontWeight: 700
                  }}
                >
                  {t.blogBtnRead}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechBlog;
