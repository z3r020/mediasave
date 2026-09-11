import type { Metadata } from "next";
import UrlVideoDownloader from "@/components/UrlVideoDownloader";

export const metadata: Metadata = {
  title: "Video Downloader Online",
  description:
    "Download supported videos online by URL with MediaSave. Paste a video URL to check and process content you own or have permission to use.",
  keywords: [
    "video downloader",
    "video downloader online",
    "download video by URL",
    "online video downloader",
    "video URL downloader",
  ],
  alternates: {
    canonical: "/video-url-downloader",
  },
};

export default function VideoUrlDownloaderPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-300">
          VIDEO DOWNLOADER
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
          Download Videos
          <br />
          <span className="text-cyan-400">From a URL</span>
        </h1>

        <p className="mt-5 text-slate-400">
          Paste a supported video URL and download or process your video with
          MediaSave.
        </p>
      </div>

      <UrlVideoDownloader />

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold">More MediaSave Tools</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Explore more free online media tools from MediaSave.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href="/tiktok-video-downloader"
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/30"
          >
            <h3 className="font-semibold">TikTok Video Downloader</h3>
            <p className="mt-2 text-sm text-slate-400">
              Download supported TikTok videos from a URL.
            </p>
          </a>

          <a
            href="/instagram-video-downloader"
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/30"
          >
            <h3 className="font-semibold">Instagram Video Downloader</h3>
            <p className="mt-2 text-sm text-slate-400">
              Process supported Instagram videos and Reels.
            </p>
          </a>

          <a
            href="/youtube-video-downloader"
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/30"
          >
            <h3 className="font-semibold">YouTube Video Downloader</h3>
            <p className="mt-2 text-sm text-slate-400">
              Process supported YouTube video URLs.
            </p>
          </a>

          <a
            href="/video-downloader"
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/30"
          >
            <h3 className="font-semibold">Video Converter</h3>
            <p className="mt-2 text-sm text-slate-400">
              Convert video files between supported formats.
            </p>
          </a>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold">Video Downloader FAQ</h2>

        <div className="mt-5 space-y-3">
          <details className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <summary className="cursor-pointer font-semibold">
              What URLs can I use?
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              MediaSave can check supported video URLs. Availability depends
              on the platform and its permitted access methods.
            </p>
          </details>

          <details className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <summary className="cursor-pointer font-semibold">
              Do I need an account?
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              No MediaSave account is required for this workflow.
            </p>
          </details>

          <details className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <summary className="cursor-pointer font-semibold">
              Can I download any video?
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Only download or process content you own or have permission to
              use. Copyright and platform rules still apply.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
