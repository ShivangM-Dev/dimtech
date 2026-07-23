'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Lightbulb, Users, Cpu, Landmark, Briefcase, Rocket, Globe } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const domainExperts = [
  { icon: Cpu, title: "Information Technology", desc: "Insights from tech giants and emerging software innovators." },
  { icon: Briefcase, title: "Consulting", desc: "Strategic frameworks from global management consulting firms." },
  { icon: Landmark, title: "Banking & Finance", desc: "Real-world financial acumen from leading banking institutions." },
  { icon: Building2, title: "Manufacturing", desc: "Operational and supply chain excellence from industry veterans." },
  { icon: Rocket, title: "Startups", desc: "Agile methodologies and entrepreneurial spirit from successful founders." },
  { icon: Globe, title: "Global Enterprise", desc: "Multinational perspectives to prepare students for the global market." }
];

export default function CorporateFacultyPage() {
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
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    );

    // 2. Domain Cards Animation
    gsap.fromTo('.gsap-domain-card',
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gsap-domain-trigger',
          start: 'top 80%',
        }
      }
    );

    // 3. Highlight/Vision Section
    gsap.fromTo('.gsap-vision-box',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gsap-vision-trigger',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background font-sans min-h-screen pb-32 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      {/* --- HERO SECTION --- */}
      <section className="px-6 pt-36 pb-16 text-center max-w-5xl mx-auto">
        <div className="gsap-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-muted/50 text-muted-foreground border border-border mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Industry-Academia Collaboration
        </div>
        
        <h1 className="gsap-hero-title text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-foreground mb-8 flex flex-wrap justify-center gap-x-4 gap-y-2 [perspective:1000px]">
          <span className="inline-block">Corporate</span>
          <span className="inline-block text-primary">Council</span>
        </h1>
        
        <p className="gsap-hero-text text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
          At <strong className="text-foreground">Divine Institute of Management & Technology (DIMTECH)</strong>, we believe robust industry-academia collaboration is the cornerstone of shaping future-ready professionals. Our Corporate Council bridges this critical gap, uniting distinguished industry leaders, innovative entrepreneurs, and corporate experts who empower our ecosystem with real-world, actionable insights.
        </p>
      </section>

      {/* --- COUNCIL DOMAINS GRID --- */}
      <section className="px-6 py-16 sm:px-12 lg:px-24 max-w-7xl mx-auto gsap-domain-trigger">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <Users className="w-10 h-10 text-primary mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Our Council Members Include
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Elite professionals from top-tier organizations actively enriching our students' learning journeys with unmatched experience and strategic wisdom across diverse sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainExperts.map((domain, index) => {
            const IconComponent = domain.icon;
            return (
              <div 
                key={index} 
                className="gsap-domain-card bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/40 group transition-all duration-300 relative overflow-hidden flex flex-col"
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all pointer-events-none"></div>
                
                <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {domain.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {domain.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- VISION HIGHLIGHT SECTION --- */}
      <section className="px-6 py-16 sm:px-12 lg:px-24 max-w-5xl mx-auto gsap-vision-trigger">
        <div className="gsap-vision-box bg-primary/5 border border-primary/20 rounded-[2.5rem] p-10 sm:p-16 text-center relative overflow-hidden shadow-sm">
          {/* Geometric Accents */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <Lightbulb className="w-12 h-12 text-primary mx-auto mb-6" strokeWidth={1.5} />
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-snug max-w-3xl mx-auto">
            DIMTECH’s Corporate Council transcends traditional advisory roles.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            It is a dynamic, collaborative platform where education meets enterprise—forging the impact-driven leaders of tomorrow.
          </p>
        </div>
      </section>

    </div>
  );
}