import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mediasave-omega.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "MediaSave - Free Online Media Tools",
    template: "%s | MediaSave",
  },

  description:
    "Free online video converter, audio converter, image converter, and video compressor. Process your own media files with MediaSave.",

  keywords: [
    "free online media tools",
    "video converter",
    "online video converter",
    "audio converter",
    "online audio converter",
    "image converter",
    "online image converter",
    "video compressor",
    "compress video online",
    "free file converter",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "m1X44tBm395liU-b9IerpIPJceWLIPEqLAA6aS8LAc4",
  },

  openGraph: {
    title: "MediaSave - Free Online Media Tools",
    description:
      "Free online tools to convert, compress, and process your own video, audio, and image files.",
    type: "website",
    url: siteUrl,
    siteName: "MediaSave",
  },

  twitter: {
    card: "summary",
    title: "MediaSave - Free Online Media Tools",
    description:
      "Free online video, audio, image conversion and video compression tools.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
