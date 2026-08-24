"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/lib/admin/client";

type MediaItem = {
  name: string;
  folder: "logos" | "home" | "services" | "blog" | "og" | "misc";
  path: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
};

const folders = [
  { value: "logos", label: "Logos" },
  { value: "home", label: "Home" },
  { value: "services", label: "Services" },
  { value: "blog", label: "Blog" },
  { value: "og", label: "Open Graph" },
  { value: "misc", label: "Misc" },
] as const;

function formatSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [folder, setFolder] = useState<MediaItem["folder"]>("misc");
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return items;

    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.folder.toLowerCase().includes(q) ||
        item.mimeType.toLowerCase().includes(q)
      );
    });
  }, [items, query]);

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    setStatus("جاري تحميل الملفات...");

    const res = await adminFetch("/api/admin/media");

    if (!res.ok) {
      setStatus("فشل تحميل الملفات. سجّل الدخول مرة أخرى.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setStatus("تم تحميل الملفات.");
  }

  async function uploadFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      setStatus("اختر ملف أولًا.");
      return;
    }

    setUploading(true);
    setStatus("جاري الرفع...");

    const formData = new FormData();
    formData.append("folder", folder);
    formData.append("file", file);

    const res = await adminFetch("/api/admin/media", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      setStatus(error?.error || "فشل رفع الملف.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setFile(null);
    setStatus("تم رفع الملف.");
  }

  async function deleteFile(item: MediaItem) {
    const sure = window.confirm(`حذف الملف؟\n${item.path}`);

    if (!sure) return;

    setStatus("جاري حذف الملف...");

    const res = await adminFetch("/api/admin/media", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: item.path }),
    });

    if (!res.ok) {
      setStatus("فشل حذف الملف.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setStatus("تم حذف الملف.");
  }

  async function copyUrl(url: string) {
    const absolute = `${window.location.origin}${url}`;
    await navigator.clipboard.writeText(absolute);
    setStatus("تم نسخ الرابط.");
  }

  return (
    <div className="mx-auto max-w-7xl">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">مكتبة الملفات والصور</h1>
        <p className="mt-3 text-slate-500">
          ارفع الشعارات، صور الصفحة الرئيسية، صور الخدمات، وصور Open Graph. كل ملف يأخذ رابط مباشر.
        </p>

        <form onSubmit={uploadFile} className="mt-6 grid gap-3 lg:grid-cols-[180px_1fr_auto_auto]">
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value as MediaItem["folder"])}
            className="rounded-2xl border border-slate-200 px-4 py-3"
          >
            {folders.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
          />

          <button
            disabled={uploading}
            className="rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white disabled:opacity-50"
          >
            رفع
          </button>

          <button
            type="button"
            onClick={loadMedia}
            className="rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700"
          >
            تحديث
          </button>
        </form>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث بالاسم أو النوع..."
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600">
            {filteredItems.length} ملف
          </div>
        </div>

        {status && <p className="mt-4 text-sm font-bold text-slate-500">{status}</p>}
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <article key={item.path} className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="flex aspect-video items-center justify-center bg-slate-100">
              {item.mimeType.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div className="text-sm font-black text-slate-400">PDF / FILE</div>
              )}
            </div>

            <div className="p-5">
              <div className="truncate text-sm font-black">{item.name}</div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">{item.folder}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{formatSize(item.size)}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => copyUrl(item.url)}
                  className="rounded-2xl bg-slate-950 px-3 py-2 text-sm font-bold text-white"
                >
                  نسخ الرابط
                </button>

                <button
                  onClick={() => deleteFile(item)}
                  className="rounded-2xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600"
                >
                  حذف
                </button>
              </div>

              <a
                href={item.url}
                target="_blank"
                className="mt-3 block truncate text-xs font-bold text-blue-600"
              >
                {item.url}
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
