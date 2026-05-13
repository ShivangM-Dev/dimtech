'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- TYPESCRIPT INTERFACES ---
interface FeatureItem {
  title: string;
  description: string;
}

const SalientFeatures: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- MODULAR DATA ---
  const featuresList: FeatureItem[] = [
    {
      title: "Skilled Teachers",
      description: "Learning from professors who are leaders in their fields provides invaluable insights and mentorship."
    },
    {
      title: "Global Networking",
      description: "Universities often have diverse student bodies and international partnerships, fostering a global perspective and opportunities for collaboration."
    },
    {
      title: "Research Opportunities",
      description: "Engaging in cutting-edge research projects allows students to contribute to advancements in various fields."
    }
  ];

  useGSAP(() => {
    // 1. Text Content Animation (Slides in from the left)
    gsap.fromTo('.gsap-salient-text',
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }
      }
    );

    // 2. Image Animation (Slides in from the right with a slight scale)
    gsap.fromTo('.gsap-salient-img',
      { x: 50, scale: 0.95, opacity: 0 },
      {
        x: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-slate-50 py-16 px-4 sm:py-24 sm:px-8 lg:px-24 overflow-hidden">
      <div className="mx-auto max-w-[90rem]">
        
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col justify-center">
            
            <h2 className="gsap-salient-text mb-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our Salient Features
            </h2>
            
            <p className="gsap-salient-text mb-10 text-base leading-relaxed text-muted-foreground sm:text-lg">
              One of the most remarkable aspects of DIMTECH{' '}
              <span className="font-bold text-primary">
                best Management Institute in Knowledge Park, Greater Noida
              </span>
              , in your academic journey is the rich depth and wide-ranging knowledge you gain. Here&apos;s why it stands out:
            </p>

            {/* Features List */}
            <div className="flex flex-col space-y-8">
              {featuresList.map((item, index) => (
                <div key={index} className="gsap-salient-text group flex items-start gap-4">
                  {/* Icon */}
                  <div className="mt-1 flex shrink-0">
                    <CheckCircle2 className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                  </div>
                  
                  {/* Text */}
                  <div>
                    <h3 className="mb-2 text-xl font-bold tracking-tight text-primary sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Image */}
          <div className="gsap-salient-img relative mx-auto w-full max-w-lg lg:max-w-none aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
            {/* Using a high-quality relevant Unsplash student image */}
            <Image 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
              alt="Students on Campus at DIMTECH"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default SalientFeatures;