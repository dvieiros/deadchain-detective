import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/dc/StatusBadge";
import { shortAddress } from "@/lib/deadchain";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Wallet Alerts — WALLETGRAVE" },
      {
        name: "description",
        content:
          "Watch dormant wallets and get notified when they wake up, move tokens or change balance.",
      },
      { property: "og:title", content: "Wallet Alerts — WALLETGRAVE" },
      {
        property: "og:description",
        content: "Get notified when a dormant whale finally moves. Coming soon.",
      },
    ],
  }),
  component: Alerts,
});

const WATCHED = [
  { address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", note: "🐋 Dormant whale" },
  { address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", note: "💰 $4.2M" },
];

function Alerts() {
  return (
    <div className="container-dc py-14">
      <div className="flex flex-wrap items-center gap-3">
        <p className="label-xs">Alerts</p>
        <StatusBadge status="coming soon" />
      </div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Watched wallets</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Get notified the moment a dead wallet comes back to life. Preview below — delivery
        channels arrive with the next release.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {WATCHED.map((w) => (
            <div
              key={w.address}
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-5 py-4"
            >
              <div>
                <p className="mono text-sm">{shortAddress(w.address, 5)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{w.note}</p>
              </div>
              <StatusBadge status="dormant" />
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="label-xs">Watch wallet</p>
          <Input placeholder="Wallet address" className="mono mt-4" disabled />
          <p className="label-xs mt-6">Alert me when</p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {["Wallet becomes active", "Large transaction", "Token movement", "Balance change"].map(
              (o) => (
                <label key={o} className="flex items-center gap-2">
                  <input type="checkbox" disabled className="accent-[var(--toxic)]" />
                  {o}
                </label>
              ),
            )}
          </div>
          <p className="label-xs mt-6">Delivery</p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {["Email", "Telegram", "Browser"].map((o) => (
              <label key={o} className="flex items-center gap-2">
                <input type="checkbox" disabled className="accent-[var(--toxic)]" />
                {o}
              </label>
            ))}
          </div>
          <Button variant="toxic" className="mt-6 w-full" disabled>
            Add wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
