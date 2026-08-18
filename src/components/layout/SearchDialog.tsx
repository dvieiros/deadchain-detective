import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidSolanaAddress, shortAddress } from "@/lib/deadchain";

const RECENT = [
  "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const valid = isValidSolanaAddress(value);

  const go = (address: string) => {
    onOpenChange(false);
    setValue("");
    navigate({ to: "/wallet/$address", params: { address } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="label-xs">Search WALLETGRAVE</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) go(value.trim());
          }}
          className="space-y-3"
        >
          <Input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search wallet, token or transaction..."
            className="mono"
          />
          {value && (
            <p className="mono text-xs text-muted-foreground">
              {valid ? (
                <span className="text-toxic">
                  Wallet · Solana · {shortAddress(value.trim())}
                </span>
              ) : (
                "No match — enter a valid Solana address"
              )}
            </p>
          )}
          <Button type="submit" variant="toxic" className="w-full" disabled={!valid}>
            Analyze
          </Button>
        </form>

        <div className="space-y-2">
          <p className="label-xs">Recent searches</p>
          {RECENT.map((r) => (
            <button
              key={r}
              onClick={() => go(r)}
              className="mono block w-full truncate rounded-md border border-border bg-surface px-3 py-2 text-left text-xs text-muted-foreground hover:border-toxic/40 hover:text-foreground"
            >
              {shortAddress(r, 6)}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
