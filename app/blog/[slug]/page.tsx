import Link from "next/link";

const data: Record<
  string,
  { title: string; body: string[]; toolHref: string; toolName: string }
> = {
  "convert-video-online": {
    title: "How to Convert a Video Online",
    body: [
      "Converting a video can make it easier to share, upload, edit, or play on different devices.",
      "Different devices and applications support different video formats. MP4 is widely supported, while WEBM can be useful for web content and MOV is commonly used in Apple-related workflows.",
      "Keep the original file until you verify the converted copy, and choose an output format that matches your target device or application.",
    ],
    toolHref: "/video-downloader",
    toolName: "Free Online Video Converter",
  },
  "compress-video": {
    title: "How to Compress Video Without Losing Too Much Quality",
    body: [
      "Large video files can be difficult to upload, store, or share. Compression reduces file size by encoding the video more efficiently.",
      "Resolution, bitrate, frame rate, codec, and video duration can all affect the final file size.",
      "Start with a moderate compression setting and compare the result before making the compression more aggressive. Keep an original copy when the source is important.",
    ],
    toolHref: "/compress-video",
    toolName: "Free Online Video Compressor",
  },
  "webp-vs-jpg": {
    title: "WEBP vs JPG: Which Image Format Should You Use?",
    body: [
      "WEBP can provide smaller files while supporting modern web workflows, while JPG remains broadly compatible and is useful for photographs.",
      "For websites, choose an image format based on browser support, workflow requirements, visual quality, and desired file size.",
      "If you need to convert between common image formats, an online image converter can simplify the process.",
    ],
    toolHref: "/image-converter",
    toolName: "Free Online Image Converter",
  },
};

export function generateStaticParams() {
  return Object.keys(data).map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = data[slug] || data["convert-video-online"];

  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      <Link
        href="/blog"
        className="text-sm text-sky-400 hover:underline"
      >
        ← Back to Media Guides
      </Link>

      <h1 className="mt-6 text-4xl font-black">{p.title}</h1>

      <div className="mt-8 space-y-6 text-slate-300 leading-8">
        {p.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-white/10 bg-black/10 p-6">
        <h2 className="text-2xl font-bold text-white">
          Use the MediaSave tool
        </h2>

        <p className="mt-3 text-slate-300">
          Ready to process your own media file? Try the{" "}
          <Link
            href={p.toolHref}
            className="font-semibold text-sky-400 hover:underline"
          >
            {p.toolName}
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white">
          Explore more MediaSave guides
        </h2>

        <ul className="mt-5 space-y-3">
          <li>
            <Link
              href="/blog/convert-video-online"
              className="text-sky-400 hover:underline"
            >
              How to Convert Video Online
            </Link>
          </li>
          <li>
            <Link
              href="/blog/compress-video"
              className="text-sky-400 hover:underline"
            >
              How to Compress Video Online
            </Link>
          </li>
          <li>
            <Link
              href="/blog/webp-vs-jpg"
              className="text-sky-400 hover:underline"
            >
              WEBP vs JPG: Which Image Format Is Better?
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
