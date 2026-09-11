export const runtime = "nodejs";
export const maxDuration = 60;

const YOINKU_API = "https://yoinku.com/api/v1";
const PREVIEW_TIMEOUT = 10000;
const DOWNLOAD_TIMEOUT = 45000;

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
      if (formatId.startsWith("saveapi:")) {
        try {
          const currentUrl = new URL(videoUrl);
          const currentHost = currentUrl.hostname.toLowerCase();

          const allowedHost =
            currentHost === "tiktok.com" ||
            currentHost.endsWith(".tiktok.com") ||
            currentHost === "instagram.com" ||
            currentHost.endsWith(".instagram.com");

          if (!allowedHost) {
            return Response.json(
              { error: "Format download tidak valid." },
              { status: 400 }
            );
          }

          const encoded = formatId.slice("saveapi:".length);
          const downloadUrl = Buffer.from(
            encoded,
            "base64url"
          ).toString("utf8");

          if (!downloadUrl.startsWith("https://")) {
            throw new Error("Invalid media URL");
          }

          return Response.json({
            ok: true,
            downloadUrl,
            filename: currentHost.includes("instagram")
              ? "mediasave-instagram.mp4"
              : "mediasave-tiktok.mp4",
          });
        } catch {
          return Response.json(
            { error: "Format download tidak valid." },
            { status: 400 }
          );
        }
      }

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
    /*
     * TikTok + Instagram via SaveAPI/DLGram.
     * YouTube tetap menggunakan Yoinku.
     */
    const previewHost = new URL(videoUrl).hostname.toLowerCase();

    if (
      previewHost === "tiktok.com" ||
      previewHost.endsWith(".tiktok.com") ||
      previewHost === "instagram.com" ||
      previewHost.endsWith(".instagram.com")
    ) {
      const saveApiKey = process.env.SAVEAPI_API_KEY;

      if (!saveApiKey) {
        return Response.json(
          { error: "SaveAPI belum dikonfigurasi." },
          { status: 500 }
        );
      }

      const saveApiEndpoint =
        `https://api.saveapi.org/v1/download?url=${encodeURIComponent(videoUrl)}`;

      const response = await fetchWithTimeout(
        saveApiEndpoint,
        {
          headers: {
            Authorization: `Bearer ${saveApiKey}`,
            Accept: "application/json",
          },
        },
        DOWNLOAD_TIMEOUT
      );

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        return Response.json(
          {
            error:
              data?.error?.message ||
              data?.error ||
              "TikTok/Instagram tidak dapat diproses.",
          },
          { status: response.status || 422 }
        );
      }

      const medias = Array.isArray(data.medias)
        ? data.medias
        : [];

      const videos = medias.filter(
        (media: any) =>
          media?.type === "video" &&
          typeof media?.url === "string" &&
          media.url.startsWith("https://")
      );

      if (!videos.length) {
        return Response.json(
          { error: "Video tidak tersedia dari provider." },
          { status: 422 }
        );
      }

      const formats = videos.map((media: any, index: number) => {
        const encodedUrl = Buffer.from(
          media.url,
          "utf8"
        ).toString("base64url");

        return {
          id: `saveapi:${encodedUrl}`,
          quality:
            media?.quality ||
            media?.label ||
            (media?.height
              ? `${media.height}p`
              : `Video ${index + 1}`),
          height: media?.height || null,
          container: media?.ext || "mp4",
        };
      });

      const meta = data.meta || {};

      return Response.json({
        ok: true,
        platform:
        data.platform ||
        (previewHost.includes("instagram") ? "instagram" : "tiktok"),
        title:
          meta.title ||
          (previewHost.includes("instagram")
            ? "Instagram Video"
            : "TikTok Video"),
        thumbnail: meta.thumbnail || null,
        durationSeconds: meta.durationSeconds || null,
        formats,
      });
    }

    // Fast preview fallback for YouTube, TikTok, and Instagram.
    // We avoid the slow /info request for the initial preview.
    try {
      const parsedVideoUrl = new URL(videoUrl);
      const host = parsedVideoUrl.hostname.toLowerCase();

      let platform: "youtube" | "tiktok" | "instagram" | null = null;
      let thumbnail: string | null = null;

      if (
        host === "youtu.be" ||
        host === "youtube.com" ||
        host.endsWith(".youtube.com")
      ) {
        platform = "youtube";

        let youtubeVideoId: string | null = null;

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

        if (youtubeVideoId) {
          thumbnail =
            `https://i.ytimg.com/vi/${encodeURIComponent(
              youtubeVideoId
            )}/hqdefault.jpg`;
        }
      } else if (
        host === "tiktok.com" ||
        host.endsWith(".tiktok.com")
      ) {
        platform = "tiktok";
      } else if (
        host === "instagram.com" ||
        host.endsWith(".instagram.com")
      ) {
        platform = "instagram";
      }

      if (platform) {
        return Response.json({
          ok: true,
          platform,
          title:
            platform === "youtube"
              ? "YouTube Video"
              : platform === "tiktok"
                ? "TikTok Video"
                : "Instagram Video",
          thumbnail,
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
