import { useEffect, useState } from "react";

export function ScoreRing({
  score,
  label = "DEAD SCORE",
  caption,
  size = 200,
}: {
  score: number;
  label?: string;
  caption?: string;
  size?: number;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let frame = 0;
    const total = 40;
    const id = setInterval(() => {
      frame += 1;
      setShown(Math.round((score * frame) / total));
      if (frame >= total) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [score]);

  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  const offset = c - (shown / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <p className="label-xs mb-4">{label}</p>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--toxic)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="mono text-5xl font-bold tabular-nums text-foreground">{shown}</span>
          <span className="mono text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      {caption && <p className="mt-4 text-sm text-muted-foreground">{caption}</p>}
    </div>
  );
}
