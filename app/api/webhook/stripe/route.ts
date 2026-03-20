import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateOrderStripeSession, getOrderById } from '@/lib/orders';
import { sendOrderNotification } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature') ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('[webhook] Signature error:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      try {
        await updateOrderStripeSession(orderId, session.id);
        console.log(`[webhook] Pedido ${orderId} marcado como pagado`);

        // Enviar notificación al admin
        const order = await getOrderById(orderId);
        if (order) await sendOrderNotification(order);
      } catch (err) {
        console.error('[webhook] Error actualizando pedido:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}