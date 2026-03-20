import { createProductAction } from '@/app/admin/actions';
import { ProductForm } from '@/components/admin/product-form';
import { getAllCategories } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function NuevoProductoPage() {
  const categories = await getAllCategories();
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Nuevo producto</p>
        <h2 className="mt-2 text-4xl font-bold text-ink">Agregar producto</h2>
        <p className="mt-3 max-w-2xl text-neutral-600">Crea un nuevo producto para tu floristería. Apenas lo guardes aparecerá en el panel y, si está activo, también en la web pública.</p>
      </div>
      <ProductForm categories={categories} action={createProductAction} submitLabel="Guardar producto" />
    </div>
  );
}