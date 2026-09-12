import type { Metadata } from "next";
import PlatformDownloader from "@/components/PlatformDownloader";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Instagram Video Downloader Online",
  description:
    "Download Instagram videos online with MediaSave. Paste a supported Instagram Reel or video URL and process content you own or have permission to use.",
  keywords: [
    "Instagram video downloader",
    "download Instagram video",
    "Instagram downloader online",
    "Instagram video download",
  ],
  alternates: {
    canonical: "/instagram-video-downloader",
  },
};

export default function InstagramVideoDownloaderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Video Downloader", url: "/video-url-downloader" },
          { name: "Instagram Video Downloader", url: "/instagram-video-downloader" },
        ]}
      />

      <FaqSchema
        faqs={[
          {
            question: "What URLs can I use?",
            answer: "Use a supported Instagram video or Reel URL. Availability depends on the platform and its permitted access methods.",
          },
          {
            question: "Do I need an account?",
            answer: "No MediaSave account is required for this workflow.",
          },
          {
            question: "Can I download any Instagram video?",
            answer: "Only download or process content you own or have permission to use. Copyright and platform rules still apply.",
          }
        ]}
      />

      <PlatformDownloader
        platform="Instagram"
        description="Paste a Instagram video URL and use MediaSave tools for content you own or have permission to process."
        placeholder="https://www.instagram.com/reel/..."
      />

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/10 p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold">
            Instagram Video Downloader Online with MediaSave
          </h2>

          <p className="mt-4 text-gray-600">
            MediaSave provides a simple way to check supported Instagram video URLs
            before processing authorized content. Paste a Instagram video link
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

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="mt-5 space-y-3">
          <details className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <summary className="cursor-pointer font-semibold">What URLs can I use?</summary>
            <p className="mt-3 text-sm leading-6 text-slate-400">Use a supported Instagram video or Reel URL. Availability depends on the platform and its permitted access methods.</p>
          </details>
          <details className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <summary className="cursor-pointer font-semibold">Do I need an account?</summary>
            <p className="mt-3 text-sm leading-6 text-slate-400">No MediaSave account is required for this workflow.</p>
          </details>
          <details className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <summary className="cursor-pointer font-semibold">Can I download any Instagram video?</summary>
            <p className="mt-3 text-sm leading-6 text-slate-400">Only download or process content you own or have permission to use. Copyright and platform rules still apply.</p>
          </details>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="text-2xl font-bold">More Video Downloaders</h2>

        <ul className="mt-5 space-y-3">
            <li>
              <a href="/tiktok-video-downloader" className="text-sky-400 hover:underline">TikTok Video Downloader</a>
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
