import { business, getNatureAccentColor } from "@/config/business";
import { RichInline, stripMarkdown } from "@/components/RichText";

function SocialLinks({ className = "" }: { className?: string }) {
  const s = business.socialLinks;
  if (!(s.facebook || s.instagram || s.tiktok)) return null;
  return (
    <div className={`flex gap-4 ${className}`}>
      {s.facebook && (
        <a href={s.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
      )}
      {s.instagram && (
        <a href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
      )}
      {s.tiktok && (
        <a href={s.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-gold transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.93a8.28 8.28 0 004.84 1.54V7.04a4.84 4.84 0 01-1.07-.35z" />
          </svg>
        </a>
      )}
    </div>
  );
}

// ─── Ultramodern — centered editorial sign-off with signature script brand ──
function FooterUltramodern() {
  const year = new Date().getFullYear();
  const plainName = stripMarkdown(business.name);
  const links = [
    business.phone && { label: business.phone, href: `tel:${business.phone.replace(/\s/g, "")}` },
    business.email && { label: business.email, href: `mailto:${business.email}` },
    (business.address || business.city) && {
      label: [business.address, business.city].filter((p) => p.trim()).join(", "),
      href: null,
    },
  ].filter(Boolean) as { label: string; href: string | null }[];

  return (
    <footer className="bg-[#080809] text-white/45 pt-20 pb-12 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <span className="text-[10px] tracking-[0.5em] uppercase text-gold-70 mb-5">
          {stripMarkdown(business.tagline)}
        </span>
        <h3 className="font-script gold-sheen text-5xl md:text-7xl leading-none mb-8">{plainName}</h3>

        <div className="flex items-center gap-3 mb-10">
          <span className="um-divider w-16 md:w-24" />
          <span className="um-divider-node shrink-0" />
          <span className="um-divider w-16 md:w-24" />
        </div>

        {links.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs tracking-[0.2em] uppercase mb-10">
            {links.map((l, i) => (
              <span key={i} className="flex items-center gap-6">
                {i > 0 && <span className="hidden sm:block w-1 h-1 rotate-45 bg-white/20 shrink-0" />}
                {l.href ? (
                  <a href={l.href} className="hover:text-gold transition-colors">{l.label}</a>
                ) : (
                  <span>{l.label}</span>
                )}
              </span>
            ))}
          </div>
        )}

        <SocialLinks className="mb-12 text-white/55" />

        <p className="text-[10px] tracking-[0.3em] uppercase text-white/25">
          © {year} {plainName} · Toate drepturile rezervate
        </p>
      </div>
    </footer>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const plainName = stripMarkdown(business.name);
  const v = business.designVariant ?? "classic";
  const isNature = v === "nature";

  if (v === "ultramodern") return <FooterUltramodern />;

  const sectionCls = isNature
    ? "text-white/60 py-12 border-t-2"
    : "bg-gray-900 text-gray-400 py-12 border-t-2";
  const sectionStyle = isNature
    ? { backgroundColor: getNatureAccentColor() }
    : undefined;

  return (
    <footer className={sectionCls} style={{ borderTopColor: business.primaryColor, ...sectionStyle }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">{plainName}</h3>
            <p className="text-sm leading-relaxed">{stripMarkdown(business.tagline)}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact rapid</h4>
            <ul className="text-sm flex flex-col gap-2">
              {business.phone && (
                <li>
                  <a
                    href={`tel:${business.phone.replace(/\s/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {business.phone}
                  </a>
                </li>
              )}
              {business.email && (
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {business.email}
                  </a>
                </li>
              )}
              {(business.address || business.city) && (
                <li>{[business.address, business.city].filter((p) => p.trim()).join(", ")}</li>
              )}
            </ul>
          </div>
          <div>
            {business.hours && (
              <>
                <h4 className="text-white font-semibold mb-3">Program</h4>
                <p className="text-sm"><RichInline text={business.hours} /></p>
              </>
            )}
            {(business.socialLinks.facebook || business.socialLinks.instagram || business.socialLinks.tiktok) && (
              <div className="flex gap-3 mt-4">
                {business.socialLinks.facebook && (
                  <a
                    href={business.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {business.socialLinks.instagram && (
                  <a
                    href={business.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                )}
                {business.socialLinks.tiktok && (
                  <a
                    href={business.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.93a8.28 8.28 0 004.84 1.54V7.04a4.84 4.84 0 01-1.07-.35z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs">
          © {year} {plainName}. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}
