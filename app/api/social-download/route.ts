export const runtime = "nodejs";
export const maxDuration = 60;

const YOINKU_API = "https://yoinku.com/api/v1";

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

    const infoUrl =
      `${YOINKU_API}/info?url=${encodeURIComponent(videoUrl)}`;

    const infoResponse = await fetch(infoUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
      cache: "no-store",
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
          Number(b?.height || 0) - Number(a?.height || 0)
      );

    if (videoFormats.length === 0) {
      return Response.json(
        { error: "Tidak ada format video yang tersedia." },
        { status: 422 }
      );
    }

    // Prefer 720p or the highest available format below it.
    const selected =
      videoFormats.find(
        (format: any) => Number(format.height) === 720
      ) ||
      videoFormats.find(
        (format: any) => Number(format.height) < 720
      ) ||
      videoFormats[videoFormats.length - 1];

    const downloadUrl =
      `${YOINKU_API}/download` +
      `?url=${encodeURIComponent(videoUrl)}` +
      `&format=${encodeURIComponent(selected.id)}`;

    const downloadResponse = await fetch(downloadUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const downloadData = await downloadResponse
      .json()
      .catch(() => null);

    if (
      !downloadResponse.ok ||
      !downloadData?.ok ||
      !downloadData?.url
    ) {
      console.error("YOINKU_DOWNLOAD_ERROR", downloadData);

      return Response.json(
        {
          error:
            downloadData?.error?.message ||
            "URL download tidak dapat dibuat.",
        },
        { status: downloadResponse.status || 422 }
      );
    }

    return Response.json({
      ok: true,
      platform: info.data.platform,
      title: info.data.title || "Video",
      thumbnail: info.data.thumbnailUrl || null,
      downloadUrl: downloadData.url,
      filename: downloadData.filename || "mediasave-video.mp4",
      format: {
        id: selected.id,
        quality: selected.quality || null,
        height: selected.height || null,
        container: selected.container || "mp4",
      },
    });
  } catch (error) {
    console.error("SOCIAL_DOWNLOAD_ERROR", error);

    return Response.json(
      { error: "Terjadi kesalahan saat memproses video." },
      { status: 500 }
    );
  }
}
