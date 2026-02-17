import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hok-draft.web.id/"),
  title: {
    default: "Honor of Kings Draft Simulator | hok-draft.web.id",
    template: "%s | Honor of Kings Draft Simulator",
  },
  description:
    "Master your Honor of Kings drafting strategy with our comprehensive simulation tools. Create tier lists, analyze heroes, and practice different draft formats.",
  keywords: [
    "Honor of Kings",
    "draft simulator",
    "tier list maker",
    "HOK draft",
    "mobile MOBA",
    "esports strategy",
    "hero drafting",
    "HOK",
    "Honor of Kings Global",
  ],
  authors: [{ name: "hok-draft.web.id" }],
  creator: "hok-draft.web.id",
  publisher: "hok-draft.web.id",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Honor of Kings Draft Simulator | hok-draft.web.id",
    description:
      "Master your Honor of Kings drafting strategy with our comprehensive simulation tools. Create tier lists, analyze heroes, and practice different draft formats.",
    url: "https://www.hok-draft.web.id/",
    siteName: "Honor of Kings Draft Simulator",
    images: [
      {
        url: "/146-bigskin-8.png",
        width: 1200,
        height: 630,
        alt: "Honor of Kings Draft Simulator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Honor of Kings Draft Simulator | hok-draft.web.id",
    description:
      "Master your Honor of Kings drafting strategy with our comprehensive simulation tools. Create tier lists, analyze heroes, and practice different draft formats.",
    images: ["/146-bigskin-8.png"],
    creator: "@hok_draft",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.hok-draft.web.id/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Honor of Kings Draft Simulator",
    url: "https://www.hok-draft.web.id/",
    description: "Draft simulator and tier list maker for Honor of Kings",
    applicationCategory: "GameApplication",
    genre: "MOBA Strategy",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`antialiased bg-d-primary text-white`}>
        <TooltipProvider>
          <div>
            <Navbar />
            <div className="mx-2 lg:mx-20">{children}</div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
