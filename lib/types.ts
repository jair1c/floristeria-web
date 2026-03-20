export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  categorySlug: string;
  categoryName: string;
  stock: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
};

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  image: string;
  categorySlug: string;
  stock: number;
  featured: boolean;
  active: boolean;
};

// ─── Pagos y Pedidos ───────────────────────────────────────

export type PaymentMethod = 'yape' | 'plin' | 'stripe';
export type OrderStatus   = 'pending' | 'paid' | 'confirmed' | 'cancelled';

export type Order = {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: OrderStatus;
  stripeSessionId?: string;
  voucherUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderInput = {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
};
