import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type Props = {
  searchParams: Promise<{ order_id?: string; session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order_id } = await searchParams;

  return (
    <>
      <Header />
      <main className="section-container py-20">
        <div className="mx-auto max-w-md text-center card p-10">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">¡Pago exitoso!</h1>
          <p className="text-neutral-600 mb-2">
            Tu pedido ha sido registrado y estamos preparando tu arreglo floral.
          </p>
          {order_id && (
            <p className="text-sm text-neutral-500 mb-6">
              N° de pedido: <strong className="text-ink">{order_id}</strong>
            </p>
          )}
          <p className="text-sm text-neutral-500 mb-8">
            Te contactaremos pronto para coordinar la entrega. 🌸
          </p>
          <Link
            href="/"
            className="inline-block rounded-2xl bg-roseBrand px-8 py-4 font-semibold text-white hover:bg-rose-600 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}