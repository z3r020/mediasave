import type { Metadata } from "next";
import PlatformDownloader from "@/components/PlatformDownloader";

export const metadata: Metadata = {
  title: "TikTok Video Downloader",
  description:
    "Check and process TikTok video URLs with MediaSave. Only download or process content you own or have permission to use.",
  alternates: {
    canonical: "/tiktok-video-downloader",
  },
};

export default function TikTokVideoDownloaderPage() {
  return (
    <PlatformDownloader
      platform="TikTok"
      description="Check a TikTok video URL and use MediaSave tools for content you own or have permission to process."
      placeholder="https://www.tiktok.com/@username/video/..."
    />
  );
}
