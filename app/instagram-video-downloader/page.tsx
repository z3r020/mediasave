import type { Metadata } from "next";
import PlatformDownloader from "@/components/PlatformDownloader";

export const metadata: Metadata = {
  title: "Instagram Video Downloader Online",
  description:
    "Download Instagram videos online with MediaSave. Paste a supported Instagram Reel or video URL and process content you own or have permission to use.",
  keywords: [
    "Instagram video downloader",
    "download Instagram video",
    "Instagram downloader online",
    "Instagram Reel downloader",
  ],
  alternates: {
    canonical: "/instagram-video-downloader",
  },
};

export default function InstagramVideoDownloaderPage() {
  return (
    <PlatformDownloader
      platform="Instagram"
      description="Paste an Instagram video or Reel URL and use MediaSave tools for content you own or have permission to process."
      placeholder="https://www.instagram.com/reel/..."
    />
  );
}
