"use client";

import { useEffect, useState } from "react";
import { clearAdminLogin, saveAdminLogin } from "@/lib/admin/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nextUrl, setNextUrl] = useState("/admin");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("logout") === "1") {
      clearAdminLogin();
      setStatus("تم تسجيل الخروج.");
    }

    setNextUrl(params.get("next") || "/admin");
  }, []);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus("جاري تسجيل الدخول...");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      setStatus("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      return;
    }

    const data = await res.json();

    if (!data.accessToken) {
      setStatus("فشل إنشاء الدخول.");
      return;
    }

    saveAdminLogin({
      accessToken: data.accessToken,
      username: data.username,
    });

    window.location.href = nextUrl;
  }

  return (
    <main dir="rtl" className="flex min-h-[80vh] items-center justify-center p-6 text-slate-950">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="text-3xl font-black">قياسات</div>
        <p className="mt-2 text-sm text-slate-500">
          سجّل الدخول بحساب Firebase Authentication المصرّح له.
        </p>

        <form onSubmit={login} className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">البريد الإلكتروني</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-900"
              placeholder="admin@qyasat.sa"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">كلمة المرور</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-900"
              placeholder="كلمة المرور"
            />
          </label>

          <button
            disabled={loading}
            className="rounded-2xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-50"
          >
            دخول
          </button>

          {status && <p className="text-sm font-bold text-slate-500">{status}</p>}
        </form>
      </section>
    </main>
  );
}
