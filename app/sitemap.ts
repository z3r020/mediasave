import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mediasave-omega.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/video-downloader",
    "/video-url-downloader",
    "/audio-converter",
    "/image-converter",
    "/compress-video",
    "/blog",

    "/blog/convert-video-online",
    "/blog/compress-video",
    "/blog/webp-vs-jpg",

    "/blog/convert-webp-to-jpg-online",
    "/blog/convert-jpg-to-webp",
    "/blog/reduce-video-file-size",
    "/blog/mp4-vs-webm",
    "/blog/convert-wav-to-mp3",
    "/blog/jpg-vs-png",

    "/privacy",
    "/terms",
    "/contact",
    "/dmca",
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
