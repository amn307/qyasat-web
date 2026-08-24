import { readSiteTheme, themeToCssVariables } from "@/lib/theme/site-theme";

export async function ThemeStyle() {
  const theme = await readSiteTheme();

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Cairo:wght@400;500;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&family=Noto+Kufi+Arabic:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&family=Roboto:wght@400;500;700;900&family=Tajawal:wght@400;500;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style
        id="qyasat-site-theme"
        dangerouslySetInnerHTML={{
          __html: themeToCssVariables(theme),
        }}
      />
    </>
  );
}
