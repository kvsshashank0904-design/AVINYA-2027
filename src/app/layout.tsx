import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avinya.iiitdwd.ac.in"),
  title: "AVINYA 2027 — The Techno-Cultural Voyage | IIIT Dharwad",
  description:
    "Embark on an extraordinary, cinematic scroll-driven voyage across the three islands of Avinya 2027: The Last Outpost, Pandemonium, and The Carnival Island. Hosted by IIIT Dharwad on 12-14 March 2027.",
  keywords: [
    "Avinya 2027",
    "IIIT Dharwad",
    "Techno-Cultural Fest",
    "Hack2Future",
    "The Last Outpost",
    "Pandemonium",
    "The Carnival Island",
    "College Fest",
  ],
  authors: [{ name: "IIIT Dharwad" }],
  openGraph: {
    title: "AVINYA 2027 — The Techno-Cultural Voyage | IIIT Dharwad",
    description:
      "A cinematic journey across three extraordinary islands: The Last Outpost, Pandemonium, and The Carnival Island. 12-14 March 2027.",
    url: "https://avinya.iiitdwd.ac.in",
    siteName: "AVINYA 2027",
    images: [
      {
        url: "/images/LastOutpost.png",
        width: 1200,
        height: 630,
        alt: "Avinya 2027 Voyage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${spaceGrotesk.variable} dark antialiased`}
    >
      <body className="bg-[#05070B] text-neutral-100 min-h-screen overflow-x-hidden selection:bg-[#E05A2B]/30 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
