import { Role } from '@/types/auth';

export const ROLES = {
  MANAGER: 'MANAGER' as Role,
  STORE_KEEPER: 'STORE_KEEPER' as Role,
};

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  ADD_PRODUCT: '/products/new',
  VIEW_PRODUCT: (id: string) => `/products/${id}/details`,
  EDIT_PRODUCT: (id: string) => `/products/${id}`,
};

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
    roles: [ROLES.MANAGER] as Role[],
  },
  {
    label: 'Products',
    href: ROUTES.PRODUCTS,
    icon: 'Package',
    roles: [ROLES.MANAGER, ROLES.STORE_KEEPER] as Role[],
  },
  {
    label: 'Add Product',
    href: ROUTES.ADD_PRODUCT,
    icon: 'PlusCircle',
    roles: [ROLES.MANAGER, ROLES.STORE_KEEPER] as Role[],
  },
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

