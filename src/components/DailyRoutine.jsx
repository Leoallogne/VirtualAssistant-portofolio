import React, { useState } from 'react';

const DailyRoutine = () => {
  const [activeStep, setActiveStep] = useState(null);

  const routine = [
    { time: '08:00 AM', title: 'Inbox Zero & Triage', desc: 'Clearing unread emails, organizing priority tasks, and flagging urgent client messages.' },
    { time: '10:00 AM', title: 'Deep Work Session', desc: 'Focusing on complex tasks: research, content creation, and data entry.' },
    { time: '01:00 PM', title: 'Client Sync & Meetings', desc: 'Weekly check-ins, progress updates, and strategy alignment.' },
    { time: '03:00 PM', title: 'Admin & Wrap-up', desc: 'Scheduling social media, updating CRM, and sending end-of-day reports.' }
  ];

  return (
    <section className="section-padding" style={{ padding: '4rem 2rem' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          A Day in the <span style={{ color: 'var(--accent)' }}>Life</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          My structured daily workflow ensures that your tasks are handled efficiently, leaving you free to focus on growth.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        {/* Vertical Line */}
        <div style={{
          position: 'absolute',
          left: '50px',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'var(--glass-border)',
          zIndex: 0
        }} />

        {routine.map((item, index) => (
          <div 
            key={index}
            onMouseEnter={() => setActiveStep(index)}
            onMouseLeave={() => setActiveStep(null)}
            style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '3rem',
              position: 'relative',
              zIndex: 1,
              opacity: activeStep === null || activeStep === index ? 1 : 0.5,
              transition: 'opacity 0.3s ease',
              alignItems: 'flex-start'
            }}
          >
            <div style={{
              minWidth: '100px',
              padding: '0.5rem',
              background: activeStep === index ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
              color: activeStep === index ? 'white' : 'var(--text-main)',
              borderRadius: '8px',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              boxShadow: activeStep === index ? '0 0 15px var(--accent-glow)' : 'none'
            }}>
              {item.time}
            </div>

            <div className="glass-panel" style={{
              padding: '1.5rem',
              flex: 1,
              border: activeStep === index ? '1px solid var(--accent)' : '1px solid var(--glass-border)',
              transform: activeStep === index ? 'translateX(10px)' : 'translateX(0)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              <h4 style={{ 
                fontSize: '1.25rem', 
                marginBottom: '0.5rem',
                color: activeStep === index ? 'var(--accent)' : 'var(--text-main)'
              }}>
                {item.title}
              </h4>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyRoutine;
