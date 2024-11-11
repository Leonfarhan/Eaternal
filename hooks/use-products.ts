'use client';

import { useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  count_sold: number;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://45.64.99.242:9116/brands', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setProducts(data.data);
          setTotalProducts(data.data.length);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch products. Please try again later.');
          setProducts([]);
          setTotalProducts(0);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, totalProducts, loading, error };
}