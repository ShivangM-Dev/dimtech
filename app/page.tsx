export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background transition-colors duration-300">
      <main className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 text-center">
        
        {/* Main Heading using your Tory Blue (--primary) color */}
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
          Divine Institute of Management and Technology
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Welcome to the official web portal.
        </p>

        {/* Example buttons utilizing your primary and secondary theme colors */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90">
            Explore Programs
          </button>
          <button className="rounded-full border-2 border-primary bg-secondary px-8 py-3.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-colors hover:bg-primary/5">
            Chairman's Message
          </button>
        </div>
        
      </main>
    </div>
  );
}