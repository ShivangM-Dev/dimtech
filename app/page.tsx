import BG_Video from "@/components/Home/bg_video";
import Hero from "@/components/Home/hero";
import Excellence from "@/components/Home/Excellence";
import ProgramsCarousel from "@/components/Home/ProgramsCarousel";
import SalientFeatures from "@/components/Home/SalientFeatures";
import CampusCTA from "@/components/Home/CampusCTA";
import FaqSection from "@/components/Home/faqsection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background transition-colors duration-300">
      <div className="flex h-8/12">
        <BG_Video/>
      </div>
      <Hero/>
      <Excellence/>
     <ProgramsCarousel/>
     <SalientFeatures/>
     {/* <CampusCTA/> */}
     <FaqSection/>
     
    </div>
  );
}