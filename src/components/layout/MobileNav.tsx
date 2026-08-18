import { Link } from "@tanstack/react-router";
import { Home, Compass, Wallet, Fish, Bell } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explorer", label: "Explore", icon: Compass },
  { to: "/recover", label: "Wallet", icon: Wallet },
  { to: "/whales", label: "Whales", icon: Fish },
  { to: "/alerts", label: "Alerts", icon: Bell },
] as const;

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl md:hidden">
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex flex-col items-center gap-1 py-2.5 text-[10px] text-muted-foreground"
              activeProps={{ className: "text-toxic" }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
