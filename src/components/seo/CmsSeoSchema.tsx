import { safeSchemaJson } from "@/lib/seo/pages";

export function CmsSeoSchema({ schemaJson }: { schemaJson: string }) {
  const schema = safeSchemaJson(schemaJson);
  if (!schema) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
