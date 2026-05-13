'use client'
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CampusCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate text coming in from the left
    gsap.fromTo('.gsap-cta-text',
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }
      }
    );

    // Animate button coming in from the right
    gsap.fromTo('.gsap-cta-btn',
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      // Using a sleek dark gradient instead of a background image
      className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:py-16 sm:px-8 lg:px-24 overflow-hidden relative"
    >
      {/* Decorative background accent (optional, adds a bit of flair without using photos) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-[90rem] flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
        
        {/* Left Side: Headline */}
        <div className="gsap-cta-text text-center md:text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
            We&apos;re DIMTECH &<br />
            We&apos;re Different
          </h2>
        </div>

        {/* Right Side: Button */}
        <div className="gsap-cta-btn shrink-0">
          <Link 
            href="/campus-tour" 
            // Styling the button to match your image: Yellow background, dark red/maroon text
            className="inline-flex items-center justify-center rounded-md bg-[#FFD700] px-8 py-4 text-lg font-bold text-red-900 shadow-lg transition-all duration-300 hover:bg-[#FFEA00] hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 active:scale-95"
          >
            Explore Campus Tour
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CampusCTA;