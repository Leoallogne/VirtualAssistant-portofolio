import React, { useState, useEffect, useRef } from 'react';

const DailyRoutine = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const routine = [
    { 
      time: '08:00 AM', 
      title: 'Inbox Zero & Triage', 
      desc: 'Clearing unread emails, organizing priority tasks, and flagging urgent client messages.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    },
    { 
      time: '10:00 AM', 
      title: 'Deep Work Session', 
      desc: 'Focusing on complex tasks: research, content creation, and data entry.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
    { 
      time: '01:00 PM', 
      title: 'Client Sync & Meetings', 
      desc: 'Weekly check-ins, progress updates, and strategy alignment.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    { 
      time: '03:00 PM', 
      title: 'Admin & Wrap-up', 
      desc: 'Scheduling social media, updating CRM, and sending end-of-day reports.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate how much of the container has been scrolled past
        let progress = ((windowHeight - rect.top) / (rect.height + windowHeight)) * 100;
        // Adjust formula so it lights up earlier
        progress = Math.max(0, Math.min(100, progress * 1.2));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section-padding" style={{ padding: '6rem 2rem', overflow: 'hidden' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          A Day in the <span style={{ color: 'var(--accent)' }}>Life</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          My structured daily workflow ensures that your tasks are handled efficiently, leaving you free to focus on growth.
        </p>
      </div>

      <div ref={containerRef} className="timeline-container" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        
        {/* Central Vertical Timeline */}
        <div className="timeline-line-center" style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '4px',
          background: 'var(--glass-border)',
          transform: 'translateX(-50%)',
          borderRadius: '2px',
          zIndex: 0
        }}>
          {/* Animated Fill Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${scrollProgress}%`,
            background: 'var(--gradient-primary)',
            boxShadow: '0 0 15px var(--accent-glow)',
            borderRadius: '2px',
            transition: 'height 0.2s ease-out'
          }} />
        </div>

        {routine.map((item, index) => {
          const isLeft = index % 2 === 0;
          // Calculate when this item should "light up" based on scroll progress
          const itemThreshold = (index / routine.length) * 100;
          const isActive = scrollProgress > itemThreshold;

          return (
            <div 
              key={index}
              className={`timeline-item ${isLeft ? 'left' : 'right'}`}
              style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                marginBottom: index === routine.length - 1 ? '0' : '4rem',
                position: 'relative',
                zIndex: 1,
                opacity: isActive ? 1 : 0.4,
                transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Central Node Icon */}
              <div className="timeline-icon-center" style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isActive ? 'var(--gradient-primary)' : 'var(--bg-secondary)',
                border: isActive ? 'none' : '2px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isActive ? 'white' : 'var(--text-muted)',
                boxShadow: isActive ? '0 0 20px var(--accent-glow)' : 'none',
                transition: 'all 0.4s ease',
                zIndex: 2
              }}>
                <div style={{ transform: 'scale(0.8)' }}>
                  {item.icon}
                </div>
              </div>

              {/* Content Card */}
              <div className="timeline-content" style={{ 
                width: '45%',
                padding: isLeft ? '0 2rem 0 0' : '0 0 0 2rem'
              }}>
                <div className="glass-panel" style={{
                  padding: '2rem',
                  position: 'relative',
                  border: isActive ? '1px solid var(--accent)' : '1px solid var(--glass-border)',
                  boxShadow: isActive ? '0 10px 30px var(--accent-glow)' : 'var(--shadow-md)',
                  transition: 'all 0.4s ease'
                }}>
                  
                  <div style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    background: isActive ? 'var(--accent-glow)' : 'var(--bg-tertiary)',
                    color: isActive ? 'var(--accent)' : 'var(--text-main)',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    letterSpacing: '1px'
                  }}>
                    {item.time}
                  </div>

                  <h4 style={{ 
                    fontSize: '1.4rem', 
                    marginBottom: '0.75rem',
                    color: 'var(--text-main)'
                  }}>
                    {item.title}
                  </h4>
                  
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Responsive adjustments for mobile zigzag */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-line-center {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-icon-center {
            left: 20px !important;
          }
          .timeline-item {
            justify-content: flex-end !important;
          }
          .timeline-content {
            width: 100% !important;
            padding: 0 0 0 4rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DailyRoutine;
