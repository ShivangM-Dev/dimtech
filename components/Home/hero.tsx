'use client'
import React, { useRef } from 'react';
import Image from 'next/image'; // <-- 1. Import Next.js Image component
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// --- MODULAR DATA ---
const features: FeatureType[] = [
  { title: "100% Placement Guarantee", description: "Salary packages ranging from ₹6 LPA to ₹32 LPA." },
  { title: "Free Laptop on Enrollment", description: "+ Paid Internships after 1st year." },
  { title: "Dual Specialization Options", description: "with 30+ Add-on Certifications – Become an industry-ready expert." },
  { title: "Industrial Exposure", description: "Live projects, corporate visits, HR talks, and expert-led networking sessions." },
  { title: "Scholarships, Flexible Fee Plans & Loan Assistance", description: "Making education more affordable." },
  { title: "Soft Skills Training", description: "Leadership, entrepreneurship, and communication mastery." },
  { title: "20% of Curriculum Delivered by Industry Experts", description: "Learn directly from professionals." },
  { title: "Free Professional Business Suit", description: "For that corporate-ready look." },
  { title: "Hostel Accommodation Available", description: "Affordable rent for outstation students." },
  { title: "No Entrance Exam? No Problem", description: "We conduct our own test for direct enrollment." }
];

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

  useGSAP(() => {
    // 1. Animate Header Text
    gsap.fromTo('.gsap-header', 
      { y: 40, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%', 
        }
      }
    );

    // 2. Animate Cards
    gsap.fromTo('.gsap-card', 
      { y: 50, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gsap-card', 
          start: 'top 85%',
        }
      }
    );

    // 3. Animate Image Container
    gsap.fromTo('.gsap-image', 
      { scale: 0.9, opacity: 0 }, 
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gsap-image',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef }); 

  return (
    <div ref={containerRef} className="flex w-full flex-col">
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

            {/* Right Column / Bottom Column: Image */}
            <div className="gsap-image w-full lg:h-full lg:col-span-5 xl:col-span-4">
              
              <div className="relative w-full h-[350px] sm:h-[450px] lg:h-full lg:min-h-[350px] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border lg:shadow-2xl">
                {/* 2. Replaced <img> with Next.js <Image /> */}
                <Image 
                  src="/images/11.png" 
                  alt="Students at Divine Institute" 
                  fill // Automatically fills the relative parent container
                  priority // Preloads the hero image to prevent layout shift and improve LCP
                  sizes="(max-width: 1024px) 100vw, 50vw" // Responsive sizing hint
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
    </div>
  );
};

export default Hero;