import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StatusBadge } from "@/components/dc/StatusBadge";
import { ScoreRing } from "@/components/dc/ScoreRing";
import { StatBar } from "@/components/dc/StatBar";
import { RecoveryModal } from "@/components/recovery/RecoveryModal";
import {
  analyzeWallet,
  formatUsd,
  isValidSolanaAddress,
  shortAddress,
  walletActivitySeries,
  walletAssetSeries,
  type AssetStatus,
} from "@/lib/deadchain";
import { ActivityChart, AssetValueChart, ChartCard } from "@/components/dc/Charts";

export const Route = createFileRoute("/wallet/$address")({
  head: ({ params }) => {
    const short = shortAddress(params.address, 4);
    const title = `Dead Wallet ${short} — WALLETGRAVE`;
    const description = `Wallet autopsy for ${short} on Solana: Dead Score, dormancy period, assets and recoverable account rent.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: WalletPage,
});

const FILTERS: Array<"all" | AssetStatus> = [
  "all",
  "active",
  "dormant",
  "abandoned",
  "recoverable",
  "suspicious",
];

function WalletPage() {
  const { address } = Route.useParams();
  const valid = isValidSolanaAddress(address);
  const analysis = useMemo(() => (valid ? analyzeWallet(address) : null), [address, valid]);
  const [filter, setFilter] = useState<"all" | AssetStatus>("all");
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recovered, setRecovered] = useState(false);

  if (!valid || !analysis) {
    return (
      <div className="container-dc flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mono text-xl font-bold text-warning">INVALID ADDRESS</h1>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          This doesn&apos;t look like a valid Solana wallet address.
        </p>
        <Link to="/" className="mt-6">
          <Button variant="toxic">Try again</Button>
        </Link>
      </div>
    );
  }

  const assets = analysis.assets.filter((a) => filter === "all" || a.status === filter);
  const hasRecoverable = analysis.recoverable.emptyAccounts > 0 && !recovered;

  return (
    <TooltipProvider>
      <div className="container-dc py-10 pb-32">
        {/* HEADER */}
        <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label-xs">Wallet autopsy</p>
            <h1 className="mono mt-3 break-all text-2xl font-bold sm:text-3xl">
              {shortAddress(address, 6)}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <StatusBadge status={analysis.status} />
              <StatusBadge status="solana" className="border-border bg-secondary text-muted-foreground" />
              <button
                onClick={() => navigator.clipboard?.writeText(address)}
                className="mono inline-flex items-center gap-1.5 rounded-sm border border-border px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground"
              >
                <Copy className="h-3 w-3" /> COPY
              </button>
              <a
                href={`https://solscan.io/account/${address}`}
                target="_blank"
                rel="noreferrer"
                className="mono inline-flex items-center gap-1.5 rounded-sm border border-border px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" /> EXPLORER
              </a>
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="label-xs">Last activity</p>
              <p className="mono mt-2 text-lg">{analysis.lastActivityDays} days ago</p>
            </div>
            <div>
              <p className="label-xs">Wallet age</p>
              <p className="mono mt-2 text-lg">{analysis.walletAgeYears} years</p>
            </div>
          </div>
        </div>

        {/* SCORES + RECOVERABLE */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-lg border border-border bg-surface p-8">
            <ScoreRing
              score={analysis.deadScore}
              caption={
                analysis.deadScore > 85
                  ? "Highly dormant"
                  : analysis.deadScore > 55
                    ? "Dormant"
                    : "Recently active"
              }
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="mt-6 cursor-help text-center text-xs text-muted-foreground underline decoration-dotted">
                  Based on transaction activity, asset movement and historical behavior.
                </p>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                A proprietary indicator estimating how dormant a wallet appears based on
                blockchain activity.
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-6 rounded-lg border border-border bg-surface p-8">
            <div>
              <p className="label-xs">Activity</p>
              <p className="mono mt-2 text-4xl font-bold">
                {analysis.activityScore}
                <span className="text-base text-muted-foreground">/100</span>
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-dormant"
                  style={{ width: `${analysis.activityScore}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Very low recent activity.</p>
            </div>
            <div className="space-y-4 border-t border-border pt-6">
              <p className="label-xs">Wallet health</p>
              <StatBar label="Cleanliness" value={recovered ? 100 : analysis.cleanlinessScore} />
              <StatBar label="Activity" value={analysis.activityScore} />
              <StatBar label="Asset diversity" value={analysis.diversityScore} />
              <StatBar label="Dormancy" value={analysis.deadScore} />
            </div>
          </div>

          <div
            className={`rounded-lg border p-8 ${
              hasRecoverable ? "border-toxic/40 bg-toxic/5 glow-toxic" : "border-border bg-surface"
            }`}
          >
            {hasRecoverable ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="label-xs">Recoverable</p>
                  <StatusBadge status="ready" />
                </div>
                <p className="mono mt-6 text-4xl font-bold text-toxic">
                  {analysis.recoverable.sol} SOL
                </p>
                <p className="mono mt-2 text-sm text-muted-foreground">
                  ≈ ${analysis.recoverable.usd}
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  {analysis.recoverable.emptyAccounts} empty token accounts
                </p>
                <Button
                  variant="toxic"
                  className="mt-6 w-full"
                  onClick={() => setRecoveryOpen(true)}
                >
                  Recover funds
                </Button>
                <p className="mono mt-4 text-[11px] text-muted-foreground">
                  Recoverable account rent. No private key required.
                </p>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="mono text-sm">NO RECOVERABLE ACCOUNTS</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Your wallet is already clean.
                </p>
                <p className="mono mt-6 text-toxic">✨ Cleanliness: 100/100</p>
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-6">
          {[
            ["Portfolio", formatUsd(analysis.portfolioValue)],
            ["SOL balance", `${analysis.solBalance} SOL`],
            ["Assets", `${analysis.assets.length}`],
            ["Transactions", analysis.transactions.toLocaleString("en-US")],
            ["Last activity", `${analysis.lastActivityDays}d ago`],
            ["Wallet age", `${analysis.walletAgeYears}y`],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface p-5">
              <p className="label-xs">{k}</p>
              <p className="mono mt-2 text-lg font-semibold">{v}</p>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Activity decay" hint="Transactions per year">
            <ActivityChart data={walletActivitySeries(analysis)} />
          </ChartCard>
          <ChartCard title="Asset value" hint="Top holdings (USD)">
            <AssetValueChart data={walletAssetSeries(analysis)} />
          </ChartCard>
        </div>

        {/* ASSETS */}
        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="label-xs">Assets</p>
            <div className="mono flex flex-wrap gap-1 text-[10px]">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-sm border px-2 py-1 uppercase tracking-[0.12em] transition-colors ${
                    filter === f
                      ? "border-toxic/40 bg-toxic/10 text-toxic"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="hidden bg-surface-2 sm:table-header-group">
                <tr className="label-xs">
                  <th className="px-4 py-3 font-normal">Asset</th>
                  <th className="px-4 py-3 font-normal">Balance</th>
                  <th className="px-4 py-3 font-normal">Value</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                  <th className="px-4 py-3 font-normal">Last movement</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((a, i) => (
                  <tr key={`${a.symbol}-${i}`} className="border-t border-border bg-surface">
                    <td className="px-4 py-4">
                      <p className="mono">{a.symbol}</p>
                      <p className="text-xs text-muted-foreground">{a.name}</p>
                      <div className="mt-2 flex items-center gap-2 sm:hidden">
                        <StatusBadge status={a.status} />
                        <span className="mono text-xs text-muted-foreground">
                          {a.balance} · {a.value ? formatUsd(a.value) : "—"}
                        </span>
                      </div>
                    </td>
                    <td className="mono hidden px-4 py-4 sm:table-cell">{a.balance}</td>
                    <td className="mono hidden px-4 py-4 sm:table-cell">
                      {a.value ? formatUsd(a.value) : "—"}
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="mono hidden px-4 py-4 text-muted-foreground sm:table-cell">
                      {a.lastMovement}
                    </td>
                  </tr>
                ))}
                {assets.length === 0 && (
                  <tr>
                    <td colSpan={5} className="bg-surface px-4 py-12 text-center text-sm">
                      <span className="mono">NOTHING HERE</span>
                      <p className="mt-2 text-xs text-muted-foreground">
                        No assets match this filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* TIMELINE + DORMANCY */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-border bg-surface p-8">
            <p className="label-xs">Wallet activity</p>
            <ol className="mt-6 space-y-0">
              {analysis.activity.map((e, i) => (
                <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-toxic" />
                    {i < analysis.activity.length - 1 && (
                      <span className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div>
                    <p className="mono text-xs text-muted-foreground">
                      {e.year} · {e.date}
                    </p>
                    <p className="mt-1 text-sm">{e.label}</p>
                    {e.amount && (
                      <p className="mono text-xs text-muted-foreground">{e.amount}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-lg border border-border bg-surface p-8">
            <p className="label-xs">Why is this wallet dormant?</p>
            <ul className="mt-6 space-y-3 text-sm">
              {analysis.reasons.map((r) => (
                <li key={r} className="flex gap-3 text-muted-foreground">
                  <span className="text-toxic">✓</span>
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-border pt-6">
              <p className="label-xs">Confidence</p>
              <p className="mono mt-2 text-3xl font-bold text-toxic">{analysis.confidence}%</p>
            </div>
          </section>
        </div>
      </div>

      {/* STICKY ACTION BAR */}
      {hasRecoverable && (
        <div className="fixed inset-x-0 bottom-14 z-40 border-t border-toxic/30 bg-background/90 backdrop-blur-xl md:bottom-0">
          <div className="container-dc flex items-center justify-between gap-4 py-3">
            <div>
              <p className="mono text-sm text-toxic">{analysis.recoverable.sol} SOL</p>
              <p className="text-[11px] text-muted-foreground">
                {analysis.recoverable.emptyAccounts} recoverable accounts
              </p>
            </div>
            <Button variant="toxic" onClick={() => setRecoveryOpen(true)}>
              Clean &amp; recover
            </Button>
          </div>
        </div>
      )}

      <RecoveryModal
        open={recoveryOpen}
        onOpenChange={setRecoveryOpen}
        analysis={analysis}
        onComplete={() => setRecovered(true)}
      />
    </TooltipProvider>
  );
}
