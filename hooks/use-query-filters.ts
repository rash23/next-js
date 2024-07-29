import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useIngredients } from './use-ingredients';
import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';
import qs from 'qs';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  const params = {
    ...filters.prices,
    pizzaTypes: Array.from(filters.pizzaTypes),
    sizes: Array.from(filters.sizes),
    selectedIngredients: Array.from(filters.selectedIngredients),
  };

  useEffect(() => {
    const query = qs.stringify(params, { arrayFormat: 'comma' });

    router.push(`?${query}`, { scroll: false });
  }, [filters]);
};
