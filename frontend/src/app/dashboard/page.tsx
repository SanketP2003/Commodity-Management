'use client';

import { useQuery } from '@apollo/client/react';
import {
  Package,
  AlertTriangle,
  XCircle,
  TrendingUp,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import StatsCard from '@/components/dashboard/StatsCard';
import { useRequireRole } from '@/hooks/useRequireRole';
import { GET_PRODUCTS_QUERY } from '@/graphql/queries/getProducts';
import { Product } from '@/types/product';

export default function DashboardPage() {
  const { isLoading: authLoading } = useRequireRole('MANAGER');
  const { data, loading: productsLoading, error } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS_QUERY
  );

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const products = data?.products || [];
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.status === 'IN_STOCK').length;
  const lowStockCount = products.filter((p) => p.status === 'LOW_STOCK').length;
  const outOfStockCount = products.filter((p) => p.status === 'OUT_OF_STOCK').length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const avgPrice = totalProducts > 0
    ? products.reduce((sum, p) => sum + p.price, 0) / totalProducts
    : 0;

  const categoryMap = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <AppShell title="Dashboard">
      {/* Overview */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Commodities Overview
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Real-time snapshot of your inventory
        </p>
      </div>

      {productsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 text-center">
          <p className="text-red-600 dark:text-red-400 text-sm font-medium">
            Failed to load statistics. Please try again.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            <StatsCard
              title="Total Products"
              value={totalProducts}
              subtitle={`${inStockCount} in stock`}
              icon={Package}
              color="indigo"
              trend={{ value: 12, label: 'vs last month' }}
            />
            <StatsCard
              title="Low Stock Items"
              value={lowStockCount}
              subtitle="Needs reordering"
              icon={AlertTriangle}
              color="amber"
            />
            <StatsCard
              title="Out of Stock"
              value={outOfStockCount}
              subtitle="Immediate action required"
              icon={XCircle}
              color="red"
            />
            <StatsCard
              title="Total Inventory Value"
              value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              subtitle="Across all products"
              icon={DollarSign}
              color="emerald"
              trend={{ value: 8, label: 'vs last month' }}
            />
            <StatsCard
              title="Average Price"
              value={`$${avgPrice.toFixed(2)}`}
              subtitle="Per unit average"
              icon={TrendingUp}
              color="indigo"
            />
            <StatsCard
              title="Top Category"
              value={topCategory}
              subtitle={`${categoryMap[topCategory] || 0} products`}
              icon={BarChart3}
              color="emerald"
            />
          </div>

          {/* Category breakdown table */}
          {Object.keys(categoryMap).length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Category Breakdown</h3>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  {Object.entries(categoryMap)
                    .sort((a, b) => b[1] - a[1])
                    .map(([cat, count]) => {
                      const pct = Math.round((count / totalProducts) * 100);
                      return (
                        <div key={cat}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AppShell>
  );
}

