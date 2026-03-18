import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ENGINE ─── */
const seed = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };

const genHistory = (base, days = 30, s = 42) => {
  const rng = seed(s);
  const h = [];
  let p = base * (1 + (rng() - 0.5) * 0.1);
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    p = Math.max(base * 0.6, Math.min(base * 1.4, p + (rng() - 0.47) * base * 0.035));
    h.push({ date: new Date(now - i * 864e5).toISOString().split("T")[0], price: Math.round(p * 100) / 100 });
  }
  return h;
};

const STORE_NAMES = [
  "CedarCraft Studio", "The Artisan Nook", "Maple & Thread Co.", "Rustic Ember Goods",
  "Willow & Pine Shop", "Handmade by Lena", "The Cozy Kiln", "Oakwood Collective",
  "Sunflower & Sage", "Birchwood Mercantile", "Little Fox Pottery", "The Wandering Maker",
  "Clover Hill Crafts", "Moonstone Atelier", "River Stone Designs"
];

const SHIPPING_OPTIONS = [
  { label: "Free shipping", cost: 0 },
  { label: "$4.99 shipping", cost: 4.99 },
  { label: "$5.95 shipping", cost: 5.95 },
  { label: "$3.49 shipping", cost: 3.49 },
  { label: "$6.99 shipping", cost: 6.99 },
  { label: "$7.50 shipping", cost: 7.50 },
  { label: "Free shipping", cost: 0 },
  { label: "$2.99 shipping", cost: 2.99 },
  { label: "Free shipping", cost: 0 },
  { label: "$5.49 shipping", cost: 5.49 },
  { label: "$4.25 shipping", cost: 4.25 },
  { label: "Free shipping", cost: 0 },
  { label: "$3.99 shipping", cost: 3.99 },
  { label: "$8.50 shipping", cost: 8.50 },
  { label: "Free shipping", cost: 0 },
];

const genCompetitors = (basePrice, count = 15) =>
  STORE_NAMES.slice(0, count).map((name, i) => ({
    id: `comp-${i}`,
    store: name,
    currentPrice: Math.round((basePrice * (0.7 + (i * 0.04) + Math.sin(i) * 0.08)) * 100) / 100,
    shippingCost: SHIPPING_OPTIONS[i % SHIPPING_OPTIONS.length].cost,
    shippingLabel: SHIPPING_OPTIONS[i % SHIPPING_OPTIONS.length].label,
    history: genHistory(basePrice * (0.75 + i * 0.03), 30, (i + 1) * 137),
  }));

const DEMO_PRODUCTS = [
  {
    id: "p1", name: "Handmade Ceramic Mug — Earth Tones", platform: "Etsy",
    yourPrice: 28.00, yourShipping: 0, history: genHistory(28, 30, 99),
    competitors: genCompetitors(28),
  },
  {
    id: "p2", name: "Minimalist Leather Wallet — Slim Bifold", platform: "Amazon",
    yourPrice: 45.00, yourShipping: 5.99, history: genHistory(45, 30, 200),
    competitors: genCompetitors(45),
  },
  {
    id: "p3", name: "Soy Candle Set — Lavender & Sage (3pk)", platform: "Shopify",
    yourPrice: 34.00, yourShipping: 0, history: genHistory(34, 30, 333),
    competitors: genCompetitors(34),
  },
  {
    id: "p4", name: "Macramé Wall Hanging — Boho Large", platform: "Etsy",
    yourPrice: 62.00, yourShipping: 8.99, history: genHistory(62, 30, 444),
    competitors: genCompetitors(62),
  },
];

/* ─── SMART ALERT ENGINE ─── */
const ALERT_TYPES = { PRICE_DROP: "price_drop", PROMO: "promo", NOISE: "noise" };

const generateDemoAlerts = () => {
  const now = Date.now();
  return [
    {
      id: "a1", productId: "p1", productName: "Handmade Ceramic Mug — Earth Tones",
      store: "CedarCraft Studio", type: ALERT_TYPES.PRICE_DROP,
      oldPrice: 26.50, newPrice: 22.99, shippingCost: 0,
      confidence: 94, reason: "Consistent with 7-day downward trend. No sale language detected.",
      timestamp: new Date(now - 1800000).toISOString(), status: "new",
    },
    {
      id: "a2", productId: "p2", productName: "Minimalist Leather Wallet — Slim Bifold",
      store: "Rustic Ember Goods", type: ALERT_TYPES.PROMO,
      oldPrice: 44.00, newPrice: 33.00, shippingCost: 4.99,
      confidence: 87, reason: "\"25% OFF\" badge detected on listing. Likely temporary promotion.",
      timestamp: new Date(now - 7200000).toISOString(), status: "new",
    },
    {
      id: "a3", productId: "p3", productName: "Soy Candle Set — Lavender & Sage (3pk)",
      store: "Willow & Pine Shop", type: ALERT_TYPES.PRICE_DROP,
      oldPrice: 34.00, newPrice: 29.50, shippingCost: 5.95,
      confidence: 91, reason: "Price reduced with no promo indicators. New baseline likely.",
      timestamp: new Date(now - 14400000).toISOString(), status: "new",
    },
    {
      id: "a4", productId: "p1", productName: "Handmade Ceramic Mug — Earth Tones",
      store: "The Cozy Kiln", type: ALERT_TYPES.NOISE,
      oldPrice: 30.00, newPrice: 29.85, shippingCost: 3.49,
      confidence: 72, reason: "Price change < 1%. Possible rounding or A/B test. Auto-dismissed.",
      timestamp: new Date(now - 28800000).toISOString(), status: "dismissed",
    },
    {
      id: "a5", productId: "p4", productName: "Macramé Wall Hanging — Boho Large",
      store: "Moonstone Atelier", type: ALERT_TYPES.PRICE_DROP,
      oldPrice: 65.00, newPrice: 54.99, shippingCost: 0,
      confidence: 96, reason: "Significant sustained drop. Competitor repriced 3 products this week.",
      timestamp: new Date(now - 43200000).toISOString(), status: "new",
    },
    {
      id: "a6", productId: "p2", productName: "Minimalist Leather Wallet — Slim Bifold",
      store: "Birchwood Mercantile", type: ALERT_TYPES.PROMO,
      oldPrice: 48.00, newPrice: 38.40, shippingCost: 0,
      confidence: 82, reason: "\"SPRING20\" coupon code visible in listing. Seasonal promo likely.",
      timestamp: new Date(now - 64800000).toISOString(), status: "new",
    },
    {
      id: "a7", productId: "p3", productName: "Soy Candle Set — Lavender & Sage (3pk)",
      store: "Little Fox Pottery", type: ALERT_TYPES.NOISE,
      oldPrice: 36.00, newPrice: 35.80, shippingCost: 2.99,
      confidence: 65, reason: "Micro-fluctuation detected. No meaningful pattern. Auto-dismissed.",
      timestamp: new Date(now - 86400000).toISOString(), status: "dismissed",
    },
  ];
};

/* ─── INTERACTIVE LINE CHART ─── */
const Chart = ({ yourHistory, yourPrice, selectedComps = [], period = "1M" }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [dims, setDims] = useState({ w: 380, h: 220 });

  const sliceData = useCallback((data) => {
    const map = { "1D": 1, "1W": 7, "1M": 30, "1Y": 30, "ALL": 30 };
    return data.slice(-(map[period] || 30));
  }, [period]);

  const yourData = sliceData(yourHistory);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setDims({ w: e.contentRect.width, h: Math.min(240, e.contentRect.width * 0.55) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const { w, h } = dims;
    cvs.width = w * dpr;
    cvs.height = h * dpr;
    cvs.style.width = w + "px";
    cvs.style.height = h + "px";
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const PAD_L = 0, PAD_R = 0, PAD_T = 12, PAD_B = 8;
    const cw = w - PAD_L - PAD_R, ch = h - PAD_T - PAD_B;

    let allPrices = [...yourData.map(d => d.price), yourPrice];
    selectedComps.forEach(c => {
      sliceData(c.history).forEach(d => allPrices.push(d.price));
    });
    const mn = Math.min(...allPrices) * 0.97;
    const mx = Math.max(...allPrices) * 1.03;
    const rng = mx - mn || 1;

    const toX = (i, len) => PAD_L + (i / Math.max(1, len - 1)) * cw;
    const toY = (p) => PAD_T + (1 - (p - mn) / rng) * ch;

    const drawLine = (data, color, width = 2) => {
      if (data.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      data.forEach((d, i) => {
        const x = toX(i, data.length), y = toY(d.price);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(52,211,153,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD_L, toY(yourPrice));
    ctx.lineTo(w - PAD_R, toY(yourPrice));
    ctx.stroke();
    ctx.setLineDash([]);

    selectedComps.forEach(c => {
      drawLine(sliceData(c.history), "#ef4444", 1.5);
    });
    drawLine(yourData, "#34d399", 2.5);

    if (yourData.length > 0) {
      const lx = toX(yourData.length - 1, yourData.length);
      const ly = toY(yourData[yourData.length - 1].price);
      ctx.beginPath();
      ctx.arc(lx, ly, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#34d399";
      ctx.fill();
    }

    const handleMove = (e) => {
      const rect = cvs.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      const idx = Math.round((x - PAD_L) / cw * (yourData.length - 1));
      const ci = Math.max(0, Math.min(yourData.length - 1, idx));
      const pt = yourData[ci];
      if (pt) {
        setTooltip({ x: toX(ci, yourData.length), y: toY(pt.price), price: pt.price, date: pt.date });
      }
    };
    const handleLeave = () => setTooltip(null);
    cvs.addEventListener("mousemove", handleMove);
    cvs.addEventListener("touchmove", handleMove, { passive: true });
    cvs.addEventListener("mouseleave", handleLeave);
    cvs.addEventListener("touchend", handleLeave);
    return () => {
      cvs.removeEventListener("mousemove", handleMove);
      cvs.removeEventListener("touchmove", handleMove);
      cvs.removeEventListener("mouseleave", handleLeave);
      cvs.removeEventListener("touchend", handleLeave);
    };
  }, [dims, yourData, yourPrice, selectedComps, sliceData]);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", touchAction: "none" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
      {tooltip && (
        <>
          <div style={{ position: "absolute", left: tooltip.x, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.15)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -50%)", width: 10, height: 10, borderRadius: "50%", background: "#34d399", border: "2px solid #000", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: Math.min(tooltip.x, dims.w - 100), top: -4, transform: "translateX(-50%)", background: "#1c1c1e", borderRadius: 6, padding: "4px 10px", pointerEvents: "none", whiteSpace: "nowrap" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>${tooltip.price.toFixed(2)}</div>
            <div style={{ fontSize: 10, color: "#8e8e93" }}>{tooltip.date}</div>
          </div>
        </>
      )}
    </div>
  );
};

/* ─── MAIN APP ─── */
export default function PriceHawk() {
  const [products] = useState(DEMO_PRODUCTS);
  const [view, setView] = useState("home");
  const [selectedProdId, setSelectedProdId] = useState(null);
  const [period, setPeriod] = useState("1M");
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedCompIds, setSelectedCompIds] = useState(new Set());
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", platform: "Etsy", price: "" });
  const [alerts, setAlerts] = useState(generateDemoAlerts);
  const [alertFilter, setAlertFilter] = useState("all");
  const [showLanded, setShowLanded] = useState(true);

  const selectedProduct = products.find(p => p.id === selectedProdId);
  const font = "'SF Pro Display', -apple-system, 'Helvetica Neue', sans-serif";

  const openDetail = (p) => {
    setSelectedProdId(p.id);
    setView("detail");
    setPeriod("1M");
    setVisibleCount(5);
    setSelectedCompIds(new Set());
  };

  const toggleComp = (id) => {
    setSelectedCompIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const sortedComps = selectedProduct
    ? [...selectedProduct.competitors].sort((a, b) => {
        const aT = showLanded ? a.currentPrice + a.shippingCost : a.currentPrice;
        const bT = showLanded ? b.currentPrice + b.shippingCost : b.currentPrice;
        return aT - bT;
      })
    : [];

  const visibleComps = sortedComps.slice(0, visibleCount);
  const activeComps = sortedComps.filter(c => selectedCompIds.has(c.id));

  const todayChange = (h) => {
    if (h.length < 2) return { amt: 0, pct: 0 };
    const cur = h[h.length - 1].price;
    const prev = h[h.length - 2].price;
    return { amt: cur - prev, pct: ((cur - prev) / prev) * 100 };
  };

  const handleAlertAction = (alertId, action) => {
    setAlerts(prev => prev.map(a => {
      if (a.id !== alertId) return a;
      if (action === "match") return { ...a, status: "matched" };
      if (action === "snooze") return { ...a, status: "snoozed" };
      if (action === "promo") return { ...a, status: "promo", type: ALERT_TYPES.PROMO };
      if (action === "dismiss") return { ...a, status: "dismissed" };
      return a;
    }));
  };

  const activeAlerts = alerts.filter(a => a.status === "new");
  const filteredAlerts = alertFilter === "all" ? alerts : alerts.filter(a => a.type === alertFilter);

  const alertTypeStyle = (type) => {
    if (type === ALERT_TYPES.PRICE_DROP) return { label: "Price Drop", color: "#ff453a", bg: "rgba(255,69,58,0.12)", icon: "↓" };
    if (type === ALERT_TYPES.PROMO) return { label: "Promo Detected", color: "#ff9f0a", bg: "rgba(255,159,10,0.12)", icon: "%" };
    return { label: "Noise", color: "#636366", bg: "rgba(99,99,102,0.12)", icon: "~" };
  };

  const alertStatusBadge = (status) => {
    if (status === "matched") return { label: "Price matched", color: "#34d399", bg: "rgba(52,211,153,0.12)" };
    if (status === "snoozed") return { label: "Snoozed 7d", color: "#5e5ce6", bg: "rgba(94,92,230,0.12)" };
    if (status === "promo") return { label: "Marked as promo", color: "#ff9f0a", bg: "rgba(255,159,10,0.12)" };
    if (status === "dismissed") return { label: "Auto-dismissed", color: "#636366", bg: "rgba(99,99,102,0.12)" };
    return null;
  };

  const timeAgo = (ts) => {
    const d = Date.now() - new Date(ts).getTime();
    const m = Math.floor(d / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  /* ════════════════════════════════════════════ */
  /* ═══ ALERTS VIEW                         ═══ */
  /* ════════════════════════════════════════════ */
  if (view === "alerts") {
    return (
      <div style={{ fontFamily: font, background: "#000", color: "#fff", minHeight: "100vh", padding: "0 0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 20px 8px", gap: 12 }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", padding: 0, lineHeight: 1, fontFamily: font }}>←</button>
          <span style={{ fontSize: 17, fontWeight: 600 }}>Alerts</span>
          <div style={{ flex: 1 }} />
          {activeAlerts.length > 0 && (
            <span style={{ background: "#ff453a", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 10 }}>{activeAlerts.length} new</span>
          )}
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 6, padding: "8px 20px 16px", overflowX: "auto" }}>
          {[
            { key: "all", label: "All" },
            { key: ALERT_TYPES.PRICE_DROP, label: "Price Drops", c: "#ff453a" },
            { key: ALERT_TYPES.PROMO, label: "Promos", c: "#ff9f0a" },
            { key: ALERT_TYPES.NOISE, label: "Noise", c: "#636366" },
          ].map(f => (
            <button key={f.key} onClick={() => setAlertFilter(f.key)} style={{
              padding: "8px 16px", borderRadius: 20, border: "none",
              background: alertFilter === f.key ? "#2c2c2e" : "transparent",
              color: alertFilter === f.key ? (f.c || "#fff") : "#8e8e93",
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: font, whiteSpace: "nowrap",
            }}>{f.label}</button>
          ))}
        </div>

        {/* Smart summary */}
        <div style={{ padding: "0 20px 12px" }}>
          <div style={{ background: "#1c1c1e", borderRadius: 12, padding: "14px 16px", borderLeft: "3px solid #34d399" }}>
            <div style={{ fontSize: 13, color: "#8e8e93", marginBottom: 4 }}>Smart Summary</div>
            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.45 }}>
              {alerts.filter(a => a.type === ALERT_TYPES.PRICE_DROP && a.status === "new").length} real price drops need attention. {alerts.filter(a => a.type === ALERT_TYPES.PROMO).length} promos auto-tagged. {alerts.filter(a => a.type === ALERT_TYPES.NOISE).length} noise alerts auto-dismissed.
            </div>
          </div>
        </div>

        {/* Alert cards */}
        <div style={{ padding: "0 20px" }}>
          {filteredAlerts.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#636366", fontSize: 14 }}>No alerts in this category</div>
          ) : filteredAlerts.map(a => {
            const ts = alertTypeStyle(a.type);
            const ss = alertStatusBadge(a.status);
            const landedOld = a.oldPrice + a.shippingCost;
            const landedNew = a.newPrice + a.shippingCost;
            const isNew = a.status === "new";

            return (
              <div key={a.id} style={{
                background: "#1c1c1e", borderRadius: 14, padding: "16px 18px", marginBottom: 10,
                borderLeft: `3px solid ${ts.color}`,
                opacity: (a.status === "dismissed" || a.status === "snoozed") ? 0.55 : 1,
                transition: "opacity 0.2s",
              }}>
                {/* Type badge + time */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 8, background: ts.bg, color: ts.color, fontSize: 12, fontWeight: 700 }}>
                      {ts.icon} {ts.label}
                    </span>
                    <span style={{ fontSize: 11, color: "#636366" }}>{a.confidence}% conf.</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#636366" }}>{timeAgo(a.timestamp)}</span>
                </div>

                {/* Store + product */}
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{a.store}</div>
                <div style={{ fontSize: 12, color: "#8e8e93", marginBottom: 10 }}>{a.productName}</div>

                {/* Sticker + Landed price side by side */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#000", borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#636366", marginBottom: 2 }}>Sticker</div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>
                      <span style={{ color: "#636366", textDecoration: "line-through" }}>${a.oldPrice.toFixed(2)}</span>
                      {" → "}
                      <span style={{ color: ts.color }}>${a.newPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div style={{ width: 1, height: 32, background: "#2c2c2e" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#636366", marginBottom: 2 }}>
                      Landed {a.shippingCost > 0 ? `(+$${a.shippingCost.toFixed(2)} ship)` : "(free ship)"}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>
                      <span style={{ color: "#636366", textDecoration: "line-through" }}>${landedOld.toFixed(2)}</span>
                      {" → "}
                      <span style={{ color: "#fff" }}>${landedNew.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* AI reason */}
                <div style={{ fontSize: 12, color: "#8e8e93", lineHeight: 1.4, marginBottom: isNew ? 12 : 4, padding: "6px 0", fontStyle: "italic" }}>
                  {a.reason}
                </div>

                {/* Status badge if already actioned */}
                {ss && !isNew && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 8, background: ss.bg, color: ss.color, fontSize: 12, fontWeight: 600 }}>
                    ✓ {ss.label}
                  </div>
                )}

                {/* One-tap action buttons */}
                {isNew && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => handleAlertAction(a.id, "match")} style={{
                      flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
                      background: "#34d399", color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: font,
                    }}>Match Price</button>
                    <button onClick={() => handleAlertAction(a.id, "snooze")} style={{
                      flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid #2c2c2e",
                      background: "transparent", color: "#8e8e93", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: font,
                    }}>Snooze 7d</button>
                    <button onClick={() => handleAlertAction(a.id, a.type === ALERT_TYPES.PROMO ? "dismiss" : "promo")} style={{
                      flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid #2c2c2e",
                      background: "transparent", color: a.type === ALERT_TYPES.PROMO ? "#636366" : "#ff9f0a",
                      fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: font,
                    }}>{a.type === ALERT_TYPES.PROMO ? "Dismiss" : "It's a Promo"}</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════ */
  /* ═══ HOME VIEW                           ═══ */
  /* ════════════════════════════════════════════ */
  if (view === "home") {
    return (
      <div style={{ fontFamily: font, background: "#000", color: "#fff", minHeight: "100vh", padding: "0 0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>
              <span style={{ color: "#34d399" }}>◆</span> PriceHawk
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setView("alerts")} style={{
              background: "#1c1c1e", border: "none", color: "#fff", width: 36, height: 36,
              borderRadius: "50%", fontSize: 16, cursor: "pointer", fontFamily: font,
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
            }}>
              🔔
              {activeAlerts.length > 0 && (
                <span style={{
                  position: "absolute", top: -2, right: -2, background: "#ff453a", color: "#fff",
                  fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #000",
                }}>{activeAlerts.length}</span>
              )}
            </button>
            <button onClick={() => setShowAdd(!showAdd)} style={{
              background: "#1c1c1e", border: "none", color: "#fff", width: 36, height: 36,
              borderRadius: "50%", fontSize: 20, cursor: "pointer", fontFamily: font,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>+</button>
          </div>
        </div>

        <div style={{ padding: "4px 20px 12px" }}>
          <div style={{ background: "#1c1c1e", borderRadius: 10, padding: "10px 14px" }}>
            <input placeholder="Search Products" style={{ background: "transparent", border: "none", color: "#8e8e93", fontSize: 16, fontFamily: font, width: "100%", outline: "none" }} />
          </div>
        </div>

        {showAdd && (
          <div style={{ padding: "0 20px 16px" }}>
            <div style={{ background: "#1c1c1e", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Track New Product</div>
              <input placeholder="Product name" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #2c2c2e", background: "#000", color: "#fff", fontSize: 15, fontFamily: font, marginBottom: 10, boxSizing: "border-box", outline: "none" }} />
              <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <select value={addForm.platform} onChange={e => setAddForm(f => ({ ...f, platform: e.target.value }))} style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid #2c2c2e", background: "#000", color: "#fff", fontSize: 15, fontFamily: font, outline: "none" }}>
                  {["Etsy", "Amazon", "Shopify", "eBay"].map(p => <option key={p}>{p}</option>)}
                </select>
                <input placeholder="Your price" type="number" value={addForm.price} onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))} style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid #2c2c2e", background: "#000", color: "#fff", fontSize: 15, fontFamily: font, outline: "none" }} />
              </div>
              <button onClick={() => setShowAdd(false)} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: "#34d399", color: "#000", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: font }}>Start Tracking</button>
            </div>
          </div>
        )}

        <div style={{ padding: "0 20px" }}>
          {products.map(p => {
            const ch = todayChange(p.history);
            const cur = p.history[p.history.length - 1]?.price || 0;
            const undercut = sortedByPrice(p).count;
            return (
              <div key={p.id} onClick={() => openDetail(p)} style={{ background: "#1c1c1e", borderRadius: 14, padding: "18px 18px 14px", marginBottom: 10, cursor: "pointer", transition: "transform 0.1s ease" }}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.985)"}
                onMouseUp={e => e.currentTarget.style.transform = ""}
                onMouseLeave={e => e.currentTarget.style.transform = ""}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{p.platform}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>${cur.toFixed(2)}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2, color: ch.amt >= 0 ? "#34d399" : "#ff453a" }}>
                      {ch.amt >= 0 ? "↑" : "↓"} {Math.abs(ch.pct).toFixed(2)}% today
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 4 }}><MiniChart data={p.history.slice(-14)} positive={ch.amt >= 0} /></div>
                <div style={{ display: "flex", gap: 16, marginTop: 10, paddingTop: 10, borderTop: "1px solid #2c2c2e", fontSize: 12 }}>
                  <span style={{ color: "#8e8e93" }}>Your price <span style={{ color: "#fff", fontWeight: 600 }}>${p.yourPrice.toFixed(2)}</span></span>
                  <span style={{ color: "#8e8e93" }}>Undercutting <span style={{ color: undercut > 0 ? "#ff453a" : "#34d399", fontWeight: 600 }}>{undercut}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════ */
  /* ═══ DETAIL VIEW                         ═══ */
  /* ════════════════════════════════════════════ */
  if (view === "detail" && selectedProduct) {
    const p = selectedProduct;
    const cur = p.history[p.history.length - 1]?.price || 0;
    const ch = todayChange(p.history);
    const yourLanded = p.yourPrice + (p.yourShipping || 0);

    return (
      <div style={{ fontFamily: font, background: "#000", color: "#fff", minHeight: "100vh", paddingBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 20px 4px", gap: 12 }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", padding: 0, lineHeight: 1, fontFamily: font }}>←</button>
          <span style={{ fontSize: 17, fontWeight: 600 }}>Product</span>
          <div style={{ flex: 1 }} />
          <button style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", padding: 0, letterSpacing: 2 }}>•••</button>
        </div>

        <div style={{ padding: "20px 24px 6px" }}>
          <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>${cur.toFixed(2)}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 15 }}>
            <span style={{ color: ch.amt >= 0 ? "#34d399" : "#ff453a", fontWeight: 600 }}>
              {ch.amt >= 0 ? "↑" : "↓"} {Math.abs(ch.pct).toFixed(2)}% today
            </span>
            <span style={{ color: ch.amt >= 0 ? "#34d399" : "#ff453a" }}>
              {ch.amt >= 0 ? "+" : ""}${ch.amt.toFixed(2)}
            </span>
          </div>
        </div>

        <div style={{ padding: "16px 16px 0" }}>
          <Chart yourHistory={p.history} yourPrice={p.yourPrice} selectedComps={activeComps} period={period} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "16px 20px 0" }}>
          {["1D", "1W", "1M", "1Y", "ALL"].map(t => (
            <button key={t} onClick={() => setPeriod(t)} style={{
              padding: "8px 18px", borderRadius: 20, border: "none",
              background: period === t ? "#2c2c2e" : "transparent",
              color: period === t ? "#fff" : "#8e8e93",
              fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: font, transition: "all 0.15s ease",
            }}>{t}</button>
          ))}
        </div>

        {activeComps.length > 0 && (
          <div style={{ padding: "12px 24px 0", display: "flex", gap: 16, fontSize: 12, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 14, height: 3, background: "#34d399", borderRadius: 2, display: "inline-block" }} />
              <span style={{ color: "#8e8e93" }}>Your price</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 14, height: 3, background: "#ef4444", borderRadius: 2, display: "inline-block" }} />
              <span style={{ color: "#8e8e93" }}>{activeComps.length} competitor{activeComps.length > 1 ? "s" : ""}</span>
            </span>
          </div>
        )}

        {/* My product card — with shipping + landed */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ background: "#1c1c1e", borderRadius: 14, padding: "18px 20px", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>My product</span>
              <span style={{ background: "#2c2c2e", padding: "5px 12px", borderRadius: 14, fontSize: 13, fontWeight: 600, color: "#8e8e93" }}>Details</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#34d399" }}>${p.yourPrice.toFixed(2)}</div>
                <div style={{ fontSize: 13, color: "#8e8e93", marginTop: 2 }}>Your price</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: cur < p.yourPrice ? "#ff453a" : "#34d399" }}>
                  {cur >= p.yourPrice ? "+" : ""}${(cur - p.yourPrice).toFixed(2)}
                </div>
                <div style={{ fontSize: 13, color: "#8e8e93", marginTop: 2 }}>vs. market</div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #2c2c2e", paddingTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 15 }}>
                <span style={{ color: "#8e8e93" }}>Market price $</span>
                <span style={{ fontWeight: 600 }}>${cur.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 15 }}>
                <span style={{ color: "#8e8e93" }}>Your shipping</span>
                <span style={{ fontWeight: 600, color: p.yourShipping === 0 ? "#34d399" : "#fff" }}>
                  {p.yourShipping === 0 ? "Free" : `$${p.yourShipping.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 15 }}>
                <span style={{ color: "#8e8e93" }}>Your landed price</span>
                <span style={{ fontWeight: 700, color: "#34d399" }}>${yourLanded.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                <span style={{ color: "#8e8e93" }}>Position</span>
                <span style={{ fontWeight: 600, color: cur < p.yourPrice ? "#ff453a" : "#34d399" }}>
                  {cur < p.yourPrice ? "↓" : "↑"} {Math.abs(((cur - p.yourPrice) / p.yourPrice) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Competitors list — with shipping + landed toggle */}
        <div style={{ padding: "10px 20px 0" }}>
          <div style={{ background: "#1c1c1e", borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 17, fontWeight: 700 }}>Competitors</span>
              <span style={{ background: "#2c2c2e", padding: "5px 12px", borderRadius: 14, fontSize: 13, fontWeight: 600, color: "#8e8e93" }}>Sort By</span>
            </div>

            {/* Landed price toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#8e8e93" }}>
                {showLanded ? "Lowest Landed Price" : "Lowest Sticker Price"}
              </div>
              <button onClick={() => setShowLanded(v => !v)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 14, border: "none",
                background: showLanded ? "rgba(52,211,153,0.12)" : "#2c2c2e",
                color: showLanded ? "#34d399" : "#8e8e93", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: font,
              }}>
                <span style={{
                  width: 28, height: 16, borderRadius: 8, position: "relative", display: "inline-block",
                  background: showLanded ? "#34d399" : "#48484a", transition: "background 0.2s",
                }}>
                  <span style={{
                    position: "absolute", top: 2, width: 12, height: 12, borderRadius: "50%",
                    background: "#fff", transition: "left 0.2s", left: showLanded ? 14 : 2,
                  }} />
                </span>
                + Shipping
              </button>
            </div>

            {visibleComps.map((c, i) => {
              const isSelected = selectedCompIds.has(c.id);
              const compLanded = c.currentPrice + c.shippingCost;
              const displayPrice = showLanded ? compLanded : c.currentPrice;
              const compareAgainst = showLanded ? yourLanded : p.yourPrice;
              const diff = ((displayPrice - compareAgainst) / compareAgainst) * 100;
              return (
                <div key={c.id} onClick={() => toggleComp(c.id)} style={{
                  display: "flex", alignItems: "center", padding: "13px 0",
                  borderTop: i > 0 ? "1px solid #2c2c2e" : "none", cursor: "pointer", transition: "opacity 0.1s",
                }}
                  onMouseDown={e => e.currentTarget.style.opacity = "0.7"}
                  onMouseUp={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%", marginRight: 12, flexShrink: 0,
                    background: isSelected ? "#3b1414" : "#2c2c2e",
                    border: isSelected ? "2px solid #ef4444" : "2px solid transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, color: isSelected ? "#ef4444" : "#8e8e93", transition: "all 0.15s ease",
                  }}>{c.store.charAt(0)}</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: isSelected ? "#fff" : "#e5e5ea" }}>{c.store}</div>
                    <div style={{ fontSize: 11, color: c.shippingCost === 0 ? "#34d399" : "#636366", marginTop: 2 }}>
                      {c.shippingCost === 0 ? "Free shipping" : `+$${c.shippingCost.toFixed(2)} shipping`}
                    </div>
                  </div>

                  <div style={{ textAlign: "right", marginLeft: 12, flexShrink: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>
                      ${displayPrice.toFixed(2)}
                      {showLanded && <span style={{ fontSize: 10, color: "#636366", fontWeight: 500, marginLeft: 3 }}>landed</span>}
                    </div>
                    <span style={{
                      display: "inline-block", marginTop: 3, padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                      background: diff < 0 ? "rgba(255,69,58,0.15)" : "rgba(52,211,153,0.15)",
                      color: diff < 0 ? "#ff453a" : "#34d399",
                    }}>{diff < 0 ? "↓" : "↑"} {Math.abs(diff).toFixed(1)}%</span>
                  </div>
                </div>
              );
            })}

            {visibleCount < sortedComps.length && (
              <button onClick={(e) => { e.stopPropagation(); setVisibleCount(v => v + 10); }} style={{
                width: "100%", padding: "14px", marginTop: 10, borderRadius: 10, border: "1px solid #2c2c2e",
                background: "transparent", color: "#34d399", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: font, transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#0d1f17"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >Show {Math.min(10, sortedComps.length - visibleCount)} more</button>
            )}

            {activeComps.length > 0 && (
              <button onClick={(e) => { e.stopPropagation(); setSelectedCompIds(new Set()); }} style={{
                width: "100%", padding: "14px", marginTop: 8, borderRadius: 10, border: "none", background: "#2c2c2e",
                color: "#8e8e93", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: font,
              }}>Clear chart ({activeComps.length} selected)</button>
            )}
          </div>
        </div>

        {/* News cards */}
        <div style={{ display: "flex", gap: 10, padding: "20px 20px 0", overflowX: "auto" }}>
          {[
            { src: "MarketWatch", time: "2D AGO", text: `Price dropped 8% on similar ${p.platform} listings this week` },
            { src: "PriceHawk", time: "1H AGO", text: `3 competitors adjusted pricing in the last 24 hours` },
          ].map((n, i) => (
            <div key={i} style={{ background: "#1c1c1e", borderRadius: 14, padding: "16px 18px", minWidth: 240, flex: "0 0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#2c2c2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#8e8e93" }}>PH</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{n.src}</div>
                  <div style={{ fontSize: 11, color: "#8e8e93" }}>{n.time}</div>
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35 }}>{n.text}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

/* ─── HELPERS ─── */

function sortedByPrice(product) {
  return { count: product.competitors.filter(c => c.currentPrice < product.yourPrice).length };
}

function MiniChart({ data, positive }) {
  if (!data || data.length < 2) return null;
  const W = 360, H = 50;
  const prices = data.map(d => d.price);
  const mn = Math.min(...prices), mx = Math.max(...prices), rng = mx - mn || 1;
  const pts = prices.map((p, i) => `${(i / (prices.length - 1)) * W},${H - ((p - mn) / rng) * (H - 6) - 3}`).join(" ");
  const color = positive ? "#34d399" : "#ff453a";
  const gid = `g${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 50, display: "block" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${H} ${pts} ${W},${H}`} fill={`url(#${gid})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
