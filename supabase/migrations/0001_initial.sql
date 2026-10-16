-- Initial MobiBiz schema proposal. Review and test in a disposable project before applying.
create extension if not exists pgcrypto;
create type public.member_role as enum ('owner','manager','staff');
create type public.order_status as enum ('pending','confirmed','processing','ready','completed','cancelled');
create table public.tenants (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, phone text, created_at timestamptz not null default now());
create table public.memberships (tenant_id uuid not null references public.tenants(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade, role public.member_role not null default 'staff', created_at timestamptz not null default now(), primary key(tenant_id,user_id));
create table public.products (id uuid primary key default gen_random_uuid(), tenant_id uuid not null references public.tenants(id) on delete cascade, name text not null, description text not null default '', price_kes integer not null check(price_kes>=0), stock integer not null default 0 check(stock>=0), category text not null default 'General', active boolean not null default true, created_at timestamptz not null default now());
create table public.orders (id uuid primary key default gen_random_uuid(), tenant_id uuid not null references public.tenants(id) on delete restrict, order_number bigint generated always as identity, customer_name text not null, customer_phone text not null, status public.order_status not null default 'pending', total_kes integer not null check(total_kes>=0), created_at timestamptz not null default now(), unique(tenant_id,order_number));
create table public.order_items (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade, product_id uuid references public.products(id) on delete set null, product_name text not null, unit_price_kes integer not null check(unit_price_kes>=0), quantity integer not null check(quantity>0));
create table public.payment_transactions (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete restrict, provider text not null default 'mpesa', status text not null default 'pending', amount_kes integer not null check(amount_kes>=0), provider_reference text, created_at timestamptz not null default now());
create table public.audit_events (id uuid primary key default gen_random_uuid(), tenant_id uuid references public.tenants(id) on delete set null, actor_id uuid references auth.users(id) on delete set null, action text not null, details jsonb not null default '{}', created_at timestamptz not null default now());
create index products_tenant_active_idx on public.products(tenant_id,active);
create index orders_tenant_created_idx on public.orders(tenant_id,created_at desc);
alter table public.tenants enable row level security;
alter table public.memberships enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.audit_events enable row level security;
-- Safe baseline: deny direct access by default. Add reviewed, tenant-scoped policies and RPCs before app integration.
