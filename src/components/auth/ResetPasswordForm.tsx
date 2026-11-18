"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, KeyRound } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useAuth } from "@/providers/auth";
import { cn } from "@/lib/utils";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthNotice } from "@/components/auth/AuthNotice";
import SmoothButton from "@/components/smoothui/smooth-button";
import {
  DURATION_INSTANT,
  SPRING_DEFAULT,
  SPRING_SNAPPY,
} from "@/components/smoothui/lib/animation";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UPPERCASE_PATTERN = /[A-Z]/;
const NUMBER_PATTERN = /[0-9]/;

const REQUIREMENTS = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (password: string) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    test: (password: string) => UPPERCASE_PATTERN.test(password),
  },
  {
    id: "number",
    label: "One number",
    test: (password: string) => NUMBER_PATTERN.test(password),
  },
] as const;

const inputClass =
  "min-h-[44px] w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive dark:border-gray-800 dark:bg-gray-900/40 dark:focus-visible:border-rose-400";

export function ResetPasswordForm({
  initialEmail = "",
}: {
  initialEmail?: string;
}) {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const uid = useId();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | undefined>();
  const [done, setDone] = useState(false);

  const isSubmitting = status === "submitting";
  const isEmailValid = EMAIL_PATTERN.test(email.trim());
  const requirementsMet = REQUIREMENTS.every((req) => req.test(password));
  const requirementsId = `${uid}-requirements`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    const normalized = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(normalized)) {
      setStatus("error");
      setError("Enter a valid email address.");
      return;
    }
    if (!requirementsMet) {
      setStatus("error");
      setError("Password does not meet the requirements.");
      return;
    }
    if (password !== confirmPassword) {
      setStatus("error");
      setError("Passwords do not match.");
      return;
    }

    setStatus("submitting");
    const result = await resetPassword(normalized, password);
    if (!result.ok) {
      setStatus("error");
      setError(result.error ?? "Unable to reset your password.");
      return;
    }

    setStatus("success");
    setDone(true);
  }

  return (
    <AuthShell>
      {done ? (
        <AuthNotice
          icon={KeyRound}
          title="Password updated"
          action={
            <>
              <SmoothButton
                className="w-full font-semibold text-sm"
                onClick={() => router.push("/login")}
                size="lg"
                type="button"
                variant="candy"
              >
                Go to sign in
              </SmoothButton>
              <Link
                className="text-center text-xs font-medium text-muted-foreground transition-colors hover:text-brand dark:hover:text-rose-400"
                href="/search"
              >
                Explore the database instead
              </Link>
            </>
          }
        >
          Your password has been reset. Sign in with your new password to
          continue.
        </AuthNotice>
      ) : (
        <div className="w-full max-w-sm">
          <h2 className="font-semibold text-foreground text-xl">
            Choose a new password
          </h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Set a fresh password for your account.
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
                htmlFor={`${uid}-email`}
              >
                Email
              </label>
              <input
                autoComplete="email"
                className={inputClass}
                disabled={isSubmitting}
                id={`${uid}-email`}
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

            <div className="grid gap-1.5">
              <label
                className="font-medium text-foreground text-sm"
                htmlFor={`${uid}-password`}
              >
                New password
              </label>
              <div className="relative">
                <input
                  aria-describedby={requirementsId}
                  autoComplete="new-password"
                  className={cn(inputClass, "pr-11")}
                  disabled={isSubmitting}
                  id={`${uid}-password`}
                  minLength={8}
                  name="password"
                  onChange={(event) => {
                    setError(undefined);
                    if (status === "error") setStatus("idle");
                    setPassword(event.target.value);
                  }}
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <SmoothButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground [&_svg]:size-4"
                  onClick={() => setShowPassword((value) => !value)}
                  shape="pill"
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" />
                  ) : (
                    <Eye aria-hidden="true" />
                  )}
                </SmoothButton>
              </div>
              <ul
                aria-label="Password requirements"
                className="mt-1 grid gap-1"
                id={requirementsId}
              >
                {REQUIREMENTS.map((requirement) => {
                  const passed = requirement.test(password);
                  return (
                    <li
                      aria-label={`${requirement.label}: ${passed ? "met" : "not met"}`}
                      className="flex items-center gap-2 text-sm"
                      key={requirement.id}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                          passed
                            ? "border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-gray-950"
                            : "border-muted-foreground/40 text-transparent"
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span
                        className={cn(
                          "transition-colors",
                          passed ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {requirement.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="grid gap-1.5">
              <label
                className="font-medium text-foreground text-sm"
                htmlFor={`${uid}-confirm`}
              >
                Confirm new password
              </label>
              <input
                autoComplete="new-password"
                className={inputClass}
                disabled={isSubmitting}
                id={`${uid}-confirm`}
                name="confirmPassword"
                onChange={(event) => {
                  setError(undefined);
                  if (status === "error") setStatus("idle");
                  setConfirmPassword(event.target.value);
                }}
                required
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
              />
            </div>

            <SmoothButton
              className="mt-1 w-full font-semibold text-sm"
              disabled={
                isSubmitting ||
                !isEmailValid ||
                !requirementsMet ||
                !confirmPassword
              }
              loading={isSubmitting}
              size="lg"
              type="submit"
              variant="candy"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0 }
                  }
                  className="flex items-center"
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -6 }
                  }
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 6 }
                  }
                  key={isSubmitting ? "submitting" : "idle"}
                  transition={
                    shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT
                  }
                >
                  {isSubmitting ? "Updating…" : "Reset password"}
                </motion.span>
              </AnimatePresence>
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
