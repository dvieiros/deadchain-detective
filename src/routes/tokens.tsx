import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/dc/StatusBadge";

export const Route = createFileRoute("/tokens")({
  head: () => ({
    meta: [
      { title: "Token Intelligence — DEADCHAIN" },
      {
        name: "description",
        content:
          "Analyze Solana tokens by holder dormancy: active, dormant and abandoned supply distribution.",
      },
      { property: "og:title", content: "Token Intelligence — DEADCHAIN" },
      {
        property: "og:description",
        content: "See how much of a token's supply is held by dead wallets.",
      },
    ],
  }),
  component: Tokens,
});

const TOKENS = [
  { address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", symbol: "BONK", dormant: 27.8 },
  { address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", symbol: "JUP", dormant: 14.2 },
  { address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", symbol: "WIF", dormant: 31.4 },
];

function Tokens() {
  return (
    <div className="container-dc py-14">
      <p className="label-xs">Tokens</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Token intelligence</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        How much of a token&apos;s supply is trapped in dead wallets?
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {TOKENS.map((t) => (
          <Link
            key={t.address}
            to="/token/$address"
            params={{ address: t.address }}
            className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-toxic/40"
          >
            <div className="flex items-center justify-between">
              <p className="mono text-lg font-bold">{t.symbol}</p>
              <StatusBadge status="dormant" />
            </div>
            <p className="label-xs mt-6">Dormant supply</p>
            <p className="mono mt-2 text-3xl font-bold text-dormant">{t.dormant}%</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
