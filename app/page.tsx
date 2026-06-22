import type { Metadata } from "next";
import { Fragment } from "react";
import { business, DEFAULT_SECTION_ORDER, getBodyBackgroundColor, getNatureAccentColor, getPrimaryContrastColor, getUltramodernGold, type SectionId } from "@/config/business";
import { FONT_MAP, VARIANT_DEFAULT_FONTS } from "@/lib/fonts";
import { stripMarkdown } from "@/components/RichText";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Rooms from "@/components/Rooms";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Reservation from "@/components/Reservation";
import StatsStrip from "@/components/StatsStrip";
import Process from "@/components/Process";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Reveal from "@/components/Reveal";

const plainName = stripMarkdown(business.name);
const plainTagline = stripMarkdown(business.tagline);

export const metadata: Metadata = {
  title: plainName,
  description: plainTagline,
  openGraph: {
    title: plainName,
    description: plainTagline,
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary",
    title: plainName,
    description: plainTagline,
  },
};

function UltraHairline() {
  return (
    <div
      className="h-px w-full"
      style={{ background: "linear-gradient(to right, transparent, var(--um-line) 20%, var(--um-line) 80%, transparent)" }}
      aria-hidden
    />
  );
}

export default function Home() {
  const show = business.showSections ?? {};

  const variant = business.designVariant ?? "classic";
  const variantDefaults = VARIANT_DEFAULT_FONTS[variant];
  const isUltra = variant === "ultramodern";

  const sectionComponents: Record<SectionId, React.ReactNode> = {
    services: <Services />,
    gallery: show.gallery !== false ? <Gallery /> : null,
    about: <About />,
    reviews: show.reviews !== false ? <Testimonials /> : null,
    rooms: <Rooms />,
    faq: show.faq !== false ? <FAQ /> : null,
    process: isUltra && show.process !== false ? <Process /> : null,
    reservation: show.reservation !== false ? <Reservation /> : null,
  };

  // Merge configured order with any sections missing from it (forward-compat)
  const configuredOrder = business.sectionOrder ?? DEFAULT_SECTION_ORDER;
  const order = [...configuredOrder, ...DEFAULT_SECTION_ORDER.filter((id) => !configuredOrder.includes(id))];
  // Ultramodern is a locked, cohesive design system — its geometric-sans
  // typography (Jost) plus the Allura signature script are part of the variant's
  // identity and are intentionally NOT overridable per client, so the look stays
  // consistent regardless of any leftover headingFont/bodyFont in the JSON.
  const headingFont = FONT_MAP[isUltra ? variantDefaults.heading : business.headingFont ?? variantDefaults.heading];
  const bodyFont = FONT_MAP[isUltra ? variantDefaults.body : business.bodyFont ?? variantDefaults.body];
  // For ultramodern, --gold is forced to a warm gold (champagne fallback) so the
  // variant can never render blue, and the on-gold contrast color tracks it.
  const ultraGold = getUltramodernGold();
  const fontStyle = {
    ["--font-heading" as string]: `var(${headingFont.cssVar})`,
    ["--font-body" as string]: `var(${bodyFont.cssVar})`,
    ["--nature-accent" as string]: getNatureAccentColor(),
    ["--primary-contrast" as string]: isUltra ? "#0a0a0b" : getPrimaryContrastColor(),
    ["--gold" as string]: ultraGold,
  } as React.CSSProperties;

  return (
    <div className={`theme-${business.designVariant ?? "classic"}`} style={fontStyle}>
      <style>{`body { background: ${getBodyBackgroundColor()}; }`}</style>
      <Navbar />
      <main
        style={
          business.headerStyle === "transparent" || business.headerStyle === "hidden" || variant === "ultramodern"
            ? undefined
            : business.designVariant === "nature"
            ? { paddingTop: "calc(5.5rem + env(safe-area-inset-top))" }
            : { paddingTop: "calc(4rem + env(safe-area-inset-top))" }
        }
      >
        <Hero />
        {isUltra && (
          <div className="bg-[#0A0A0B] pt-12 pb-0 overflow-hidden pointer-events-none">
            <Reveal className="um-separator-wrap flex flex-col items-center" safetyMs={0}>
              <div className="um-sep-vline" />
              <div className="relative flex items-center justify-center w-full" style={{ height: "8px" }}>
                <div className="um-sep-hline" />
                <div className="um-sep-dot" />
              </div>
            </Reveal>
          </div>
        )}
        <StatsStrip />
        {isUltra
          ? order.map((id, idx) => (
              <Fragment key={id}>
                {idx > 0 && sectionComponents[id] != null && <UltraHairline />}
                {sectionComponents[id]}
              </Fragment>
            ))
          : order.map((id) => (
              <Fragment key={id}>{sectionComponents[id]}</Fragment>
            ))}
        {isUltra && <UltraHairline />}
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
