import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, UserCheck, Mail, Package, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Customers', href: '/admin/customers', icon: UserCheck },
  { name: 'Campaigns', href: '/admin/campaigns', icon: Mail },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:w-64 md:overflow-y-auto md:bg-gray-900 md:text-white md:flex md:flex-col">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 bg-gray-800">
          <h1 className="text-lg font-bold">Moris Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
