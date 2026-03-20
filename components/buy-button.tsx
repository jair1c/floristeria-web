'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { CheckoutModal } from '@/components/checkout-modal';
import type { Product } from '@/lib/types';

type Props = { product: Product };

export function BuyButton({ product }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-roseBrand px-5 py-4 text-base font-semibold text-white transition hover:bg-rose-600"
      >
        <ShoppingBag className="h-5 w-5" />
        Comprar ahora
      </button>

      {open && (
        <CheckoutModal
          product={product}
          quantity={1}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
