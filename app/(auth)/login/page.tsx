"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { AuthShell } from "@/components/auth/AuthShell";
import { AUTH_SOCIAL_PROVIDERS } from "@/components/auth/authProviders";
import AuthForm, {
  type AuthFormFieldErrors,
  type AuthFormStatus,
  type AuthFormValues,
} from "@/components/auth/AuthForm";

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn } = useAuth();
  const [status, setStatus] = useState<AuthFormStatus>("idle");
  const [error, setError] = useState<string | undefined>();
  const [fieldErrors, setFieldErrors] = useState<AuthFormFieldErrors>();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  async function handleSubmit({ email, password }: AuthFormValues) {
    setStatus("submitting");
    setError(undefined);
    setFieldErrors(undefined);

    const result = await signIn(email, password);
    if (!result.ok) {
      setStatus("error");
      setError(result.error ?? "Unable to sign in.");
      if (result.error?.toLowerCase().includes("email")) {
        setFieldErrors({ email: result.error });
      } else if (result.error?.toLowerCase().includes("password")) {
        setFieldErrors({ password: result.error });
      }
      return;
    }

    setStatus("success");
    router.replace("/dashboard");
  }

  return (
    <AuthShell>
      <AuthForm
        error={error}
        fieldErrors={fieldErrors}
        footer={
          <p className="mt-3 text-center text-sm">
            <Link
              className="font-medium text-muted-foreground transition-colors hover:text-brand dark:hover:text-rose-400"
              href="/forgot-password"
            >
              Forgot your password?
            </Link>
          </p>
        }
        mode="sign-in"
        onModeChange={(mode) => {
          if (mode === "sign-up") router.push("/signup");
        }}
        onProviderClick={() => {
          setStatus("error");
          setError(
            "Social sign-in is not available in this demo. Use email instead."
          );
        }}
        onSubmit={handleSubmit}
        providers={AUTH_SOCIAL_PROVIDERS}
        status={status}
      />
    </AuthShell>
  );
}
