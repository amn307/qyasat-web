import path from "node:path";

export function runtimeStoragePath(...parts: string[]) {
  const base =
    process.env.NODE_ENV === "production" && !process.env.FIREBASE_PROJECT_ID
      ? path.join("/tmp", "qyasat-cms")
      : process.cwd();
  return path.join(base, ...parts);
}

export function isEphemeralStorage() {
  return process.env.NODE_ENV === "production" && !process.env.FIREBASE_PROJECT_ID;
}
