import Link from 'next/link';

const features = [
{
number: '01',
title: 'Your online shop',
description:
'Show customers your products, prices and business details in one simple storefront.',
icon: '🛍️',
},
{
number: '02',
title: 'Products and stock',
description:
'Keep your product catalogue organised and make everyday stock management easier.',
icon: '📦',
},
{
number: '03',
title: 'Orders in one place',
description:
'Keep track of customer orders and prepare for smoother daily operations.',
icon: '📋',
},
];

const products = [
{
icon: '☕',
name: 'Kenyan Coffee',
description: 'Example product',
price: 'KSh 650',
},
{
icon: '👜',
name: 'Everyday Carry Bag',
description: 'Example product',
price: 'KSh 1,200',
},
{
icon: '🧴',
name: 'Daily Essentials',
description: 'Example product',
price: 'KSh 450',
},
];

export default function Home() {
return (
<main>
<header className="container nav">
<Link className="logo" href="/">
MobiBiz<span style={{ color: 'var(--teal)' }}>.</span>
</Link>

    <nav
      aria-label="Main navigation"
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Link href="/demo-store">Storefront</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link className="btn secondary" href="/sign-in">
        Sign in
      </Link>
    </nav>
  </header>

  <section className="container hero">
    <span className="pill">BUILT FOR KENYAN SMEs</span>

    <h1>
      Good business deserves a <span style={{ color: 'var(--teal)' }}>simpler way.</span>
    </h1>

    <p>
      Meet MobiBiz — your starting point for showcasing products,
      organising orders and growing your business, right from your phone.
    </p>

    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        marginTop: 26,
      }}
    >
      <Link className="btn" href="/demo-store">
        Explore demo store →
      </Link>
      <Link className="btn secondary" href="/dashboard">
        Preview dashboard
      </Link>
    </div>

    <div
      className="card"
      style={{
        marginTop: 44,
        padding: 24,
        background: 'linear-gradient(135deg, #e2f4e9, #f4fbf6)',
      }}
    >
      <div className="rowline">
        <div>
          <span className="pill">YOUR BUSINESS AT A GLANCE</span>
          <h2 style={{ marginBottom: 6 }}>A clearer way to work.</h2>
          <p className="muted" style={{ marginTop: 0 }}>
            A preview of your future business workspace.
          </p>
        </div>
        <span style={{ fontSize: 42 }} aria-hidden="true">
          📈
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 12,
          marginTop: 22,
        }}
      >
        {[
          ['Products', 'Your catalogue'],
          ['Orders', 'Your sales activity'],
          ['Storefront', 'Your online presence'],
        ].map(([title, description]) => (
          <div
            key={title}
            style={{
              background: 'white',
              padding: 16,
              borderRadius: 14,
              border: '1px solid var(--line)',
            }}
          >
            <strong style={{ display: 'block', marginBottom: 6 }}>
              {title}
            </strong>
            <span className="muted" style={{ fontSize: 13 }}>
              {description}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="container section">
    <span className="pill">MADE TO BE PRACTICAL</span>
    <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-1px' }}>
      The essentials for running your business.
    </h2>
    <p className="muted" style={{ maxWidth: 600, lineHeight: 1.7 }}>
      Start with the basics. MobiBiz is being built to help small
      businesses create an online presence without unnecessary complexity.
    </p>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        marginTop: 26,
      }}
    >
      {features.map((feature) => (
        <article className="card" key={feature.number}>
          <div style={{ fontSize: 32, marginBottom: 16 }} aria-hidden="true">
            {feature.icon}
          </div>
          <span className="pill">{feature.number}</span>
          <h3>{feature.title}</h3>
          <p className="muted" style={{ lineHeight: 1.7 }}>
            {feature.description}
          </p>
        </article>
      ))}
    </div>
  </section>

  <section className="container section">
    <div className="rowline" style={{ flexWrap: 'wrap' }}>
      <div>
        <span className="pill">STOREFRONT PREVIEW</span>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)' }}>
          A shop your customers can explore.
        </h2>
      </div>
      <Link className="btn secondary" href="/demo-store">
        Open demo store →
      </Link>
    </div>

    <p className="muted" style={{ lineHeight: 1.7 }}>
      These are illustrative examples, not live inventory or offers.
    </p>

    <div className="grid-products" style={{ marginTop: 22 }}>
      {products.map((product) => (
        <article className="card" key={product.name}>
          <div className="product-art" aria-hidden="true">
            {product.icon}
          </div>
          <p className="muted" style={{ fontSize: 13 }}>
            {product.description}
          </p>
          <h3>{product.name}</h3>
          <strong style={{ color: 'var(--green)' }}>{product.price}</strong>
        </article>
      ))}
    </div>
  </section>

  <section className="container section">
    <div
      className="card"
      style={{
        background: 'var(--green)',
        color: 'white',
        padding: 'clamp(24px, 5vw, 48px)',
      }}
    >
      <span
        className="pill"
        style={{ background: '#d7f4e3', color: 'var(--green)' }}
      >
        YOUR NEXT CHAPTER STARTS HERE
      </span>
      <h2 style={{ fontSize: 'clamp(30px, 5vw, 46px)', letterSpacing: '-1.5px' }}>
        Bring your business online with MobiBiz.
      </h2>
      <p style={{ lineHeight: 1.7, maxWidth: 580, color: '#e0eee5' }}>
        Explore the prototype today. Secure account access, live business
        data and payment processing will require further implementation
        and testing.
      </p>
      <Link
        className="btn"
        href="/demo-store"
        style={{ background: 'white', color: 'var(--green)' }}
      >
        Explore MobiBiz →
      </Link>
    </div>
  </section>

  <footer className="container footer">
    <div className="rowline" style={{ flexWrap: 'wrap' }}>
      <Link className="logo" href="/">
        MobiBiz<span style={{ color: 'var(--teal)' }}>.</span>
      </Link>
      <span>Built for small businesses in Kenya.</span>
    </div>
    <p style={{ fontSize: 13 }}>
      Prototype version · Demo content only · Live payments disabled.
    </p>
  </footer>
</main>

);
}