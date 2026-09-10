import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_SIZE = 4 * 1024 * 1024;

function isPrivateIP(ip: string) {
  if (ip.includes(":")) {
    return (
      ip === "::1" ||
      ip.startsWith("fc") ||
      ip.startsWith("fd") ||
      ip.startsWith("fe80:")
    );
  }

  const parts = ip.split(".").map(Number);

  if (parts.length !== 4 || parts.some(Number.isNaN)) return true;

  const [a, b] = parts;

  return (
    a === 10 ||
    a === 127 ||
    a === 0 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

async function validateHost(hostname: string) {
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local")
  ) {
    return false;
  }

  if (isIP(hostname)) {
    return !isPrivateIP(hostname);
  }

  const addresses = await lookup(hostname, { all: true });

  return addresses.length > 0 && addresses.every((x) => !isPrivateIP(x.address));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawUrl = searchParams.get("url");

    if (!rawUrl) {
      return Response.json(
        { error: "URL video belum diberikan." },
        { status: 400 }
      );
    }

    let target: URL;

    try {
      target = new URL(rawUrl);
    } catch {
      return Response.json(
        { error: "URL tidak valid." },
        { status: 400 }
      );
    }

    if (!["http:", "https:"].includes(target.protocol)) {
      return Response.json(
        { error: "URL harus menggunakan HTTP atau HTTPS." },
        { status: 400 }
      );
    }

    if (!(await validateHost(target.hostname))) {
      return Response.json(
        { error: "Host URL tidak diizinkan." },
        { status: 400 }
      );
    }

    const upstream = await fetch(target.toString(), {
      redirect: "follow",
      headers: {
        "User-Agent": "MediaSave/1.0",
        Accept: "video/*,application/octet-stream;q=0.9,*/*;q=0.8",
      },
    });

    if (!upstream.ok || !upstream.body) {
      return Response.json(
        { error: "Media tidak dapat diambil dari URL tersebut." },
        { status: 400 }
      );
    }

    const contentType =
      upstream.headers.get("content-type") || "application/octet-stream";

    const contentLength = Number(
      upstream.headers.get("content-length") || "0"
    );

    if (
      !contentType.toLowerCase().startsWith("video/") &&
      !contentType.toLowerCase().includes("octet-stream")
    ) {
      return Response.json(
        { error: "URL tersebut bukan direct video file." },
        { status: 400 }
      );
    }

    if (contentLength > MAX_SIZE) {
      return Response.json(
        {
          error:
            "File terlalu besar untuk downloader versi Vercel ini. Maksimum sekitar 4 MB.",
        },
        { status: 413 }
      );
    }

    const pathname = target.pathname.split("/").pop() || "video.mp4";

    const filename =
      pathname.includes(".") && pathname.length < 120
        ? pathname.replace(/[^a-zA-Z0-9._-]/g, "_")
        : "mediasave-video.mp4";

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("DOWNLOAD_ERROR", error);

    return Response.json(
      { error: "Terjadi kesalahan saat mengambil video." },
      { status: 500 }
    );
  }
}
