import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import BackgroundCanvas from './components/BackgroundCanvas';
import Hero from './components/Hero';
import TechCarousel from './components/TechCarousel';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import ROICalculator from './components/ROICalculator';
import TaskSimulator from './components/TaskSimulator';
import OnboardingFlow from './components/OnboardingFlow';
import CertificationGrid from './components/CertificationGrid';
import TestimonialsSlider from './components/TestimonialsSlider';
import TechBlog from './components/TechBlog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';

// Import experience center sandbox pages
import InboxZeroPage from './pages/InboxZeroPage';
import CalendarPage from './pages/CalendarPage';
import SocialMediaPage from './pages/SocialMediaPage';
import NotionWorkspacePage from './pages/NotionWorkspacePage';

function AppContent() {
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePage, setActivePage] = useState('home');

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

  // Reset scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'project-zero':
        return <InboxZeroPage setActivePage={setActivePage} />;
      case 'project-calendar':
        return <CalendarPage setActivePage={setActivePage} />;
      case 'project-social':
        return <SocialMediaPage setActivePage={setActivePage} />;
      case 'project-notion':
        return <NotionWorkspacePage setActivePage={setActivePage} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <TechCarousel />
            <About />
            <Projects setActivePage={setActivePage} />
            <Services />
            <ROICalculator />
            <TaskSimulator />
            <OnboardingFlow />
            <CertificationGrid />
            <TestimonialsSlider />
            <TechBlog />
            <Contact />
            <Footer />
          </>
        );
    }
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
      <Navbar theme={theme} toggleTheme={toggleTheme} activePage={activePage} setActivePage={setActivePage} />
      
      {renderActivePage()}
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
