import mark from "@/assets/walletgrave-mark.png";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/layout/SearchDialog";

const NAV = [
  { to: "/explorer", label: "Explore" },
  { to: "/whales", label: "Whales" },
  { to: "/tokens", label: "Tokens" },
  { to: "/alerts", label: "Alerts" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <div className="container-dc flex h-16 items-center gap-6">
        <Link
          to="/"
          className="mono flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-foreground"
        >
          <img src={mark} alt="" width={28} height={28} className="h-7 w-7" />
          WALLET<span className="text-toxic">GRAVE</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden h-9 w-56 items-center gap-2 rounded-md border border-border bg-surface px-3 text-left text-xs text-muted-foreground transition-colors hover:border-toxic/40 sm:flex"
            aria-label="Search wallet, token or transaction"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="mono truncate">Search wallet, token…</span>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="toxic"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => navigate({ to: "/recover" })}
          >
            <Wallet className="h-4 w-4" /> Connect Wallet
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-dc flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            <Link
              to="/recover"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 text-sm text-toxic"
            >
              Connect Wallet
            </Link>
          </nav>
        </div>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
