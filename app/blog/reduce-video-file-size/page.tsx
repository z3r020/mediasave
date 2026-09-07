import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Reduce Video File Size",
  description:
    "Learn practical ways to reduce your own video file size, including compression, resolution, bitrate, and format choices.",
  alternates: {
    canonical: "/blog/reduce-video-file-size",
  },
};

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
        ← Back to Blog
      </Link>

      <h1 className="mt-6 text-4xl font-black">
        How to Reduce Video File Size
      </h1>

      <p className="mt-4 text-slate-400 leading-7">
        Large video files can take longer to upload and use more storage.
        Compression can reduce the size of your own videos while keeping a
        practical level of visual quality.
      </p>

      <div className="mt-10 space-y-8 text-slate-300 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-white">
            What makes a video file large?
          </h2>
          <p className="mt-3">
            Video resolution, bitrate, frame rate, codec, and duration all
            affect file size. Higher settings generally require more storage
            space.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Ways to reduce video size
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Compress the video with a balanced quality setting.</li>
            <li>Use a suitable resolution for the final destination.</li>
            <li>Avoid unnecessarily high bitrates.</li>
            <li>Choose an efficient video format when appropriate.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Compress a video with MediaSave
          </h2>
          <p className="mt-3">
            MediaSave provides a simple video compression tool for your own
            files.
          </p>

          <p className="mt-5">
            Open the{" "}
            <Link
              href="/compress-video"
              className="text-white underline"
            >
              Free Online Video Compressor
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Keep the original file
          </h2>
          <p className="mt-3">
            Before replacing a large video with a compressed copy, keep the
            original so you can create another version later if necessary.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">
            Related Articles
          </h2>

          <ul className="mt-5 space-y-3">
            <li><a href="/blog/compress-video" className="text-sky-400 hover:underline">How to Compress Video Online</a></li>
            <li><a href="/blog/convert-video-online" className="text-sky-400 hover:underline">How to Convert Video Online</a></li>
            <li><a href="/blog/mp4-vs-webm" className="text-sky-400 hover:underline">MP4 vs WEBM: Which Video Format Is Better?</a></li>
            <li><a href="/compress-video" className="text-sky-400 hover:underline">Free Online Video Compressor</a></li>
          </ul>
        </section>

      </div>
    </article>
  );
}
