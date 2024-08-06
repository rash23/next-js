import { FC } from 'react';
import { CartDrawer } from './cart-drawer';
import { Button } from '@/shared/components/ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store';

interface Props {
  className?: string;
}

export const CartButton: FC<Props> = ({ className }) => {
  const { totalAmount, items, loading } = useCartStore((state) => state);

  return (
    <CartDrawer>
      <Button loading={loading} className={cn('group relative', { 'w-[105px]': loading }, className)}>
        <b>{totalAmount}</b>
        <span className='h-full w-[1px] bg-white/30 mx-3' />
        <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
          <ShoppingCart className='h-4 w-4 relative' strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight className='w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0' />
      </Button>
    </CartDrawer>
  );
};