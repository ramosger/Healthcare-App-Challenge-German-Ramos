import { env } from "@/config/env";

/**
 * Returns an absolute URL for images coming from the API.
 * If the backend sends a relative path (e.g. /storage/avatar.jpg),
 * we prefix it with the API base URL so the browser can load it correctly.
 */
export const buildMediaUrl = (path: string | null | undefined) => {
  if (!path) {
    return "";
  }

  try {
    return new URL(path, env.VITE_API_URL).toString();
  } catch {
    // If something goes wrong when building the URL, fall back to the original path.
    return path;
  }
};
