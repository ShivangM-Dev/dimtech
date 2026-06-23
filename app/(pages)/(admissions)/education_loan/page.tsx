'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileText, 
  Send, 
  Clock, 
  Landmark,
  CheckCircle2
} from 'lucide-react';

// Adjust this import path to match where you saved the JSON file
import loanData from "@/utils/data/educationLoanData/educationLoanData.json";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  fileText: FileText,
  send: Send,
  clock: Clock,
  landmark: Landmark
};

const EducationLoanPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray('.gsap-fade-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
      );
    });

    gsap.utils.toArray('.gsap-timeline-card').forEach((el: any, index: number) => {
      const isDesktop = window.innerWidth > 768;
      const isEven = index % 2 === 0;
      const xOffset = isDesktop ? (isEven ? -50 : 50) : 0;
      const yOffset = isDesktop ? 0 : 40;

      gsap.fromTo(el, 
        { x: xOffset, y: yOffset, opacity: 0 }, 
        { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background font-sans min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="px-4 pt-20 pb-16 text-center sm:px-8 lg:px-24">
        <h1 className="gsap-fade-up text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {loanData.hero.titlePrefix}
          <span className="text-primary">{loanData.hero.titleHighlight}</span>
        </h1>
        <p className="gsap-fade-up mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          {loanData.hero.description}
        </p>
      </section>

      {/* --- SUPPORT INCLUDES SECTION --- */}
      <section className="px-4 pb-20 sm:px-8 lg:px-24">
        <div className="gsap-fade-up mx-auto max-w-4xl bg-primary/5 dark:bg-slate-900/50 border border-primary/20 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {loanData.support.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {loanData.support.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-muted-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center font-medium text-foreground bg-primary/10 py-3 px-6 rounded-full inline-block w-full">
            {loanData.support.footer}
          </p>
        </div>
      </section>

      {/* --- INTERACTIVE ROADMAP PROCESS SECTION --- */}
      <section className="bg-slate-50 dark:bg-slate-900/40 px-4 py-20 sm:px-8 lg:px-24 border-y border-border/50 overflow-hidden">
        <div className="mx-auto max-w-[90rem]">
          
          <div className="gsap-fade-up mb-20 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {loanData.process.title}
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            
            {/* The Central Dashed Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border border-l-2 border-dashed border-border/80 md:-translate-x-1/2 z-0"></div>

            {loanData.process.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || FileText;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className={`gsap-timeline-card relative flex w-full mb-12 last:mb-0 group ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  
                  {/* FIXED ICON ALIGNMENT: Added top-1/2 and -translate-y-1/2 to perfectly vertical center it! */}
                  <div className="absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-background text-primary border-4 border-border/50 dark:bg-slate-900 group-hover:bg-primary group-hover:text-background group-hover:border-primary/30 transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:scale-110 z-20">
                    <IconComponent className="h-6 w-6" strokeWidth={2} />
                  </div>

                  <div className="w-full md:w-[45%] pl-24 md:pl-0 relative z-10">
                    <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 dark:border-slate-800 text-left relative overflow-hidden">
                      
                      {/* FIXED NUMBER ALIGNMENT: Made huge (100px+), locked to the right side, and perfectly centered vertically */}
                      <span className="text-8xl sm:text-[120px] leading-none font-black text-slate-100 dark:text-slate-800/50 absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 pointer-events-none transition-colors duration-300 group-hover:text-primary/10 select-none">
                        {step.stepNumber}
                      </span>
                
                      <div className="relative z-10">
                        {/* Made title text-primary to match the blue heading in your image */}
                        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 transition-colors duration-300 group-hover:text-primary/80 flex items-center gap-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base pr-8 sm:pr-12">
                          {step.description}
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="gsap-fade-up mt-24 bg-card border border-border p-8 rounded-3xl flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left md:p-10 max-w-4xl mx-auto shadow-md">
            <div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                {loanData.cta.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {loanData.cta.subtitle}
              </p>
            </div>
            <button 
              className="bg-primary text-background px-8 py-4 font-bold rounded-full hover:bg-foreground/90 transition-colors w-full md:w-auto shrink-0 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1"
              onClick={() => window.location.href = '/contact'}
            >
              {loanData.cta.buttonText}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default EducationLoanPage;