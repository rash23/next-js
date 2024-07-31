import { cn } from '@/shared/lib/utils';
import { FC } from 'react';
import { GroupVariants } from './group-variants';
import { PizzaSizeItem, pizzaTypes } from '@/shared/constants/pizza';

interface Props {
  pizzaSizes: PizzaSizeItem[];

  selectedSize?: string;
  onClickSize: (value: string) => void;

  selectedPizzaType?: string;
  onClickPizzaType: (value: string) => void;

  className?: string;
}

export const PizzaSelector: FC<Props> = ({
  pizzaSizes,
  selectedSize = '20',
  selectedPizzaType = '1',
  onClickSize,
  onClickPizzaType,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-3 mt-5 mb-8', className)}>
      <GroupVariants defaultValue='20' items={pizzaSizes} onClick={onClickSize} selectedValue={selectedSize} />

      <GroupVariants defaultValue='1' items={pizzaTypes} onClick={onClickPizzaType} selectedValue={selectedPizzaType} />
    </div>
  );
};
