import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useContext(LanguageContext);

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer>
      <div className="container footer-inner">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <h4 style={{
            fontSize: '1.25rem',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-main)',
            fontWeight: 800
          }}>
            ⚡ Leo.S
          </h4>
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Leo Syafiq. {t.footerRights}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a 
            href="#hero" 
            onClick={handleScrollToTop} 
            className="nav-link"
            style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}
          >
            Scroll to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
