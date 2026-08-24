"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/lib/admin/client";

type Message = {
  id: string;
  locale: "ar" | "en";
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  status: "new" | "in_progress" | "done" | "archived";
  priority: "low" | "normal" | "high";
  internalNotes: string;
  source: "website";
  ip: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
};

const statusLabels = {
  new: "جديدة",
  in_progress: "قيد المتابعة",
  done: "منتهية",
  archived: "مؤرشفة",
};

const priorityLabels = {
  low: "منخفضة",
  normal: "عادية",
  high: "عالية",
};

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const text = `${item.name} ${item.phone} ${item.email} ${item.service} ${item.message}`.toLowerCase();
      return matchesStatus && (!q || text.includes(q));
    });
  }, [items, query, statusFilter]);

  const summary = useMemo(() => {
    return {
      total: items.length,
      new: items.filter((item) => item.status === "new").length,
      inProgress: items.filter((item) => item.status === "in_progress").length,
      done: items.filter((item) => item.status === "done").length,
    };
  }, [items]);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    setStatus("جاري تحميل الرسائل...");

    const res = await adminFetch("/api/admin/messages");

    if (!res.ok) {
      setStatus("فشل تحميل الرسائل. سجّل الدخول مرة أخرى.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setStatus("تم تحميل الرسائل.");
  }

  async function patchMessage(id: string, patch: Partial<Message>) {
    setStatus("جاري الحفظ...");

    const res = await adminFetch("/api/admin/messages", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...patch }),
    });

    if (!res.ok) {
      setStatus("فشل الحفظ.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setSelected(data.item || null);
    setStatus("تم الحفظ.");
  }

  async function deleteMessage(id: string) {
    const sure = window.confirm("حذف الرسالة؟");
    if (!sure) return;

    setStatus("جاري الحذف...");

    const res = await adminFetch("/api/admin/messages", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      setStatus("فشل الحذف.");
      return;
    }

    const data = await res.json();
    setItems(data.items || []);
    setSelected(null);
    setStatus("تم الحذف.");
  }

  return (
    <div className="mx-auto max-w-7xl">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">رسائل التواصل</h1>
        <p className="mt-3 text-slate-500">
          صندوق CRM بسيط للرسائل القادمة من نموذج التواصل.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-3xl bg-slate-100 p-5">
            <div className="text-sm font-bold text-slate-500">الإجمالي</div>
            <div className="mt-2 text-3xl font-black">{summary.total}</div>
          </div>
          <div className="rounded-3xl bg-blue-50 p-5">
            <div className="text-sm font-bold text-blue-600">جديدة</div>
            <div className="mt-2 text-3xl font-black">{summary.new}</div>
          </div>
          <div className="rounded-3xl bg-amber-50 p-5">
            <div className="text-sm font-bold text-amber-600">قيد المتابعة</div>
            <div className="mt-2 text-3xl font-black">{summary.inProgress}</div>
          </div>
          <div className="rounded-3xl bg-emerald-50 p-5">
            <div className="text-sm font-bold text-emerald-600">منتهية</div>
            <div className="mt-2 text-3xl font-black">{summary.done}</div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث بالاسم، الجوال، الإيميل، الرسالة..."
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3"
          >
            <option value="all">كل الحالات</option>
            <option value="new">جديدة</option>
            <option value="in_progress">قيد المتابعة</option>
            <option value="done">منتهية</option>
            <option value="archived">مؤرشفة</option>
          </select>

          <button onClick={loadMessages} className="rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white">
            تحديث
          </button>
        </div>

        {status && <p className="mt-4 text-sm font-bold text-slate-500">{status}</p>}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <section className="grid gap-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="rounded-3xl bg-white p-5 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.phone || "بدون جوال"} / {item.email || "بدون إيميل"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {statusLabels[item.status]}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {priorityLabels[item.priority]}
                  </span>
                </div>
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-7 text-slate-600">{item.message}</p>
              <p className="mt-3 text-xs font-bold text-slate-400">
                {new Date(item.createdAt).toLocaleString("ar-SA")}
              </p>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              لا توجد رسائل مطابقة.
            </div>
          )}
        </section>

        <aside className="rounded-3xl bg-white p-6 shadow-sm">
          {selected ? (
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">{selected.name}</h2>
                  <p className="mt-2 text-sm text-slate-500">{selected.service}</p>
                </div>
                <button
                  onClick={() => deleteMessage(selected.id)}
                  className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600"
                >
                  حذف
                </button>
              </div>

              <div className="mt-6 grid gap-3 text-sm text-slate-600">
                <div>
                  <b>الجوال:</b> {selected.phone || "-"}
                </div>
                <div>
                  <b>الإيميل:</b> {selected.email || "-"}
                </div>
                <div>
                  <b>الميزانية:</b> {selected.budget || "-"}
                </div>
                <div>
                  <b>التاريخ:</b> {new Date(selected.createdAt).toLocaleString("ar-SA")}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-700">
                {selected.message}
              </div>

              <div className="mt-6 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-500">الحالة</span>
                  <select
                    value={selected.status}
                    onChange={(e) => patchMessage(selected.id, { status: e.target.value as Message["status"] })}
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <option value="new">جديدة</option>
                    <option value="in_progress">قيد المتابعة</option>
                    <option value="done">منتهية</option>
                    <option value="archived">مؤرشفة</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-500">الأولوية</span>
                  <select
                    value={selected.priority}
                    onChange={(e) => patchMessage(selected.id, { priority: e.target.value as Message["priority"] })}
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <option value="low">منخفضة</option>
                    <option value="normal">عادية</option>
                    <option value="high">عالية</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-500">ملاحظات داخلية</span>
                  <textarea
                    value={selected.internalNotes}
                    onChange={(e) => setSelected({ ...selected, internalNotes: e.target.value })}
                    rows={5}
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                  />
                </label>

                <button
                  onClick={() => patchMessage(selected.id, { internalNotes: selected.internalNotes })}
                  className="rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white"
                >
                  حفظ الملاحظات
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              اختر رسالة لعرض التفاصيل.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
