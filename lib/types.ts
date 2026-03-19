export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  categorySlug: string;
  categoryName: string;
  stock: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
};

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  image: string;
  categorySlug: string;
  stock: number;
  featured: boolean;
  active: boolean;
};
