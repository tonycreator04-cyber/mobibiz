
import Link from "next/link";

const features = [
  {
    icon: "🛍️",
    title: "Your online shop",
    description:
      "Showcase your products in a clean storefront customers can browse from their phones.",
  },
  {
    icon: "📦",
    title: "Orders and inventory",
    description:
      "Keep track of products, stock levels and incoming customer orders in one workspace.",
  },
  {
    icon: "📊",
    title: "Business overview",
    description:
      "See sample sales figures, order activity and business essentials at a glance.",
  },
];

const products = [
  {
    emoji: "☕",
    name: "Kenyan Coffee",
    category: "Food & drink",
    price: "KSh 850",
  },
  {
    emoji: "👜",
    name: "Everyday Tote",
    category: "Accessories",
    price: "KSh 1,200",
  },
  {
    emoji: "🌿",
    name: "Fresh Botanicals",
    category: "Home & living",
    price: "KSh 650",
  },
];

export default function Home() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <header className="container">
        <nav className="nav">
          <Link href="/" className="logo">
            MobiBiz<span style={{ color: "var(--teal)" }}>.</span>
          </Link>

          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/demo-store" style={{ fontWeight: 600 }}>
              Storefront
            </Link>
            <Link href="/dashboard" style={{ fontWeight: 600 }}>
              Dashboard
            </Link>
            <Link className="btn" href="/demo-store">
              Explore demo shop ↗
            </Link>
          </div>
        </nav>
      </header>

      <section className="container hero">
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: 42,
            alignItems: "center",
          }}
        >
          <div>
            <span className="pill">MADE FOR EVERYDAY BUSINESS</span>

            <h1>
              Your business.
              <br />
              Your space to{" "}
              <span style={{ color: "var(--teal)" }}>grow.</span>
            </h1>

            <p>
              A simpler home for your products, orders and customers.
              MobiBiz helps you bring your business online with a storefront
              and a workspace designed for small businesses.
            </p>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 26,
              }}
            >
              <Link className="btn" href="/demo-store">
                Explore the storefront →
              </Link>
              <Link className="btn secondary" href="/dashboard">
                View dashboard
              </Link>
            </div>

            <p style={{ fontSize: 13, marginTop: 18 }}>
              Built for mobile. Designed for growing businesses.
            </p>
          </div>

          <div
            className="card"
            style={{
              padding: 22,
              background: "var(--green)",
              color: "#fffdf8",
              borderRadius: 26,
            }}
          >
            <div className="rowline">
              <div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>
                  YOUR BUSINESS WORKSPACE
                </div>
                <h2 style={{ fontSize: 25, margin: "8px 0" }}>
                  A clearer day starts here.
                </h2>
              </div>
              <span style={{ fontSize: 34 }}>✳</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 12,
                marginTop: 22,
              }}
            >
              <div
                style={{
                  padding: 16,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.10)",
                }}
              >
                <div style={{ fontSize: 13, opacity: 0.8 }}>
                  Sample orders
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>
                  24
                </div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  Illustrative data
                </div>
              </div>

              <div
                style={{
                  padding: 16,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.10)",
                }}
              >
                <div style={{ fontSize: 13, opacity: 0.8 }}>
                  Sample products
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>
                  12
                </div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  Illustrative data
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 14,
                padding: 16,
                borderRadius: 16,
                background: "#fffdf8",
                color: "var(--ink)",
              }}
            >
              <div className="rowline">
                <strong>Today&apos;s priorities</strong>
                <span style={{ color: "var(--teal)" }}>✦</span>
              </div>

              {[
                "Review incoming orders",
                "Check your stock",
                "Share your storefront",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    paddingTop: 13,
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "var(--teal)" }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div style={{ maxWidth: 650, marginBottom: 26 }}>
          <span className="pill">ONE CONNECTED WORKSPACE</span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-1.3px",
              marginBottom: 10,
            }}
          >
            The essentials, all in one place.
          </h2>
          <p className="muted" style={{ lineHeight: 1.7 }}>
            Spend less time juggling tools and more time looking after your
            customers.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            gap: 16,
          }}
        >
          {features.map((feature) => (
            <article className="card" key={feature.title}>
              <div style={{ fontSize: 30, marginBottom: 16 }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 8 }}>
                {feature.title}
              </h3>
              <p
                className="muted"
                style={{ lineHeight: 1.7, margin: 0 }}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div
          className="rowline"
          style={{ flexWrap: "wrap", marginBottom: 22 }}
        >
          <div>
            <span className="pill">STOREFRONT PREVIEW</span>
            <h2
              style={{
                fontSize: 30,
                letterSpacing: "-1px",
                marginBottom: 0,
              }}
            >
              A shop that feels like yours.
            </h2>
          </div>
          <Link className="btn secondary" href="/demo-store">
            Visit demo shop →
          </Link>
        </div>

        <div className="grid-products">
          {products.map((product) => (
            <article className="card" key={product.name}>
              <div className="product-art" aria-hidden="true">
                {product.emoji}
              </div>
              <p
                className="muted"
                style={{ fontSize: 12, marginBottom: 6 }}
              >
                {product.category}
              </p>
              <h3 style={{ margin: "0 0 10px" }}>{product.name}</h3>
              <strong style={{ color: "var(--green)" }}>
                {product.price}
              </strong>
            </article>
          ))}
        </div>

        <p className="muted" style={{ fontSize: 12, marginTop: 14 }}>
          Preview products and prices are illustrative examples, not live
          inventory.
        </p>
      </section>

      <section className="container section">
        <div
          className="card"
          style={{
            padding: "clamp(24px, 5vw, 48px)",
            background: "var(--cream)",
            border: "none",
          }}
        >
          <span className="pill">YOUR NEXT CHAPTER</span>
          <h2
            style={{
              maxWidth: 650,
              fontSize: "clamp(30px, 5vw, 46px)",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            Bring your business into one simple space.
          </h2>
          <p
            className="muted"
            style={{ maxWidth: 600, lineHeight: 1.7 }}
          >
            Explore the sample shop or open the merchant dashboard to see the
            MobiBiz prototype in action.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 22,
            }}
          >
            <Link className="btn" href="/demo-store">
              Explore storefront
            </Link>
            <Link className="btn secondary" href="/dashboard">
              Open dashboard
            </Link>
          </div>
        </div>
      </section>

      <footer className="container footer">
        <div className="rowline" style={{ flexWrap: "wrap" }}>
          <Link href="/" className="logo">
            MobiBiz.
          </Link>
          <span style={{ fontSize: 13 }}>
            Prototype · Sample data · Live payments disabled
          </span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.7 }}>
          MobiBiz is a work in progress. Demo orders and dashboard actions are
          not persisted to a live business database.
        </p>
      </footer>
    </main>
  );
}
