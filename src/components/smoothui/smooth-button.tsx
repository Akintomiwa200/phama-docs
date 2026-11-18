"use client";

import { Loader2 } from "lucide-react";
import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type SmoothButtonVariant =
  | "candy"
  | "primary"
  | "outline"
  | "ghost"
  | "link";

export type SmoothButtonSize = "sm" | "md" | "lg" | "icon";

export interface SmoothButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> {
  /** Visual treatment. `candy` is the house primary gradient. */
  variant?: SmoothButtonVariant;
  /**
   * Kept for API compatibility with the upstream smoothui component. It has
   * no effect because the project only ships one accent (rose).
   */
  color?: "accent" | "default";
  size?: SmoothButtonSize;
  shape?: "rounded" | "pill";
  loading?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const SIZE_CLASS: Record<SmoothButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-11 gap-2 px-5 text-sm",
  icon: "h-9 w-9 p-0",
};

const VARIANT_CLASS: Record<SmoothButtonVariant, string> = {
  candy:
    "border border-rose-600/30 bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-sm shadow-rose-500/25 hover:to-rose-700 active:from-rose-600",
  primary:
    "border border-transparent bg-rose-600 text-white shadow-sm hover:bg-rose-700",
  outline:
    "border border-input bg-background text-foreground hover:bg-muted dark:border-gray-800 dark:bg-transparent dark:hover:bg-gray-900",
  ghost:
    "border border-transparent text-foreground hover:bg-muted dark:hover:bg-gray-900",
  link: "border border-transparent text-brand underline-offset-4 hover:underline dark:text-rose-400",
};

export const SmoothButton = forwardRef<
  HTMLButtonElement,
  SmoothButtonProps
>(function SmoothButton(
  {
    variant = "primary",
    size = "md",
    shape = "rounded",
    loading = false,
    prefix,
    suffix,
    disabled,
    className,
    children,
    type = "button",
    ...props
  },
  ref
) {
  const isLink = variant === "link";

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap font-medium outline-none transition-[background-color,box-shadow,transform,color] duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-60 active:scale-[0.99]",
        shape === "pill" ? "rounded-full" : "rounded-lg",
        !isLink && SIZE_CLASS[size],
        VARIANT_CLASS[variant],
        isLink && "h-auto p-0 active:scale-100",
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
      ) : (
        prefix
      )}
      {children}
      {suffix}
    </button>
  );
});

SmoothButton.displayName = "SmoothButton";

export default SmoothButton;
