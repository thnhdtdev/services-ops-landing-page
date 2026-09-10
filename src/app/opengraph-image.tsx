import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

export const alt = "Phần mềm quản lý tiệm giặt. Tiệm gọn gàng. Ngày nhẹ nhàng.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(
    join(process.cwd(), "src/assets/fonts/BeVietnamPro-Medium.ttf"),
  );
  const logo = await readFile(join(process.cwd(), "public/images/logo.png"));
  const logoSource = "data:image/png;base64," + logo.toString("base64");
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "64px 76px",
        background: "#edf4ff",
        color: "#10233f",
        fontFamily: "Vietnam",
        fontWeight: 500,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 46,
          color: "#075ee5",
          marginBottom: 48,
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* ImageResponse embeds the local logo as an inline image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSource}
          alt=""
          width={76}
          height={76}
          style={{ borderRadius: 19 }}
        />
        {site.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 66,
          lineHeight: 1.3,
          letterSpacing: -3,
        }}
      >
        Tiệm gọn gàng.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 66,
          lineHeight: 1.3,
          letterSpacing: -3,
          color: "#075ee5",
        }}
      >
        Ngày nhẹ nhàng.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 25,
          color: "#566579",
          marginTop: 38,
        }}
      >
        Phần mềm quản lý dành cho tiệm giặt Việt.
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Vietnam", data: font, style: "normal", weight: 500 }],
    },
  );
}
