import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/lib/types';

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group overflow-hidden rounded-[1.75rem] border border-rose-100 bg-white shadow-[0_18px_60px_-35px_rgba(210,82,127,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-35px_rgba(210,82,127,0.45)]"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
      </div>

      <div className="p-6 pt-8">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-ink transition group-hover:text-roseBrand">
            {category.name}
          </h3>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 text-roseBrand transition group-hover:border-roseBrand group-hover:bg-blush">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-neutral-600">{category.description}</p>
      </div>
    </Link>
  );
}
