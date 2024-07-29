'use client';

import { FC } from 'react';
import { Input, RangeSlider } from '@/components/ui';
import { CheckboxFiltersGroup, Title } from '@/components/shared';
import { useIngredients, useFilters, useQueryFilters } from '@/hooks';

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ text: item.name, value: item.id.toString() }));

  const updatePrices = (prices: [number, number]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text='Фільтр' size='sm' className='mb-5 font-bold pb-4 border-b border-b-neutral-100' />
      <div className='flex flex-col gap-4'>
        <CheckboxFiltersGroup
          name='pizzaTypes'
          className='mb-5'
          title='Тип тіста'
          onClickCheckbox={filters.setPizzaTypes}
          selected={filters.pizzaTypes}
          items={[
            { text: 'Тонке', value: '1' },
            { text: 'Традиційне', value: '2' },
          ]}
        />

        <CheckboxFiltersGroup
          name='sizes'
          className='mb-5'
          title='Розмір'
          onClickCheckbox={filters.setSizes}
          selected={filters.sizes}
          items={[
            { text: '20 см', value: '20' },
            { text: '30 см', value: '30' },
            { text: '40 см', value: '40' },
          ]}
        />
      </div>
      <div className='mt-5 border-y border-y-neutral-100 py-6 p-b-7'>
        <p className='font-bold mb-3'>Ціна від і до:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom) || '0'}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type='number'
            min={100}
            max={1000}
            placeholder='1000'
            value={String(filters.prices.priceTo) || '1000'}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => updatePrices([priceFrom, priceTo])}
        />
      </div>

      <CheckboxFiltersGroup
        name='ingredients'
        className='mt-5'
        title='Інгредієнти'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
