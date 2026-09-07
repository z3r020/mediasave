import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WEBP vs JPG: Which Image Format Should You Use?",
  description:
    "Compare WEBP and JPG image formats, including file size, quality, compatibility, and when to use each format.",
  alternates: {
    canonical: "/blog/webp-vs-jpg",
  },
};

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
        ← Back to Blog
      </Link>

      <h1 className="mt-6 text-4xl font-black">
        WEBP vs JPG: Which Image Format Should You Use?
      </h1>

      <p className="mt-4 text-slate-400">
        WEBP and JPG are both popular image formats, but they are useful in
        different situations. Understanding their strengths can help you
        choose the right format for websites, sharing, and everyday images.
      </p>

      <div className="mt-10 space-y-8 text-slate-300 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-white">
            What is JPG?
          </h2>
          <p className="mt-3">
            JPG is a long-established image format commonly used for
            photographs and other images with many colors. It offers broad
            compatibility across devices, applications, and websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            What is WEBP?
          </h2>
          <p className="mt-3">
            WEBP is a modern image format designed for efficient web delivery.
            It can often provide smaller files while maintaining good visual
            quality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            WEBP vs JPG
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border border-white/10 p-3">Feature</th>
                  <th className="border border-white/10 p-3">WEBP</th>
                  <th className="border border-white/10 p-3">JPG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-white/10 p-3">Web use</td>
                  <td className="border border-white/10 p-3">Excellent</td>
                  <td className="border border-white/10 p-3">Excellent</td>
                </tr>
                <tr>
                  <td className="border border-white/10 p-3">Compatibility</td>
                  <td className="border border-white/10 p-3">Very good</td>
                  <td className="border border-white/10 p-3">Extremely broad</td>
                </tr>
                <tr>
                  <td className="border border-white/10 p-3">Typical file size</td>
                  <td className="border border-white/10 p-3">Often smaller</td>
                  <td className="border border-white/10 p-3">Often larger</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Which format should you use?
          </h2>
          <p className="mt-3">
            WEBP is a strong choice when optimizing images for the web and
            reducing file size matters. JPG remains a dependable choice when
            maximum compatibility is important.
          </p>

          <p className="mt-5">
            Need to change an image format? Try the{" "}
            <Link
              href="/image-converter"
              className="text-white underline"
            >
              Free Online Image Converter
            </Link>
            .
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">
            Related Articles
          </h2>

          <ul className="mt-5 space-y-3">
            <li><a href="/blog/convert-webp-to-jpg-online" className="text-sky-400 hover:underline">How to Convert WEBP to JPG Online</a></li>
            <li><a href="/blog/convert-jpg-to-webp" className="text-sky-400 hover:underline">How to Convert JPG to WEBP</a></li>
            <li><a href="/blog/jpg-vs-png" className="text-sky-400 hover:underline">JPG vs PNG: Which Image Format Should You Use?</a></li>
            <li><a href="/image-converter" className="text-sky-400 hover:underline">Free Online Image Converter</a></li>
          </ul>
        </section>

      </div>
    </article>
  );
}
