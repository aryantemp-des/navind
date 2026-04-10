import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScrolling from "@/components/SmoothScrolling";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#5906b29e",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://navyatech.co.in"),
  title: {
    default: "Navya Tech Industry",
    template: "%s | Navya Tech Industry",
  },
  description: "Your digital presence, built to convert. Fast, modern, and high-converting websites for businesses.",
  alternates: {
    canonical: "https://navyatech.co.in",
  },
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180" }
    ],
  },
  openGraph: {
    title: "Navya Tech Industry | Next-Gen Web Experiences",
    description: "Your digital presence, built to convert. Fast, modern, and high-converting websites.",
    url: "https://navyatech.co.in",
    type: "website",
    images: [
      {
        url: "https://navyatech.co.in/preview.png",
        width: 1200,
        height: 630,
        alt: "Navya Tech Industry Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navya Tech Industry",
    description: "Your digital presence, built to convert.",
    images: ["https://navyatech.co.in/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "X-UA-Compatible": "IE=edge"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          <Navbar />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
