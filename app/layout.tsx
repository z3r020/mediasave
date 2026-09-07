import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title:{default:"MediaSave — Free Online Media Tools",template:"%s | MediaSave"},
  description:"Fast online tools to convert, compress and process media files.",
  metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  openGraph:{title:"MediaSave",description:"Simple online media tools",type:"website"}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>}