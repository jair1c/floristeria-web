import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Heart, MessageCircleMore, Sparkles } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { CategoryCard } from '@/components/category-card';
import { ProductCard } from '@/components/product-card';
import { benefits, testimonials } from '@/lib/data';
import { getCategories, getFeaturedProducts } from '@/lib/store';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts()
  ]);

  return (
    <>
      <Header />
      <main>
        <section className="section-container grid gap-10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-sm font-semibold text-roseBrand">
              <Sparkles className="h-4 w-4" />
              Diseños florales para cada ocasión
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Arreglos florales que convierten momentos en recuerdos inolvidables.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-neutral-600">
              Crea una experiencia especial con ramos, box florales y regalos cuidadosamente presentados.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/productos" className="btn-primary">
                Ver catálogo
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                className="btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-blush blur-2xl" />
            <div className="absolute -bottom-8 right-8 h-32 w-32 rounded-full bg-rose-100 blur-2xl" />

            <div className="card relative overflow-hidden p-3">
              <div className="relative h-[520px] overflow-hidden rounded-[1rem]">
                <Image
                  src="https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80"
                  alt="Arreglo floral elegante"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute bottom-8 left-8 right-8 rounded-[1rem] bg-white/90 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold text-roseBrand">
                  <Heart className="h-4 w-4" />
                  Arreglos premium
                </div>
                <p className="mt-2 text-sm text-neutral-700">
                  Presentación elegante, flores frescas y detalles que enamoran.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-container py-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">
                Categorías
              </p>
              <h2 className="mt-2 text-3xl font-bold">Explora por ocasión</h2>
            </div>

            <Link
              href="/productos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-roseBrand"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </section>

        <section className="section-container py-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">
              Productos destacados
            </p>
            <h2 className="mt-2 text-3xl font-bold">Lo más pedido</h2>
          </div>

          <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="section-container py-10">
          <div className="card grid gap-8 p-8 lg:grid-cols-[.95fr_1.05fr] lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">
                ¿Por qué elegirnos?
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                Una experiencia floral cuidada de principio a fin
              </h2>
              <p className="mt-4 text-neutral-600">
                Diseñamos cada detalle para que tu regalo tenga impacto visual, buena presentación y una atención cercana.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-[1rem] border border-rose-100 bg-blush p-5">
                  <CheckCircle2 className="h-5 w-5 text-roseBrand" />
                  <p className="mt-3 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-container py-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">
              Testimonios
            </p>
            <h2 className="mt-2 text-3xl font-bold">Clientes felices</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="card p-6">
                <MessageCircleMore className="h-6 w-6 text-roseBrand" />
                <p className="mt-4 text-neutral-700">“{testimonial.text}”</p>
                <p className="mt-4 font-semibold">{testimonial.name}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}