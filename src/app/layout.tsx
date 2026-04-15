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
    default: "Navya Tech Industry | Next-Gen Web Experiences",
    template: "%s | Navya Tech Industry",
  },
  description: "Your digital presence, built to convert. Fast, modern, and high-converting websites for businesses.",
  alternates: {
    canonical: "https://navyatech.co.in",
  },

  openGraph: {
    title: "Navya Tech Industry | Next-Gen Web Experiences",
    description: "Your digital presence, built to convert. Fast, modern, and high-converting websites.",
    url: "https://navyatech.co.in",
    siteName: "Navya Tech Industry",
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
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon-32x32.png" type="image/png" />
        <link rel="icon" href="/favicon/favicon-16x16.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Navya Tech Industry",
              url: "https://navyatech.co.in",
              logo: "https://navyatech.co.in/favicon/favicon-32x32.png",
              sameAs: [
                "https://www.linkedin.com",
                "https://www.instagram.com"
              ]
            })
          }}
        />
      </head>
      <body>
        <SmoothScrolling>
          <Navbar />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
