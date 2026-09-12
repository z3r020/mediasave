import type { Metadata } from "next";
import PlatformDownloader from "@/components/PlatformDownloader";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FaqSchema from "@/components/FaqSchema";

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
  openGraph: {
    title: "TikTok Video Downloader Online",
    description:
      "Download TikTok videos online with MediaSave. Paste a supported TikTok video URL and process content you own or have permission to use.",
    url: "/tiktok-video-downloader",
    siteName: "MediaSave",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TikTok Video Downloader Online",
    description:
      "Download TikTok videos online with MediaSave. Paste a supported TikTok video URL and process content you own or have permission to use.",
  },
};

export default function TikTokVideoDownloaderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Video Downloader", url: "/video-url-downloader" },
          { name: "TikTok Video Downloader", url: "/tiktok-video-downloader" },
        ]}
      />

      <FaqSchema
        faqs={
          [
            {
              question: "Is this TikTok downloader free?",
              answer:
                "MediaSave provides free online media tools. Availability of actual platform downloads depends on supported and permitted processing methods.",
            },
            {
              question: "Can I download any TikTok video?",
              answer:
                "You should only download or process content that you own or have permission to use. Platform terms and copyright rules may apply.",
            },
            {
              question: "Does MediaSave store my TikTok videos?",
              answer:
                "MediaSave is designed around processing user-authorized media. Do not submit content unless you have the necessary rights or permission.",
            },
          ]
        }
      />

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
            Need to convert a video file instead? Use the
            <a
              href="/video-downloader"
              className="font-semibold underline underline-offset-4"
            >
              Video Converter
            </a>
            to process your own video files.
          </p>

          <p className="mt-4 text-gray-600">
            For other supported video URLs, use the
            <a
              href="/video-url-downloader"
              className="font-semibold underline underline-offset-4"
            >
              general video downloader
            </a>.
          </p>
        </div>
      </section>
<section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="text-2xl font-bold">More Video Downloaders</h2>

        <ul className="mt-5 space-y-3">
            <li>
              <a href="/instagram-video-downloader" className="text-sky-400 hover:underline">Instagram Video Downloader</a>
            </li>
            <li>
              <a href="/youtube-video-downloader" className="text-sky-400 hover:underline">YouTube Video Downloader</a>
            </li>
            <li>
              <a href="/video-url-downloader" className="text-sky-400 hover:underline">General Video Downloader</a>
            </li>
        </ul>
      </section>
    </>
  );
}
