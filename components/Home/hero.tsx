export default function Hero() {
  return (
   
    <div className="relative flex h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* 2. Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* NO GLASS BLUR - Video is 100% clear */}

      {/* 3. Your Content (z-20 keeps it in front of the video) */}
      <main className="relative z-20 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
          Divine Institute of Management and Technology
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg font-medium text-white drop-shadow-md">
          Welcome to the official web portal.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90">
            Explore Programs
          </button>
          <button className="rounded-full border-2 border-primary bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary/5">
            Chairman's Message
          </button>
        </div>
        
      </main>
    </div>
  );
}