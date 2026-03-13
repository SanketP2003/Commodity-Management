'use client';

import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import ProductForm from '@/components/products/ProductForm';
import { useRequireRole } from '@/hooks/useRequireRole';
import { ADD_PRODUCT_MUTATION } from '@/graphql/mutations/addProduct';
import { GET_PRODUCTS_QUERY } from '@/graphql/queries/getProducts';
import { ProductFormData } from '@/types/product';
import { ROUTES } from '@/lib/constants';

export default function NewProductPage() {
  const { isLoading: authLoading } = useRequireRole();
  const router = useRouter();
  const [addProduct] = useMutation(ADD_PRODUCT_MUTATION, {
    refetchQueries: [{ query: GET_PRODUCTS_QUERY }],
  });

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (data: ProductFormData) => {
    await addProduct({ variables: data });
    router.push(ROUTES.PRODUCTS);
  };

  return (
    <AppShell title="Add Product">
      <div className="max-w-3xl mx-auto">
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </AppShell>
  );
}

