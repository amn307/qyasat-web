import { getHomepageContent, saveHomepageContent, type HomeCard } from "@/lib/homepage-content";

export type ServiceItem = {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  tag: { ar: string; en: string };
  icon: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
};

function slugify(value: string, index: number) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `service-${index + 1}`;
}

function normalizeCard(card: HomeCard | undefined, index: number): Required<HomeCard> {
  const title = card?.title || "";
  return {
    id: card?.id || slugify(title, index),
    icon: card?.icon || String(index + 1).padStart(2, "0"),
    title,
    description: card?.description || "",
    tag: card?.tag || "",
    imageUrl: card?.imageUrl || "",
    isActive: card?.isActive !== false,
    order: typeof card?.order === "number" ? card.order : index + 1,
  };
}

export async function readServices(): Promise<ServiceItem[]> {
  const arCards = (await getHomepageContent("ar")).services.items.map(normalizeCard);
  const enCards = (await getHomepageContent("en")).services.items.map(normalizeCard);
  const length = Math.max(arCards.length, enCards.length);

  return Array.from({ length }, (_, index) => {
    const ar = arCards[index];
    const en = enCards[index];
    const shared = en || ar || normalizeCard(undefined, index);

    return {
      id: ar?.id || en?.id || `service-${index + 1}`,
      title: { ar: ar?.title || "", en: en?.title || "" },
      description: { ar: ar?.description || "", en: en?.description || "" },
      tag: { ar: ar?.tag || "", en: en?.tag || "" },
      icon: shared.icon,
      imageUrl: shared.imageUrl,
      isActive: shared.isActive,
      order: shared.order,
    };
  }).sort((a, b) => a.order - b.order);
}

export async function saveServices(input: ServiceItem[]): Promise<ServiceItem[]> {
  const items = input.map((item, index) => ({
    id: item.id?.trim() || `service-${Date.now()}-${index}`,
    title: {
      ar: item.title?.ar || "",
      en: item.title?.en || "",
    },
    description: {
      ar: item.description?.ar || "",
      en: item.description?.en || "",
    },
    tag: {
      ar: item.tag?.ar || "",
      en: item.tag?.en || "",
    },
    icon: item.icon || String(index + 1).padStart(2, "0"),
    imageUrl: item.imageUrl || "",
    isActive: item.isActive !== false,
    order: Number.isFinite(item.order) ? item.order : index + 1,
  }));

  const arHome = await getHomepageContent("ar");
  const enHome = await getHomepageContent("en");

  await saveHomepageContent(
    {
      ...arHome,
      services: {
        ...arHome.services,
        items: items.map((item) => ({
          id: item.id,
          icon: item.icon,
          title: item.title.ar,
          description: item.description.ar,
          tag: item.tag.ar,
          imageUrl: item.imageUrl,
          isActive: item.isActive,
          order: item.order,
        })),
      },
    },
    "ar"
  );

  await saveHomepageContent(
    {
      ...enHome,
      services: {
        ...enHome.services,
        items: items.map((item) => ({
          id: item.id,
          icon: item.icon,
          title: item.title.en,
          description: item.description.en,
          tag: item.tag.en,
          imageUrl: item.imageUrl,
          isActive: item.isActive,
          order: item.order,
        })),
      },
    },
    "en"
  );

  return readServices();
}
