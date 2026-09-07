import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MP4 vs WEBM: Which Video Format Is Better?",
  description:
    "Compare MP4 and WEBM video formats, including compatibility, web use, file size, and when to choose each format.",
  alternates: {
    canonical: "/blog/mp4-vs-webm",
  },
};

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
        ← Back to Blog
      </Link>

      <h1 className="mt-6 text-4xl font-black">
        MP4 vs WEBM: Which Video Format Is Better?
      </h1>

      <p className="mt-4 text-slate-400 leading-7">
        MP4 and WEBM are both useful video formats, but they are optimized for
        somewhat different workflows. Choosing between them depends on
        compatibility, web delivery, and your intended use.
      </p>

      <div className="mt-10 space-y-8 text-slate-300 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-white">
            MP4
          </h2>
          <p className="mt-3">
            MP4 is one of the most widely supported video formats. It is a
            practical choice when a video needs to work across many devices,
            applications, and platforms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            WEBM
          </h2>
          <p className="mt-3">
            WEBM is designed with web delivery in mind and is commonly used for
            browser-based video. It can be useful when the target environment
            primarily consists of modern web browsers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            MP4 vs WEBM
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border border-white/10 p-3">Feature</th>
                  <th className="border border-white/10 p-3">MP4</th>
                  <th className="border border-white/10 p-3">WEBM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-white/10 p-3">
                    General compatibility
                  </td>
                  <td className="border border-white/10 p-3">
                    Excellent
                  </td>
                  <td className="border border-white/10 p-3">
                    Very good
                  </td>
                </tr>
                <tr>
                  <td className="border border-white/10 p-3">
                    Web use
                  </td>
                  <td className="border border-white/10 p-3">
                    Excellent
                  </td>
                  <td className="border border-white/10 p-3">
                    Excellent
                  </td>
                </tr>
                <tr>
                  <td className="border border-white/10 p-3">
                    Broad device support
                  </td>
                  <td className="border border-white/10 p-3">
                    Strong
                  </td>
                  <td className="border border-white/10 p-3">
                    More dependent on software support
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            Which should you choose?
          </h2>
          <p className="mt-3">
            Choose MP4 when compatibility is your main concern. Choose WEBM
            when your video is primarily intended for modern web environments.
          </p>

          <p className="mt-5">
            Need to change your own video format? Use the{" "}
            <Link
              href="/video-downloader"
              className="text-white underline"
            >
              Free Online Video Converter
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
