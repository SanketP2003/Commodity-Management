"use client";

import { use } from 'react';
import { useQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import Button from '@/components/ui/Button';
import { useRequireRole } from '@/hooks/useRequireRole';
import { GET_PRODUCT_QUERY } from '@/graphql/queries/getProducts';
import { Product } from '@/types/product';
import { ROUTES } from '@/lib/constants';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const { isLoading: authLoading } = useRequireRole();
  const router = useRouter();

  const { data, loading, error } = useQuery<{ product: Product }>(GET_PRODUCT_QUERY, {
    variables: { id },
    skip: !id,
  });

  if (authLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data?.product) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
          <p className="text-red-600 dark:text-red-400 font-medium">Product not found.</p>
          <Button variant="secondary" onClick={() => router.push(ROUTES.PRODUCTS)}>Back to products</Button>
        </div>
      </div>
    );
  }

  const product = data.product;

  const infoRows: Array<[string, string | number]> = [
    ['Name', product.name],
    ['Description', product.description],
    ['Category', product.category],
    ['Quantity', `${product.quantity} ${product.unit}`],
    ['Price', `$${product.price.toFixed(2)}`],
    ['Supplier', product.supplier],
    ['Status', product.status.replace(/_/g, ' ')],
    ['Created', new Date(product.createdAt).toLocaleString()],
    ['Updated', new Date(product.updatedAt).toLocaleString()],
  ];

  return (
    <AppShell title="Product Details">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">ID: {product.id}</p>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{product.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => router.push(ROUTES.PRODUCTS)}>Back</Button>
            <Button onClick={() => router.push(ROUTES.EDIT_PRODUCT(product.id))}>Edit</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {infoRows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
