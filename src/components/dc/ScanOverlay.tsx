import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { shortAddress } from "@/lib/deadchain";

const STEPS = [
  "Resolving address",
  "Fetching balances",
  "Loading token accounts",
  "Checking activity",
  "Calculating Dead Score",
  "Checking recovery",
];

export function ScanOverlay({ address, onDone }: { address: string; onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length) {
          clearInterval(id);
          onDone();
          return s;
        }
        return s + 1;
      });
    }, 420);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 px-6 backdrop-blur">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-lg border border-toxic/30 bg-surface p-10 text-center">
          <div className="absolute inset-x-0 top-0 h-px bg-toxic animate-scanline" />
          <p className="mono text-sm text-foreground">{shortAddress(address, 6)}</p>
          <p className="label-xs mt-4 animate-pulse-soft">Scanning blockchain</p>
        </div>

        <ul className="mt-6 space-y-2">
          {STEPS.map((s, i) => (
            <li key={s} className="mono flex items-center gap-3 text-xs">
              <span
                className={
                  i < step
                    ? "text-toxic"
                    : i === step
                      ? "text-foreground animate-pulse-soft"
                      : "text-muted-foreground/50"
                }
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i === step ? "•" : "□"}
              </span>
              <span className={i <= step ? "text-foreground" : "text-muted-foreground/50"}>
                {s}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
