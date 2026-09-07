import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Media Tools Guides & Tips",
  description:
    "Helpful guides about video conversion, video compression, audio conversion, and image formats from MediaSave.",
  alternates: {
    canonical: "/blog",
  },
};

const posts = [
  {
    href: "/blog/convert-video-online",
    title: "How to Convert a Video Online",
    description:
      "Learn how to convert your own video files to MP4, WEBM, or MOV.",
  },
  {
    href: "/blog/compress-video",
    title: "How to Compress Video Without Losing Too Much Quality",
    description:
      "Learn practical ways to reduce video file size while keeping useful quality.",
  },
  {
    href: "/blog/webp-vs-jpg",
    title: "WEBP vs JPG: Which Image Format Should You Use?",
    description:
      "Compare WEBP and JPG for file size, compatibility, and web use.",
  },
  {
    href: "/blog/convert-webp-to-jpg-online",
    title: "How to Convert WEBP to JPG Online",
    description:
      "Learn when and how to convert WEBP images to the widely supported JPG format.",
  },
  {
    href: "/blog/convert-jpg-to-webp",
    title: "How to Convert JPG to WEBP Online",
    description:
      "Learn how WEBP can help optimize images for modern websites.",
  },
  {
    href: "/blog/reduce-video-file-size",
    title: "How to Reduce Video File Size",
    description:
      "Learn how compression, resolution, bitrate, and format affect video size.",
  },
  {
    href: "/blog/mp4-vs-webm",
    title: "MP4 vs WEBM: Which Video Format Is Better?",
    description:
      "Compare MP4 and WEBM for compatibility, web use, and video delivery.",
  },
  {
    href: "/blog/convert-wav-to-mp3",
    title: "How to Convert WAV to MP3 Online",
    description:
      "Learn how to convert WAV audio files to smaller MP3 files.",
  },
  {
    href: "/blog/jpg-vs-png",
    title: "JPG vs PNG: Which Image Format Should You Use?",
    description:
      "Compare JPG and PNG for photographs, graphics, transparency, and web images.",
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
          convert audio, and choose the right image format for your projects.
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
          <Link href="/video-downloader" className="text-white underline">
            Video Converter
          </Link>

          <Link href="/audio-converter" className="text-white underline">
            Audio Converter
          </Link>

          <Link href="/image-converter" className="text-white underline">
            Image Converter
          </Link>

          <Link href="/compress-video" className="text-white underline">
            Video Compressor
          </Link>
        </div>
      </section>
    </div>
  );
}
