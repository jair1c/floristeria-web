import Image from 'next/image';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { getActiveProducts } from '@/lib/store';

export default async function ProductosPage() {
  const products = await getActiveProducts();

  return (
    <>
      <Header />
      <main className="section-container py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Catálogo</p>
          <h1 className="mt-2 text-4xl font-bold">Todos los productos</h1>
          <p className="mt-4 max-w-2xl text-neutral-600">
            Los productos que veas aquí se administran desde el panel privado. Solo se muestran los productos activos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="card overflow-hidden">
              <div className="relative h-72">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-roseBrand">{product.categoryName}</p>
                <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-xl font-bold">S/ {product.price.toFixed(2)}</p>
                  <span className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-roseBrand">Stock: {product.stock}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
