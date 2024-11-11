'use client';

import { Package } from 'lucide-react';
import { StatsCard } from '@/components/stats-card';
import { BarChart } from '@/components/charts/bar-chart';
import { useProducts } from '@/hooks/use-products';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProductsPage() {
  const { products, totalProducts, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          <Card className="w-full h-[140px] animate-pulse bg-muted" />
        </div>
        <Card className="w-full h-[500px] animate-pulse bg-muted" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        </div>
        <Card className="p-6">
          <div className="text-red-500">{error}</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Sales</CardTitle>
            <CardDescription>
              Number of units sold per product
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[400px]">
              <BarChart
                data={products}
                xKey="name"
                yKey="count_sold"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}