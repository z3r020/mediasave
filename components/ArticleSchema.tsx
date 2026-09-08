type ArticleSchemaProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
};

export default function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "MediaSave",
    },
    publisher: {
      "@type": "Organization",
      name: "MediaSave",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
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
