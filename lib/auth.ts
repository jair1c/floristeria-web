import { cookies } from 'next/headers';

export const AUTH_COOKIE_NAME = 'floristeria_admin_session';
const AUTH_COOKIE_VALUE = 'admin-authenticated';

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL ?? 'admin@floreriaaura.com',
    password: process.env.ADMIN_PASSWORD ?? 'Admin123*'
  };
}

export async function login(email: string, password: string) {
  const credentials = getAdminCredentials();

  if (email !== credentials.email || password !== credentials.password) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/'
  });

  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
