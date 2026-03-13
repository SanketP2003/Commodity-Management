'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ProductFormData, Product } from '@/types/product';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ROUTES } from '@/lib/constants';

// Use string types for number fields to avoid zod v4 coerce type issues with react-hook-form
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().min(1, 'Unit is required'),
  price: z.string().min(1, 'Price is required'),
  supplier: z.string().min(1, 'Supplier is required'),
});

type RawFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  defaultValues?: Partial<Product>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isEdit?: boolean;
}

const CATEGORIES = ['Grains', 'Metals', 'Energy', 'Agriculture', 'Livestock', 'Soft Commodities', 'Other'];
const UNITS = ['kg', 'ton', 'lb', 'barrel', 'bushel', 'unit', 'liter'];

export default function ProductForm({ defaultValues, onSubmit, isEdit = false }: ProductFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RawFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues
      ? {
          name: defaultValues.name || '',
          description: defaultValues.description || '',
          category: defaultValues.category || '',
          quantity: String(defaultValues.quantity ?? 0),
          unit: defaultValues.unit || '',
          price: String(defaultValues.price ?? 0),
          supplier: defaultValues.supplier || '',
        }
      : undefined,
  });

  const handleFormSubmit = async (raw: RawFormData) => {
    await onSubmit({
      name: raw.name,
      description: raw.description,
      category: raw.category,
      quantity: parseFloat(raw.quantity) || 0,
      unit: raw.unit,
      price: parseFloat(raw.price) || 0,
      supplier: raw.supplier,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => router.push(ROUTES.PRODUCTS)}
            className="!p-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isEdit ? 'Update the product details below' : 'Fill in the details to add a new commodity'}
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Input
              label="Product Name"
              placeholder="e.g. Premium Wheat"
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          <div className="md:col-span-2">
            <Input
              label="Description"
              placeholder="Brief description of the commodity"
              error={errors.description?.message}
              {...register('description')}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              className={`w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors
                ${errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              {...register('category')}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-red-500 dark:text-red-400">{errors.category.message}</p>
            )}
          </div>

          <Input
            label="Supplier"
            placeholder="e.g. Global Grains Ltd."
            error={errors.supplier?.message}
            {...register('supplier')}
          />

          <Input
            label="Quantity"
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            error={errors.quantity?.message}
            {...register('quantity')}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Unit</label>
            <select
              className={`w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors
                ${errors.unit ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              {...register('unit')}
            >
              <option value="">Select a unit</option>
              {UNITS.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            {errors.unit && (
              <p className="text-xs text-red-500 dark:text-red-400">{errors.unit.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Input
              label="Price (USD)"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              error={errors.price?.message}
              {...register('price')}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push(ROUTES.PRODUCTS)}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isSubmitting ? (isEdit ? 'Saving…' : 'Adding…') : (isEdit ? 'Save Changes' : 'Add Product')}
          </Button>
        </div>
      </div>
    </form>
  );
}
