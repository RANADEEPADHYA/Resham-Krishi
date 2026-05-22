import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bug, Leaf, AlertTriangle, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const diseases = [
  {
    name: "White Muscardine",
    type: "silkworm",
    pathogen: "Beauveria bassiana",
    severity: "moderate",
    symptoms: "White mycelial growth on body",
    color: "#e9c46a",
    bg: "rgba(233,196,106,0.1)",
  },
  {
    name: "Green Muscardine",
    type: "silkworm",
    pathogen: "Nomuraea rileyi",
    severity: "moderate",
    symptoms: "Green powdery coating",
    color: "#74c69d",
    bg: "rgba(116,198,157,0.1)",
  },
  {
    name: "Viral Flacherie",
    type: "silkworm",
    pathogen: "NPV / CPV",
    severity: "severe",
    symptoms: "Soft body, dark coloration",
    color: "#ff6b6b",
    bg: "rgba(255,107,107,0.1)",
  },
  {
    name: "Pebrine",
    type: "silkworm",
    pathogen: "Nosema bombycis",
    severity: "severe",
    symptoms: "Pepper spots on body",
    color: "#ff6b6b",
    bg: "rgba(255,107,107,0.1)",
  },
  {
    name: "Grasserie",
    type: "silkworm",
    pathogen: "Baculovirus",
    severity: "moderate",
    symptoms: "Swollen, shiny body",
    color: "#fd7e14",
    bg: "rgba(253,126,20,0.1)",
  },
  {
    name: "Leaf Rust",
    type: "mulberry",
    pathogen: "Cerotelium fici",
    severity: "mild",
    symptoms: "Orange-yellow rust pustules",
    color: "#ffc107",
    bg: "rgba(255,193,7,0.1)",
  },
  {
    name: "Powdery Mildew",
    type: "mulberry",
    pathogen: "Phyllactinia corylea",
    severity: "moderate",
    symptoms: "White powdery coating",
    color: "#e9c46a",
    bg: "rgba(233,196,106,0.1)",
  },
  {
    name: "Bacterial Blight",
    type: "mulberry",
    pathogen: "Pseudomonas mori",
    severity: "moderate",
    symptoms: "Water-soaked lesions",
    color: "#fd7e14",
    bg: "rgba(253,126,20,0.1)",
  },
  {
    name: "Leaf Spot",
    type: "mulberry",
    pathogen: "Cercospora moricola",
    severity: "mild",
    symptoms: "Brown circular spots",
    color: "#ffc107",
    bg: "rgba(255,193,7,0.1)",
  },
];

export function DiseaseLibrarySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "silkworm" | "mulberry">("all");

  useEffect(() => {
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

  const filtered = filter === "all" ? diseases : diseases.filter((d) => d.type === filter);

  const severityColor = (s: string) => {
    if (s === "mild") return "#52b788";
    if (s === "moderate") return "#ffc107";
    return "#ff6b6b";
  };

  return (
    <section ref={sectionRef} className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4"
            style={{
              background: "rgba(45,106,79,0.15)",
              border: "1px solid rgba(45,106,79,0.4)",
              color: "#74c69d",
            }}
          >
            <Leaf className="w-3.5 h-3.5" />
            Disease Knowledge Base
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            Disease Reference Library
          </h2>
          <p className="max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Browse our comprehensive database of silkworm and mulberry diseases for identification and management.
          </p>

          {/* Filter tabs */}
          <div className="flex justify-center gap-2">
            {[
              { key: "all", label: "All Diseases" },
              { key: "silkworm", label: "Silkworm", icon: <Bug className="w-3.5 h-3.5" /> },
              { key: "mulberry", label: "Mulberry", icon: <Leaf className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as typeof filter)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm transition-all duration-300"
                style={{
                  background: filter === tab.key ? "rgba(45,106,79,0.3)" : "rgba(255,255,255,0.05)",
                  border: filter === tab.key ? "1px solid rgba(82,183,136,0.4)" : "1px solid rgba(255,255,255,0.1)",
                  color: filter === tab.key ? "#74c69d" : "rgba(255,255,255,0.6)",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((disease, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: disease.bg,
                border: `1px solid ${disease.color}25`,
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${disease.color}20`, color: disease.color }}
                  >
                    {disease.type === "silkworm" ? <Bug className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${disease.color}15`,
                      color: disease.color,
                      border: `1px solid ${disease.color}30`,
                    }}
                  >
                    {disease.type}
                  </span>
                </div>
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${severityColor(disease.severity)}15`,
                    color: severityColor(disease.severity),
                    border: `1px solid ${severityColor(disease.severity)}30`,
                  }}
                >
                  <AlertTriangle className="w-3 h-3" />
                  {disease.severity}
                </span>
              </div>
              <h3 className="text-white font-semibold mb-1">{disease.name}</h3>
              <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span className="italic">{disease.pathogen}</span>
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" style={{ color: "#74c69d" }} />
                {disease.symptoms}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
