import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import {
  deleteContactMessage,
  listContactMessages,
  updateContactMessage,
  type ContactMessagePriority,
  type ContactMessageStatus,
} from "@/lib/contact/messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statuses = new Set(["new", "in_progress", "done", "archived"]);
const priorities = new Set(["low", "normal", "high"]);

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const items = await listContactMessages();

  return NextResponse.json({
    ok: true,
    items,
    summary: {
      total: items.length,
      new: items.filter((item) => item.status === "new").length,
      inProgress: items.filter((item) => item.status === "in_progress").length,
      done: items.filter((item) => item.status === "done").length,
    },
  });
}

export async function PATCH(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";

  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id." }, { status: 400 });
  }

  const patch: {
    status?: ContactMessageStatus;
    priority?: ContactMessagePriority;
    internalNotes?: string;
  } = {};

  if (statuses.has(body?.status)) {
    patch.status = body.status;
  }

  if (priorities.has(body?.priority)) {
    patch.priority = body.priority;
  }

  if (typeof body?.internalNotes === "string") {
    patch.internalNotes = body.internalNotes.slice(0, 3000);
  }

  const item = await updateContactMessage(id, patch);
  const items = await listContactMessages();

  return NextResponse.json({
    ok: true,
    item,
    items,
  });
}

export async function DELETE(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";

  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id." }, { status: 400 });
  }

  await deleteContactMessage(id);
  const items = await listContactMessages();

  return NextResponse.json({
    ok: true,
    items,
  });
}
