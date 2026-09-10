"use client";

import { useState } from "react";

type Result = {
  title?: string;
  thumbnail?: string;
  url?: string;
  downloadUrl?: string;
  platform?: string;
};

export default function UrlVideoDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function handleDownload() {
    setError("");
    setResult(null);

    const videoUrl = url.trim();

    if (!videoUrl) {
      setError("Masukkan URL video terlebih dahulu.");
      return;
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(videoUrl);
    } catch {
      setError("URL tidak valid.");
      return;
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      setError("URL harus menggunakan HTTP atau HTTPS.");
      return;
    }

    const hostname = parsedUrl.hostname.toLowerCase();

    const supported =
      hostname.includes("youtube.com") ||
      hostname.includes("youtu.be") ||
      hostname.includes("tiktok.com") ||
      hostname.includes("instagram.com");

    if (!supported) {
      setError(
        "Saat ini MediaSave mendukung URL YouTube, TikTok, dan Instagram."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/social-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoUrl,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error || "Video tidak dapat diproses."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memproses video."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleDownload();
              }
            }}
            placeholder="Paste URL YouTube, TikTok, atau Instagram"
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
          />

          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : "Download"}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                alt={result.title || "Video thumbnail"}
                className="mb-4 max-h-80 w-full rounded-2xl object-cover"
              />
            )}

            {result.title && (
              <h2 className="mb-4 font-semibold text-white">
                {result.title}
              </h2>
            )}

            {result.downloadUrl && (
              <a
                href={result.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl bg-cyan-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Download Video
              </a>
            )}
          </div>
        )}

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Mendukung video publik dari YouTube, TikTok, dan Instagram.
          Video privat, dihapus, atau dibatasi platform mungkin tidak dapat
          diproses.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl">
        <h2 className="text-lg font-bold">Cara menggunakan</h2>

        <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
          <li>1. Salin URL video dari YouTube, TikTok, atau Instagram.</li>
          <li>2. Tempel URL di kotak di atas.</li>
          <li>3. Tekan Download.</li>
          <li>4. Tunggu MediaSave memproses video.</li>
          <li>5. Tekan Download Video.</li>
        </ol>

        <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4 text-sm leading-6 text-slate-400">
          Gunakan hanya konten yang kamu miliki atau yang kamu memiliki izin
          untuk mengunduh dan memprosesnya.
        </div>
      </div>
    </div>
  );
}
