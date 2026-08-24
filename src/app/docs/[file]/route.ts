import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ file: string }> }
) {
  const { file } = await context.params;

  if (file !== "PROJECT_MAP.md") {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  const fullPath = path.join(process.cwd(), "docs", file);
  const raw = await fs.readFile(fullPath, "utf8");

  return new NextResponse(raw, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
