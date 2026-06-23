'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  CheckCircle2, 
  BadgeCheck, 
  ClipboardList, 
  FileEdit,
  Megaphone,
  Users,
  CircleDollarSign,
  Settings,
  Globe,
  Monitor,
  Handshake,
  Presentation,
  Brain,
  Lightbulb,
  BarChart3,
  Briefcase,
  UserCog,
  FileCheck,
  FileText,
  FolderOpen,
  MessagesSquare,
  CheckCircle
} from 'lucide-react';


// Import JSON Data
import bcaSpecializationsData from "@/utils/data/BCA/bcaSpecialization.json";
import skillsData from "@/utils/data/Skills.json"; // Reusing skills from BBA as they are identical
import mbaData from "@/utils/data/MBA/mbaData.json";

gsap.registerPlugin(ScrollTrigger);

// --- Icon Mapping Logic ---
const iconMap: Record<string, React.ElementType> = {
  megaphone: Megaphone,
  users: Users,
  dollar: CircleDollarSign,
  settings: Settings,
  globe: Globe,
  monitor: Monitor,
  handshake: Handshake,
  presentation: Presentation,
  brain: Brain,
  lightbulb: Lightbulb,
  barchart: BarChart3,
  briefcase: Briefcase,
  userCog: UserCog,
  fileCheck: FileCheck,
  badgeCheck: BadgeCheck,
  clipboardList: ClipboardList,
  fileEdit: FileEdit,
  form: FileText,
  documentation: FolderOpen,
  counseling: MessagesSquare,
  confirmation: CheckCircle
};

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray('.gsap-fade-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out', 
          scrollTrigger: { 
            trigger: el, 
            start: 'top 85%' 
          } 
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="w-full bg-background font-sans min-h-screen"
    >
      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="px-4 pt-16 pb-12 text-center sm:px-8 lg:px-24">
        <h1 className="gsap-fade-up text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {mbaData.hero.titlePrefix}{" "}
          <span className="text-primary">{mbaData.hero.titleHighlight}</span>
        </h1>
        <p className="gsap-fade-up mx-auto mt-8 max-w-4xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          {mbaData.hero.descStart}{" "}
          <strong className="text-foreground">{mbaData.hero.descBold}</strong>
          {mbaData.hero.descEnd}
        </p>
      </section>

      {/* =========================================
          WHY CHOOSE THE COURSE SECTION
      ========================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/40 px-4 py-20 sm:px-8 lg:px-24 border-y border-border/50">
        <div className="mx-auto max-w-360">
          {/* Centered Heading & Intro */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-5">
            <h2 className="gsap-fade-up text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
              {mbaData.whyChooseCourse.title}
            </h2>
          </div>

          <div className='pb-10'>
            <p className="gsap-fade-up text-lg text-muted-foreground leading-relaxed">
              {mbaData.whyChooseCourse.intro}
            </p>
          </div>

          {/* Reasons Grid - 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mbaData.whyChooseCourse.reasons.map(
              (reason: any, index: number) => (
                <div
                  key={index}
                  className="gsap-fade-up group flex flex-col sm:flex-row items-start gap-6 bg-card p-8 rounded-3xl border border-border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Icon Container with the tilt/scale effect */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <CheckCircle2 className="h-7 w-7" strokeWidth={2.5} />
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Optional: Add a subtle CTA or separator if needed */}
          <div className="gsap-fade-up mt-16 flex justify-center">
            <div className="h-1 w-20 bg-primary/20 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* =========================================
          WHY CHOOSE DIMTECH SECTION
      ========================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/40 px-4 py-16 sm:px-8 lg:px-24 border-t border-border/50">
        <div className="mx-auto max-w-360 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="gsap-fade-up relative aspect-4/5 w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800">
            <Image
              src="/images/11.png" // Ensure this image is in public/images
              alt="Students learning at DIMTECH"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col items-start">
            <h2 className="gsap-fade-up text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-8">
              {mbaData.whyChoose.title}
            </h2>

            <div className="gsap-fade-up bg-card w-full p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {mbaData.whyChoose.subtitle}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mbaData.whyChoose.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-muted-foreground font-medium"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <p className="gsap-fade-up mt-8 text-muted-foreground leading-relaxed text-justify">
              {mbaData.whyChoose.description}
            </p>

            {mbaData.whyChoose.buttonText && (
              <button
                className="gsap-fade-up mt-8 bg-primary text-background w-full py-4 font-bold rounded-full hover:bg-foreground/90 transition-colors cursor-pointer"
                onClick={() => (window.location.href = "/apply")}
              >
                {mbaData.whyChoose.buttonText}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================
          SPECIALIZATIONS SECTION
      ========================================= */}
      <section className="w-full bg-background px-4 py-16 sm:px-8 sm:py-24 lg:px-24 border-t border-border/50">
        <div className="mx-auto max-w-360">
          <div className="gsap-fade-up text-center max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
              Our BCA Programs/Specializations
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our BCA program comes with multiple specializations. We welcome a
              diverse range of interested students. BCA specializations equip
              the latest knowledge according to industry standards. Along with
              that, we provide 30+ skill-based value-added certifications to
              improve overall students&apos; growth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bcaSpecializationsData.map((spec, index) => {
              const IconComponent = iconMap[spec.icon] || Megaphone;
              return (
                <div
                  key={index}
                  className="gsap-fade-up group flex flex-col items-start rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800"
                >
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${spec.bgColor} ${spec.iconColor}`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">
                    {spec.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          SKILLS YOU WILL LEARN SECTION
      ========================================= */}
      <section className="w-full bg-slate-50 dark:bg-slate-900/40 px-4 py-16 sm:px-8 sm:py-24 lg:px-24 border-t border-border/50">
        <div className="mx-auto max-w-360">
          <div className="gsap-fade-up text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
              Skills You Will Learn
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Making you skilled is our ultimate goal with our BCA programs.
              Apart from your selected specialization, you will learn the
              following skills mentioned below to build your job readiness and
              professional skills.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {skillsData.map((skill, index) => {
              const IconComponent = iconMap[skill.icon] || CheckCircle2;
              return (
                <div
                  key={index}
                  className="gsap-fade-up flex flex-col items-center text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <IconComponent className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-foreground">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          ELIGIBILITY CRITERIA SECTION
      ========================================= */}
      <section className="w-full bg-primary px-4 py-16 sm:px-8 sm:py-24 lg:px-24">
        <div className="mx-auto max-w-360">
          <h2 className="gsap-fade-up mb-16 text-center text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
            {mbaData.eligibility.title}
          </h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {mbaData.eligibility.items.map((item, index) => {
              const IconComponent = iconMap[item.icon] || CheckCircle2;
              return (
                <div
                  key={index}
                  className="gsap-fade-up flex flex-col items-center text-center"
                >
                  <div className="mb-6 flex items-center justify-center text-primary-foreground">
                    <IconComponent className="h-16 w-16" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-primary-foreground">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-primary-foreground/90 max-w-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          ADMISSIONS PROCESS SECTION
      ========================================= */}
      <section className="w-full bg-background px-4 py-16 sm:px-8 sm:py-24 lg:px-24 border-t border-border/50">
        <div className="mx-auto max-w-360">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
            <div className="flex w-full flex-col justify-center pt-8 lg:sticky lg:top-24 lg:w-4/12">
              <h2 className="gsap-fade-up mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
                {mbaData.admissionsProcess.title}
              </h2>
              <p className="gsap-fade-up text-lg leading-relaxed text-muted-foreground">
                {mbaData.admissionsProcess.description}
              </p>
            </div>

            <div className="w-full lg:w-8/12">
              <div className="admissions-grid-container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
                {mbaData.admissionsProcess.steps.map((step, index) => {
                  const IconComponent = iconMap[step.icon];
                  const isHighlight = step.highlight;

                  const bgClass = isHighlight
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-card text-foreground border-border";
                  const textClass = isHighlight
                    ? "text-primary-foreground"
                    : "text-foreground";
                  const mutedTextClass = isHighlight
                    ? "text-primary-foreground/90"
                    : "text-muted-foreground";
                  const iconBorderClass = isHighlight
                    ? "border-primary-foreground/20"
                    : "border-foreground/10";

                  const hoverShadow = isHighlight
                    ? "hover:shadow-primary/40"
                    : "dark:hover:shadow-primary/5";

                  return (
                    <div
                      key={index}
                      className={`gsap-admission-card group flex flex-col items-center rounded-3xl border p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl sm:p-10 ${bgClass} ${hoverShadow}`}
                    >
                      <div
                        className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 ${iconBorderClass} ${textClass}`}
                      >
                        <IconComponent
                          className="h-10 w-10 transition-transform duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className={`mb-4 text-xl font-bold ${textClass}`}>
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed sm:text-base ${mutedTextClass}`}
                      >
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PLACEMENT SUPPORT SECTION
      ========================================= */}
      <section className="w-full bg-slate-50 dark:bg-slate-900/40 px-4 py-16 sm:px-8 sm:py-24 lg:px-24 border-t border-border/50">
        <div className="mx-auto max-w-360">
          <div className="gsap-fade-up flex flex-col lg:flex-row overflow-hidden rounded-3xl shadow-xl border border-border">
            <div className="flex w-full lg:w-5/12 flex-col justify-center bg-primary p-10 sm:p-16 text-primary-foreground">
              <h2 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight">
                Placement Support & Career Opportunities
              </h2>
              <p className="text-lg leading-relaxed text-primary-foreground/90">
                DIMTECH is a{" "}
                <strong className="text-white font-bold">
                  100% Employability Campus
                </strong>
                . We have a tie-up with 40+ MNCs for placements and internships.
                Making our students&apos; future 100% secure with placement
                drives.
              </p>
            </div>

            <div className="flex w-full lg:w-7/12 flex-col justify-center bg-card p-10 sm:p-16 dark:bg-slate-900">
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                {mbaData.placement.map((item, index) => {
                  const IconComponent = iconMap[item.icon];

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center sm:items-start sm:text-left"
                    >
                      <div className="mb-4 text-foreground">
                        <IconComponent
                          className="h-10 w-10"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="mb-3 text-lg font-bold tracking-widest text-foreground uppercase">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;