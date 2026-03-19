import { Category, Product } from '@/lib/types';
import { isSupabaseEnabled } from '@/lib/supabase';

type ProductFormProps = {
  categories: Category[];
  product?: Product | null;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

export function ProductForm({ categories, product, action, submitLabel }: ProductFormProps) {
  const canUploadFile = isSupabaseEnabled();

  return (
    <form action={action} className="card p-6 md:p-8">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Nombre del producto</label>
          <input name="name" required defaultValue={product?.name ?? ''} className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none transition focus:border-roseBrand" placeholder="Ej. Ramo Rosas Deluxe" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Descripción</label>
          <textarea name="description" required rows={5} defaultValue={product?.description ?? ''} className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none transition focus:border-roseBrand" placeholder="Describe el producto, materiales, cantidad de flores, presentación, etc." />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Precio (S/)</label>
          <input type="number" step="0.01" min="0" name="price" required defaultValue={product?.price ?? ''} className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none transition focus:border-roseBrand" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Stock</label>
          <input type="number" min="0" name="stock" required defaultValue={product?.stock ?? 0} className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none transition focus:border-roseBrand" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Categoría</label>
          <select name="categorySlug" required defaultValue={product?.categorySlug ?? categories[0]?.slug ?? ''} className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none transition focus:border-roseBrand">
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">URL de la imagen</label>
          <input type="url" name="image" defaultValue={product?.image ?? ''} className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none transition focus:border-roseBrand" placeholder="https://..." />
          <p className="mt-2 text-xs text-neutral-500">Puedes pegar una URL. {canUploadFile ? 'También puedes subir una imagen desde tu PC.' : 'Si luego configuras Supabase, podrás subir archivos directamente desde el panel.'}</p>
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Subir imagen desde tu PC</label>
          <input type="file" name="imageFile" accept="image/png,image/jpeg,image/webp,image/jpg" className="w-full rounded-2xl border border-dashed border-rose-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-roseBrand" />
          <p className="mt-2 text-xs text-neutral-500">{canUploadFile ? 'Si eliges un archivo, se subirá a Supabase Storage y esa imagen será la que se guarde en el producto.' : 'Esta opción se activará cuando completes la configuración de Supabase en la fase 3.'}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-blush px-4 py-4">
          <input type="checkbox" name="active" defaultChecked={product?.active ?? true} className="h-4 w-4 accent-[#d2527f]" />
          <span><span className="block font-semibold">Producto activo</span><span className="text-sm text-neutral-600">Se mostrará en la web pública.</span></span>
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-blush px-4 py-4">
          <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="h-4 w-4 accent-[#d2527f]" />
          <span><span className="block font-semibold">Destacado en inicio</span><span className="text-sm text-neutral-600">Aparecerá en la sección principal.</span></span>
        </label>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">{submitLabel}</button>
        <a href="/admin/productos" className="btn-secondary">Cancelar</a>
      </div>
    </form>
  );
}
