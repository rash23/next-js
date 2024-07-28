import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIngredients, { toggle: onAddId }] = useSet(new Set<string>([]));

  useEffect(() => {
    async function getIngredients() {
      try {
        setLoading(true);
        const data = await Api.ingredients.getAll();
        setIngredients(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getIngredients();
  }, []);

  return {
    ingredients,
    loading,
    selectedIngredients,
    onAddId,
  };
};
