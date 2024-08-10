import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';
import qs from 'qs';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  const params = {
    ...filters.prices,
    pizzaTypes: Array.from(filters.pizzaTypes),
    sizes: Array.from(filters.sizes),
    selectedIngredients: Array.from(filters.ingredients),
  };

  useEffect(() => {
    const query = qs.stringify(params, { arrayFormat: 'comma' });

    router.push(`?${query}`, { scroll: false });
  }, [filters]);
};
