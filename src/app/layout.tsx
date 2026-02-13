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

export const metadata = {
  title: "Freelance Rate Calculator India – Stop Underpricing Your Work",
  description:
    "Free freelance rate calculator to find your ideal hourly and project pricing based on income goals, working days, and safety buffer.",
  openGraph: {
    title: "Freelance Rate Calculator – Stop Underpricing Your Work",
    description:
      "Free freelance rate calculator to find your ideal hourly and project pricing based on income goals and working capacity.",
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
    title: "Freelance Rate Calculator – Stop Underpricing Your Work",
    description:
      "Find your ideal freelance hourly rate and project price instantly.",
    images: ["/og-image.png"],
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
