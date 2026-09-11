import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 20;

const ALLOWED_HOSTS = [
  "tiktokcdn.com",
  "tiktokcdn-us.com",
  "tiktokcdn-eu.com",
  "cdninstagram.com",
  "fbcdn.net",
];

function isAllowedHost(hostname: string) {
  const host = hostname.toLowerCase();

  return ALLOWED_HOSTS.some(
    (allowed) => host === allowed || host.endsWith(`.${allowed}`)
  );
}

function isAllowedUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && isAllowedHost(url.hostname);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url || !isAllowedUrl(url)) {
    return new Response("Invalid media URL", { status: 400 });
  }

  try {
    const response = await fetch(url, {
      redirect: "manual",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");

      if (!location || !isAllowedUrl(location)) {
        return new Response("Invalid redirect", { status: 502 });
      }

      const redirected = await fetch(location, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(15000),
      });

      if (!redirected.ok) {
        return new Response("Thumbnail unavailable", {
          status: redirected.status,
        });
      }

      const contentType =
        redirected.headers.get("content-type") || "";

      if (!contentType.toLowerCase().startsWith("image/")) {
        return new Response("Not an image", { status: 415 });
      }

      const buffer = await redirected.arrayBuffer();

      if (buffer.byteLength > 5 * 1024 * 1024) {
        return new Response("Thumbnail too large", { status: 413 });
      }

      return new Response(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
      });
    }

    if (!response.ok) {
      return new Response("Thumbnail unavailable", {
        status: response.status,
      });
    }

    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.toLowerCase().startsWith("image/")) {
      return new Response("Not an image", { status: 415 });
    }

    const buffer = await response.arrayBuffer();

    if (buffer.byteLength > 5 * 1024 * 1024) {
      return new Response("Thumbnail too large", { status: 413 });
    }

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch {
    return new Response("Thumbnail fetch failed", { status: 502 });
  }
}
