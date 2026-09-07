import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Convert JPG to WEBP Online",
  description:
    "Learn how to convert your own JPG images to WEBP and understand why WEBP can be useful for websites and smaller image files.",
  alternates: {
    canonical: "/blog/convert-jpg-to-webp",
  },
};

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
        ← Back to Blog
      </Link>

      <h1 className="mt-6 text-4xl font-black">
        How to Convert JPG to WEBP Online
      </h1>

      <p className="mt-4 text-slate-400 leading-7">
        Converting JPG images to WEBP can be useful when optimizing images for
        websites or trying to reduce image file sizes while maintaining useful
        visual quality.
      </p>

      <div className="mt-10 space-y-8 text-slate-300 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-white">
            Why use WEBP?
          </h2>
          <p className="mt-3">
            WEBP is designed for efficient image delivery on the web. Depending
            on the image and settings, a WEBP file can be smaller than an
            equivalent JPG while maintaining good visual quality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            How to convert JPG to WEBP
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Open the MediaSave Image Converter.</li>
            <li>Select a JPG image you own or have permission to process.</li>
            <li>Choose WEBP as the output format.</li>
            <li>Start the conversion and save the result.</li>
          </ol>

          <p className="mt-5">
            Try the{" "}
            <Link
              href="/image-converter"
              className="text-white underline"
            >
              Free Online Image Converter
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            When should you keep JPG?
          </h2>
          <p className="mt-3">
            Keep JPG when maximum compatibility with older applications or
            workflows is more important than web optimization.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-bold text-white">
                Why convert JPG to WEBP?
              </h3>
              <p className="mt-2">
                WEBP can be useful for websites because it is designed for
                efficient image delivery and can often produce smaller files.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">
                Can I convert JPG to WEBP online?
              </h3>
              <p className="mt-2">
                Yes. You can process your own JPG images with an online image
                converter and choose WEBP as the output format.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">
                Should I keep the original JPG?
              </h3>
              <p className="mt-2">
                Keeping the original is recommended so you always have a
                source copy if you need to create another version later.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">
            Related Articles
          </h2>

          <ul className="mt-5 space-y-3">
            <li><a href="/blog/webp-vs-jpg" className="text-sky-400 hover:underline">WEBP vs JPG: Which Image Format Is Better?</a></li>
            <li><a href="/blog/convert-webp-to-jpg-online" className="text-sky-400 hover:underline">How to Convert WEBP to JPG Online</a></li>
            <li><a href="/blog/jpg-vs-png" className="text-sky-400 hover:underline">JPG vs PNG: Which Image Format Should You Use?</a></li>
            <li><a href="/image-converter" className="text-sky-400 hover:underline">Free Online Image Converter</a></li>
          </ul>
        </section>

      </div>
    </article>
  );
}
