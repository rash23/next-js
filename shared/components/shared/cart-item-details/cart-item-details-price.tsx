import { cn } from '@/shared/lib/utils';
import { FC } from 'react';

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} ₴</h2>;
};
