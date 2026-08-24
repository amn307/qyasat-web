import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { getMimeType, safeResolveMediaPath } from "@/lib/media/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params;
    const filePath = safeResolveMediaPath(path);
    const file = await fs.readFile(filePath);
    const mimeType = getMimeType(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Media not found." }, { status: 404 });
  }
}
