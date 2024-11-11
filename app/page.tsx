'use client';

import { DollarSign } from 'lucide-react';
import { StatsCard } from '@/components/stats-card';
import { LineChart } from '@/components/charts/line-chart';
import { useTransactions } from '@/hooks/use-transactions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Progress} from "@/components/ui/progress";

export default function TransactionsPage() {
  const { transactions, totalRevenue, loading, error } = useTransactions();

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          <Card className="w-full h-[140px] animate-pulse bg-muted" />
            <Progress value={undefined} className="w-full h-10px" />
        </div>
        <Card className="w-full h-[500px] animate-pulse bg-muted" />
          <Progress value={undefined} className="w-full h-10px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
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
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <StatsCard
          title="Total Revenue"
          value={totalRevenue}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Transaction volume across all users
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[400px]">
              <LineChart
                data={transactions}
                xKey="username"
                yKey="count_transactions"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}