'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Briefcase, 
  Cpu, 
  Wifi, 
  Globe2,
  GraduationCap,
  BookOpen,
  Code,
  Monitor
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate Text Content
    gsap.fromTo('.gsap-fade-up', 
      { y: 40, opacity: 0 }, 
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', 
        scrollTrigger: { trigger: '.gsap-fade-up', start: 'top 85%' } 
      }
    );

    // Animate USP Cards
    gsap.fromTo('.gsap-usp-card', 
      { y: 30, opacity: 0, scale: 0.95 }, 
      { 
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)', 
        scrollTrigger: { trigger: '.gsap-usp-card', start: 'top 85%' } 
      }
    );

    // Animate Program Cards
    gsap.fromTo('.gsap-program-card', 
      { x: -30, opacity: 0 }, 
      { 
        x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', 
        scrollTrigger: { trigger: '.gsap-program-card', start: 'top 85%' } 
      }
    );
  }, { scope: containerRef });

  const usps = [
    {
      title: "100% Placement",
      desc: "Guaranteed in written",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "AI Certification",
      desc: "Stay ahead of the curve",
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: "Wi-Fi Campus",
      desc: "Fully enabled digital campus",
      icon: <Wifi className="h-6 w-6" />,
    },
    {
      title: "Global Exposure",
      desc: "Laptop & Foreign Industrial Visit (MBA)",
      icon: <Globe2 className="h-6 w-6" />,
    },
  ];

  const programs = [
    { name: "MBA", fullname: "Master of Business Administration", icon: <GraduationCap className="h-8 w-8" /> },
    { name: "BBA", fullname: "Bachelor of Business Administration", icon: <BookOpen className="h-8 w-8" /> },
    { name: "MCA", fullname: "Master of Computer Applications", icon: <Monitor className="h-8 w-8" /> },
    { name: "BCA", fullname: "Bachelor of Computer Applications", icon: <Code className="h-8 w-8" /> },
  ];

  return (
    <div ref={containerRef} className="w-full bg-background font-sans selection:bg-primary/20 selection:text-primary">
      
      {/* --- HEADER SECTION --- */}
      <section className="relative w-full bg-slate-50 py-16 sm:py-24 px-4 sm:px-8 lg:px-24 border-b border-border">
        <div className="mx-auto max-w-4xl text-center">
          <p className="gsap-fade-up mb-3 text-sm font-bold uppercase tracking-widest text-primary">
            Approved by AICTE
          </p>
          <h1 className="gsap-fade-up mb-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">DIMTECH</span>
          </h1>
          <p className="gsap-fade-up text-lg font-medium text-muted-foreground sm:text-xl">
            Divine Institute of Management and Technology
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT & PHILOSOPHY --- */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-24">
        <div className="mx-auto max-w-4xl space-y-8 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-loose text-justify">
          
          <p className="gsap-fade-up">
            At <strong className="text-foreground">Divine Institute</strong>, we believe in nurturing future leaders who will shape the business world with innovation, integrity, and compassion. Our mission is to provide an environment where learning meets real-world challenges, empowering students to unlock their full potential and thrive in the global business arena.
          </p>
          
          <p className="gsap-fade-up">
            Our Management programs are designed to equip you with a strong foundation in various domains, including <strong className="text-foreground">HRM, Finance, Marketing, Business Analytics, Operations, International Business, and Information Technology</strong>. Through a blend of academic, practical exposure, and personalized guidance, we prepare our students to learn, lead, and excel in a dynamic world.
          </p>
          
          <div className="gsap-fade-up my-12 border-l-4 border-primary bg-primary/5 p-6 sm:p-8 rounded-r-2xl">
            <p className="text-lg italic text-foreground sm:text-xl">
              "Beyond academics, we focus on holistic development. Our emphasis on critical thinking, ethical decision making, and effective communication ensures that our graduates are not only skilled professionals but also responsible citizens who can contribute positively to society."
            </p>
          </div>

          <p className="gsap-fade-up">
            At Divine Institute, you will find a community of passionate faculty, supportive peers, and a vibrant learning environment. Together, we will try to create a space where ideas flourish, ambitions are realized, and dreams take flight.
          </p>

        </div>
      </section>

      {/* --- WHY CHOOSE US (USPs) --- */}
      <section className="w-full bg-slate-50 py-16 sm:py-24 px-4 sm:px-8 lg:px-24">
        <div className="mx-auto max-w-[90rem]">
          <div className="gsap-fade-up mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              The DIMTECH <span className="text-primary">Advantage</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {usps.map((usp, index) => (
              <div 
                key={index} 
                className="gsap-usp-card group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/50"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {usp.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {usp.title}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {usp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAMS OFFERED --- */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-24">
        <div className="mx-auto max-w-[90rem]">
          <div className="gsap-fade-up mb-12 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Programs <span className="text-primary">Offered</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Empowering careers in Management and Computer Applications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {programs.map((prog, index) => (
              <div 
                key={index} 
                className="gsap-program-card flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-slate-50"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                  {prog.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-foreground">{prog.name}</span>
                  <span className="text-xs font-medium text-muted-foreground line-clamp-1">{prog.fullname}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default page;