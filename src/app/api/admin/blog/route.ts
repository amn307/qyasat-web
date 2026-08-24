import { NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin/auth";
import {
  createBlogPost,
  deleteBlogPost,
  listBlogPosts,
  updateBlogPost,
  type BlogPost,
} from "@/lib/blog/posts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const items = await listBlogPosts({ includeDrafts: true });

  return NextResponse.json({
    ok: true,
    items,
  });
}

export async function POST(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);

  const post = await createBlogPost({
    status: "draft",
    title: {
      ar: body?.title?.ar || "مقال جديد",
      en: body?.title?.en || "New Post",
    },
    excerpt: {
      ar: body?.excerpt?.ar || "",
      en: body?.excerpt?.en || "",
    },
    body: {
      ar: body?.body?.ar || "",
      en: body?.body?.en || "",
    },
    slug: body?.slug,
    author: body?.author || "قياسات",
    category: body?.category || "",
    tags: Array.isArray(body?.tags) ? body.tags : [],
    coverImageUrl: body?.coverImageUrl || "",
    ogImageUrl: body?.ogImageUrl || "",
  });

  const items = await listBlogPosts({ includeDrafts: true });

  return NextResponse.json({
    ok: true,
    item: post,
    items,
  });
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";

  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id." }, { status: 400 });
  }

  const patch: Partial<BlogPost> = {
    slug: body?.slug,
    status: body?.status === "published" ? "published" : "draft",
    title: body?.title,
    excerpt: body?.excerpt,
    body: body?.body,
    coverImageUrl: body?.coverImageUrl,
    category: body?.category,
    tags: Array.isArray(body?.tags) ? body.tags : [],
    author: body?.author,
    seoTitle: body?.seoTitle,
    seoDescription: body?.seoDescription,
    ogImageUrl: body?.ogImageUrl,
    publishedAt: body?.publishedAt,
  };

  const item = await updateBlogPost(id, patch);
  const items = await listBlogPosts({ includeDrafts: true });

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

  await deleteBlogPost(id);
  const items = await listBlogPosts({ includeDrafts: true });

  return NextResponse.json({
    ok: true,
    items,
  });
}
