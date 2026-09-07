import type { Metadata } from "next";
import UploadBox from "@/components/UploadBox";

export const metadata: Metadata = {
  title: "Free Online Audio Converter",
  description:
    "Convert your own audio and video files to MP3, WAV, or OGG with MediaSave.",
  alternates: {
    canonical: "/audio-converter",
  },
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-black">Free Online Audio Converter</h1>
      <p className="mt-3 mb-8 text-slate-400">
        Convert your own audio or video files to popular audio formats
        including MP3, WAV, and OGG.
      </p>
      <UploadBox
        endpoint="/api/convert-audio"
        formats={["mp3", "wav", "ogg"]}
        accept="audio/*,video/*"
      />
    </div>
  );
}
