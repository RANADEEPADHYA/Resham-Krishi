import { useRef } from "react";
import { MotionBackground } from "./components/MotionBackground";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { DetectionSection } from "./components/DetectionSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { StatsSection } from "./components/StatsSection";
import { DiseaseLibrarySection } from "./components/DiseaseLibrarySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";

export default function App() {
  const detectRef = useRef<HTMLDivElement>(null);

  const scrollToDetect = () => {
    const el = document.querySelector("#detect");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {/* Animated motion background */}
      <MotionBackground />

      {/* Content layer */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection onDetectClick={scrollToDetect} />
        <DetectionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <DiseaseLibrarySection />
        <TestimonialsSection />
        <AboutSection />
        <Footer />
      </div>

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #0a1f14;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(201, 162, 39, 0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 162, 39, 0.5);
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @media print {
          canvas { display: none; }
          .fixed { position: static !important; }
        }
      `}</style>
    </div>
  );
}
