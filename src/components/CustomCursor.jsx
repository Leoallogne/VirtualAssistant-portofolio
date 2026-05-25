import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  // Position tracking using spring physics
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is mobile/touchscreen
    const checkMobile = () => {
      const mobileCheck = window.matchMedia('(max-width: 768px)').matches || 
                          ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0);
      setIsMobile(mobileCheck);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return () => window.removeEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track clickables for snap-glow effect
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, .filter-btn, .project-btn, .social-btn');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    // Set up a mutation observer to track dynamically added buttons/cards
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial bindings
    addHoverListeners();

    // Animation Tick Loop (lerp calculation)
    let animationId;
    const tick = () => {
      const ease = 0.15; // Spring smoothness factor

      // Instant inner dot placement
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0)`;
      }

      // Smooth lag outer circle placement
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * ease;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * ease;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0)`;
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div 
        ref={cursorDotRef} 
        className={`custom-cursor-dot ${hidden ? 'cursor-hidden' : ''}`}
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--accent-secondary)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999999,
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'transform 0.05s linear, opacity 0.3s ease'
        }}
      />
      <div 
        ref={cursorRingRef} 
        className={`custom-cursor-ring ${hidden ? 'cursor-hidden' : ''} ${hovered ? 'cursor-hover' : ''}`}
        style={{
          width: '36px',
          height: '36px',
          border: '2px solid var(--accent)',
          borderRadius: '50%',
          position: 'fixed',
          top: -18,
          left: -18,
          pointerEvents: 'none',
          zIndex: 999998,
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, opacity 0.3s ease'
        }}
      />
    </>
  );
};

export default CustomCursor;
