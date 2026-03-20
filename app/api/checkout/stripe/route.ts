import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder } from '@/lib/orders';
import type { OrderInput } from '@/lib/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body: OrderInput = await req.json();

    // 1. Crear el pedido en Supabase primero (con status 'pending')
    const order = await createOrder({ ...body, paymentMethod: 'stripe' });

    // 2. Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: 'es',
      line_items: [
        {
          price_data: {
            currency: 'pen', // Soles peruanos
            product_data: {
              name: body.productName,
              description: `Pedido #${order.id}`,
            },
            unit_amount: Math.round(body.productPrice * 100), // Stripe usa centavos
          },
          quantity: body.quantity,
        },
      ],
      customer_email: body.customerEmail || undefined,
      metadata: {
        orderId: order.id,
        customerName: body.customerName,
        customerPhone: body.customerPhone,
      },
      success_url: `${BASE_URL}/checkout/success?order_id=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${BASE_URL}/producto/${body.productId}?cancelled=true`,
    });

    return NextResponse.json({ url: session.url, orderId: order.id });
  } catch (err) {
    console.error('[checkout/stripe]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error al crear sesión de Stripe' },
      { status: 500 }
    );
  }
}