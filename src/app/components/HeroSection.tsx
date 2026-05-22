import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, Sparkles, Shield, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onDetectClick: () => void;
}

export function HeroSection({ onDetectClick }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(badgeRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.3")
      .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(statsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(imageRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.9");

    // Floating animation for image
    gsap.to(imageRef.current, {
      y: -15,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2,
    });

    // Shimmer on title gold text
    const goldSpan = titleRef.current?.querySelector(".gold-text");
    if (goldSpan) {
      gsap.to(goldSpan, {
        backgroundPosition: "200% center",
        duration: 3,
        ease: "linear",
        repeat: -1,
        delay: 2,
      });
    }
  }, []);

  const scrollToNext = () => {
    const el = document.querySelector("#detect");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div ref={badgeRef} className="flex items-center gap-2 w-fit">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(201,162,39,0.12)",
                  border: "1px solid rgba(201,162,39,0.35)",
                  color: "#e9c46a",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Powered Sericulture Intelligence</span>
              </div>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-white leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Smart Disease Detection for{" "}
              <span
                className="gold-text"
                style={{
                  background:
                    "linear-gradient(90deg, #c9a227 0%, #f4d03f 40%, #c9a227 60%, #e9c46a 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Silkworms
              </span>{" "}
              &{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #52b788, #74c69d, #52b788)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Mulberry Leaves
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg max-w-xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Upload an image and let <strong style={{ color: "#c9a227" }}>ReshamKrishi AI</strong> instantly
              analyze the health condition of your silkworms and mulberry leaves — giving farmers and silk
              factories actionable insights to protect their yield.
            </p>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button
                onClick={onDetectClick}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%)",
                  border: "1px solid rgba(201,162,39,0.5)",
                  boxShadow: "0 0 30px rgba(45,106,79,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <Zap className="w-4 h-4" style={{ color: "#c9a227" }} />
                Detect Disease Now
              </button>
              <button
                onClick={() => {
                  const el = document.querySelector("#how-it-works");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Shield className="w-4 h-4" style={{ color: "#74c69d" }} />
                How It Works
              </button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="flex flex-wrap gap-6 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                { value: "98.4%", label: "Detection Accuracy" },
                { value: "12+", label: "Disease Types" },
                { value: "5K+", label: "Farmers Served" },
                { value: "<3s", label: "Analysis Time" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-2xl font-semibold"
                    style={{ color: "#c9a227" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-end">
            {/* Glow behind */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl"
              style={{
                background: "radial-gradient(ellipse, rgba(45,106,79,0.35) 0%, transparent 70%)",
              }}
            />
            <div className="relative w-full max-w-md">
              {/* Decorative ring */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-30"
                style={{
                  border: "1px solid rgba(201,162,39,0.4)",
                  borderRadius: "28px",
                }}
              />
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(201,162,39,0.25)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(45,106,79,0.2)",
                }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1668252826332-07412eb2c64e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrd29ybSUyMG11bGJlcnJ5JTIwbGVhdmVzJTIwc2VyaWN1bHR1cmUlMjBmYXJtfGVufDF8fHx8MTc3ODUxNjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Silkworm on mulberry leaves"
                  className="w-full h-72 object-cover"
                />
                {/* Overlay info card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="rounded-xl px-4 py-3 flex items-center gap-3"
                    style={{
                      background: "rgba(9,24,16,0.88)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(201,162,39,0.25)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(82,183,136,0.2)" }}
                    >
                      <Shield className="w-4 h-4" style={{ color: "#52b788" }} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">AI Analysis Ready</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Upload your image to begin
                      </p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: "#52b788",
                            animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all hover:scale-110"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontSize: "10px" }}>
          Scroll Down
        </span>
        <ArrowDown
          className="w-4 h-4"
          style={{ animation: "bounce 2s ease-in-out infinite" }}
        />
      </button>
    </section>
  );
}
