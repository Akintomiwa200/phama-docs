"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getUsers } from "@/lib/authStorage";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthNotice } from "@/components/auth/AuthNotice";
import SmoothButton from "@/components/smoothui/smooth-button";
import {
  DURATION_INSTANT,
  SPRING_SNAPPY,
} from "@/components/smoothui/lib/animation";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | undefined>();
  const [sentEmail, setSentEmail] = useState("");

  const isEmailValid = EMAIL_PATTERN.test(email.trim());
  const isSubmitting = status === "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    const normalized = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(normalized)) {
      setStatus("error");
      setError("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 450));

    if (!getUsers().some((user) => user.email === normalized)) {
      setStatus("error");
      setError("No account found with that email address.");
      return;
    }

    setSentEmail(normalized);
    setStatus("success");
  }

  return (
    <AuthShell>
      {status === "success" ? (
        <AuthNotice
          icon={MailCheck}
          title="Check your inbox"
          action={
            <>
              <SmoothButton
                className="w-full font-semibold text-sm"
                onClick={() =>
                  router.push(
                    `/reset-password?email=${encodeURIComponent(sentEmail)}`
                  )
                }
                size="lg"
                type="button"
                variant="candy"
              >
                Continue to reset password
              </SmoothButton>
              <Link
                className="text-center text-xs font-medium text-muted-foreground transition-colors hover:text-brand dark:hover:text-rose-400"
                href="/login"
              >
                Back to sign in
              </Link>
            </>
          }
        >
          If an account exists for{" "}
          <span className="font-medium text-foreground">{sentEmail}</span>, a
          password reset link is on its way. This demo lets you continue
          directly to the reset form.
        </AuthNotice>
      ) : (
        <div className="w-full max-w-sm">
          <h2 className="font-semibold text-foreground text-xl">
            Reset your password
          </h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Enter your account email and we&rsquo;ll send a reset link.
          </p>

          <AnimatePresence initial={false}>
            {status === "error" && error ? (
              <motion.div
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { height: "auto", opacity: 1 }
                }
                className="mt-4 overflow-hidden"
                exit={
                  shouldReduceMotion
                    ? { opacity: 0, transition: { duration: 0 } }
                    : { height: 0, opacity: 0 }
                }
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { height: 0, opacity: 0 }
                }
                transition={
                  shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY
                }
              >
                <div
                  className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-destructive text-sm"
                  role="alert"
                >
                  {error}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-1.5">
              <label
                className="font-medium text-foreground text-sm"
                htmlFor="forgot-email"
              >
                Email
              </label>
              <input
                autoComplete="email"
                className="min-h-[44px] w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive dark:border-gray-800 dark:bg-gray-900/40 dark:focus-visible:border-rose-400"
                disabled={isSubmitting}
                id="forgot-email"
                inputMode="email"
                name="email"
                onChange={(event) => {
                  setError(undefined);
                  if (status === "error") setStatus("idle");
                  setEmail(event.target.value);
                }}
                required
                type="email"
                value={email}
              />
            </div>

            <SmoothButton
              className="mt-1 w-full font-semibold text-sm"
              disabled={isSubmitting || !isEmailValid}
              loading={isSubmitting}
              size="lg"
              type="submit"
              variant="candy"
            >
              {isSubmitting ? "Sending…" : "Send reset link"}
            </SmoothButton>
          </form>

          <p className="mt-5 text-center text-muted-foreground text-sm">
            <Link
              className="font-medium text-brand hover:underline dark:text-rose-400"
              href="/login"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      )}
    </AuthShell>
  );
}
