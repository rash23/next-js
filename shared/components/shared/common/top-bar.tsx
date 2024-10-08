'use client';

import { cn } from '@/shared/lib/utils';
import React, { FC } from 'react';
import { Container, Categories, SortPopup } from '@/shared/components/shared';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: FC<Props> = ({ className, categories }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className='flex items-center justify-between '>
        <Categories items={categories} />
        <div className='flex items-center'>
          <SortPopup />
        </div>
      </Container>
    </div>
  );
};
