import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { BuyButton } from '@/components/buy-button';
import { getActiveProducts, getProductBySlug, getProductsByCategorySlug } from '@/lib/store';
import { getProductUrl, getWhatsAppLink } from '@/lib/whatsapp';

// Renderizado dinámico — evita timeout de Supabase durante el build
export const dynamic = 'force-dynamic';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const products = await getActiveProducts();
    return products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Producto no encontrado | Florería Aura' };
  }

  const title = `${product.name} | Florería Aura`;
  const description = product.description;
  const url = getProductUrl(product.slug);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: product.image, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.active) notFound();

  const relatedProducts = (await getProductsByCategorySlug(product.categorySlug))
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="section-container py-14">
        <Link
          href="/productos"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-roseBrand"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div className="card overflow-hidden p-3">
            <div className="relative h-[520px] overflow-hidden rounded-[1rem]">
              <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            </div>
          </div>

          <div className="card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">
              {product.categoryName}
            </p>
            <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>
            <p className="mt-4 text-lg text-neutral-600">{product.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold">S/ {product.price.toFixed(2)}</span>
              <span className="rounded-full bg-blush px-4 py-2 text-sm font-semibold text-roseBrand">
                Stock disponible: {product.stock}
              </span>
            </div>

            <div className="mt-8 grid gap-4">
              <BuyButton product={product} />

              <a
                href={getWhatsAppLink(product)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-base font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
                Consultar por WhatsApp
              </a>

              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-2xl border border-rose-200 px-5 py-4 text-base font-semibold text-ink transition hover:border-roseBrand hover:text-roseBrand"
              >
                Consultar detalles
              </Link>
            </div>

            <div className="mt-8 rounded-[1rem] border border-rose-100 bg-blush p-5">
              <h2 className="font-semibold">🔒 Pago seguro</h2>
              <p className="mt-2 text-sm text-neutral-700">
                Aceptamos Yape, Plin y tarjeta de crédito/débito. Tu información está protegida.
              </p>
            </div>
          </div>
        </section>

        {relatedProducts.length ? (
          <section className="mt-16">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">
                También te puede interesar
              </p>
              <h2 className="mt-2 text-3xl font-bold">Productos relacionados</h2>
            </div>
            <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}