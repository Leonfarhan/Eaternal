'use client';

import { useState, useEffect } from 'react';

export interface Transaction {
  id: number;
  username: string;
  count_transactions: number;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://45.64.99.242:9116/users', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data.data);
        const total = data.data.reduce(
          (acc: number, curr: Transaction) => acc + curr.count_transactions,
          0
        );
        setTotalRevenue(total);
        setError(null);
      } catch (err) {
        setError('Failed to fetch transactions. Please try again later.');
        setTransactions([]);
        setTotalRevenue(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, totalRevenue, loading, error };
}