'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Download, ExternalLink, FileText } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AffiliationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfUrl = "/affiliation.pdf"; // Make sure your PDF is in the /public folder!

  useGSAP(() => {
    // 1. Hero Content Animation
    gsap.fromTo('.gsap-hero', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
    );

    // 2. PDF Viewer Container Reveal
    gsap.fromTo('.gsap-viewer',
      { y: 60, opacity: 0, scale: 0.98 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: 'power3.out', 
        scrollTrigger: { 
          trigger: '.gsap-viewer', 
          start: 'top 85%' 
        } 
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background font-sans min-h-screen pb-24 overflow-hidden relative">
      
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* --- HERO SECTION --- */}
      <section className="px-6 pt-32 pb-12 text-center sm:px-12 lg:px-24 max-w-4xl mx-auto">
        <div className="gsap-hero mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="gsap-hero text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
          Official <span className="text-primary">Affiliations</span>
        </h1>
        <p className="gsap-hero text-lg text-muted-foreground leading-relaxed">
          DIMTECH takes immense pride in its prestigious affiliation with <strong className="text-foreground">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</strong>. This partnership reflects our unwavering commitment to delivering world-class, approved technical and management education. Review our official documentation of compliance and academic excellence below.
        </p>
      </section>

      {/* --- PDF VIEWER SECTION --- */}
      <section className="px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        <div className="gsap-viewer bg-card/60 backdrop-blur-xl border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          
          {/* PDF Viewer Top Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-foreground text-sm sm:text-base">Affiliation_Certificate_2026.pdf</h3>
                <p className="text-xs text-muted-foreground">Official Document • 1.2 MB</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border hover:bg-muted text-sm font-semibold text-foreground transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Open Fullscreen</span>
                <span className="sm:hidden">Open</span>
              </a>
              <a 
                href={pdfUrl} 
                download
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-sm font-semibold text-primary-foreground transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Actual PDF Iframe rendering */}
          {/* Height is responsive: shorter on mobile, taller on desktop */}
          <div className="w-full h-[60vh] sm:h-[75vh] bg-[#525659] relative">
            <iframe 
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
              className="w-full h-full border-0 absolute top-0 left-0"
              title="Affiliation Document Viewer"
              loading="lazy"
            />
            {/* Fallback for browsers that don't support iframed PDFs */}
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white pointer-events-none -z-10">
              <p>Loading document...</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}