import type { Metadata } from "next";
import UploadBox from "@/components/UploadBox";

export const metadata: Metadata = {
  title: "Free Online Image Converter",
  description:
    "Convert your own images online between JPG, PNG, and WEBP formats with MediaSave.",
  alternates: {
    canonical: "/image-converter",
  },
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-black">Free Online Image Converter</h1>
      <p className="mt-3 mb-8 text-slate-400">
        Convert your own images between JPG, PNG, and WEBP formats.
      </p>
      <UploadBox
        endpoint="/api/convert-image"
        formats={["jpg", "png", "webp"]}
        accept="image/*"
      />
    </div>
  );
}
