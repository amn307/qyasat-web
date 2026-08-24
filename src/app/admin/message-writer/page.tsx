"use client";

import { type FormEvent, useEffect, useState } from "react";
import AdminPageShell from "../_components/AdminPageShell";

type Draft = {
  id: string;
  createdAt: string;
  title: string;
  body: string;
  input: {
    language?: "ar" | "en";
    channel?: string;
    tone?: string;
    audience?: string;
    goal?: string;
    details?: string;
    callToAction?: string;
  };
};

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#17130f] outline-none transition focus:border-[#17130f] focus:ring-4 focus:ring-black/5";

const textareaClass =
  "w-full min-h-36 resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm leading-8 text-[#17130f] outline-none transition focus:border-[#17130f] focus:ring-4 focus:ring-black/5";

const labelClass = "mb-2 block text-sm font-black text-[#302821]";

export default function MessageWriterPage() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [channel, setChannel] = useState("whatsapp");
  const [tone, setTone] = useState("professional");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [details, setDetails] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [activeDraft, setActiveDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const isArabic = language === "ar";

  async function loadDrafts() {
    const response = await fetch("/api/admin/message-writer", { cache: "no-store" });
    const data = await response.json();

    if (data?.ok) {
      setDrafts(data.drafts || []);
      if (!activeDraft && data.drafts?.[0]) setActiveDraft(data.drafts[0]);
    }
  }

  useEffect(() => {
    loadDrafts();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setCopied(false);

    try {
      const response = await fetch("/api/admin/message-writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          channel,
          tone,
          audience,
          goal,
          details,
          callToAction,
        }),
      });

      const data = await response.json();

      if (data?.ok) {
        setActiveDraft(data.draft);
        setDrafts((current) => [data.draft, ...current].slice(0, 30));
      }
    } finally {
      setLoading(false);
    }
  }

  async function copyDraft() {
    if (!activeDraft) return;
    await navigator.clipboard.writeText(activeDraft.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <AdminPageShell
      title="مساعد كتابة الرسائل"
      description="أنشئ رسائل واتساب، إيميلات، SMS، ونصوص موقع بنبرة مناسبة وسجل محفوظ داخل اللوحة."
      actions={
        <button
          type="button"
          onClick={copyDraft}
          disabled={!activeDraft}
          className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#17130f] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? "تم النسخ" : "نسخ المسودة"}
        </button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={submit} className="rounded-[2.2rem] border border-black/10 bg-white/75 p-6 shadow-sm backdrop-blur">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-[#8b6a3f]">Composer</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.02em]">إعداد الرسالة</h2>
            </div>
            <span className="rounded-full bg-[#17130f] px-4 py-2 text-xs font-black text-white">
              {channel}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>اللغة</label>
              <select className={inputClass} value={language} onChange={(event) => setLanguage(event.target.value as "ar" | "en")}>
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>القناة</label>
              <select className={inputClass} value={channel} onChange={(event) => setChannel(event.target.value)}>
                <option value="whatsapp">واتساب</option>
                <option value="email">إيميل</option>
                <option value="sms">رسالة قصيرة</option>
                <option value="website">نص موقع</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>النبرة</label>
              <select className={inputClass} value={tone} onChange={(event) => setTone(event.target.value)}>
                <option value="professional">احترافية</option>
                <option value="luxury">فاخرة</option>
                <option value="friendly">ودّية</option>
                <option value="sales">بيعية</option>
                <option value="apology">اعتذار ومعالجة</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>الجمهور</label>
              <input
                className={inputClass}
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                placeholder={isArabic ? "مثال: صاحب متجر، عميل محتمل" : "Example: store owner, lead"}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>هدف الرسالة</label>
              <input
                className={inputClass}
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                placeholder={isArabic ? "مثال: شرح خدمة تطوير موقع" : "Example: explain a website service"}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>التفاصيل</label>
              <textarea
                className={textareaClass}
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder={isArabic ? "اكتب النقاط المطلوبة في الرسالة..." : "Write the required points..."}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>الدعوة للإجراء</label>
              <input
                className={inputClass}
                value={callToAction}
                onChange={(event) => setCallToAction(event.target.value)}
                placeholder={isArabic ? "مثال: احجز مكالمة، اطلب عرض سعر" : "Example: book a call, request a quote"}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full bg-[#17130f] px-5 py-4 text-sm font-black text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "جاري الإنشاء..." : "إنشاء الرسالة"}
          </button>
        </form>

        <section className="space-y-5">
          <div className="rounded-[2.2rem] border border-black/10 bg-[#17130f] p-6 text-white shadow-xl">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-white/50">Current Draft</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
                  {activeDraft?.title || "لم يتم إنشاء رسالة بعد"}
                </h2>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white/70">
                Preview
              </span>
            </div>

            <pre className="min-h-96 whitespace-pre-wrap rounded-[1.8rem] border border-white/10 bg-white/5 p-5 text-sm leading-8 text-white/80">
              {activeDraft?.body || "ستظهر الرسالة هنا بعد إنشائها."}
            </pre>
          </div>

          <div className="rounded-[2.2rem] border border-black/10 bg-white/75 p-6 shadow-sm backdrop-blur">
            <h2 className="mb-4 text-xl font-black">آخر المسودات</h2>
            <div className="space-y-3">
              {drafts.length === 0 ? (
                <p className="text-sm font-bold text-[#6b6258]">لا توجد مسودات محفوظة بعد.</p>
              ) : (
                drafts.map((draft) => (
                  <button
                    key={draft.id}
                    type="button"
                    onClick={() => setActiveDraft(draft)}
                    className="block w-full rounded-[1.5rem] border border-black/10 bg-white p-4 text-start transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="font-black">{draft.title}</p>
                    <p className="mt-1 text-xs font-bold text-[#6b6258]">
                      {new Date(draft.createdAt).toLocaleString("ar-SA")}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </AdminPageShell>
  );
}
