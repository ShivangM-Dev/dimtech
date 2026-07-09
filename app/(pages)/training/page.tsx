'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target } from 'lucide-react';
import Image from 'next/image';

import { coreObjectives, industryPartners } from '@/utils/data/Training/traniningData';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PlacementPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Reveal
    gsap.fromTo('.gsap-hero-badge',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
    );
    
    gsap.fromTo('.gsap-hero-title span',
      { y: 60, opacity: 0, rotationX: -20 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)', delay: 0.3 }
    );

    gsap.fromTo('.gsap-hero-text',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    );

    // 2. Bento Box Objectives Animation
    gsap.fromTo('.gsap-bento-card',
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gsap-bento-trigger',
          start: 'top 80%',
        }
      }
    );

    // 3. Commitment Split Section
    gsap.fromTo('.gsap-commit-left',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-commit-trigger', start: 'top 75%' } }
    );
    gsap.fromTo('.gsap-commit-right',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-commit-trigger', start: 'top 75%' } }
    );

    // 4. Partner Horizontal Cards
    gsap.fromTo('.gsap-partner-row',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gsap-partners-trigger',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background font-sans min-h-screen pb-32 relative overflow-hidden">
      
      {/* Editorial Watermark Background */}
      <div className="absolute top-10 left-0 -translate-x-1/4 select-none pointer-events-none -z-10">
        <h1 className="text-[12rem] font-black text-primary/[0.03] leading-none whitespace-nowrap">
          CAREERS
        </h1>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* --- HERO SECTION --- */}
      <section className="px-6 pt-36 pb-24 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="gsap-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-muted/50 text-muted-foreground border border-border/50 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Corporate Relations
          </div>
          
          <h1 className="gsap-hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground mb-10 flex flex-wrap gap-x-4 gap-y-2 [perspective:1000px]">
            <span className="inline-block">Training &</span>
            <span className="inline-block text-primary">Placement</span>
          </h1>
          
          <div className="gsap-hero-text flex flex-col md:flex-row gap-8 md:gap-12 pl-4 border-l-4 border-primary/40">
            <p className="text-lg sm:text-xl text-foreground font-medium leading-relaxed flex-1">
              Acting as a strong link between academic learning and industry expectations, preparing students with practical knowledge and technical expertise.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed flex-1">
              We focus on enhancing employability through structured programs, industry interactions, and career guidance, creating opportunities that help students become industry-ready professionals.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORE OBJECTIVES (Bento Box Layout with Sharp Borders) --- */}
      <section className="px-6 py-16 sm:px-12 lg:px-24 max-w-7xl mx-auto gsap-bento-trigger">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Our Core Objectives
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">Strategic pathways engineered for high-impact careers.</p>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-border"></div>
        </div>

        {/* Bento Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(280px,auto)] gap-6">
          {coreObjectives.map((obj, index) => {
            const IconComponent = obj.icon;
            
            let spanClass = "md:col-span-1";
            let flexClass = "flex-col";
            let iconSize = "w-12 h-12 mb-6";
            
            if (index === 0) {
              spanClass = "md:col-span-2";
              flexClass = "flex-col md:flex-row md:items-center gap-8";
              iconSize = "w-16 h-16 shrink-0";
            } else if (index === 3) {
              spanClass = "md:col-span-2 md:row-span-1";
              flexClass = "flex-col justify-end";
            }

            return (
              <div 
                key={index} 
                className={`gsap-bento-card bg-card/30 backdrop-blur-sm border border-border hover:bg-card/80 p-8 rounded-3xl transition-all duration-500 group flex overflow-hidden relative shadow-sm hover:shadow-md ${spanClass} ${flexClass}`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/40 group-hover:via-primary group-hover:to-primary/40 transition-all duration-700 opacity-0 group-hover:opacity-100"></div>

                <div className={`${iconSize} rounded-2xl bg-muted/50 border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-500`}>
                  <IconComponent className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" strokeWidth={1.5} />
                </div>
                
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {obj.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {obj.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- OUR COMMITMENT (Split Layout) --- */}
      <section className="px-6 py-24 sm:px-12 lg:px-24 max-w-7xl mx-auto gsap-commit-trigger">
        <div className="bg-muted/30 border border-border rounded-[2.5rem] p-10 sm:p-16 lg:p-20 overflow-hidden relative flex flex-col md:flex-row items-center gap-12 lg:gap-24 shadow-sm">
          
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-background rounded-full mix-blend-overlay opacity-50 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-border pointer-events-none"></div>

          <div className="gsap-commit-left flex-1 md:w-1/2 relative z-10">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
              <Target className="w-8 h-8 text-primary-foreground" strokeWidth={2} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Our Unwavering <br/><span className="text-primary">Commitment</span>
            </h2>
          </div>

          <div className="gsap-commit-right flex-1 md:w-1/2 relative z-10">
            <div className="relative">
              <span className="absolute -top-12 -left-8 text-8xl font-serif text-primary/10 leading-none select-none">"</span>
              <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed relative z-10">
                To build a strong foundation for student success by combining quality training, professional mentorship, and industry exposure.
              </p>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed relative z-10">
                Our aim is to nurture confident, skilled, and future-ready professionals capable of contributing effectively to organizations from the very beginning of their careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- INDUSTRY PARTNERS (Horizontal Rows with Sharp Borders) --- */}
      <section className="px-6 py-16 sm:px-12 lg:px-24 max-w-7xl mx-auto gsap-partners-trigger">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Industry Partners
          </h2>
          <p className="text-muted-foreground text-lg max-w-4xl leading-relaxed">
            Collaborating with reputed organizations to provide practical exposure, industry-oriented learning, and professional development.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {industryPartners.map((partner, index) => (
            <div 
              key={index}
              className="gsap-partner-row group flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 bg-card/20 border border-border rounded-3xl hover:bg-card/60 hover:border-primary/30 transition-all duration-300 shadow-sm"
            >
              {/* Image Container */}
              <div className="w-full sm:w-48 h-24 bg-background rounded-2xl flex items-center justify-center p-4 border border-border group-hover:shadow-md transition-shadow shrink-0 relative overflow-hidden">
                <Image 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Content Area */}
              <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{partner.name}</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">{partner.sector}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}