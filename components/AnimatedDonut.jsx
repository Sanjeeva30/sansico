"use client";
import { useEffect, useRef, useState } from "react";

const SIZE = 220;
const STROKE = 50;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
const DRAW_MS = 850;       // how long each segment takes to draw in
const STAGGER_MS = 320;    // delay step between segments starting

export default function AnimatedDonut({ segments, value, label, valueStyle, labelStyle }) {
  const wrapRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [floating, setFloating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setReducedMotion(true); setEntered(true); setFloating(true); return; }

    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          const totalMs = (segments.length - 1) * STAGGER_MS + DRAW_MS + 250;
          const t = setTimeout(() => setFloating(true), totalMs);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [segments.length]);

  let cum = 0;
  const arcs = segments.map((s, i) => {
    const cumBefore = cum;
    cum += s.percentage;
    const arcLen = (s.percentage / 100) * C;
    return { ...s, i, arcLen, dashoffset: -((cumBefore / 100) * C) };
  });

  return (
    <div ref={wrapRef} className={floating ? "donut-float" : ""}
      style={{ position: "relative", width: "100%", aspectRatio: "1/1", maxWidth: 360, margin: "0 auto" }}
      role="img" aria-label={`${value} — ${label}`}>

      <svg width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ transform: "rotate(-90deg)", display: "block" }}>
        {/* faint full-circle track underneath, for visual completeness before segments draw */}
        <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke="var(--hair,#E5DFD8)" strokeWidth={STROKE} opacity={0.4} />
        {arcs.map((a) => (
          <circle key={a.i} cx={SIZE/2} cy={SIZE/2} r={R} fill="none"
            stroke={a.color} strokeWidth={STROKE} strokeLinecap="butt"
            strokeDasharray={entered || reducedMotion ? `${a.arcLen} ${C - a.arcLen}` : `0 ${C}`}
            strokeDashoffset={a.dashoffset}
            style={{
              transition: reducedMotion ? "none" : `stroke-dasharray ${DRAW_MS}ms cubic-bezier(0.22,1,0.36,1) ${a.i * STAGGER_MS}ms`
            }}
          />
        ))}
      </svg>

      <div className={floating ? "donut-core-float" : ""} style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 29%",
      }}>
        <div style={{
          opacity: reducedMotion ? 1 : (entered ? 1 : 0),
          transform: reducedMotion ? "none" : (entered ? "scale(1) translateY(0)" : "scale(0.8) translateY(8px)"),
          transition: reducedMotion ? "none" : `opacity 0.6s ease ${(segments.length - 1) * STAGGER_MS + 300}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${(segments.length - 1) * STAGGER_MS + 300}ms`
        }}>
          <b style={{ display:"block", fontSize:"clamp(40px,5vw,64px)", fontWeight:800, letterSpacing:"-.03em", color:"var(--green)", ...valueStyle }}>{value}</b>
          <span style={{ fontSize:12, letterSpacing:".1em", textTransform:"uppercase", color:"var(--ink-soft)", fontWeight:700, lineHeight:1.5, ...labelStyle }}>{label}</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes donutFloatRing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        @keyframes donutFloatCore {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .donut-float svg { animation: donutFloatRing 4.4s ease-in-out infinite; }
        .donut-core-float { animation: donutFloatCore 3.7s ease-in-out infinite; animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
