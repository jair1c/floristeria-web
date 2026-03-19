import { WHATSAPP_PHONE } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-rose-100 bg-white">
      <div className="section-container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Florería Aura</h3>
          <p className="mt-3 text-sm text-neutral-600">
            Arreglos florales elegantes para cumpleaños, aniversarios, condolencias y momentos especiales.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Contacto</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li>WhatsApp: +{WHATSAPP_PHONE}</li>
            <li>Correo: ventas@floreriaaura.com</li>
            <li>Dirección: Lima, Perú</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Horario</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li>Lunes a sábado: 9:00 a.m. - 8:00 p.m.</li>
            <li>Domingos: 10:00 a.m. - 2:00 p.m.</li>
            <li>Pedidos por WhatsApp todo el día</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
