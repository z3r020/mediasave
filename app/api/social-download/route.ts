export const runtime = "nodejs";
export const maxDuration = 20;

const YOINKU_API = "https://yoinku.com/api/v1";
const REQUEST_TIMEOUT = 15000;

function isSupportedUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.toLowerCase();

    return (
      host === "youtube.com" ||
      host.endsWith(".youtube.com") ||
      host === "youtu.be" ||
      host === "tiktok.com" ||
      host.endsWith(".tiktok.com") ||
      host === "instagram.com" ||
      host.endsWith(".instagram.com")
    );
  } catch {
    return false;
  }
}

async function fetchWithTimeout(
  input: string,
  init: RequestInit = {}
) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.YOINKU_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Downloader API belum dikonfigurasi." },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => null);
    const rawUrl = body?.url;
    const formatId = body?.format;

    if (typeof rawUrl !== "string" || !rawUrl.trim()) {
      return Response.json(
        { error: "URL video belum diberikan." },
        { status: 400 }
      );
    }

    const videoUrl = rawUrl.trim();

    if (!isSupportedUrl(videoUrl)) {
      return Response.json(
        {
          error:
            "Saat ini hanya mendukung URL YouTube, TikTok, dan Instagram.",
        },
        { status: 400 }
      );
    }

    /*
     * DOWNLOAD MODE
     *
     * Hanya dijalankan setelah user memilih resolusi.
     */
    if (typeof formatId === "string" && formatId.trim()) {
      const endpoint =
        `${YOINKU_API}/download` +
        `?url=${encodeURIComponent(videoUrl)}` +
        `&format=${encodeURIComponent(formatId)}`;

      const response = await fetchWithTimeout(endpoint, {
        headers: {
          "x-api-key": apiKey,
          Accept: "application/json",
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok || !data?.url) {
        return Response.json(
          {
            error:
              data?.error?.message ||
              "Format tersebut tidak tersedia.",
          },
          { status: response.status || 422 }
        );
      }

      return Response.json({
        ok: true,
        downloadUrl: data.url,
        filename:
          data.filename || "mediasave-video.mp4",
      });
    }

    /*
     * PREVIEW MODE
     *
     * Satu request /info untuk mendapatkan:
     * - thumbnail
     * - judul
     * - platform
     * - resolusi
     */
    const endpoint =
      `${YOINKU_API}/info?url=${encodeURIComponent(videoUrl)}`;

    const response = await fetchWithTimeout(endpoint, {
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.ok || !data?.data) {
      return Response.json(
        {
          error:
            data?.error?.message ||
            "Video tidak dapat dianalisis.",
        },
        { status: response.status || 422 }
      );
    }

    const formats = Array.isArray(data.data.formats)
      ? data.data.formats
      : [];

    const videoFormats = formats
      .filter(
        (format: any) =>
          format?.kind === "video" &&
          format?.hasVideo === true &&
          format?.id
      )
      .sort(
        (a: any, b: any) =>
          Number(b?.height || 0) -
          Number(a?.height || 0)
      );

    const uniqueFormats = videoFormats.filter(
      (format: any, index: number, array: any[]) =>
        array.findIndex(
          (item: any) => item.id === format.id
        ) === index
    );

    return Response.json({
      ok: true,
      platform: data.data.platform || "",
      title: data.data.title || "Video",
      thumbnail: data.data.thumbnailUrl || null,
      durationSeconds:
        data.data.durationSeconds || null,
      formats: uniqueFormats.map((format: any) => ({
        id: format.id,
        quality:
          format.quality ||
          (format.height
            ? `${format.height}p`
            : "Video"),
        height: format.height || null,
        container: format.container || "mp4",
      })),
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      return Response.json(
        {
          error:
            "Server membutuhkan waktu terlalu lama. Silakan coba lagi.",
        },
        { status: 504 }
      );
    }

    console.error("SOCIAL_DOWNLOAD_ERROR", error);

    return Response.json(
      {
        error:
          "Terjadi kesalahan saat memproses video.",
      },
      { status: 500 }
    );
  }
}
