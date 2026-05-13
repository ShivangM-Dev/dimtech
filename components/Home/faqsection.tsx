'use client'
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

// Import your JSON data
import faqData from '@/utils/data/faqs.json';

gsap.registerPlugin(ScrollTrigger);

// --- TYPESCRIPT INTERFACES ---
interface FAQItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State to track which FAQ is currently open (null means all closed)
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default to first item open

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(() => {
    // Animate Header Texts
    gsap.fromTo('.gsap-faq-header',
      { y: 30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.gsap-faq-header', start: 'top 85%' }
      }
    );

    // Animate FAQ Items sliding in
    gsap.fromTo('.gsap-faq-item',
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.gsap-faq-item', start: 'top 85%' }
      }
    );

    // Animate Form Placeholder sliding in from right
    gsap.fromTo('.gsap-form-card',
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.gsap-form-card', start: 'top 85%' }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-slate-50 py-16 px-4 sm:py-24 sm:px-8 lg:px-24">
      <div className="mx-auto max-w-[90rem]">
        
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* ==========================================
              LEFT COLUMN: FAQ ACCORDION (Spans 7 cols)
          ========================================== */}
          <div className="lg:col-span-7 xl:col-span-8">
            
            {/* Header */}
            <div className="mb-10">
              <h2 className="gsap-faq-header mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="gsap-faq-header max-w-2xl text-base text-slate-600 sm:text-lg">
                Have questions? We&apos;ve got answers! Check out our FAQ section for quick and helpful solutions to common queries.
              </p>
            </div>

            {/* Accordion List */}
            <div className="flex flex-col gap-3">
              {faqData.map((faq: FAQItem, index: number) => {
                const isOpen = openIndex === index;

                return (
                  <div 
                    key={index} 
                    className="gsap-faq-item overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between p-5 text-left focus:outline-none sm:p-6"
                    >
                      <span className={`text-base font-bold sm:text-lg transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-slate-800'}`}>
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                      />
                    </button>
                    
                    {/* Animated Answer Area using CSS Grid trick for smooth height transition */}
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p 
                          className="whitespace-pre-wrap px-5 pb-5 pt-0 text-sm font-medium leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:text-base"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==========================================
              RIGHT COLUMN: FORM PLACEHOLDER (Spans 5 cols)
          ========================================== */}
          <div className="lg:col-span-5 xl:col-span-4 gsap-form-card">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
              
              <h3 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900">
                ENQUIRE NOW
              </h3>
              
              {/* --- PLACEHOLDER FOR FUTURE FORM COMPONENT --- */}
              <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  Enquiry Form Component goes here
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Import and place your `&lt;EnquiryForm /&gt;` here later.
                </p>
              </div>
              {/* ------------------------------------------- */}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;