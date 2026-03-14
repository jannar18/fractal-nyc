import { Suspense, lazy } from "react";
import { FadeIn } from "@/components/ui/FadeIn";


const FractalCityScene = lazy(() =>
  import("@/components/three/FractalCityScene").then((m) => ({
    default: m.FractalCityScene,
  }))
);

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#faf8f5]">
      <Suspense fallback={null}>
        <FractalCityScene />
      </Suspense>

      <div className="absolute inset-0 z-0 flex items-end pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}images/skyline4.png`}
          alt="NYC skyline illustration"
          className="w-full object-cover object-bottom opacity-50"
        />
      </div>

      <div className="absolute inset-0 z-10 px-6 md:px-12 py-24 md:py-32 flex flex-col" style={{ textShadow: "0 1px 8px rgba(250,248,245,0.9), 0 0 30px rgba(250,248,245,0.7)" }}>
        <div className="mt-auto flex items-end justify-between">
          <FadeIn delay={0.5} className="max-w-md">
            <p className="text-base md:text-xl font-medium leading-snug text-foreground/90 text-balance">
              In 2021, our small group of friends decided to live, learn, and build together in NYC.
            </p>
          </FadeIn>

          <FadeIn delay={0.7}>
            <a
              href="#story"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest link-underline pb-1"
            >
              Explore our story
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-90">
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
