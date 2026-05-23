import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Cpu, FileText, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: "01",
    icon: <Camera className="w-7 h-7" />,
    title: "Capture or Upload",
    description:
      "Take a clear photo of your silkworm or mulberry leaf with any smartphone or camera, then upload it to ReshamKrishi AI.",
    color: "#c9a227",
    glow: "rgba(201,162,39,0.2)",
  },
  {
    step: "02",
    icon: <Cpu className="w-7 h-7" />,
    title: "AI Processing",
    description:
      "Our deep learning model processes the image, extracts disease signatures, and cross-references a database of 12+ disease patterns.",
    color: "#52b788",
    glow: "rgba(82,183,136,0.2)",
  },
  {
    step: "03",
    icon: <FileText className="w-7 h-7" />,
    title: "Detailed Report",
    description:
      "Receive a full diagnosis — disease name, confidence score, severity level, affected area, and clear treatment recommendations.",
    color: "#74c69d",
    glow: "rgba(116,198,157,0.2)",
  },
  {
    step: "04",
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Take Action",
    description:
      "Follow the AI-guided steps to treat the disease, protect healthy batches, and improve your yield for the season.",
    color: "#e9c46a",
    glow: "rgba(233,196,106,0.2)",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
      }
    );

    const stepEls = stepsRef.current?.querySelectorAll(".step-card");
    if (stepEls) {
      gsap.fromTo(
        stepEls,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: stepsRef.current, start: "top 75%" },
        }
      );
    }
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-24">
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] blur-[150px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #2d6a4f, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4"
            style={{
              background: "rgba(82,183,136,0.12)",
              border: "1px solid rgba(82,183,136,0.3)",
              color: "#74c69d",
            }}
          >
            <Cpu className="w-3.5 h-3.5" />
            Simple 4-Step Process
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            How It Works
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            From field to diagnosis in under a minute — designed to be used without any technical expertise.
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="step-card relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-full w-full h-px z-0"
                  style={{
                    background: `linear-gradient(90deg, ${step.color}50, transparent)`,
                    width: "calc(100% - 3rem)",
                    left: "calc(50% + 2rem)",
                    top: "2.5rem",
                  }}
                />
              )}

              <div
                className="relative rounded-2xl p-6 h-full flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Step number */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: step.glow,
                      border: `1px solid ${step.color}40`,
                      color: step.color,
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-3xl font-bold opacity-30"
                    style={{ color: step.color }}
                  >
                    {step.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {step.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${step.color}60, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
