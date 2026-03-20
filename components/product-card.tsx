import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { getWhatsAppLink } from '@/lib/whatsapp';

type ProductCardProps = {
  product: Product;
  compactDescription?: boolean;
};

export function ProductCard({ product, compactDescription = true }: ProductCardProps) {
  const description = compactDescription
    ? `${product.description.slice(0, 88)}${product.description.length > 88 ? '…' : ''}`
    : product.description;

  const isNewProduct =
    Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 14;

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-rose-100 bg-white shadow-[0_18px_60px_-35px_rgba(210,82,127,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-35px_rgba(210,82,127,0.45)]">
      <div className="relative">
        <Link href={`/producto/${product.slug}`} className="block">
          <div className="relative h-56 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80" />
          </div>
        </Link>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.featured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-roseBrand shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Destacado
            </span>
          ) : null}

          {isNewProduct ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
              Nuevo
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-roseBrand">
          {product.categoryName}
        </p>

        <Link href={`/producto/${product.slug}`} className="mt-3 block">
          <h3 className="text-xl font-semibold text-ink transition group-hover:text-roseBrand">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 min-h-[3.5rem] text-sm leading-6 text-neutral-600">{description}</p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-2xl font-bold text-ink">S/ {product.price.toFixed(2)}</p>
          <span className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-roseBrand">
            Stock: {product.stock}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/producto/${product.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-ink transition hover:border-roseBrand hover:text-roseBrand"
          >
            Ver producto
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={getWhatsAppLink(product)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4" />
            Comprar
          </a>
        </div>
      </div>
    </article>
  );
}
