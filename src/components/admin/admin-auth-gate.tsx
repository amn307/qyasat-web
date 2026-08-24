"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { adminFetch, clearAdminLogin, getAdminAccessToken } from "@/lib/admin/client";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }

    const accessToken = getAdminAccessToken();

    if (!accessToken) {
      window.location.href = `/admin/login?next=${encodeURIComponent(pathname)}`;
      return;
    }

    adminFetch("/api/admin/login")
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        if (!data.authenticated) {
          throw new Error("Unauthorized");
        }

        setReady(true);
      })
      .catch(() => {
        clearAdminLogin();
        window.location.href = `/admin/login?next=${encodeURIComponent(pathname)}`;
      });
  }, [pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="text-xl font-black">جاري فتح لوحة التحكم...</div>
          <p className="mt-2 text-sm text-slate-500">إذا لم تكن مسجلًا، سيتم تحويلك لصفحة الدخول.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
