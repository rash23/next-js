import { FC } from 'react';

import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props {
  className?: string;
}

export const SortPopup: FC<Props> = ({ className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
          <ArrowUpDown className='w-4 h-4' />
          <b>Сортування:</b>

          <b className='text-primary'>Популярне</b>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[240px]'>
        <ul>
          <li className='hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md'>Спочатку популярні</li>
          <li className='hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md'>Спочатку недорогі</li>
          <li className='hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md'>Спочатку дорогі</li>
          <li className='hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md'>З найкращою оцінкою</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
