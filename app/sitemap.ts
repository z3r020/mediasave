import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mediasave-omega.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/video-downloader",
    "/audio-converter",
    "/image-converter",
    "/compress-video",
    "/blog",
    "/blog/convert-video-online",
    "/blog/compress-video",
    "/blog/webp-vs-jpg",
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
