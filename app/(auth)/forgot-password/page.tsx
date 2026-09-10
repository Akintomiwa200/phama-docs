"use client";

import { useState } from "react";
import Link from "next/link";
import { getUsers } from "@/lib/authStorage";
import { AuthShell } from "@/components/auth/AuthShell";
import {
  TextField,
  FieldError,
  FieldSuccess,
  SubmitButton,
} from "@/components/auth/form";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!getUsers().some((u) => u.email === normalized)) {
      setError("No account found with that email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a secure reset link"
      footer={
        <span>
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500">
            Back to sign in
          </Link>
        </span>
      }
    >
      {sent ? (
        <div className="space-y-4">
          <FieldSuccess message="If an account exists for that email, a password reset link is on its way." />
          <Link
            href="/reset-password"
            className="block w-full rounded-lg bg-rose-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-rose-600"
          >
            Continue to reset password
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldError message={error} />
          <TextField
            label="Email address"
            id="forgot-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton loading={loading}>Send reset link</SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}