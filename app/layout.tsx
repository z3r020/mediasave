import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "MediaSave - Free Online Media Tools",
    template: "%s | MediaSave",
  },
  description:
    "MediaSave provides free online tools to convert, compress, and process video, audio, and image files.",
  keywords: [
    "online media tools",
    "video converter",
    "audio converter",
    "image converter",
    "video compressor",
    "free file converter",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://mediasave-omega.vercel.app"
  ),
  verification: {
    google: "m1X44tBm395liU-b9IerpIPJceWLIPEqLAA6aS8LAc4",
  },
  openGraph: {
    title: "MediaSave - Free Online Media Tools",
    description:
      "Free online tools to convert, compress, and process video, audio, and image files.",
    type: "website",
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
