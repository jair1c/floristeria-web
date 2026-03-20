import { notFound } from 'next/navigation';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { getCategories, getCategoryBySlug, getProductsByCategorySlug } from '@/lib/store';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug)
  ]);

  if (!category || !category.active) notFound();

  return (
    <>
      <Header />
      <main className="section-container py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Categoría</p>
          <h1 className="mt-2 text-4xl font-bold">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-neutral-600">{category.description}</p>
        </div>

        {products.length ? (
          <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-rose-200 bg-white p-10 text-center text-neutral-600">
            Aún no hay productos activos en esta categoría.
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
