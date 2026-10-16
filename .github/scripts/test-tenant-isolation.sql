-- MobiBiz tenant-isolation tests.
-- Run only in the temporary GitHub Actions test database.

-- Create two independent test businesses and users.
INSERT INTO auth.users (id) VALUES
  ('11111111-1111-4111-8111-111111111111'),
  ('22222222-2222-4222-8222-222222222222');

INSERT INTO public.tenants (id, name, slug)
VALUES
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
   'Test Business A', 'test-business-a'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
   'Test Business B', 'test-business-b');

INSERT INTO public.memberships (tenant_id, user_id, role)
VALUES
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
   '11111111-1111-4111-8111-111111111111', 'owner'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
   '22222222-2222-4222-8222-222222222222', 'owner');


INSERT INTO public.products
  (id, tenant_id, name, price_kes, stock)
VALUES
  (
    'aaaaaaaa-0001-4000-8000-000000000001',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'Private Product A',
    100,
    5
  ),
  (
    'bbbbbbbb-0001-4000-8000-000000000001',
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'Private Product B',
    200,
    5
  );


-- Simulate an authenticated session for Business A.
SET ROLE authenticated;
SET request.jwt.claim.sub = '11111111-1111-4111-8111-111111111111';

DO $$
DECLARE
  visible_products integer;
  visible_tenants integer;
BEGIN
  SELECT count(*) INTO visible_products
  FROM public.products;

  SELECT count(*) INTO visible_tenants
  FROM public.tenants;

  IF visible_products <> 1 THEN
    RAISE EXCEPTION
      'Tenant isolation failed: Business A sees % products',
      visible_products;
  END IF;

  IF visible_tenants <> 1 THEN
    RAISE EXCEPTION
      'Tenant isolation failed: Business A sees % tenants',
      visible_tenants;
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.products
    WHERE name = 'Private Product B'
  ) THEN
    RAISE EXCEPTION
      'Security failure: Business A can see Business B product';
  END IF;
END
$$;

RESET ROLE;
RESET request.jwt.claim.sub;

-- Simulate an authenticated session for Business B.
SET ROLE authenticated;
SET request.jwt.claim.sub = '22222222-2222-4222-8222-222222222222';

DO $$
DECLARE
  visible_products integer;
  visible_tenants integer;
BEGIN
  SELECT count(*) INTO visible_products
  FROM public.products;

  SELECT count(*) INTO visible_tenants
  FROM public.tenants;

  IF visible_products <> 1 THEN
    RAISE EXCEPTION
      'Tenant isolation failed: Business B sees % products',
      visible_products;
  END IF;

  IF visible_tenants <> 1 THEN
    RAISE EXCEPTION
      'Tenant isolation failed: Business B sees % tenants',
      visible_tenants;
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.products
    WHERE name = 'Private Product A'
  ) THEN
    RAISE EXCEPTION
      'Security failure: Business B can see Business A product';
  END IF;
END
$$;

RESET ROLE;
RESET request.jwt.claim.sub;

-- Success is reported only if both tenant checks pass.
SELECT 'Tenant isolation checks passed' AS result;
