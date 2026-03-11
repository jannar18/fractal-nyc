import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowUpRight } from "lucide-react";

const directoryItems = [
  { icon: "📚", title: "Fractal University", href: "#projects" },
  { icon: "🛌", title: "Stay at Fractal", href: "#campus" },
  { icon: "✏️", title: "Writing", href: "#story" },
  { icon: "🎧", title: "Podcasts & Talks", href: "#story" },
  { icon: "✨", title: "Vibes", href: "#vision" },
  { icon: "🗽", title: "Excelsior", href: "#vision" },
  { icon: "💃", title: "Events", href: "#campus" },
  { icon: "🔎", title: "Find the Others", href: "#story" },
  { icon: "🕸️", title: "Alumni of Our Neighborhood Accelerator", href: "#projects" },
  { icon: "❓", title: "How Can I Help?", href: "#vision" },
];

export function Directory() {
  return (
    <section id="directory" className="py-24 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif">Directory</h2>
              <p className="text-muted-foreground mt-4 font-light text-lg">Explore the facets of our community.</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {directoryItems.map((item, index) => (
            <FadeIn 
              key={index} 
              delay={index * 0.05} 
              className="bg-background relative group"
            >
              <a 
                href={item.href} 
                className="block p-8 md:p-12 h-full transition-colors duration-300 hover:bg-secondary/50"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="text-4xl md:text-5xl filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 origin-bottom-left">
                    {item.icon}
                  </span>
                  <ArrowUpRight 
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" 
                    size={24} 
                    strokeWidth={1}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-medium tracking-tight pr-4">
                  {item.title}
                </h3>
              </a>
            </FadeIn>
          ))}
          <div className="bg-background hidden lg:block"></div>
          <div className="bg-background hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
