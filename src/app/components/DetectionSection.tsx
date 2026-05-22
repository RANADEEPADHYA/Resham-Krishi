import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Upload, Microscope, AlertTriangle, CheckCircle, XCircle,
  ChevronRight, RefreshCw, Leaf, Bug, Thermometer, Droplets,
  Info, FlaskConical, ShieldAlert, Sprout, AlertCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Stage = "leaf" | "silkworm";
type Condition = "healthy" | "diseased";
type Severity = "mild" | "moderate" | "severe";
type Urgency = "routine" | "low" | "moderate" | "immediate" | "critical";

interface TreatmentInfo {
  curable: boolean;
  urgency: Urgency;
  chemical_treatment: string[];
  biological_treatment: string[];
  cultural_practices: string[];
  prevention: string[];
  feeding_safe: boolean | null;
  isolation_required: boolean;
}

interface AnalysisResult {
  stage: Stage;
  condition: Condition;
  disease?: string | null;
  pathogen?: string | null;
  confidence: number;
  severity?: Severity | null;
  details: string;
  symptoms?: string[];
  affected_area?: number | null;
  treatment?: TreatmentInfo;
  demo_mode?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallback mock data (used when backend is unreachable)
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_LEAF: AnalysisResult[] = [
  {
    stage: "leaf", condition: "diseased", disease: "Leaf Rust",
    pathogen: "Cerotelium fici",
    confidence: 92.8, severity: "mild", affected_area: 22,
    details: "Leaf Rust detected. Orange-yellow urediniospore pustules present on the underside of leaves. Reduces photosynthesis and leaf quality. Infected leaves are unsafe for silkworm feeding.",
    symptoms: ["Orange-yellow rust pustules on underside", "Premature yellowing and leaf drop", "Circular lesions 0.5–2 mm diameter"],
    treatment: {
      curable: true, urgency: "moderate", feeding_safe: false, isolation_required: false,
      chemical_treatment: ["Dithane M-45 (Mancozeb 75 WP) @ 0.2% — spray at 10-day intervals", "Copper Oxychloride 50 WP @ 0.3% — protective spray before monsoon"],
      biological_treatment: ["Trichoderma viride @ 5 g/L — soil + foliar", "Neem oil @ 2–3 mL/L — inhibits spore germination"],
      cultural_practices: ["Remove and burn heavily infected leaves immediately", "Switch to drip or furrow irrigation"],
      prevention: ["Plant rust-resistant varieties (V1, S-36, MR2)", "Apply preventive fungicide before monsoon onset"],
    }, demo_mode: true,
  },
  {
    stage: "leaf", condition: "healthy", confidence: 96.5,
    details: "Healthy mulberry leaf detected. Rich green coloration, proper texture, and no visible signs of disease or nutrient deficiency. Fully suitable for silkworm feeding.",
    symptoms: [],
    treatment: {
      curable: true, urgency: "routine", feeding_safe: true, isolation_required: false,
      chemical_treatment: [], biological_treatment: [],
      cultural_practices: ["Harvest at optimal maturity (40–45 days)", "Maintain regular irrigation schedule"],
      prevention: ["Weekly field scouting every 7–10 days", "Maintain proper canopy management"],
    }, demo_mode: true,
  },
  {
    stage: "leaf", condition: "diseased", disease: "Powdery Mildew",
    pathogen: "Phyllactinia corylea",
    confidence: 88.4, severity: "moderate", affected_area: 45,
    details: "Powdery Mildew detected. White powdery fungal mycelium colonises the leaf surface, disrupting photosynthesis. Infected leaves cause severe digestive disorders in silkworms and must not be fed.",
    symptoms: ["White to grey powdery coating on leaf surface", "Leaf curling and distortion", "Stunted shoot growth"],
    treatment: {
      curable: true, urgency: "moderate", feeding_safe: false, isolation_required: false,
      chemical_treatment: ["Wettable Sulphur 80 WP @ 0.2%", "Triadimefon 25 WP @ 0.05%"],
      biological_treatment: ["Potassium bicarbonate @ 0.5%", "Bacillus subtilis @ 1×10⁸ CFU/mL"],
      cultural_practices: ["Prune and burn infected shoots", "Increase inter-plant spacing"],
      prevention: ["Plant resistant varieties (S-1635)", "NEVER feed infected leaves to silkworms"],
    }, demo_mode: true,
  },
];

const MOCK_SILKWORM: AnalysisResult[] = [
  {
    stage: "silkworm", condition: "diseased", disease: "Muscardine",
    pathogen: "Beauveria bassiana",
    confidence: 94.7, severity: "moderate", affected_area: 38,
    details: "White Muscardine disease detected. The silkworm shows characteristic white powdery mycelial coating caused by Beauveria bassiana. Highly contagious — immediate isolation is critical.",
    symptoms: ["White chalky-powdery body coating", "Rigid mummified body post-death", "Reduced movement and appetite"],
    treatment: {
      curable: true, urgency: "immediate", feeding_safe: null, isolation_required: true,
      chemical_treatment: ["2% Formalin — spray all rearing trays and surfaces", "Lime powder — dust tray floor to absorb moisture"],
      biological_treatment: ["Ensure vigorous ventilation — Muscardine cannot spread in dry rooms"],
      cultural_practices: ["IMMEDIATELY isolate infected silkworms", "Incinerate all dead silkworms — never compost"],
      prevention: ["2% formalin + 2% bleach disinfection 5 days before new batch", "Maintain humidity below 75%"],
    }, demo_mode: true,
  },
  {
    stage: "silkworm", condition: "healthy", confidence: 97.2,
    details: "Excellent silkworm health. Normal coloration, active crawling, and vigorous feeding behaviour. No signs of disease. Continue standard rearing practices.",
    symptoms: [],
    treatment: {
      curable: true, urgency: "routine", feeding_safe: null, isolation_required: false,
      chemical_treatment: [], biological_treatment: [],
      cultural_practices: ["Maintain temperature 24–28 °C and humidity 70–85%", "Provide fresh mulberry leaves 3–4 times daily"],
      prevention: ["Disinfect rearing room before each batch", "Use certified disease-free eggs"],
    }, demo_mode: true,
  },
  {
    stage: "silkworm", condition: "diseased", disease: "Grasserie",
    pathogen: "Bombyx mori Nuclear Polyhedrosis Virus (BmNPV)",
    confidence: 91.3, severity: "severe", affected_area: 70,
    details: "Grasserie (Nuclear Polyhedrosis) detected. BmNPV virus infects silk glands and fat body. Infected larvae appear bloated and shiny. There is NO cure — entire batch must be destroyed.",
    symptoms: ["Shiny, translucent glazed body surface", "Swollen bloated body", "Sluggish movement, hangs limply"],
    treatment: {
      curable: false, urgency: "immediate", feeding_safe: null, isolation_required: true,
      chemical_treatment: ["0.5% Bleaching powder — immediately disinfect all surfaces", "UV light (254 nm) — inactivates BmNPV on equipment"],
      biological_treatment: ["No cure exists — focus on biosecurity and containment"],
      cultural_practices: ["IMMEDIATELY incinerate ALL larvae from infected tray", "Disinfect trays with 0.5% bleach then 2% formalin (30 min each)"],
      prevention: ["Source eggs exclusively from government-certified grainage", "Complete room disinfection between every batch"],
    }, demo_mode: true,
  },
];

function getRandomFallback(stage: Stage): AnalysisResult {
  const pool = stage === "leaf" ? MOCK_LEAF : MOCK_SILKWORM;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ConditionBadge({ condition }: { condition: Condition }) {
  const map = {
    healthy:  { bg: "rgba(82,183,136,0.15)", text: "#52b788", icon: <CheckCircle className="w-4 h-4" /> },
    diseased: { bg: "rgba(220,53,69,0.15)",  text: "#ff6b6b", icon: <XCircle className="w-4 h-4" /> },
  };
  const cfg = map[condition] ?? map.healthy;
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
      style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.text}40` }}>
      {cfg.icon}
      {condition.charAt(0).toUpperCase() + condition.slice(1)}
    </span>
  );
}

function SeverityBar({ severity }: { severity?: Severity | null }) {
  if (!severity) return null;
  const map = {
    mild:     { width: "33%", color: "#ffc107" },
    moderate: { width: "66%", color: "#fd7e14" },
    severe:   { width: "100%", color: "#dc3545" },
  };
  const cfg = map[severity];
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", width: 60 }}>Severity</span>
      <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div className="h-2 rounded-full transition-all duration-1000" style={{ width: cfg.width, background: cfg.color }} />
      </div>
      <span className="text-xs capitalize" style={{ color: cfg.color, width: 60 }}>{severity}</span>
    </div>
  );
}

function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const map: Record<Urgency, { color: string; label: string; bg: string }> = {
    critical:  { color: "#dc3545", bg: "rgba(220,53,69,0.2)",  label: "🚨 CRITICAL — Report to Authorities" },
    immediate: { color: "#ff6b35", bg: "rgba(255,107,53,0.2)", label: "⚠️ IMMEDIATE ACTION REQUIRED" },
    moderate:  { color: "#ffc107", bg: "rgba(255,193,7,0.2)",  label: "⚡ MODERATE — Act Within 24–48 Hours" },
    low:       { color: "#74c69d", bg: "rgba(116,198,157,0.2)",label: "📋 LOW PRIORITY — Routine Management" },
    routine:   { color: "#52b788", bg: "rgba(82,183,136,0.2)", label: "✅ ROUTINE — Standard Care" },
  };
  const cfg = map[urgency] ?? map.routine;
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: cfg.bg, border: `1px solid ${cfg.color}40` }}>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      <span className="text-sm font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
    </div>
  );
}

function TreatmentReport({ result }: { result: AnalysisResult }) {
  const [activeTab, setActiveTab] = useState<"chemical" | "biological" | "cultural" | "prevention">("chemical");
  const t = result.treatment;
  if (!t || result.condition === "healthy") return null;

  const tabs = [
    { id: "chemical" as const,   icon: <FlaskConical className="w-3.5 h-3.5" />,  label: "Chemical",   count: t.chemical_treatment.length },
    { id: "biological" as const, icon: <Leaf className="w-3.5 h-3.5" />,          label: "Biological", count: t.biological_treatment.length },
    { id: "cultural" as const,   icon: <Sprout className="w-3.5 h-3.5" />,        label: "Cultural",   count: t.cultural_practices.length },
    { id: "prevention" as const, icon: <ShieldAlert className="w-3.5 h-3.5" />,   label: "Prevention", count: t.prevention.length },
  ];

  const activeItems = {
    chemical:   t.chemical_treatment,
    biological: t.biological_treatment,
    cultural:   t.cultural_practices,
    prevention: t.prevention,
  }[activeTab];

  const headerColor = t.curable ? "rgba(82,183,136,0.08)" : "rgba(220,53,69,0.08)";
  const borderColor = t.curable ? "rgba(82,183,136,0.3)"  : "rgba(220,53,69,0.3)";

  return (
    <div className="mt-8 rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${borderColor}` }}>

      {/* Header */}
      <div className="px-6 py-5" style={{ background: headerColor, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              <FlaskConical className="w-5 h-5" style={{ color: t.curable ? "#52b788" : "#ff6b6b" }} />
              Treatment Protocol
            </h3>
            {result.disease && (
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                {result.disease}
                {result.pathogen && <span style={{ color: "rgba(255,255,255,0.3)" }}> — {result.pathogen}</span>}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Curability */}
            <span className="px-3 py-1.5 rounded-full text-sm font-bold"
              style={{
                background: t.curable ? "rgba(82,183,136,0.2)" : "rgba(220,53,69,0.2)",
                color: t.curable ? "#52b788" : "#ff6b6b",
                border: `1px solid ${t.curable ? "rgba(82,183,136,0.4)" : "rgba(220,53,69,0.4)"}`,
              }}>
              {t.curable ? "✓ CURABLE" : "✗ NO CURE"}
            </span>

            {/* Feeding safety (leaf only) */}
            {result.stage === "leaf" && t.feeding_safe !== null && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: t.feeding_safe ? "rgba(82,183,136,0.15)" : "rgba(220,53,69,0.15)",
                  color: t.feeding_safe ? "#74c69d" : "#ff6b6b",
                  border: `1px solid ${t.feeding_safe ? "rgba(82,183,136,0.3)" : "rgba(220,53,69,0.3)"}`,
                }}>
                {t.feeding_safe ? "🍃 Safe to Feed" : "⚠ Unsafe to Feed"}
              </span>
            )}

            {/* Isolation badge (silkworm) */}
            {result.stage === "silkworm" && t.isolation_required && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(220,53,69,0.15)", color: "#ff6b6b", border: "1px solid rgba(220,53,69,0.3)" }}>
                ⚠ Isolate Immediately
              </span>
            )}
          </div>
        </div>

        <UrgencyBadge urgency={t.urgency} />
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all duration-200"
            style={{
              color: activeTab === tab.id ? "#74c69d" : "rgba(255,255,255,0.4)",
              background: activeTab === tab.id ? "rgba(116,198,157,0.08)" : "transparent",
              borderBottom: activeTab === tab.id ? "2px solid #74c69d" : "2px solid transparent",
            }}>
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeItems.length === 0 ? (
          <p className="text-sm text-center py-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            No specific {activeTab} interventions required.
          </p>
        ) : (
          <ol className="space-y-3">
            {activeItems.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                  style={{ background: "rgba(116,198,157,0.15)", color: "#74c69d", border: "1px solid rgba(116,198,157,0.3)" }}>
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function DetectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const uploadRef  = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeStage, setActiveStage] = useState<Stage>("leaf");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver]         = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing]       = useState(false);
  const [result, setResult]             = useState<AnalysisResult | null>(null);
  const [progress, setProgress]         = useState(0);
  const [analyzeStep, setAnalyzeStep]   = useState("");
  const [demoMode, setDemoMode]         = useState(false);
  const [apiError, setApiError]         = useState<string | null>(null);

  // GSAP entrance animation
  useEffect(() => {
    gsap.fromTo(uploadRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, []);

  // GSAP result animation
  useEffect(() => {
    if (result && resultsRef.current) {
      gsap.fromTo(resultsRef.current,
        { y: 50, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(".confidence-bar-fill",
        { width: "0%" },
        { width: `${result.confidence}%`, duration: 1.4, ease: "power2.out", delay: 0.4 }
      );
    }
  }, [result]);

  const processFile = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setApiError(null);
    setDemoMode(false);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) processFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const switchStage = (stage: Stage) => {
    setActiveStage(stage);
    reset();
  };

  const analyzeImage = async () => {
    if (!imagePreview || !selectedFile) return;
    setAnalyzing(true);
    setProgress(0);
    setResult(null);
    setApiError(null);

    const steps = [
      "Preprocessing image...",
      "Extracting EfficientNet-B0 features...",
      "Extracting ResNet-50 features...",
      "Fusing feature representations...",
      "Running classification head...",
      "Generating diagnosis report...",
    ];

    // Fire API call immediately (parallel with progress bar)
    const formData = new FormData();
    formData.append("file", selectedFile);
    const endpoint = activeStage === "leaf"
      ? "/api/predict/leaf"
      : "/api/predict/silkworm";

    const apiPromise = fetch(endpoint, {
      method: "POST",
      body: formData,
    }).catch(() => null);

    // Progress animation
    for (let i = 0; i < steps.length; i++) {
      setAnalyzeStep(steps[i]);
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 250));
      setProgress(((i + 1) / steps.length) * 100);
    }
    await new Promise((r) => setTimeout(r, 200));

    // Collect API result
    try {
      const response = await apiPromise;
      if (response && response.ok) {
        const data: AnalysisResult = await response.json();
        setResult(data);
        setDemoMode(data.demo_mode ?? false);
      } else {
        throw new Error("API error");
      }
    } catch {
      const fallback = getRandomFallback(activeStage);
      setResult(fallback);
      setDemoMode(true);
      setApiError(
        "Backend server is not running. Showing demo results. " +
        "Double-click backend/start.bat to launch the AI model server."
      );
    }

    setAnalyzing(false);
  };

  const reset = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setResult(null);
    setProgress(0);
    setAnalyzeStep("");
    setDemoMode(false);
    setApiError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const stageLabel = activeStage === "leaf" ? "Mulberry Leaf" : "Silkworm";

  return (
    <section id="detect" ref={sectionRef} className="relative py-24">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #2d6a4f, transparent)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ─────────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4"
            style={{ background: "rgba(45,106,79,0.15)", border: "1px solid rgba(45,106,79,0.4)", color: "#74c69d" }}>
            <Microscope className="w-3.5 h-3.5" />
            Two-Stage AI Disease Detection Engine
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            Upload &amp; Detect Instantly
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Stage 1 analyses <strong style={{ color: "#74c69d" }}>Mulberry Leaf</strong> diseases.
            Stage 2 detects <strong style={{ color: "#c9a227" }}>Silkworm</strong> diseases.
            A full treatment report is generated for any detected disease.
          </p>
        </div>

        {/* ── Stage tabs ──────────────────────────────────────────────── */}
        <div className="flex gap-3 justify-center mb-10">
          {([
            { id: "leaf"     as Stage, icon: <Leaf className="w-4 h-4" />,  label: "Stage 1 — Mulberry Leaf",  accent: "#74c69d" },
            { id: "silkworm" as Stage, icon: <Bug  className="w-4 h-4" />,  label: "Stage 2 — Silkworm",       accent: "#c9a227" },
          ] as const).map((tab) => (
            <button key={tab.id} onClick={() => switchStage(tab.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: activeStage === tab.id
                  ? `rgba(${tab.id === "leaf" ? "82,183,136" : "201,162,39"},0.15)`
                  : "rgba(255,255,255,0.04)",
                border: activeStage === tab.id
                  ? `1px solid ${tab.accent}60`
                  : "1px solid rgba(255,255,255,0.08)",
                color: activeStage === tab.id ? tab.accent : "rgba(255,255,255,0.5)",
                boxShadow: activeStage === tab.id ? `0 0 20px ${tab.accent}20` : "none",
              }}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── API error / demo banner ─────────────────────────────────── */}
        {apiError && (
          <div className="mb-6 flex items-start gap-3 px-5 py-4 rounded-xl"
            style={{ background: "rgba(255,193,7,0.08)", border: "1px solid rgba(255,193,7,0.25)" }}>
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#ffc107" }} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{apiError}</p>
          </div>
        )}

        {demoMode && !apiError && result && (
          <div className="mb-6 flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.2)" }}>
            <Info className="w-3.5 h-3.5 shrink-0" style={{ color: "#c9a227" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              Demo mode — results are illustrative. Start the backend server with real model weights for live predictions.
            </span>
          </div>
        )}

        {/* ── Two-column grid ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Upload Panel */}
          <div ref={uploadRef}>
            <div className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
              <div className="p-6">
                <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" style={{ color: "#c9a227" }} />
                  Upload {stageLabel} Image
                </h3>

                {/* Drop zone */}
                <div className="relative rounded-xl cursor-pointer transition-all duration-300"
                  style={{
                    border: `2px dashed ${dragOver ? "#c9a227" : imagePreview ? "rgba(82,183,136,0.5)" : "rgba(255,255,255,0.15)"}`,
                    background: dragOver ? "rgba(201,162,39,0.05)" : imagePreview ? "rgba(82,183,136,0.04)" : "rgba(255,255,255,0.02)",
                    minHeight: 220,
                  }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => !imagePreview && fileInputRef.current?.click()}>
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Uploaded" className="w-full rounded-xl object-cover" style={{ maxHeight: 280 }} />
                      <button onClick={(e) => { e.stopPropagation(); reset(); }}
                        className="absolute top-3 right-3 p-1.5 rounded-lg transition-all hover:scale-110"
                        style={{ background: "rgba(9,24,16,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}>
                        <RefreshCw className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: "rgba(45,106,79,0.2)", border: "1px solid rgba(45,106,79,0.3)" }}>
                        {activeStage === "leaf"
                          ? <Leaf className="w-7 h-7" style={{ color: "#74c69d" }} />
                          : <Bug  className="w-7 h-7" style={{ color: "#c9a227" }} />}
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium mb-1">Drop {stageLabel} image here</p>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>or click to browse files</p>
                        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                          Supports: JPG, PNG, WEBP (max 10 MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

                {/* Analyse button */}
                <button onClick={analyzeImage} disabled={!imagePreview || analyzing}
                  className="w-full mt-5 py-3.5 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: imagePreview && !analyzing
                      ? "linear-gradient(135deg, #2d6a4f, #1a5c3a)"
                      : "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(201,162,39,0.3)",
                    boxShadow: imagePreview && !analyzing ? "0 0 20px rgba(45,106,79,0.3)" : "none",
                  }}>
                  {analyzing ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="#c9a227" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Analysing {stageLabel}...
                    </>
                  ) : (
                    <>
                      <Microscope className="w-4 h-4" style={{ color: "#c9a227" }} />
                      Run Stage {activeStage === "leaf" ? "1" : "2"} Analysis
                    </>
                  )}
                </button>

                {/* Progress */}
                {analyzing && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span>{analyzeStep}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, background: "linear-gradient(90deg, #2d6a4f, #c9a227)" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-4 rounded-xl p-4 flex gap-3"
              style={{ background: "rgba(201,162,39,0.07)", border: "1px solid rgba(201,162,39,0.2)" }}>
              <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#c9a227" }} />
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "#c9a227" }}>Tips for better results</p>
                <ul className="text-xs space-y-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {activeStage === "leaf" ? (
                    <>
                      <li>• Photograph both sides of the leaf in natural light</li>
                      <li>• Capture the entire leaf to include all lesion patterns</li>
                      <li>• Avoid blurry or heavily filtered photos</li>
                    </>
                  ) : (
                    <>
                      <li>• Place silkworm on a clean, light-coloured surface</li>
                      <li>• Capture entire larva body clearly in focus</li>
                      <li>• Use natural light — avoid harsh flash</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div ref={resultsRef}>
            {!result && !analyzing ? (
              <div className="rounded-2xl flex flex-col items-center justify-center py-20 gap-5"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", minHeight: 420 }}>
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
                  style={{ background: "rgba(45,106,79,0.12)", border: "1px solid rgba(45,106,79,0.2)" }}>
                  <Microscope className="w-9 h-9" style={{ color: "rgba(82,183,136,0.5)" }} />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium mb-2">Awaiting Analysis</p>
                  <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Upload a {stageLabel.toLowerCase()} image and click "Run Stage {activeStage === "leaf" ? "1" : "2"} Analysis".
                  </p>
                </div>
              </div>
            ) : result ? (
              <div className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${result.condition === "healthy" ? "rgba(82,183,136,0.3)" : "rgba(255,107,107,0.3)"}`,
                }}>
                {/* Result header */}
                <div className="px-6 py-4 flex items-center justify-between"
                  style={{
                    background: result.condition === "healthy" ? "rgba(82,183,136,0.08)" : "rgba(255,107,107,0.08)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(45,106,79,0.2)" }}>
                      {result.stage === "leaf"
                        ? <Leaf className="w-4 h-4" style={{ color: "#74c69d" }} />
                        : <Bug  className="w-4 h-4" style={{ color: "#c9a227" }} />}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Stage {result.stage === "leaf" ? "1" : "2"} — {result.stage === "leaf" ? "Mulberry Leaf" : "Silkworm"} Analysis
                      </p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>AI Detection Complete</p>
                    </div>
                  </div>
                  <ConditionBadge condition={result.condition} />
                </div>

                <div className="p-6 space-y-5">
                  {/* Disease name */}
                  {result.disease && (
                    <div>
                      <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Detected Disease</p>
                      <p className="text-white font-semibold">{result.disease}</p>
                      {result.pathogen && (
                        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                          Pathogen: <em>{result.pathogen}</em>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Confidence */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>AI Confidence Score</span>
                      <span style={{ color: "#c9a227" }} className="font-semibold">{result.confidence}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="confidence-bar-fill h-full rounded-full"
                        style={{
                          width: "0%",
                          background: result.confidence > 90
                            ? "linear-gradient(90deg, #2d6a4f, #52b788)"
                            : "linear-gradient(90deg, #c9a227, #f4d03f)",
                        }} />
                    </div>
                  </div>

                  {/* Severity */}
                  {result.severity && <SeverityBar severity={result.severity} />}

                  {/* Affected area */}
                  {result.affected_area != null && result.affected_area > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", width: 60 }}>Affected</span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                          <div className="h-2 rounded-full"
                            style={{ width: `${result.affected_area}%`, background: result.affected_area > 50 ? "#dc3545" : "#fd7e14" }} />
                        </div>
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", width: 60 }}>
                          {result.affected_area}% area
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-xs mb-2 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <Info className="w-3 h-3 inline mr-1" />Diagnosis Summary
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{result.details}</p>
                  </div>

                  {/* Symptoms */}
                  {result.symptoms && result.symptoms.length > 0 && (
                    <div>
                      <p className="text-xs mb-2 font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                        <Thermometer className="w-3 h-3 inline mr-1" />Observed Symptoms
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.symptoms.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full text-xs"
                            style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", color: "#ff9999" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Healthy quick-tips */}
                  {result.condition === "healthy" && result.treatment?.cultural_practices.length > 0 && (
                    <div>
                      <p className="text-xs mb-3 font-medium flex items-center gap-1.5" style={{ color: "#74c69d" }}>
                        <Droplets className="w-3.5 h-3.5" />Recommended Practices
                      </p>
                      <ul className="space-y-2">
                        {result.treatment.cultural_practices.map((rec, i) => (
                          <li key={i} className="flex gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#74c69d" }} />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2">
                    <button onClick={reset}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:scale-[1.02]"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                      <RefreshCw className="w-3.5 h-3.5 inline mr-2" />New Scan
                    </button>
                    <button onClick={() => window.print()}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:scale-[1.02]"
                      style={{ background: "linear-gradient(135deg, #2d6a4f, #1b4332)", border: "1px solid rgba(201,162,39,0.3)" }}>
                      Export Report
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* ── Treatment Report (full-width below grid) ────────────────── */}
        {result && result.condition === "diseased" && result.treatment && (
          <TreatmentReport result={result} />
        )}
      </div>
    </section>
  );
}
