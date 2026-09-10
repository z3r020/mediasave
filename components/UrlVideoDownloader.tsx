"use client";

import { useEffect, useState } from "react";

type Format = {
  id: string;
  quality?: string;
  height?: number | null;
  container?: string;
};

type Result = {
  title?: string;
  thumbnail?: string | null;
  platform?: string;
  durationSeconds?: number | null;
  formats?: Format[];
};

const CACHE_KEY = "mediasave-video-preview";
const CACHE_TIME = 5 * 60 * 1000;

export default function UrlVideoDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [selectedFormat, setSelectedFormat] =
    useState("");

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);

      if (!cached) return;

      const parsed = JSON.parse(cached);

      if (
        Date.now() - parsed.time < CACHE_TIME &&
        parsed.url &&
        parsed.result
      ) {
        setUrl(parsed.url);
        setResult(parsed.result);

        if (parsed.result.formats?.length) {
          setSelectedFormat(
            parsed.result.formats[0].id
          );
        }
      }
    } catch {
      // Ignore invalid cache
    }
  }, []);

  async function analyzeVideo() {
    setError("");
    setResult(null);
    setSelectedFormat("");

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

    if (
      parsedUrl.protocol !== "http:" &&
      parsedUrl.protocol !== "https:"
    ) {
      setError("URL harus menggunakan HTTP atau HTTPS.");
      return;
    }

    /*
     * Cache:
     * URL yang sama dalam 5 menit tidak perlu
     * meminta preview ulang ke API.
     */
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);

      if (cached) {
        const parsed = JSON.parse(cached);

        if (
          parsed.url === videoUrl &&
          Date.now() - parsed.time < CACHE_TIME &&
          parsed.result
        ) {
          setResult(parsed.result);

          if (parsed.result.formats?.length) {
            setSelectedFormat(
              parsed.result.formats[0].id
            );
          }

          return;
        }
      }
    } catch {
      // Continue normally
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/social-download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: videoUrl,
          }),
        }
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Video tidak dapat diproses."
        );
      }

      setResult(data);

      if (data?.formats?.length) {
        setSelectedFormat(
          data.formats[0].id
        );
      }

      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            url: videoUrl,
            time: Date.now(),
            result: data,
          })
        );
      } catch {
        // Ignore storage errors
      }
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

  async function downloadVideo() {
    if (!selectedFormat) {
      setError("Pilih resolusi terlebih dahulu.");
      return;
    }

    setError("");
    setDownloading(true);

    try {
      const response = await fetch(
        "/api/social-download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url.trim(),
            format: selectedFormat,
          }),
        }
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok || !data?.downloadUrl) {
        throw new Error(
          data?.error ||
            "URL download tidak dapat dibuat."
        );
      }

      window.location.href =
        data.downloadUrl;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal membuat link download."
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl sm:p-8">

        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setResult(null);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                analyzeVideo();
              }
            }}
            placeholder="Paste URL YouTube, TikTok, atau Instagram"
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
          />

          <button
            type="button"
            onClick={analyzeVideo}
            disabled={loading}
            className="rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Searching..."
              : "Get Video"}
          </button>
        </div>

        {loading && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] px-4 py-3 text-sm text-slate-300">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-cyan-400" />
            Mencari video dan resolusi...
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6">

            {result.thumbnail && (
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={result.thumbnail}
                  alt={
                    result.title ||
                    "Video thumbnail"
                  }
                  className="max-h-96 w-full object-cover"
                  loading="eager"
                />
              </div>
            )}

            {result.title && (
              <h2 className="mt-5 text-lg font-bold text-white">
                {result.title}
              </h2>
            )}

            {result.platform && (
              <p className="mt-1 text-sm text-slate-500">
                {result.platform}
              </p>
            )}

            {result.formats &&
              result.formats.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold text-slate-300">
                    Pilih resolusi
                  </h3>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {result.formats.map(
                      (format) => {
                        const active =
                          selectedFormat ===
                          format.id;

                        return (
                          <button
                            key={format.id}
                            type="button"
                            onClick={() =>
                              setSelectedFormat(
                                format.id
                              )
                            }
                            className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                              active
                                ? "border-cyan-400 bg-cyan-400 text-slate-950"
                                : "border-white/10 bg-white/[0.04] text-white hover:border-cyan-400/40"
                            }`}
                          >
                            {format.quality ||
                              (format.height
                                ? `${format.height}p`
                                : "Video")}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

            <button
              type="button"
              onClick={downloadVideo}
              disabled={
                downloading ||
                !selectedFormat
              }
              className="mt-6 w-full rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {downloading
                ? "Preparing Download..."
                : "Download Video"}
            </button>
          </div>
        )}

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Mendukung video publik dari YouTube,
          TikTok, dan Instagram. Gunakan hanya
          konten yang kamu miliki atau yang kamu
          punya izin untuk mengunduh.
        </p>
      </div>
    </div>
  );
}
