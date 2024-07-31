import { cn } from '@/shared/lib/utils';
import { Ingredient as IIngredient } from '@prisma/client';
import { Ingredient } from './ingredient';
import { FC } from 'react';

interface Props {
  onClickAdd: (id: number) => void;
  ingredients: IIngredient[];
  selectedIds: Set<number>;
  className?: string;
}

export const IngredientsList: FC<Props> = ({ ingredients, selectedIds, onClickAdd, className }) => {
  return (
    <div className={cn('grid grid-cols-3 gap-3', className)}>
      {ingredients.map((item) => (
        <Ingredient
          onClick={() => onClickAdd(item.id)}
          key={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          price={item.price}
          active={selectedIds.has(item.id)}
        />
      ))}
    </div>
  );
};