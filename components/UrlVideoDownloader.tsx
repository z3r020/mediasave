"use client";

import { useState } from "react";

export default function UrlVideoDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setError("");

    if (!url.trim()) {
      setError("Masukkan URL video terlebih dahulu.");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("URL tidak valid.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/download?url=${encodeURIComponent(url)}`
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error || "Video tidak dapat didownload."
        );
      }

      const blob = await response.blob();

      const contentDisposition =
        response.headers.get("content-disposition") || "";

      const match = contentDisposition.match(/filename="([^"]+)"/);

      const filename = match?.[1] || "mediasave-video.mp4";

      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mendownload video."
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
            placeholder="https://example.com/video.mp4"
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
          />

          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Downloading..." : "Download"}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Versi ini mendukung direct video URL yang dapat diakses publik.
          Maksimum sekitar 4 MB pada deployment Vercel ini.
        </p>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl">
        <h2 className="text-lg font-bold">Cara menggunakan</h2>

        <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
          <li>1. Salin direct URL file video.</li>
          <li>2. Tempel URL di kotak di atas.</li>
          <li>3. Tekan Download.</li>
          <li>4. File akan tersimpan ke perangkatmu.</li>
        </ol>

        <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4 text-sm leading-6 text-slate-400">
          Gunakan hanya video yang kamu miliki atau yang kamu memiliki izin
          untuk mengunduh dan memprosesnya.
        </div>
      </div>
    </div>
  );
}
