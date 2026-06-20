import { ImageResponse } from "next/og";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { business } from "@/config/business";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const primary = business.primaryColor || "#4a6741";
  const letter = (business.name || "?").replace(/[^a-zA-Z0-9]/g, "")[0]?.toUpperCase() ?? "?";

  let logoSrc: string | null = null;
  if (business.logoUrl) {
    const filePath = path.join(process.cwd(), "public", business.logoUrl);
    if (existsSync(filePath)) {
      try {
        const buf = readFileSync(filePath);
        const ext = path.extname(business.logoUrl).slice(1).toLowerCase();
        const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;
        logoSrc = `data:${mime};base64,${buf.toString("base64")}`;
      } catch {}
    }
  }

  return new ImageResponse(
    logoSrc ? (
      <img
        src={logoSrc}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: primary,
          borderRadius: "6px",
          fontSize: 20,
          fontWeight: 700,
          color: "#ffffff",
        }}
      >
        {letter}
      </div>
    ),
    { ...size }
  );
}
