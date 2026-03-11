import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { OriginStory } from "@/components/sections/OriginStory";
import { Projects } from "@/components/sections/Projects";
import { Vision } from "@/components/sections/Vision";
import { Directory } from "@/components/sections/Directory";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";

export function Home() {
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navbar />
      <Hero />
      <OriginStory />
      <Projects />
      <Vision />
      <Directory />
      <Footer />
    </main>
  );
}
