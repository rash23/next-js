'use client';

import { useState } from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input, Skeleton } from '@/components/ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  selectedIds?: Set<string>;
  onClickCheckbox?: (value: string) => void;
  loading?: boolean;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Пошук...',
  className,
  selectedIds,
  onClickCheckbox,
  loading,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const filteredItems = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : defaultItems?.slice(0, limit) ?? [];

  if (loading) {
    return (
      <div className={className}>
        <p className='font-bold mb-3'>{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />)}
           <Skeleton className='w-28 h-6 mb-5 rounded-[8px]' />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className='font-bold mb-3'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' onChange={onChangeSearchInput} />
        </div>
      )}

      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
        {filteredItems.map((item) => (
          <FilterCheckbox
            key={String(item.value)}
            text={item.text}
            value={item.value}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selectedIds?.has(item.value)}
            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
            {showAll ? 'Приховати' : '+ Показати все'}
          </button>
        </div>
      )}
    </div>
  );
};
