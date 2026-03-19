import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Florería Aura',
  description: 'Tienda online de arreglos florales y regalos especiales.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
