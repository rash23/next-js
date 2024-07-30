'use client';

import { FC } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductForm, ChoosePizzaForm } from '@/components/shared';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  product: ProductWithRelations;
}

export const ChooseProductModal: FC<Props> = ({ product }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].type);

  const onCloseModal = () => {
    router.back();
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
      <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        {isPizzaForm ? (
          <ChoosePizzaForm name={product.name} imageUrl={product.imageUrl} ingredients={[]} />
        ) : (
          <ChooseProductForm name={product.name} imageUrl={product.imageUrl} />
        )}
      </DialogContent>
    </Dialog>
  );
};
