import type { Metadata } from "next";
import { QyasatProjectsPage } from "@/components/projects/QyasatProjectsPage";

export const metadata: Metadata = {
  title: "المشاريع | قياسات",
  description: "مشاريع قياسات في المواقع، أنظمة إدارة المحتوى، وحلول التشغيل والأتمتة.",
};

export const dynamic = "force-dynamic";

export default function ArabicProjectsPage() {
  return <QyasatProjectsPage locale="ar" />;
}
