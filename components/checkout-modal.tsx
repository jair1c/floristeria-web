'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, CreditCard, Smartphone, Loader2, CheckCircle2 } from 'lucide-react';
import type { PaymentMethod, Product } from '@/lib/types';

// ─── Config — pon tus datos reales aquí ──────────────────────
const YAPE_PHONE  = '931 336 424';  // ← tu número Yape
const PLIN_PHONE  = '931 336 424';  // ← tu número Plin
const YAPE_QR_URL = '/yape-qr.png'; // ← sube tu QR a /public/yape-qr.png
const PLIN_QR_URL = '/plin-qr.png'; // ← sube tu QR a /public/plin-qr.png
// ─────────────────────────────────────────────────────────────

type Props = {
  product: Product;
  quantity: number;
  onClose: () => void;
};

type Step = 'method' | 'customer' | 'qr' | 'success';

type CustomerForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
};

export function CheckoutModal({ product, quantity, onClose }: Props) {
  const total = product.price * quantity;

  const [step, setStep]           = useState<Step>('method');
  const [method, setMethod]       = useState<PaymentMethod | null>(null);
  const [loading, setLoading]     = useState(false);
  const [orderId, setOrderId]     = useState<string | null>(null);
  const [form, setForm]           = useState<CustomerForm>({
    name: '', phone: '', email: '', address: '', notes: '',
  });

  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCustomerSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!method) return;
    setLoading(true);

    try {
      if (method === 'stripe') {
        // Llama al endpoint que crea la sesión de Stripe
        const res = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity,
            total,
            customerName: form.name,
            customerPhone: form.phone,
            customerEmail: form.email,
            deliveryAddress: form.address,
            notes: form.notes,
            paymentMethod: 'stripe',
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? 'Error al crear sesión de pago');
        // Redirige a Stripe Checkout
        window.location.href = json.url;
      } else {
        // Yape / Plin — crea el pedido en Supabase y muestra QR
        const res = await fetch('/api/checkout/local', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity,
            total,
            customerName: form.name,
            customerPhone: form.phone,
            customerEmail: form.email,
            deliveryAddress: form.address,
            notes: form.notes,
            paymentMethod: method,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? 'Error al registrar pedido');
        setOrderId(json.orderId);
        setStep('qr');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }

  const isLocal = method === 'yape' || method === 'plin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-4 border-b border-rose-100">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-roseBrand">Checkout</p>
            <h2 className="text-lg font-bold text-ink">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-rose-100 hover:text-roseBrand transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Price bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-blush border-b border-rose-100">
          <span className="text-sm text-neutral-600">
            {quantity} × S/ {product.price.toFixed(2)}
          </span>
          <span className="text-xl font-bold text-ink">Total S/ {total.toFixed(2)}</span>
        </div>

        <div className="px-6 py-6">
          {/* ── Step 1: Elegir método ── */}
          {step === 'method' && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-neutral-700 mb-4">¿Cómo quieres pagar?</p>

              <MethodButton
                active={method === 'yape'}
                onClick={() => setMethod('yape')}
                emoji="💜"
                label="Yape"
                desc={`Al número ${YAPE_PHONE}`}
              />
              <MethodButton
                active={method === 'plin'}
                onClick={() => setMethod('plin')}
                emoji="💙"
                label="Plin"
                desc={`Al número ${PLIN_PHONE}`}
              />
              <MethodButton
                active={method === 'stripe'}
                onClick={() => setMethod('stripe')}
                emoji="💳"
                label="Tarjeta de crédito / débito"
                desc="Visa, Mastercard — pago seguro"
                icon={<CreditCard className="h-5 w-5 text-indigo-500" />}
              />

              <button
                disabled={!method}
                onClick={() => setStep('customer')}
                className="mt-4 w-full rounded-2xl bg-roseBrand py-4 font-semibold text-white transition hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* ── Step 2: Datos del cliente ── */}
          {step === 'customer' && (
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <p className="text-sm font-semibold text-neutral-700 mb-2">Tus datos de contacto</p>

              <Field
                label="Nombre completo *"
                name="name"
                value={form.name}
                onChange={handleField}
                required
                placeholder="María García"
              />
              <Field
                label="Teléfono / WhatsApp *"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleField}
                required
                placeholder="987 654 321"
              />
              <Field
                label="Email (opcional)"
                name="email"
                type="email"
                value={form.email}
                onChange={handleField}
                placeholder="maria@email.com"
              />
              <Field
                label="Dirección de entrega (opcional)"
                name="address"
                value={form.address}
                onChange={handleField}
                placeholder="Av. Principal 123, Lima"
              />
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Notas adicionales
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleField}
                  rows={2}
                  placeholder="Dedicatoria, color preferido..."
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-roseBrand/30 focus:border-roseBrand"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('method')}
                  className="flex-1 rounded-2xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-600 hover:border-roseBrand hover:text-roseBrand transition"
                >
                  ← Atrás
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-2xl bg-roseBrand py-3 font-semibold text-white hover:bg-rose-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {method === 'stripe' ? 'Ir a pagar 💳' : 'Ver QR de pago'}
                </button>
              </div>
            </form>
          )}

          {/* ── Step 3: QR Yape / Plin ── */}
          {step === 'qr' && isLocal && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Smartphone className="h-5 w-5 text-roseBrand" />
                <p className="font-semibold text-ink">
                  Paga {method === 'yape' ? '💜 Yape' : '💙 Plin'}
                </p>
              </div>

              <p className="text-sm text-neutral-600">
                Escanea el QR o envía{' '}
                <span className="font-bold text-ink">S/ {total.toFixed(2)}</span> al número{' '}
                <span className="font-bold">{method === 'yape' ? YAPE_PHONE : PLIN_PHONE}</span>
              </p>

              {/* QR image */}
              <div className="mx-auto w-48 h-48 rounded-2xl overflow-hidden border-4 border-rose-100 relative bg-neutral-50 flex items-center justify-center">
                <Image
                  src={method === 'yape' ? YAPE_QR_URL : PLIN_QR_URL}
                  alt={`QR ${method}`}
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    // Fallback si no existe la imagen
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-left text-sm text-amber-800">
                <p className="font-semibold mb-1">📱 Después de pagar:</p>
                <p>Envía el comprobante por WhatsApp y te confirmaremos tu pedido.</p>
                {orderId && (
                  <p className="mt-2 text-xs text-amber-600">
                    Tu N° de pedido: <strong>{orderId}</strong>
                  </p>
                )}
              </div>

              <a
                href={`https://wa.me/51${YAPE_PHONE.replace(/\s/g, '')}?text=${encodeURIComponent(
                  `Hola, hice un pedido de *${product.name}* (x${quantity}) por S/ ${total.toFixed(2)} con ${method.toUpperCase()}. Mi pedido N°: ${orderId}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-2xl bg-green-600 py-4 font-semibold text-white text-center hover:bg-green-700 transition"
              >
                📲 Enviar comprobante por WhatsApp
              </a>

              <button
                onClick={onClose}
                className="w-full rounded-2xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-600 hover:text-roseBrand transition"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* ── Success (post-Stripe redirect) ── */}
          {step === 'success' && (
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold">¡Pedido confirmado!</h3>
              <p className="text-sm text-neutral-600">
                Gracias por tu compra. Nos pondremos en contacto pronto.
              </p>
              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-roseBrand py-4 font-semibold text-white hover:bg-rose-600 transition"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-componentes ─────────────────────────────────────────

function MethodButton({
  active, onClick, emoji, label, desc, icon,
}: {
  active: boolean;
  onClick: () => void;
  emoji?: string;
  label: string;
  desc: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition ${
        active
          ? 'border-roseBrand bg-rose-50'
          : 'border-neutral-200 hover:border-rose-200 hover:bg-rose-50/50'
      }`}
    >
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <p className="font-semibold text-ink">{label}</p>
        <p className="text-xs text-neutral-500">{desc}</p>
      </div>
      {icon}
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
          active ? 'border-roseBrand bg-roseBrand' : 'border-neutral-300'
        }`}
      >
        {active && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}

function Field({
  label, name, value, onChange, required, type = 'text', placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-roseBrand/30 focus:border-roseBrand"
      />
    </div>
  );
}
