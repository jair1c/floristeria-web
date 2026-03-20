import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { getActiveProducts } from '@/lib/store';

export const revalidate = 300;

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
        <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}