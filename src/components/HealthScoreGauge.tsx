import { useEffect, useRef } from 'react';

interface HealthScoreGaugeProps {
  score: number;
  grade: string;
  gradeColor: string;
  category: string;
  size?: number;
  /** Show a small grade-scale legend below the gauge. */
  showLegend?: boolean;
}

/**
 * Recalibrated zones (from VITAL_master_action_items.md):
 * - 0–40 red ("Avoid")
 * - 40–60 amber ("Consider Alternatives" / "Room for Improvement")
 * - 60–80 sage ("Good Choice")
 * - 80–100 deep green ("Excellent")
 *
 * Visual severity matches verbal severity — D is amber, not blood red.
 */
const ZONES = [
  { color: '#b8301f', start: 0.0, end: 0.4 },   // F + bottom of D
  { color: '#e08a4a', start: 0.4, end: 0.6 },   // amber: D / C-
  { color: '#c9a96e', start: 0.6, end: 0.7 },   // C+
  { color: '#6b8f5e', start: 0.7, end: 0.85 },  // B
  { color: '#4a7c59', start: 0.85, end: 1.0 },  // A
];

const LEGEND = [
  { range: '85–100', grade: 'A', label: 'Excellent', color: '#4a7c59' },
  { range: '70–84', grade: 'B', label: 'Good', color: '#6b8f5e' },
  { range: '55–69', grade: 'C', label: 'Moderate', color: '#c9a96e' },
  { range: '40–54', grade: 'D', label: 'Consider Alternatives', color: '#e08a4a' },
  { range: '0–39', grade: 'F', label: 'Avoid', color: '#b8301f' },
];

export default function HealthScoreGauge({
  score,
  grade,
  gradeColor,
  category,
  size = 220,
  showLegend = false,
}: HealthScoreGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) - 20;
    const strokeWidth = 14;

    let currentScore = 0;
    const startTime = performance.now();
    const duration = 1500;

    function drawGauge(animatedScore: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      const startAngle = Math.PI * 0.8;
      const endAngle = Math.PI * 2.2;
      const totalAngle = endAngle - startAngle;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = '#e6e4dc';
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      ZONES.forEach(zone => {
        ctx.beginPath();
        ctx.arc(
          centerX, centerY, radius,
          startAngle + zone.start * totalAngle,
          startAngle + zone.end * totalAngle,
        );
        ctx.strokeStyle = zone.color + '30';
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'butt';
        ctx.stroke();
      });

      const scoreRatio = Math.min(animatedScore / 100, 1);
      const fillEndAngle = startAngle + scoreRatio * totalAngle;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, fillEndAngle);
      ctx.strokeStyle = gradeColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      const tipAngle = fillEndAngle;
      const tipX = centerX + Math.cos(tipAngle) * radius;
      const tipY = centerY + Math.sin(tipAngle) * radius;

      const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 12);
      glow.addColorStop(0, gradeColor + '80');
      glow.addColorStop(1, gradeColor + '00');
      ctx.beginPath();
      ctx.arc(tipX, tipY, 12, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 35, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#e6e4dc';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = gradeColor;
      ctx.font = `bold ${size * 0.18}px "Playfair Display", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(animatedScore)}`, centerX, centerY - 12);

      ctx.fillStyle = '#202a26';
      ctx.font = `bold ${size * 0.12}px "Playfair Display", serif`;
      ctx.fillText(grade, centerX, centerY + 14);
    }

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      currentScore = eased * score;

      drawGauge(currentScore);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [score, grade, gradeColor, size]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} />
      <div className="text-center -mt-4">
        <p className="text-lg font-medium text-deep">{category}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: gradeColor }} />
          <p className="text-caption text-muted-sage">Health Index: {score}/100</p>
        </div>
      </div>

      {showLegend && (
        <div className="mt-6 w-full max-w-xs">
          <p className="text-[10px] uppercase tracking-widest text-deep/40 mb-2 text-center">Grade scale</p>
          <div className="space-y-1">
            {LEGEND.map(item => (
              <div key={item.grade} className="flex items-center gap-3 text-xs">
                <span className="font-bold w-4 text-center" style={{ color: item.color }}>{item.grade}</span>
                <span className="w-16 text-deep/50 tabular-nums">{item.range}</span>
                <span className="text-deep/70">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
