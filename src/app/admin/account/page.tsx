"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin/client";

export default function AdminAccountPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("جاري تحميل الحساب...");

  useEffect(() => {
    adminFetch("/api/admin/account").then(async (res) => {
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEmail(data.email || "");
      setStatus("");
    }).catch(() => setStatus("تعذر تحميل بيانات الحساب."));
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">حساب الإدارة</h1>
        <p className="mt-3 text-slate-500">تسجيل الدخول وإدارة كلمة المرور تتم الآن من Firebase Authentication.</p>
        <div className="mt-8 grid gap-5">
          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="text-sm font-bold text-slate-500">الحساب الحالي</div>
            <div className="mt-2 text-lg font-black" dir="ltr">{email || status}</div>
          </div>
          <div className="rounded-2xl bg-blue-50 p-5 text-sm font-bold leading-7 text-blue-800">
            لتغيير كلمة المرور أو إضافة مدير جديد: Firebase Console → Authentication → Users.
            أضف بريد المدير أيضًا إلى متغير FIREBASE_ADMIN_EMAILS في الخادم، مفصولًا بفواصل.
          </div>
        </div>
      </section>
    </div>
  );
}
