"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/lib/admin/client";

type MediaItem = {
  name: string;
  folder: "logos" | "home" | "services" | "og" | "misc";
  path: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
};

export function MediaUrlInput({
  label,
  value,
  onChange,
  folder,
  placeholder = "/media/logos/logo.png",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder?: MediaItem["folder"];
  placeholder?: string;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (!item.mimeType.startsWith("image/")) return false;
      if (folder && item.folder !== folder) return false;
      return true;
    });
  }, [items, folder]);

  async function loadMedia() {
    setStatus("تحميل الصور...");

    const res = await adminFetch("/api/admin/media");

    if (!res.ok) {
      setStatus("فشل تحميل الميديا.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setStatus("");
  }

  useEffect(() => {
    if (open && items.length === 0) {
      loadMedia();
    }
  }, [open, items.length]);

  return (
    <div className="grid gap-2">
      <span className="text-sm font-bold text-slate-500">{label}</span>

      <div className="grid gap-2 md:grid-cols-[1fr_auto_auto]">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-3"
          placeholder={placeholder}
        />

        <button
          type="button"
          onClick={() => setOpen((old) => !old)}
          className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700"
        >
          اختيار من الميديا
        </button>

        <a
          href="/admin/media"
          className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-700"
        >
          رفع
        </a>
      </div>

      {value ? (
        <div className="rounded-2xl border border-slate-200 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className="max-h-28 w-auto rounded-xl object-contain" />
        </div>
      ) : null}

      {open ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-black text-slate-700">
              الصور المتاحة {folder ? `/${folder}` : ""}
            </div>
            <button
              type="button"
              onClick={loadMedia}
              className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-600"
            >
              تحديث
            </button>
          </div>

          {status && <p className="mb-3 text-xs font-bold text-slate-500">{status}</p>}

          <div className="grid max-h-[360px] gap-3 overflow-auto sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => {
                  onChange(item.url);
                  setOpen(false);
                }}
                className="overflow-hidden rounded-2xl bg-white text-right shadow-sm hover:ring-2 hover:ring-blue-500"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.name} className="aspect-video w-full object-cover" />
                <div className="truncate p-3 text-xs font-bold text-slate-600">{item.name}</div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && !status ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              لا توجد صور. ارفع صورة من صفحة الميديا.
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
