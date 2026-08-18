import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/dc/StatusBadge";
import { WHALES, formatUsd, shortAddress } from "@/lib/deadchain";

export const Route = createFileRoute("/whales")({
  head: () => ({
    meta: [
      { title: "Dormant Whales — WALLETGRAVE" },
      {
        name: "description",
        content:
          "Track Solana wallets that hold serious money but haven't moved in years. Ranked by portfolio value and dormancy.",
      },
      { property: "og:title", content: "Dormant Whales — WALLETGRAVE" },
      {
        property: "og:description",
        content: "Whale wallets holding millions, silent for years. Explore the graveyard.",
      },
    ],
  }),
  component: Whales,
});

function Whales() {
  return (
    <div className="container-dc py-14">
      <p className="label-xs">Whales</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Dormant whales</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Track wallets that hold serious money but haven&apos;t moved in years.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {WHALES.map((w) => (
          <Link
            key={w.address}
            to="/wallet/$address"
            params={{ address: w.address }}
            className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-toxic/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">🐋</span>
              <StatusBadge status={w.status} />
            </div>
            <p className="mono mt-6 text-3xl font-bold">{formatUsd(w.value)}</p>
            <p className="mt-2 text-xs text-muted-foreground">{w.years} years dormant</p>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="mono text-xs text-muted-foreground group-hover:text-foreground">
                {shortAddress(w.address, 5)}
              </span>
              <span className="mono text-xs font-bold text-toxic">DEAD {w.score}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 rounded-lg border border-border bg-surface p-8">
        <p className="label-xs">Portfolio breakdown · top whale</p>
        <div className="mt-6 space-y-4">
          {[
            { s: "SOL", p: 42 },
            { s: "USDC", p: 31 },
            { s: "XYZ", p: 19 },
            { s: "Other", p: 8 },
          ].map((row) => (
            <div key={row.s} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="mono text-muted-foreground">{row.s}</span>
                <span className="mono">{row.p}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-toxic" style={{ width: `${row.p}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
