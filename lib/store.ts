import { promises as fs } from 'fs';
import path from 'path';
import { Category, Product, ProductInput } from '@/lib/types';
import { getSupabaseClient, isSupabaseEnabled } from '@/lib/supabase';

const dataDir = path.join(process.cwd(), 'data');
const productsFile = path.join(dataDir, 'products.json');
const categoriesFile = path.join(dataDir, 'categories.json');

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category_slug: string;
  category_name: string;
  stock: number;
  featured: boolean;
  active: boolean;
  created_at: string;
};

async function readJsonFile<T>(filePath: string): Promise<T> {
  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file) as T;
}

async function writeJsonFile<T>(filePath: string, data: T) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    image: row.image,
    categorySlug: row.category_slug,
    categoryName: row.category_name,
    stock: Number(row.stock),
    featured: Boolean(row.featured),
    active: Boolean(row.active),
    createdAt: row.created_at
  };
}

async function getSupabaseProducts() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(`No se pudieron leer los productos desde Supabase: ${error.message}`);
  return (data ?? []).map(mapRowToProduct);
}

async function getSupabaseCategories() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) throw new Error(`No se pudieron leer las categorías desde Supabase: ${error.message}`);
  return (data ?? []) as Category[];
}

export async function getCategories() {
  const categories = isSupabaseEnabled() ? await getSupabaseCategories() : await readJsonFile<Category[]>(categoriesFile);
  return categories.filter((category) => category.active);
}

export async function getAllCategories() {
  return isSupabaseEnabled() ? getSupabaseCategories() : readJsonFile<Category[]>(categoriesFile);
}

export async function getAllProducts() {
  if (isSupabaseEnabled()) return getSupabaseProducts();
  const products = await readJsonFile<Product[]>(productsFile);
  return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getActiveProducts() {
  const products = await getAllProducts();
  return products.filter((product) => product.active);
}

export async function getFeaturedProducts() {
  const products = await getActiveProducts();
  return products.filter((product) => product.featured).slice(0, 4);
}

export async function getProductsByCategorySlug(slug: string) {
  const products = await getActiveProducts();
  return products.filter((product) => product.categorySlug === slug);
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getAllCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getProductById(id: string) {
  const products = await getAllProducts();
  return products.find((product) => product.id === id) ?? null;
}

export async function getProductBySlug(slug: string) {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function createProduct(input: ProductInput) {
  const categories = await getAllCategories();
  const products = await getAllProducts();
  const category = categories.find((item) => item.slug === input.categorySlug);
  if (!category) throw new Error('Categoría no válida.');

  const baseSlug = slugify(input.name);
  const existingSlugs = new Set(products.map((product) => product.slug));
  let slug = baseSlug;
  let counter = 2;
  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    slug,
    name: input.name.trim(),
    description: input.description.trim(),
    price: Number(input.price),
    image: input.image.trim(),
    categorySlug: category.slug,
    categoryName: category.name,
    stock: Number(input.stock),
    featured: input.featured,
    active: input.active,
    createdAt: new Date().toISOString()
  };

  if (isSupabaseEnabled()) {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('products').insert({
      id: newProduct.id,
      slug: newProduct.slug,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      image: newProduct.image,
      category_slug: newProduct.categorySlug,
      category_name: newProduct.categoryName,
      stock: newProduct.stock,
      featured: newProduct.featured,
      active: newProduct.active,
      created_at: newProduct.createdAt
    });
    if (error) throw new Error(`No se pudo crear el producto en Supabase: ${error.message}`);
    return newProduct;
  }

  products.unshift(newProduct);
  await writeJsonFile(productsFile, products);
  return newProduct;
}

export async function updateProduct(id: string, input: ProductInput) {
  const categories = await getAllCategories();
  const products = await getAllProducts();
  const category = categories.find((item) => item.slug === input.categorySlug);
  const productIndex = products.findIndex((item) => item.id === id);
  if (!category) throw new Error('Categoría no válida.');
  if (productIndex === -1) throw new Error('Producto no encontrado.');

  const current = products[productIndex];
  const nextSlugBase = slugify(input.name);
  const otherSlugs = new Set(products.filter((item) => item.id !== id).map((item) => item.slug));
  let slug = nextSlugBase;
  let counter = 2;
  while (otherSlugs.has(slug)) {
    slug = `${nextSlugBase}-${counter}`;
    counter += 1;
  }

  const nextProduct: Product = {
    ...current,
    slug,
    name: input.name.trim(),
    description: input.description.trim(),
    price: Number(input.price),
    image: input.image.trim(),
    categorySlug: category.slug,
    categoryName: category.name,
    stock: Number(input.stock),
    featured: input.featured,
    active: input.active
  };

  if (isSupabaseEnabled()) {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('products').update({
      slug: nextProduct.slug,
      name: nextProduct.name,
      description: nextProduct.description,
      price: nextProduct.price,
      image: nextProduct.image,
      category_slug: nextProduct.categorySlug,
      category_name: nextProduct.categoryName,
      stock: nextProduct.stock,
      featured: nextProduct.featured,
      active: nextProduct.active
    }).eq('id', id);
    if (error) throw new Error(`No se pudo actualizar el producto en Supabase: ${error.message}`);
    return nextProduct;
  }

  products[productIndex] = nextProduct;
  await writeJsonFile(productsFile, products);
  return nextProduct;
}

export async function deleteProduct(id: string) {
  if (isSupabaseEnabled()) {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw new Error(`No se pudo eliminar el producto en Supabase: ${error.message}`);
    return;
  }

  const products = await getAllProducts();
  const filtered = products.filter((product) => product.id !== id);
  await writeJsonFile(productsFile, filtered);
}

export async function toggleProductActive(id: string) {
  const products = await getAllProducts();
  const productIndex = products.findIndex((item) => item.id === id);
  if (productIndex === -1) throw new Error('Producto no encontrado.');
  const nextValue = !products[productIndex].active;

  if (isSupabaseEnabled()) {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('products').update({ active: nextValue }).eq('id', id);
    if (error) throw new Error(`No se pudo cambiar el estado del producto en Supabase: ${error.message}`);
    return;
  }

  products[productIndex].active = nextValue;
  await writeJsonFile(productsFile, products);
}

export async function toggleProductFeatured(id: string) {
  const products = await getAllProducts();
  const productIndex = products.findIndex((item) => item.id === id);
  if (productIndex === -1) throw new Error('Producto no encontrado.');
  const nextValue = !products[productIndex].featured;

  if (isSupabaseEnabled()) {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('products').update({ featured: nextValue }).eq('id', id);
    if (error) throw new Error(`No se pudo cambiar el destacado del producto en Supabase: ${error.message}`);
    return;
  }

  products[productIndex].featured = nextValue;
  await writeJsonFile(productsFile, products);
}
