import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freelance-rate-amber.vercel.app"),

  title: "Stop Underpricing Your Freelance Work | Free Rate Calculator",

  description:
    "Free freelance rate calculator to find your ideal hourly rate and project pricing based on income goals, expenses, and working capacity.",

  keywords: [
    "freelance rate calculator",
    "hourly rate calculator",
    "project pricing tool",
    "freelancer pricing",
    "how much should I charge",
    "freelance hourly rate India",
  ],

  authors: [{ name: "Kishore Devanga Kothavaru" }],

  openGraph: {
    title: "Stop Underpricing Your Freelance Work",
    description:
      "Free calculator to find your ideal freelance hourly rate and project price.",
    url: "https://freelance-rate-amber.vercel.app",
    siteName: "FreelanceRate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Freelance Rate Calculator Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Stop Underpricing Your Freelance Work",
    description:
      "Free calculator to find your ideal freelance hourly rate and project price.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
