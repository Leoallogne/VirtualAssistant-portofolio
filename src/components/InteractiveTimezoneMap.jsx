import React, { useState, useEffect } from 'react';

const InteractiveTimezoneMap = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timezones = [
    { label: 'Los Angeles (PST)', zone: 'America/Los_Angeles' },
    { label: 'New York (EST)', zone: 'America/New_York' },
    { label: 'London (GMT)', zone: 'Europe/London' },
    { label: 'Jakarta (WIB) - My Local Time', zone: 'Asia/Jakarta', isLocal: true },
    { label: 'Sydney (AEST)', zone: 'Australia/Sydney' },
  ];

  const formatTime = (date, timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  const getDayStatus = (date, timeZone) => {
    const hour = parseInt(new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      hour12: false
    }).format(date), 10);

    if (hour >= 6 && hour < 12) return 'Morning 🌅';
    if (hour >= 12 && hour < 18) return 'Afternoon ☀️';
    if (hour >= 18 && hour < 22) return 'Evening 🌆';
    return 'Night 🌙';
  };

  return (
    <section className="section-padding" style={{ padding: '4rem 2rem' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Global <span style={{ color: 'var(--accent)' }}>Availability</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Seamless collaboration across borders. I adapt to your timezone to ensure fast and reliable communication.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {timezones.map((tz, index) => (
          <div 
            key={index} 
            className="glass-panel"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: tz.isLocal ? '1px solid var(--accent)' : '1px solid var(--glass-border)',
              boxShadow: tz.isLocal ? '0 0 20px var(--accent-glow)' : 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {tz.isLocal && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'var(--gradient-primary)'
              }} />
            )}
            
            <h4 style={{ 
              color: tz.isLocal ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {tz.label}
            </h4>
            
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--text-main)',
              fontFamily: 'monospace',
              marginBottom: '0.5rem'
            }}>
              {formatTime(time, tz.zone)}
            </div>
            
            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: 'var(--text-main)'
            }}>
              {getDayStatus(time, tz.zone)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InteractiveTimezoneMap;
