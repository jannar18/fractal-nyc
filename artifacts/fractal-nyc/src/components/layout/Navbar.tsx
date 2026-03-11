import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const sectionLinks = [
    { name: "Story", href: "#story" },
    { name: "Campus", href: "#campus" },
    { name: "Projects", href: "#projects" },
    { name: "Vision", href: "#vision" },
    { name: "Directory", href: "#directory" },
  ];

  const communityLinks = [
    { icon: "📚", name: "Fractal University", href: "#directory" },
    { icon: "🛌", name: "Stay at Fractal", href: "#directory" },
    { icon: "✏️", name: "Writing", href: "#directory" },
    { icon: "🎧", name: "Podcasts & Talks", href: "#directory" },
    { icon: "✨", name: "Vibes", href: "#directory" },
    { icon: "🗽", name: "Excelsior", href: "#directory" },
    { icon: "💃", name: "Events", href: "#directory" },
    { icon: "🔎", name: "Find the Others", href: "#directory" },
    { icon: "🕸️", name: "Alumni Accelerator", href: "#directory" },
    { icon: "❓", name: "How Can I Help?", href: "#directory" },
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="#" className="font-serif text-2xl tracking-tight z-50 relative">
            Fractal
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {sectionLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors link-underline"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#directory"
              className="ml-4 px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get Involved
            </a>
          </nav>

          <button
            className="md:hidden z-50 relative p-2 -mr-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" as const },
          closed: { opacity: 0, pointerEvents: "none" as const },
        }}
        className="fixed inset-0 z-40 bg-background overflow-y-auto pt-24 pb-12"
      >
        <nav className="flex flex-col items-center gap-6 px-6">
          {sectionLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-3xl hover:text-foreground/70 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="w-full max-w-sm border-t border-border my-4 pt-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 text-center">Community</p>
            <div className="grid grid-cols-2 gap-3">
              {communityLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors py-2"
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
