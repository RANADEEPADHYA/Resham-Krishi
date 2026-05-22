import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageWithFallback } from "./figma/ImageWithFallback";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 98.4, suffix: "%", label: "Detection Accuracy", desc: "Validated in field trials" },
  { value: 12, suffix: "+", label: "Disease Types", desc: "Silkworm & mulberry" },
  { value: 5000, suffix: "+", label: "Farmers Served", desc: "Across 8 states" },
  { value: 3, suffix: "s", label: "Analysis Time", desc: "Average response time" },
  { value: 50000, suffix: "+", label: "Images Trained", desc: "Annotated disease dataset" },
  { value: 92, suffix: "%", label: "Yield Saved", desc: "When used early" },
];

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCard({ stat, started }: { stat: (typeof stats)[0]; started: boolean }) {
  const count = useCountUp(stat.value, 1800, started);
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        className="text-4xl font-bold mb-1"
        style={{
          background: "linear-gradient(135deg, #c9a227, #f4d03f)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count.toLocaleString()}{stat.suffix}
      </span>
      <p className="text-white font-medium text-sm mb-1">{stat.label}</p>
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.desc}</p>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => setStarted(true),
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(201,162,39,0.2)",
          }}
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1617055407029-6a59e5582087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwZmFicmljJTIwdGV4dHVyZSUyMGdvbGRlbiUyMHNoaW1tZXJ8ZW58MXx8fHwxNzc4NTE2MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Silk texture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 p-10 lg:p-16">
            <div className="text-center mb-12">
              <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
                Trusted by the Sericulture Community
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)" }}>
                Real impact measured across India's silk farming regions
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} started={started} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
