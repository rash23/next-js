import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSet } from 'react-use';
import { ProductWithRelations } from '@/@types/prisma';
import { PizzaSize, PizzaSizeItem, PizzaType, pizzaDetailsToText, pizzaSizes } from '@/shared/constants/pizza';

export const useChoosePizza = (items?: ProductWithRelations['items']) => {
  const loading = false;
  const [selectedIngredientsIds, { toggle: toggleAddIngredient }] = useSet<number>(new Set([]));

  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const activeSizes = items?.filter((item) => item.type === type).map((item) => item.size);
  const productItem = items?.find((item) => item.type === type && item.size === Number(size));

  const isActiveSize = (value: number | string) => {
    return activeSizes?.some((activeSize) => activeSize === Number(value));
  };

  const availablePizzaSizes = pizzaSizes.map<PizzaSizeItem>((obj) => ({
    name: obj.name,
    value: obj.value,
    disabled: !isActiveSize(obj.value),
  }));

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (availableSize && !isAvailableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  const addPizza = async () => {
    if (productItem) {
      try {
        console.log('addPizza', {
          productItemId: productItem?.id,
          pizzaSize: size,
          type,
          ingredientsIds: Array.from(selectedIngredientsIds),
          quantity: 1,
        });

        toast.success('Товар успішно додана в корзину');
      } catch (error) {
        console.error(error);
        toast.error('Помилка при додаванні товару в корзину');
      }
    }
  };

  const setPizzaSize = (value: number | string) => {
    setSize(Number(value) as PizzaSize);
  };

  const setPizzaType = (value: number | string) => {
    setType(Number(value) as PizzaType);
  };

  const isSelectedIngredient = (id: number) => {
    return selectedIngredientsIds.has(id);
  };

  const textDetails = pizzaDetailsToText(size, type);

  return {
    availablePizzaSizes,
    setPizzaSize,
    setPizzaType,
    isActiveSize,
    textDetails,
    isSelectedIngredient,
    loading,
    size,
    type,
    addPizza,
    selectedIngredientsIds,
    toggleAddIngredient,
  };
};
