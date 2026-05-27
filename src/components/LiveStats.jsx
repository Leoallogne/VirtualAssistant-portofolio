import React, { useState, useEffect, useRef } from 'react';

const StatItem = ({ endValue, label, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (statRef.current) observer.observe(statRef.current);
    return () => {
      if (statRef.current) observer.unobserve(statRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out function for smooth slow down at the end
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(endValue * easeOutQuart));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration, isVisible]);

  return (
    <div ref={statRef} className="glass-panel" style={{
      padding: '2rem',
      textAlign: 'center',
      border: '1px solid var(--accent)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'var(--accent-glow)',
        opacity: 0.2,
        zIndex: 0
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          color: 'var(--text-main)',
          fontFamily: 'monospace',
          marginBottom: '0.5rem',
          textShadow: '0 0 20px var(--accent-glow)'
        }}>
          {count}{suffix}
        </div>
        <div style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {label}
        </div>
      </div>
    </div>
  );
};

const LiveStats = () => {
  const stats = [
    { endValue: 1200, suffix: '+', label: 'Hours Saved' },
    { endValue: 5000, suffix: '+', label: 'Emails Handled' },
    { endValue: 300, suffix: '+', label: 'Meetings Set' },
    { endValue: 15, label: 'Happy Clients' }
  ];

  return (
    <section className="section-padding" style={{ padding: '4rem 2rem', background: 'var(--bg-secondary)' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Impact by the <span style={{ color: 'var(--accent)' }}>Numbers</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Real results delivered through streamlined processes and dedicated virtual assistance.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {stats.map((stat, index) => (
          <StatItem 
            key={index} 
            endValue={stat.endValue} 
            suffix={stat.suffix} 
            label={stat.label} 
            duration={2000 + (index * 500)} // Staggered animations
          />
        ))}
      </div>
    </section>
  );
};

export default LiveStats;
