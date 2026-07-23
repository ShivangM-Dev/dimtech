'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, AlertTriangle, PhoneCall, Scale, Users, FileText, CheckCircle2, MapPin } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AntiRaggingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animation
    gsap.fromTo('.gsap-hero-element',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
    );

    // Section Reveals
    const sections = gsap.utils.toArray('.gsap-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background font-sans min-h-screen pb-32 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* --- HERO SECTION --- */}
      <section className="px-6 pt-36 pb-16 text-center sm:px-12 lg:px-24 max-w-5xl mx-auto">
        <div className="gsap-hero-element mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 shadow-sm">
          <Shield className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </div>
        <span className="gsap-hero-element inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-muted text-muted-foreground border border-border mb-6 tracking-widest uppercase">
          Official Policy
        </span>
        <h1 className="gsap-hero-element text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground mb-6">
          Anti-Ragging <span className="text-primary">Policy</span>
        </h1>
        <p className="gsap-hero-element text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
          Divine Institute of Management & Technology is committed to building a Safe, Respectful, and Inclusive Campus.
        </p>
        <p className="gsap-hero-element text-sm text-muted-foreground/70 mt-4 max-w-2xl mx-auto">
          In compliance with the UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009.
        </p>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 space-y-16">
        
        {/* 1. Preamble */}
        <section className="gsap-section bg-card border border-border p-8 sm:p-10 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <div className="flex items-start gap-4">
            <Scale className="w-8 h-8 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Preamble</h2>
              <p className="text-muted-foreground leading-relaxed">
                Divine Institute of Management & Technology (“the Institute”) is committed to providing a safe, secure and dignified environment for every member of its academic community. Every student has an inherent right to pursue their education free from fear, intimidation, humiliation or harm. Accordingly, the Institute maintains a policy of <strong className="text-foreground">absolute zero tolerance</strong> towards ragging in any form, whether on campus or in connection with any Institute-affiliated activity.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Definition & Jurisdiction */}
        <section className="gsap-section space-y-8">
          <div className="flex items-start gap-4">
            <FileText className="w-8 h-8 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. What Constitutes Ragging?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ragging refers to any act, conduct or omission by one or more students that causes or is likely to cause physical, psychological or emotional harm, apprehension, shame or embarrassment to another student. This includes, but is not limited to:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Mental, physical, verbal or psychological harassment",
                  "Insulting, demeaning or teasing remarks",
                  "Threatening, intimidating or coercing a student",
                  "Compelling a student to perform embarrassing acts",
                  "Wrongful confinement or physical assault",
                  "Acts affecting psychological well-being or dignity"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-muted/50 p-4 rounded-xl border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic mt-6 border-l-2 border-primary/30 pl-4 py-1">
                Note: This policy applies irrespective of intent. Conduct causing harm or distress shall be treated as ragging, regardless of whether it was framed as a joke, initiation, or tradition.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Jurisdiction & Reporting */}
        <section className="gsap-section grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted/30 border border-border p-8 rounded-3xl">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-4">Zero-Tolerance Jurisdiction</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              The Institute strictly prohibits ragging in all its forms, at all times, and in all locations, including:
            </p>
            <ul className="text-sm text-foreground space-y-2 list-disc list-inside marker:text-primary">
              <li>Classrooms, labs, and workshops</li>
              <li>Library and reading rooms</li>
              <li>Hostels and residential premises</li>
              <li>Sports facilities and cafeterias</li>
              <li>Institute-arranged transport</li>
              <li>Educational tours and industrial visits</li>
            </ul>
          </div>

          <div className="bg-muted/30 border border-border p-8 rounded-3xl">
            <Users className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-4">Anti-Ragging Committee</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The Institute has constituted an Anti-Ragging Committee and Squad to oversee policy implementation. Their responsibilities include:
            </p>
            <ul className="text-sm text-foreground space-y-2 list-disc list-inside marker:text-primary mt-4">
              <li><strong>Awareness:</strong> Conducting orientation campaigns.</li>
              <li><strong>Surveillance:</strong> Monitoring vulnerable campus areas.</li>
              <li><strong>Redressal:</strong> Promptly investigating complaints.</li>
              <li><strong>Disciplinary Action:</strong> Implementing punitive measures.</li>
            </ul>
          </div>
        </section>

        {/* 4. Disciplinary Action (Warning Style) */}
        <section className="gsap-section bg-destructive/5 border border-destructive/20 p-8 sm:p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-destructive"></div>
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-destructive shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Disciplinary Action</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A student found guilty of ragging, or of abetting, instigating or facilitating an act of ragging, shall be subject to strict disciplinary action under this policy and may additionally face criminal prosecution. Measures include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  "Formal warning and written apology",
                  "Debarment from attending classes",
                  "Withholding of examination results",
                  "Withdrawal of scholarships or financial benefits",
                  "Expulsion from the hostel",
                  "Suspension from the Institute",
                  "Rustication or permanent expulsion",
                  "Referral to police for criminal proceedings"
                ].map((action, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0"></div>
                    <span className="text-sm font-medium text-foreground">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Contact / Helpline */}
        <section className="gsap-section">
          <div className="bg-primary text-primary-foreground p-8 sm:p-12 rounded-[2.5rem] shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-6">
                <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Anti-Ragging Helpline</h2>
              <p className="text-primary-foreground/80 mb-6 text-sm sm:text-base max-w-md mx-auto sm:mx-0">
                Any student, parent, or staff member who experiences or witnesses ragging should report it immediately. Confidentiality is strictly maintained.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center sm:justify-start gap-3 bg-black/20 w-fit px-5 py-3 rounded-xl mx-auto sm:mx-0 backdrop-blur-sm border border-white/10">
                  <span className="font-semibold tracking-wide">1800 270 7021 / 0120 490 8590</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3 bg-black/20 w-fit px-5 py-3 rounded-xl mx-auto sm:mx-0 backdrop-blur-sm border border-white/10">
                  <span className="font-semibold tracking-wide">info@dimtech.org</span>
                </div>
              </div>
            </div>

            <div className="sm:w-1/3 relative z-10 text-center">
              <div className="text-6xl text-primary-foreground/20 font-serif leading-none mb-4">"</div>
              <p className="text-lg sm:text-xl font-bold italic leading-tight">
                Say No to Ragging. <br/>Say Yes to Respect, Friendship and Learning.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}