'use client';

import { useState, useEffect } from 'react';

export interface Transaction {
  username: string;
  count_transactions: number;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://45.64.99.242:9116/users', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const formattedTransactions = data.data.map((user: any) => ({
          username: user.username,
          count_transactions: user.count_transactions,
        }));

        setTransactions(formattedTransactions);
        const total = formattedTransactions.reduce((acc: number, curr: Transaction) => acc + curr.count_transactions, 0);
        setTotalRevenue(total);
        setError(null);
        setLoading(false);
      } catch (err: any) { // Type assertion untuk menghindari error type
        if (err.name !== 'AbortError') {
          setError('Failed to fetch transactions. Please try again later.');
          setTransactions([]);
          setTotalRevenue(0);
          setLoading(false);
        }
      }
    };

    fetchTransactions();

    return () => {
      abortController.abort();
    };
  }, []);

  return { transactions, totalRevenue, loading, error };
}