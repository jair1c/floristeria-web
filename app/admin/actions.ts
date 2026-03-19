'use server';

import crypto from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProduct, deleteProduct, toggleProductActive, toggleProductFeatured, updateProduct } from '@/lib/store';
import { login, logout } from '@/lib/auth';
import { getSupabaseClient, isSupabaseEnabled, SUPABASE_PRODUCTS_BUCKET } from '@/lib/supabase';
import { ProductInput } from '@/lib/types';

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

async function uploadProductImage(file: File) {
  if (!isSupabaseEnabled()) throw new Error('Configura Supabase para subir imágenes desde archivo.');

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
  const filePath = `products/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const supabase = getSupabaseClient();

  const { error } = await supabase.storage.from(SUPABASE_PRODUCTS_BUCKET).upload(filePath, bytes, {
    contentType: file.type || 'application/octet-stream',
    upsert: false
  });
  if (error) throw new Error(`No se pudo subir la imagen: ${error.message}`);

  const { data } = supabase.storage.from(SUPABASE_PRODUCTS_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

async function parseProductFormData(formData: FormData): Promise<ProductInput> {
  const name = getString(formData, 'name');
  const description = getString(formData, 'description');
  const imageUrl = getString(formData, 'image');
  const categorySlug = getString(formData, 'categorySlug');
  const price = Number(formData.get('price') ?? 0);
  const stock = Number(formData.get('stock') ?? 0);
  const featured = formData.get('featured') === 'on';
  const active = formData.get('active') === 'on';
  const imageFile = formData.get('imageFile');

  let image = imageUrl;
  if (imageFile instanceof File && imageFile.size > 0) {
    image = await uploadProductImage(imageFile);
  }

  if (!name || !description || !image || !categorySlug) {
    throw new Error('Completa todos los campos obligatorios. Debes enviar una URL de imagen o subir un archivo.');
  }
  if (Number.isNaN(price) || price <= 0) throw new Error('Ingresa un precio válido.');
  if (Number.isNaN(stock) || stock < 0) throw new Error('Ingresa un stock válido.');

  return { name, description, image, categorySlug, price, stock, featured, active };
}

export async function loginAction(formData: FormData) {
  const email = getString(formData, 'email');
  const password = getString(formData, 'password');
  const success = await login(email, password);
  if (!success) redirect('/admin/login?error=1');
  redirect('/admin/dashboard');
}

export async function logoutAction() {
  await logout();
  redirect('/admin/login');
}

export async function createProductAction(formData: FormData) {
  const product = await parseProductFormData(formData);
  await createProduct(product);
  revalidatePath('/');
  revalidatePath('/productos');
  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/productos');
  revalidatePath(`/categoria/${product.categorySlug}`);
  redirect('/admin/productos?created=1');
}

export async function updateProductAction(formData: FormData) {
  const id = getString(formData, 'id');
  const product = await parseProductFormData(formData);
  await updateProduct(id, product);
  revalidatePath('/');
  revalidatePath('/productos');
  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/productos');
  revalidatePath(`/categoria/${product.categorySlug}`);
  redirect('/admin/productos?updated=1');
}

export async function deleteProductAction(formData: FormData) {
  const id = getString(formData, 'id');
  await deleteProduct(id);
  revalidatePath('/');
  revalidatePath('/productos');
  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/productos');
  redirect('/admin/productos?deleted=1');
}

export async function toggleProductActiveAction(formData: FormData) {
  const id = getString(formData, 'id');
  await toggleProductActive(id);
  revalidatePath('/');
  revalidatePath('/productos');
  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/productos');
}

export async function toggleProductFeaturedAction(formData: FormData) {
  const id = getString(formData, 'id');
  await toggleProductFeatured(id);
  revalidatePath('/');
  revalidatePath('/productos');
  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/productos');
}
