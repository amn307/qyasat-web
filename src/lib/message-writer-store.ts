import { promises as fs } from "fs";
import path from "path";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { readCmsDocument, writeCmsDocument, requirePersistentStorage } from "@/lib/firebase/cms-store";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";

export type MessageWriterInput = {
  language?: "ar" | "en";
  channel?: "email" | "whatsapp" | "sms" | "website";
  tone?: "luxury" | "professional" | "friendly" | "sales" | "apology";
  audience?: string;
  goal?: string;
  details?: string;
  callToAction?: string;
};

export type MessageWriterDraft = {
  id: string;
  createdAt: string;
  input: MessageWriterInput;
  title: string;
  body: string;
};

type MessageWriterStore = {
  drafts: MessageWriterDraft[];
};

const dataFile = runtimeStoragePath("data", "message-writer.json");

async function readLocalStore(): Promise<MessageWriterStore> {
  try {
    const parsed = JSON.parse(await fs.readFile(dataFile, "utf8")) as MessageWriterStore;
    return { drafts: Array.isArray(parsed.drafts) ? parsed.drafts : [] };
  } catch {
    return { drafts: [] };
  }
}

async function ensureStore(): Promise<MessageWriterStore> {
  const local = await readLocalStore();
  if (!isFirebaseAdminConfigured()) return local;
  try {
    const stored = await readCmsDocument<MessageWriterStore>("message-writer");
    if (stored) return { drafts: Array.isArray(stored.drafts) ? stored.drafts : [] };
    if (local.drafts.length) await writeCmsDocument("message-writer", local);
    return local;
  } catch (error) {
    console.error("MESSAGE_WRITER_FIREBASE_READ_FAILED", error);
    return local;
  }
}

async function saveStore(store: MessageWriterStore) {
  if (isFirebaseAdminConfigured()) { await writeCmsDocument("message-writer", store); return; }
  requirePersistentStorage();
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2), "utf8");
}

function clean(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim();
}

function makeArabicDraft(input: MessageWriterInput) {
  const audience = clean(input.audience, "عميلنا العزيز");
  const goal = clean(input.goal, "توضيح الخدمة");
  const details = clean(input.details, "يسعدنا خدمتك وتقديم الحل الأنسب لاحتياجك.");
  const cta = clean(input.callToAction, "يسعدنا تواصلك معنا لنبدأ الخطوة التالية.");
  const channel = input.channel || "website";
  const tone = input.tone || "professional";

  const titleMap: Record<string, string> = {
    email: `رسالة إلى ${audience}`,
    whatsapp: `رد واتساب إلى ${audience}`,
    sms: `رسالة قصيرة إلى ${audience}`,
    website: `نص موقع إلى ${audience}`,
  };

  const introMap: Record<string, string> = {
    luxury: `أهلًا ${audience}،\n\nفي قياسات نؤمن أن التفاصيل الصغيرة تصنع تجربة رقمية فاخرة وواضحة.`,
    professional: `أهلًا ${audience}،\n\nشكرًا لتواصلك مع قياسات. يسعدنا توضيح التفاصيل لك بكل وضوح.`,
    friendly: `أهلًا ${audience}،\n\nسعداء جدًا بتواصلك معنا، وخلينا نوضح لك الصورة بشكل بسيط ومباشر.`,
    sales: `أهلًا ${audience}،\n\nفرصتك الآن لتحويل فكرتك إلى تجربة رقمية أقوى وأكثر جاهزية للنمو.`,
    apology: `أهلًا ${audience}،\n\nنعتذر لك عن أي إزعاج حصل، ونقدّر تواصلك معنا حتى نوضح الأمر ونعالجه بالشكل الصحيح.`,
  };

  const body = `${introMap[tone] || introMap.professional}

الهدف:
${goal}

التفاصيل:
${details}

الخطوة التالية:
${cta}

تحياتنا،
فريق قياسات`;

  return {
    title: titleMap[channel] || titleMap.website,
    body,
  };
}

function makeEnglishDraft(input: MessageWriterInput) {
  const audience = clean(input.audience, "our valued client");
  const goal = clean(input.goal, "explain the service");
  const details = clean(input.details, "We are happy to help you choose the right digital solution for your needs.");
  const cta = clean(input.callToAction, "Contact us so we can move to the next step.");
  const channel = input.channel || "website";
  const tone = input.tone || "professional";

  const titleMap: Record<string, string> = {
    email: `Message to ${audience}`,
    whatsapp: `WhatsApp reply to ${audience}`,
    sms: `Short message to ${audience}`,
    website: `Website copy for ${audience}`,
  };

  const introMap: Record<string, string> = {
    luxury: `Hello ${audience},\n\nAt قياسات, we believe refined details create a stronger and more premium digital experience.`,
    professional: `Hello ${audience},\n\nThank you for contacting قياسات. We are happy to clarify the details for you.`,
    friendly: `Hello ${audience},\n\nWe are glad you reached out. Here is a simple and clear overview.`,
    sales: `Hello ${audience},\n\nThis is the right moment to turn your idea into a stronger digital experience ready for growth.`,
    apology: `Hello ${audience},\n\nWe apologize for any inconvenience and appreciate the opportunity to clarify and resolve this properly.`,
  };

  const body = `${introMap[tone] || introMap.professional}

Goal:
${goal}

Details:
${details}

Next step:
${cta}

Best regards,
قياسات Team`;

  return {
    title: titleMap[channel] || titleMap.website,
    body,
  };
}

export async function listMessageWriterDrafts() {
  const store = await ensureStore();
  return store.drafts.slice(0, 30);
}

export async function createMessageWriterDraft(input: MessageWriterInput) {
  const normalizedInput: MessageWriterInput = {
    language: input.language === "en" ? "en" : "ar",
    channel: input.channel || "website",
    tone: input.tone || "professional",
    audience: clean(input.audience),
    goal: clean(input.goal),
    details: clean(input.details),
    callToAction: clean(input.callToAction),
  };

  const generated =
    normalizedInput.language === "en"
      ? makeEnglishDraft(normalizedInput)
      : makeArabicDraft(normalizedInput);

  const draft: MessageWriterDraft = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
    input: normalizedInput,
    title: generated.title,
    body: generated.body,
  };

  const store = await ensureStore();
  store.drafts = [draft, ...store.drafts].slice(0, 100);
  await saveStore(store);

  return draft;
}
