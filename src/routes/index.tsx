import heroArt from "@/assets/hero-walletgrave.jpg";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScanOverlay } from "@/components/dc/ScanOverlay";
import {
  GLOBAL_STATS,
  DISCOVERIES,
  GRAVEYARD_TREND,
  STATUS_BREAKDOWN,
  isValidSolanaAddress,
} from "@/lib/deadchain";
import { ChartCard, GraveyardTrendChart, StatusDonut } from "@/components/dc/Charts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WALLETGRAVE — Find what's dead. Recover what's yours." },
      {
        name: "description",
        content:
          "Discover dormant wallets, abandoned assets and recoverable funds on Solana. Scan any wallet in seconds. No wallet connection required.",
      },
      { property: "og:title", content: "WALLETGRAVE — The Graveyard of Crypto" },
      {
        property: "og:description",
        content:
          "Scan Solana wallets for dormant assets and recoverable rent. Dead Score, wallet autopsy and one-click recovery.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [address, setAddress] = useState("");
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();
  const valid = isValidSolanaAddress(address);
  const typing = address.length > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) setScanning(true);
  };

  return (
    <div>
      {scanning && (
        <ScanOverlay
          address={address.trim()}
          onDone={() =>
            navigate({ to: "/wallet/$address", params: { address: address.trim() } })
          }
        />
      )}

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className={`pointer-events-none absolute inset-0 grid-bg animate-drift transition-opacity duration-500 ${
            typing ? "opacity-30" : "opacity-100"
          }`}
          aria-hidden
        />
        <img
          src={heroArt}
          alt="Hooded reaper holding a glowing Solana coin in a graveyard"
          width={1536}
          height={1024}
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-full object-cover object-right opacity-70 sm:w-[68%] lg:w-[58%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background)_18%,color-mix(in_oklab,var(--background)_70%,transparent)_52%,transparent_88%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,var(--background),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--toxic)_10%,transparent),transparent_60%)]" />

        <div className="container-dc relative py-24 sm:py-32">
          <p className="label-xs">The Graveyard of Crypto</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Find what&apos;s dead.
            <br />
            <span className="text-toxic">Recover what&apos;s yours.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            Discover dormant wallets, abandoned assets and recoverable funds across the
            blockchain.
          </p>

          <form onSubmit={submit} className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Paste wallet address..."
              aria-label="Solana wallet address"
              className="mono h-14 flex-1 border-border bg-surface text-sm"
            />
            <Button type="submit" variant="toxic" size="xl" disabled={!valid}>
              Exhume wallet <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          {typing && !valid && (
            <p className="mono mt-3 text-xs text-warning">
              This doesn&apos;t look like a valid Solana wallet address.
            </p>
          )}
          <p className="mono mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-toxic" />
            No wallet connection required. Solana supported.
          </p>
        </div>
      </section>

      {/* LIVE STATS */}
      <section className="border-b border-border">
        <div className="container-dc py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="label-xs">Global graveyard</p>
            <div className="mono flex gap-2 text-[10px]">
              <span className="rounded-sm border border-toxic/40 bg-toxic/10 px-2 py-1 text-toxic">
                SOLANA
              </span>
              {["ETHEREUM", "BASE", "BSC"].map((c) => (
                <span
                  key={c}
                  className="rounded-sm border border-border px-2 py-1 text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
            {GLOBAL_STATS.map((s) => (
              <div key={s.label} className="bg-surface p-6">
                <p className="mono text-2xl font-bold tabular-nums sm:text-3xl">{s.value}</p>
                <p className="label-xs mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHARTS */}
      <section className="border-b border-border">
        <div className="container-dc grid gap-6 py-14 lg:grid-cols-[2fr_1fr]">
          <ChartCard title="Graveyard growth" hint="Last 12 months">
            <GraveyardTrendChart data={GRAVEYARD_TREND} />
          </ChartCard>
          <ChartCard title="Wallet states" hint="Share of scanned wallets">
            <StatusDonut data={STATUS_BREAKDOWN} />
          </ChartCard>
        </div>
      </section>

      {/* WHAT IS WALLETGRAVE */}
      <section className="container-dc py-20">
        <p className="label-xs">What is WALLETGRAVE?</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "DISCOVER",
              d: "Find dormant and abandoned wallets across the chain.",
            },
            { t: "ANALYZE", d: "Understand what happened and what they still hold." },
            { t: "RECOVER", d: "Recover assets when technically possible." },
          ].map((c, i) => (
            <div
              key={c.t}
              className="rounded-lg border border-border bg-surface p-8 transition-colors hover:border-toxic/40"
            >
              <p className="mono text-xs text-muted-foreground">0{i + 1}</p>
              <h2 className="mono mt-4 text-lg font-bold tracking-[0.14em] text-toxic">{c.t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECOVERY CTA */}
      <section className="container-dc">
        <div className="relative overflow-hidden rounded-lg border border-toxic/30 bg-toxic/5 p-10 sm:p-16">
          <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
          <div className="relative max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Found money in your wallet?
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Scan your wallet and discover forgotten recoverable accounts. Most Solana wallets
              are quietly holding rent they can reclaim.
            </p>
            <Link to="/recover" className="mt-8 inline-block">
              <Button variant="toxic" size="lg">
                Scan my wallet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST DISCOVERIES */}
      <section className="container-dc py-20">
        <div className="flex items-center justify-between">
          <p className="label-xs">Latest discoveries</p>
          <Link to="/explorer" className="mono text-xs text-toxic hover:underline">
            Explore the graveyard →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {DISCOVERIES.map((d) => (
            <div key={d.title} className="rounded-lg border border-border bg-surface p-6">
              <p className="text-2xl">{d.icon}</p>
              <p className="label-xs mt-4">{d.title}</p>
              <p className="mono mt-2 text-2xl font-bold">{d.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{d.meta}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
