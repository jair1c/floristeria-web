import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contacto — Haz tu Pedido',
  description:
    'Contáctanos por WhatsApp para hacer tu pedido de flores en Lima. Atendemos de lunes a sábado de 9am a 8pm. Delivery coordinado en Lima Metropolitana.',
  alternates: {
    canonical: 'https://floristeria-web.vercel.app/contacto',
  },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="section-container py-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Contacto</p>
            <h1 className="mt-2 text-4xl font-bold">Haz tu pedido o consulta</h1>
            <p className="mt-4 max-w-2xl text-neutral-600">
              Puedes personalizar colores, dedicatorias y tipo de arreglo. También coordinamos entregas y pedidos especiales en Lima Metropolitana.
            </p>
          </div>

          <div className="card p-8 space-y-5">
            <div className="space-y-4 text-neutral-700">
              <div>
                <p className="font-semibold text-ink">📱 WhatsApp</p>
                <p className="mt-1">+51 931 336 424</p>
              </div>
              <div>
                <p className="font-semibold text-ink">🕐 Horario de atención</p>
                <p className="mt-1">Lunes a sábado, 9:00 a. m. – 8:00 p. m.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">🚗 Cobertura</p>
                <p className="mt-1">Entregas coordinadas en Lima Metropolitana. Punto de encuentro acordado por WhatsApp.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">💳 Métodos de pago</p>
                <p className="mt-1">Yape, Plin y tarjeta de crédito/débito (Visa, Mastercard).</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola, quiero hacer un pedido de flores 🌸')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-4 font-semibold text-white hover:bg-green-600 transition"
            >
              <MessageCircle className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}