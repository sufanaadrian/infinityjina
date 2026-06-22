import { business } from "@/config/business";
import UltraHeading from "@/components/UltraHeading";
import Reveal from "@/components/Reveal";

const defaultSteps = [
  { title: "Contact", desc: "Ne sunați sau scrieți — stabilim detaliile și verificăm disponibilitatea." },
  { title: "Confirmare", desc: "Rezervați și primiți confirmarea. Totul este simplu și transparent." },
  { title: "Sosire", desc: "Vă așteptăm. De la intrare, totul este pregătit pentru dumneavoastră." },
  { title: "Experiență", desc: "Relaxați-vă și bucurați-vă. Aceasta este partea care contează cel mai mult." },
];

export default function Process() {
  if ((business.designVariant ?? "classic") !== "ultramodern") return null;
  if (business.showSections?.process === false) return null;

  const steps = (business.processSteps ?? defaultSteps).filter((s) => s.title.trim());

  return (
    <section id="process" className="py-28 md:py-36 bg-[#080809]">
      <div className="max-w-6xl mx-auto px-6">
        <UltraHeading
          eyebrow="Cum funcționează"
          title="De la contact la experiență"
          align="center"
          className="mb-20 md:mb-28"
        />

        <div className="relative">
          {/* Horizontal connector line — desktop only, sits at the number baseline */}
          <div
            className="hidden md:block absolute top-[2.6rem] left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px"
            style={{ background: "linear-gradient(to right, transparent, var(--um-line) 20%, var(--um-line) 80%, transparent)" }}
            aria-hidden
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1} className="flex flex-col items-center text-center relative">
                <div
                  className="w-16 h-16 flex items-center justify-center border border-gold-soft mb-8 shrink-0 relative z-10"
                  style={{ background: "#080809" }}
                >
                  <span className="um-outline-num text-2xl font-extralight leading-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base font-light tracking-[0.3em] uppercase text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-white/40 font-light leading-relaxed max-w-[16rem]">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
