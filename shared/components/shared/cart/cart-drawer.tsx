'use client';

import Image from 'next/image';
import { Button } from '@/shared/components/ui';
import { Title } from '../common/title';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import { CartDrawerItem } from './cart-drawer-item';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { getCartItemDetails } from '@/shared/lib';

export const CartDrawer: FC<PropsWithChildren> = ({ children }) => {
  const [redirecting, setRedirecting] = useState(false);
  const totalAmount = 500;
  const loading = false;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <div className={clsx('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзині <span className='font-bold'>{5} товарів</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className='flex flex-col items-center justify-center w-72 mx-auto'>
              <Image src='/assets/images/empty-box.png' alt='Empty cart' width={120} height={120} />
              <Title size='sm' text='Корзина пустая' className='text-center font-bold my-2' />
              <p className='text-center text-neutral-500 mb-5'>Добавте товари</p>

              <SheetClose>
                <Button className='w-56 h-12 text-base' size='lg'>
                  <ArrowLeft className='w-5 mr-2' />
                  Назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className='-mx-6 mt-5 overflow-y-auto flex-1 scrollbar'>
                <div className='mb-2'>
                  <CartDrawerItem
                    id={1}
                    name={'Піца "Маргарита"'}
                    imageUrl={'/assets/images/pizza/margarita.png'}
                    price={50}
                    details={getCartItemDetails(1, 20, [
                      {
                        name: 'Сир моцарела',
                      },
                      {
                        name: 'Помідори',
                      },
                    ])}
                    quantity={1}
                  />
                </div>
              </div>

              <SheetFooter className='-mx-6 bg-white p-8'>
                <div className='w-full'>
                  <div className='flex mb-4'>
                    <span className='flex flex-1 text-lg text-neutral-500'>
                      Всього:
                      <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                    </span>

                    <span className='font-bold text-lg'>{totalAmount} ₴</span>
                  </div>

                  <Link href='/cart'>
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={loading || redirecting}
                      type='submit'
                      className='w-full h-12 text-base'
                    >
                      Оформити замовлення
                      <ArrowRight className='w-5 ml-2' />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
