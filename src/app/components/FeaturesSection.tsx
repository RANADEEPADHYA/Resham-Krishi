import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Brain,
  Shield,
  BarChart3,
  CloudUpload,
  Languages,
  Smartphone,
  Bell,
  Award,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Deep Learning AI",
    description:
      "Powered by a CNN model trained on 50,000+ annotated disease images for highly accurate detection.",
    color: "#c9a227",
    glow: "rgba(201,162,39,0.15)",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Results",
    description:
      "Get disease diagnosis in under 3 seconds — no waiting, no delay. Time is critical during disease outbreaks.",
    color: "#52b788",
    glow: "rgba(82,183,136,0.15)",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "12+ Disease Types",
    description:
      "Detects Muscardine, Flacherie, Pebrine, Leaf Rust, Powdery Mildew, Bacterial Blight and more.",
    color: "#74c69d",
    glow: "rgba(116,198,157,0.15)",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Severity Assessment",
    description:
      "Not just detection — our AI grades disease severity from mild to severe with affected area percentage.",
    color: "#e9c46a",
    glow: "rgba(233,196,106,0.15)",
  },
  {
    icon: <CloudUpload className="w-6 h-6" />,
    title: "Simple Image Upload",
    description:
      "Just drag-and-drop or upload any image from your phone or camera. No special equipment needed.",
    color: "#52b788",
    glow: "rgba(82,183,136,0.15)",
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: "Multi-language Support",
    description:
      "Available in Hindi, Kannada, Telugu, Bengali and English to serve farmers across India.",
    color: "#c9a227",
    glow: "rgba(201,162,39,0.15)",
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Expert Recommendations",
    description:
      "Each diagnosis includes actionable treatment recommendations and preventive measures specific to the disease.",
    color: "#74c69d",
    glow: "rgba(116,198,157,0.15)",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Optimized",
    description:
      "Designed for use in the field on any device — smartphone, tablet or desktop. Works offline too.",
    color: "#e9c46a",
    glow: "rgba(233,196,106,0.15)",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Certified Accuracy",
    description:
      "Validated with Central Silk Board India, achieving 98.4% detection accuracy in field trials.",
    color: "#c9a227",
    glow: "rgba(201,162,39,0.15)",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
      }
    );

    const cards = cardsRef.current?.querySelectorAll(".feature-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: "top 75%" },
        }
      );
    }
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative py-24">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[160px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #c9a227, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4"
            style={{
              background: "rgba(201,162,39,0.12)",
              border: "1px solid rgba(201,162,39,0.3)",
              color: "#e9c46a",
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            Why ReshamKrishi AI
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            Built for Farmers & Silk Factories
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Every feature is designed with Indian sericulture farmers and silk processing factories in mind —
            simple, powerful, and reliable.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card group rounded-2xl p-6 transition-all duration-300 cursor-default hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = `1px solid ${feature.color}40`;
                (e.currentTarget as HTMLDivElement).style.background = feature.glow;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px ${feature.glow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${feature.glow}`,
                  border: `1px solid ${feature.color}30`,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2 text-base">{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
