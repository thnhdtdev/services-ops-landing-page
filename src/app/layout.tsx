import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { site } from "@/data/site";
import "./scrollcraft.css";
import "./globals.css";

// Self-hosted at build time and split by unicode-range, so a phone on 4G only
// downloads the Vietnamese and Latin slices it needs.
const vietnam = Be_Vietnam_Pro({
  variable: "--font-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = `${site.name} | Phần mềm quản lý tiệm giặt sấy, vệ sinh giày`;

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  metadataBase: new URL(site.url || "http://localhost:3000"),
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
  openGraph: {
    title,
    description: site.description,
    siteName: site.name,
    locale: "vi_VN",
    type: "website",
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: Boolean(site.url), follow: Boolean(site.url) },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={vietnam.variable}>
      <body>
        {/* Without the engine every cue stays at opacity 0. Show the opening
            screen and the closing sections, which carry the whole offer. */}
        <noscript>
          <style>{`.tiem{height:auto!important}.stage{position:relative!important}.beat--hero,.old__copy--hero,[data-sc-in],[data-sc-stagger]>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
