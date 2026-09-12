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
    <>
      <PlatformDownloader
        platform="TikTok"
        description="Paste a TikTok video URL and use MediaSave tools for content you own or have permission to process."
        placeholder="https://www.tiktok.com/@username/video/..."
      />

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/10 p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold">
            TikTok Video Downloader Online with MediaSave
          </h2>
          <p className="mt-4 text-gray-600">
            MediaSave provides a simple way to check supported TikTok video URLs
            before processing authorized content. Paste a TikTok video link
            above and use the available MediaSave workflow for content you own
            or have permission to use.
          </p>
          <p className="mt-4 text-gray-600">
            Need to convert a video file instead? Use the{" "}
            <a
              href="/video-downloader"
              className="font-semibold underline underline-offset-4"
            >
              Video Converter
            </a>{" "}
            to process your own video files.
          </p>
          <p className="mt-4 text-gray-600">
            For other supported video URLs, you can also use the
            <a
              href="/video-url-downloader"
              className="font-semibold underline underline-offset-4"
            >
              general video downloader
            </a>
            page.
          </p>
        </div>
      </section>
    </>
  );
}
