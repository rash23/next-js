import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Title } from '../common/title';
import Link from 'next/link';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: FC<Props> = ({ id, name, price, imageUrl, className }) => {
  return (
    <div className={cn(className)}>
      <Link href={`/product/${id}`}>
        <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
          <img className='w-[215px] h-[215px]' src={imageUrl} alt={name} />
        </div>

        <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

        <p className='text-sm text-gray-400'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae laboriosam laudantium ex similique, nam odio obcaecati omnis!
          Rem quo velit unde recusandae temporibus nisi aperiam laborum, molestiae ullam saepe laudantium.
        </p>

        <div className='flex justify-between items-center mt-4'>
          <span className='text-[20px]'>
            від <b>{price} грн</b>
          </span>

          <Button variant='secondary' className='text-base font-bold'>
            <Plus className='w-5 h-5 mr-1' />
            Добавити
          </Button>
        </div>
      </Link>
    </div>
  );
};
