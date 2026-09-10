export type AuthUser = { name: string; email: string; createdAt: string };
export type StoredUser = AuthUser & { passwordHash: string };

export const USERS_KEY = "amdb.users";
export const SESSION_KEY = "amdb.session";

export function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getUsers(): StoredUser[] {
  return readJSON<StoredUser[]>(USERS_KEY) ?? [];
}

export function findUser(email: string): StoredUser | undefined {
  const normalized = normalizeEmail(email);
  return getUsers().find((u) => u.email === normalized);
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function readSession(): AuthUser | null {
  return readJSON<AuthUser>(SESSION_KEY);
}

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`amdb:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}