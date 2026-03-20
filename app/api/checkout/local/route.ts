import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/orders';
import { sendOrderNotification } from '@/lib/email';
import type { OrderInput } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body: OrderInput = await req.json();

    // Validación básica
    if (!body.productId || !body.customerName || !body.customerPhone || !body.paymentMethod) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    if (!['yape', 'plin'].includes(body.paymentMethod)) {
      return NextResponse.json({ error: 'Método de pago no válido' }, { status: 400 });
    }

    const order = await createOrder(body);

    // Enviar notificación al admin (no bloqueante)
    await sendOrderNotification(order);

    return NextResponse.json({ orderId: order.id, success: true });
  } catch (err) {
    console.error('[checkout/local]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error interno' },
      { status: 500 }
    );
  }
}