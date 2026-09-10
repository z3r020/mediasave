"use client";

import { useState } from "react";

type Platform = "TikTok" | "YouTube" | "Instagram";

type Props = {
  platform: Platform;
  description: string;
  placeholder: string;
};

const domains: Record<Platform, string[]> = {
  TikTok: ["tiktok.com", "www.tiktok.com", "vm.tiktok.com"],
  YouTube: ["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"],
  Instagram: ["instagram.com", "www.instagram.com"],
};

export default function PlatformDownloader({
  platform,
  description,
  placeholder,
}: Props) {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);

  function checkUrl() {
    setMessage("");
    setValid(null);

    try {
      const parsed = new URL(url.trim());

      if (!["http:", "https:"].includes(parsed.protocol)) {
        setValid(false);
        setMessage("Please enter a valid HTTPS URL.");
        return;
      }

      const hostname = parsed.hostname.toLowerCase();
      const isValid = domains[platform].some(
        (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
      );

      if (!isValid) {
        setValid(false);
        setMessage(`This does not appear to be a valid ${platform} URL.`);
        return;
      }

      setValid(true);
      setMessage(
        `Valid ${platform} URL detected. You can only process content you own or have permission to download.`
      );
    } catch {
      setValid(false);
      setMessage("Please enter a valid URL.");
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          MediaSave
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {platform} Video Downloader
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          {description}
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/10 bg-black/20 p-6 shadow-2xl backdrop-blur-xl">
        <label
          htmlFor="video-url"
          className="mb-2 block text-sm font-semibold"
        >
          {platform} video URL
        </label>

        <input
          id="video-url"
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setMessage("");
            setValid(null);
          }}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-inherit outline-none backdrop-blur-md placeholder:text-gray-400 focus:border-white/20 focus:ring-2"
        />

        <button
          type="button"
          onClick={checkUrl}
          className="mt-4 w-full rounded-xl border border-white/10 bg-white/10 px-5 py-3 font-semibold shadow-lg backdrop-blur-md transition hover:bg-white/15 active:scale-[0.99]"
        >
          Check URL
        </button>

        {message && (
          <div
            className={`mt-4 rounded-xl border p-4 text-sm ${
              valid
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </section>

      <section className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-black/10 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold">
          How to use the {platform} video downloader
        </h2>

        <ol className="mt-5 space-y-3 text-gray-700">
          <li>1. Copy the URL of the video you want to process.</li>
          <li>2. Paste the URL into the box above.</li>
          <li>3. Select Check URL to validate the address.</li>
          <li>
            4. Only process videos that you own or have permission to
            download.
          </li>
        </ol>
      </section>

      <section className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-black/10 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="mt-5 space-y-5">
          <div>
            <h3 className="font-semibold">
              Is this {platform} downloader free?
            </h3>
            <p className="mt-2 text-gray-600">
              MediaSave provides free online media tools. Availability of
              actual platform downloads depends on supported and permitted
              processing methods.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Can I download any {platform} video?
            </h3>
            <p className="mt-2 text-gray-600">
              You should only download or process content that you own or
              have permission to use. Platform terms and copyright rules may
              apply.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Does MediaSave store my {platform} videos?
            </h3>
            <p className="mt-2 text-gray-600">
              MediaSave is designed around processing user-authorized media.
              Do not submit content unless you have the necessary rights or
              permission.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
