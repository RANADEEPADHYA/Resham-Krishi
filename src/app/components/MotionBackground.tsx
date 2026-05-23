import { useEffect, useRef } from "react";

export function MotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let silkThreads: SilkThread[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        const w = canvas?.width || window.innerWidth;
        const h = canvas?.height || window.innerHeight;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        const colors = ["#c9a227", "#2d6a4f", "#74c69d", "#e9c46a", "#52b788"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        const w = canvas?.width || window.innerWidth;
        const h = canvas?.height || window.innerHeight;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > w) this.speedX *= -1;
        if (this.y < 0 || this.y > h) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class SilkThread {
      points: { x: number; y: number }[];
      speed: number;
      opacity: number;
      color: string;
      width: number;
      offset: number;
      amplitude: number;
      frequency: number;

      constructor() {
        const w = canvas?.width || window.innerWidth;
        const h = canvas?.height || window.innerHeight;
        this.points = [];
        this.speed = Math.random() * 0.003 + 0.001;
        this.opacity = Math.random() * 0.12 + 0.03;
        this.color = Math.random() > 0.5 ? "#c9a227" : "#52b788";
        this.width = Math.random() * 1.5 + 0.5;
        this.offset = Math.random() * Math.PI * 2;
        this.amplitude = Math.random() * 80 + 40;
        this.frequency = Math.random() * 0.005 + 0.002;
        const startY = Math.random() * h;
        for (let i = 0; i <= 20; i++) {
          this.points.push({
            x: (w / 20) * i,
            y: startY + Math.sin(i * 0.5 + this.offset) * this.amplitude,
          });
        }
      }

      update(time: number) {
        const w = canvas?.width || window.innerWidth;
        this.points.forEach((p, i) => {
          p.y = p.y + Math.sin(time * this.speed + i * this.frequency * w) * 0.3;
        });
      }

      draw() {
        if (!ctx || this.points.length < 2) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length - 1; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2;
          const yc = (this.points[i].y + this.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    resize();
    window.addEventListener("resize", resize);

    // Init particles
    for (let i = 0; i < 80; i++) particles.push(new Particle());
    for (let i = 0; i < 12; i++) silkThreads.push(new SilkThread());

    let time = 0;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient bg
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#0a1f14");
      grad.addColorStop(0.5, "#0f2a1a");
      grad.addColorStop(1, "#091810");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw silk threads
      silkThreads.forEach((t) => {
        t.update(time);
        t.draw();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.save();
            ctx.globalAlpha = ((120 - dist) / 120) * 0.06;
            ctx.strokeStyle = "#c9a227";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      time++;
      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
