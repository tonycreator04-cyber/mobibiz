'use client';

import { useState } from 'react';
import Link from 'next/link';

const initialProducts = [
{ id: 1, name: 'Kenyan Coffee', category: 'Food & Drinks', price: 650, stock: 24 },
{ id: 2, name: 'Everyday Carry Bag', category: 'Fashion', price: 1200, stock: 12 },
{ id: 3, name: 'Daily Essentials', category: 'Home & Living', price: 450, stock: 4 },
];

const initialOrders = [
{ id: 'MB-1001', customer: 'Sample Customer A', item: 'Kenyan Coffee', amount: 1300, status: 'Pending' },
{ id: 'MB-1002', customer: 'Sample Customer B', item: 'Everyday Carry Bag', amount: 1200, status: 'Processing' },
{ id: 'MB-1003', customer: 'Sample Customer C', item: 'Daily Essentials', amount: 900, status: 'Completed' },
];

export default function DashboardPage() {
const [products, setProducts] = useState(initialProducts);
const [orders, setOrders] = useState(initialOrders);
const [showProductForm, setShowProductForm] = useState(false);
const [productName, setProductName] = useState('');
const [productPrice, setProductPrice] = useState('');
const [productStock, setProductStock] = useState('');
const [notice, setNotice] = useState('');

const formatMoney = (amount: number) =>
"KSh ${amount.toLocaleString('en-KE')}";

const completedTotal = orders
.filter((order) => order.status === 'Completed')
.reduce((total, order) => total + order.amount, 0);

const pendingOrders = orders.filter(
(order) => order.status === 'Pending' || order.status === 'Processing',
).length;

function addProduct(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault();

const price = Number(productPrice);
const stock = Number(productStock);

if (
  !productName.trim() ||
  !Number.isFinite(price) ||
  price <= 0 ||
  !Number.isInteger(stock) ||
  stock < 0
) {
  setNotice('Enter a product name, a positive price and a valid stock quantity.');
  return;
}

setProducts((current) => [
  ...current,
  {
    id: Date.now(),
    name: productName.trim(),
    category: 'General',
    price,
    stock,
  },
]);

setProductName('');
setProductPrice('');
setProductStock('');
setShowProductForm(false);
setNotice('Sample product added to this temporary dashboard.');

}

function updateOrderStatus(id: string) {
setOrders((current) =>
current.map((order) =>
order.id === id
? {
...order,
status:
order.status === 'Pending'
? 'Processing'
: order.status === 'Processing'
? 'Completed'
: 'Completed',
}
: order,
),
);
setNotice("Demo order ${id} updated locally.");
}

return (
<main>
<header className="container nav">
<Link className="logo" href="/">
MobiBiz<span style={{ color: 'var(--teal)' }}>.</span>
</Link>

    <nav
      aria-label="Main navigation"
      style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Link href="/demo-store">Storefront</Link>
      <Link href="/">Home</Link>
    </nav>
  </header>

  <section className="container section">
    <span className="pill">MERCHANT WORKSPACE PREVIEW</span>
    <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-1.5px' }}>
      Your business dashboard
    </h1>
    <p className="muted" style={{ lineHeight: 1.7, maxWidth: 650 }}>
      A preview of the tools MobiBiz is being built to provide for Kenyan
      small businesses.
    </p>

    <div
      className="card"
      style={{ background: '#fff8e8', borderColor: '#f0dfb7', marginTop: 20 }}
    >
      <strong>Demo mode — not connected to a real account</strong>
      <p style={{ lineHeight: 1.6, marginBottom: 0 }}>
        All products, orders and figures below are sample data. Changes
        remain in temporary page state and disappear when the page is
        refreshed. Authentication, tenant security and live payments are
        not enabled here.
      </p>
    </div>

    {notice && (
      <div className="card" role="status" style={{ marginTop: 18 }}>
        {notice}
        <button
          type="button"
          className="btn secondary"
          style={{ marginLeft: 12 }}
          onClick={() => setNotice('')}
        >
          Dismiss
        </button>
      </div>
    )}

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 14,
        marginTop: 28,
      }}
    >
      {[
        { label: 'Sample products', value: products.length.toString(), icon: '📦' },
        { label: 'Orders to review', value: pendingOrders.toString(), icon: '📋' },
        { label: 'Completed order value', value: formatMoney(completedTotal), icon: '💰' },
      ].map((stat) => (
        <article className="card" key={stat.label}>
          <span style={{ fontSize: 28 }} aria-hidden="true">{stat.icon}</span>
          <p className="muted" style={{ marginBottom: 8 }}>{stat.label}</p>
          <strong style={{ fontSize: 23, color: 'var(--green)' }}>
            {stat.value}
          </strong>
        </article>
      ))}
    </div>

    <section className="section">
      <div className="rowline" style={{ flexWrap: 'wrap' }}>
        <div>
          <h2>Products</h2>
          <p className="muted">Review your sample catalogue and stock.</p>
        </div>
        <button
          type="button"
          className="btn"
          onClick={() => setShowProductForm((visible) => !visible)}
          aria-expanded={showProductForm}
        >
          {showProductForm ? 'Cancel' : '+ Add product'}
        </button>
      </div>

      {showProductForm && (
        <form className="card stack" onSubmit={addProduct} style={{ marginTop: 18 }}>
          <h3>Add a sample product</h3>

          <label htmlFor="product-name">Product name</label>
          <input
            id="product-name"
            className="field"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="e.g. Handmade basket"
            required
            maxLength={100}
          />

          <label htmlFor="product-price">Price in KSh</label>
          <input
            id="product-price"
            className="field"
            type="number"
            min="0.01"
            step="0.01"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
            required
          />

          <label htmlFor="product-stock">Stock quantity</label>
          <input
            id="product-stock"
            className="field"
            type="number"
            min="0"
            step="1"
            value={productStock}
            onChange={(event) => setProductStock(event.target.value)}
            required
          />

          <button type="submit" className="btn">Save sample product</button>
        </form>
      )}

      <div className="card" style={{ marginTop: 18, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ padding: 12 }}>Product</th>
              <th style={{ padding: 12 }}>Price</th>
              <th style={{ padding: 12 }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderTop: '1px solid var(--line)' }}>
                <td style={{ padding: 12 }}>
                  <strong>{product.name}</strong>
                  <div className="muted" style={{ fontSize: 13 }}>{product.category}</div>
                </td>
                <td style={{ padding: 12 }}>{formatMoney(product.price)}</td>
                <td style={{ padding: 12 }}>
                  <span
                    className="pill"
                    style={
                      product.stock <= 5
                        ? { background: '#fff0d8', color: '#854d0e' }
                        : undefined
                    }
                  >
                    {product.stock} units
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="section">
      <h2>Recent orders</h2>
      <p className="muted">
        Try advancing a sample order through its demo status.
      </p>

      <div className="stack" style={{ marginTop: 18 }}>
        {orders.map((order) => (
          <article className="card" key={order.id}>
            <div className="rowline" style={{ flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div>
                <strong>{order.id}</strong>
                <p style={{ margin: '6px 0' }}>{order.item}</p>
                <p className="muted" style={{ margin: 0, fontSize: 13 }}>
                  {order.customer}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong>{formatMoney(order.amount)}</strong>
                <p>
                  <span className="pill">{order.status}</span>
                </p>
                {order.status !== 'Completed' && (
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => updateOrderStatus(order.id)}
                  >
                    {order.status === 'Pending' ? 'Start processing' : 'Mark completed'}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <div className="card">
      <h2>Next steps for MobiBiz</h2>
      <p className="muted" style={{ lineHeight: 1.7 }}>
        Before real merchants use this workspace, we must connect secure
        sign-in, enforce tenant-specific permissions, save data in
        Supabase, and test the complete workflow.
      </p>
      <Link className="btn secondary" href="/demo-store">
        Preview storefront →
      </Link>
    </div>
  </section>

  <footer className="container footer">
    MobiBiz · Dashboard prototype · Live payments disabled.
  </footer>
</main>

);
}