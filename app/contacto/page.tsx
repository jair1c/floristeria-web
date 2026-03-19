import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

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
              Puedes personalizar colores, dedicatorias y tipo de arreglo. También podemos coordinar entregas y pedidos especiales.
            </p>
          </div>
          <div className="card p-8">
            <div className="space-y-4 text-neutral-700">
              <p><span className="font-semibold text-ink">WhatsApp:</span> +51 999 999 999</p>
              <p><span className="font-semibold text-ink">Correo:</span> hola@floreriaaura.com</p>
              <p><span className="font-semibold text-ink">Horario:</span> Lunes a sábado, 9:00 a. m. - 8:00 p. m.</p>
              <p><span className="font-semibold text-ink">Cobertura:</span> Entregas locales y recojo en tienda.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
