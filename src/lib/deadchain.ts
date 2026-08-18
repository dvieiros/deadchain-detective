export type WalletStatus =
  | "active"
  | "dormant"
  | "abandoned"
  | "inaccessible"
  | "recoverable"
  | "unknown";

export type AssetStatus = "active" | "dormant" | "abandoned" | "recoverable" | "suspicious";

export interface WalletAsset {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  status: AssetStatus;
  lastMovement: string;
}

export interface ActivityEvent {
  date: string;
  year: number;
  type: "received" | "sent" | "swap" | "nft" | "token" | "account_open" | "account_close";
  label: string;
  amount?: string;
}

export interface WalletAnalysis {
  address: string;
  chain: "solana";
  status: WalletStatus;
  deadScore: number;
  activityScore: number;
  cleanlinessScore: number;
  diversityScore: number;
  solBalance: number;
  portfolioValue: number;
  transactions: number;
  lastActivityDays: number;
  walletAgeYears: number;
  assets: WalletAsset[];
  activity: ActivityEvent[];
  recoverable: {
    sol: number;
    usd: number;
    emptyAccounts: number;
  };
  reasons: string[];
  confidence: number;
}

const SOL_PRICE = 168.7;

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function isValidSolanaAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address.trim());
}

export function shortAddress(address: string, size = 4): string {
  if (address.length <= size * 2 + 3) return address;
  return `${address.slice(0, size)}...${address.slice(-size)}`;
}

export function formatUsd(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 10_000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function statusLabel(status: WalletStatus | AssetStatus): string {
  return status.toUpperCase();
}

const TOKENS = [
  { symbol: "SOL", name: "Solana" },
  { symbol: "BONK", name: "Bonk" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "JUP", name: "Jupiter" },
  { symbol: "WIF", name: "dogwifhat" },
  { symbol: "PYTH", name: "Pyth Network" },
  { symbol: "XYZ", name: "Unknown Token" },
];

export function analyzeWallet(address: string): WalletAnalysis {
  const seed = hash(address);
  const rand = rng(seed);

  const lastActivityDays = Math.floor(rand() * 1600) + 12;
  const walletAgeYears = +(1 + rand() * 5.5).toFixed(1);
  const solBalance = +(rand() * 6).toFixed(2);
  const emptyAccounts = Math.floor(rand() * 40);
  const recoverableSol = +(emptyAccounts * 0.00203928).toFixed(4);

  const deadScore = Math.min(
    99,
    Math.max(4, Math.round((lastActivityDays / 1600) * 80 + rand() * 20)),
  );
  const activityScore = Math.max(1, 100 - deadScore - Math.floor(rand() * 6));
  const cleanlinessScore = Math.max(5, 100 - emptyAccounts * 2 - Math.floor(rand() * 10));
  const diversityScore = Math.floor(30 + rand() * 65);

  const status: WalletStatus =
    deadScore > 85 ? "abandoned" : deadScore > 55 ? "dormant" : "active";

  const assetCount = 3 + Math.floor(rand() * 4);
  const assets: WalletAsset[] = [];
  let portfolioValue = solBalance * SOL_PRICE;

  for (let i = 0; i < assetCount; i++) {
    const token = TOKENS[(seed + i * 3) % TOKENS.length]!;
    const days = Math.floor(rand() * 1500);
    const value = Math.round(rand() * 4200);
    portfolioValue += value;
    assets.push({
      symbol: token.symbol,
      name: token.name,
      balance: (rand() * 20000).toFixed(rand() > 0.5 ? 2 : 0),
      value,
      status: days > 900 ? "abandoned" : days > 300 ? "dormant" : "active",
      lastMovement: `${days} days ago`,
    });
  }

  if (emptyAccounts > 0) {
    assets.push({
      symbol: "TOKEN ACCOUNTS",
      name: `${emptyAccounts} empty accounts`,
      balance: "0",
      value: 0,
      status: "recoverable",
      lastMovement: "—",
    });
  }

  const now = new Date();
  const activity: ActivityEvent[] = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getTime() - (lastActivityDays + i * 97) * 86400000);
    const types: ActivityEvent["type"][] = [
      "received",
      "sent",
      "swap",
      "nft",
      "token",
      "account_open",
      "account_close",
    ];
    const type = types[(seed + i * 3) % types.length]!;
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      year: d.getFullYear(),
      type,
      label:
        type === "received"
          ? "Received SOL"
          : type === "sent"
            ? "Sent SOL"
            : type === "swap"
              ? "Swap on Jupiter"
              : type === "nft"
                ? "NFT transfer"
                : type === "token"
                  ? "Token movement"
                  : type === "account_open"
                    ? "Token account created"
                    : "Token account closed",
      amount: `${(rand() * 4).toFixed(3)} SOL`,
    };
  });

  return {
    address,
    chain: "solana",
    status,
    deadScore,
    activityScore,
    cleanlinessScore,
    diversityScore,
    solBalance,
    portfolioValue: Math.round(portfolioValue),
    transactions: 120 + Math.floor(rand() * 3200),
    lastActivityDays,
    walletAgeYears,
    assets,
    activity,
    recoverable: {
      sol: recoverableSol,
      usd: +(recoverableSol * SOL_PRICE).toFixed(2),
      emptyAccounts,
    },
    reasons: [
      `No outgoing transaction for ${lastActivityDays} days`,
      `No token movement for ${Math.floor(lastActivityDays * 0.6)} days`,
      `No DEX activity for ${Math.floor(lastActivityDays * 0.75)} days`,
      `${emptyAccounts} unused token accounts`,
      `Activity declined ${deadScore}%`,
    ],
    confidence: Math.min(99, 60 + Math.floor(deadScore / 3)),
  };
}

export const GLOBAL_STATS = [
  { value: "2,481,293", label: "Dormant wallets" },
  { value: "$482M", label: "Dormant assets" },
  { value: "$18.7M", label: "Recoverable" },
  { value: "18,492", label: "Dormant whales" },
];

export const DISCOVERIES = [
  { icon: "🐋", title: "Dormant Whale", value: "$4.2M", meta: "Inactive 4.8 years" },
  { icon: "🪦", title: "Oldest Wallet", value: "6.7 years", meta: "Last move in 2019" },
  { icon: "💰", title: "Largest Recoverable", value: "1.42 SOL", meta: "612 empty accounts" },
];

export const EXPLORER_WALLETS = [
  { address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", status: "dormant", value: 4_200_000, years: 4.8, score: 94 },
  { address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", status: "dormant", value: 2_800_000, years: 5.2, score: 97 },
  { address: "3Nfp2NBLLbjJqQFvGxRcYuGKAeyfCM9GRgDBRCsMFcHm", status: "abandoned", value: 812_400, years: 6.1, score: 98 },
  { address: "5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9", status: "dormant", value: 148_200, years: 3.4, score: 81 },
  { address: "GDfnEsia2WLAW5t8yx2X5j2mkfA74i5kwGdDuZHt7XmG", status: "abandoned", value: 42_900, years: 5.9, score: 96 },
  { address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", status: "dormant", value: 18_420, years: 2.2, score: 68 },
  { address: "2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S", status: "whale", value: 8_900_000, years: 5.7, score: 99 },
  { address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", status: "dormant", value: 6_300_000, years: 4.9, score: 92 },
];

export const WHALES = EXPLORER_WALLETS.filter((w) => w.value > 1_000_000).sort(
  (a, b) => b.value - a.value,
);
