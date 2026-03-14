import { Suspense, lazy } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SkylineSilhouette } from "./SkylineSilhouette";

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

      <SkylineSilhouette />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full" style={{ textShadow: "0 1px 8px rgba(250,248,245,0.9), 0 0 30px rgba(250,248,245,0.7)" }}>
        <div className="max-w-4xl">
          <FadeIn delay={0.1}>
            <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-muted-foreground mb-6">
              New York City
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <div className="mb-8">
              <h1 className="text-8xl md:text-[10rem] lg:text-[14rem] leading-[0.85] font-serif tracking-tighter text-foreground">
                Fractal
              </h1>
              <p className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-mono tracking-tighter text-foreground/80">
                Collective
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} className="max-w-2xl">
            <p className="text-xl md:text-3xl font-medium leading-snug text-foreground/90 text-balance">
              In 2021, our small group of friends decided to live, learn, and build together in NYC.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.7} className="mt-12">
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
