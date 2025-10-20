import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Pacifico } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

// === Font Setup ===
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
});

/* === 💖 Metadata SEO + OpenGraph Final === */
export const metadata: Metadata = {
  metadataBase: new URL("https://pawpawthecutest.art"),
  title: " PAWPAW ",
  description:
    "Welcome to Candy Land 🍭 — Home of PAWPAW, the cutest meme coin in the Solana universe. Join a community powered by love, creativity, and fun! ✨",
  keywords: [
    "Cutest Coin",
    "Crypto Community",
    "Solana Meme Token",
    "PAWPAW Coin",
    "Candy Land Crypto",
  ],
  authors: [{ name: "PAWPAW Team", url: "https://pawpawthecutest.art" }],
  creator: "PAWPAW",
  publisher: "PAWPAW",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/emas.png", type: "image/png", sizes: "32x32" },
      { url: "/images/pawbulat.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/images/emas.png"],
  },
  openGraph: {
    title: "🐾 PAWPAW — The Cutest Meme Coin 💖",
    description:
      "Step into Candy Land 🍬 and discover PAWPAW — the meme coin that spreads happiness and love across the Solana universe!",
    url: "https://pawpawthecutest.art",
    siteName: "PAWPAW" ,
    images: [
      {
        url: "/images/bannerpaw1.png",
        width: 1200,
        height: 630,
        alt: "PAWPAW Banner — The Cutest Coin in the Solana Universe",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🐾 PAWPAW Coin — The Cutest Coin in the Solana Universe 💖",
    description:
      "Join the cutest community in Candy Land — powered by love, creativity, and fun! 🍭✨",
    images: ["/images/bannerpaw1.png"],
    creator: "@pawthecutest",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>

        {/* === 🧠 Structured Data JSON-LD for Google SEO === */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PAWPAW",
              url: "https://pawpawthecutest.art",
              logo: "https://pawpawthecutest.art/images/emas.png",
              sameAs: [
                "https://x.com/pawthecutest",
                "https://pawpawthecutest.art",
              ],
              description:
                "🐾 PAWPAW — The Cutest Meme Coin in the Solana Universe 💖. Join the cutest community in Candy Land, powered by love, creativity, and fun! 🍭✨",
              foundingDate: "2025",
              founder: {
                "@type": "Person",
                name: "PAWPAW Team",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "Worldwide",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Community",
                url: "https://pawpawthecutest.art",
              },
              image: [
                "https://pawpawthecutest.art/images/bannerpaw1.png",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
