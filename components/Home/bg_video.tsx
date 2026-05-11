export default function BG_Video() {
  return (
    <section className="flex relative w-full h-8/12 overflow-hidden bg-black">

      {/* Mobile Static Image */}
      <img
        src="/images/hero-banner.jpg"
        alt="Hero"
        className="block md:hidden w-screen h-full object-cover"
      />

      {/* Desktop Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hidden md:block w-screen h-8/12 object-cover"
      >
        <source src="/videos/bg-video-hero.mp4" type="video/mp4" />
      </video>

   
    </section>
  );
}