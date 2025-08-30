import { useEffect, useMemo, useRef, useState } from "react";

type ActivityCounts = {
  viewing: number;
  inCart: number;
  recentPurchases: number;
  stockLevel: number;
};

type Props = {
  productId?: string;
  fetcher?: (productId?: string) => Promise<ActivityCounts>;
  pollIntervalMs?: number;
  className?: string;
  simulation?: {
    viewingRange?: [number, number];
    inCartRange?: [number, number];
    purchaseRange?: [number, number];
    stockRange?: [number, number];
    stepViewing?: number;
    stepCart?: number;
    stepPurchases?: number;
    stepStock?: number;
    dropToZeroChance?: number;
  };
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

function useActivityPolling({
  productId,
  fetcher,
  pollIntervalMs = 5000,
  simulation,
}: Pick<Props, "productId" | "fetcher" | "pollIntervalMs" | "simulation">) {
  const [data, setData] = useState<ActivityCounts>({
    viewing: 0,
    inCart: 0,
    recentPurchases: 0,
    stockLevel: 0,
  });
  const timerRef = useRef<number | null>(null);
  const lastRef = useRef<ActivityCounts>({
    viewing: 8,
    inCart: 2,
    recentPurchases: 15,
    stockLevel: 7,
  });

  const seed = useMemo(() => {
    const s = (productId || "default")
      .split("")
      .reduce((a, c) => a + c.charCodeAt(0), 0);
    return s % 9973;
  }, [productId]);

  const seededRandom = (offset = 0) => {
    let x = seed + offset + Date.now() / 60_000;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    return Math.abs((x % 1000) / 1000);
  };

  const simulate = () => {
    const vRange: [number, number] = simulation?.viewingRange ?? [3, 45];
    const cRange: [number, number] = simulation?.inCartRange ?? [1, 12];
    const pRange: [number, number] = simulation?.purchaseRange ?? [5, 89];
    const sRange: [number, number] = simulation?.stockRange ?? [2, 15];

    const stepV = Math.max(1, Math.round(simulation?.stepViewing ?? 4));
    const stepC = Math.max(1, Math.round(simulation?.stepCart ?? 2));
    const stepP = Math.max(1, Math.round(simulation?.stepPurchases ?? 8));
    const stepS = Math.max(1, Math.round(simulation?.stepStock ?? 2));
    const dropToZero = simulation?.dropToZeroChance ?? 0.05;

    const rand = (o = 0) => seededRandom(o) - 0.5;
    const jitter = (v: number, step: number, min: number, max: number, o = 0) =>
      clamp(v + Math.round(rand(o) * step), min, max);

    const shouldDrop = seededRandom(7) < dropToZero;
    const next = {
      viewing: shouldDrop
        ? 0
        : jitter(lastRef.current.viewing, stepV, vRange[0], vRange[1], 11),
      inCart: shouldDrop
        ? 0
        : jitter(lastRef.current.inCart, stepC, cRange[0], cRange[1], 23),
      recentPurchases: jitter(
        lastRef.current.recentPurchases,
        stepP,
        pRange[0],
        pRange[1],
        37
      ),
      stockLevel: jitter(
        lastRef.current.stockLevel,
        stepS,
        sRange[0],
        sRange[1],
        41
      ),
    };
    lastRef.current = next;
    setData(next);
  };

  const tick = async () => {
    if (fetcher) {
      try {
        const fresh = await fetcher(productId);
        if (fresh && typeof fresh.viewing === "number") {
          lastRef.current = fresh;
          setData(fresh);
          return;
        }
      } catch {
        // fall through to simulation
      }
    }
    simulate();
  };

  useEffect(() => {
    tick();
    timerRef.current = window.setInterval(
      tick,
      pollIntervalMs
    ) as unknown as number;
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [productId, fetcher, pollIntervalMs, seed]);

  return data;
}

export default function RecentActivity({
  productId,
  fetcher,
  pollIntervalMs = 6000,
  className,
  simulation,
}: Props) {
  const counts = useActivityPolling({
    productId,
    fetcher,
    pollIntervalMs,
    simulation,
  });

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Fake countdown timer that resets periodically
    const initialTime = 15 + Math.floor(Math.random() * 45); // 15-60 minutes
    setTimeLeft(initialTime);

    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 15 + Math.floor(Math.random() * 45); // Reset
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(countdown);
  }, []);

  const urgencyLevel = useMemo(() => {
    if (counts.stockLevel <= 3) return "critical";
    if (counts.stockLevel <= 7 || counts.viewing > 25) return "high";
    if (counts.recentPurchases > 40) return "medium";
    return "low";
  }, [counts]);

  const urgencyMessage = useMemo(() => {
    switch (urgencyLevel) {
      case "critical":
        return {
          icon: "🚨",
          text: `ALMOST SOLD OUT - Only ${counts.stockLevel} left!`,
          subtext: `${counts.recentPurchases} sold today`,
        };
      case "high":
        return {
          icon: "🔥",
          text:
            counts.stockLevel <= 7
              ? `LOW STOCK ALERT - ${counts.stockLevel} remaining`
              : `TRENDING NOW - ${counts.viewing} people viewing`,
          subtext: `${counts.recentPurchases} sold today`,
        };
      case "medium":
        return {
          icon: "⚡",
          text: `HIGH DEMAND - ${counts.recentPurchases} sold today`,
          subtext: `${counts.viewing} people viewing now`,
        };
      default:
        return {
          icon: "👥",
          text: `${counts.viewing} people viewing this`,
          subtext: `${counts.recentPurchases} sold today`,
        };
    }
  }, [urgencyLevel, counts]);

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const cardStyles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0",
      marginBottom: "20px",
    },
    card: {
      background:
        urgencyLevel === "critical"
          ? "linear-gradient(135deg, #ff4444 0%, #cc1616 100%)"
          : urgencyLevel === "high"
            ? "linear-gradient(135deg, #ff6b35 0%, #e55100 100%)"
            : "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
      border:
        urgencyLevel === "critical"
          ? "2px solid #ff6666"
          : urgencyLevel === "high"
            ? "2px solid #ff8a65"
            : "2px solid #333",
      borderRadius: "16px",
      padding: "16px 15px",
      marginLeft: "10px",
      color: "#fff",
      fontFamily: '"Segoe UI", system-ui, sans-serif',
      width: "100%",
      maxWidth: "400px",
      boxShadow:
        urgencyLevel === "critical"
          ? "0 8px 32px rgba(255, 68, 68, 0.4), 0 0 0 1px rgba(255, 102, 102, 0.2)"
          : "0 8px 32px rgba(0, 0, 0, 0.3)",
      position: "relative" as const,
      overflow: "hidden" as const,
      animation: urgencyLevel === "critical" ? "pulse 2s infinite" : "none",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "4px",
    },
    mainText: {
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: "600",
      gap: "8px",
      flex: "1",
    },
    subtext: {
      fontSize: "13px",
      opacity: 0.85,
      textAlign: "center" as const,
      marginTop: "4px",
    },
    timer: {
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      fontWeight: "600",
      gap: "4px",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      padding: "6px 10px",
      borderRadius: "12px",
      backdropFilter: "blur(10px)",
      flexShrink: 0,
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    indicator: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: urgencyLevel === "critical" ? "#fff" : "#4ade80",
      animation: "blink 1.5s infinite",
      marginRight: "2px",
    },
  };

  return (
    <div style={cardStyles.wrapper} className={className}>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
      <div style={cardStyles.card} role="status" aria-live="polite">
        <div style={cardStyles.header}>
          <div style={cardStyles.mainText}>
            <span style={cardStyles.indicator}></span>
            <span>{urgencyMessage.icon}</span>
            <span>{urgencyMessage.text}</span>
          </div>
          {urgencyLevel !== "low" && (
            <div style={cardStyles.timer}>
              <span>🕒</span>
              <span>{formatTime(timeLeft)} left</span>
            </div>
          )}
        </div>
        <div style={cardStyles.subtext}>{urgencyMessage.subtext}</div>
      </div>
    </div>
  );
}
