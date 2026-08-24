import type { Metadata } from "next";
import { QyasatProjectsPage } from "@/components/projects/QyasatProjectsPage";

export const metadata: Metadata = {
  title: "Projects | Qyasat",
  description: "Qyasat projects across websites, content management systems, operating solutions, and automation.",
};

export const dynamic = "force-dynamic";

export default function EnglishProjectsPage() {
  return <QyasatProjectsPage locale="en" />;
}
