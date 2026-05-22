import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X, Leaf, Microscope } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Detect", href: "#detect" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(9, 24, 16, 0.95)"
          : "rgba(9, 24, 16, 0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(201,162,39,0.2)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick("#home")}>
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #2d6a4f, #c9a227)" }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span style={{ color: "#c9a227" }} className="text-lg tracking-wide">
                Resham<span className="text-white">Krishi</span>
              </span>
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full text-white"
                style={{ background: "rgba(201,162,39,0.25)", fontSize: "10px" }}>
                AI
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:text-yellow-400"
                style={{ color: "rgba(255,255,255,0.75)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = "rgba(201,162,39,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick("#detect")}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #2d6a4f, #1b4332)",
                border: "1px solid rgba(201,162,39,0.4)",
                boxShadow: "0 0 20px rgba(45,106,79,0.3)",
              }}
            >
              <Microscope className="w-4 h-4" />
              Start Detection
            </button>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 rounded-lg text-white"
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: "rgba(201,162,39,0.1)" }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-2"
          style={{ background: "rgba(9,24,16,0.98)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left px-4 py-3 rounded-xl text-sm text-white transition-all"
              style={{ background: "rgba(45,106,79,0.2)" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#detect")}
            className="px-4 py-3 rounded-xl text-sm font-medium text-white mt-1"
            style={{ background: "linear-gradient(135deg, #2d6a4f, #c9a227)" }}
          >
            Start Detection
          </button>
        </div>
      )}
    </nav>
  );
}
