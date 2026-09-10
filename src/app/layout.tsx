import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import "./globals.css";

const vietnam = localFont({
  variable: "--font-vietnam",
  src: [
    {
      path: "../assets/fonts/BeVietnamPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/BeVietnamPro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/BeVietnamPro-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/BeVietnamPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

const title = `${site.name} | Phần mềm quản lý tiệm giặt`;

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
  themeColor: "#f8faff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${vietnam.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
