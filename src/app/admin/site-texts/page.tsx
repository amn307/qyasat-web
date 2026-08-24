"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import AdminPageShell from "../_components/AdminPageShell";

type SiteTextItem = {
  id: string;
  key: string;
  namespace: string;
  label: string;
  ar: string;
  en: string;
  hint?: string;
  updatedAt: string;
};

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#17130f] outline-none transition focus:border-[#17130f] focus:ring-4 focus:ring-black/5";

const textareaClass =
  "w-full min-h-28 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm leading-7 text-[#17130f] outline-none transition focus:border-[#17130f] focus:ring-4 focus:ring-black/5";

export default function SiteTextsAdminPage() {
  const [items, setItems] = useState<SiteTextItem[]>([]);
  const [activeNamespace, setActiveNamespace] = useState("all");
  const [query, setQuery] = useState("");
  const [savingKey, setSavingKey] = useState("");
  const [languagePreview, setLanguagePreview] = useState<"ar" | "en">("ar");
  const [newItem, setNewItem] = useState({
    key: "",
    namespace: "general",
    label: "",
    ar: "",
    en: "",
    hint: "",
  });

  async function loadItems() {
    const response = await fetch("/api/admin/site-texts", { cache: "no-store" });
    const data = await response.json();
    if (data?.ok) setItems(data.items || []);
  }

  useEffect(() => {
    loadItems();
  }, []);

  const namespaces = useMemo(() => {
    return ["all", ...Array.from(new Set(items.map((item) => item.namespace))).sort()];
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const namespaceMatch = activeNamespace === "all" || item.namespace === activeNamespace;
      const queryMatch =
        !normalizedQuery ||
        item.key.toLowerCase().includes(normalizedQuery) ||
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.ar.toLowerCase().includes(normalizedQuery) ||
        item.en.toLowerCase().includes(normalizedQuery);

      return namespaceMatch && queryMatch;
    });
  }, [items, activeNamespace, query]);

  function updateLocalItem(key: string, field: keyof SiteTextItem, value: string) {
    setItems((current) =>
      current.map((item) => (item.key === key ? { ...item, [field]: value } : item)),
    );
  }

  async function saveItem(item: SiteTextItem) {
    setSavingKey(item.key);

    try {
      const response = await fetch("/api/admin/site-texts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      const data = await response.json();

      if (data?.ok) {
        setItems((current) =>
          current.map((currentItem) => (currentItem.key === data.item.key ? data.item : currentItem)),
        );
      }
    } finally {
      setSavingKey("");
    }
  }

  async function deleteItem(key: string) {
    const response = await fetch("/api/admin/site-texts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    const data = await response.json();

    if (data?.ok) {
      setItems((current) => current.filter((item) => item.key !== key));
    }
  }

  async function createItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingKey("new");

    try {
      const response = await fetch("/api/admin/site-texts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();

      if (data?.ok) {
        setItems((current) => [data.item, ...current.filter((item) => item.key !== data.item.key)]);
        setNewItem({ key: "", namespace: "general", label: "", ar: "", en: "", hint: "" });
      }
    } finally {
      setSavingKey("");
    }
  }

  async function copyPublicEndpoint() {
    await navigator.clipboard.writeText(`/api/site-texts?locale=${languagePreview}`);
  }

  return (
    <AdminPageShell
      title="إدارة نصوص الموقع"
      description="تحكم مركزي بكل النصوص العربية والإنجليزية حسب المفتاح والقسم، مع واجهة مناسبة للتحرير السريع."
      actions={
        <button
          type="button"
          onClick={copyPublicEndpoint}
          className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#17130f] transition hover:-translate-y-0.5"
        >
          نسخ API النصوص
        </button>
      }
    >
      <section className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <form onSubmit={createItem} className="rounded-[2.2rem] border border-black/10 bg-white/75 p-6 shadow-sm backdrop-blur">
          <div className="mb-6">
            <p className="text-sm font-black text-[#8b6a3f]">New Text</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.02em]">إضافة نص جديد</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-black">المفتاح</label>
              <input
                className={inputClass}
                value={newItem.key}
                onChange={(event) => setNewItem((current) => ({ ...current, key: event.target.value }))}
                placeholder="site.section.title"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-black">القسم</label>
                <input
                  className={inputClass}
                  value={newItem.namespace}
                  onChange={(event) => setNewItem((current) => ({ ...current, namespace: event.target.value }))}
                  placeholder="homepage"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black">الاسم الداخلي</label>
                <input
                  className={inputClass}
                  value={newItem.label}
                  onChange={(event) => setNewItem((current) => ({ ...current, label: event.target.value }))}
                  placeholder="Hero Title"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">النص العربي</label>
              <textarea
                className={textareaClass}
                value={newItem.ar}
                onChange={(event) => setNewItem((current) => ({ ...current, ar: event.target.value }))}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">النص الإنجليزي</label>
              <textarea
                className={textareaClass}
                dir="ltr"
                value={newItem.en}
                onChange={(event) => setNewItem((current) => ({ ...current, en: event.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={savingKey === "new"}
              className="w-full rounded-full bg-[#17130f] px-5 py-4 text-sm font-black text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              {savingKey === "new" ? "جاري الحفظ..." : "إضافة النص"}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="rounded-[2.2rem] border border-black/10 bg-white/75 p-5 shadow-sm backdrop-blur">
            <div className="grid gap-3 md:grid-cols-[1fr_0.42fr_0.24fr]">
              <input
                className={inputClass}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث بالمفتاح أو النص..."
              />

              <select
                className={inputClass}
                value={activeNamespace}
                onChange={(event) => setActiveNamespace(event.target.value)}
              >
                {namespaces.map((namespace) => (
                  <option key={namespace} value={namespace}>
                    {namespace === "all" ? "كل الأقسام" : namespace}
                  </option>
                ))}
              </select>

              <select
                className={inputClass}
                value={languagePreview}
                onChange={(event) => setLanguagePreview(event.target.value as "ar" | "en")}
              >
                <option value="ar">AR</option>
                <option value="en">EN</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredItems.map((item) => (
              <article key={item.key} className="rounded-[2.2rem] border border-black/10 bg-white/75 p-5 shadow-sm backdrop-blur">
                <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#8b6a3f]/10 px-3 py-1 text-xs font-black text-[#8b6a3f]">
                        {item.namespace}
                      </span>
                      <code dir="ltr" className="rounded-full bg-[#17130f] px-3 py-1 text-xs font-bold text-white">
                        {item.key}
                      </code>
                    </div>

                    <input
                      className="mt-3 w-full rounded-xl border border-transparent bg-transparent text-lg font-black outline-none focus:border-black/10 focus:bg-white"
                      value={item.label}
                      onChange={(event) => updateLocalItem(item.key, "label", event.target.value)}
                    />

                    <p className="mt-1 text-xs font-bold text-[#6b6258]">
                      آخر تحديث: {new Date(item.updatedAt).toLocaleString("ar-SA")}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveItem(item)}
                      disabled={savingKey === item.key}
                      className="rounded-full bg-[#17130f] px-4 py-3 text-sm font-black text-white disabled:opacity-50"
                    >
                      {savingKey === item.key ? "حفظ..." : "حفظ"}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteItem(item.key)}
                      className="rounded-full border border-red-200 bg-white px-4 py-3 text-sm font-black text-red-600"
                    >
                      حذف
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-black">عربي</label>
                    <textarea
                      className={textareaClass}
                      value={item.ar}
                      onChange={(event) => updateLocalItem(item.key, "ar", event.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black">English</label>
                    <textarea
                      className={textareaClass}
                      dir="ltr"
                      value={item.en}
                      onChange={(event) => updateLocalItem(item.key, "en", event.target.value)}
                    />
                  </div>
                </div>
              </article>
            ))}

            {filteredItems.length === 0 && (
              <div className="rounded-[2.2rem] border border-dashed border-black/20 bg-white/75 p-10 text-center text-sm font-bold text-[#6b6258]">
                لا توجد نصوص مطابقة للبحث الحالي.
              </div>
            )}
          </div>
        </div>
      </section>
    </AdminPageShell>
  );
}
