import { RichInline } from "@/components/RichText";
import Reveal from "@/components/Reveal";

// Section header for the Ultramodern variant: a tracked gold eyebrow, a light
// display title, the long gold "————◆————" divider the client asked for, and an
// optional subtitle. `align` lets each section place its header differently so
// the variant doesn't feel templated.
export default function UltraHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <Reveal className={`${isCenter ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <span className="block text-[11px] tracking-[0.5em] uppercase text-gold-70 mb-5">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin tracking-tight text-white leading-[1.05]">
        <RichInline text={title} />
      </h2>
      <div className={`flex items-center gap-3 my-7 ${isCenter ? "justify-center" : ""}`}>
        <span className={`um-divider ${isCenter ? "w-24 md:w-40" : "w-16 md:w-24"}`} />
        <span className="um-divider-node shrink-0" />
        <span className={`um-divider ${isCenter ? "w-24 md:w-40" : "flex-1 max-w-[18rem]"}`} />
      </div>
      {subtitle && (
        <p className={`text-white/45 font-light ${isCenter ? "max-w-xl mx-auto" : "max-w-md"}`}>
          <RichInline text={subtitle} />
        </p>
      )}
    </Reveal>
  );
}
