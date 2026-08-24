const ADMIN_AUTH_STORAGE_KEY = "qyasat_admin_auth";

export function getAdminAccessToken() {
  if (typeof window === "undefined") return "";

  try {
    const raw = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
    if (!raw) return "";

    const parsed = JSON.parse(raw);
    return typeof parsed?.accessToken === "string" ? parsed.accessToken : "";
  } catch {
    return "";
  }
}

export function saveAdminLogin(data: { accessToken: string; username: string }) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    ADMIN_AUTH_STORAGE_KEY,
    JSON.stringify({
      accessToken: data.accessToken,
      username: data.username,
      savedAt: new Date().toISOString(),
    })
  );
}

export function clearAdminLogin() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
}

export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  const accessToken = getAdminAccessToken();

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}
