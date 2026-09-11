import type { Metadata } from "next";
import PlatformDownloader from "@/components/PlatformDownloader";

export const metadata: Metadata = {
  title: "TikTok Video Downloader Online",
  description:
    "Download TikTok videos online with MediaSave. Paste a supported TikTok video URL and process content you own or have permission to use.",
  keywords: [
    "TikTok video downloader",
    "download TikTok video",
    "TikTok downloader online",
    "TikTok video download",
  ],
  alternates: {
    canonical: "/tiktok-video-downloader",
  },
};

export default function TikTokVideoDownloaderPage() {
  return (
    <PlatformDownloader
      platform="TikTok"
      description="Paste a TikTok video URL and use MediaSave tools for content you own or have permission to process."
      placeholder="https://www.tiktok.com/@username/video/..."
    />
  );
}
