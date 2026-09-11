export const runtime = "nodejs";
export const maxDuration = 20;

const YOINKU_API = "https://yoinku.com/api/v1";
const PREVIEW_TIMEOUT = 10000;
const DOWNLOAD_TIMEOUT = 18000;

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
  init: RequestInit = {},
  timeoutMs = PREVIEW_TIMEOUT
) {

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

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

      const response = await fetchWithTimeout(
        endpoint,
        {
          headers: {
            "x-api-key": apiKey,
            Accept: "application/json",
          },
        },
        DOWNLOAD_TIMEOUT
      );

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
    // Fast preview fallback for YouTube.
    // Yoinku /info can occasionally exceed the Vercel preview timeout,
    // while the /download endpoint is fast and already verified.
    try {
      const parsedVideoUrl = new URL(videoUrl);
      const host = parsedVideoUrl.hostname.toLowerCase();

      let youtubeVideoId: string | null = null;

      if (
        host === "youtu.be" ||
        host.endsWith(".youtube.com")
      ) {
        if (host === "youtu.be") {
          youtubeVideoId =
            parsedVideoUrl.pathname.split("/").filter(Boolean)[0] || null;
        } else if (parsedVideoUrl.searchParams.get("v")) {
          youtubeVideoId =
            parsedVideoUrl.searchParams.get("v");
        } else if (
          parsedVideoUrl.pathname.startsWith("/shorts/")
        ) {
          youtubeVideoId =
            parsedVideoUrl.pathname.split("/")[2] || null;
        } else if (
          parsedVideoUrl.pathname.startsWith("/embed/")
        ) {
          youtubeVideoId =
            parsedVideoUrl.pathname.split("/")[2] || null;
        }
      }

      if (youtubeVideoId) {
        return Response.json({
          ok: true,
          platform: "youtube",
          title: "YouTube Video",
          thumbnail:
            `https://i.ytimg.com/vi/${encodeURIComponent(youtubeVideoId)}/hqdefault.jpg`,
          durationSeconds: null,
          formats: [
            {
              id: "v-1080",
              quality: "1080p",
              height: 1080,
              container: "mp4",
            },
            {
              id: "v-720",
              quality: "720p",
              height: 720,
              container: "mp4",
            },
            {
              id: "v-480",
              quality: "480p",
              height: 480,
              container: "mp4",
            },
            {
              id: "v-360",
              quality: "360p",
              height: 360,
              container: "mp4",
            },
          ],
        });
      }
    } catch {
      // Fall through to the normal provider preview.
    }

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
