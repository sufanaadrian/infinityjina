"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

// Scroll-triggered entrance wrapper used by the Ultramodern variant. Renders
// hidden (via the `.um-reveal` class) and adds `.is-visible` once it scrolls
// into view. A 1.5s safety timer force-reveals it even if the observer never
// fires, so content can't get stuck invisible. Honors prefers-reduced-motion
// through the CSS (the class just no-ops there).
type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger the entrance, in seconds. */
  delay?: number;
  id?: string;
};

export default function Reveal({ children, as, className = "", delay = 0, id }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) return;

    const reveal = () => setVisible(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);

    // Safety net — never leave content hidden.
    const timer = window.setTimeout(reveal, 1500);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [visible]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`um-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
