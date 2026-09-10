import type { Metadata } from "next";
import PlatformDownloader from "@/components/PlatformDownloader";

export const metadata: Metadata = {
  title: "Instagram Video Downloader",
  description:
    "Check Instagram video URLs with MediaSave. Only download or process content you own or have permission to use.",
  alternates: {
    canonical: "/instagram-video-downloader",
  },
};

export default function InstagramVideoDownloaderPage() {
  return (
    <PlatformDownloader
      platform="Instagram"
      description="Check an Instagram video URL and use MediaSave tools for content you own or have permission to process."
      placeholder="https://www.instagram.com/reel/..."
    />
  );
}
