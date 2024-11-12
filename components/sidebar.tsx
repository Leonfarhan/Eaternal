'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Package, ScrollText } from 'lucide-react';

const routes = [
  {
    label: 'Transactions',
    icon: ScrollText,
    href: '/',
    color: "text-sky-500"
  },
  {
    label: 'Products',
    icon: Package,
    href: '/products',
    color: "text-violet-500"
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gradient-to-b from-[rgba(20,136,204,1)] to-[rgba(43,50,178,1)] text-white">
      <div className="px-3 py-2 flex-1">
        <div className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">
            Eaternal
          </h1>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "bg-white/10" : ""
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-10 h-auto p-1.5 bg-white rounded-full mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}