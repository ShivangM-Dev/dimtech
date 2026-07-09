'use client'
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { FileSignature, UserCheck, MonitorPlay, GraduationCap } from 'lucide-react';

// Adjust path as needed for your project
import AdmissionForm from '@/components/form/enquiryForm';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  { icon: FileSignature, title: "Submit Application", desc: "Fill out the detailed form below to start your journey." },
  { icon: UserCheck, title: "Counselor Review", desc: "Our admissions team carefully evaluates your profile." },
  { icon: MonitorPlay, title: "Interview / DMAT", desc: "Clear our entrance test or personal interview round." },
  { icon: GraduationCap, title: "Welcome to DIMTECH!", desc: "Receive your offer letter and begin your career." }
];

export default function ApplyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- THREE.JS 3D BACKGROUND ENVIRONMENT ---
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    
    // Set dimensions to full window
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. CREATE PARTICLES (Expanded spread to cover full screen background)
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 5 + Math.random() * 25; // Wider spread for background

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      colors[i] = 0.1;     
      colors[i + 1] = 0.4; 
      colors[i + 2] = 0.9; 
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      alphaMap: particleTexture,
      blending: THREE.NormalBlending, 
      depthWrite: false,
      opacity: 0.5 // Slightly more transparent so it doesn't overpower text
    });

    const pointCloud = new THREE.Points(geometry, particleMaterial);
    
    // 2. LOAD YOUR LOGO AS A 3D SPRITE
    const logoTexture = new THREE.TextureLoader().load('/d-logo.png');
    const logoMaterial = new THREE.SpriteMaterial({
      map: logoTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.8
    });
    const logoSprite = new THREE.Sprite(logoMaterial);
    logoSprite.scale.set(12, 12, 1);
    // Shift the logo slightly right so it's not hidden perfectly behind the center form
    logoSprite.position.set(4, 0, -5); 
    
    const sceneGroup = new THREE.Group();
    sceneGroup.add(pointCloud);
    sceneGroup.add(logoSprite); 
    scene.add(sceneGroup);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const targetX = { val: 0 };
    const targetY = { val: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) / 100;
      mouseY = (e.clientY - height / 2) / 100;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      targetX.val += (mouseX - targetX.val) * 0.05;
      targetY.val += (mouseY - targetY.val) * 0.05;

      sceneGroup.rotation.y = elapsedTime * 0.08 + targetX.val * 0.2;
      sceneGroup.rotation.x = targetY.val * 0.2;
      logoSprite.position.y = Math.sin(elapsedTime * 1.5) * 0.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Subtle parallax effect on scroll
    gsap.to(sceneGroup.position, {
      y: 8,
      z: 5,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      logoMaterial.dispose();
      logoTexture.dispose();
      renderer.dispose();
    };
  }, []);

  // --- GSAP SCROLL REVEALS ---
  useGSAP(() => {
    ScrollTrigger.refresh();

    gsap.fromTo('.hero-text', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.1 }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 85%', 
      }
    });

    tl.fromTo('.progress-line', 
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1.2, ease: 'power2.inOut' }
    );

    tl.fromTo('.process-step', 
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.2)' },
      "-=0.9"
    );

    gsap.fromTo('.form-container',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.form-container', start: 'top 85%' } }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full font-sans min-h-screen relative overflow-hidden">
      
      {/* --- FIXED 3D BACKGROUND --- */}
      {/* Fixed to the screen, pushed behind everything else */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10 outline-none pointer-events-none bg-background" 
      />

      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 sm:px-12 flex flex-col gap-20">
        
        {/* HERO SECTION */}
        <section className="text-center pt-10">
          <h1 className="hero-text text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl mb-6 select-none opacity-0 drop-shadow-sm">
            Begin Your <span className="text-primary bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Legacy.</span>
          </h1>
          <p className="hero-text max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed opacity-0 bg-background/50 backdrop-blur-sm rounded-xl p-4 inline-block">
            Navigate the matrix of your potential. Complete the application below and take the first step into the future of tech and management.
          </p>
        </section>

        {/* ANIMATED PROCESS TIMELINE (Wrapped in Glassmorphism) */}
        <section ref={timelineRef} className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-3xl p-10 sm:p-14 opacity-0" style={{ opacity: 1 }}>
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Admission Process</h2>
          
          <div className="relative pl-10 border-l-2 border-border/40 max-w-2xl mx-auto">
            <div className="progress-line absolute top-0 left-[-2px] w-[2px] h-full bg-primary origin-top scale-y-0 shadow-[0_0_15px_rgba(var(--primary),0.6)]"></div>

            <div className="flex flex-col gap-12 relative z-10">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="process-step relative group opacity-0">
                    <div className="absolute -left-[60px] top-0 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-125 group-hover:bg-primary/10">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ADMISSION FORM COMPONENT (Wrapped in Glassmorphism) */}
        <section className="form-container opacity-0 pb-12">
          {/* We wrap the form to ensure it also gets the frosted glass background if the form itself doesn't have it */}
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-3xl overflow-hidden">
            <AdmissionForm />
          </div>
        </section>

      </div>
    </div>
  );
}