'use client';

import { use } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import ProductForm from '@/components/products/ProductForm';
import { useRequireRole } from '@/hooks/useRequireRole';
import { GET_PRODUCT_QUERY, GET_PRODUCTS_QUERY } from '@/graphql/queries/getProducts';
import { EDIT_PRODUCT_MUTATION } from '@/graphql/mutations/editProduct';
import { Product, ProductFormData } from '@/types/product';
import { ROUTES } from '@/lib/constants';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: PageProps) {
  const { id } = use(params);
  const { isLoading: authLoading } = useRequireRole();
  const router = useRouter();

  const { data, loading: productLoading } = useQuery<{ product: Product }>(GET_PRODUCT_QUERY, {
    variables: { id },
    skip: !id,
  });

  const [editProduct] = useMutation(EDIT_PRODUCT_MUTATION, {
    refetchQueries: [{ query: GET_PRODUCTS_QUERY }],
  });

  if (authLoading || productLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const product = data?.product;

  const handleSubmit = async (formData: ProductFormData) => {
    await editProduct({ variables: { id, ...formData } });
    router.push(ROUTES.PRODUCTS);
  };

  return (
    <AppShell title="Edit Product">
      <div className="max-w-3xl mx-auto">
        <ProductForm
          defaultValues={product}
          onSubmit={handleSubmit}
          isEdit
        />
      </div>
    </AppShell>
  );
}

