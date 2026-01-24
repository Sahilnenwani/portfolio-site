'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import heavy animation components to avoid SSR issues
const IntroAnimation = dynamic(() => import('./IntroAnimation'), { 
  ssr: false,
  loading: () => null 
});

const ParticleField = dynamic(() => import('./ParticleField'), { 
  ssr: false,
  loading: () => null 
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has seen intro in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
    // Delay to allow exit animation
    setTimeout(() => setIntroComplete(true), 500);
  };

  return (
    <>
      {/* Intro Animation - shows once per session */}
      {mounted && showIntro && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}
      
      {/* Particles - only after intro */}
      {introComplete && <ParticleField />}
      
      {/* Scroll progress bar */}
      {introComplete && <ScrollProgressBar />}
      
      {/* Main Content */}
      <div 
        className={`transition-opacity duration-500 ${
          showIntro && mounted ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  );
}

// Inline scroll progress to avoid import issues
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / totalHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div 
        className="h-full bg-gradient-to-r from-accent-primary via-purple-500 to-accent-tertiary"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
