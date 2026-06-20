import { business, DEFAULT_NATURE_BG, type FAQItem } from "@/config/business";
import { RichInline, RichText } from "@/components/RichText";
import UltraHeading from "@/components/UltraHeading";

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

type SectionProps = {
  faq: FAQItem[];
  headingTitle: string;
  headingSubtitle: string;
  primaryColor: string;
};

export default function FAQ() {
  if (!business.faq || business.faq.length === 0) return null;

  const heading = business.sectionHeadings?.faq ?? {};
  const v = business.designVariant ?? "classic";

  const props: SectionProps = {
    faq: business.faq,
    headingTitle: heading.title || "Întrebări frecvente",
    headingSubtitle: heading.subtitle || "Răspunsuri la cele mai comune întrebări ale clienților noștri.",
    primaryColor: business.primaryColor,
  };

  if (v === "nature") return <FAQNature {...props} />;
  if (v === "dark") return <FAQDark {...props} />;
  if (v === "bold") return <FAQBold {...props} />;
  if (v === "ultramodern") return <FAQUltramodern {...props} />;
  return <FAQClassic {...props} />;
}

// ─── Ultramodern — sticky-header editorial accordion with plus/minus morph ──
function FAQUltramodern({ faq, headingTitle, headingSubtitle }: SectionProps) {
  return (
    <section id="faq" className="py-28 md:py-36 bg-[#0A0A0B]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <UltraHeading eyebrow="Întrebări" title={headingTitle} subtitle={headingSubtitle} align="left" />
        </div>
        <div className="border-t border-white/[0.08]">
          {faq.map((item, i) => (
            <details key={i} className="group border-b border-white/[0.08]">
              <summary className="flex items-center gap-5 py-6 cursor-pointer touch-manipulation select-none list-none">
                <span className="um-outline-num text-2xl md:text-3xl font-extralight tabular-nums shrink-0 w-9 md:w-11">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-lg md:text-xl font-light tracking-wide text-white transition-colors group-hover:text-gold">
                  <RichInline text={item.question} />
                </span>
                <span className="relative w-4 h-4 shrink-0">
                  <span className="absolute left-0 top-1/2 w-4 h-px -translate-y-1/2" style={{ backgroundColor: "var(--gold)" }} />
                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 transition-all duration-300 group-open:rotate-90 group-open:opacity-0" style={{ backgroundColor: "var(--gold)" }} />
                </span>
              </summary>
              <RichText text={item.answer} className="pb-7 pl-[3.5rem] md:pl-16 pr-2 text-white/50 text-sm md:text-base font-light leading-relaxed" />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Classic — single-column accordion ─────────────────────────────────────
function FAQClassic({ faq, headingTitle, headingSubtitle }: SectionProps) {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"><RichInline text={headingTitle} /></h2>
          <p className="text-gray-500 max-w-xl mx-auto"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="flex flex-col gap-3">
          {faq.map((item, i) => (
            <details key={i} className="group bg-gray-50 rounded-2xl overflow-hidden">
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer touch-manipulation select-none font-medium text-gray-900 list-none">
                <RichInline text={item.question} />
                <ChevronIcon className="w-5 h-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <RichText text={item.answer} className="px-6 pb-5 text-gray-600 text-sm leading-relaxed" />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Nature — two-column grid of soft rounded cards ────────────────────────
function FAQNature({ faq, headingTitle, headingSubtitle }: SectionProps) {
  return (
    <section id="faq" className="py-24" style={{ backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-nature-60 mb-3">Întrebări</span>
          <h2 className="text-3xl md:text-5xl font-bold text-nature mb-4"><RichInline text={headingTitle} /></h2>
          <p className="text-nature-60 max-w-xl mx-auto"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faq.map((item, i) => (
            <details key={i} className="group bg-white border border-nature-soft shadow-sm rounded-3xl overflow-hidden h-fit">
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer touch-manipulation select-none font-medium text-nature list-none">
                <RichInline text={item.question} />
                <ChevronIcon className="w-5 h-5 shrink-0 text-nature-40 transition-transform group-open:rotate-180" />
              </summary>
              <RichText text={item.answer} className="px-6 pb-5 text-nature-60 text-sm leading-relaxed" />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dark — minimal numbered list with dividers ────────────────────────────
function FAQDark({ faq, headingTitle, headingSubtitle }: SectionProps) {
  return (
    <section id="faq" className="py-24 bg-gray-950">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"><RichInline text={headingTitle} /></h2>
          <p className="text-gray-500 max-w-xl mx-auto"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="divide-y divide-white/10">
          {faq.map((item, i) => (
            <details key={i} className="group py-5">
              <summary className="flex items-center gap-4 cursor-pointer touch-manipulation select-none list-none">
                <span className="text-sm text-white/25 tabular-nums shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-medium text-white"><RichInline text={item.question} /></span>
                <ChevronIcon className="w-5 h-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
              </summary>
              <RichText text={item.answer} className="pl-9 pt-3 text-gray-400 text-sm leading-relaxed" />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bold — brutalist hairline list with huge numbers ──────────────────────
function FAQBold({ faq, headingTitle, headingSubtitle, primaryColor }: SectionProps) {
  return (
    <section id="faq" className="py-20 bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: primaryColor }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: primaryColor }}>
              Întrebări
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4"><RichInline text={headingTitle} /></h2>
          <p className="text-gray-400 max-w-xl"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="flex flex-col gap-px bg-zinc-800">
          {faq.map((item, i) => (
            <details key={i} className="group bg-black">
              <summary className="flex items-center gap-4 px-6 py-5 cursor-pointer touch-manipulation select-none list-none">
                <span className="text-2xl font-black shrink-0" style={{ color: primaryColor }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-bold text-white uppercase tracking-wide"><RichInline text={item.question} /></span>
                <ChevronIcon className="w-5 h-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
              </summary>
              <RichText text={item.answer} className="px-6 pb-6 pl-[4.5rem] text-gray-400 text-sm leading-relaxed" />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
