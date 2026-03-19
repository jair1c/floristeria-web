import Link from 'next/link';
import { Flower2, LockKeyhole } from 'lucide-react';
import { loginAction } from '@/app/admin/actions';
import { getAdminCredentials } from '@/lib/auth';

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const credentials = getAdminCredentials();

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-rose-100 bg-white shadow-soft lg:grid-cols-[1.1fr_.9fr]">
        <div className="bg-blush p-8 md:p-12">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-roseBrand">
            <Flower2 className="h-7 w-7" />
          </div>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-roseBrand">Acceso privado</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-ink">Administra tu catálogo floral desde un solo lugar.</h1>
          <p className="mt-5 max-w-xl text-neutral-700">
            Desde aquí podrás crear, editar, activar, destacar y eliminar productos que se muestran en la web pública.
          </p>

          <div className="mt-8 rounded-[1.25rem] border border-rose-200 bg-white p-5 text-sm text-neutral-700">
            <p className="font-semibold text-ink">Acceso por defecto</p>
            <p className="mt-2">Correo: <span className="font-medium">{credentials.email}</span></p>
            <p>Contraseña: <span className="font-medium">{credentials.password}</span></p>
            <p className="mt-3 text-xs text-neutral-500">
              Luego podrás cambiar estos datos en el archivo <code>.env.local</code>.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 text-ink">
            <LockKeyhole className="h-5 w-5 text-roseBrand" />
            <span className="font-semibold">Iniciar sesión</span>
          </div>

          <form action={loginAction} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">Correo administrador</label>
              <input
                name="email"
                type="email"
                required
                defaultValue={credentials.email}
                className="w-full rounded-2xl border border-rose-200 px-4 py-3 outline-none transition focus:border-roseBrand"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">Contraseña</label>
              <input
                name="password"
                type="password"
                required
                defaultValue={credentials.password}
                className="w-full rounded-2xl border border-rose-200 px-4 py-3 outline-none transition focus:border-roseBrand"
              />
            </div>

            {params.error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Credenciales incorrectas. Verifica el correo y la contraseña.
              </div>
            ) : null}

            <button type="submit" className="btn-primary w-full">Entrar al panel</button>
          </form>

          <Link href="/" className="mt-6 inline-block text-sm font-semibold text-roseBrand hover:underline">
            Volver al sitio público
          </Link>
        </div>
      </div>
    </main>
  );
}
