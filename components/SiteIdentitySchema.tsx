import React from "react";

export default function SiteIdentitySchema() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mediasave-omega.vercel.app";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "MediaSave",
        "alternateName": "MediaSave",
        "description": "Free online media tools for video, audio, and image processing."
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "MediaSave",
        "alternateName": "MediaSave",
        "url": siteUrl,
        "logo": `${siteUrl}/icon.png`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
