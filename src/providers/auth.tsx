"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  type AuthUser,
  USERS_KEY,
  SESSION_KEY,
  writeJSON,
  getUsers,
  findUser,
  normalizeEmail,
  readSession,
  hashPassword,
} from "@/lib/authStorage";

type AuthResult = { ok: boolean; error?: string };

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResult>;
  resetPassword: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    return readSession();
  });

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
      setUser(session);
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
      if (password.length < 6) {
        return { ok: false, error: "Password must be at least 6 characters." };
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
      setUser(session);
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
      if (password.length < 6) {
        return { ok: false, error: "Password must be at least 6 characters." };
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
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, signIn, signUp, resetPassword, signOut }),
    [user, signIn, signUp, resetPassword, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!user) return null;
  return <>{children}</>;
}