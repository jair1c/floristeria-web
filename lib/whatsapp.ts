export const WHATSAPP_PHONE = '51931336424';
export const SITE_URL = 'https://floristeria-web.vercel.app';

type WhatsAppProduct = {
  name: string;
  price: number;
  slug?: string;
};

export function getProductUrl(slug?: string) {
  if (!slug) return `${SITE_URL}/productos`;
  return `${SITE_URL}/producto/${slug}`;
}

export function getWhatsAppLink(product: WhatsAppProduct) {
  const productUrl = getProductUrl(product.slug);
  const message = [
    'Hola, estoy interesado en este producto:',
    '',
    `🌸 ${product.name}`,
    `💰 S/ ${product.price.toFixed(2)}`,
    '',
    `🔗 ${productUrl}`,
    '',
    '¿Está disponible?'
  ].join('\n');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
