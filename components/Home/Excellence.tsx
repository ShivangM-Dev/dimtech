'use client'
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, ShieldCheck, Users2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- TYPESCRIPT INTERFACES ---
interface ExcellenceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Excellence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile optimization: Refresh positions on orientation change or bar hide/show
  useEffect(() => {
    ScrollTrigger.clearScrollMemory();
    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleRefresh);
    return () => window.removeEventListener('resize', handleRefresh);
  }, []);

  const excellenceData: ExcellenceItem[] = [
    {
      title: "Design Thinking",
      description: "A human-centered, iterative approach to problem-solving that emphasizes empathy, creativity, and experimentation.",
      icon: <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8" />
    },
    {
      title: "Domain Expertise",
      description: "Specialized knowledge and skills in specific areas of interest, professions, or industries to meet global standards.",
      icon: <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
    },
    {
      title: "Collaborative Learning",
      description: "An educational approach where groups of learners work together to solve problems and master new concepts.",
      icon: <Users2 className="w-7 h-7 sm:w-8 sm:h-8" />
    }
  ];

  useGSAP(() => {
    // 1. Entry Animation (Slide Up)
    gsap.fromTo('.gsap-ex-card',
      { y: 40, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power2.out',
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: 'top 85%',
        }
      }
    );

    // 2. Spin Animation (Mobile & Desktop)
    // We target the icon sphere specifically
    const cards = gsap.utils.toArray<HTMLElement>('.gsap-ex-card');
    cards.forEach((card) => {
      const icon = card.querySelector('.gsap-icon-sphere');
      
      // Hover/Touch Start
      card.addEventListener('mouseenter', () => {
        gsap.to(icon, { rotateY: 360, duration: 0.8, ease: 'back.out(1.7)' });
      });
      card.addEventListener('touchstart', () => {
        gsap.to(icon, { rotateY: 360, duration: 0.8, ease: 'back.out(1.7)' });
      }, { passive: true });

      // Leave/Touch End
      card.addEventListener('mouseleave', () => {
        gsap.to(icon, { rotateY: 0, duration: 0.6 });
      });
      card.addEventListener('touchend', () => {
        gsap.to(icon, { rotateY: 0, duration: 0.6, delay: 0.2 });
      }, { passive: true });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-slate-50 py-12 px-4 sm:py-20 sm:px-8 lg:py-24 lg:px-24">
      <div className="mx-auto max-w-[90rem]">
        
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Discover <span className="text-primary">Excellence</span> at DIMTECH
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary sm:mt-4 sm:h-1.5 sm:w-20" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10">
          {excellenceData.map((item, index) => (
            <div 
              key={index}
              className="gsap-ex-card group relative flex flex-col items-center overflow-hidden rounded-2xl bg-primary p-8 text-center text-primary-foreground shadow-lg transition-all duration-500 will-change-transform perspective-1000"
              style={{ transformStyle: 'preserve-3d' }} // Required for clean 3D spin
            >
              {/* Decorative Circle */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-150 sm:h-40 sm:w-40" />

              {/* Icon Sphere - Added hardware acceleration classes */}
              <div className="gsap-icon-sphere mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 sm:mb-8 sm:h-20 sm:w-20 sm:rounded-2xl transform-gpu border border-white/10 shadow-inner">
                {item.icon}
              </div>

              <h3 className="mb-3 text-xl font-bold tracking-tight sm:mb-4 sm:text-2xl">
                {item.title}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-primary-foreground/80 sm:text-base">
                {item.description}
              </p>
              
              <div className="mt-8 h-1 w-12 rounded-full bg-white/20 transition-all duration-500 group-hover:w-full group-hover:bg-white/40 sm:mt-10 sm:w-16" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Excellence;