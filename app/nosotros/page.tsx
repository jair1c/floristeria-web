import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="section-container py-14">
        <div className="card p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Nosotros</p>
          <h1 className="mt-2 text-4xl font-bold">Detalles florales con estilo y emoción</h1>
          <p className="mt-5 max-w-3xl text-neutral-600">
            Florería Aura nace para transformar flores, regalos y presentaciones en experiencias memorables. Esta versión del sitio ya incluye una base real para tu panel administrador, para que puedas manejar el catálogo sin tocar el código cada vez.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
