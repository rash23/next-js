'use client';

import { FC } from 'react';

import { Input, RangeSlider } from '@/components/ui';
import { CheckboxFiltersGroup, FilterCheckbox, Title } from '@/components/shared';

interface Props {
  className?: string;
}

const data = [
  { text: 'Помідори', value: '1' },
  { text: 'Сир', value: '2' },
  { text: 'Ковбаса', value: '3' },
  { text: 'Гриби', value: '4' },
  { text: 'Огірки', value: '5' },
  { text: 'Папероні', value: '6' },
  {
    text: 'Шинка',
    value: '7',
  },
  {
    text: 'Курка',
    value: '8',
  },
  {
    text: 'Креветки',
    value: '9',
  },
  {
    text: 'Соус',
    value: '10',
  },
];

export const Filters: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text='Фільтр' size='sm' className='mb-5 font-bold pb-4 border-b border-b-neutral-100' />
      <div className='flex flex-col gap-4'>
        <FilterCheckbox text='Можна збирати' value='1' />
        <FilterCheckbox text='Новинки' value='2' />
      </div>
      <div className='mt-5 border-y border-y-neutral-100 py-6 p-b-7'>
        <p className='font-bold mb-3'>Ціна від і до:</p>
        <div className='flex gap-3 mb-5'>
          <Input type='number' placeholder='0' min={0} max={30000} />
          <Input type='number' min={100} max={30000} placeholder='30000' />
        </div>

        <RangeSlider min={0} max={1000} step={10} />
      </div>

      <CheckboxFiltersGroup name='ingredients' className='mt-5' title='Інгредієнти' limit={4} defaultItems={data} items={data} />
    </div>
  );
};
