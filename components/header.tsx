import Link from 'next/link';
import { Flower2, ShoppingBag } from 'lucide-react';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/categoria/ramos', label: 'Ramos' },
  { href: '/categoria/cumpleanos', label: 'Cumpleaños' },
  { href: '/categoria/aniversarios', label: 'Aniversarios' },
  { href: '/categoria/condolencias', label: 'Condolencias' },
  { href: '/categoria/regalos', label: 'Regalos' },
  { href: '/contacto', label: 'Contacto' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/90 backdrop-blur">
      <div className="section-container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold text-ink">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush text-roseBrand">
            <Flower2 className="h-6 w-6" />
          </span>
          Florería Aura
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="pill-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="https://wa.me/51999999999" target="_blank" className="btn-primary" rel="noreferrer">
            Pedir por WhatsApp
          </a>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-200 bg-white text-ink transition hover:border-roseBrand hover:text-roseBrand" aria-label="Carrito próximamente">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
