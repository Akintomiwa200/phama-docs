"use client";

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

/**
 * AuthForm collects email + password only. Derive a display name from the
 * email local-part for the local account store.
 */
function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const words = local
    .split(/[._\-+]+/)
    .map((word) => word.trim())
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(" ") || "AMDB Researcher";
}

export default function SignupPage() {
  const router = useRouter();
  const { user, signUp } = useAuth();
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

    const result = await signUp(nameFromEmail(email), email, password);
    if (!result.ok) {
      setStatus("error");
      setError(result.error ?? "Unable to create your account.");
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
        mode="sign-up"
        onModeChange={(mode) => {
          if (mode === "sign-in") router.push("/login");
        }}
        onProviderClick={() => {
          setStatus("error");
          setError(
            "Social sign-up is not available in this demo. Use email instead."
          );
        }}
        onSubmit={handleSubmit}
        providers={AUTH_SOCIAL_PROVIDERS}
        status={status}
      />
    </AuthShell>
  );
}
