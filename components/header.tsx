'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Flower2, Menu, X, MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';

const links = [
  { href: '/',                        label: 'Inicio' },
  { href: '/categoria/ramos',         label: 'Ramos' },
  { href: '/categoria/cumpleanos',    label: 'Cumpleaños' },
  { href: '/categoria/aniversarios',  label: 'Aniversarios' },
  { href: '/categoria/condolencias',  label: 'Condolencias' },
  { href: '/categoria/regalos',       label: 'Regalos' },
  { href: '/contacto',                label: 'Contacto' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 backdrop-blur">
      {/* Barra principal */}
      <div className="section-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold text-ink"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush text-roseBrand">
            <Flower2 className="h-5 w-5" />
          </span>
          Florería Aura
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="pill-link text-sm">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Pedir por WhatsApp
          </a>
        </div>

        {/* Mobile: WhatsApp + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-200 text-ink transition hover:border-roseBrand hover:text-roseBrand"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu desplegable */}
      {open && (
        <div className="lg:hidden border-t border-rose-100 bg-white">
          <nav className="section-container py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-ink transition hover:bg-blush hover:text-roseBrand"
              >
                {link.label}
              </Link>
            ))}
            {/* WhatsApp CTA dentro del menú */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white hover:bg-green-600 transition"
            >
              <MessageCircle className="h-4 w-4" />
              Pedir por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}