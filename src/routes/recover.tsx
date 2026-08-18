import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScanOverlay } from "@/components/dc/ScanOverlay";
import { isValidSolanaAddress } from "@/lib/deadchain";

export const Route = createFileRoute("/recover")({
  head: () => ({
    meta: [
      { title: "Recover Solana Rent — WALLETGRAVE" },
      {
        name: "description",
        content:
          "Scan your Solana wallet, close empty token accounts and reclaim rent. You always see the transaction before signing.",
      },
      { property: "og:title", content: "Recover Solana Rent — WALLETGRAVE" },
      {
        property: "og:description",
        content: "Close forgotten empty token accounts and recover SOL in a single signature.",
      },
    ],
  }),
  component: Recover,
});

function Recover() {
  const [address, setAddress] = useState("");
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();
  const valid = isValidSolanaAddress(address);

  return (
    <div className="container-dc py-20">
      {scanning && (
        <ScanOverlay
          address={address.trim()}
          onDone={() =>
            navigate({ to: "/wallet/$address", params: { address: address.trim() } })
          }
        />
      )}
      <div className="mx-auto max-w-xl text-center">
        <p className="label-xs">Recovery</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Scan my wallet
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Paste your address to check for recoverable rent. Your wallet is only requested at the
          signing step — never your seed phrase or private key.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) setScanning(true);
          }}
          className="mt-8 space-y-3"
        >
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Paste wallet address..."
            aria-label="Solana wallet address"
            className="mono h-12 bg-surface"
          />
          <Button variant="toxic" size="lg" className="w-full" disabled={!valid} type="submit">
            Scan wallet
          </Button>
        </form>
      </div>
    </div>
  );
}
