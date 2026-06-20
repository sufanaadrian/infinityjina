import Image from "next/image";
import { business, DEFAULT_NATURE_BG, getReadablePrimaryColor } from "@/config/business";
import RoomImages from "@/components/RoomImages";
import { RichText, RichInline, stripMarkdown } from "@/components/RichText";
import { getButtonRadius } from "@/lib/design";
import Reveal from "@/components/Reveal";
import UltraHeading from "@/components/UltraHeading";

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

  const noteBoxCls = isDark
    ? "mb-8 flex items-start gap-3 bg-gray-800/60 border border-gray-700/50 rounded-2xl px-5 py-4"
    : "mb-8 flex items-start gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4";
  const noteIconCls = isDark ? "w-5 h-5 mt-0.5 shrink-0 text-gray-500" : "w-5 h-5 mt-0.5 shrink-0 text-gray-400";
  const noteTextCls = isDark ? "text-sm text-gray-300 leading-relaxed" : "text-sm text-gray-600 leading-relaxed";

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

        {business.bookingNotes && (
          <div className={noteBoxCls}>
            <svg className={noteIconCls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <RichText text={business.bookingNotes} className={noteTextCls} />
          </div>
        )}

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

  return (
    <section id="rooms" className="py-28 md:py-36 bg-[#080809]">
      <div className="max-w-6xl mx-auto px-6">
        <UltraHeading eyebrow="Cazare" title={headingTitle} subtitle={headingSubtitle} align="center" className="mb-16 md:mb-20" />

        {business.bookingNotes && (
          <Reveal className="mb-14 max-w-2xl mx-auto text-center border border-white/[0.08] px-6 py-5">
            <RichText text={business.bookingNotes} className="text-white/55 text-sm font-light leading-relaxed" />
          </Reveal>
        )}

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
            const imgs = room.images && room.images.length > 0 ? room.images : room.imageUrl ? [room.imageUrl] : [];
            const cover = imgs[0];
            const reverse = i % 2 === 1;
            return (
              <Reveal key={i} className="group grid md:grid-cols-2 bg-[#080809]">
                <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[24rem] overflow-hidden ${reverse ? "md:order-2" : ""}`}>
                  {cover ? (
                    <Image src={cover} alt={stripMarkdown(room.title)} fill className="object-cover um-img-zoom" />
                  ) : (
                    <div className="absolute inset-0 bg-[#111113]" />
                  )}
                  <span className="absolute top-5 left-5 um-outline-num text-5xl md:text-7xl font-extralight leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {imgs.length > 1 && (
                    <span className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] uppercase text-white/85 bg-black/50 backdrop-blur-sm px-3 py-1.5">
                      +{imgs.length - 1} foto
                    </span>
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
  );
}
