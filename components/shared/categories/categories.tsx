'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';

import React, { FC, use } from 'react';

interface Props {
  //   items: Category[];
  className?: string;
}

const items = [
  {
    id: 1,
    name: 'Пицца',
  },
  {
    id: 2,
    name: 'Суши',
  },
  {
    id: 3,
    name: 'Роллы',
  },
  {
    id: 4,
    name: 'Бургеры',
  },
  {
    id: 5,
    name: 'Салаты',
  },
  {
    id: 6,
    name: 'Десерты',
  },
  {
    id: 7,
    name: 'Напитки',
  },
];

export const Categories: FC<Props> = ({ className }) => {
  const activeId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map((category) => (
        <a
          key={category.id}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeId === category.id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          href={`/#${category.name}`}
        >
          {category.name}
        </a>
      ))}
    </div>
  );
};
