import type { Metadata } from "next";
import PlatformDownloader from "@/components/PlatformDownloader";

export const metadata: Metadata = {
  title: "YouTube Video Downloader",
  description:
    "Check YouTube video URLs with MediaSave. Only download or process videos you own or have permission to use.",
  alternates: {
    canonical: "/youtube-video-downloader",
  },
};

export default function YouTubeVideoDownloaderPage() {
  return (
    <PlatformDownloader
      platform="YouTube"
      description="Check a YouTube video URL and use MediaSave tools for content you own or have permission to process."
      placeholder="https://www.youtube.com/watch?v=..."
    />
  );
}
