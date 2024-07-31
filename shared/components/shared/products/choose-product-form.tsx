'use client';

import { cn } from '@/shared/lib/utils';
import { FC } from 'react';
import { Title } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: FC<Props> = ({ name, imageUrl, onClickAdd, className }) => {
  const totalPrice = 33;
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <img src={imageUrl} alt={name} className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]' />
      </div>
      <div className='w-[490px] bg-[#FCFCFC] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />

        <p className='text-gray-400'></p>

        <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'></div>

        <Button className='h-[55px] px-10 text-base rounded-[18px] w-full' onClick={onClickAdd}>
          Додати до кошика {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
