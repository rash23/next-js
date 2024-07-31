'use client';

import { cn } from '@/shared/lib/utils';
import { FC, useState } from 'react';
import { PizzaImage, PizzaSelector, Title, IngredientsList } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { ProductWithRelations } from '@/@types/prisma';
import { useChoosePizza } from '@/shared/hooks';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: ProductWithRelations['ingredients'];
  items?: ProductWithRelations['items'];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: FC<Props> = ({ name, items, imageUrl, ingredients, onClickAddCart, className }) => {
  const {
    size,
    type,
    availablePizzaSizes,
    setPizzaSize,
    setPizzaType,
    textDetails,
    loading,
    addPizza,
    selectedIngredientsIds,
    toggleAddIngredient,
  } = useChoosePizza(items);

  const totalIngredientPrice: number =
    ingredients?.filter((ingredient) => selectedIngredientsIds.has(ingredient.id))?.reduce((acc, item) => acc + item.price, 0) || 0;

  const pizzaPrice: number = items?.find((item) => item.size === size && item.type === type)?.price || 0;
  const totalPrice: number = totalIngredientPrice + pizzaPrice;

  const handleClickAdd = async () => {
    try {
      await addPizza();
      onClickAddCart?.();
      console.log({
        size,
        type,
        ingredients: selectedIngredientsIds,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className='w-[490px] bg-[#FCFCFC] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />

        <p className='text-gray-400'>{textDetails}</p>

        <PizzaSelector
          pizzaSizes={availablePizzaSizes}
          selectedSize={String(size)}
          selectedPizzaType={String(type)}
          onClickSize={setPizzaSize}
          onClickPizzaType={setPizzaType}
        />

        <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
          <IngredientsList ingredients={ingredients} onClickAdd={toggleAddIngredient} selectedIds={selectedIngredientsIds} />
        </div>

        <Button loading={loading} className='h-[55px] px-10 text-base rounded-[18px] w-full' onClick={handleClickAdd}>
          Додати до кошика {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
