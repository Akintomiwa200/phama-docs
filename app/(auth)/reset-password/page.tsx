"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { AuthShell } from "@/components/auth/AuthShell";
import {
  TextField,
  FieldError,
  FieldSuccess,
  SubmitButton,
} from "@/components/auth/form";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await resetPassword(email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Unable to reset your password.");
      return;
    }
    setDone(true);
  }

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Set a fresh password for your account"
      footer={
        <span>
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500">
            Back to sign in
          </Link>
        </span>
      }
    >
      {done ? (
        <div className="space-y-4">
          <FieldSuccess message="Your password has been reset. Sign in with your new password." />
          <button
            onClick={() => router.push("/login")}
            className="w-full rounded-lg bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
          >
            Go to sign in
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldError message={error} />
          <TextField
            label="Email address"
            id="reset-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="New password"
            id="reset-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm new password"
            id="reset-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <SubmitButton loading={loading}>Reset password</SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}