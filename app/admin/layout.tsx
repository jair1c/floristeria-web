import Link from 'next/link';
import { LayoutDashboard, PackagePlus, PackageSearch, ShoppingCart } from 'lucide-react';
import { LogoutButton } from '@/components/admin/logout-button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[1.5rem] border border-rose-100 bg-white p-5 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Panel administrador</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">Florería Aura</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/admin/dashboard" className="pill-link inline-flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <Link href="/admin/productos" className="pill-link inline-flex items-center gap-2">
              <PackageSearch className="h-4 w-4" /> Productos
            </Link>
            {/* ← NUEVO: enlace a Pedidos */}
            <Link href="/admin/pedidos" className="pill-link inline-flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Pedidos
            </Link>
            <Link href="/admin/productos/nuevo" className="btn-primary inline-flex items-center gap-2">
              <PackagePlus className="h-4 w-4" /> Nuevo producto
            </Link>
            <LogoutButton />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}