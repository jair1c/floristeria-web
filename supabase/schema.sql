create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  image text not null,
  active boolean not null default true
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null,
  price numeric(10,2) not null,
  image text not null,
  category_slug text not null,
  category_name text not null,
  stock integer not null default 0,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.categories (id, name, slug, description, image, active)
values
  ('cat-ramos', 'Ramos', 'ramos', 'Ramos frescos y elegantes para sorprender.', 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80', true),
  ('cat-cumpleanos', 'Cumpleaños', 'cumpleanos', 'Detalles florales llenos de color para celebrar.', 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80', true),
  ('cat-aniversarios', 'Aniversarios', 'aniversarios', 'Diseños románticos para momentos especiales.', 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80', true),
  ('cat-condolencias', 'Condolencias', 'condolencias', 'Arreglos sobrios y elegantes para acompañar.', 'https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&w=1200&q=80', true),
  ('cat-regalos', 'Regalos', 'regalos', 'Complementos y detalles para hacer más especial tu obsequio.', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80', true)
on conflict (id) do nothing;

insert into public.products (id, slug, name, description, price, image, category_slug, category_name, stock, featured, active, created_at)
values
  ('prod-1', 'ramo-rosas-deluxe', 'Ramo Rosas Deluxe', '24 rosas premium con envoltura elegante y tarjeta dedicatoria.', 149.90, 'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80', 'ramos', 'Ramos', 8, true, true, now()),
  ('prod-2', 'box-cumpleanos-pastel', 'Box Cumpleaños Pastel', 'Caja floral en tonos suaves ideal para cumpleaños y celebraciones.', 129.90, 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80', 'cumpleanos', 'Cumpleaños', 5, true, true, now()),
  ('prod-3', 'bouquet-aniversario-premium', 'Bouquet Aniversario Premium', 'Combinación de rosas, follaje y presentación elegante para aniversario.', 179.90, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80', 'aniversarios', 'Aniversarios', 3, true, true, now())
on conflict (id) do nothing;
