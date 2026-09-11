import React from "react";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbSchemaProps = {
  title?: string;
  url?: string;
  items?: BreadcrumbItem[];
};

export default function BreadcrumbSchema({
  title,
  url,
  items,
}: BreadcrumbSchemaProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mediasave-omega.vercel.app";

  const breadcrumbItems: BreadcrumbItem[] =
    items && items.length > 0
      ? items
      : [
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          {
            name: title || "",
            url: url || "/",
          },
        ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
