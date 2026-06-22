"use client";

import { business } from "@/config/business";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";

const defaultStats = [
  { value: "10+", label: "Ani experiență" },
  { value: "500+", label: "Clienți mulțumiți" },
  { value: "100%", label: "Garanție calitate" },
  { value: "24h", label: "Timp de răspuns" },
];

export default function StatsStrip() {
  if ((business.designVariant ?? "classic") !== "ultramodern") return null;
  if (business.showSections?.stats === false) return null;

  const stats = business.stats ?? defaultStats;

  return (
    <section
      className="bg-[#0A0A0B] border-b"
      style={{ borderColor: "var(--um-line-faint)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="py-14 md:py-16 px-4 md:px-8 text-center">
                <CountUp
                  value={stat.value}
                  className="block text-5xl md:text-7xl font-extralight text-gold mb-3 tracking-tight"
                />
                <p className="text-[10px] text-white/35 uppercase tracking-[0.4em]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
