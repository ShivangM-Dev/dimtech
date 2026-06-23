'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileText, 
  ClipboardCheck, 
  GraduationCap, 
  MessagesSquare,
  Users, // <-- Added for the Interview step
  ArrowRight
} from 'lucide-react';

// Make sure your path matches your project structure
import selectionData from "@/utils/data/selectionData/selectionData.json";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  form: FileText,
  screening: ClipboardCheck,
  test: GraduationCap,
  discussion: MessagesSquare,
  interview: Users // <-- Mapped the interview icon
};

const SelectionProcessPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray('.gsap-fade-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
      );
    });

    gsap.fromTo('.gsap-step-card', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.roadmap-container', start: 'top 80%' } }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background font-sans min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="px-4 pt-20 pb-16 text-center sm:px-8 lg:px-24">
        <h1 className="gsap-fade-up text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {selectionData.hero.titlePrefix}<span className="text-primary">{selectionData.hero.titleHighlight}</span>
        </h1>
        <p className="gsap-fade-up mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          {selectionData.hero.description}
        </p>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section className="bg-slate-50 dark:bg-slate-900/40 px-4 py-16 sm:px-8 lg:px-24 border-y border-border/50">
        <div className="mx-auto max-w-[90rem]">
          
          <div className="gsap-fade-up mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {selectionData.selectionProcess.title}
            </h2>
          </div>

          {/* Roadmap Container */}
          <div className="roadmap-container relative max-w-4xl mx-auto md:pl-8">
            {selectionData.selectionProcess.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || FileText;
              const isLastStep = index === selectionData.selectionProcess.steps.length - 1;
              
              return (
                <div 
                  key={index}
                  className="gsap-step-card group relative flex items-start gap-6 sm:gap-10 pb-12 sm:pb-16 last:pb-0"
                >
                  {/* DOTTED CONNECTING LINE */}
                  {/* It starts at top-16 (below the 4rem icon) and goes to bottom-0 of the padding */}
                  {!isLastStep && (
                    <div className="absolute left-8 top-16 bottom-0 w-[2px] border-l-2 border-dashed border-border/80 group-hover:border-primary/50 transition-colors duration-300 -translate-x-1/2"></div>
                  )}

                  {/* ICON/DOT */}
                  {/* w-16 means it is 4rem (64px) wide. The center is at 2rem (32px), which perfectly aligns with left-8 on the line above */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-background text-primary border-4 border-border/30 dark:bg-slate-900 group-hover:bg-primary group-hover:text-background group-hover:border-primary/30 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:scale-110">
                    <IconComponent className="h-7 w-7" strokeWidth={2} />
                  </div>

                  {/* CARD CONTENT */}
                  <div className="flex-1 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 dark:border-slate-800">
                    
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between mb-4 w-full gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {step.title}
                      </h3>
                      <span className="text-3xl sm:text-4xl font-black text-foreground/5 tracking-wider select-none transition-colors duration-300 group-hover:text-primary/10">
                        {step.stepNumber}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                      {step.description}
                    </p>

                    {step.details.length > 0 && (
                      <ul className="flex flex-col gap-3 mt-4 border-t border-border/50 pt-5">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed group/item">
                            <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-1 transition-transform duration-300 group-hover/item:translate-x-1.5" strokeWidth={2.5}/>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* --- CTA SECTION --- */}
          <div className="gsap-fade-up mt-16 bg-card border border-border p-8 rounded-3xl flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left md:p-10 max-w-4xl mx-auto shadow-md">
            <div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                {selectionData.cta.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {selectionData.cta.subtitle}
              </p>
            </div>
            <button 
              className="bg-primary text-background px-8 py-4 font-bold rounded-full hover:bg-foreground/90 transition-colors w-full md:w-auto shrink-0 cursor-pointer"
              onClick={() => window.location.href = '/apply'}
            >
              {selectionData.cta.buttonText}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default SelectionProcessPage;