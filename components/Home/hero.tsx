'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. Import your JSON file here
import featuresData from '@/utils/data/features.json';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- TYPESCRIPT INTERFACES ---
interface FeatureType {
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: FeatureType;
  index: number;
}

// 2. Type cast your imported JSON data so TypeScript is happy
const features: FeatureType[] = featuresData;

// --- MODULAR COMPONENT: Feature Card ---
const FeatureCard = ({ feature, index }: FeatureCardProps) => (
  <div 
    className="gsap-card group relative flex flex-col justify-center rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border sm:p-6 lg:p-8
               transition-all duration-300 ease-out 
               hover:-translate-y-2 hover:shadow-xl hover:ring-primary"
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {index + 1}
      </span>
      
      <div>
        <h3 className="mb-1 text-base font-bold leading-tight text-foreground sm:text-lg">
          {feature.title}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-muted-foreground">
          {feature.description.startsWith('+') || feature.description.startsWith('with') 
            ? feature.description 
            : `– ${feature.description}`}
        </p>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for mobile "Read More" functionality
  const [isExpanded, setIsExpanded] = useState(false);

  // Tell GSAP to recalculate scroll positions when the accordion opens/closes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); // Wait for the 500ms CSS transition to finish
    return () => clearTimeout(timeoutId);
  }, [isExpanded]);

  useGSAP(() => {
    // 1. Animate Header Text
    gsap.fromTo('.gsap-header', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );

    // 2. Animate Cards
    gsap.fromTo('.gsap-card', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.gsap-card', start: 'top 85%' } }
    );

    // 3. Animate Hero Image Container
    gsap.fromTo('.gsap-image', 
      { scale: 0.9, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-image', start: 'top 80%' } }
    );

    // 4. Animate About Section Image
    gsap.fromTo('.gsap-about-img',
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-about-img', start: 'top 80%' } }
    );

    // 5. Animate About Section Text Right Column
    gsap.fromTo('.gsap-about-text-right',
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-about-img', start: 'top 80%' } }
    );

    // 6. Animate Bottom Separate Div
    gsap.fromTo('.gsap-about-text-bottom',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-about-text-bottom', start: 'top 85%' } }
    );
  }, { scope: containerRef }); 

  return (
    <div ref={containerRef} className="flex w-full flex-col">
      
      {/* =========================================
          SECTION 1: HERO / FEATURES
      ========================================= */}
      <section className="relative w-full overflow-hidden bg-background py-12 px-4 sm:py-16 sm:px-8 lg:py-20 xl:px-24">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center lg:text-left">
          <h1 className="gsap-header mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:whitespace-nowrap lg:text-6xl">
            Why to Choose <span className="text-primary">Divine Institute?</span>
          </h1>
          <p className="gsap-header mt-4 text-base text-muted-foreground sm:text-lg lg:whitespace-nowrap">
            Empowering your future with industry-ready skills, guaranteed placements, and top-tier educational support.
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="mx-auto mt-12 max-w-[90rem] lg:mt-16">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Features */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
                ))}
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="gsap-image w-full lg:h-full lg:col-span-5 xl:col-span-4">
              <div className="relative w-full h-[350px] sm:h-[450px] lg:h-full lg:min-h-[350px] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border lg:shadow-2xl">
                <Image 
                  src="/images/11.png" 
                  alt="Students at Divine Institute" 
                  fill 
                  priority 
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent mix-blend-multiply" />
                <div className="absolute bottom-4 left-4 rounded-2xl bg-background/95 p-3 text-foreground shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:p-4">
                  <p className="text-xl font-black text-primary sm:text-2xl">100%</p>
                  <p className="text-xs font-bold sm:text-sm">Placement Guarantee</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: ABOUT / INSTITUTE INFO
      ========================================= */}
      <section className="relative w-full overflow-hidden bg-background py-16 px-4 sm:py-24 sm:px-8 lg:px-24">
        <div className="mx-auto max-w-[90rem]">
          
          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            
            {/* LEFT COLUMN: Single Image Container */}
            <div className="gsap-about-img relative mx-auto w-full max-w-lg lg:max-w-none aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
              <Image 
                src="/images/i2.webp" 
                alt="DIMTECH Campus"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* RIGHT COLUMN: Text Content */}
            <div className="flex flex-col justify-center overflow-hidden">
              
              <h2 className="gsap-about-text-right mb-8 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-tight">
                Top Management Institute in Greater Noida | <span className="text-primary">DIMTECH, Divine Institute of Management & Technology</span>
              </h2>
              
              <div className="text-base leading-relaxed text-muted-foreground sm:text-lg text-justify">
                
                {/* ALWAYS VISIBLE: 1st Paragraph */}
                <p className="gsap-about-text-right">
                  <span className="font-bold text-primary">Divine Institute</span> is committed to delivering an education that seamlessly blends academic excellence with industry relevance through our specialized Management program in Knowledge Park, Greater Noida.
                </p>

                {/* COLLAPSIBLE ON MOBILE / ALWAYS VISIBLE ON DESKTOP */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out lg:grid-rows-[1fr] lg:opacity-100 lg:mt-5 ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}
                >
                  <div className="overflow-hidden space-y-5">
                    <p className="gsap-about-text-right">
                      We offer a diverse range of specializations in our <strong className="text-foreground">Programs</strong> including <strong className="text-foreground">IT, Marketing, Finance, Business Analytics, HRM, Operations Management, and AI in Predictive Analysis.</strong>
                    </p>
                    
                    {/* UPDATED ELIGIBILITY CRITERIA */}
                    <div className="gsap-about-text-right rounded-xl bg-slate-50 p-5 ring-1 ring-slate-100 dark:bg-muted/50 dark:ring-border/50">
                      <strong className="mb-3 block text-foreground">Eligibility Criteria:</strong>
                      <ul className="ml-4 list-outside list-disc space-y-2 text-sm sm:text-base">
                        <li><strong className="text-foreground">BBA:</strong> 12th in any stream</li>
                        <li><strong className="text-foreground">MBA:</strong> Graduation in any stream</li>
                        <li><strong className="text-foreground">BCA:</strong> 12th in any stream, Maths in 10th</li>
                        <li><strong className="text-foreground">MCA:</strong> Graduation in any stream, Maths in 10+2</li>
                      </ul>
                    </div>
                    {/* END OF UPDATED CRITERIA */}

                    <p className="gsap-about-text-right">
                      We empower students with the essential knowledge, skills, and ethical grounding required to lead in today’s dynamic business world.
                    </p>
                    
                    <p className="gsap-about-text-right">
                      At Divine Institute we proudly collaborate with top industry leaders to offer a unique, immersive learning experience.
                    </p>
                  </div>
                </div>

                {/* MOBILE ONLY: Read More / Read Less Button */}
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="gsap-about-text-right mt-5 flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 lg:hidden"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>

              </div>

            </div>
          </div>

          {/* =========================================
              BOTTOM CENTERED TEXT & BUTTON
          ========================================= */}
          <div 
            className={`grid transition-all duration-500 ease-in-out lg:grid-rows-[1fr] lg:opacity-100 lg:mt-24 ${
              isExpanded ? 'grid-rows-[1fr] opacity-100 mt-12' : 'grid-rows-[0fr] opacity-0 mt-0'
            }`}
          >
            <div className="overflow-hidden flex flex-col items-center justify-center max-w-4xl mx-auto space-y-6">
              
              <p className="gsap-about-text-bottom text-base leading-relaxed text-muted-foreground sm:text-lg text-justify w-full">
                Our partnerships provide students with direct exposure to the business world through live projects, internships, and industry-led seminars.
              </p>
              <p className="gsap-about-text-bottom text-base leading-relaxed text-muted-foreground sm:text-lg text-justify w-full">
                The integration between classroom learning and the corporate landscape ensures that our curriculum stays relevant and that our students are well-prepared to meet real-world challenges.
              </p>
              <p className="gsap-about-text-bottom text-base leading-relaxed text-muted-foreground sm:text-lg text-justify w-full">
                Our esteemed faculty, a mix of accomplished academicians and experienced industry experts, guide students through an adaptive curriculum, imparting insights that prepare our graduates to excel in today’s evolving business environment.
              </p>

              {/* Shadcn/UI Button */}
              <div className="gsap-about-text-bottom pt-6 w-full flex justify-center">
                <Link 
                  href="/about_us" 
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2"
                >
                  Learn More
                </Link>
              </div>
              
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Hero;