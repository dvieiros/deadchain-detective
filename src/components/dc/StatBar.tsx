export function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="mono text-sm tabular-nums text-foreground">{value}/100</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-toxic transition-[width] duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
