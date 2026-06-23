//@ts-nocheck

'use client'
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  Laptop,
  Target,
  Globe2,
  Wallet,
  Building2,
  Rocket,
  BrainCircuit,
} from "lucide-react";

// Import your new JSON file (adjust the path if your data folder is elsewhere)
import highlightsData from "@/utils/data/highlightsData.json";

gsap.registerPlugin(ScrollTrigger);

// Create a mapping object to convert the JSON string into the actual Lucide Icon component
const iconMap: Record<string, React.ElementType> = {
  users: Users,
  laptop: Laptop,
  target: Target,
  globe: Globe2,
  wallet: Wallet,
  building: Building2,
  rocket: Rocket,
  brain: BrainCircuit,
};

const ProgramHighlightsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate Header Text
      gsap.fromTo(
        ".gsap-header-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        },
      );

      // Animate Highlight Cards
      gsap.fromTo(
        ".gsap-highlight-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gsap-highlight-card", start: "top 85%" },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full bg-background font-sans min-h-screen"
    >
      {/* =========================================
          HERO / INTRO SECTION
      ========================================= */}
      <section className="px-4 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="gsap-header-text mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Program <span className="text-primary">Highlights</span>
          </h1>
          <p className="gsap-header-text text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-loose">
            At the{" "}
            <strong className="text-foreground font-semibold">
              Divine Institute of Management and Technology
            </strong>
            , we try to provide our students with an unparalleled educational
            experience that goes beyond traditional learning. Here&apos;s what
            makes our <span className="text-primary font-bold">Courses</span>{" "}
            truly stand out.
          </p>
        </div>
      </section>

      {/* =========================================
          HIGHLIGHTS GRID
      ========================================= */}
      <section className="w-full bg-slate-50 dark:bg-slate-900/30 px-4 py-16 sm:px-8 sm:py-24 lg:px-24 border-t border-border/50">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
            {highlightsData.map((item, index) => {
              
              // Map the string from JSON to the icon, fallback to Users if not found
              const IconComponent = iconMap[item.icon] || Users;

              return (
                <div
                  key={index}
                  className="gsap-highlight-card group relative flex flex-col items-start rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
                >
                  {/* Subtle top inner gradient effect for depth */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl"></div>

                  {/* Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <IconComponent className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                    {item.title}
                  </h3>

                  {/* Content (Conditional: Paragraph or Bullets) */}
                  <div className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    
                    {/* Render standard description if it exists */}
                    {item.description && (
                      <p className="text-justify sm:text-left">
                        {item.description}
                      </p>
                    )}

                    {/* Render bullet points if they exist */}
                    {item.bullets && (
                      <ul className="space-y-3">
                        {item.bullets.map((bullet, bIndex) => (
                          <li key={bIndex} className="flex items-start">
                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"></span>
                            <span className="text-justify sm:text-left">
                              {bullet.label && (
                                <strong className="font-semibold text-foreground italic mr-1">
                                  {bullet.label}:
                                </strong>
                              )}
                              {bullet.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramHighlightsPage;