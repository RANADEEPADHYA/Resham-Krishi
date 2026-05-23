import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Target, Users, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      leftRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
    gsap.fromTo(
      rightRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div ref={leftRef} className="flex flex-col gap-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm w-fit"
              style={{
                background: "rgba(45,106,79,0.15)",
                border: "1px solid rgba(45,106,79,0.4)",
                color: "#74c69d",
              }}
            >
              <Leaf className="w-3.5 h-3.5" />
              About ReshamKrishi AI
            </div>
            <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
              Protecting India's{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #c9a227, #f4d03f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Silk Heritage
              </span>{" "}
              with AI
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              India is the world's second-largest silk producer, with over 8.4 lakh families dependent on
              sericulture for their livelihood. Yet disease outbreaks remain the primary cause of yield loss —
              causing billions in economic damage annually.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              ReshamKrishi AI was built in collaboration with the Central Silk Board of India to bring
              cutting-edge AI diagnostics directly to farmers' phones — enabling early detection, faster
              treatment, and better protection of this centuries-old industry.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { icon: <Target className="w-5 h-5" />, title: "Mission", desc: "Zero preventable silk crop loss through AI early detection" },
                { icon: <Users className="w-5 h-5" />, title: "Who We Serve", desc: "Farmers, cooperatives, silk reelers and textile factories" },
                { icon: <Globe className="w-5 h-5" />, title: "Coverage", desc: "8 silk-producing states across India" },
                { icon: <Leaf className="w-5 h-5" />, title: "Impact", desc: "Protecting 8.4 lakh sericulture farming families" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ color: "#c9a227" }}>{item.icon}</div>
                    <p className="text-white text-sm font-medium">{item.title}</p>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="relative">
            <div
              className="absolute -inset-6 rounded-3xl blur-2xl opacity-15"
              style={{ background: "radial-gradient(ellipse, #c9a227, transparent)" }}
            />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(201,162,39,0.2)", height: 200 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1668252826332-07412eb2c64e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrd29ybSUyMG11bGJlcnJ5JTIwbGVhdmVzJTIwc2VyaWN1bHR1cmUlMjBmYXJtfGVufDF8fHx8MTc3ODUxNjE3Mnww&ixlib=rb-4.1.0&q=80&w=400"
                    alt="Silkworm on mulberry"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "linear-gradient(135deg, rgba(201,162,39,0.15), rgba(45,106,79,0.1))",
                    border: "1px solid rgba(201,162,39,0.25)",
                  }}
                >
                  <p className="text-3xl font-bold mb-1" style={{ color: "#c9a227" }}>₹15,000</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Avg. extra income per farmer with early disease detection
                  </p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(45,106,79,0.15)",
                    border: "1px solid rgba(82,183,136,0.25)",
                  }}
                >
                  <p className="text-3xl font-bold mb-1" style={{ color: "#52b788" }}>8.4L+</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Families dependent on sericulture in India
                  </p>
                </div>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(82,183,136,0.2)", height: 200 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1753787345695-6d56177caa4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG11bGJlcnJ5JTIwdHJlZSUyMGxlYXZlcyUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzc4NTE2MTgxfDA&ixlib=rb-4.1.0&q=80&w=400"
                    alt="Mulberry leaves"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
