import React, { useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const ProjectModal = ({ project, onClose, setActivePage }) => {
  const { language } = useContext(LanguageContext);

  // Prevent body scrolling when modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  // Simple localized labels mapping
  const labels = {
    id: {
      role: 'Peran',
      client: 'Klien / Konteks',
      duration: 'Durasi',
      stack: 'Stack Utama',
      overview: 'Ikhtisar Pekerjaan & Simulasi',
      features: 'Pencapaian & Fitur Kunci',
      btnLive: 'Luncurkan Halaman Hasil Kerja',
      btnCode: 'Lihat Kode Sumber'
    },
    en: {
      role: 'Role',
      client: 'Client / Context',
      duration: 'Duration',
      stack: 'Primary Stack',
      overview: 'Work Overview & Simulation',
      features: 'Key Accomplishments & Deliverables',
      btnLive: 'Launch Live Workspace',
      btnCode: 'Browse Source Code'
    }
  }[language] || {
    role: 'Role',
    client: 'Client / Context',
    duration: 'Duration',
    stack: 'Primary Stack',
    overview: 'Work Overview & Simulation',
    features: 'Key Accomplishments & Deliverables',
    btnLive: 'Launch Live Workspace',
    btnCode: 'Browse Source Code'
  };

  const handleLaunchWorkspace = () => {
    onClose();
    setActivePage(project.pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div 
        className="glass-panel modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close details modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Banner Hero */}
        <div className="modal-hero">
          <img 
            src={project.image} 
            alt={project.title} 
            className="modal-hero-img"
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2.5rem 2.5rem 1.5rem 2.5rem',
            background: 'linear-gradient(to top, var(--bg-secondary) 15%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div className="project-tags" style={{ marginBottom: '0.5rem' }}>
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>
              <h3 style={{ fontSize: '2.25rem', color: 'var(--text-main)' }}>{project.title}</h3>
            </div>
          </div>
        </div>

        {/* Modal Content Details */}
        <div className="modal-body">
          {/* Metadata Matrix */}
          <div className="modal-meta-grid">
            <div className="modal-meta-item">
              <h4>{labels.role}</h4>
              <p>{project.meta.role}</p>
            </div>
            <div className="modal-meta-item">
              <h4>{labels.client}</h4>
              <p>{project.meta.client}</p>
            </div>
            <div className="modal-meta-item">
              <h4>{labels.duration}</h4>
              <p>{project.meta.duration}</p>
            </div>
            <div className="modal-meta-item">
              <h4>{labels.stack}</h4>
              <p>{project.meta.stack}</p>
            </div>
          </div>

          {/* Project Details Description */}
          <div className="modal-desc">
            <h4 style={{ color: 'var(--text-main)', fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
              {labels.overview}
            </h4>
            <p style={{ marginBottom: '1.5rem' }}>{project.longDesc}</p>
            
            <h4 style={{ color: 'var(--text-main)', fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
              {labels.features}
            </h4>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              {project.features.map((feat, i) => (
                <li key={i} style={{ color: 'var(--text-muted)' }}>{feat}</li>
              ))}
            </ul>
          </div>

          {/* Action Anchors */}
          <div className="modal-actions">
            <button 
              onClick={handleLaunchWorkspace} 
              className="btn btn-primary"
            >
              {labels.btnLive}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
            <a 
              href={project.links.repo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              {labels.btnCode}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
