'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Animate Chairman Section
    gsap.fromTo('.gsap-chairman-text', 
      { y: 40, opacity: 0 }, 
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', 
        scrollTrigger: { trigger: '.gsap-chairman-text', start: 'top 80%' } 
      }
    );

    gsap.fromTo('.gsap-chairman-img', 
      { x: 50, opacity: 0, scale: 0.95 }, 
      { 
        x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', 
        scrollTrigger: { trigger: '.gsap-chairman-img', start: 'top 80%' } 
      }
    );

    // 2. Animate Mission & Vision Cards
    gsap.fromTo('.gsap-mv-card',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.gsap-mv-card', start: 'top 85%' }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-slate-50 py-16 px-4 font-sans sm:py-24 sm:px-8 lg:px-24 dark:bg-background">
      <div className="mx-auto max-w-[90rem]">
        
        {/* =========================================
            SECTION 1: CHAIRMAN'S MESSAGE
        ========================================= */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col lg:col-span-7 xl:col-span-8">
            <h1 className="gsap-chairman-text mb-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Chairman&apos;s <span className="text-primary">Message</span>
            </h1>
            
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-loose text-justify">
              <p className="gsap-chairman-text">
                Welcome to DIMTECH, where we are dedicated to nurturing the leaders of tomorrow. As Chairman, it is my privilege to guide this institution in its mission to provide world-class education, foster innovation, and cultivate a spirit of excellence in every student.
              </p>
              
              <p className="gsap-chairman-text">
                At DIMTECH, we believe that education is the foundation of personal and professional growth. Our comprehensive programs are designed not only to impart knowledge but to build character, develop critical thinking, and prepare students to meet the challenges of the ever-evolving global landscape. We strive to create an environment that encourages intellectual curiosity, ethical leadership, and a passion for lifelong learning. Our faculty members are thought leaders in their fields, bringing a wealth of experience and expertise to the classroom. Alongside, our state-of-the-art infrastructure, industry collaborations, and a strong network of alumni provide students with unmatched opportunities for growth and success.
              </p>
              
              <p className="gsap-chairman-text">
                We are proud of our diverse and inclusive community, where students from different backgrounds come together to learn, collaborate, and thrive. I encourage you to explore our website and learn more about the exceptional programs and experiences we offer. As we look to the future, we remain committed to our core values of excellence, integrity, and innovation. Together, we will continue to shape a brighter future for our students and for the world.
              </p>
            </div>
          </div>

          {/* Right Column: Chairman Photo */}
          <div className="gsap-chairman-img mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none xl:col-span-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl ring-1 ring-border dark:border-slate-800">
              <Image 
                src="/images/chairman.jpg" 
                alt="Chairman of DIMTECH"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
            <div className="mx-auto mt-[-20px] relative z-10 w-11/12 rounded-xl border border-border bg-card p-4 text-center shadow-lg">
              <h3 className="text-lg font-bold text-foreground">Hon&apos;ble Chairman</h3>
              <p className="text-sm font-medium text-primary">DIMTECH Group of Institutions</p>
            </div>
          </div>

        </div>

        {/* =========================================
            SECTION 2: MISSION & VISION (Anchor Link Target)
        ========================================= */}
        {/* ADDED: id="mission-vision" and scroll-mt-28 to prevent navbar overlap */}
        <section id="mission-vision" className="mt-24 scroll-mt-28 sm:mt-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            
            {/* --- OUR MISSION CARD --- */}
            <div className="gsap-mv-card flex flex-col items-center justify-start rounded-xl border border-slate-100 bg-card p-8 sm:p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] dark:border-slate-800">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">Our Mission</h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Our mission is to be a premier institution dedicated to empowering future leaders through innovative education, practical learning experiences, and a strong commitment to ethical practices and social responsibility. 
                <br /><br />
                <span className="font-medium text-foreground/80">
                  We aim to bridge the gap between academic theory and industry demands by providing a dynamic learning ecosystem. Through continuous mentorship, state-of-the-art facilities, and a curriculum aligned with global standards, we strive to cultivate critical thinkers who are fully equipped to navigate and excel in the complexities of the modern corporate world.
                </span>
              </p>
            </div>

            {/* --- OUR VISION CARD --- */}
            <div className="gsap-mv-card flex flex-col items-center justify-start rounded-xl border border-slate-100 bg-card p-8 sm:p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] dark:border-slate-800">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Eye className="h-8 w-8" />
              </div>
              <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">Our Vision</h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                DIMTECH envisions shaping future leaders who drive positive change. We aspire to be a hub of innovation, where ethical business practices build a better world.
                <br /><br />
                <span className="font-medium text-foreground/80">
                  By fostering a culture of research, inclusivity, and lifelong learning, we see our institution recognized globally for producing transformative leaders. Our vision extends beyond mere academic success; we want to inspire our alumni to become catalysts for sustainable development, technological advancement, and societal upliftment.
                </span>
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

export default page;