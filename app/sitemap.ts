import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date() },
  ];

  try {
    const { articles } = await getArticles({ limit: 500 });
    for (const article of articles) {
      entries.push({
        url: `${SITE_URL}/article/${article.slug}`,
        lastModified: article.publishedAt
          ? new Date(article.publishedAt)
          : new Date(),
      });
    }
  } catch {
    // backend offline — ship the minimal sitemap
  }

  return entries;
}
