import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import {
  deleteMedia,
  ensureMediaFolders,
  listMedia,
  safeFolder,
  sanitizeFileName,
  uploadMedia,
} from "@/lib/media/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
]);

const maxFileSize = 8 * 1024 * 1024;

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const items = await listMedia();

  return NextResponse.json({
    ok: true,
    items,
  });
}

export async function POST(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const folder = safeFolder(formData.get("folder"));
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file uploaded." }, { status: 400 });
  }

  if (!allowedMimeTypes.has(file.type)) {
    return NextResponse.json({ ok: false, error: "Unsupported file type." }, { status: 400 });
  }

  if (file.size > maxFileSize) {
    return NextResponse.json({ ok: false, error: "File is too large. Max 8MB." }, { status: 400 });
  }

  const safeName = sanitizeFileName(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  await uploadMedia(folder, safeName, buffer, file.type);

  const items = await listMedia();
  const uploaded = items.find((item) => item.path === `${folder}/${safeName}`);

  return NextResponse.json({
    ok: true,
    item: uploaded,
    items,
  });
}

export async function DELETE(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const mediaPath = typeof body?.path === "string" ? body.path : "";

  if (!mediaPath) {
    return NextResponse.json({ ok: false, error: "Missing path." }, { status: 400 });
  }

  await deleteMedia(mediaPath);

  const items = await listMedia();

  return NextResponse.json({
    ok: true,
    items,
  });
}
