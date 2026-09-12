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
    <>
      <PlatformDownloader
        platform="YouTube"
        description="Paste a YouTube video URL and use MediaSave tools for videos you own or have permission to process."
        placeholder="https://www.youtube.com/watch?v=..."
      />

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/10 p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold">
            YouTube Video Downloader Online with MediaSave
          </h2>
          <p className="mt-4 text-gray-600">
            MediaSave provides a simple way to check supported YouTube video
            URLs before processing authorized content. Paste a YouTube link
            above and use the available MediaSave workflow for videos you own or
            have permission to use.
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
