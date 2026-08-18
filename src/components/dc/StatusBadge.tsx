import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  active: "border-toxic/40 bg-toxic/10 text-toxic",
  recoverable: "border-toxic/40 bg-toxic/10 text-toxic",
  dormant: "border-dormant/40 bg-dormant/10 text-dormant",
  abandoned: "border-warning/40 bg-warning/10 text-warning",
  suspicious: "border-danger/40 bg-danger/10 text-danger",
  inaccessible: "border-danger/40 bg-danger/10 text-danger",
  unknown: "border-border bg-secondary text-muted-foreground",
  whale: "border-dormant/40 bg-dormant/10 text-dormant",
  ready: "border-toxic/40 bg-toxic/10 text-toxic",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-medium tracking-[0.12em]",
        STYLES[status.toLowerCase()] ?? STYLES['unknown'],
        className,
      )}
    >
      {status.toUpperCase()}
    </span>
  );
}
