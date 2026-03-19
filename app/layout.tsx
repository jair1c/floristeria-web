import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://floristeria-web.vercel.app'),
  title: 'Florería Aura',
  description: 'Tienda online de arreglos florales y regalos especiales.',
  openGraph: {
    title: 'Florería Aura',
    description: 'Tienda online de arreglos florales y regalos especiales.',
    url: 'https://floristeria-web.vercel.app',
    siteName: 'Florería Aura',
    locale: 'es_PE',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Florería Aura',
    description: 'Tienda online de arreglos florales y regalos especiales.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
