import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The preview card shown when the link is shared on LinkedIn, WhatsApp, X etc.
export const alt = "Vivek Garg · MERN Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const photo = await readFile(join(process.cwd(), "src/app/og-photo.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 15% 10%, #312e81 0%, #07070c 55%), #07070c",
          color: "#ececf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "flex", fontSize: 28, color: "#22d3ee" }}>{"// portfolio"}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>Vivek Garg</div>
            <div style={{ fontSize: 36, color: "#a5b4fc", marginTop: 8 }}>MERN Stack Developer · Founder @ Dhagaro</div>
          </div>
          <div style={{ display: "flex", gap: 18, fontSize: 26 }}>
            {["950+ DSA problems", "SIH 2nd place", "CGPA 8.45"].map((t) => (
              <div key={t} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, border: "2px solid rgba(255,255,255,0.15)" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 330,
            height: 330,
            borderRadius: 999,
            padding: 8,
            background: "linear-gradient(135deg, #818cf8, #22d3ee, #fbbf24)",
          }}
        >
          <img src={photoSrc} width={314} height={314} style={{ borderRadius: 999, objectFit: "cover" }} alt="" />
        </div>
      </div>
    ),
    size
  );
}
