export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
}

export interface ProductsResponse {
  products: Product[];
}

