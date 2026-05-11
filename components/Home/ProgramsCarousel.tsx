'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import programsData from '@/utils/data/programs.json';

const ProgramsCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.gsap-prog-header', 
      { y: 30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.gsap-prog-header', start: 'top 90%' }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-white py-16 px-4 sm:py-24 sm:px-8 lg:px-24">
      <div className="mx-auto max-w-[90rem]">
        
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <h2 className="gsap-prog-header text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Our <span className="text-primary">Management Programs</span>
          </h2>
          <div className="gsap-prog-header mt-4 h-1.5 w-20 rounded-full bg-primary lg:mx-0 mx-auto" />
        </div>

        {/* Carousel Component */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          autoHeight={false}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12 !items-stretch"
        >
          {programsData.map((prog, index) => (
            <SwiperSlide key={index} className="!h-auto "> 
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-slate-50 border border-border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:opacity-0" />
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <h3 className="mb-3 text-xl font-bold leading-tight text-foreground sm:text-2xl">
                    {prog.title}
                  </h3>
                  
                  <div className="mb-4 h-1 w-12 bg-primary/30 transition-all duration-300 group-hover:w-full group-hover:bg-primary" />
                  
                  <p className="mb-8 text-sm font-medium leading-relaxed text-muted-foreground sm:text-base flex-1">
                    {prog.description}
                  </p>

                  {/* Button Area */}
                  <div className="mt-auto pt-4 border-t border-border/50 group-hover:border-primary/20 transition-colors">
                    <Link
                      href={prog.link}
                      className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Pagination */}
      <style jsx global>{`
        /* Anchors pagination dots to the bottom of the pb-12 space */
        .swiper-pagination {
          
        bottom: 0px !important;
        }

        /* Base dot styling */
        .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 10px !important;
          height: 10px !important;
          transition: all 0.3s ease;
        }

        /* Active dot styling - pill shape */
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 32px !important;
          border-radius: 6px !important;
        }

        /* Ensures cards stretch to equal heights */
        .swiper-slide {
          display: flex !important;
          height: auto !important;
          padding-bottom: 28px;
        }
      `}</style>
    </section>
  );
};

export default ProgramsCarousel;