import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-10">
      <div className="container-dc flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mono text-sm font-bold tracking-[0.2em]">
            DEAD<span className="text-toxic">CHAIN</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Find what&apos;s dead. Recover what&apos;s yours.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <Link to="/explorer" className="hover:text-foreground">Explorer</Link>
          <Link to="/whales" className="hover:text-foreground">Whales</Link>
          <Link to="/tokens" className="hover:text-foreground">Tokens</Link>
          <Link to="/alerts" className="hover:text-foreground">Alerts</Link>
        </nav>
      </div>
      <p className="container-dc mono mt-6 text-[11px] text-muted-foreground">
        Never share your seed phrase or private key. WALLETGRAVE will never ask for them.
      </p>
    </footer>
  );
}
