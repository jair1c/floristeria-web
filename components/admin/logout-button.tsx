import { LogOut } from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-roseBrand hover:text-roseBrand">
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </button>
    </form>
  );
}
