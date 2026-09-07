import type { Metadata } from "next";
import UploadBox from "@/components/UploadBox";

export const metadata: Metadata = {
  title: "Free Online Video Compressor",
  description:
    "Compress your own video files online and reduce MP4 file size with MediaSave.",
  alternates: {
    canonical: "/compress-video",
  },
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-black">Free Online Video Compressor</h1>
      <p className="mt-3 mb-8 text-slate-400">
        Reduce the size of your own MP4 videos with a balanced quality and
        file-size preset.
      </p>
      <UploadBox
        endpoint="/api/compress-video"
        formats={["mp4"]}
        accept="video/*"
      />
    </div>
  );
}
