import { ReactNode } from "react";
import AdminPageShell from "../_components/AdminPageShell";

export default function AdminBlogLayout({ children }: { children: ReactNode }) {
  return (
    <AdminPageShell
      title="إدارة المدونة"
      description="إدارة المقالات، السلاج، الحالة، المحتوى العربي والإنجليزي، وتهيئة SEO."
      compact
    >
      <div className="rounded-[2.2rem] border border-black/10 bg-white/75 p-4 shadow-sm backdrop-blur md:p-5">
        {children}
      </div>
    </AdminPageShell>
  );
}
