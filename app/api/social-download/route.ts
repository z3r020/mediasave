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

async function getDownload(
  videoUrl: string,
  formatId: string,
  apiKey: string
) {
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
    return null;
  }

  return data;
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
     * Jika format diminta, langsung buat URL download.
     */
    if (typeof formatId === "string" && formatId.trim()) {
      const downloadData = await getDownload(
        videoUrl,
        formatId,
        apiKey
      );

      if (!downloadData?.url) {
        return Response.json(
          { error: "Format tersebut tidak tersedia." },
          { status: 422 }
        );
      }

      return Response.json({
        ok: true,
        downloadUrl: downloadData.url,
        filename:
          downloadData.filename ||
          "mediasave-video.mp4",
      });
    }

    /*
     * Tanpa format = ambil informasi video.
     * Digunakan untuk preview dan daftar resolusi.
     */
    const infoUrl =
      `${YOINKU_API}/info?url=${encodeURIComponent(videoUrl)}`;

    const response = await fetchWithTimeout(infoUrl, {
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
    });

    const info = await response.json().catch(() => null);

    if (!response.ok || !info?.ok || !info?.data) {
      console.error("YOINKU_INFO_ERROR", info);

      return Response.json(
        {
          error:
            info?.error?.message ||
            "Video tidak dapat dianalisis. Pastikan URL publik dan valid.",
        },
        { status: response.status || 422 }
      );
    }

    const formats = Array.isArray(info.data.formats)
      ? info.data.formats
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
          (item: any) =>
            item.id === format.id
        ) === index
    );

    return Response.json({
      ok: true,
      platform: info.data.platform,
      title: info.data.title || "Video",
      thumbnail: info.data.thumbnailUrl || null,
      durationSeconds:
        info.data.durationSeconds || null,
      formats: uniqueFormats.map((format: any) => ({
        id: format.id,
        quality:
          format.quality ||
          (format.height
            ? `${format.height}p`
            : "Video"),
        height: format.height || null,
        container:
          format.container || "mp4",
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
            "Proses terlalu lama. Silakan coba lagi.",
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
