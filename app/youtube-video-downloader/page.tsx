import type { Metadata } from "next";
import PlatformDownloader from "@/components/PlatformDownloader";

export const metadata: Metadata = {
  title: "YouTube Video Downloader Online",
  description:
    "Download supported YouTube videos online with MediaSave. Paste a YouTube video URL and process content you own or have permission to use.",
  keywords: [
    "YouTube video downloader",
    "download YouTube video",
    "YouTube downloader online",
    "YouTube video download",
  ],
  alternates: {
    canonical: "/youtube-video-downloader",
  },
};

export default function YouTubeVideoDownloaderPage() {
  return (
    <PlatformDownloader
      platform="YouTube"
      description="Paste a YouTube video URL and use MediaSave tools for videos you own or have permission to process."
      placeholder="https://www.youtube.com/watch?v=..."
    />
  );
}
