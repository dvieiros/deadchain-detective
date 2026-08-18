import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/** Mirrors the --chart-* design tokens (recharts writes SVG attributes, which cannot read CSS vars). */
export const CHART_COLORS = {
  crypt: "#7C3AED",
  violet: "#A855F7",
  teal: "#22D3EE",
  amber: "#F5A524",
  ghost: "#64748B",
};

const AXIS = {
  stroke: "#64748B",
  fontSize: 10,
  fontFamily: "var(--font-mono)",
};

const tooltipStyle = {
  contentStyle: {
    background: "#161A23",
    border: "1px solid #2A3040",
    borderRadius: 6,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "#F8FAFC",
  },
  labelStyle: { color: "#94A3B8", fontSize: 10, letterSpacing: "0.12em" },
  cursor: { fill: "rgba(168,85,247,0.08)", stroke: "#A855F7", strokeOpacity: 0.25 },
};

export function ChartCard({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-lg border border-border bg-surface p-6 ${className ?? ""}`}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="label-xs">{title}</p>
        {hint && <p className="mono text-[10px] text-muted-foreground">{hint}</p>}
      </div>
      <div className="mt-6 h-[240px] w-full">{children}</div>
    </section>
  );
}

export function GraveyardTrendChart({
  data,
}: {
  data: Array<{ month: string; dormant: number; recoverable: number }>;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gDormant" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLORS.violet} stopOpacity={0.55} />
            <stop offset="100%" stopColor={CHART_COLORS.violet} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gRecoverable" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLORS.teal} stopOpacity={0.45} />
            <stop offset="100%" stopColor={CHART_COLORS.teal} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#1E2532" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} {...AXIS} />
        <YAxis tickLine={false} axisLine={false} width={48} {...AXIS} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey="dormant"
          name="Dormant wallets (k)"
          stroke={CHART_COLORS.violet}
          strokeWidth={2}
          fill="url(#gDormant)"
        />
        <Area
          type="monotone"
          dataKey="recoverable"
          name="Recoverable ($M)"
          stroke={CHART_COLORS.teal}
          strokeWidth={2}
          fill="url(#gRecoverable)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function StatusDonut({ data }: { data: Array<{ name: string; value: number }> }) {
  const palette = [
    CHART_COLORS.violet,
    CHART_COLORS.teal,
    CHART_COLORS.amber,
    CHART_COLORS.ghost,
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={54}
          outerRadius={84}
          paddingAngle={3}
          stroke="#05060A"
        >
          {data.map((d, i) => (
            <Cell key={d.name} fill={palette[i % palette.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          formatter={(v) => (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94A3B8" }}>
              {String(v).toUpperCase()}
            </span>
          )}
        />
        <Tooltip {...tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function AssetValueChart({ data }: { data: Array<{ symbol: string; value: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid stroke="#1E2532" vertical={false} />
        <XAxis dataKey="symbol" tickLine={false} axisLine={false} {...AXIS} />
        <YAxis tickLine={false} axisLine={false} width={48} {...AXIS} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="value" name="USD value" radius={[3, 3, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={d.symbol} fill={i % 2 ? CHART_COLORS.crypt : CHART_COLORS.violet} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ActivityChart({
  data,
}: {
  data: Array<{ year: string; transactions: number }>;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid stroke="#1E2532" vertical={false} />
        <XAxis dataKey="year" tickLine={false} axisLine={false} {...AXIS} />
        <YAxis tickLine={false} axisLine={false} width={48} {...AXIS} />
        <Tooltip {...tooltipStyle} />
        <Line
          type="monotone"
          dataKey="transactions"
          name="Transactions"
          stroke={CHART_COLORS.teal}
          strokeWidth={2}
          dot={{ r: 3, fill: CHART_COLORS.teal, strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
