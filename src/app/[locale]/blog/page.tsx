import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listBlogPosts } from "@/lib/blog/posts";
import { isLocale, type Locale } from "@/lib/config/locales";
import { CmsSeoSchema } from "@/components/seo/CmsSeoSchema";
import { getSeoPage, metadataFromSeo } from "@/lib/seo/pages";
import { readSiteContent } from "@/lib/content/site-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? (locale as Locale) : "ar";
  const content = await readSiteContent();
  return metadataFromSeo(await getSeoPage(currentLocale, "blog"), content.settings.brand.ogImageUrl);
}

const text = {
  ar: {
    eyebrow: "Qyasat Blog",
    title: "المدونة",
    description: "أفكار ومقالات حول التقنية، الأتمتة، التسويق، والذكاء الاصطناعي.",
    empty: "لا توجد مقالات منشورة حاليًا.",
    readMore: "قراءة المقال",
  },
  en: {
    eyebrow: "Qyasat Blog",
    title: "Blog",
    description: "Insights about technology, automation, marketing, and artificial intelligence.",
    empty: "No published posts yet.",
    readMore: "Read post",
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const seo = await getSeoPage(currentLocale, "blog");
  const t = text[currentLocale];
  const posts = await listBlogPosts();

  return (
    <>
      <CmsSeoSchema schemaJson={seo.schemaJson} />
    <main className="min-h-screen bg-[var(--qyasat-bg)] px-6 py-20 text-[var(--qyasat-text)]">
      <section className="mx-auto max-w-[var(--qyasat-max-width)]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--qyasat-muted)]">
          {t.eyebrow}
        </p>
        <h1 className="mt-4 text-5xl font-black md:text-7xl">{t.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--qyasat-muted)]">
          {t.description}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-[var(--qyasat-card-radius)] border border-[var(--qyasat-border)] bg-[var(--qyasat-surface)]"
            >
              {post.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImageUrl}
                  alt={post.title[currentLocale]}
                  className="aspect-video w-full object-cover"
                />
              ) : null}

              <div className="p-6">
                <div className="flex flex-wrap gap-2 text-xs font-bold text-[var(--qyasat-muted)]">
                  {post.category && <span>{post.category}</span>}
                  <span>{new Date(post.publishedAt).toLocaleDateString(currentLocale === "ar" ? "ar-SA" : "en-US")}</span>
                </div>

                <h2 className="mt-4 text-2xl font-black">{post.title[currentLocale]}</h2>
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--qyasat-muted)]">
                  {post.excerpt[currentLocale]}
                </p>

                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="mt-6 inline-flex rounded-[var(--qyasat-button-radius)] bg-[var(--qyasat-primary)] px-5 py-3 text-sm font-black text-[var(--qyasat-primary-text)]"
                >
                  {t.readMore}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="mt-12 rounded-[var(--qyasat-card-radius)] border border-dashed border-[var(--qyasat-border)] bg-[var(--qyasat-surface)] p-10 text-center text-[var(--qyasat-muted)]">
            {t.empty}
          </div>
        )}
      </section>
    </main>
    </>
  );
}
