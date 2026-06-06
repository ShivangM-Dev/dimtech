"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Data extracted from your image ---
const introParagraphs = [
  "At DIMTECH, our Advisory Board consists of esteemed educators, industry leaders, and experts dedicated to shaping a dynamic and future-ready learning environment. Their invaluable guidance helps us maintain academic excellence, align our curriculum with industry standards, and foster innovation in education.",
  "Our distinguished board members bring decades of experience from prestigious institutions and organizations, ensuring that DIMTECH remains a center of excellence in management and technology education. Their expertise plays a crucial role in curriculum development, research initiatives, and strategic collaborations, helping our students gain the skills and knowledge required to excel in their careers.",
  "With a strong commitment to academic integrity and industry relevance, our advisory board continuously works towards bridging the gap between education and real-world applications, empowering students to thrive in a competitive global landscape.",
];

const advisoryMembers = [
  {
    name: "ANUJ AGGARWAL",
    affiliation:
      "Technology executive with\n25+ years of global IT\nleadership",
    image: "/images/advisory/anuj_aggarwal.jpg",
  },
  {
    name: "DR PRAMOD KUMAR",
    affiliation: "Country head in operation,\nTech Mahindra",
    image: "/images/advisory/pramod_kumar.jpg",
  },
  {
    name: "SHARAD BHATTACHARYA",
    affiliation: "Associate Professor of IIM\nShilong",
    image: "/images/advisory/sharad_bhattacharya.jpg",
  },
  {
    name: "DR K B SINGH",
    affiliation:
      "Professor & Head\nDepartment of Commerce &\nFinancial Studies",
    image: "/images/advisory/kb_singh.jpg",
  },
  {
    name: "NITIN KUMAR TYAGI",
    affiliation: "Enterprise Solution Architect\nwith 23+ years of experience",
    image: "/images/advisory/nitin_kumar_tyagi.jpg",
  },
];

const AdvisoryBoardPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate Intro Text
      gsap.fromTo(
        ".gsap-intro-text",
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

      // Animate Grid Members
      gsap.fromTo(
        ".gsap-member-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gsap-member-card", start: "top 85%" },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full flex flex-col font-sans">
      {/* =========================================
          SECTION 1: INTRO TEXT (Light / Default Tone)
      ========================================= */}
      <section className="w-full bg-background px-4 py-16 sm:px-8 sm:py-24 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="gsap-intro-text mb-10 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Advisory Board
          </h1>

          <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-loose text-justify sm:text-left">
            {introParagraphs.map((text, index) => (
              <p key={index} className="gsap-intro-text">
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: MEMBERS GRID (Different Tone)
      ========================================= */}
      <section className="w-full bg-slate-50 dark:bg-slate-900/40 px-4 py-16 sm:px-8 sm:py-24 lg:px-24 border-t border-border/50">
        <div className="mx-auto max-w-[90rem]">
          {/* 5-Column Grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {advisoryMembers.map((member, index) => (
              <div
                key={index}
                className="gsap-member-card flex flex-col items-start group"
              >
                {/* Member Image */}
                <div className="relative mb-5 w-full aspect-square overflow-hidden bg-slate-200 dark:bg-slate-800 rounded-sm shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Member Name */}
                <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
                  {member.name}
                </h3>

                {/* The short underline divider */}
                <div className="mt-2 mb-3 h-0.5 w-10 bg-primary/60 transition-all duration-300 group-hover:w-16 group-hover:bg-primary"></div>

                {/* Member Affiliation */}
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {member.affiliation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvisoryBoardPage;
