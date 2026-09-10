export const runtime = "nodejs";
export const maxDuration = 30;

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

async function createDownloadUrl(
  videoUrl: string,
  formatId: string,
  apiKey: string
) {
  const downloadUrl =
    `${YOINKU_API}/download` +
    `?url=${encodeURIComponent(videoUrl)}` +
    `&format=${encodeURIComponent(formatId)}`;

  const response = await fetchWithTimeout(downloadUrl, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
      Accept: "application/json",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.ok || !data?.url) {
    return null;
  }

  return data;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.YOINKU_API_KEY;

    if (!apiKey) {
      console.error("YOINKU_API_KEY is missing");

      return Response.json(
        { error: "Downloader API belum dikonfigurasi." },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => null);
    const rawUrl = body?.url;

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
     * FAST PATH
     *
     * Coba langsung 720p.
     * Jika berhasil, kita tidak perlu memanggil /info terlebih dahulu.
     */
    const direct720 = await createDownloadUrl(
      videoUrl,
      "v-720",
      apiKey
    );

    if (direct720?.url) {
      return Response.json({
        ok: true,
        platform: "social",
        title: "Video",
        thumbnail: null,
        downloadUrl: direct720.url,
        filename:
          direct720.filename || "mediasave-video.mp4",
        format: {
          id: "v-720",
          quality: "720p",
          height: 720,
          container: "mp4",
        },
      });
    }

    /*
     * FALLBACK
     *
     * Jika v-720 tidak tersedia, cari format yang benar-benar tersedia.
     */
    const infoUrl =
      `${YOINKU_API}/info?url=${encodeURIComponent(videoUrl)}`;

    const infoResponse = await fetchWithTimeout(infoUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
    });

    const info = await infoResponse.json().catch(() => null);

    if (!infoResponse.ok || !info?.ok || !info?.data) {
      console.error("YOINKU_INFO_ERROR", info);

      return Response.json(
        {
          error:
            info?.error?.message ||
            "Video tidak dapat dianalisis. Pastikan URL publik dan valid.",
        },
        { status: infoResponse.status || 422 }
      );
    }

    const formats = Array.isArray(info.data.formats)
      ? info.data.formats
      : [];

    const videoFormats = formats
      .filter(
        (format: any) =>
          format?.kind === "video" &&
          format?.hasVideo === true
      )
      .sort(
        (a: any, b: any) =>
          Number(b?.height || 0) -
          Number(a?.height || 0)
      );

    if (videoFormats.length === 0) {
      return Response.json(
        { error: "Tidak ada format video yang tersedia." },
        { status: 422 }
      );
    }

    const selected =
      videoFormats.find(
        (format: any) =>
          Number(format.height) === 720
      ) ||
      videoFormats.find(
        (format: any) =>
          Number(format.height) < 720
      ) ||
      videoFormats[videoFormats.length - 1];

    const downloadData = await createDownloadUrl(
      videoUrl,
      selected.id,
      apiKey
    );

    if (!downloadData?.url) {
      return Response.json(
        { error: "URL download tidak dapat dibuat." },
        { status: 422 }
      );
    }

    return Response.json({
      ok: true,
      platform: info.data.platform,
      title: info.data.title || "Video",
      thumbnail: info.data.thumbnailUrl || null,
      downloadUrl: downloadData.url,
      filename:
        downloadData.filename ||
        "mediasave-video.mp4",
      format: {
        id: selected.id,
        quality: selected.quality || null,
        height: selected.height || null,
        container: selected.container || "mp4",
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      return Response.json(
        {
          error:
            "Proses terlalu lama. Silakan coba lagi.",
        },
        { status: 504 }
      );
    }

    console.error(
      "SOCIAL_DOWNLOAD_ERROR",
      error
    );

    return Response.json(
      {
        error:
          "Terjadi kesalahan saat memproses video.",
      },
      { status: 500 }
    );
  }
}
