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

  // Localized labels mapping
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

  // Render mock Google Sheets / Excel tracker preview inside Modal
  const renderSpreadsheetPreview = () => {
    const isIndo = language === 'id';
    
    const sheetData = {
      1: {
        title: '✉️ INDONESIA CULINARY - EMAIL CORRESPONDENCE LEDGER',
        headers: isIndo 
          ? ['No', 'Pengirim', 'Kategori', 'Prioritas', 'Status']
          : ['No', 'Sender', 'Category', 'Priority', 'Status'],
        rows: [
          ['1', 'Agung (Supplier)', isIndo ? 'Pemasok' : 'Supplier', 'Medium', 'RESOLVED 🟢'],
          ['2', 'Sisca (Customer)', isIndo ? 'Pelanggan' : 'Customer', 'High', 'RESOLVED 🟢'],
          ['3', 'Budi (Partner)', isIndo ? 'Mitra' : 'Partner', 'Low', 'PENDING 🟡']
        ]
      },
      2: {
        title: '📅 FOUNDER MASTER APPOINTMENT LOG - Q2 2026',
        headers: isIndo
          ? ['ID Rapat', 'Nama Klien', 'Waktu Jadwal', 'Zona Waktu', 'Status']
          : ['Meeting ID', 'Client Name', 'Scheduled Time', 'Timezone', 'Status'],
        rows: [
          ['MTG-101', 'Alice Vance', 'Mon, 10:00 AM', 'EST (UTC -5)', 'CONFIRMED 🟢'],
          ['MTG-102', 'Budi Harjo', 'Tue, 03:00 PM', 'WIB (UTC +7)', 'REMINDED 🔵'],
          ['MTG-103', 'John Doe', 'Thu, 09:30 AM', 'GMT (UTC +0)', 'CONFIRMED 🟢']
        ]
      },
      3: {
        title: '📊 CULINARY MSME CONTENT SCHEDULER & METRICS',
        headers: isIndo
          ? ['Tanggal Rilis', 'Topik Konten', 'Jenis Niche', 'Est Jangkauan', 'Status']
          : ['Publish Date', 'Post Topic', 'Niche Type', 'Est Reach', 'Status'],
        rows: [
          ['2026-05-26', 'Visual Es Krim', isIndo ? 'Feed Grid' : 'Culinary Grid', '15,000+', 'PUBLISHED 🟢'],
          ['2026-05-28', 'Tips Kuliner', isIndo ? 'Tips & Trik' : 'Tips & Tricks', '8,500+', 'SCHEDULED 🔵'],
          ['2026-06-01', 'Promo Merdeka', isIndo ? 'Kupon Promo' : 'Culinary Promo', '25,000+', 'DRAFT 🟡']
        ]
      },
      4: {
        title: '📂 OPERATIONS CRM - CLIENT ONBOARDING TRACKER',
        headers: isIndo
          ? ['Nama Klien', 'Industri Niche', 'Fase SOP Aktif', 'Progress Tugas', 'Pembayaran']
          : ['Client Name', 'Niche Industry', 'SOP Active Step', 'Task Progress', 'Payment Status'],
        rows: [
          ['Warung Nusantara', 'Food & Culinary', 'Day 3-5: Integration', '3/5 Tasks', 'PAID 🟢'],
          ['Aura Studio', 'Creative Agency', 'Day 1-2: Setup', '1/3 Tasks', 'INVOICED 🟡'],
          ['Vortex Corp', 'Digital SaaS', 'Day 6-7: Launch', '5/5 Tasks', 'PAID 🟢']
        ]
      }
    }[project.id] || null;

    if (!sheetData) return null;

    return (
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', marginBottom: '0.65rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📊</span> {isIndo ? 'Cuplikan Spreadsheet Audit Log' : 'Audit Log Spreadsheet Preview'}
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
          {isIndo 
            ? 'Struktur pencatatan ledger administratif yang terintegrasi langsung di dalam Workspace simulator operasional proyek ini:'
            : 'Structured administrative ledger logging sheet integrated directly inside this project\'s simulator Workspace:'}
        </p>

        <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-sm)' }}>
          {/* Spreadsheet Header Title */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderBottom: '1px solid var(--glass-border)', fontSize: '0.7rem', fontWeight: 800, fontFamily: 'monospace', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {sheetData.title}
          </div>
          
          {/* Spreadsheet Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'monospace', fontSize: '0.72rem' }}>
              <thead>
                <tr style={{ background: 'rgba(var(--glow-rgb), 0.03)', borderBottom: '1px solid var(--glass-border)' }}>
                  {sheetData.headers.map((h, i) => (
                    <th key={i} style={{ padding: '0.75rem 1rem', color: 'var(--text-main)', fontWeight: 700, borderRight: '1px solid var(--glass-border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sheetData.rows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: rIdx === sheetData.rows.length - 1 ? 'none' : '1px solid var(--glass-border)', background: 'transparent' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', borderRight: '1px solid var(--glass-border)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
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

            {/* Google Sheets Spreadsheet Audit Log mini-preview */}
            {renderSpreadsheetPreview()}
            
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
