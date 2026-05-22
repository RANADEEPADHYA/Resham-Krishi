import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Ramesh Gowda",
    role: "Silk Farmer, Karnataka",
    avatar: "https://images.unsplash.com/photo-1707721690746-cdbdabadebc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBmYXJtZXIlMjBmaWVsZCUyMGFncmljdWx0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Nzg1MTYxODF8MA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 5,
    text: "ReshamKrishi AI saved my entire batch last season. I detected Muscardine early and isolated the silkworms before it spread. The recommendations were very clear and practical.",
    saved: "Saved ₹85,000 worth of yield",
  },
  {
    name: "Priya Sharma",
    role: "Quality Manager, Mysore Silk Factory",
    avatar: "https://images.unsplash.com/photo-1753787345695-6d56177caa4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG11bGJlcnJ5JTIwdHJlZSUyMGxlYXZlcyUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzc4NTE2MTgxfDA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 5,
    text: "We use ReshamKrishi AI to screen mulberry leaf quality before procurement from farmers. It has dramatically reduced leaf-borne diseases in our rearing units. Excellent accuracy!",
    saved: "30% reduction in rearing losses",
  },
  {
    name: "Suresh Patel",
    role: "Progressive Farmer, West Bengal",
    avatar: "https://images.unsplash.com/photo-1668252826332-07412eb2c64e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrd29ybSUyMG11bGJlcnJ5JTIwbGVhdmVzJTIwc2VyaWN1bHR1cmUlMjBmYXJtfGVufDF8fHx8MTc3ODUxNjE3Mnww&ixlib=rb-4.1.0&q=80&w=200",
    rating: 5,
    text: "I was skeptical at first but the accuracy is incredible. It identified Leaf Rust on my mulberry before it spread to my healthy trees. The Hindi interface makes it easy to use.",
    saved: "Prevented 60% crop loss",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".testimonial-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: "top 78%" },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24">
      <div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] blur-[140px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #c9a227, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4"
            style={{
              background: "rgba(201,162,39,0.12)",
              border: "1px solid rgba(201,162,39,0.3)",
              color: "#e9c46a",
            }}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Farmer Stories
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            Voices from the Field
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Hear from the farmers and factories who rely on ReshamKrishi AI every day.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 opacity-20" style={{ color: "#c9a227" }} />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" style={{ color: "#c9a227" }} />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                "{t.text}"
              </p>

              {/* Saved badge */}
              <div
                className="text-xs px-3 py-1.5 rounded-full w-fit"
                style={{
                  background: "rgba(82,183,136,0.12)",
                  border: "1px solid rgba(82,183,136,0.25)",
                  color: "#52b788",
                }}
              >
                ✓ {t.saved}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
