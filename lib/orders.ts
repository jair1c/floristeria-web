// lib/orders.ts — usa getSupabaseAdmin() para bypassar RLS
import { getSupabaseAdmin } from '@/lib/supabase';
import type { Order, OrderInput, OrderStatus } from '@/lib/types';

type OrderRow = {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  total: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address?: string;
  notes?: string;
  payment_method: string;
  payment_status: string;
  stripe_session_id?: string;
  voucher_url?: string;
  created_at: string;
  updated_at: string;
};

function mapRowToOrder(row: OrderRow): Order {
  return {
    id: row.id,
    productId: row.product_id,
    productName: row.product_name,
    productPrice: Number(row.product_price),
    quantity: Number(row.quantity),
    total: Number(row.total),
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerEmail: row.customer_email,
    deliveryAddress: row.delivery_address,
    notes: row.notes,
    paymentMethod: row.payment_method as Order['paymentMethod'],
    paymentStatus: row.payment_status as OrderStatus,
    stripeSessionId: row.stripe_session_id,
    voucherUrl: row.voucher_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createOrder(input: OrderInput): Promise<Order> {
  const supabase = getSupabaseAdmin(); // service_role bypasea RLS
  const { data, error } = await supabase
    .from('orders')
    .insert({
      product_id:       input.productId,
      product_name:     input.productName,
      product_price:    input.productPrice,
      quantity:         input.quantity,
      total:            input.total,
      customer_name:    input.customerName,
      customer_phone:   input.customerPhone,
      customer_email:   input.customerEmail,
      delivery_address: input.deliveryAddress,
      notes:            input.notes,
      payment_method:   input.paymentMethod,
      payment_status:   'pending',
    })
    .select()
    .single();

  if (error) throw new Error(`No se pudo crear el pedido: ${error.message}`);
  return mapRowToOrder(data);
}

export async function getAllOrders(): Promise<Order[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`No se pudieron obtener los pedidos: ${error.message}`);
  return (data ?? []).map(mapRowToOrder);
}

export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
  if (error) return null;
  return mapRowToOrder(data);
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('orders')
    .update({ payment_status: status })
    .eq('id', id);
  if (error) throw new Error(`No se pudo actualizar el pedido: ${error.message}`);
}

export async function updateOrderStripeSession(id: string, sessionId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('orders')
    .update({ stripe_session_id: sessionId, payment_status: 'paid' })
    .eq('id', id);
  if (error) throw new Error(`No se pudo actualizar el pago Stripe: ${error.message}`);
}