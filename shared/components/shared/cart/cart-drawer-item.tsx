import { cn } from '@/shared/lib/utils';
import React, { FC } from 'react';
import { CountButton } from '../cart-item-details';
import * as CartItemDetails from '../cart-item-details';
import { CartItemProps } from '../cart-item-details/cart-item-details.types';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
  className?: string;
  onClickCountButton: (type: 'plus' | 'minus') => void;
  onClickRemoveButton: () => void;
}

export const CartDrawerItem: FC<Props> = ({
  imageUrl,
  name,
  price,
  details,
  quantity,
  className,
  onClickCountButton,
  onClickRemoveButton,
}) => {
  return (
    <div className={cn('flex bg-white p-5 gap-6', className)}>
      <CartItemDetails.Image src={imageUrl} />

      <div className='flex-1'>
        <CartItemDetails.Info name={name} details={details} />
        <hr className='my-3' />

        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className='flex items-center gap-3'>
            <CartItemDetails.Price value={price} />

            <Trash2Icon onClick={onClickRemoveButton} className='text-gray-400 cursor-pointer hover:text-gray-600' size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
