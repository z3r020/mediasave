export const runtime = "nodejs";
export const maxDuration = 60;

const DOWNLOAD_TIMEOUT = 55000;

const ALLOWED_HOSTS = [
  "tiktokcdn.com",
  "tiktokcdn-us.com",
  "tiktokcdn-eu.com",
  "cdninstagram.com",
  "fbcdn.net",
];

function isAllowedMediaUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);

    if (url.protocol !== "https:") return false;

    const host = url.hostname.toLowerCase();

    return ALLOWED_HOSTS.some(
      (allowed) =>
        host === allowed || host.endsWith(`.${allowed}`)
    );
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const encoded = requestUrl.searchParams.get("url");

    if (!encoded) {
      return new Response("URL media tidak diberikan.", {
        status: 400,
      });
    }

    const mediaUrl = Buffer.from(
      encoded,
      "base64url"
    ).toString("utf8");

    if (!isAllowedMediaUrl(mediaUrl)) {
      return new Response("URL media tidak diizinkan.", {
        status: 403,
      });
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, DOWNLOAD_TIMEOUT);

    let response: Response;

    try {
      response = await fetch(mediaUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/140 Mobile Safari/537.36",
          Accept: "video/*,*/*;q=0.8",
        },
        redirect: "follow",
        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok || !response.body) {
      return new Response("File video tidak dapat diambil.", {
        status: response.status || 502,
      });
    }

    const contentType =
      response.headers.get("content-type") || "video/mp4";

    if (
      !contentType.toLowerCase().startsWith("video/") &&
      !contentType
        .toLowerCase()
        .includes("application/octet-stream")
    ) {
      return new Response("Media bukan file video.", {
        status: 415,
      });
    }

    const filename =
      requestUrl.searchParams.get("filename") ||
      "mediasave-video.mp4";

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      return new Response(
        "Download terlalu lama. Silakan coba lagi.",
        { status: 504 }
      );
    }

    console.error("SOCIAL_MEDIA_DOWNLOAD_ERROR", error);

    return new Response(
      "Terjadi kesalahan saat mengambil video.",
      { status: 500 }
    );
  }
}
