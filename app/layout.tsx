import React from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import client from "@/tina/__generated__/client";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@/styles.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "E2E Solutions | End-to-End Supply Chain Experts",
  description:
    "E2E Solutions specializes in end-to-end supply chain management, helping businesses optimize operations, reduce costs, and drive efficiency. From procurement to last-mile delivery, we provide tailored solutions that streamline processes and enhance performance.",
  keywords: [
    "supply chain management",
    "supply chain optimization",
    "procurement",
    "inventory management",
    "logistics solutions",
    "distribution solutions",
    "supplier management",
    "demand planning",
    "technology integration",
    "automation",
    "business health-check",
    "strategic sourcing",
    "footprint analysis",
    "footprint optimization",
    "global sourcing",
    "factory layout",
    "green field factory",
    "green field manufacturing",
    "plant relocation",
    "warehouse optimization",
    "end to end supply chain",
  ],
  authors: [{ name: "E2E Solutions" }],
  creator: "E2E Solutions",
  publisher: "E2E Solutions",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://e2esolutions.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "E2E Solutions | End-to-End Supply Chain Experts",
    description:
      "Specialized in end-to-end supply chain management, helping businesses optimize operations, reduce costs, and drive efficiency.",
    url: "https://e2esolutions.com",
    siteName: "E2E Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E2E Solutions | End-to-End Supply Chain Experts",
    description:
      "Specialized in end-to-end supply chain management, helping businesses optimize operations.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
};

export const revalidate = 600;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalQuery = await client.queries.global({
    relativePath: "index.json",
  });
  const global = globalQuery.data.global;

  const selectFont = (fontName: string) => {
    switch (fontName) {
      case "nunito":
        return `font-nunito ${nunito.variable}`;
      case "lato":
        return `font-lato ${lato.variable}`;
      case "sans":
      default:
        return `font-sans ${fontSans.variable}`;
    }
  };
  const fontVariable = selectFont(global.theme?.font || "sans");

  return (
    <html lang="en">
      <head>
        {/* these are also defined in next.config.js but github pages doesn't support response headers */}
        <meta name="X-Frame-Options" content="SAMEORIGIN" />
        <meta name="Content-Security-Policy" content="frame-ancestors 'self'" />
      </head>
      <body
        suppressHydrationWarning
        className={cn("min-h-screen flex flex-col antialiased", fontVariable)}
      >
        {children}

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-CF1KZER35W" />
      </body>
    </html>
  );
}
