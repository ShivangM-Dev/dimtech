"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, ShieldCheck, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const recruitersList = [
  "Coca-Cola",
  "Nestle",
  "Bambinos",
  "IBM",
  "Accenture",
  "Tech Mahindra",
  "Aristech",
  "RocketFrog.ai",
  "OnActuate",
  "Genpact",
  "iEnergizer",
  "SD Global Services",
  "Optum",
  "CorroHealth",
  "Mega Realty",
  "Grant Thornton",
  "HikeEdu",
  "LearnFlu",
  "Cosmos International",
  "WinnVation",
];

const OurRecruitersPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Top text animation
      gsap.fromTo(
        ".gsap-text",
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

      // Highlight box animation
      gsap.fromTo(
        ".gsap-highlight",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: ".gsap-highlight", start: "top 85%" },
        },
      );

      // Company badges stagger animation
      gsap.fromTo(
        ".gsap-company-badge",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: ".gsap-company-badge", start: "top 90%" },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full bg-background font-sans">
      {/* =========================================
          HERO & INTRO SECTION
      ========================================= */}
      <section className="px-4 py-16 sm:px-8 sm:py-24 lg:px-24">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex flex-col lg:col-span-7 xl:col-span-8">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Briefcase className="h-8 w-8" />
              </div>

              <h1 className="gsap-text mb-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Our <span className="text-primary">Recruiters</span>
              </h1>

              <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-loose text-justify sm:text-left">
                <p className="gsap-text">
                  Our recruiters are from almost every sector, such as FMCG, IT
                  Services, Consulting, Healthcare, Real Estate, EdTech, and
                  International Business. Companies come to our college and
                  provide placement opportunities for every course. Placement
                  drives are conducted at the start of the last semester so that
                  students have a job in hand before course completion. Every
                  academic session brings new companies to our college as
                  placement partners.
                </p>
                <p className="gsap-text">
                  Our campus is an employability campus means we provide
                  training and practical learning to students according to
                  industry needs. Before the academic session begins, we consult
                  one-to-one with top authorities in MNCs to understand their
                  requirements so that we can make our students experts in that
                  particular area(s). Ultimately, we make our students skilled
                  over rote learners.
                </p>
              </div>
            </div>

            {/* Right Highlight Box (The Guarantee) */}
            <div className="lg:col-span-5 xl:col-span-4 flex items-center">
              <div className="gsap-highlight relative w-full overflow-hidden rounded-3xl border border-primary bg-primary/5 p-8 sm:p-10 shadow-lg">
                <ShieldCheck className="mb-6 h-12 w-12 text-primary" />
                <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                  100% Placement Guarantee
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Divine Institute of Management & Technology provides a{" "}
                  <strong className="text-primary font-bold">
                    100% placement guarantee on stamp paper
                  </strong>{" "}
                  for MBA, BBA, & BCA degree programs, and for MCA, we provide
                  100% placement assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          COMPANY GRID SECTION
      ========================================= */}
      <section className="w-full bg-slate-50 dark:bg-slate-900/40 px-4 py-16 sm:px-8 sm:py-24 lg:px-24 border-t border-border/50">
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-12 flex flex-col items-center text-center">
            <TrendingUp className="mb-4 h-10 w-10 text-primary" />
            <h2 className="gsap-text text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              20+ Elite Industry Tie-ups
            </h2>
            <p className="gsap-text mt-4 max-w-2xl text-lg text-muted-foreground">
              We actively partner with industry leaders to ensure our curriculum
              meets real-world demands and to secure top-tier opportunities for
              our graduates.
            </p>
          </div>

          {/* Recruiter Badges Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-6">
            {recruitersList.map((company, index) => (
              <div
                key={index}
                className="gsap-company-badge group flex h-24 sm:h-32 items-center justify-center rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <span className="font-bold text-foreground/80 transition-colors duration-300 group-hover:text-primary sm:text-lg">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurRecruitersPage;
