import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, Loader2, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dc/StatusBadge";
import type { WalletAnalysis } from "@/lib/deadchain";

const WALLETS = ["Phantom", "Solflare", "Backpack"];

export function RecoveryModal({
  open,
  onOpenChange,
  analysis,
  onComplete,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  analysis: WalletAnalysis;
  onComplete?: () => void;
}) {
  const [step, setStep] = useState(0);
  const fee = 0.0001;
  const net = Math.max(0, +(analysis.recoverable.sol - fee).toFixed(4));

  useEffect(() => {
    if (!open) setStep(0);
  }, [open]);

  useEffect(() => {
    if (step === 3) {
      const id = setTimeout(() => {
        setStep(4);
        onComplete?.();
      }, 2200);
      return () => clearTimeout(id);
    }
  }, [step, onComplete]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="label-xs">
            {step === 4 ? "Recovery complete" : "Recover funds"}
          </DialogTitle>
        </DialogHeader>

        {step === 0 && (
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="label-xs">We found</p>
              <p className="mono mt-2 text-2xl font-bold">
                {analysis.recoverable.emptyAccounts} empty token accounts
              </p>
              <p className="label-xs mt-6">Estimated recovery</p>
              <p className="mono mt-2 text-3xl font-bold text-toxic">
                {analysis.recoverable.sol} SOL
              </p>
            </div>
            <Button variant="toxic" className="w-full" onClick={() => setStep(1)}>
              Continue
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <dl className="divide-y divide-border rounded-lg border border-border bg-surface text-sm">
              {[
                ["Accounts to close", `${analysis.recoverable.emptyAccounts}`],
                ["You receive", `${analysis.recoverable.sol} SOL`],
                ["Network fee", `~${fee} SOL`],
                ["Estimated net", `${net} SOL`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-5 py-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="mono">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mono text-[11px] text-warning">
              Only empty/recoverable accounts will be closed.
            </p>
            <Button variant="toxic" className="w-full" onClick={() => setStep(2)}>
              Connect wallet
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            {WALLETS.map((w) => (
              <button
                key={w}
                onClick={() => setStep(3)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-surface px-5 py-4 text-sm transition-colors hover:border-toxic/40"
              >
                <span>{w}</span>
                <span className="mono text-xs text-muted-foreground">Connect</span>
              </button>
            ))}
            <p className="mono text-[11px] text-muted-foreground">
              We never ask for your seed phrase or private key.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 py-6 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-toxic" />
            <div>
              <p className="mono text-sm">WAITING FOR WALLET</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Approve the transaction in your wallet.
              </p>
            </div>
            <dl className="divide-y divide-border rounded-lg border border-border bg-surface text-left text-sm">
              <div className="flex justify-between px-5 py-3">
                <dt className="text-muted-foreground">Close</dt>
                <dd className="mono">{analysis.recoverable.emptyAccounts} token accounts</dd>
              </div>
              <div className="flex justify-between px-5 py-3">
                <dt className="text-muted-foreground">Total</dt>
                <dd className="mono text-toxic">{net} SOL</dd>
              </div>
            </dl>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-toxic/40 bg-toxic/10">
              <Check className="h-7 w-7 text-toxic" />
            </div>
            <div>
              <p className="mono text-2xl font-bold text-toxic">{net} SOL recovered</p>
              <p className="mt-1 text-xs text-muted-foreground">
                ≈ ${analysis.recoverable.usd} · {analysis.recoverable.emptyAccounts} accounts
                closed
              </p>
            </div>

            <div className="rounded-lg border border-toxic/30 bg-toxic/5 p-6 text-left">
              <p className="label-xs">Wallet cleanliness</p>
              <div className="mono mt-3 flex items-center gap-3 text-sm">
                <span className="text-muted-foreground line-through">
                  {analysis.cleanlinessScore}/100
                </span>
                <span className="text-toxic">→ 100/100</span>
                <StatusBadge status="clean" className="ml-auto" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4" /> Transaction
              </Button>
              <Button variant="toxic" className="flex-1">
                <Share2 className="h-4 w-4" /> Share result
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5 text-left">
              <p className="mono text-[11px] tracking-[0.2em] text-toxic">DEADCHAIN</p>
              <p className="mono mt-3 text-sm">WALLET CLEANED</p>
              <p className="mono mt-1 text-xs text-muted-foreground">
                {analysis.recoverable.emptyAccounts} accounts removed · {net} SOL recovered
              </p>
              <button
                className="mono mt-4 inline-flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground"
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
              >
                <Copy className="h-3 w-3" /> Copy share link
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
