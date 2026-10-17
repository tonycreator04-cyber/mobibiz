
"use client";

import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "Kenyan Coffee", category: "Food & drink", price: 850, emoji: "☕", description: "Rich, locally inspired coffee." },
  { id: 2, name: "Everyday Tote", category: "Accessories", price: 1200, emoji: "👜", description: "A practical everyday companion." },
  { id: 3, name: "Fresh Botanicals", category: "Home & living", price: 650, emoji: "🌿", description: "A little nature for your space." },
  { id: 4, name: "Bloom Gift Box", category: "Gifts", price: 1500, emoji: "💐", description: "A thoughtful gift for someone special." },
  { id: 5, name: "Beaded Bracelet", category: "Accessories", price: 500, emoji: "📿", description: "A colourful finishing touch." },
  { id: 6, name: "Daily Tea Blend", category: "Food & drink", price: 400, emoji: "🍵", description: "A comforting cup for your day." },
];

const categories = ["All", "Food & drink", "Accessories", "Home & living", "Gifts"];

export default function DemoStorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({});

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const quantity = Object.values(cart).reduce(
    (total, count) => total + count,
    0
  );

  const total = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] || 0),
    0
  );

  function changeQuantity(id: number, change: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + change);
      const updated = { ...current };

      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }

      return updated;
    });
  }

  function checkoutWhatsApp() {
    const lines = products
      .filter((product) => (cart[product.id] || 0) > 0)
      .map(
        (product) =>
          `${product.name} x ${cart[product.id]} — KSh ${(
            product.price * cart[product.id]
          ).toLocaleString("en-KE")}`
      );

    if (lines.length === 0) return;

    const message = [
      "Hello! I would like to enquire about these items:",
      "",
      ...lines,
      "",
      `Illustrative total: KSh ${total.toLocaleString("en-KE")}`,
      "",
      "Please confirm availability and delivery details.",
    ].join("\n");

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <header className="container">
        <nav className="nav">
          <a className="logo" href="/">MobiBiz.</a>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="/" style={{ fontWeight: 600 }}>Home</a>
            <a href="/dashboard" style={{ fontWeight: 600 }}>Merchant dashboard</a>
            <span className="pill">DEMO SHOP</span>
          </div>
        </nav>
      </header>

      <section className="container" style={{ paddingTop: 26 }}>
        <div
          style={{
            padding: "clamp(26px, 6vw, 56px)",
            borderRadius: 26,
            background: "var(--green)",
            color: "var(--surface)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div>
            <span
              className="pill"
              style={{ background: "rgba(255,255,255,0.13)", color: "white" }}
            >
              THOUGHTFULLY SELECTED
            </span>
            <h1 style={{ fontSize: "clamp(34px, 6vw, 54px)", lineHeight: 1.08, letterSpacing: "-2px", margin: "20px 0 14px" }}>
              Good things for everyday living.
            </h1>
            <p style={{ color: "#e0e9df", lineHeight: 1.8, maxWidth: 480 }}>
              Discover useful finds, local favourites and thoughtful gifts.
              Browse the collection and build your sample order.
            </p>
          </div>
          <div
            aria-hidden="true"
            style={{
              minHeight: 180,
              display: "grid",
              placeItems: "center",
              borderRadius: 22,
              background: "rgba(255,255,255,0.08)",
              fontSize: "clamp(65px, 12vw, 100px)",
            }}
          >
            🛍️
          </div>
        </div>
      </section>

      <section className="container section">
        <div style={{ marginBottom: 24 }}>
          <span className="pill">THE COLLECTION</span>
          <div className="rowline" style={{ flexWrap: "wrap", marginTop: 10 }}>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", margin: 0, letterSpacing: "-1px" }}>
              Find your next favourite.
            </h2>
            <span className="muted" style={{ fontSize: 14 }}>
              {quantity} {quantity === 1 ? "item" : "items"} in your sample basket
            </span>
          </div>
        </div>

        <label style={{ display: "block", marginBottom: 18 }}>
          <span style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>
            Search products
          </span>
          <input
            className="field"
            type="search"
            placeholder="Try coffee, gifts or accessories..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              style={{
                minHeight: 40,
                padding: "9px 14px",
                borderRadius: 999,
                border: "1px solid var(--line)",
                background: category === item ? "var(--green)" : "var(--surface)",
                color: category === item ? "white" : "var(--ink)",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid-products">
          {visibleProducts.map((product) => (
            <article className="card" key={product.id}>
              <div className="product-art" aria-hidden="true">
                {product.emoji}
              </div>
              <p className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                {product.category}
              </p>
              <h3 style={{ margin: "0 0 8px", fontSize: 19 }}>{product.name}</h3>
              <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, minHeight: 42 }}>
                {product.description}
              </p>
              <div className="rowline" style={{ marginTop: 12, flexWrap: "wrap" }}>
                <strong style={{ color: "var(--green)", fontSize: 17 }}>
                  KSh {product.price.toLocaleString("en-KE")}
                </strong>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    type="button"
                    aria-label={`Remove one ${product.name}`}
                    onClick={() => changeQuantity(product.id, -1)}
                    disabled={!cart[product.id]}
                    style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--line)", background: "var(--surface)", cursor: "pointer" }}
                  >
                    −
                  </button>
                  <span style={{ minWidth: 14, textAlign: "center" }}>
                    {cart[product.id] || 0}
                  </span>
                  <button
                    type="button"
                    aria-label={`Add one ${product.name}`}
                    onClick={() => changeQuantity(product.id, 1)}
                    style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--green)", background: "var(--green)", color: "white", cursor: "pointer" }}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visibleProducts.length === 0 && (
          <div className="card" style={{ textAlign: "center", marginTop: 18 }}>
            <p>No products match that search.</p>
            <button
              className="btn secondary"
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="container" style={{ paddingBottom: 50 }}>
        <div
          className="card"
          style={{
            background: "var(--cream)",
            padding: "clamp(20px, 4vw, 32px)",
          }}
        >
          <div className="rowline" style={{ flexWrap: "wrap" }}>
            <div>
              <span className="pill">YOUR SAMPLE BASKET</span>
              <h2 style={{ margin: "12px 0 6px", fontSize: 25 }}>Ready to enquire?</h2>
              <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                Review your items and prepare a message for WhatsApp.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="muted" style={{ fontSize: 13 }}>Illustrative total</div>
              <strong style={{ display: "block", fontSize: 27, color: "var(--green)", marginTop: 5 }}>
                KSh {total.toLocaleString("en-KE")}
              </strong>
            </div>
          </div>

          <button
            className="btn"
            type="button"
            onClick={checkoutWhatsApp}
            disabled={quantity === 0}
            style={{ marginTop: 22, width: "100%", opacity: quantity === 0 ? 0.55 : 1 }}
          >
            Prepare WhatsApp enquiry ↗
          </button>

          <p className="muted" style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 0 }}>
            Demonstration only. This prepares a message; it does not submit an order,
            charge a customer or process an M-Pesa payment.
          </p>
        </div>
      </section>

      <footer className="container footer">
        <div className="rowline" style={{ flexWrap: "wrap" }}>
          <a className="logo" href="/">MobiBiz.</a>
          <a href="/" style={{ fontWeight: 600 }}>Back to home ↑</a>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.7 }}>
          Demo storefront · Sample products and prices · Live payments disabled
        </p>
      </footer>
    </main>
  );
}
