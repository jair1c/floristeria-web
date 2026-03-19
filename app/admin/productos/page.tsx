import Link from 'next/link';
import { Pencil, Plus, Star, Trash2 } from 'lucide-react';
import { deleteProductAction, toggleProductActiveAction, toggleProductFeaturedAction } from '@/app/admin/actions';
import { getAllProducts } from '@/lib/store';

export default async function AdminProductosPage({
  searchParams
}: {
  searchParams?: Promise<{ created?: string; updated?: string; deleted?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Gestión</p>
          <h2 className="mt-2 text-4xl font-bold text-ink">Productos</h2>
          <p className="mt-3 text-neutral-600">Edita tu catálogo y controla qué productos se muestran en la web.</p>
        </div>
        <Link href="/admin/productos/nuevo" className="btn-primary inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> Nuevo producto
        </Link>
      </div>

      {params.created ? <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">Producto creado correctamente.</div> : null}
      {params.updated ? <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">Producto actualizado correctamente.</div> : null}
      {params.deleted ? <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">Producto eliminado correctamente.</div> : null}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-blush text-neutral-700">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Activo</th>
                <th className="px-6 py-4">Destacado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-rose-100 align-top">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-ink">{product.name}</p>
                    <p className="mt-1 text-xs text-neutral-500">{product.slug}</p>
                  </td>
                  <td className="px-6 py-4">{product.categoryName}</td>
                  <td className="px-6 py-4">S/ {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <form action={toggleProductActiveAction}>
                      <input type="hidden" name="id" value={product.id} />
                      <button className={`rounded-full px-3 py-1 text-xs font-semibold ${product.active ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-700'}`}>
                        {product.active ? 'Activo' : 'Oculto'}
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4">
                    <form action={toggleProductFeaturedAction}>
                      <input type="hidden" name="id" value={product.id} />
                      <button className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${product.featured ? 'bg-amber-100 text-amber-700' : 'bg-neutral-200 text-neutral-700'}`}>
                        <Star className="h-3.5 w-3.5" /> {product.featured ? 'Sí' : 'No'}
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/productos/${product.id}/editar`} className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-ink hover:border-roseBrand hover:text-roseBrand">
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={product.id} />
                        <button className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">
                          <Trash2 className="h-3.5 w-3.5" /> Eliminar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
