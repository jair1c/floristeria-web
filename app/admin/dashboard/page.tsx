import Link from 'next/link';
import { Boxes, Database, Eye, ShoppingBag, Star } from 'lucide-react';
import { getActiveProducts, getAllProducts, getFeaturedProducts } from '@/lib/store';
import { isSupabaseEnabled } from '@/lib/supabase';

function StatCard({ title, value, icon: Icon }: { title: string; value: string | number; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush text-roseBrand">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const allProducts = await getAllProducts();
  const activeProducts = await getActiveProducts();
  const featuredProducts = await getFeaturedProducts();
  const outOfStock = allProducts.filter((product) => product.stock === 0);
  const supabaseEnabled = isSupabaseEnabled();

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Resumen</p>
        <h2 className="mt-2 text-4xl font-bold text-ink">Dashboard</h2>
        <p className="mt-3 max-w-2xl text-neutral-600">Aquí tienes un resumen rápido del catálogo. Cada cambio que hagas en productos se reflejará en la tienda pública.</p>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Productos totales" value={allProducts.length} icon={Boxes} />
        <StatCard title="Productos activos" value={activeProducts.length} icon={Eye} />
        <StatCard title="Destacados en inicio" value={featuredProducts.length} icon={Star} />
        <StatCard title="Sin stock" value={outOfStock.length} icon={ShoppingBag} />
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="card overflow-hidden">
          <div className="border-b border-rose-100 px-6 py-4"><h3 className="text-xl font-semibold text-ink">Últimos productos</h3></div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-blush text-neutral-700"><tr><th className="px-6 py-4">Producto</th><th className="px-6 py-4">Categoría</th><th className="px-6 py-4">Precio</th><th className="px-6 py-4">Estado</th></tr></thead>
              <tbody>
                {allProducts.slice(0, 6).map((product) => (
                  <tr key={product.id} className="border-t border-rose-100"><td className="px-6 py-4 font-medium text-ink">{product.name}</td><td className="px-6 py-4">{product.categoryName}</td><td className="px-6 py-4">S/ {product.price.toFixed(2)}</td><td className="px-6 py-4">{product.active ? 'Activo' : 'Oculto'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-ink">Accesos rápidos</h3>
            <div className="mt-5 space-y-3"><Link href="/admin/productos/nuevo" className="btn-primary w-full">Crear nuevo producto</Link><Link href="/admin/productos" className="btn-secondary w-full">Administrar catálogo</Link><Link href="/productos" className="btn-secondary w-full">Ver tienda pública</Link></div>
          </div>
          <div className="rounded-[1.25rem] border border-rose-100 bg-blush p-5 text-sm text-neutral-700">
            <div className="flex items-center gap-2 font-semibold text-ink"><Database className="h-4 w-4 text-roseBrand" />Modo de datos actual</div>
            <p className="mt-2">{supabaseEnabled ? 'Supabase está activo. Los productos y las imágenes se guardarán fuera de tu PC.' : 'Modo local activo. Los productos todavía se guardan en data/products.json hasta que configures Supabase.'}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
