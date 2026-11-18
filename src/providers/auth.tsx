"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import {
  type AuthUser,
  SESSION_KEY,
  USERS_KEY,
  writeJSON,
  getUsers,
  findUser,
  normalizeEmail,
  hashPassword,
} from "@/lib/authStorage";

type AuthResult = { ok: boolean; error?: string };

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResult>;
  resetPassword: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => void;
};

/* --------------------------------------------------------------------------
   Session store — localStorage read through useSyncExternalStore so the
   server HTML (signed out) and the hydrated client agree, then the stored
   session is adopted after hydration without any setState-in-effect.
   -------------------------------------------------------------------------- */
const listeners = new Set<() => void>();

function emitSession() {
  listeners.forEach((listener) => listener());
}

function subscribeSession(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (!event.key || event.key === SESSION_KEY) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSessionSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

function getSessionServerSnapshot(): null {
  return null;
}

const subscribeNoop = () => () => {};
const getClientReady = () => true;
const getServerReady = () => false;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const sessionRaw = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getSessionServerSnapshot
  );
  // False during SSR/hydration, true once the client is live.
  const ready = useSyncExternalStore(
    subscribeNoop,
    getClientReady,
    getServerReady
  );

  const user = useMemo<AuthUser | null>(() => {
    if (!sessionRaw) return null;
    try {
      return JSON.parse(sessionRaw) as AuthUser;
    } catch {
      return null;
    }
  }, [sessionRaw]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const existing = findUser(email);
      if (!existing) {
        return { ok: false, error: "No account found with that email address." };
      }
      const hash = await hashPassword(password);
      if (hash !== existing.passwordHash) {
        return { ok: false, error: "Incorrect password. Try again." };
      }
      const session: AuthUser = {
        name: existing.name,
        email: existing.email,
        createdAt: existing.createdAt,
      };
      writeJSON(SESSION_KEY, session);
      emitSession();
      return { ok: true };
    },
    []
  );

  const signUp = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<AuthResult> => {
      const normalized = normalizeEmail(email);
      if (!name.trim()) return { ok: false, error: "Please enter your name." };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
        return { ok: false, error: "Enter a valid email address." };
      }
      if (password.length < 8) {
        return { ok: false, error: "Password must be at least 8 characters." };
      }
      if (!/[A-Z]/.test(password)) {
        return {
          ok: false,
          error: "Password must include one uppercase letter.",
        };
      }
      if (!/[0-9]/.test(password)) {
        return { ok: false, error: "Password must include one number." };
      }
      if (findUser(normalized)) {
        return {
          ok: false,
          error: "An account with that email already exists. Sign in instead.",
        };
      }
      const passwordHash = await hashPassword(password);
      const newUser = {
        name: name.trim(),
        email: normalized,
        createdAt: new Date().toISOString(),
        passwordHash,
      };
      writeJSON(USERS_KEY, [...getUsers(), newUser]);
      const session: AuthUser = {
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      };
      writeJSON(SESSION_KEY, session);
      emitSession();
      return { ok: true };
    },
    []
  );

  const resetPassword = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const existing = findUser(email);
      if (!existing) {
        return { ok: false, error: "No account found with that email address." };
      }
      if (password.length < 8) {
        return { ok: false, error: "Password must be at least 8 characters." };
      }
      if (!/[A-Z]/.test(password)) {
        return {
          ok: false,
          error: "Password must include one uppercase letter.",
        };
      }
      if (!/[0-9]/.test(password)) {
        return { ok: false, error: "Password must include one number." };
      }
      const passwordHash = await hashPassword(password);
      const users = getUsers().map((u) =>
        u.email === existing.email ? { ...u, passwordHash } : u
      );
      writeJSON(USERS_KEY, users);
      return { ok: true };
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    emitSession();
  }, []);

  const value = useMemo(
    () => ({ user, ready, signIn, signUp, resetPassword, signOut }),
    [user, ready, signIn, signUp, resetPassword, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) return null;
  return <>{children}</>;
}