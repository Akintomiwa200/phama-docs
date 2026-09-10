"use client";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextField({ label, id, ...props }: TextFieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <input
        id={id}
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        {...props}
      />
    </label>
  );
}

export function FieldError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 dark:bg-rose-900/20 dark:text-rose-400">
      {message}
    </p>
  );
}

export function FieldSuccess({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
      {message}
    </p>
  );
}

export function SubmitButton({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}