'use client'
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle, GraduationCap, BookOpen, Wallet, Briefcase, Home, Shield, FileCheck, Globe, Users, Info, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Import your data from the JSON file
import faqContent from '@/utils/data/faq/faqData.json';

// Map string names from JSON to actual React components
const IconMap: Record<string, React.ElementType> = {
  GraduationCap, BookOpen, Wallet, Briefcase, Home, Shield, FileCheck, Globe, Users, Info
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FAQPage() {
  const { faqCategories, faqsData } = faqContent;
  
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animation
    gsap.fromTo('.gsap-hero', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );

    // Sidebar & Content Animation
    gsap.fromTo('.gsap-content',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    );

    // CTA Section Animation
    gsap.fromTo('.gsap-cta',
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gsap-cta',
          start: 'top 85%'
        }
      }
    );
  }, { scope: containerRef });

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const currentFaqs = (faqsData as Record<string, { q: string, a: string }[]>)[activeCategory] || faqsData["admissions"];

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] font-sans min-h-screen pb-24">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-[#f0f1f3] pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
          
          {/* Text Content */}
          <div className="flex-1 max-w-2xl text-center md:text-left">
            <h1 className="gsap-hero text-3xl sm:text-5xl md:text-6xl font-bold text-[#333333] mb-4 md:mb-6 leading-tight tracking-tight">
              Frequently Asked <br className="hidden md:block" /> Questions
            </h1>
            
            <p className="gsap-hero text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
              All About Admissions, Courses, and Campus Life. We've listed all common questions asked by students, parents, and visitors.
            </p>
          </div>

          {/* Hero Illustration */}
          <div className="gsap-hero flex-1 flex justify-center md:justify-end w-2/3 max-w-[200px] md:max-w-[400px]">
            <div className="w-full aspect-square relative bg-primary/5 rounded-full flex items-center justify-center">
              <Image
                src="/images/faq-hero.png"
                alt="FAQ Hero"
                width={800}
                height={800}
                className="absolute inset-0 w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ MAIN CONTENT --- */}
      <section className="gsap-content px-4 sm:px-12 lg:px-24 max-w-7xl mx-auto -mt-4 md:-mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* SIDEBAR CATEGORIES */}
          <div className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-border/50 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible scrollbar-none sticky top-0 md:relative z-20 shadow-sm md:shadow-none">
            {faqCategories.map((category) => {
              const isActive = activeCategory === category.id;
              const IconComponent = IconMap[category.icon];

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setOpenQuestion(null);
                  }}
                  className={`flex items-center gap-2 md:gap-3 px-5 py-4 md:px-6 md:py-4 text-left font-semibold transition-all duration-200 whitespace-nowrap shrink-0 border-b-2 md:border-b md:border-l-4 ${
                    isActive 
                      ? 'bg-[#1a4b9c]/5 text-[#1a4b9c] border-[#1a4b9c] md:bg-[#1a4b9c] md:text-white md:border-[#facc15]' 
                      : 'bg-white text-muted-foreground md:text-[#1a4b9c] border-transparent hover:bg-muted/50 border-b-transparent md:border-b-border/50'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4 md:w-5 md:h-5 shrink-0" />}
                  <span className="text-xs sm:text-sm md:text-base tracking-tight">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* ACCORDION CONTENT */}
          <div className="flex-1 p-4 sm:p-6 md:p-10 bg-white">
            <h2 className="text-xl md:text-2xl font-bold text-[#333333] mb-6 md:mb-8 hidden md:block">
              {faqCategories.find(c => c.id === activeCategory)?.label}
            </h2>

            <div className="flex flex-col gap-3 md:gap-4">
              {currentFaqs.map((faq, index) => {
                const isOpen = openQuestion === index;
                return (
                  <div 
                    key={index} 
                    className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary/30 bg-primary/5 shadow-sm' : 'border-border/60 bg-white'}`}
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none touch-manipulation"
                    >
                      <span className="text-sm md:text-base font-semibold text-[#333333] pr-4 leading-snug">{faq.q}</span>
                      <ChevronDown 
                        className={`w-4 h-4 md:w-5 md:h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                      />
                    </button>
                    
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="p-4 pt-0 md:p-5 md:pt-0 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed border-t border-dashed border-border/40 mt-1 mx-4 md:mx-5 pt-3">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Empty State Fallback */}
              {currentFaqs.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <HelpCircle className="w-10 h-10 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-sm">Questions for this category will be updated soon.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* --- CALL TO ACTION (CTA) SECTION --- */}
      <section className="gsap-cta opacity-0 px-4 sm:px-12 lg:px-24 max-w-5xl mx-auto mt-16 text-center">
        <div className="bg-[#1a4b9c]/5 border border-[#1a4b9c]/20 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#1a4b9c]/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="flex items-start gap-4 max-w-xl relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#1a4b9c] text-white flex items-center justify-center shrink-0 shadow-md hidden sm:flex">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#333333] mb-1.5">
                Still Confused?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Get in touch with our counselors to know more about the course paths, fee support, and eligibility rules.
              </p>
            </div>
          </div>

          <Link href="/enquiry" className="w-full sm:w-auto shrink-0 relative z-10">
            <button className="w-full sm:w-auto bg-[#1a4b9c] hover:bg-[#153d82] text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-base tracking-wide whitespace-nowrap">
              Learn More
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}