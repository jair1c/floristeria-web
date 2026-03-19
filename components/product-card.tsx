import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Product } from '@/lib/types';
import { getWhatsAppLink } from '@/lib/whatsapp';

type ProductCardProps = {
  product: Product;
  compactDescription?: boolean;
};

export function ProductCard({ product, compactDescription = true }: ProductCardProps) {
  const description = compactDescription
    ? `${product.description.slice(0, 90)}${product.description.length > 90 ? '…' : ''}`
    : product.description;

  return (
    <article className="card group overflow-hidden">
      <Link href={`/producto/${product.slug}`} className="block">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-roseBrand">
          {product.categoryName}
        </p>

        <Link href={`/producto/${product.slug}`} className="mt-2 block">
          <h3 className="text-lg font-semibold transition group-hover:text-roseBrand">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-neutral-600">{description}</p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xl font-bold">S/ {product.price.toFixed(2)}</p>
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
