import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JPG vs PNG: Which Image Format Should You Use?",
  description:
    "Compare JPG and PNG image formats and learn when to use each format for photographs, graphics, transparency, and web images.",
  alternates: {
    canonical: "/blog/jpg-vs-png",
  },
};

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
        ← Back to Blog
      </Link>

      <h1 className="mt-6 text-4xl font-black">
        JPG vs PNG: Which Image Format Should You Use?
      </h1>

      <p className="mt-4 text-slate-400 leading-7">
        JPG and PNG are two of the most familiar image formats. The right
        choice depends on whether you need smaller photographic images,
        transparency, or lossless image data.
      </p>

      <div className="mt-10 space-y-8 text-slate-300 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-white">
            JPG
          </h2>
          <p className="mt-3">
            JPG uses lossy compression and is particularly common for
            photographs and images with many colors. It can provide relatively
            small files while maintaining good visual quality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            PNG
          </h2>
          <p className="mt-3">
            PNG uses lossless compression and supports transparency. It is
            often useful for logos, screenshots, interface graphics, and other
            images where preserving exact image information matters.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            JPG vs PNG
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border border-white/10 p-3">Feature</th>
                  <th className="border border-white/10 p-3">JPG</th>
                  <th className="border border-white/10 p-3">PNG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-white/10 p-3">Compression</td>
                  <td className="border border-white/10 p-3">Lossy</td>
                  <td className="border border-white/10 p-3">Lossless</td>
                </tr>
                <tr>
                  <td className="border border-white/10 p-3">Transparency</td>
                  <td className="border border-white/10 p-3">No</td>
                  <td className="border border-white/10 p-3">Yes</td>
                </tr>
                <tr>
                  <td className="border border-white/10 p-3">Typical use</td>
                  <td className="border border-white/10 p-3">Photos</td>
                  <td className="border border-white/10 p-3">
                    Graphics and transparent images
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Which format should you choose?
          </h2>
          <p className="mt-3">
            JPG is usually a practical choice for photographs and smaller
            image files. PNG is a better choice when transparency or lossless
            image data is important.
          </p>

          <p className="mt-5">
            Need to convert an image? Try the{" "}
            <Link
              href="/image-converter"
              className="text-white underline"
            >
              Free Online Image Converter
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
