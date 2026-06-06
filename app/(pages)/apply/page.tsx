"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ApplyPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate Left Text Content
      gsap.fromTo(
        ".gsap-hero-text",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // Animate Right Form Card
      gsap.fromTo(
        ".gsap-hero-form",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-slate-900"
    >
      {/* =========================================
          BACKGROUND VIDEO & OVERLAY
      ========================================= */}
      {/* Replace src with your actual video path in public/videos/ */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src="/videos/bg-video-hero.mp4" type="video/mp4" />
        {/* Fallback image if video fails to load */}
        <img
          src="/images/1.png"
          alt="Campus Background"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Dark overlay to make text and form readable */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* =========================================
          MAIN CONTENT CONTAINER
      ========================================= */}
      <div className="relative z-20 mx-auto w-full max-w-[90rem] px-4 py-20 sm:px-8 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* --- LEFT COLUMN: BRANDING TEXT --- */}
        <div className="w-full lg:w-1/2 flex flex-col text-white">
          <h1 className="gsap-hero-text text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold uppercase leading-tight tracking-tight shadow-black/50 drop-shadow-lg">
            Empowering <br /> Minds, Transforming
          </h1>
          <h2 className="gsap-hero-text mt-2 text-7xl sm:text-8xl lg:text-[7rem] xl:text-[9rem] font-black text-primary leading-none tracking-tighter drop-shadow-xl">
            FUTURES
          </h2>

          <p className="gsap-hero-text mt-6 text-lg sm:text-xl text-slate-200 max-w-xl leading-relaxed shadow-black/50 drop-shadow-md">
            A Path to Professional Triumph as we bridge the gap between ambition
            and achievement, equipping students with industry-ready skills,
            hands-on experience, and a dynamic learning environment at the
            Divine Institute of Management and Technology.
          </p>

          <div className="gsap-hero-text mt-10">
            <button className="bg-white text-slate-950 font-bold px-8 py-4 text-sm tracking-wider uppercase transition-all duration-300 hover:bg-slate-200 hover:scale-105 shadow-xl">
              Know More &rarr;
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: REGISTRATION FORM --- */}
        <div className="gsap-hero-form w-full lg:w-1/2 max-w-md xl:max-w-lg mx-auto lg:ml-auto lg:mr-0">
          <div className="bg-card text-card-foreground rounded-xl shadow-2xl overflow-hidden font-sans border border-border">
            {/* Form Header (Replaced Tabs) */}
            <div className="w-full bg-primary text-primary-foreground py-5 text-center font-bold tracking-widest uppercase text-lg">
              Registration Form
            </div>

            {/* Form Fields */}
            <form className="p-6 sm:p-8 space-y-4">
              <input
                type="text"
                placeholder="Enter Name *"
                required
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              />

              <input
                type="email"
                placeholder="Enter Email Address *"
                required
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              />

              {/* Phone Input Group */}
              <div className="flex gap-2">
                <select className="bg-background border border-border px-2 py-3 text-sm rounded text-foreground w-24 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number *"
                  required
                  className="w-full bg-background border border-border px-4 py-3 text-sm rounded focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </div>

              {/* OTP Field (Disabled state visualization) */}
              <input
                type="text"
                placeholder="Enter OTP"
                disabled
                className="w-full bg-muted border border-border px-4 py-3 text-sm rounded cursor-not-allowed text-muted-foreground placeholder:text-muted-foreground"
              />

              {/* State & City */}
              <div className="flex gap-4">
                <select
                  required
                  className="w-full bg-background border border-border px-4 py-3 text-sm rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select State *</option>
                  <option value="dl">Delhi</option>
                  <option value="up">Uttar Pradesh</option>
                </select>
                <select
                  required
                  disabled
                  className="w-full bg-muted border border-border px-4 py-3 text-sm rounded text-muted-foreground cursor-not-allowed"
                >
                  <option value="">Select City *</option>
                </select>
              </div>

              {/* Course Selection */}
              <select
                required
                className="w-full bg-background border border-border px-4 py-3 text-sm rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select Course *</option>
                <option value="bca">BCA</option>
                <option value="bba">BBA</option>
                <option value="mca">MCA</option>
                <option value="mba">MBA</option>
              </select>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background"
                />
                <p className="text-[11px] leading-tight text-muted-foreground">
                  By submitting this form, you consent to being contacted by{" "}
                  <strong className="font-semibold text-foreground">
                    Divine Institute of Management and Technology (DIMTECH)
                  </strong>{" "}
                  via whatsapp, email, SMS, call, and other methods, even if
                  your number is on the DND/NDNC list. You also agree to our
                  Privacy policy, Term of Use and Disclaimers. *
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 bg-primary text-primary-foreground font-bold py-4 text-sm tracking-widest uppercase rounded shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-primary/30"
              >
                Apply Now
              </button>
            </form>

            {/* Added a subtle padding bottom to replace the removed footer space */}
            <div className="pb-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
