"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryLightbox({
  images,
  name,
  previewLimit,
  accentColor,
  showAllLabel,
  editorial = false,
  masonry = false,
}: {
  images: string[];
  name: string;
  previewLimit?: number;
  accentColor?: string;
  showAllLabel?: string;
  /** Ultramodern look: sharp-cornered cinematic tiles, gold hover veil,
   *  frame numbers and a "VIEW" cue. Reuses the same pure-CSS lightbox. */
  editorial?: boolean;
  /** True masonry via CSS columns — tiles stack at their natural (cycling)
   *  aspect ratio for a magazine editorial feel. Implies editorial styling. */
  masonry?: boolean;
}) {
  const [showAll, setShowAll] = useState(false);

  if (images.length === 0) return null;

  const limit = previewLimit && previewLimit > 0 ? previewLimit : images.length;
  const hasMore = images.length > limit;
  const visible = showAll ? images : images.slice(0, limit);
  const n = images.length;

  const accent = accentColor ?? "#6B7280";

  // Masonry: CSS columns with cycling aspect ratios (portrait → square → landscape)
  // so tiles have natural visual variety without knowing image dimensions.
  const MASONRY_ASPECTS = [
    "aspect-[3/4]",   // portrait
    "aspect-[4/3]",   // landscape
    "aspect-square",  // square
    "aspect-[3/4]",   // portrait
    "aspect-[16/9]",  // wide
    "aspect-[4/3]",   // landscape
  ];

  const masonryColsCls = "columns-2 sm:columns-3 md:columns-4 gap-2 md:gap-3";

  // Cycle through a few cell sizes so the gallery reads as a bento-style
  // mosaic with varied box sizes instead of a uniform grid of identical tiles.
  // Editorial uses bolder, more cinematic spans for a magazine layout.
  const SIZES = editorial
    ? ["col-span-2 row-span-2", "row-span-2", "", "col-span-2", "", "row-span-2"]
    : ["col-span-2 row-span-2", "", "row-span-2", "", "col-span-2"];

  const gridCls = editorial
    ? "grid grid-cols-2 md:grid-cols-4 [grid-auto-flow:dense] auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[170px] gap-2 md:gap-3"
    : "grid grid-cols-2 md:grid-cols-3 [grid-auto-flow:dense] auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[180px] gap-4";

  const Thumb = ({ url, i }: { url: string; i: number }) =>
    masonry ? (
      <a
        href={`#lb-${i}`}
        className={`um-gallery-tile group relative block w-full break-inside-avoid mb-2 md:mb-3 cursor-zoom-in overflow-hidden ${MASONRY_ASPECTS[i % MASONRY_ASPECTS.length]}`}
        aria-label={`${name} — deschide foto ${i + 1}`}
      >
        <Image
          src={url}
          alt={`${name} — foto ${i + 1}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover pointer-events-none"
        />
        <span className="um-gallery-veil" />
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.3em] tabular-nums text-white/55">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="um-gallery-cue">View</span>
      </a>
    ) : editorial ? (
      <a
        href={`#lb-${i}`}
        className={`um-gallery-tile group block w-full h-full cursor-zoom-in ${SIZES[i % SIZES.length]}`}
        aria-label={`${name} — deschide foto ${i + 1}`}
      >
        <Image
          src={url}
          alt={`${name} — foto ${i + 1}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover pointer-events-none"
        />
        <span className="um-gallery-veil" />
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.3em] tabular-nums text-white/55">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="um-gallery-cue">View</span>
      </a>
    ) : (
      <a
        href={`#lb-${i}`}
        className={`group relative block w-full h-full overflow-hidden rounded-2xl cursor-zoom-in ${SIZES[i % SIZES.length]}`}
        aria-label={`${name} — deschide foto ${i + 1}`}
      >
        <Image
          src={url}
          alt={`${name} — foto ${i + 1}`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
        />
      </a>
    );

  const containerCls = masonry ? masonryColsCls : gridCls;
  const isEditorialStyle = masonry || editorial;

  return (
    <div>
      {/* Single unified grid — no gap between preview and rest */}
      <div className={containerCls}>
        {visible.map((url, i) => (
          <Thumb key={i} url={url} i={i} />
        ))}
      </div>

      {hasMore && !showAll && (
        <div className={isEditorialStyle ? "mt-8 text-center" : "mt-4 text-center"}>
          {isEditorialStyle ? (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] uppercase text-gold border-b border-gold-soft pb-1.5 transition-colors hover:border-gold"
            >
              {showAllLabel ?? `Vezi toate fotografiile (${n})`}
              <span aria-hidden>↓</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border-2 transition-colors hover:opacity-80"
              style={{ borderColor: accent, color: accent }}
            >
              {showAllLabel ?? `Vezi toate (${n})`}
            </button>
          )}
        </div>
      )}

      {/* Fullscreen viewers — hidden until their anchor is the URL :target. */}
      {images.map((url, i) => {
        const prev = (i - 1 + n) % n;
        const next = (i + 1) % n;
        return (
          <div
            key={i}
            id={`lb-${i}`}
            className="hidden target:flex fixed inset-0 z-[100] bg-black/90 items-center justify-center p-4 sm:p-8"
          >
            {/* Tap anywhere on the backdrop to close. */}
            <a href="#gallery-close" className="absolute inset-0 z-0" aria-label="Închide" />

            <a
              href="#gallery-close"
              className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white text-3xl leading-none"
              aria-label="Închide"
            >
              ×
            </a>

            {n > 1 && (
              <>
                <a
                  href={`#lb-${prev}`}
                  className="absolute left-2 sm:left-4 z-10 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white text-3xl leading-none"
                  aria-label="Foto anterioară"
                >
                  ‹
                </a>
                <a
                  href={`#lb-${next}`}
                  className="absolute right-2 sm:right-4 z-10 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white text-3xl leading-none"
                  aria-label="Foto următoare"
                >
                  ›
                </a>
              </>
            )}

            <div className="relative z-[5] max-w-5xl w-full h-full pointer-events-none">
              <Image
                src={url}
                alt={`${name} — foto ${i + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
