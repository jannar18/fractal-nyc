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
    { name: "Liberal Arts", href: "#liberal-arts" },
    { name: "Coliving", href: "#coliving" },
    { name: "Campus", href: "#campus" },
    { name: "Political Club", href: "#political-club" },
    { name: "Research Lab", href: "#research-lab" },
    { name: "Publication", href: "#publication" },
    { name: "Protocol", href: "#protocol" },
    { name: "Events", href: "#events" },
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
        <div className="relative py-5 px-6 max-md:hidden">
          <div className="flex items-center justify-center">
            <a href="#" className="text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.85] text-center" style={{ fontFamily: "'Jacquard 24', system-ui" }}>
              Fractal<br />Collective
            </a>
          </div>
          <nav className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {sectionLinks.slice(0, 4).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border/50 hover:border-border hover:bg-secondary/50"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <nav className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {sectionLinks.slice(4).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border/50 hover:border-border hover:bg-secondary/50"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="md:hidden px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-2xl tracking-tight" style={{ fontFamily: "'Jacquard 24', system-ui" }}>
            Fractal Collective
          </a>
          <button
            className="z-50 relative p-2 -mr-2 text-foreground"
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
        </nav>
      </motion.div>
    </>
  );
}
