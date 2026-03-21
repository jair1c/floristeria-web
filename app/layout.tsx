import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://floristeria-web.vercel.app';
const SITE_NAME = 'Florería Aura';
const SITE_DESCRIPTION =
  'Florería online en Miraflores, Lima. Ramos, box florales y arreglos para cumpleaños, aniversarios y regalos. Pedidos por WhatsApp con delivery a Lima.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ─── Título con template para páginas internas ───────────────
  title: {
    default: `${SITE_NAME} | Floristería Online en Miraflores, Lima`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  // ─── Keywords ────────────────────────────────────────────────
  keywords: [
    'florería online Lima',
    'floristería Miraflores',
    'ramos de flores Lima',
    'arreglos florales Lima',
    'flores para cumpleaños Lima',
    'ramos para aniversario Lima',
    'box floral Lima',
    'delivery de flores Miraflores',
    'flores por WhatsApp Lima',
    'florería con delivery Lima',
    'arreglos florales Miraflores',
    'regalos florales Lima',
    'bouquet Lima',
    'flores online Peru',
  ],

  // ─── Autores y robots ────────────────────────────────────────
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ─── Open Graph ──────────────────────────────────────────────
  openGraph: {
    title: `${SITE_NAME} | Floristería Online en Miraflores, Lima`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Florería Aura — Arreglos florales en Lima',
      },
    ],
  },

  // ─── Twitter / X ─────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Floristería Online en Lima`,
    description: SITE_DESCRIPTION,
    images: ['https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80'],
  },

  // ─── Canonical ───────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ─── Verificación Google Search Console ──────────────────────
  // Descomenta y pega tu código cuando lo tengas:
  // verification: {
  //   google: 'google-site-verification=GVBXx9xvUvRptlA7ikw5QNmxUen0tss8_7HWzOagKOA',
  // },
};

// ─── Schema.org — datos estructurados ────────────────────────────
const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'OnlineStore',
      '@id': `${SITE_URL}/#store`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80',
      telephone: '+51931336424',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Miraflores',
        addressRegion: 'Lima',
        addressCountry: 'PE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -12.1211,
        longitude: -77.0299,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
      priceRange: 'S/ 50 - S/ 300',
      currenciesAccepted: 'PEN',
      paymentAccepted: 'Yape, Plin, Credit Card',
      areaServed: {
        '@type': 'City',
        name: 'Lima',
        addressCountry: 'PE',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Catálogo Florería Aura',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Ramos de flores' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Box florales' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Arreglos para cumpleaños' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Bouquets para aniversario' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Arreglos de condolencias' } },
        ],
      },
      sameAs: [
        // Agrega tus redes sociales cuando las tengas:
        // 'https://www.instagram.com/floreriaaura',
        // 'https://www.facebook.com/floreriaaura',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'es-PE',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/productos?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}