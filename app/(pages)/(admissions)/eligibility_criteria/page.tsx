'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Briefcase, 
  Monitor, 
  Presentation, 
  Laptop,
  CheckCircle2
} from 'lucide-react';

// Adjust this import path to match where you saved the JSON file
import eligibilityData from "@/utils/data/eligibilityData/eligibilityData.json";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  monitor: Monitor,
  presentation: Presentation,
  laptop: Laptop
};

const EligibilityPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Standard fade-up for text elements
    gsap.utils.toArray('.gsap-fade-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
      );
    });

    // Staggered grid animation for the eligibility cards
    gsap.fromTo('.gsap-program-card', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.programs-grid-container', start: 'top 80%' } }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background font-sans min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="px-4 pt-20 pb-16 text-center sm:px-8 lg:px-24">
        <h1 className="gsap-fade-up text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {eligibilityData.hero.titlePrefix}
          <span className="text-primary">{eligibilityData.hero.titleHighlight}</span>
        </h1>
        <p className="gsap-fade-up mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          {eligibilityData.hero.description}
        </p>
      </section>

      {/* --- PROGRAMS GRID SECTION --- */}
      <section className="bg-slate-50 dark:bg-slate-900/40 px-4 py-16 sm:px-8 lg:px-24 border-y border-border/50">
        <div className="mx-auto max-w-[90rem]">
          
          <div className="programs-grid-container grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {eligibilityData.programs.map((program, index) => {
              const IconComponent = iconMap[program.icon] || Briefcase;
              
              return (
                <div 
                  key={index}
                  // Added h-full to ensure cards stretch properly in the grid
                  className="gsap-program-card group flex flex-col h-full bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 dark:border-slate-800"
                >
                  
                  {/* --- HEADER SECTION --- */}
                  {/* Added min-h-[5rem] to guarantee perfectly aligned separator lines across all cards */}
                  <div className="flex items-center gap-6 mb-6 min-h-[5rem]">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                      <IconComponent className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-foreground tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {program.title}
                      </h2>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">
                        {program.fullName}
                      </p>
                    </div>
                  </div>

                  {/* --- REQUIREMENTS SECTION --- */}
                  {/* Replaced mt-auto with flex-1. This anchors the line to the header rather than the bottom of the card! */}
                  <div className="flex-1 pt-6 border-t border-border/50 flex flex-col gap-4">
                    {program.requirements.map((req: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={2} />
                        <div>
                          <h4 className="text-sm font-bold text-foreground">
                            {req.title}
                          </h4>
                          <p className="text-sm font-medium text-muted-foreground leading-relaxed mt-0.5">
                            {req.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* --- CTA SECTION --- */}
          <div className="gsap-fade-up mt-16 bg-card border border-border p-8 rounded-3xl flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left md:p-10 max-w-5xl mx-auto shadow-md">
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-2">
                {eligibilityData.cta.title}
              </h4>
              <p className="text-base text-muted-foreground max-w-2xl">
                {eligibilityData.cta.subtitle}
              </p>
            </div>
            <button 
              className="bg-primary text-background px-8 py-4 font-bold rounded-full hover:bg-foreground/90 transition-colors w-full md:w-auto shrink-0 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1"
              onClick={() => window.location.href = '/apply'}
            >
              {eligibilityData.cta.buttonText}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default EligibilityPage;