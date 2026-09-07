import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Convert WEBP to JPG Online",
  description:
    "Learn how to convert your own WEBP images to JPG online and when JPG is a better choice for compatibility and sharing.",
  alternates: {
    canonical: "/blog/convert-webp-to-jpg-online",
  },
};

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
        ← Back to Blog
      </Link>

      <h1 className="mt-6 text-4xl font-black">
        How to Convert WEBP to JPG Online
      </h1>

      <p className="mt-4 text-slate-400 leading-7">
        WEBP is useful for modern websites, but sometimes you need JPG for
        compatibility, editing, uploading, or sharing. Converting your own
        WEBP image to JPG can make the file easier to use in older software
        and workflows.
      </p>

      <div className="mt-10 space-y-8 text-slate-300 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-white">
            Why convert WEBP to JPG?
          </h2>
          <p className="mt-3">
            JPG has extremely broad support across devices, image editors,
            websites, and other applications. If an application does not
            accept WEBP, converting the image to JPG can solve the problem.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            How to convert WEBP to JPG
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Open the MediaSave Image Converter.</li>
            <li>Select your own WEBP image.</li>
            <li>Choose JPG as the output format.</li>
            <li>Start the conversion and save the resulting image.</li>
          </ol>

          <p className="mt-5">
            Use the{" "}
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
            WEBP or JPG?
          </h2>
          <p className="mt-3">
            WEBP is often a good choice for web performance and smaller image
            files. JPG is a dependable choice when compatibility is the main
            priority.
          </p>
        </section>
      </div>
    </article>
  );
}
