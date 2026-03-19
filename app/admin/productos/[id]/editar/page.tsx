import { notFound } from 'next/navigation';
import { updateProductAction } from '@/app/admin/actions';
import { ProductForm } from '@/components/admin/product-form';
import { getAllCategories, getProductById } from '@/lib/store';

export default async function EditarProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getAllCategories(), getProductById(id)]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Editar producto</p>
        <h2 className="mt-2 text-4xl font-bold text-ink">{product.name}</h2>
        <p className="mt-3 max-w-2xl text-neutral-600">
          Modifica información, precio, categoría, imagen o visibilidad del producto.
        </p>
      </div>

      <ProductForm categories={categories} product={product} action={updateProductAction} submitLabel="Guardar cambios" />
    </div>
  );
}
