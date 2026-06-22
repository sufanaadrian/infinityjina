import { ImageResponse } from "next/og";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { business } from "@/config/business";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

function publicImageToDataUrl(urlPath: string | undefined): string | null {
  if (!urlPath) return null;
  const cleanPath = urlPath.split("?")[0].split("#")[0];
  const filePath = path.join(process.cwd(), "public", cleanPath);
  if (!existsSync(filePath)) return null;
  try {
    const buf = readFileSync(filePath);
    const ext = path.extname(cleanPath).slice(1).toLowerCase();
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default function Icon() {
  const primary = business.primaryColor || "#4a6741";
  const letter = (business.name || "?").replace(/[^a-zA-Z0-9]/g, "")[0]?.toUpperCase() ?? "?";

  const imageSrc =
    publicImageToDataUrl(business.logoUrl) ??
    publicImageToDataUrl(business.heroImageUrl) ??
    null;

  return new ImageResponse(
    imageSrc ? (
      <img
        src={imageSrc}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
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
