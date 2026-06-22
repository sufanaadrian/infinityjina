"use client";

import { useEffect, useRef, useState } from "react";

function parse(value: string) {
  const m = value.match(/^(\D*)(\d[\d.,]*)(.*)$/);
  if (!m) return null;
  const [, prefix, rawNum, suffix] = m;
  const decimals = rawNum.includes(".") ? rawNum.split(".")[1].length : 0;
  const target = parseFloat(rawNum.replace(/,/g, ""));
  const zero = `${prefix}${(0).toFixed(decimals)}${suffix}`;
  return { prefix, suffix, decimals, target, zero };
}

export default function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);
  // Start at the zero-state ("0°", "0★", "0") so there's never a flash of the
  // final value before the animation begins.
  const [display, setDisplay] = useState(parsed?.zero ?? value);

  useEffect(() => {
    if (!parsed) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const { prefix, suffix, decimals, target } = parsed;
    let raf = 0;

    const run = () => {
      if (hasRun.current) return;
      hasRun.current = true;

      const duration = 1600;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };

      raf = requestAnimationFrame(tick);
    };

    let delayTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          delayTimer = setTimeout(run, 300);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      if (delayTimer !== null) clearTimeout(delayTimer);
    };
  }, [value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  );
}
