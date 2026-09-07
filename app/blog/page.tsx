import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Media Tools Guides & Tips",
  description:
    "Helpful guides about video conversion, video compression, and image formats from MediaSave.",
  alternates: {
    canonical: "/blog",
  },
};

const posts = [
  {
    href: "/blog/convert-video-online",
    title: "How to Convert a Video Online",
    description:
      "Learn how to convert your own video files to MP4, WEBM, or MOV and choose the right format for different devices and uses.",
  },
  {
    href: "/blog/compress-video",
    title: "How to Compress Video Without Losing Too Much Quality",
    description:
      "Learn how video compression works and how to reduce your own video file size while keeping a practical level of visual quality.",
  },
  {
    href: "/blog/webp-vs-jpg",
    title: "WEBP vs JPG: Which Image Format Should You Use?",
    description:
      "Compare WEBP and JPG, including file size, compatibility, web performance, and when each image format makes sense.",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <header className="max-w-3xl">
        <span className="text-xs font-bold tracking-[0.2em] text-slate-500">
          MEDIASAVE BLOG
        </span>

        <h1 className="mt-3 text-4xl font-black">
          Media Tools Guides & Tips
        </h1>

        <p className="mt-4 text-slate-400 leading-7">
          Practical guides to help you convert videos, compress media files,
          and choose the right image format for your projects.
        </p>
      </header>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.href}
            className="rounded-2xl border border-white/10 bg-white/[.03] p-6"
          >
            <h2 className="text-xl font-bold text-white">
              {post.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {post.description}
            </p>

            <Link
              href={post.href}
              className="mt-5 inline-block text-sm font-semibold text-white underline"
            >
              Read article →
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-2xl border border-white/10 bg-white/[.02] p-6">
        <h2 className="text-2xl font-bold text-white">
          Explore MediaSave Tools
        </h2>

        <p className="mt-3 text-slate-400">
          Ready to process your own media files? Explore the free MediaSave
          tools.
        </p>

        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link
            href="/video-downloader"
            className="text-white underline"
          >
            Video Converter
          </Link>

          <Link
            href="/audio-converter"
            className="text-white underline"
          >
            Audio Converter
          </Link>

          <Link
            href="/image-converter"
            className="text-white underline"
          >
            Image Converter
          </Link>

          <Link
            href="/compress-video"
            className="text-white underline"
          >
            Video Compressor
          </Link>
        </div>
      </section>
    </div>
  );
}
