import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Nosotros — Quiénes Somos',
  description:
    'Florería Aura es una tienda online de arreglos florales en Miraflores, Lima. Diseñamos ramos, box florales y regalos especiales con delivery a domicilio y pedidos por WhatsApp.',
  alternates: {
    canonical: 'https://floristeria-web.vercel.app/nosotros',
  },
};

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="section-container py-14">
        <div className="card p-8 md:p-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Nosotros</p>
          <h1 className="mt-2 text-4xl font-bold">Detalles florales con estilo y emoción</h1>
          <div className="mt-5 space-y-4 text-neutral-600">
            <p>
              <strong className="text-ink">Florería Aura</strong> nace con una misión simple: convertir flores en experiencias que las personas recuerdan. Cada ramo, cada box floral y cada arreglo es diseñado con cuidado para que el momento sea especial.
            </p>
            <p>
              Somos una floristería online con base en <strong className="text-ink">Miraflores, Lima</strong>, y atendemos pedidos a través de WhatsApp con entregas coordinadas en Lima Metropolitana. No importa la ocasión — cumpleaños, aniversarios, condolencias o simplemente sorprender a alguien — tenemos el arreglo ideal.
            </p>
            <p>
              Trabajamos con flores frescas, presentaciones cuidadas y atención personalizada en cada pedido. Puedes indicarnos colores preferidos, dedicatorias o necesidades especiales y lo adaptamos para ti.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Entregas coordinadas', desc: 'En puntos de Lima Metropolitana' },
              { label: 'Pedidos por WhatsApp', desc: 'Rápido, fácil y personalizado' },
              { label: 'Flores frescas', desc: 'Calidad garantizada en cada arreglo' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-rose-100 bg-blush p-5">
                <p className="font-semibold text-ink">{item.label}</p>
                <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}