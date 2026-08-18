import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dc/StatusBadge";
import { EXPLORER_WALLETS, formatUsd, shortAddress } from "@/lib/deadchain";

export const Route = createFileRoute("/explorer")({
  head: () => ({
    meta: [
      { title: "Dead Wallet Explorer — DEADCHAIN" },
      {
        name: "description",
        content:
          "Explore dormant and abandoned Solana wallets. Filter by value, dormancy and Dead Score.",
      },
      { property: "og:title", content: "Dead Wallet Explorer — DEADCHAIN" },
      {
        property: "og:description",
        content: "Browse dormant wallets across the blockchain, ranked by Dead Score and value.",
      },
    ],
  }),
  component: Explorer,
});

const VALUES = [
  { label: "Any", min: 0 },
  { label: "$1K+", min: 1000 },
  { label: "$10K+", min: 10000 },
  { label: "$100K+", min: 100000 },
  { label: "$1M+", min: 1000000 },
];

const DORMANCY = [
  { label: "Any", min: 0 },
  { label: "1 year+", min: 1 },
  { label: "3 years+", min: 3 },
  { label: "5 years+", min: 5 },
];

function Explorer() {
  const [statuses, setStatuses] = useState<string[]>([]);
  const [minValue, setMinValue] = useState(0);
  const [minYears, setMinYears] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(
    () =>
      EXPLORER_WALLETS.filter(
        (w) =>
          (statuses.length === 0 || statuses.includes(w.status)) &&
          w.value >= minValue &&
          w.years >= minYears,
      ).sort((a, b) => b.score - a.score),
    [statuses, minValue, minYears],
  );

  const toggle = (s: string) =>
    setStatuses((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const filters = (
    <div className="space-y-8">
      <div>
        <p className="label-xs">Chain</p>
        <p className="mono mt-3 text-sm text-toxic">● Solana</p>
      </div>
      <div>
        <p className="label-xs">Status</p>
        <div className="mt-3 space-y-2">
          {["dormant", "abandoned", "whale"].map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={statuses.includes(s)}
                onChange={() => toggle(s)}
                className="accent-[var(--toxic)]"
              />
              <span className="capitalize text-muted-foreground">{s}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="label-xs">Value</p>
        <div className="mt-3 space-y-2">
          {VALUES.map((v) => (
            <label key={v.label} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="value"
                checked={minValue === v.min}
                onChange={() => setMinValue(v.min)}
                className="accent-[var(--toxic)]"
              />
              <span className="text-muted-foreground">{v.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="label-xs">Dormancy</p>
        <div className="mt-3 space-y-2">
          {DORMANCY.map((d) => (
            <label key={d.label} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="dormancy"
                checked={minYears === d.min}
                onChange={() => setMinYears(d.min)}
                className="accent-[var(--toxic)]"
              />
              <span className="text-muted-foreground">{d.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-dc py-14">
      <p className="label-xs">Explorer</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Dead Wallet Explorer</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Explore dormant wallets across the blockchain.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>

        <div>
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <Button variant="outline" size="sm" onClick={() => setFiltersOpen((v) => !v)}>
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
            <p className="mono text-xs text-muted-foreground">{results.length} results</p>
          </div>
          {filtersOpen && (
            <div className="mb-8 rounded-lg border border-border bg-surface p-6 lg:hidden">
              {filters}
            </div>
          )}

          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="hidden bg-surface-2 sm:table-header-group">
                <tr className="label-xs">
                  <th className="px-4 py-3 font-normal">Wallet</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                  <th className="px-4 py-3 font-normal">Value</th>
                  <th className="px-4 py-3 font-normal">Last activity</th>
                  <th className="px-4 py-3 text-right font-normal">Dead score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((w) => (
                  <tr key={w.address} className="border-t border-border bg-surface">
                    <td className="px-4 py-4">
                      <Link
                        to="/wallet/$address"
                        params={{ address: w.address }}
                        className="mono text-sm text-foreground hover:text-toxic"
                      >
                        {shortAddress(w.address, 6)}
                      </Link>
                      <div className="mt-2 flex flex-wrap items-center gap-2 sm:hidden">
                        <StatusBadge status={w.status} />
                        <span className="mono text-xs text-muted-foreground">
                          {formatUsd(w.value)} · {w.years}y · score {w.score}
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">
                      <StatusBadge status={w.status} />
                    </td>
                    <td className="mono hidden px-4 py-4 sm:table-cell">{formatUsd(w.value)}</td>
                    <td className="mono hidden px-4 py-4 text-muted-foreground sm:table-cell">
                      {w.years} years
                    </td>
                    <td className="mono hidden px-4 py-4 text-right font-bold text-toxic sm:table-cell">
                      {w.score}
                    </td>
                  </tr>
                ))}
                {results.length === 0 && (
                  <tr>
                    <td colSpan={5} className="bg-surface px-4 py-16 text-center">
                      <p className="mono text-sm">NO WALLETS MATCH THESE FILTERS</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Try widening the value or dormancy range.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
