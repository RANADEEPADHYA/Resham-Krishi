import { Leaf, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative py-16 mt-8"
      style={{
        background: "rgba(5, 14, 9, 0.95)",
        borderTop: "1px solid rgba(201,162,39,0.15)",
      }}
    >
      {/* Glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2d6a4f, #c9a227)" }}
              >
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg" style={{ color: "#c9a227" }}>
                Resham<span className="text-white">Krishi</span>
                <span
                  className="ml-1 text-xs px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(201,162,39,0.2)", color: "#e9c46a", fontSize: "10px" }}
                >
                  AI
                </span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              India's most trusted AI-powered disease detection system for silkworms and mulberry leaves.
              Protecting the livelihoods of India's silk farming community.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { icon: <Phone className="w-4 h-4" />, text: "1800-XXX-XXXX (Toll Free)" },
                { icon: <Mail className="w-4 h-4" />, text: "support@reshamkrishi.in" },
                { icon: <MapPin className="w-4 h-4" />, text: "Central Silk Board, Bangalore - 560068" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span style={{ color: "#c9a227" }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white font-semibold mb-5 text-sm">Quick Links</p>
            <ul className="space-y-2.5">
              {[
                { label: "Home", id: "#home" },
                { label: "Disease Detection", id: "#detect" },
                { label: "Features", id: "#features" },
                { label: "How It Works", id: "#how-it-works" },
                { label: "About Us", id: "#about" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm transition-all hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-white font-semibold mb-5 text-sm">Resources</p>
            <ul className="space-y-2.5">
              {[
                "Disease Library",
                "Treatment Guide",
                "Best Practices",
                "Training Videos",
                "CSB Guidelines",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm flex items-center gap-1 transition-all hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {item}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2025 ReshamKrishi AI. All rights reserved. | Developed in collaboration with Central Silk Board, India.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Use", "Disclaimer"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-all hover:text-white"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
