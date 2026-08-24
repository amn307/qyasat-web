import type { MetadataRoute } from "next";
import { listBlogPosts } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://qyasat.sa").replace(/\/$/, "");
  const now = new Date();
  const staticPaths = ["", "/services", "/projects", "/blog", "/contact"];
  const staticEntries: MetadataRoute.Sitemap = (["ar", "en"] as const).flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/blog" ? 0.8 : 0.7,
    }))
  );

  try {
    const posts = await listBlogPosts();
    const blogEntries: MetadataRoute.Sitemap = posts.flatMap((post) =>
      (["ar", "en"] as const).map((locale) => ({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );
    return [...staticEntries, ...blogEntries];
  } catch (error) {
    console.error("Sitemap blog loading failed; serving static sitemap entries only.", error);
    return staticEntries;
  }
}
