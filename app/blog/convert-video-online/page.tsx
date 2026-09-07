import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Convert a Video Online",
  description:
    "Learn how to convert your own video files online to MP4, WEBM, or MOV and choose the right video format for your needs.",
  alternates: {
    canonical: "/blog/convert-video-online",
  },
};

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
        ← Back to Blog
      </Link>

      <h1 className="mt-6 text-4xl font-black">
        How to Convert a Video Online
      </h1>

      <p className="mt-4 text-slate-400">
        Converting a video can make it easier to share, upload, edit, or play
        on different devices. MediaSave provides a simple way to process your
        own video files online.
      </p>

      <div className="mt-10 space-y-8 text-slate-300 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-white">
            Why convert a video?
          </h2>
          <p className="mt-3">
            Different devices and applications support different video
            formats. MP4 is widely supported, while WEBM can be useful for web
            content and MOV is commonly used in Apple-related workflows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            How to convert a video with MediaSave
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Open the MediaSave video converter.</li>
            <li>Select the video file you own or have permission to process.</li>
            <li>Choose MP4, WEBM, or MOV as the output format.</li>
            <li>Start the conversion and save the resulting file.</li>
          </ol>

          <p className="mt-5">
            You can start here:{" "}
            <Link
              href="/video-downloader"
              className="text-white underline"
            >
              Free Online Video Converter
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Which video format should you choose?
          </h2>
          <p className="mt-3">
            Choose MP4 when broad compatibility is your priority. Choose WEBM
            when the video is intended primarily for modern web use. MOV can
            be useful when working with software and workflows that prefer
            Apple video formats.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Tips for better video conversion
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Keep the original file until you verify the converted copy.</li>
            <li>Use a format supported by your target device or application.</li>
            <li>Avoid unnecessary repeated conversions because quality can be lost.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">
            Related Articles
          </h2>

          <ul className="mt-5 space-y-3">
            <li><a href="/blog/compress-video" className="text-sky-400 hover:underline">How to Compress Video Online</a></li>
            <li><a href="/blog/reduce-video-file-size" className="text-sky-400 hover:underline">How to Reduce Video File Size</a></li>
            <li><a href="/blog/mp4-vs-webm" className="text-sky-400 hover:underline">MP4 vs WEBM: Which Video Format Is Better?</a></li>
            <li><a href="/video-downloader" className="text-sky-400 hover:underline">Free Online Video Converter</a></li>
          </ul>
        </section>

      </div>
    </article>
  );
}
