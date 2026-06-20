"use client";

import { useEffect, useRef, useState } from "react";

// Animated number that counts up from 0 to its target the first time it
// scrolls into view. Parses a leading number out of strings like "500+",
// "100%", "24h", "10+" and keeps whatever prefix/suffix surrounds it. Falls
// back to showing the raw value (no animation) when there's no number or the
// visitor prefers reduced motion.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)(\d[\d.,]*)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, rawNum, suffix] = match;
    const decimals = rawNum.includes(".") ? rawNum.split(".")[1].length : 0;
    const target = parseFloat(rawNum.replace(/,/g, ""));
    let raf = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const current = (target * eased).toFixed(decimals);
        setDisplay(`${prefix}${current}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`);
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    const timer = window.setTimeout(run, 1800); // safety net
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [match]);

  // `tabular-nums` keeps every digit the same width so the value doesn't jitter
  // sideways as it counts up (proportional digits change width each frame).
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  );
}
