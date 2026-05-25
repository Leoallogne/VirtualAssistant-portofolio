import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import BackgroundCanvas from './components/BackgroundCanvas';
import Hero from './components/Hero';
import TechCarousel from './components/TechCarousel';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import CertificationGrid from './components/CertificationGrid';
import TestimonialsSlider from './components/TestimonialsSlider';
import TechBlog from './components/TechBlog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';

function AppContent() {
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      const initialTheme = prefersLight ? 'light' : 'dark';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []);

  // Track window scroll progress for top gradient indicator bar
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <>
      {/* Premium SplashScreen and Custom Cursor tracking details */}
      <SplashScreen />
      <CustomCursor />

      {/* Top glowing progress depth bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Dynamic interactive canvas backdrop */}
      <BackgroundCanvas theme={theme} />

      {/* Main visual modules mapping */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <TechCarousel />
      <About />
      <Projects />
      <Services />
      <CertificationGrid />
      <TestimonialsSlider />
      <TechBlog />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
