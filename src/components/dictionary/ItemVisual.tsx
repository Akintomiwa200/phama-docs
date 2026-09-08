import type { ReactNode } from "react";
import { BookOpen, Pill, FileText, Leaf, Database, Activity, Globe } from "lucide-react";
import type { SearchItem, SearchItemType } from "@/lib/types";

const TYPE_ICON: Record<SearchItemType, React.ComponentType<{ className?: string }>> = {
  Metabolite: Leaf,
  Dataset: Database,
  Spectrum: Activity,
  Domain: Globe,
  Term: BookOpen,
  Drug: Pill,
  Article: FileText,
};

const MOTIFS: Record<string, ReactNode> = {
  ecg: (
    <g stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 55 h12 l8 -22 10 44 8 -28 6 16 8 4 h32" />
    </g>
  ),
  vessel: (
    <g stroke="#fff" fill="none" strokeWidth="4" strokeLinecap="round">
      <path d="M12 34 C40 26, 60 28, 88 35" />
      <path d="M12 56 C40 48, 60 50, 88 57" />
      <ellipse cx="50" cy="45" rx="18" ry="9" strokeWidth="2.5" />
    </g>
  ),
  neuron: (
    <g stroke="#fff" fill="none" strokeWidth="2" strokeLinecap="round">
      <circle cx="50" cy="50" r="7" />
      <path d="M50 50 L22 20 M50 50 L74 18 M50 50 L82 60 M50 50 L61 84 M50 50 L28 78" />
    </g>
  ),
  brain: (
    <g stroke="#fff" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M25 35 C30 18, 55 12, 75 20 C86 25, 88 38, 82 44 C88 52, 84 62, 78 64 C78 76, 52 82, 32 74 C22 68, 20 54, 25 46 C18 40, 20 33, 25 35 Z" />
      <path d="M30 50 C40 44, 48 60, 58 52 C64 48, 70 52, 76 48" />
    </g>
  ),
  cells: (
    <g fill="#fff" fillOpacity="0.85">
      <circle cx="34" cy="40" r="12" />
      <circle cx="58" cy="58" r="16" />
      <circle cx="70" cy="30" r="9" />
      <circle cx="26" cy="66" r="8" />
    </g>
  ),
  dna: (
    <g stroke="#fff" fill="none" strokeWidth="2.5" strokeLinecap="round">
      <path d="M28 12 C42 28, 30 50, 38 68 C44 82, 34 88, 30 88" />
      <path d="M72 12 C58 28, 70 50, 62 68 C56 82, 66 88, 70 88" />
      <path d="M34 22 H66 M35 40 H65 M33 58 H67 M32 72 H68" strokeWidth="2" />
    </g>
  ),
  rings: (
    <g stroke="#fff" fill="none" strokeWidth="2.5" strokeLinejoin="round">
      <path d="M35 25 L65 25 L78 50 L65 75 L35 75 L22 50 Z" />
      <circle cx="50" cy="50" r="7" />
    </g>
  ),
  capsule: (
    <g stroke="#fff" fill="none" strokeWidth="2.5">
      <rect x="25" y="38" width="50" height="24" rx="12" />
      <path d="M50 30 v40" />
    </g>
  ),
  airway: (
    <g stroke="#fff" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 12 v22" />
      <path d="M50 34 C50 40, 30 42, 22 52" />
      <path d="M50 34 C50 40, 70 42, 78 52" />
      <path d="M22 52 C18 60, 10 64, 8 72" />
      <path d="M78 52 C82 60, 90 64, 92 72" />
    </g>
  ),
};

const TILE_GRADIENT: Record<SearchItemType, string> = {
  Metabolite: "from-rose-500 to-rose-400",
  Dataset: "from-purple-500 to-indigo-400",
  Spectrum: "from-cyan-500 to-blue-400",
  Domain: "from-amber-500 to-emerald-400",
  Term: "from-rose-500 to-rose-400",
  Drug: "from-emerald-500 to-emerald-400",
  Article: "from-sky-500 to-sky-400",
};

function FormulaBadge({ value, size }: { value: string; size: "sm" | "md" | "lg" }) {
  const cls =
    size === "sm"
      ? "h-8 px-2 text-[9px]"
      : size === "lg"
        ? "h-14 px-4 text-sm"
        : "h-10 px-2.5 text-[11px]";
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-lg bg-rose-50 font-mono font-semibold tracking-tight text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 ${cls}`}
    >
      {value}
    </span>
  );
}

function ImageTile({
  motif,
  type,
  size,
}: {
  motif: string;
  type: SearchItemType;
  size: "sm" | "md" | "lg";
}) {
  const tileCls =
    size === "sm" ? "h-9 w-9" : size === "lg" ? "h-16 w-16" : "h-10 w-10";
  const svgCls =
    size === "sm" ? "h-6 w-6" : size === "lg" ? "h-12 w-12" : "h-8 w-8";
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${TILE_GRADIENT[type]} ${tileCls}`}
    >
      <svg viewBox="0 0 100 100" className={svgCls} aria-hidden="true">
        {MOTIFS[motif] ?? MOTIFS.rings}
      </svg>
    </span>
  );
}

function FallbackIcon({ item, size }: { item: SearchItem; size: "sm" | "md" | "lg" }) {
  const Icon = TYPE_ICON[item.type] || Leaf;
  const cls =
    size === "sm"
      ? "h-8 w-8 rounded-lg"
      : size === "lg"
        ? "h-14 w-14 rounded-xl"
        : "h-10 w-10 rounded-lg";
  return (
    <span
      className={`flex shrink-0 items-center justify-center bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300 ${cls}`}
    >
      <Icon className={size === "lg" ? "h-6 w-6" : "h-4 w-4"} />
    </span>
  );
}

export function Motif({ motif }: { motif: string }) {
  return <>{MOTIFS[motif] ?? MOTIFS.rings}</>;
}

export function ItemVisual({
  item,
  size = "md",
}: {
  item: SearchItem;
  size?: "sm" | "md" | "lg";
}) {
  if (item.media?.format === "formula") {
    return <FormulaBadge value={item.media.value} size={size} />;
  }
  if (item.media?.format === "image") {
    return (
      <ImageTile motif={item.media.motif} type={item.type} size={size} />
    );
  }
  return <FallbackIcon item={item} size={size} />;
}