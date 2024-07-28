'use client';

import { FC, useEffect, useState } from 'react';

import { Input, RangeSlider } from '@/components/ui';
import { CheckboxFiltersGroup, FilterCheckbox, Title } from '@/components/shared';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();
  const [{ priceFrom, priceTo }, setPrice] = useState<PriceProps>({ priceFrom: 0, priceTo: 1000 });
  const items = ingredients.map((item) => ({ text: item.name, value: item.id.toString() }));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>());
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>());

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log({ priceFrom, priceTo, pizzaTypes, sizes, selectedIngredients });
  }, [priceFrom, priceTo, pizzaTypes, sizes, selectedIngredients]);
  return (
    <div className={className}>
      <Title text='Фільтр' size='sm' className='mb-5 font-bold pb-4 border-b border-b-neutral-100' />
      <div className='flex flex-col gap-4'>
        <CheckboxFiltersGroup
          name='pizzaTypes'
          className='mb-5'
          title='Тип тіста'
          onClickCheckbox={togglePizzaTypes}
          selected={pizzaTypes}
          items={[
            { text: 'Тонке', value: '1' },
            { text: 'Традиційне', value: '2' },
          ]}
        />

        <CheckboxFiltersGroup
          name='sizes'
          className='mb-5'
          title='Розмір'
          onClickCheckbox={toggleSizes}
          selected={sizes}
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
            value={String(priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type='number'
            min={100}
            max={1000}
            placeholder='1000'
            value={String(priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[priceFrom, priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
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
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
      />
    </div>
  );
};
