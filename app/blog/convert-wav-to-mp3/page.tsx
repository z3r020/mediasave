import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Convert WAV to MP3 Online",
  description:
    "Learn how to convert your own WAV audio files to MP3 and understand the differences between WAV and MP3.",
  alternates: {
    canonical: "/blog/convert-wav-to-mp3",
  },
};

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
        ← Back to Blog
      </Link>

      <h1 className="mt-6 text-4xl font-black">
        How to Convert WAV to MP3 Online
      </h1>

      <p className="mt-4 text-slate-400 leading-7">
        WAV files can be large because they are commonly used for high-quality
        audio. Converting a WAV file to MP3 can create a smaller file that is
        easier to store and share.
      </p>

      <div className="mt-10 space-y-8 text-slate-300 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-white">
            WAV vs MP3
          </h2>
          <p className="mt-3">
            WAV is commonly associated with uncompressed or lossless-quality
            audio workflows, while MP3 uses lossy compression to significantly
            reduce file size.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            How to convert WAV to MP3
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Open the MediaSave Audio Converter.</li>
            <li>Select your own WAV file.</li>
            <li>Choose MP3 as the output format.</li>
            <li>Start the conversion and save the result.</li>
          </ol>

          <p className="mt-5">
            Try the{" "}
            <Link
              href="/audio-converter"
              className="text-white underline"
            >
              Free Online Audio Converter
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            When should you keep WAV?
          </h2>
          <p className="mt-3">
            Keep the original WAV when you need maximum editing flexibility or
            want to preserve the source audio for future production work.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">
            Related Articles
          </h2>

          <ul className="mt-5 space-y-3">
            <li><a href="/audio-converter" className="text-sky-400 hover:underline">Free Online Audio Converter</a></li>
            <li><a href="/blog/convert-video-online" className="text-sky-400 hover:underline">How to Convert Video Online</a></li>
            <li><a href="/blog/compress-video" className="text-sky-400 hover:underline">How to Compress Video Online</a></li>
          </ul>
        </section>

      </div>
    </article>
  );
}
