import { getSiteTextDictionary, type SiteLocale } from "./site-texts-store";

export async function getPublicSiteTexts(locale: SiteLocale = "ar") {
  return getSiteTextDictionary(locale);
}

export function pickSiteText(
  dictionary: Record<string, string>,
  key: string,
  fallback: string,
) {
  return dictionary[key] || fallback;
}

export async function buildSiteMetadataText({
  locale = "ar",
  titleKey,
  descriptionKey,
  titleFallback,
  descriptionFallback,
}: {
  locale?: SiteLocale;
  titleKey: string;
  descriptionKey: string;
  titleFallback: string;
  descriptionFallback: string;
}) {
  const dictionary = await getPublicSiteTexts(locale);

  return {
    title: pickSiteText(dictionary, titleKey, titleFallback),
    description: pickSiteText(dictionary, descriptionKey, descriptionFallback),
  };
}
