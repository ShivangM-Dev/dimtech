'use client'
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position to toggle visibility
  useEffect(() => {
    const toggleVisibility = () => {
      // Show the button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      // RESPONSIVE UPDATE: bottom-4 right-4 on mobile, bottom-8 right-8 on desktop
      className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
        isVisible 
          ? 'translate-y-0 opacity-100' // Slides up and fades in
          : 'pointer-events-none translate-y-10 opacity-0' // Slides down, fades out, and ignores clicks
      }`}
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTop;