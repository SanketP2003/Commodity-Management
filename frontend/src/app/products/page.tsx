'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Search, RefreshCw } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import ProductsTable from '@/components/products/ProductsTable';
import Button from '@/components/ui/Button';
import { useRequireRole } from '@/hooks/useRequireRole';
import { GET_PRODUCTS_QUERY } from '@/graphql/queries/getProducts';
import { DELETE_PRODUCT_MUTATION } from '@/graphql/mutations/deleteProduct';
import { Product } from '@/types/product';
import { ROUTES } from '@/lib/constants';

export default function ProductsPage() {
  const { isLoading: authLoading } = useRequireRole();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(0);

  const { data, loading, error, refetch } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS_QUERY
  );

  const [deleteProduct, { loading: deleting }] = useMutation(DELETE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: GET_PRODUCTS_QUERY }],
  });

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const products = data?.products || [];

  const pageSize = 10;

  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  const filtered = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.supplier.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const paged = filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handleDelete = async (id: string) => {
    const toDelete = products.find((p) => p.id === id);
    const name = toDelete?.name || 'this product';
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    await deleteProduct({ variables: { id } });
    setPage(0);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setPage(0);
  };

  return (
    <AppShell title="Products">
      <div className="space-y-5">
        {/* Header actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Products</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {products.length} total commodities
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => refetch()}
              className="!p-2"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => router.push(ROUTES.ADD_PRODUCT)}
            >
              <PlusCircle className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products, suppliers…"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400 font-medium mb-3">Failed to load products</p>
            <Button variant="secondary" size="sm" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4" /> Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <ProductsTable products={paged} onDelete={handleDelete} />
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                Showing {paged.length ? currentPage * pageSize + 1 : 0}–
                {Math.min((currentPage + 1) * pageSize, filtered.length)} of {filtered.length}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === 0 || deleting}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Previous
                </Button>
                <span className="px-2">Page {currentPage + 1} / {totalPages}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage >= totalPages - 1 || deleting}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

