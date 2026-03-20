// lib/email.ts — notificaciones por email usando Resend
import { Resend } from 'resend';
import type { Order } from '@/lib/types';

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Configura aquí tu Gmail personal ────────────────────────
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'tucorreo@gmail.com';
const FROM_EMAIL  = 'Florería Aura <onboarding@resend.dev>';
// ─────────────────────────────────────────────────────────────

const METHOD_LABELS = {
  yape:   '💜 Yape',
  plin:   '💙 Plin',
  stripe: '💳 Tarjeta (Stripe)',
};

const STATUS_LABELS = {
  pending:   'Pendiente de confirmación',
  paid:      'Pagado',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
};

export async function sendOrderNotification(order: Order): Promise<void> {
  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      ADMIN_EMAIL,
      subject: `🌸 Nuevo pedido #${order.id.slice(0, 16)} — ${order.productName}`,
      html: buildEmailHtml(order),
    });
    console.log(`[email] Notificación enviada para pedido ${order.id}`);
  } catch (err) {
    // No lanzamos el error para no bloquear el flujo del pedido
    console.error('[email] Error al enviar notificación:', err);
  }
}

function buildEmailHtml(order: Order): string {
  const total    = `S/ ${order.total.toFixed(2)}`;
  const method   = METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod;
  const status   = STATUS_LABELS[order.paymentStatus] ?? order.paymentStatus;
  const date     = new Date(order.createdAt).toLocaleString('es-PE', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo pedido</title>
</head>
<body style="margin:0;padding:0;background:#fdf2f4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf2f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#e11d48,#f43f5e);padding:32px;text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;letter-spacing:3px;text-transform:uppercase;">Florería Aura</p>
              <h1 style="margin:8px 0 0;color:#fff;font-size:26px;font-weight:700;">🌸 Nuevo Pedido</h1>
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="background:#fff7ed;border-left:4px solid #f97316;padding:14px 32px;">
              <p style="margin:0;color:#9a3412;font-size:14px;font-weight:600;">
                ⚡ Tienes un nuevo pedido que requiere tu atención
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <!-- Producto -->
              <h2 style="margin:0 0 16px;font-size:18px;color:#1f2937;border-bottom:2px solid #fce7f3;padding-bottom:10px;">
                📦 Detalle del pedido
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;width:40%;">Producto</td>
                  <td style="padding:6px 0;color:#1f2937;font-size:14px;font-weight:600;">${order.productName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">Cantidad</td>
                  <td style="padding:6px 0;color:#1f2937;font-size:14px;">${order.quantity}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">Total</td>
                  <td style="padding:6px 0;color:#e11d48;font-size:18px;font-weight:700;">${total}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">Método de pago</td>
                  <td style="padding:6px 0;color:#1f2937;font-size:14px;">${method}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">Estado</td>
                  <td style="padding:6px 0;">
                    <span style="background:#fce7f3;color:#be185d;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;">${status}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">Fecha</td>
                  <td style="padding:6px 0;color:#1f2937;font-size:14px;">${date}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">N° de pedido</td>
                  <td style="padding:6px 0;color:#9ca3af;font-size:12px;font-family:monospace;">${order.id}</td>
                </tr>
              </table>

              <!-- Cliente -->
              <h2 style="margin:28px 0 16px;font-size:18px;color:#1f2937;border-bottom:2px solid #fce7f3;padding-bottom:10px;">
                👤 Datos del cliente
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;width:40%;">Nombre</td>
                  <td style="padding:6px 0;color:#1f2937;font-size:14px;font-weight:600;">${order.customerName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">Teléfono</td>
                  <td style="padding:6px 0;">
                    <a href="https://wa.me/51${order.customerPhone.replace(/\s/g, '')}" style="color:#16a34a;font-size:14px;font-weight:600;text-decoration:none;">
                      📱 ${order.customerPhone} (WhatsApp)
                    </a>
                  </td>
                </tr>
                ${order.customerEmail ? `
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">Email</td>
                  <td style="padding:6px 0;color:#1f2937;font-size:14px;">${order.customerEmail}</td>
                </tr>` : ''}
                ${order.deliveryAddress ? `
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">Dirección</td>
                  <td style="padding:6px 0;color:#1f2937;font-size:14px;">${order.deliveryAddress}</td>
                </tr>` : ''}
                ${order.notes ? `
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;">Notas</td>
                  <td style="padding:6px 0;color:#1f2937;font-size:14px;font-style:italic;">"${order.notes}"</td>
                </tr>` : ''}
              </table>

              <!-- CTA -->
              <div style="margin-top:32px;text-align:center;">
                <a
                  href="https://floristeria-web.vercel.app/admin/pedidos"
                  style="display:inline-block;background:#e11d48;color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:700;font-size:15px;"
                >
                  Ver pedido en el panel →
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fdf2f4;padding:20px 32px;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                Florería Aura · Sistema de notificaciones automáticas
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
