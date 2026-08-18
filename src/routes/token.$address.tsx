import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/dc/StatusBadge";
import { EXPLORER_WALLETS, formatUsd, shortAddress } from "@/lib/deadchain";

export const Route = createFileRoute("/token/$address")({
  head: ({ params }) => {
    const short = shortAddress(params.address, 4);
    const title = `Token ${short} — Holder Dormancy — WALLETGRAVE`;
    const description = `Dormancy analysis for token ${short}: active, dormant and abandoned holders plus dormant supply share.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: TokenPage,
});

const SPLIT = [
  { label: "Active holders", value: 42, tone: "bg-toxic" },
  { label: "Dormant holders", value: 31, tone: "bg-dormant" },
  { label: "Abandoned", value: 18, tone: "bg-warning" },
  { label: "Unknown", value: 9, tone: "bg-muted-foreground" },
];

function TokenPage() {
  const { address } = Route.useParams();

  return (
    <div className="container-dc py-14">
      <p className="label-xs">Token</p>
      <h1 className="mono mt-3 text-2xl font-bold sm:text-3xl">{shortAddress(address, 6)}</h1>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
        {[
          ["Price", "$0.0021"],
          ["Market cap", "$18.2M"],
          ["Holders", "42,182"],
          ["Dormant supply", "27.8%"],
        ].map(([k, v]) => (
          <div key={k} className="bg-surface p-5">
            <p className="label-xs">{k}</p>
            <p className="mono mt-2 text-lg font-semibold">{v}</p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-lg border border-border bg-surface p-8">
        <p className="label-xs">Token activity</p>
        <div className="mt-6 space-y-4">
          {SPLIT.map((s) => (
            <div key={s.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="mono">{s.value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className={`h-full ${s.tone}`} style={{ width: `${s.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <p className="label-xs">Top holders</p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="hidden bg-surface-2 sm:table-header-group">
              <tr className="label-xs">
                <th className="px-4 py-3 font-normal">Rank</th>
                <th className="px-4 py-3 font-normal">Wallet</th>
                <th className="px-4 py-3 font-normal">Value</th>
                <th className="px-4 py-3 font-normal">Last movement</th>
                <th className="px-4 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {EXPLORER_WALLETS.slice(0, 6).map((w, i) => (
                <tr key={w.address} className="border-t border-border bg-surface">
                  <td className="mono px-4 py-4 text-muted-foreground">#{i + 1}</td>
                  <td className="px-4 py-4">
                    <Link
                      to="/wallet/$address"
                      params={{ address: w.address }}
                      className="mono hover:text-toxic"
                    >
                      {shortAddress(w.address, 5)}
                    </Link>
                    <div className="mt-2 sm:hidden">
                      <StatusBadge status={w.status} />
                    </div>
                  </td>
                  <td className="mono hidden px-4 py-4 sm:table-cell">{formatUsd(w.value)}</td>
                  <td className="mono hidden px-4 py-4 text-muted-foreground sm:table-cell">
                    {w.years} years
                  </td>
                  <td className="hidden px-4 py-4 sm:table-cell">
                    <StatusBadge status={w.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
