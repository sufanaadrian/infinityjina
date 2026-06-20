import { business, DEFAULT_NATURE_BG, getReadablePrimaryColor } from "@/config/business";
import { RichInline, stripMarkdown } from "@/components/RichText";
import GalleryLightbox from "./GalleryLightbox";
import UltraHeading from "@/components/UltraHeading";

export default function Gallery() {
  if (!business.gallery || business.gallery.length === 0) return null;

  const v = business.designVariant ?? "classic";
  const isBold = v === "bold";
  const isNature = v === "nature";
  const isUltra = v === "ultramodern";
  const isDark = v === "dark" || isBold || isUltra;

  const sectionCls = isBold
    ? "py-20 bg-black"
    : isUltra
    ? "py-28 bg-[#080809]"
    : isDark
    ? "py-20 bg-gray-950"
    : isNature
    ? "py-20"
    : "py-20 bg-white";
  const sectionStyle = isNature ? { backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG } : undefined;
  const headingCls = isBold
    ? "text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-widest"
    : isUltra
    ? "text-3xl md:text-5xl font-light tracking-tight text-white mb-4"
    : isDark
    ? "text-3xl md:text-4xl font-bold text-white mb-4"
    : "text-3xl md:text-4xl font-bold text-gray-900 mb-4";

  const heading = business.sectionHeadings?.gallery ?? {};
  const headingTitle = heading.title || "Galerie foto";
  const headingSubtitle = heading.subtitle || "O privire asupra muncii și spațiului nostru.";

  // ─── Ultramodern — editorial photo essay: vertical edge label, header with
  //     frame count, and a cinematic sharp-cornered mosaic. ──────────────────
  if (isUltra) {
    return (
      <section id="gallery" className="relative py-28 md:py-36 bg-[#080809]">
        <span className="um-vlabel hidden lg:block absolute left-6 top-32 text-[10px] tracking-[0.45em] uppercase text-white/30">
          Galerie
        </span>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <UltraHeading eyebrow="Galerie" title={headingTitle} subtitle={headingSubtitle} align="left" />
            <span className="hidden md:block text-[11px] tracking-[0.3em] uppercase text-gold-70 shrink-0 tabular-nums">
              {String(business.gallery.length).padStart(2, "0")} fotografii
            </span>
          </div>
          <GalleryLightbox
            images={business.gallery}
            name={stripMarkdown(business.name)}
            previewLimit={business.galleryPreviewLimit ?? 8}
            accentColor={business.primaryColor}
            editorial
          />
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className={sectionCls} style={sectionStyle}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className={headingCls}>
            <RichInline text={headingTitle} />
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            <RichInline text={headingSubtitle} />
          </p>
        </div>
        <GalleryLightbox
          images={business.gallery}
          name={stripMarkdown(business.name)}
          previewLimit={business.galleryPreviewLimit ?? 9}
          accentColor={getReadablePrimaryColor(!isDark)}
        />
      </div>
    </section>
  );
}
