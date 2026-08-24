import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import {
  createMessageWriterDraft,
  listMessageWriterDrafts,
  type MessageWriterInput,
} from "../../../../lib/message-writer-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isRequestAuthorized(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const drafts = await listMessageWriterDrafts();
  return NextResponse.json({ ok: true, drafts });
}

export async function POST(request: Request) {
  if (!isRequestAuthorized(request)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json().catch(() => ({}))) as MessageWriterInput;
  const draft = await createMessageWriterDraft(payload);
  return NextResponse.json({ ok: true, draft });
}
