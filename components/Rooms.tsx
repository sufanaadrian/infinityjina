"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { business, DEFAULT_NATURE_BG, getReadablePrimaryColor, type Room } from "@/config/business";
import RoomImages from "@/components/RoomImages";
import { RichText, RichInline, stripMarkdown } from "@/components/RichText";
import { getButtonRadius } from "@/lib/design";
import Reveal from "@/components/Reveal";
import UltraHeading from "@/components/UltraHeading";

// ─── Booking policy note with animated shimmer ───────────────────────────────
function PolicyNote({ variant }: { variant: string }) {
  if (!business.bookingNotes) return null;

  if (variant === "ultramodern") {
    return (
      <Reveal className="mb-14">
        <style>{`
          @keyframes umPolicySweep {
            0%   { transform: translateX(-120%) skewX(-12deg); opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { transform: translateX(220%) skewX(-12deg); opacity: 0; }
          }
          .um-policy-sweep { animation: umPolicySweep 5s ease-in-out 1s infinite; }
        `}</style>
        <div className="relative overflow-hidden max-w-2xl mx-auto border border-white/[0.1] bg-[#0C0C0E]">
          {/* repeating shimmer sweep */}
          <div className="um-policy-sweep pointer-events-none absolute top-0 bottom-0 w-2/5 bg-gradient-to-r from-transparent via-[rgba(201,168,106,0.07)] to-transparent" aria-hidden />
          {/* gold top hairline */}
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold) 40%, var(--gold) 60%, transparent)" }} aria-hidden />
          {/* content */}
          <div className="relative z-10 flex items-start gap-4 px-7 py-6">
            <span className="mt-1 shrink-0 relative flex w-4 h-4" aria-hidden>
              <span className="absolute inset-0 rounded-full opacity-40 animate-ping" style={{ backgroundColor: "var(--gold)" }} />
              <span className="relative block w-4 h-4 rounded-full border" style={{ borderColor: "var(--gold)" }} />
            </span>
            <RichText text={business.bookingNotes} className="text-white/55 text-sm font-light leading-relaxed" />
          </div>
        </div>
      </Reveal>
    );
  }

  const isDark = variant === "dark" || variant === "bold";
  const isNature = variant === "nature";
  const isBold = variant === "bold";

  const wrapCls = isDark
    ? "mb-8 relative overflow-hidden bg-gray-800/50 border border-gray-700/40 rounded-2xl"
    : isNature
    ? "mb-8 relative overflow-hidden bg-white/70 border border-nature-soft rounded-2xl"
    : "mb-8 relative overflow-hidden bg-amber-50/70 border border-amber-200/60 rounded-2xl";

  const sweepColor = isDark
    ? "rgba(255,255,255,0.025)"
    : isNature
    ? "rgba(120,160,80,0.08)"
    : "rgba(201,150,50,0.09)";

  const dotColor = isDark ? "#a78bfa" : isNature ? "#6b8f47" : "#d97706";
  const textCls = isDark ? "text-gray-300 text-sm leading-relaxed" : "text-gray-600 text-sm leading-relaxed";

  return (
    <div className={wrapCls}>
      <style>{`
        @keyframes policyVarSweep {
          0%   { transform: translateX(-120%) skewX(-10deg); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(220%) skewX(-10deg); opacity: 0; }
        }
        .policy-var-sweep { animation: policyVarSweep 5s ease-in-out 0.8s infinite; }
      `}</style>
      <div className="policy-var-sweep pointer-events-none absolute top-0 bottom-0 w-2/5 bg-gradient-to-r from-transparent to-transparent" style={{ backgroundImage: `linear-gradient(90deg, transparent, ${sweepColor}, transparent)` }} aria-hidden />
      {/* accent left border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: isBold ? business.primaryColor : dotColor, opacity: 0.8 }}
        aria-hidden
      />
      <div className="relative flex items-start gap-4 pl-6 pr-5 py-4">
        <span className="mt-1 shrink-0 relative flex w-4 h-4" aria-hidden>
          <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: dotColor }} />
          <span className="relative block w-4 h-4 rounded-full border-2" style={{ borderColor: dotColor }} />
        </span>
        <RichText text={business.bookingNotes} className={textCls} />
      </div>
    </div>
  );
}

export default function Rooms() {
  if (!business.rooms || business.rooms.length === 0) return null;

  const v = business.designVariant ?? "classic";
  if (v === "ultramodern") return <RoomsUltramodern />;

  const isBold = v === "bold";
  const isNature = v === "nature";
  const isDark = v === "dark" || isBold;

  const sectionCls = isBold ? "py-20 bg-black" : isDark ? "py-20 bg-gray-950" : isNature ? "py-20" : "py-20 bg-gray-50";
  const sectionStyle = isNature ? { backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG } : undefined;
  const headingCls = isBold
    ? "text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-widest"
    : isDark
    ? "text-3xl md:text-4xl font-bold text-white mb-4"
    : "text-3xl md:text-4xl font-bold text-gray-900 mb-4";

  const optionCls = isBold
    ? "bg-zinc-900 rounded-none border-l-4 p-5"
    : isDark
    ? "bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5"
    : "bg-white border border-gray-200 rounded-2xl p-5";
  const optionTitleCls = isDark ? "font-semibold text-white" : "font-semibold text-gray-900";
  const optionDescCls = isDark ? "text-sm text-gray-400 leading-relaxed" : "text-sm text-gray-500 leading-relaxed";

  const cardCls = isBold
    ? "bg-zinc-900 rounded-none overflow-hidden border-l-4 flex flex-col hover:bg-zinc-800 transition-colors"
    : isDark
    ? "bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-colors flex flex-col"
    : isNature
    ? "bg-white rounded-3xl overflow-hidden shadow-sm border border-nature-soft hover:shadow-md transition-shadow flex flex-col"
    : "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col";
  const titleCls = isDark ? "text-lg font-semibold text-white mb-2" : "text-lg font-semibold text-gray-900 mb-2";
  const descCls = isDark ? "text-gray-400 text-sm flex-1" : "text-gray-500 text-sm flex-1";
  const featureCls = isBold
    ? "text-xs bg-zinc-800 text-gray-300 rounded-none px-3 py-1"
    : isDark
    ? "text-xs bg-gray-700 text-gray-300 rounded-full px-3 py-1"
    : isNature
    ? "text-xs bg-nature-chip text-nature-80 rounded-full px-3 py-1"
    : "text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1";

  const ctaRadius = getButtonRadius(isBold, business.buttonStyle);

  const heading = business.sectionHeadings?.rooms ?? {};
  const headingTitle = heading.title || "Camere și tarife";
  const headingSubtitle = heading.subtitle || "Alegeți camera potrivită pentru un sejur de neuitat.";

  return (
    <section id="rooms" className={sectionCls} style={sectionStyle}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className={headingCls}>
            <RichInline text={headingTitle} />
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            <RichInline text={headingSubtitle} />
          </p>
        </div>

        <PolicyNote variant={v} />

        {business.bookingOptions && business.bookingOptions.length > 0 && (
          <div className="mb-10">
            <h3 className={isDark ? "text-lg font-semibold text-white mb-4" : "text-lg font-semibold text-gray-900 mb-4"}>
              <RichInline text={business.bookingOptionsTitle || "Opțiuni de rezervare"} />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {business.bookingOptions.map((opt, i) => (
              <div key={i} className={optionCls} style={isBold ? { borderLeftColor: business.primaryColor } : undefined}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className={optionTitleCls}><RichInline text={opt.title} /></h3>
                  {opt.season && (
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 text-on-primary"
                      style={{ backgroundColor: business.primaryColor }}
                    >
                      {opt.season}
                    </span>
                  )}
                </div>
                <RichText text={opt.description} className={optionDescCls} />
              </div>
            ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.rooms.map((room, i) => {
            const roomImages = room.images && room.images.length > 0
              ? room.images
              : room.imageUrl
              ? [room.imageUrl]
              : [];

            return (
              <div key={i} className={cardCls} style={isBold ? { borderLeftColor: business.primaryColor } : undefined}>
                {roomImages.length > 0 && (
                  <RoomImages images={roomImages} alt={stripMarkdown(room.title)} />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className={titleCls}><RichInline text={room.title} /></h3>
                  <RichText text={room.description} className={descCls} />
                  {room.features && room.features.some((f) => f.trim()) && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {room.features.filter((f) => f.trim()).map((f) => (
                        <li key={f} className={featureCls}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="font-bold text-lg" style={{ color: getReadablePrimaryColor(!isDark) }}>
                      {room.price}
                    </span>
                    <RoomBookingButton room={room} ctaRadius={ctaRadius} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RoomBookingButton({ room, ctaRadius }: { room: import("@/config/business").Room; ctaRadius: string }) {
  const href = room.bookingUrl ?? business.bookingComUrl ?? business.airbnbUrl;
  if (!href) return null;
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`text-sm font-semibold text-on-primary px-4 py-2 ${ctaRadius} transition-opacity hover:opacity-90`}
      style={{ backgroundColor: business.primaryColor }}
    >
      Rezervă
    </a>
  );
}

// ─── Ultramodern — full-width alternating editorial rows, photo + details ──
function RoomsUltramodern() {
  const rooms = business.rooms ?? [];
  const heading = business.sectionHeadings?.rooms ?? {};
  const headingTitle = heading.title || "Camere și tarife";
  const headingSubtitle = heading.subtitle || "Alegeți camera potrivită pentru un sejur de neuitat.";
  const ctaRadius = getButtonRadius(false, business.buttonStyle);

  const [lightbox, setLightbox] = useState<{ ri: number; ii: number } | null>(null);

  const getImgs = useCallback((room: Room) => {
    return room.images && room.images.length > 0 ? room.images : room.imageUrl ? [room.imageUrl] : [];
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg = useCallback(() => {
    setLightbox((lb) => {
      if (!lb) return null;
      const imgs = rooms[lb.ri]?.images?.length ? rooms[lb.ri].images! : rooms[lb.ri]?.imageUrl ? [rooms[lb.ri].imageUrl!] : [];
      return { ri: lb.ri, ii: (lb.ii - 1 + imgs.length) % imgs.length };
    });
  }, [rooms]);
  const nextImg = useCallback(() => {
    setLightbox((lb) => {
      if (!lb) return null;
      const imgs = rooms[lb.ri]?.images?.length ? rooms[lb.ri].images! : rooms[lb.ri]?.imageUrl ? [rooms[lb.ri].imageUrl!] : [];
      return { ri: lb.ri, ii: (lb.ii + 1) % imgs.length };
    });
  }, [rooms]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, prevImg, nextImg]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const lbImgs = lightbox ? getImgs(rooms[lightbox.ri]) : [];
  const lbRoom = lightbox ? rooms[lightbox.ri] : null;

  return (
    <>
      <section id="rooms" className="py-28 md:py-36 bg-[#080809]">
        <div className="max-w-6xl mx-auto px-6">
          <UltraHeading eyebrow="Cazare" title={headingTitle} subtitle={headingSubtitle} align="center" className="mb-16 md:mb-20" />

          <PolicyNote variant="ultramodern" />

          {business.bookingOptions && business.bookingOptions.length > 0 && (
            <Reveal className="mb-16">
              <h3 className="text-center text-[11px] tracking-[0.4em] uppercase text-gold-70 mb-6">
                <RichInline text={business.bookingOptionsTitle || "Opțiuni de rezervare"} />
              </h3>
              <div className="grid sm:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08]">
                {business.bookingOptions.map((opt, i) => (
                  <div key={i} className="bg-[#080809] p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-light tracking-wide text-white"><RichInline text={opt.title} /></h4>
                      {opt.season && (
                        <span className="text-[10px] tracking-wider uppercase text-gold border border-gold-soft px-2.5 py-1 whitespace-nowrap shrink-0">
                          {opt.season}
                        </span>
                      )}
                    </div>
                    <RichText text={opt.description} className="text-sm text-white/45 font-light leading-relaxed" />
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <div className="flex flex-col gap-px bg-white/[0.08] border-y border-white/[0.08]">
            {rooms.map((room, i) => {
              const imgs = getImgs(room);
              const cover = imgs[0];
              const reverse = i % 2 === 1;
              const hasGallery = imgs.length > 1;
              return (
                <Reveal key={i} className="group grid md:grid-cols-2 bg-[#080809]">
                  <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[24rem] overflow-hidden ${reverse ? "md:order-2" : ""}`}>
                    {cover ? (
                      hasGallery ? (
                        <button
                          onClick={() => setLightbox({ ri: i, ii: 0 })}
                          className="absolute inset-0 cursor-zoom-in"
                          aria-label={`Vezi toate fotografiile pentru ${stripMarkdown(room.title)}`}
                        >
                          <Image src={cover} alt={stripMarkdown(room.title)} fill className="object-cover um-img-zoom" />
                        </button>
                      ) : (
                        <Image src={cover} alt={stripMarkdown(room.title)} fill className="object-cover um-img-zoom" />
                      )
                    ) : (
                      <div className="absolute inset-0 bg-[#111113]" />
                    )}
                    <span className="absolute top-5 left-5 um-outline-num text-5xl md:text-7xl font-extralight leading-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {hasGallery && (
                      <button
                        onClick={() => setLightbox({ ri: i, ii: 0 })}
                        className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] uppercase text-white/85 bg-black/50 backdrop-blur-sm px-3 py-1.5 hover:text-gold transition-colors"
                        aria-label="Deschide galeria"
                      >
                        +{imgs.length - 1} foto
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4"><RichInline text={room.title} /></h3>
                    <RichText text={room.description} className="text-white/50 text-sm font-light leading-relaxed" />
                    {room.features && room.features.some((f) => f.trim()) && (
                      <ul className="mt-5 flex flex-wrap gap-2.5">
                        {room.features.filter((f) => f.trim()).map((f) => (
                          <li key={f} className="text-[11px] tracking-wide uppercase text-gold-70 border border-gold-soft px-3 py-1">
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                      <span className="text-2xl md:text-3xl font-extralight text-gold">{room.price}</span>
                      <RoomBookingButton room={room} ctaRadius={ctaRadius} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* State-based lightbox overlay — no scroll jump, no href="#" */}
      {lightbox && lbRoom && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center text-white/60 hover:text-gold text-3xl leading-none transition-colors"
            aria-label="Închide"
          >
            ×
          </button>
          <span className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.35em] uppercase text-white/40 tabular-nums pointer-events-none">
            {String(lightbox.ii + 1).padStart(2, "0")} / {String(lbImgs.length).padStart(2, "0")}
          </span>
          {lbImgs.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImg(); }}
                className="absolute left-2 sm:left-5 z-10 w-11 h-11 flex items-center justify-center text-white/50 hover:text-gold text-3xl leading-none transition-colors"
                aria-label="Foto anterioară"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImg(); }}
                className="absolute right-2 sm:right-5 z-10 w-11 h-11 flex items-center justify-center text-white/50 hover:text-gold text-3xl leading-none transition-colors"
                aria-label="Foto următoare"
              >
                ›
              </button>
            </>
          )}
          <div className="relative z-[5] max-w-5xl w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lbImgs[lightbox.ii]}
              alt={`${stripMarkdown(lbRoom.title)} — foto ${lightbox.ii + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
