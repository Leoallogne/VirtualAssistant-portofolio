import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    // Lock body scrolling during splash display
    document.body.style.overflow = 'hidden';

    // Start transition-out animation at 1600ms
    const animOutTimeout = setTimeout(() => {
      setAnimatingOut(true);
    }, 1600);

    // Unmount splash screen fully at 2100ms
    const vanishTimeout = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = 'unset';
    }, 2100);

    return () => {
      clearTimeout(animOutTimeout);
      clearTimeout(vanishTimeout);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`splash-wrapper ${animatingOut ? 'splash-exit' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--bg-primary)',
        zIndex: 9999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: animatingOut ? 0 : 1,
        visibility: animatingOut ? 'hidden' : 'visible',
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s ease',
        pointerEvents: animatingOut ? 'none' : 'auto'
      }}
    >
      {/* Visual Ambient Glow Orb */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        filter: 'blur(50px)',
        opacity: 0.25,
        animation: 'pulse-slow 2s infinite alternate'
      }} />

      {/* Centered Glass Emblem Container */}
      <div 
        className="glass-panel"
        style={{
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          zIndex: 2,
          boxShadow: 'var(--shadow-lg), 0 0 30px var(--accent-glow)',
          transform: animatingOut ? 'scale(0.85)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'float-emblem 3s ease-in-out infinite'
        }}
      >
        <span 
          style={{
            fontSize: '3.5rem',
            animation: 'lightning-pulse 1s ease-in-out infinite alternate',
            filter: 'drop-shadow(0 0 15px var(--accent-secondary))',
            display: 'inline-block'
          }}
        >
          ⚡
        </span>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0% { transform: scale(0.9); opacity: 0.15; }
          100% { transform: scale(1.1); opacity: 0.3; }
        }
        @keyframes float-emblem {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes lightning-pulse {
          0% { transform: scale(0.92); opacity: 0.8; }
          100% { transform: scale(1.08); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
