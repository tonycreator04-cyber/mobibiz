'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const products = [
{
id: 1,
name: 'Kenyan Coffee',
price: 650,
category: 'Food & Drinks',
icon: '☕',
description: 'A sample listing for locally sourced coffee.',
},
{
id: 2,
name: 'Everyday Carry Bag',
price: 1200,
category: 'Fashion',
icon: '👜',
description: 'A sample listing for an everyday carry bag.',
},
{
id: 3,
name: 'Daily Essentials',
price: 450,
category: 'Home & Living',
icon: '🧴',
description: 'A sample listing for everyday essentials.',
},
{
id: 4,
name: 'Fresh Flowers',
price: 800,
category: 'Home & Living',
icon: '💐',
description: 'A sample listing for a colourful flower bouquet.',
},
{
id: 5,
name: 'Handmade Beaded Bracelet',
price: 350,
category: 'Fashion',
icon: '📿',
description: 'A sample listing for handmade accessories.',
},
{
id: 6,
name: 'Tea Selection',
price: 500,
category: 'Food & Drinks',
icon: '🍵',
description: 'A sample listing for a tea selection.',
},
];

const categories = ['All', 'Food & Drinks', 'Fashion', 'Home & Living'];

export default function DemoStorePage() {
const [search, setSearch] = useState('');
const [category, setCategory] = useState('All');
const [cart, setCart] = useState<Record<number, number>>({});
const [showCart, setShowCart] = useState(false);

const filteredProducts = useMemo(() => {
return products.filter((product) => {
const matchesCategory =
category === 'All' || product.category === category;
const matchesSearch = product.name
.toLowerCase()
.includes(search.trim().toLowerCase());

  return matchesCategory && matchesSearch;
});

}, [search, category]);

const cartItems = products.filter((product) => (cart[product.id] ?? 0) > 0);

const itemCount = Object.values(cart).reduce(
(total, quantity) => total + quantity,
0,
);

const total = products.reduce(
(sum, product) => sum + product.price * (cart[product.id] ?? 0),
0,
);

function addToCart(id: number) {
setCart((current) => ({
...current,
[id]: (current[id] ?? 0) + 1,
}));
}

function changeQuantity(id: number, change: number) {
setCart((current) => {
const nextQuantity = (current[id] ?? 0) + change;
const next = { ...current };

  if (nextQuantity <= 0) {
    delete next[id];
  } else {
    next[id] = nextQuantity;
  }

  return next;
});

}

function prepareWhatsAppMessage() {
const lines = cartItems.map((product) => {
const quantity = cart[product.id] ?? 0;
return "${product.name} x ${quantity} — KSh ${(product.price * quantity).toLocaleString('en-KE')}";
});

const message = [
  'Hello! I am enquiring about these sample items from the MobiBiz demo store:',
  '',
  ...lines,
  '',
  `Illustrative total: KSh ${total.toLocaleString('en-KE')}`,
  '',
  'Please confirm actual availability and prices.',
].join('\n');

return `https://wa.me/?text=${encodeURIComponent(message)}`;

}

return (
<main>
<header className="container nav">
<Link className="logo" href="/">
MobiBiz<span style={{ color: 'var(--teal)' }}>.</span>
</Link>

    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Link href="/">Home</Link>
      <button
        className="btn"
        type="button"
        onClick={() => setShowCart(!showCart)}
        aria-expanded={showCart}
      >
        Cart ({itemCount})
      </button>
    </div>
  </header>

  <section className="container section">
    <span className="pill">DEMO STOREFRONT</span>
    <h1 style={{ fontSize: 'clamp(34px, 6vw, 52px)', letterSpacing: '-1.5px' }}>
      Discover something good.
    </h1>
    <p className="muted" style={{ maxWidth: 600, lineHeight: 1.7 }}>
      Explore this example of a small-business online shop. Search products,
      browse categories and try adding items to your cart.
    </p>

    <div
      className="card"
      style={{
        marginTop: 24,
        background: '#fff8e8',
        borderColor: '#f0dfb7',
      }}
    >
      <strong>Demo only</strong>
      <p style={{ marginBottom: 0, lineHeight: 1.6 }}>
        Product names, prices and availability are examples. This cart is
        temporary and is not connected to a merchant account, inventory,
        payment service or real orders.
      </p>
    </div>

    <label
      htmlFor="product-search"
      style={{ display: 'block', fontWeight: 700, marginTop: 28, marginBottom: 8 }}
    >
      Search products
    </label>
    <input
      id="product-search"
      className="field"
      type="search"
      placeholder="Try coffee, bag or flowers..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />

    <div
      aria-label="Product categories"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        margin: '18px 0 28px',
      }}
    >
      {categories.map((item) => (
        <button
          key={item}
          type="button"
          className={category === item ? 'btn' : 'btn secondary'}
          onClick={() => setCategory(item)}
          aria-pressed={category === item}
        >
          {item}
        </button>
      ))}
    </div>

    {showCart && (
      <section
        className="card stack"
        aria-label="Shopping cart"
        style={{ marginBottom: 28 }}
      >
        <div className="rowline">
          <h2 style={{ margin: 0 }}>Your cart</h2>
          <button
            className="btn secondary"
            type="button"
            onClick={() => setShowCart(false)}
          >
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="muted">Your cart is empty. Add a sample product to begin.</p>
        ) : (
          <>
            {cartItems.map((product) => (
              <div className="rowline" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p className="muted" style={{ margin: '4px 0' }}>
                    KSh {(product.price * (cart[product.id] ?? 0)).toLocaleString('en-KE')}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button
                    className="btn secondary"
                    type="button"
                    onClick={() => changeQuantity(product.id, -1)}
                    aria-label={`Remove one ${product.name}`}
                  >
                    −
                  </button>
                  <span>{cart[product.id]}</span>
                  <button
                    className="btn secondary"
                    type="button"
                    onClick={() => addToCart(product.id)}
                    aria-label={`Add one ${product.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="rowline">
              <strong>Illustrative total</strong>
              <strong>KSh {total.toLocaleString('en-KE')}</strong>
            </div>

            <a
              className="btn"
              href={prepareWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Prepare WhatsApp enquiry
            </a>
            <p className="muted" style={{ fontSize: 13 }}>
              This opens WhatsApp with a draft message. It does not place
              an order or take payment.
            </p>
          </>
        )}
      </section>
    )}

    <div className="grid-products">
      {filteredProducts.map((product) => (
        <article className="card" key={product.id}>
          <div className="product-art" aria-hidden="true">
            {product.icon}
          </div>
          <span className="pill" style={{ marginTop: 16 }}>
            {product.category}
          </span>
          <h2 style={{ fontSize: 20 }}>{product.name}</h2>
          <p className="muted" style={{ lineHeight: 1.6 }}>
            {product.description}
          </p>
          <div className="rowline" style={{ marginTop: 18 }}>
            <strong style={{ color: 'var(--green)' }}>
              KSh {product.price.toLocaleString('en-KE')}
            </strong>
            <button
              className="btn"
              type="button"
              onClick={() => addToCart(product.id)}
            >
              Add +
            </button>
          </div>
        </article>
      ))}
    </div>

    {filteredProducts.length === 0 && (
      <div className="card" style={{ marginTop: 20 }}>
        <h2>No matching products</h2>
        <p className="muted">
          Try a different search or select another category.
        </p>
        <button
          className="btn secondary"
          type="button"
          onClick={() => {
            setSearch('');
            setCategory('All');
          }}
        >
          Clear filters
        </button>
      </div>
    )}

    <p className="muted" style={{ marginTop: 32, fontSize: 13 }}>
      MobiBiz prototype · No live inventory · No payment processing.
    </p>
  </section>

  <footer className="container footer">
    <Link className="logo" href="/">
      MobiBiz<span style={{ color: 'var(--teal)' }}>.</span>
    </Link>
    <p>Helping Kenyan businesses build their online presence.</p>
  </footer>
</main>

);
}