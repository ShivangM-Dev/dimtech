'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Landmark, Mountain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- TypeScript Interfaces ---

export interface ExperienceCard {
  icon: string;
  title: string;
  description: string;
}


export interface ResearchStat {
  value: string;
  label: string;
}


export interface EngagementCard {
  institution: string;
  description: string;
}


export interface ProfileData {
  tagline?: string;
  name: string;
  title: string; 
  statusLine?: string; 
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
  quote?: string;
  experienceTitle?: string;
  experienceCards?: ExperienceCard[];
  researchTitle?: string;
  researchParagraphs?: string[];
  researchStats?: ResearchStat[];
  // New properties for Engagement section
  engagementTitle?: string;
  engagementDescription?: string;
  engagementCards?: EngagementCard[];
}


interface LeadershipProfileProps {
  profileData: ProfileData;
}


// --- Dynamic Icon Helper ---
const renderIcon = (iconName: string) => {
  const className = "h-12 w-12 text-primary mb-6 transition-transform duration-300 group-hover:scale-110";
  switch(iconName) {
    case 'graduation': return <GraduationCap className={className} strokeWidth={2} />;
    case 'landmark': return <Landmark className={className} strokeWidth={2} />;
    case 'mountain': return <Mountain className={className} strokeWidth={2} />;
    default: return <GraduationCap className={className} strokeWidth={2} />;
  }
};


const LeadershipProfile: React.FC<LeadershipProfileProps> = ({ profileData }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Top Section Animations
    gsap.fromTo('.gsap-profile-text', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );

    gsap.fromTo('.gsap-profile-img', 
      { x: 50, opacity: 0, scale: 0.95 }, 
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );

    // 2. Experience Cards Animations
    gsap.fromTo('.gsap-experience-card',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-experience-card', start: 'top 85%' } }
    );

    // 3. Research Section Text & Cards
    gsap.fromTo('.gsap-research-text',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-research-text', start: 'top 85%' } }
    );

    gsap.fromTo('.gsap-research-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-research-card', start: 'top 85%' } }
    );

    // 4. Engagement Section Animations (NEW)
    gsap.fromTo('.gsap-engagement-text',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.gsap-engagement-text', start: 'top 85%' } }
    );

    gsap.fromTo('.gsap-engagement-card',
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.gsap-engagement-card', start: 'top 85%' } }
    );

    // 5. Counting Animation for Numbers
    const statElements = gsap.utils.toArray<HTMLElement>('.gsap-stat-number');
    statElements.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 2.5, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        onUpdate: () => {
          el.innerText = Math.ceil(counter.val) + suffix;
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-slate-50 py-16 px-4 font-sans sm:py-24 sm:px-8 lg:px-24 dark:bg-background">

      <div className="mx-auto max-w-[90rem]">
        
        {/* =========================================
                    SECTION 1: MAIN PROFILE
            ========================================= */}

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          <div className="flex flex-col lg:col-span-7 xl:col-span-7">
            {profileData.tagline && (
              <p className="gsap-profile-text mb-2 text-sm font-semibold tracking-wide text-primary uppercase">
                {profileData.tagline}
              </p>
            )}
            <h1 className="gsap-profile-text mb-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {profileData.name}
            </h1>
            <h2 className="gsap-profile-text mb-8 text-lg font-medium text-muted-foreground sm:text-xl">
              {profileData.title}
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-loose text-justify">
              {profileData.paragraphs.map((text, index) => (
                <p key={index} className="gsap-profile-text">{text}</p>
              ))}
              {profileData.quote && (
                <div className="gsap-profile-text mt-8 border-l-4 border-primary bg-primary/5 p-6 rounded-r-xl">
                  <p className="text-lg italic font-medium text-foreground sm:text-xl">
                    &quot;{profileData.quote}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="gsap-profile-img mx-auto w-full max-w-md lg:col-span-5 xl:col-span-5 pt-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl ring-1 ring-border dark:border-slate-800">
              <Image 
                src={profileData.imageSrc} 
                alt={profileData.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
            
            <div className="mx-auto mt-[-20px] relative z-10 w-11/12 rounded-xl border border-border bg-card p-4 text-center shadow-lg">
              <h3 className="text-lg font-bold text-foreground">
                {profileData.statusLine || profileData.name}
              </h3>
              <p className="text-sm font-medium text-primary line-clamp-1">
                {profileData.title}
              </p>
            </div>
          </div>

        </div>

        {/* =========================================
                  SECTION 2: EXPERIENCE CARDS
        ========================================= */}
        {profileData.experienceCards && profileData.experienceCards.length > 0 && (
          <div className="mt-20 sm:mt-28">
            {profileData.experienceTitle && (
              <h3 className="gsap-experience-card mb-12 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {profileData.experienceTitle}
              </h3>
            )}
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {profileData.experienceCards.map((card, index) => (
                <div 
                  key={index}
                  className="gsap-experience-card group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
                >
                  {renderIcon(card.icon)}
                  <h4 className="mb-4 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
                    {card.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            SECTION 3: RESEARCH & ACADEMIC
        ========================================= */}
        {profileData.researchTitle && (
          <div className="mt-20 border-t border-border pt-16 sm:mt-28 sm:pt-24">
            
            <div className="mx-auto max-w-5xl text-center">
              <h3 className="gsap-research-text mb-8 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl uppercase">
                {profileData.researchTitle}
              </h3>
              
              <div className="mb-12 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg text-justify sm:text-center">
                {profileData.researchParagraphs?.map((paragraph, index) => (
                  <p key={index} className="gsap-research-text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {profileData.researchStats && profileData.researchStats.length > 0 && (
              <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
                  {profileData.researchStats.map((stat, index) => {
                    const targetNum = parseFloat(stat.value) || 0;
                    const suffix = stat.value.replace(targetNum.toString(), '');

                    return (
                      <div 
                        key={index}
                        className="gsap-research-card group flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-10 px-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
                      >
                        <span 
                          className="gsap-stat-number mb-2 text-5xl font-black text-primary transition-transform duration-300 group-hover:scale-110 sm:text-6xl"
                          data-target={targetNum}
                          data-suffix={suffix}
                        >
                          0{suffix}
                        </span>
                        <span className="text-lg font-semibold text-foreground sm:text-xl">
                          {stat.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================
            SECTION 4: ACADEMIC ENGAGEMENT (NEW)
        ========================================= */}
        {profileData.engagementTitle && (
          <div className="mt-20 border-t border-border pt-16 sm:mt-28 sm:pt-24">
            
            <div className="mx-auto max-w-6xl text-center">
              <h3 className="gsap-engagement-text mb-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {profileData.engagementTitle}
              </h3>
              
              {profileData.engagementDescription && (
                <p className="gsap-engagement-text mb-12 text-base leading-relaxed text-muted-foreground sm:text-lg text-justify sm:text-center">
                  {profileData.engagementDescription}
                </p>
              )}
            </div>

            {profileData.engagementCards && profileData.engagementCards.length > 0 && (
              <div className="mx-auto w-full">
                {/* Grid Layout: 1 col on mobile, 2 on tablet, 3 on small laptops, 6 side-by-side on wide screens 
                */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 lg:gap-6">
                  {profileData.engagementCards.map((card, index) => (
                    <div 
                      key={index}
                      className="gsap-engagement-card group flex flex-col items-center justify-start rounded-3xl border border-slate-100 bg-card px-5 py-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl dark:border-slate-800"
                    >
                      <h4 className="mb-3 text-base font-bold text-primary transition-colors sm:text-lg">
                        {card.institution}
                      </h4>
                      <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default LeadershipProfile;