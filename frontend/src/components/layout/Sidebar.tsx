'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  LogOut,
  Boxes,
  LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { NAV_ITEMS } from '@/lib/constants';
import { Role } from '@/types/auth';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Package,
  PlusCircle,
};

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const filteredItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(user?.role as Role)
  );

  return (
    <aside className="flex flex-col h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-200 dark:border-gray-800">
        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Boxes className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-bold text-gray-900 dark:text-white text-sm">Slooze</span>
          <p className="text-xs text-gray-500 dark:text-gray-400">Commodities</p>
        </div>
      </div>
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-600 dark:text-indigo-300 text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name || 'User'}
            </p>
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
              user?.role === 'MANAGER'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
            }`}>
              {user?.role === 'MANAGER' ? 'Manager' : 'Store Keeper'}
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                ${isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150 cursor-pointer"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

