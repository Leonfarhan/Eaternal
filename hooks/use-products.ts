'use client';

import { useState, useEffect } from 'react';

export interface Product {
  name: string;
  count_sold: number;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://45.64.99.242:9116/brands', {
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

        const formattedProducts = data.data.map((product: any) => ({
          name: product.name,
          count_sold: product.count_sold,
        }));

        setProducts(formattedProducts);
        setTotalProducts(formattedProducts.length);
        setError(null);
        setLoading(false);
      } catch (err: any) { // Type assertion untuk error handling
        if (err.name !== 'AbortError') {
          setError('Failed to fetch products. Please try again later.');
          setProducts([]);
          setTotalProducts(0);
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      abortController.abort();
    };
  }, []);

  return { products, totalProducts, loading, error };
}