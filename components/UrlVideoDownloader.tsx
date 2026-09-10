"use client";

import { useState } from "react";

export default function UrlVideoDownloader() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  function checkUrl() {
    const value = url.trim();

    if (!value) {
      setMessage("Masukkan URL video terlebih dahulu.");
      return;
    }

    try {
      const parsed = new URL(value);

      if (!["http:", "https:"].includes(parsed.protocol)) {
        setMessage("URL harus menggunakan http atau https.");
        return;
      }

      setMessage(
        "URL valid. MediaSave siap memproses URL yang didukung."
      );
    } catch {
      setMessage("URL tidak valid. Periksa kembali alamat video.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-6">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-none stroke-current stroke-[1.7]"
            >
              <path d="M12 3v11" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 19h14" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">
            Video Downloader
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Masukkan URL video untuk memeriksa apakah URL tersebut didukung.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste video URL here..."
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:bg-white/[0.06]"
          />

          <button
            onClick={checkUrl}
            className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/15 hover:text-cyan-200"
          >
            Check URL
          </button>
        </div>

        {message && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
            {message}
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <p className="text-xs leading-5 text-slate-500">
            Only download or process videos that you own or have permission
            to use. Platform restrictions and copyright rules may apply.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl">
        <h3 className="font-bold">How it works</h3>

        <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
          <li>1. Copy the video URL.</li>
          <li>2. Paste it into the box above.</li>
          <li>3. Check whether the URL is supported.</li>
          <li>4. Continue with an available download workflow.</li>
        </ol>
      </div>
    </div>
  );
}
