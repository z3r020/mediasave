import type { Metadata } from "next";
import UploadBox from "@/components/UploadBox";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Free Online Video Converter",
  description:
    "Convert your own video files online to MP4, WEBM, or MOV with MediaSave.",
  alternates: {
    canonical: "/video-downloader",
  },
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-black">Free Online Video Converter</h1>
      <p className="mt-3 text-slate-400">
        Convert your own video files to popular formats such as MP4, WEBM,
        and MOV.
      </p>
      <AdSlot />
      <UploadBox
        endpoint="/api/convert-video"
        formats={["mp4", "webm", "mov"]}
        accept="video/*"
      />
    </div>
  );
}
