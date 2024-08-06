import { useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { ProductWithRelations } from '@/@types/prisma';
import { PizzaSize, PizzaSizeItem, PizzaType, pizzaDetailsToText, pizzaSizes } from '@/shared/constants/pizza';

export const useChoosePizza = (items?: ProductWithRelations['items']) => {
  const [selectedIngredientsIds, { toggle: toggleAddIngredient }] = useSet<number>(new Set([]));

  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const activeSizes = items?.filter((item) => item.type === type).map((item) => item.size);
  const productItem = items?.find((item) => item.type === type && item.size === Number(size));

  const isActiveSize = (value: number | string) => {
    return activeSizes?.some((activeSize) => activeSize === Number(value));
  };

  const currentItemId = productItem?.id;

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
    size,
    type,
    selectedIngredientsIds,
    toggleAddIngredient,
    currentItemId,
  };
};
