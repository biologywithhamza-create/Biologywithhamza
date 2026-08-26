import type { MetadataRoute } from "next";
import { articles } from "./content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://hamzaramzan.online";
  const now = new Date("2026-08-26");
  return [
    { url: origin, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${origin}/videos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${origin}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...articles.map((article) => ({
      url: `${origin}/articles/${article.slug}`,
      lastModified: new Date(article.dateISO),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
