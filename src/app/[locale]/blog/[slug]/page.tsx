import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog/posts";
import { isLocale, type Locale } from "@/lib/config/locales";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = isLocale(locale) ? (locale as Locale) : "ar";
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog | قياسات",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qyasat.sa";
  const title = post.seoTitle[currentLocale] || post.title[currentLocale];
  const description = post.seoDescription[currentLocale] || post.excerpt[currentLocale];
  const image = post.ogImageUrl || post.coverImageUrl;
  const canonical = `${siteUrl}/${currentLocale}/blog/${post.slug}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ar: `${siteUrl}/ar/blog/${post.slug}`,
        en: `${siteUrl}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: image ? [image] : [],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : [] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.body[currentLocale]
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[var(--qyasat-bg)] px-6 py-20 text-[var(--qyasat-text)]">
      <article className="mx-auto max-w-4xl">
        <Link
          href={`/${locale}/blog`}
          className="text-sm font-bold text-[var(--qyasat-muted)] hover:text-[var(--qyasat-text)]"
        >
          {currentLocale === "ar" ? "← العودة للمدونة" : "← Back to blog"}
        </Link>

        <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-[var(--qyasat-muted)]">
          {post.category && <span>{post.category}</span>}
          <span>{new Date(post.publishedAt).toLocaleDateString(currentLocale === "ar" ? "ar-SA" : "en-US")}</span>
          <span>{post.author}</span>
        </div>

        <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
          {post.title[currentLocale]}
        </h1>

        <p className="mt-6 text-xl leading-9 text-[var(--qyasat-muted)]">
          {post.excerpt[currentLocale]}
        </p>

        {post.coverImageUrl ? (
          <div className="mt-10 overflow-hidden rounded-[var(--qyasat-card-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImageUrl}
              alt={post.title[currentLocale]}
              className="aspect-video w-full rounded-[calc(var(--qyasat-card-radius)-10px)] object-cover"
            />
          </div>
        ) : null}

        <div className="mt-10 rounded-[var(--qyasat-card-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] p-6 md:p-10">
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-6 text-lg leading-9 text-[var(--qyasat-text)]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--qyasat-border)] px-4 py-2 text-sm font-bold text-[var(--qyasat-muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
