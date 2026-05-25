import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const { t } = useContext(LanguageContext);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { label: t.projectsFilterAll, value: 'all' },
    { label: t.projectsFilterFrontend, value: 'frontend' },
    { label: t.projectsFilterBackend, value: 'backend' },
    { label: t.projectsFilterDesign, value: 'design' },
  ];

  const staticProjects = [
    {
      id: 1,
      category: 'frontend',
      tags: ['React', 'Vite', 'Vanilla CSS', 'Redux'],
      image: '/project_nova.png',
      links: {
        live: 'https://github.com',
        repo: 'https://github.com'
      }
    },
    {
      id: 2,
      category: 'backend',
      tags: ['Node.js', 'Express', 'React', 'MongoDB'],
      image: '/project_chronos.png',
      links: {
        live: 'https://github.com',
        repo: 'https://github.com'
      }
    },
    {
      id: 3,
      category: 'design',
      tags: ['UI/UX', 'Figma', 'React', 'CSS Gradients'],
      image: '/project_aura.png',
      links: {
        live: 'https://github.com',
        repo: 'https://github.com'
      }
    },
    {
      id: 4,
      category: 'frontend',
      tags: ['React', 'SVG Charts', 'API Integration', 'CSS variables'],
      image: '/project_vortex.png',
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

  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
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
              <div className="project-image-box">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-img"
                  loading="lazy"
                />
              </div>
              <div className="project-body">
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <button 
                  className="project-btn"
                  onClick={() => setSelectedProject(project)}
                >
                  {t.projectsBtnView}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
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
        />
      )}
    </section>
  );
};

export default Projects;
