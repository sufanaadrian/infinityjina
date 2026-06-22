"use client";

import { useState } from "react";
import { business, DEFAULT_NATURE_BG } from "@/config/business";
import UltraHeading from "@/components/UltraHeading";
import Reveal from "@/components/Reveal";
import { getButtonRadius, getInputRadius } from "@/lib/design";

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

type Option = {
  key: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const isAccommodation = ["hotel", "pension", "cottage"].includes(business.businessType ?? "");

export default function Reservation() {
  const v = business.designVariant ?? "classic";
  const isUltra = v === "ultramodern";
  const isBold = v === "bold";
  const isNature = v === "nature";
  const isDark = v === "dark" || isBold;

  const [view, setView] = useState<"options" | "form">("options");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDates = business.reservationFormShowDates !== false;
  const submitLabel = business.reservationFormSubmitLabel || "Trimite cererea";
  const messagePlaceholder = business.reservationFormMessagePlaceholder || "Spuneți-ne ce vă interesează...";
  const headingTitle = business.sectionHeadings?.reservation?.title || "Rezervă acum";
  const headingSubtitle = business.sectionHeadings?.reservation?.subtitle || "Alege modul prin care preferi să ne contactezi — îți răspundem cât mai repede.";

  const btnRadius = getButtonRadius(isBold, business.buttonStyle);
  const inputRadius = getInputRadius(isBold, business.buttonStyle);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const checkin = (form.elements.namedItem("checkin") as HTMLInputElement)?.value ?? "";
    const checkout = (form.elements.namedItem("checkout") as HTMLInputElement)?.value ?? "";
    const dateField = (form.elements.namedItem("date") as HTMLInputElement)?.value ?? "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const dateInfo = isAccommodation
      ? (checkin || checkout ? `Check-in: ${checkin || "—"}\nCheck-out: ${checkout || "—"}\n\n` : "")
      : (dateField ? `Data preferată: ${dateField}\n\n` : "");

    const fullMessage = `${dateInfo}${message}`;

    if (business.web3formsKey) {
      setLoading(true);
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: business.web3formsKey,
            subject: `Cerere rezervare de la ${name}`,
            from_name: name,
            phone,
            message: fullMessage,
          }),
        });
        setSubmitted(true);
      } finally {
        setLoading(false);
      }
    } else {
      const subject = encodeURIComponent(`Cerere rezervare de la ${name}`);
      const body = encodeURIComponent(`Nume: ${name}\nTelefon: ${phone}\n\n${fullMessage}`);
      window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  }

  const phoneClean = business.phone?.replace(/\s/g, "");
  const options: Option[] = [];
  if (phoneClean) options.push({ key: "call", href: `tel:${phoneClean}`, icon: <PhoneIcon />, title: "Sună-ne", desc: business.phone });
  if (business.whatsapp) options.push({ key: "whatsapp", href: `https://wa.me/${business.whatsapp}`, external: true, icon: <WhatsAppIcon />, title: "WhatsApp", desc: "Scrie-ne un mesaj rapid" });
  if (business.showSections?.contactForm !== false) options.push({ key: "form", onClick: () => setView("form"), icon: <MailIcon />, title: "Formular", desc: "Completează formularul de contact" });
  if (business.bookingComUrl) options.push({ key: "booking", href: business.bookingComUrl, external: true, icon: <CalendarIcon />, title: "Booking.com", desc: "Rezervă online" });
  if (business.airbnbUrl) options.push({ key: "airbnb", href: business.airbnbUrl, external: true, icon: <CalendarIcon />, title: "Airbnb", desc: "Rezervă online" });

  if (options.length === 0) return null;

  // ─── Ultramodern ────────────────────────────────────────────────────────────
  if (isUltra) {
    return (
      <section id="rezervare" className="py-28 md:py-36 bg-[#0C0C0E]">
        <div className="max-w-5xl mx-auto px-6">
          <UltraHeading
            eyebrow="Rezervare"
            title={headingTitle}
            subtitle={headingSubtitle}
            align="center"
            className="mb-16"
          />

          {view === "options" ? (
            <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08]">
              {options.map((opt) => {
                const inner = (
                  <>
                    <span className="w-14 h-14 flex items-center justify-center border border-gold-soft text-gold transition-colors group-hover:border-gold">
                      {opt.icon}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-light tracking-wide text-white transition-colors group-hover:text-gold">{opt.title}</h3>
                      <p className="mt-1.5 text-sm text-white/45 font-light">{opt.desc}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-gold-70">
                      Continuă
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: "var(--gold)" }} />
                  </>
                );
                const cls = "group relative bg-[#0C0C0E] p-9 flex flex-col gap-5 hover:bg-[#101012] transition-colors duration-500 text-left";
                return opt.onClick ? (
                  <button key={opt.key} onClick={opt.onClick} className={cls}>{inner}</button>
                ) : (
                  <a key={opt.key} href={opt.href} target={opt.external ? "_blank" : undefined} rel={opt.external ? "noopener noreferrer" : undefined} className={cls}>{inner}</a>
                );
              })}
            </Reveal>
          ) : (
            <Reveal className="max-w-lg mx-auto">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-16 gap-6">
                  <div className="w-14 h-14 flex items-center justify-center border border-gold-soft">
                    <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-light tracking-wide text-white mb-2">Mesaj trimis</h3>
                    <p className="text-white/45 font-light">Vă vom contacta în cel mai scurt timp.</p>
                  </div>
                  <button onClick={() => { setSubmitted(false); setView("options"); }} className="text-[11px] tracking-[0.3em] uppercase text-gold-70 hover:text-gold transition-colors">
                    ← Înapoi la opțiuni
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={() => setView("options")} className="mb-10 text-[11px] tracking-[0.3em] uppercase text-white/35 hover:text-gold transition-colors flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M11 6l-6 6 6 6" />
                    </svg>
                    Înapoi
                  </button>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-9">
                    <label className="block">
                      <span className="block text-[10px] tracking-[0.35em] uppercase text-gold-70 mb-3">Nume *</span>
                      <input name="name" type="text" required className="um-input w-full py-2 text-base" placeholder="Ion Popescu" />
                    </label>
                    <label className="block">
                      <span className="block text-[10px] tracking-[0.35em] uppercase text-gold-70 mb-3">Telefon *</span>
                      <input name="phone" type="tel" required className="um-input w-full py-2 text-base" placeholder="0722 000 000" />
                    </label>
                    {showDates && (isAccommodation ? (
                      <div className="grid grid-cols-2 gap-6">
                        <label className="block">
                          <span className="block text-[10px] tracking-[0.35em] uppercase text-gold-70 mb-3">Check-in</span>
                          <input name="checkin" type="date" className="um-input um-date w-full py-2 text-base" />
                        </label>
                        <label className="block">
                          <span className="block text-[10px] tracking-[0.35em] uppercase text-gold-70 mb-3">Check-out</span>
                          <input name="checkout" type="date" className="um-input um-date w-full py-2 text-base" />
                        </label>
                      </div>
                    ) : (
                      <label className="block">
                        <span className="block text-[10px] tracking-[0.35em] uppercase text-gold-70 mb-3">Data preferată</span>
                        <input name="date" type="date" className="um-input um-date w-full py-2 text-base" />
                      </label>
                    ))}
                    <label className="block">
                      <span className="block text-[10px] tracking-[0.35em] uppercase text-gold-70 mb-3">Mesaj *</span>
                      <textarea name="message" required rows={3} className="um-input w-full py-2 text-base resize-none" placeholder={messagePlaceholder} />
                    </label>
                    <button type="submit" disabled={loading} className={`self-start inline-flex items-center gap-2.5 text-on-primary font-medium tracking-[0.15em] uppercase text-sm px-9 py-4 ${btnRadius} transition-all hover:shadow-[0_0_30px_-5px_var(--gold)] disabled:opacity-60`} style={{ backgroundColor: "var(--gold)" }}>
                      {loading ? "Se trimite..." : submitLabel}
                    </button>
                  </form>
                </>
              )}
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  // ─── Classic / Nature / Dark / Bold ─────────────────────────────────────────
  const sectionCls = isBold
    ? "py-20 bg-black"
    : isDark
    ? "py-20 bg-gray-950"
    : isNature
    ? "py-20"
    : "py-20 bg-gray-50";
  const sectionStyle = isNature ? { backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG } : undefined;

  const headingCls = isBold
    ? "text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-widest"
    : isDark
    ? "text-3xl md:text-4xl font-bold text-white mb-4"
    : "text-3xl md:text-4xl font-bold text-gray-900 mb-4";
  const subtitleCls = isDark ? "text-gray-400 max-w-xl mx-auto" : "text-gray-500 max-w-xl mx-auto";

  const natureBlobRadius = "63% 37% 54% 46% / 55% 48% 52% 45%";
  const iconContainerCls = isBold ? "w-11 h-11 flex items-center justify-center text-on-primary shrink-0 rounded-none" : "w-11 h-11 flex items-center justify-center text-on-primary shrink-0 rounded-xl";

  const cardBase = isBold
    ? "group border-l-4 bg-zinc-900 p-6 flex flex-col gap-4 hover:bg-zinc-800 transition-colors text-left w-full"
    : isDark
    ? "group border border-gray-700/50 bg-gray-800/60 rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-500 transition-colors text-left w-full"
    : isNature
    ? "group border border-nature-soft bg-white rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow text-left w-full"
    : "group border border-gray-100 bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow text-left w-full";

  const titleCls = isBold
    ? "font-bold text-white uppercase tracking-wide"
    : isDark
    ? "font-semibold text-white"
    : "font-semibold text-gray-900";
  const descCls = isDark ? "text-sm text-gray-400" : "text-sm text-gray-500";

  const formCardCls = isBold
    ? "border-l-4 bg-zinc-900 p-8"
    : isDark
    ? "border border-gray-700/50 bg-gray-800/60 rounded-2xl p-8"
    : isNature
    ? "border border-nature-soft bg-white rounded-3xl p-8"
    : "bg-white rounded-2xl p-8 shadow-sm";

  const labelCls = isDark
    ? "block text-sm font-medium text-gray-300 mb-1"
    : "block text-sm font-medium text-gray-700 mb-1";
  const inputCls = isDark
    ? `w-full border border-gray-700 bg-gray-900 ${inputRadius} px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-shadow`
    : `w-full border border-gray-200 ${inputRadius} px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 transition-shadow`;

  const renderCard = (opt: Option) => {
    const cardStyle = isBold ? { borderLeftColor: business.primaryColor } : undefined;
    const iconStyle = isNature ? { backgroundColor: business.primaryColor, borderRadius: natureBlobRadius } : { backgroundColor: business.primaryColor };
    const inner = (
      <>
        <div className={iconContainerCls} style={iconStyle}>{opt.icon}</div>
        <div className="flex-1">
          <p className={titleCls}>{opt.title}</p>
          <p className={`${descCls} mt-0.5`}>{opt.desc}</p>
        </div>
        <svg className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: business.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </>
    );
    return opt.onClick ? (
      <button key={opt.key} onClick={opt.onClick} className={cardBase} style={cardStyle}>{inner}</button>
    ) : (
      <a key={opt.key} href={opt.href} target={opt.external ? "_blank" : undefined} rel={opt.external ? "noopener noreferrer" : undefined} className={cardBase} style={cardStyle}>{inner}</a>
    );
  };

  return (
    <section id="rezervare" className={sectionCls} style={sectionStyle}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={headingCls}>{headingTitle}</h2>
          <p className={subtitleCls}>{headingSubtitle}</p>
        </div>

        {view === "options" ? (
          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {options.map(renderCard)}
          </Reveal>
        ) : (
          <Reveal className="max-w-lg mx-auto">
            <div className={formCardCls} style={isBold ? { borderLeftColor: business.primaryColor } : undefined}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-on-primary" style={{ backgroundColor: business.primaryColor }}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={isDark ? "text-xl font-semibold text-white mb-1" : "text-xl font-semibold text-gray-900 mb-1"}>Mesaj trimis!</h3>
                    <p className="text-gray-500 text-sm">Vă vom contacta în cel mai scurt timp.</p>
                  </div>
                  <button onClick={() => { setSubmitted(false); setView("options"); }} className="text-sm font-medium hover:underline" style={{ color: business.primaryColor }}>
                    ← Înapoi la opțiuni
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={() => setView("options")} className="mb-6 text-sm font-medium flex items-center gap-1.5 hover:underline" style={{ color: business.primaryColor }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M11 6l-6 6 6 6" />
                    </svg>
                    Înapoi
                  </button>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className={labelCls}>Numele dumneavoastră *</label>
                      <input name="name" type="text" required className={inputCls} style={{ ["--tw-ring-color" as string]: business.primaryColor }} placeholder="Ion Popescu" />
                    </div>
                    <div>
                      <label className={labelCls}>Număr de telefon *</label>
                      <input name="phone" type="tel" required className={inputCls} placeholder="0722 000 000" />
                    </div>
                    {showDates && (isAccommodation ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Check-in</label>
                          <input name="checkin" type="date" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Check-out</label>
                          <input name="checkout" type="date" className={inputCls} />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className={labelCls}>Data preferată</label>
                        <input name="date" type="date" className={inputCls} />
                      </div>
                    ))}
                    <div>
                      <label className={labelCls}>Mesaj *</label>
                      <textarea name="message" required rows={4} className={`${inputCls} resize-none`} placeholder={messagePlaceholder} />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full text-on-primary font-semibold py-3 ${btnRadius} transition-opacity hover:opacity-90 mt-2 disabled:opacity-60`}
                      style={{ backgroundColor: business.primaryColor }}
                    >
                      {loading ? "Se trimite..." : submitLabel}
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
