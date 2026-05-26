import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import ProjectModal from './ProjectModal';

const Projects = ({ setActivePage }) => {
  const { t } = useContext(LanguageContext);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { label: t.projectsFilterAll, value: 'all' },
    { label: t.projectsFilterFrontend, value: 'admin' },
    { label: t.projectsFilterBackend, value: 'research' },
    { label: t.projectsFilterDesign, value: 'social_media' },
  ];

  const staticProjects = [
    {
      id: 1,
      category: 'admin',
      tags: ['Email Triage', 'Inbox Zero', 'Client Care', 'SOPs'],
      image: '/project_nova.png',
      pageId: 'project-zero',
      links: {
        live: 'https://github.com',
        repo: 'https://github.com'
      }
    },
    {
      id: 2,
      category: 'research',
      tags: ['Scheduling', 'Calendar Sync', 'CRM Log', 'Spreadsheets'],
      image: '/project_chronos.png',
      pageId: 'project-calendar',
      links: {
        live: 'https://github.com',
        repo: 'https://github.com'
      }
    },
    {
      id: 3,
      category: 'social_media',
      tags: ['Canva Graphics', 'Meta Suite', 'Buffer Plan', 'Caption Copy'],
      image: '/project_aura.png',
      pageId: 'project-social',
      links: {
        live: 'https://github.com',
        repo: 'https://github.com'
      }
    },
    {
      id: 4,
      category: 'admin',
      tags: ['Notion Setup', 'SOP Builder', 'Agile Kanban', 'Automation'],
      image: '/project_vortex.png',
      pageId: 'project-notion',
      links: {
        live: 'https://github.com',
        repo: 'https://github.com'
      }
    }
  ];

  // Map translations directly to static assets using index mappings
  const projectsData = staticProjects.map((proj, idx) => ({
    ...proj,
    title: t.projectsData[idx].title,
    desc: t.projectsData[idx].desc,
    longDesc: t.projectsData[idx].longDesc,
    kpi: t.projectsData[idx].kpi,
    meta: {
      role: t.projectsData[idx].role,
      client: t.projectsData[idx].client,
      duration: t.projectsData[idx].duration,
      stack: t.projectsData[idx].stack
    },
    features: t.projectsData[idx].features
  }));

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeFilter);

  const handleLaunchWorkspace = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)', padding: '6rem 0', position: 'relative' }}>
      {/* Dynamic bubbles inside sections */}
      <div className="ambient-glows">
        <div className="glow-bubble glow-bubble-3"></div>
      </div>

      <div className="container">
        <div className="projects-header">
          <div>
            <span className="section-tag">{t.projectsTag}</span>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
              {t.projectsTitle} <span className="text-gradient">{t.projectsTitleBold}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '550px' }}>
              {t.projectsDesc}
            </p>
          </div>

          {/* Filter menu */}
          <ul className="filter-menu">
            {filters.map((filter) => (
              <li key={filter.value}>
                <button
                  className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="glass-panel project-card">
              
              {/* Project Image Box with Hover Overlay & KPI Badge */}
              <div className="project-image-box">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-img"
                  loading="lazy"
                />
                
                {/* Visual KPI Performance Metric Badge */}
                <span className="project-kpi-badge">
                  {project.kpi}
                </span>

                {/* Glass Hover Launch Workspace Trigger Overlay */}
                <div 
                  className="project-hover-overlay"
                  onClick={() => handleLaunchWorkspace(project.pageId)}
                >
                  <span className="project-hover-btn">
                    ⚡ Launch Workspace
                  </span>
                </div>
              </div>

              <div className="project-body">
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                
                {/* Visual Action Rows */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <button 
                    className="project-btn"
                    style={{ fontSize: '0.82rem', fontWeight: 700 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {t.projectsBtnView}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>

                  <button 
                    className="project-btn"
                    style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-secondary)' }}
                    onClick={() => handleLaunchWorkspace(project.pageId)}
                  >
                    ⚡ Launch Workspace
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Details Modal Portal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          setActivePage={setActivePage}
        />
      )}
    </section>
  );
};

export default Projects;
