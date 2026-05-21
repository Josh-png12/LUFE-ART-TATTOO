import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { siteConfig } from "@/lib/site-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "LUFE ART TATTOO | Premium Tattoo Studio in Riohacha, Colombia",
    template: "%s | LUFE ART TATTOO"
  },
  description:
    "Luxury tattoo studio in Riohacha, Colombia. Blackwork, fine line, anime, realism, and custom tattoo art crafted as lasting identity pieces.",
  applicationName: "LUFE ART TATTOO",
  category: "art",
  keywords: [
    "tattoo studio",
    "tattoo artist",
    "premium tattoo studio",
    "blackwork tattoo",
    "fine line tattoo",
    "anime tattoo",
    "custom tattoo art",
    "tattoo design",
    "Riohacha tattoo studio",
    "tattoo studio Colombia"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "LUFE ART TATTOO",
    description:
      "Cinematic tattoo artistry from Riohacha, Colombia. Dark luxury, precise execution, custom identity-driven pieces.",
    url: siteConfig.url,
    siteName: "LUFE ART TATTOO",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/brand/logo.jpeg",
        width: 1200,
        height: 1200,
        alt: "LUFE ART TATTOO logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "LUFE ART TATTOO",
    description:
      "Premium tattoo studio experience focused on blackwork, fine line, anime, realism, and custom identity-led art.",
    images: ["/images/brand/logo.jpeg"]
  },
  icons: {
    icon: "/images/brand/logo.jpeg",
    shortcut: "/images/brand/logo.jpeg",
    apple: "/images/brand/logo.jpeg"
  },
  themeColor: "#000000",
  robots: {
    index: true,
    follow: true
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "LUFE ART TATTOO",
  image: `${siteConfig.url}/images/brand/logo.jpeg`,
  url: siteConfig.url,
  telephone: siteConfig.whatsappDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riohacha",
    addressRegion: "La Guajira",
    addressCountry: "CO"
  },
  areaServed: ["Riohacha", "Colombia", "International"],
  sameAs: [siteConfig.instagramUrl],
  description:
    "Premium tattoo studio offering blackwork, fine line, anime, realism, and custom tattoo art in Riohacha, Colombia.",
  priceRange: "$$"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
