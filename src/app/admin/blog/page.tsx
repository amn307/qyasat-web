"use client";

import { useEffect, useMemo, useState } from "react";
import { MediaUrlInput } from "@/components/admin/media-url-input";
import { adminFetch } from "@/lib/admin/client";

type Locale = "ar" | "en";
type BlogStatus = "draft" | "published";

type BlogPost = {
  id: string;
  slug: string;
  status: BlogStatus;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>;
  coverImageUrl: string;
  category: string;
  tags: string[];
  author: string;
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
  ogImageUrl: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

const emptyPost: BlogPost = {
  id: "",
  slug: "",
  status: "draft",
  title: { ar: "", en: "" },
  excerpt: { ar: "", en: "" },
  body: { ar: "", en: "" },
  coverImageUrl: "",
  category: "",
  tags: [],
  author: "قياسات",
  seoTitle: { ar: "", en: "" },
  seoDescription: { ar: "", en: "" },
  ogImageUrl: "",
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const searchable = `${item.title.ar} ${item.title.en} ${item.slug} ${item.category} ${item.tags.join(" ")}`.toLowerCase();

      return matchesStatus && (!q || searchable.includes(q));
    });
  }, [items, query, statusFilter]);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setStatus("جاري تحميل المقالات...");

    const res = await adminFetch("/api/admin/blog");

    if (!res.ok) {
      setStatus("فشل تحميل المقالات. سجّل الدخول مرة أخرى.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setStatus("تم تحميل المقالات.");
  }

  async function createPost() {
    setStatus("جاري إنشاء مقال...");

    const res = await adminFetch("/api/admin/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: { ar: "مقال جديد", en: "New Post" },
      }),
    });

    if (!res.ok) {
      setStatus("فشل إنشاء المقال.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setSelected(data.item || null);
    setStatus("تم إنشاء مقال جديد.");
  }

  async function savePost(post = selected) {
    if (!post) return;

    setStatus("جاري الحفظ...");

    const res = await adminFetch("/api/admin/blog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!res.ok) {
      setStatus("فشل حفظ المقال.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setSelected(data.item || null);
    setStatus("تم حفظ المقال.");
  }

  async function deletePost(post: BlogPost) {
    const sure = window.confirm(`حذف المقال؟\n${post.title.ar || post.title.en}`);
    if (!sure) return;

    setStatus("جاري الحذف...");

    const res = await adminFetch("/api/admin/blog", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: post.id }),
    });

    if (!res.ok) {
      setStatus("فشل حذف المقال.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setSelected(null);
    setStatus("تم حذف المقال.");
  }

  function updatePost(patch: Partial<BlogPost>) {
    setSelected((old) => (old ? { ...old, ...patch } : old));
  }

  function updateLocalized(section: "title" | "excerpt" | "body" | "seoTitle" | "seoDescription", locale: Locale, value: string) {
    setSelected((old) =>
      old
        ? {
            ...old,
            [section]: {
              ...old[section],
              [locale]: value,
            },
          }
        : old
    );
  }

  function updateTags(value: string) {
    updatePost({
      tags: value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  }

  return (
    <div className="mx-auto max-w-7xl">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">إدارة البلوق</h1>
        <p className="mt-3 text-slate-500">
          إنشاء وتعديل المقالات بالعربي والإنجليزي مع SEO وصورة رئيسية.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_180px_auto_auto]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث بالعنوان أو التصنيف أو الوسوم..."
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3"
          >
            <option value="all">الكل</option>
            <option value="draft">مسودة</option>
            <option value="published">منشور</option>
          </select>

          <button onClick={loadPosts} className="rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700">
            تحديث
          </button>

          <button onClick={createPost} className="rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white">
            مقال جديد
          </button>
        </div>

        {status && <p className="mt-4 text-sm font-bold text-slate-500">{status}</p>}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[360px_1fr]">
        <section className="grid content-start gap-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`rounded-3xl p-5 text-right shadow-sm transition hover:-translate-y-1 ${
                selected?.id === item.id ? "bg-slate-950 text-white" : "bg-white text-slate-950"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="line-clamp-2 text-lg font-black">{item.title.ar || item.title.en}</h2>
                  <p className={`mt-2 text-xs font-bold ${selected?.id === item.id ? "text-white/60" : "text-slate-400"}`}>
                    /blog/{item.slug}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    item.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {item.status === "published" ? "منشور" : "مسودة"}
                </span>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              لا توجد مقالات.
            </div>
          )}
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          {selected ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black">تحرير المقال</h2>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`/ar/blog/${selected.slug}`}
                    target="_blank"
                    className="rounded-2xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700"
                  >
                    معاينة
                  </a>
                  <button
                    onClick={() => savePost()}
                    className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white"
                  >
                    حفظ
                  </button>
                  <button
                    onClick={() => deletePost(selected)}
                    className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600"
                  >
                    حذف
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-500">الحالة</span>
                    <select
                      value={selected.status}
                      onChange={(e) => updatePost({ status: e.target.value as BlogStatus })}
                      className="rounded-2xl border border-slate-200 px-4 py-3"
                    >
                      <option value="draft">مسودة</option>
                      <option value="published">منشور</option>
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-500">Slug</span>
                    <input
                      value={selected.slug}
                      onChange={(e) => updatePost({ slug: slugify(e.target.value) })}
                      className="rounded-2xl border border-slate-200 px-4 py-3"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-500">تاريخ النشر</span>
                    <input
                      value={selected.publishedAt.slice(0, 10)}
                      onChange={(e) => updatePost({ publishedAt: new Date(e.target.value).toISOString() })}
                      type="date"
                      className="rounded-2xl border border-slate-200 px-4 py-3"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-500">التصنيف</span>
                    <input
                      value={selected.category}
                      onChange={(e) => updatePost({ category: e.target.value })}
                      className="rounded-2xl border border-slate-200 px-4 py-3"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-500">الكاتب</span>
                    <input
                      value={selected.author}
                      onChange={(e) => updatePost({ author: e.target.value })}
                      className="rounded-2xl border border-slate-200 px-4 py-3"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-500">Tags مفصولة بفواصل</span>
                  <input
                    value={selected.tags.join(", ")}
                    onChange={(e) => updateTags(e.target.value)}
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                  />
                </label>

                <MediaUrlInput
                  label="صورة المقال الرئيسية"
                  value={selected.coverImageUrl}
                  folder="home"
                  onChange={(value) => updatePost({ coverImageUrl: value })}
                  placeholder="/media/home/blog-cover.webp"
                />

                <div className="grid gap-5 xl:grid-cols-2">
                  {(["ar", "en"] as Locale[]).map((locale) => (
                    <section key={locale} className="rounded-3xl border border-slate-200 p-5">
                      <h3 className="text-xl font-black">{locale === "ar" ? "العربي" : "English"}</h3>

                      <div className="mt-5 grid gap-4">
                        <label className="grid gap-2">
                          <span className="text-sm font-bold text-slate-500">العنوان</span>
                          <input
                            value={selected.title[locale]}
                            onChange={(e) => updateLocalized("title", locale, e.target.value)}
                            className="rounded-2xl border border-slate-200 px-4 py-3"
                          />
                        </label>

                        <label className="grid gap-2">
                          <span className="text-sm font-bold text-slate-500">المختصر</span>
                          <textarea
                            value={selected.excerpt[locale]}
                            onChange={(e) => updateLocalized("excerpt", locale, e.target.value)}
                            rows={3}
                            className="rounded-2xl border border-slate-200 px-4 py-3"
                          />
                        </label>

                        <label className="grid gap-2">
                          <span className="text-sm font-bold text-slate-500">المحتوى</span>
                          <textarea
                            value={selected.body[locale]}
                            onChange={(e) => updateLocalized("body", locale, e.target.value)}
                            rows={14}
                            className="rounded-2xl border border-slate-200 px-4 py-3 leading-8"
                          />
                        </label>

                        <label className="grid gap-2">
                          <span className="text-sm font-bold text-slate-500">SEO Title</span>
                          <input
                            value={selected.seoTitle[locale]}
                            onChange={(e) => updateLocalized("seoTitle", locale, e.target.value)}
                            className="rounded-2xl border border-slate-200 px-4 py-3"
                          />
                        </label>

                        <label className="grid gap-2">
                          <span className="text-sm font-bold text-slate-500">SEO Description</span>
                          <textarea
                            value={selected.seoDescription[locale]}
                            onChange={(e) => updateLocalized("seoDescription", locale, e.target.value)}
                            rows={3}
                            className="rounded-2xl border border-slate-200 px-4 py-3"
                          />
                        </label>
                      </div>
                    </section>
                  ))}
                </div>

                <MediaUrlInput
                  label="صورة OG للمقال"
                  value={selected.ogImageUrl}
                  folder="og"
                  onChange={(value) => updatePost({ ogImageUrl: value })}
                  placeholder="/media/og/post-og.webp"
                />

                <button
                  onClick={() => savePost()}
                  className="rounded-2xl bg-emerald-600 px-5 py-4 font-black text-white"
                >
                  حفظ المقال
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
              اختر مقالًا أو أنشئ مقال جديد.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
