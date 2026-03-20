import { getAllOrders, updateOrderStatus } from '@/lib/orders';
import type { Order, OrderStatus } from '@/lib/types';

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending:   '⏳ Pendiente',
  paid:      '💳 Pagado',
  confirmed: '✅ Confirmado',
  cancelled: '❌ Cancelado',
};

const METHOD_LABELS = {
  yape:   '💜 Yape',
  plin:   '💙 Plin',
  stripe: '💳 Tarjeta',
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending:   'bg-amber-100 text-amber-800',
  paid:      'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default async function AdminOrdersPage() {
  let orders: Order[] = [];
  let fetchError: string | null = null;

  try {
    orders = await getAllOrders();
  } catch (err) {
    fetchError = err instanceof Error ? err.message : 'Error desconocido';
  }

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid' || o.paymentStatus === 'confirmed')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total pedidos" value={orders.length.toString()} />
        <StatCard
          label="Pendientes"
          value={orders.filter((o) => o.paymentStatus === 'pending').length.toString()}
          color="text-amber-600"
        />
        <StatCard
          label="Confirmados"
          value={orders.filter((o) => o.paymentStatus === 'confirmed').length.toString()}
          color="text-green-600"
        />
        <StatCard
          label="Ingresos"
          value={`S/ ${totalRevenue.toFixed(2)}`}
          color="text-roseBrand"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <p className="text-sm text-neutral-500 mt-1">Gestiona todos los pedidos recibidos</p>
      </div>

      {fetchError && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          Error al cargar pedidos: {fetchError}
        </div>
      )}

      {orders.length === 0 && !fetchError && (
        <div className="rounded-2xl border border-dashed border-neutral-200 p-12 text-center text-neutral-500">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-semibold">No hay pedidos aún</p>
          <p className="text-sm mt-1">Los pedidos aparecerán aquí cuando los clientes compren.</p>
        </div>
      )}

      {orders.length > 0 && (
        <div className="rounded-2xl border border-neutral-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">Pedido</th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">Cliente</th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">Producto</th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">Método</th>
                  <th className="text-right px-4 py-3 font-semibold text-neutral-600">Total</th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">Estado</th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">Fecha</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/50 transition">
                    <td className="px-4 py-3 font-mono text-xs text-neutral-500">{order.id.slice(0, 16)}…</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-neutral-500">{order.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{order.productName}</p>
                      <p className="text-xs text-neutral-500">x{order.quantity}</p>
                    </td>
                    <td className="px-4 py-3">
                      {METHOD_LABELS[order.paymentMethod]}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      S/ {order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[order.paymentStatus]}`}>
                        {STATUS_LABELS[order.paymentStatus]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString('es-PE', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <StatusActions orderId={order.id} current={order.paymentStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color ?? 'text-ink'}`}>{value}</p>
    </div>
  );
}

// Server Action inline para cambiar estado
function StatusActions({ orderId, current }: { orderId: string; current: OrderStatus }) {
  async function changeStatus(formData: FormData) {
    'use server';
    const status = formData.get('status') as OrderStatus;
    await updateOrderStatus(orderId, status);
    // revalidatePath sería ideal, por ahora se hace reload
  }

  if (current === 'confirmed' || current === 'cancelled') return null;

  return (
    <form action={changeStatus} className="flex gap-1">
      {current === 'pending' && (
        <>
          <button
            name="status" value="confirmed"
            className="rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 hover:bg-green-200 transition"
          >
            Confirmar
          </button>
          <button
            name="status" value="cancelled"
            className="rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 transition"
          >
            Cancelar
          </button>
        </>
      )}
      {current === 'paid' && (
        <button
          name="status" value="confirmed"
          className="rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 hover:bg-green-200 transition"
        >
          Confirmar
        </button>
      )}
    </form>
  );
}
