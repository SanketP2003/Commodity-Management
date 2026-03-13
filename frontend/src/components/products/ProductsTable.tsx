'use client';

import { useRouter } from 'next/navigation';
import { Edit2, Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Product } from '@/types/product';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

interface ProductsTableProps {
  products: Product[];
  onDelete?: (id: string) => void;
}

const statusConfig = {
  IN_STOCK: {
    label: 'In Stock',
    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    icon: CheckCircle,
  },
  LOW_STOCK: {
    label: 'Low Stock',
    className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    icon: AlertTriangle,
  },
  OUT_OF_STOCK: {
    label: 'Out of Stock',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    icon: XCircle,
  },
};

export default function ProductsTable({ products, onDelete }: ProductsTableProps) {
  const router = useRouter();

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📦</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No products found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Get started by adding your first product.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
            <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Product</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Category</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Quantity</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Price</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Supplier</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Status</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => {
            const status = statusConfig[product.status] || statusConfig.IN_STOCK;
            const StatusIcon = status.icon;
            return (
              <tr
                key={product.id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                    {product.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-xs">
                        {product.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {product.quantity} <span className="text-gray-400 text-xs">{product.unit}</span>
                </td>
                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap font-medium">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{product.supplier}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(ROUTES.EDIT_PRODUCT(product.id))}
                      className="!p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      title="Edit product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                        className="!p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

