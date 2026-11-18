"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputClass =
  "min-h-[44px] w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive dark:border-gray-800 dark:bg-gray-900/40 dark:focus-visible:border-rose-400";

export interface AuthTextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  errorId?: string;
}

export function AuthTextField({
  label,
  id,
  error,
  errorId,
  className,
  ...props
}: AuthTextFieldProps) {
  return (
    <div className="grid gap-1.5">
      <label className="font-medium text-foreground text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={cn(inputClass, className)}
        id={id}
        {...props}
      />
      {error ? (
        <p className="text-destructive text-sm" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default AuthTextField;
