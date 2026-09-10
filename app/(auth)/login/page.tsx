"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { AuthShell } from "@/components/auth/AuthShell";
import {
  TextField,
  FieldError,
  SubmitButton,
} from "@/components/auth/form";

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn(email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Unable to sign in.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to the African Metabolome Database"
      footer={
        <span>
          New to the platform?{" "}
          <Link href="/signup" className="font-medium text-rose-600 hover:text-rose-500">
            Create an account
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FieldError message={error} />
        <TextField
          label="Email address"
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <TextField
            label="Password"
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link
            href="/forgot-password"
            className="absolute right-0 top-0 text-xs font-medium text-rose-600 hover:text-rose-500"
          >
            Forgot?
          </Link>
        </div>
        <SubmitButton loading={loading}>Sign in</SubmitButton>
      </form>
    </AuthShell>
  );
}