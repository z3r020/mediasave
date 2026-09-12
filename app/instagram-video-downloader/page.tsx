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
    <>
      <PlatformDownloader
        platform="Instagram"
        description="Paste an Instagram video or Reel URL and use MediaSave tools for content you own or have permission to process."
        placeholder="https://www.instagram.com/reel/..."
      />

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/10 p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold">
            Instagram Video Downloader Online with MediaSave
          </h2>
          <p className="mt-4 text-gray-600">
            MediaSave provides a simple way to check supported Instagram video
            and Reel URLs before processing authorized content. Paste an
            Instagram link above and use the available MediaSave workflow for
            content you own or have permission to use.
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
