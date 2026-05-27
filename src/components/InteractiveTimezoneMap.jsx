import React, { useState, useEffect } from 'react';

const InteractiveTimezoneMap = () => {
  const [time, setTime] = useState(new Date());
  const [hoveredZone, setHoveredZone] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timezones = [
    { id: 'la', label: 'Los Angeles', code: 'PST', zone: 'America/Los_Angeles', top: '35%', left: '15%' },
    { id: 'ny', label: 'New York', code: 'EST', zone: 'America/New_York', top: '30%', left: '25%' },
    { id: 'ld', label: 'London', code: 'GMT', zone: 'Europe/London', top: '25%', left: '48%' },
    { id: 'jk', label: 'Jakarta', code: 'WIB', zone: 'Asia/Jakarta', top: '60%', left: '75%', isLocal: true },
    { id: 'sy', label: 'Sydney', code: 'AEST', zone: 'Australia/Sydney', top: '75%', left: '88%' },
  ];

  const formatTime = (date, timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
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

    if (hour >= 6 && hour < 12) return { text: 'Morning', icon: '🌅', color: '#fbbf24' }; // Amber
    if (hour >= 12 && hour < 18) return { text: 'Afternoon', icon: '☀️', color: '#f59e0b' }; // Orange
    if (hour >= 18 && hour < 22) return { text: 'Evening', icon: '🌆', color: '#8b5cf6' }; // Purple
    return { text: 'Night', icon: '🌙', color: '#3b82f6' }; // Blue
  };

  return (
    <section className="section-padding" style={{ padding: '6rem 2rem' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Global <span style={{ color: 'var(--accent)' }}>Adaptivity</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          My command center adapts to your time. Hover over any location to synchronize our clocks.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Radar Map Container */}
        <div className="glass-panel" style={{ 
          position: 'relative',
          height: '400px',
          marginBottom: '2rem',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(var(--glass-border) 2px, transparent 2px)',
          backgroundSize: '30px 30px',
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5), var(--shadow-lg)',
          border: '1px solid var(--glass-border)'
        }}>
          {/* Scanning Line overlay */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--accent))',
            transformOrigin: 'left center',
            animation: 'radar-spin 4s linear infinite',
            opacity: 0.3,
            zIndex: 0
          }} />

          <style>{`
            @keyframes radar-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse-ring {
              0% { transform: scale(0.8); opacity: 0.8; }
              100% { transform: scale(2.5); opacity: 0; }
            }
          `}</style>

          {/* Map Pins */}
          {timezones.map((tz) => {
            const isHovered = hoveredZone === tz.id;
            const status = getDayStatus(time, tz.zone);
            
            return (
              <div 
                key={tz.id}
                style={{
                  position: 'absolute',
                  top: tz.top,
                  left: tz.left,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered ? 10 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Glowing Dot */}
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: isHovered ? 'var(--accent)' : (tz.isLocal ? 'var(--accent-secondary)' : 'var(--glass-border-hover)'),
                  boxShadow: isHovered ? '0 0 20px var(--accent)' : 'none',
                  position: 'relative',
                }}>
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      animation: 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite'
                    }}/>
                  )}
                </div>
                
                {/* Tooltip visible only on hover */}
                <div style={{
                  marginTop: '10px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${status.color}50`,
                  padding: '0.5rem 1rem',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  pointerEvents: 'none'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-main)' }}>{tz.label}</div>
                  <div style={{ color: status.color, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {status.icon} {formatTime(time, tz.zone)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Cards below the map */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
        }}>
          {timezones.map((tz) => {
            const status = getDayStatus(time, tz.zone);
            return (
              <div 
                key={tz.id}
                onMouseEnter={() => setHoveredZone(tz.id)}
                onMouseLeave={() => setHoveredZone(null)}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  border: hoveredZone === tz.id ? `1px solid ${status.color}` : (tz.isLocal ? '1px solid var(--accent)' : '1px solid var(--glass-border)'),
                  transform: hoveredZone === tz.id ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoveredZone === tz.id ? `0 10px 30px ${status.color}30` : 'var(--shadow-md)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h4 style={{ 
                    color: tz.isLocal ? 'var(--accent)' : 'var(--text-muted)',
                    fontSize: '1rem',
                    fontWeight: '700',
                  }}>
                    {tz.code}
                  </h4>
                  <span style={{ fontSize: '1.2rem' }}>{status.icon}</span>
                </div>
                
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: 'var(--text-main)',
                  fontFamily: 'monospace',
                  marginBottom: '0.5rem'
                }}>
                  {formatTime(time, tz.zone).split(' ')[0]}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
                    {formatTime(time, tz.zone).split(' ')[1]}
                  </span>
                </div>
                
                <div style={{ fontSize: '0.85rem', color: status.color, fontWeight: '500' }}>
                  {tz.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimezoneMap;
