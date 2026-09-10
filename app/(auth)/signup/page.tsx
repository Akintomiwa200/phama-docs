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

export default function SignupPage() {
  const router = useRouter();
  const { user, signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await signUp(name, email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Unable to create your account.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <AuthShell
      title="Get started"
      subtitle="Create your researcher account"
      footer={
        <span>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500">
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FieldError message={error} />
        <TextField
          label="Full name"
          id="signup-name"
          type="text"
          autoComplete="name"
          placeholder="Dr. Jane Curator"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email address"
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          id="signup-password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm password"
          id="signup-confirm"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat your password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>
    </AuthShell>
  );
}