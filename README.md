# MobiBiz — Next.js starter

Mobile-first PWA-style prototype for Kenyan SMEs. Stack: Next.js App Router, TypeScript, Tailwind CSS v4, Supabase SSR client scaffolding, and Vitest.

## Current scope
- Landing page and sample public storefront (`/demo-store`) with search, category filters, in-memory cart and WhatsApp message handoff.
- Sample merchant dashboard (`/dashboard`), in-memory product management (`/dashboard/products`) and sample orders (`/dashboard/orders`).
- Domain helpers and unit tests for Kenyan phone normalization, slug normalization, cart totals and order transitions.
- Initial SQL schema proposal with RLS enabled and deliberately no broad data policies.
- Sign-in and sign-up remain disabled until secure Supabase Auth and tenant authorization are completed.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run typecheck
npm run lint
npm test
npm run build
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` only when integrating the intended Supabase project. Never use a service-role/secret key in browser code or a `NEXT_PUBLIC_` variable.

## Security and release gates
- Do not apply the SQL migration to production without review and testing in a disposable Supabase project.
- Add tenant-scoped RLS policies and integration tests with at least two tenants before connecting real data.
- Implement secure auth cookie refresh in the Next.js proxy/middleware flow and use verified server-side identity/claims for authorization.
- Public catalog access should use a reviewed tenant-scoped query/RPC; do not enable broad public reads of tenant tables.
- Do not allow client-side direct payment state updates. M-Pesa Daraja is not integrated; keep live payments disabled until server-side STK Push, signed/verified callback handling, idempotency, reconciliation and secret management are reviewed.
- This prototype does not persist demo cart, products or orders and is not ready for production or deployment.

## QA checkpoint
No build, lint, typecheck, test suite or Supabase integration tests are claimed to have passed in the generation environment. Generate and commit a lockfile, install dependencies, and run all checks before deployment.
