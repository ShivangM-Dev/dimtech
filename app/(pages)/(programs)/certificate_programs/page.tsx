'use client'
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import the JSON data
import certificationsData from "@/utils/data/certificationsData.json";

gsap.registerPlugin(ScrollTrigger);

const CertificateProgramsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate Hero/Intro Text
      gsap.fromTo(
        ".gsap-hero-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );

      // Animate Certification Cards
      gsap.fromTo(
        ".gsap-cert-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gsap-cert-card", start: "top 85%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full font-sans">
      
      {/* =========================================
          HERO & INTRO SECTION
      ========================================= */}
     <section className="w-full bg-background px-4 py-16 sm:px-8 sm:py-24 lg:px-24 text-center">
        <div className="mx-auto max-w-[90rem]">
          <div className="max-w-4xl mx-auto"> {/* Added mx-auto to center this block */}
            <h1 className="gsap-hero-text mb-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Certificate <span className="text-primary">Programs</span>
            </h1>
            
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-loose flex flex-col items-center"> 
              {/* Flex column + items-center ensures the paragraphs themselves are centered */}
              <p className="gsap-hero-text max-w-3xl">
                At DIMTECH, we offer a diverse range of certifications designed to equip students and professionals with the skills needed to excel in their respective fields. These certifications provide a blend of theoretical knowledge and practical applications, ensuring career growth and industry relevance.
              </p>
              <p className="gsap-hero-text max-w-3xl">
                By enrolling in our <strong className="font-semibold text-primary">Management Courses</strong> certification programs offered as an add-on, students gain valuable expertise that enhances their career prospects and ensures they remain competitive in their chosen fields.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CERTIFICATIONS GRID SECTION
      ========================================= */}
      <section className="w-full bg-slate-50 dark:bg-slate-900/40 px-4 py-16 sm:px-8 sm:py-24 lg:px-24 border-t border-border/50">
        <div className="mx-auto max-w-[90rem]">
          
          <div className="mb-12 text-center sm:text-left">
            <h2 className="gsap-hero-text text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Here are the Certification Programs We Offer to Elevate Your Expertise
            </h2>
          </div>

          {/* Grid Layout: 1 col on mobile, 2 on tablet, 3 on large screens */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {certificationsData.map((cert, index) => (
              <div 
                key={index} 
                className="gsap-cert-card group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl"
              >
                
                {/* Image Placeholder */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image 
                    src={cert.image} 
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                    {cert.title}
                  </h3>
                  
                  {/* The small underline divider matching your screenshot */}
                  <div className="mt-3 mb-5 h-[3px] w-12 bg-primary/60 transition-all duration-300 group-hover:w-20 group-hover:bg-primary"></div>
                  
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base text-justify sm:text-left">
                    {cert.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default CertificateProgramsPage;