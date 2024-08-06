'use client';

import { FC } from 'react';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductForm, ChoosePizzaForm } from '@/shared/components/shared';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface Props {
  product: ProductWithRelations;
}

export const ChooseProductModal: FC<Props> = ({ product }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.type);

  const { addCartItem, loading } = useCartStore((state) => state);

  const closeModal = () => {
    router.back();
  };

  const handleAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({
        productItemId,
        ingredients,
      });
      toast.success('Піцца успішно додана в корзину');
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('Помилка при додаванні товару в корзину');
    }
  };

  const handleAddProduct = async () => {
    try {
      await addCartItem({
        productItemId: firstItem.id,
      });
      toast.success('Товар успішно додана в корзину');
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('Помилка при додаванні товару в корзину');
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={closeModal}>
      <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        {isPizzaForm ? (
          <ChoosePizzaForm
            name={product.name}
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={handleAddPizza}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            name={product.name}
            imageUrl={product.imageUrl}
            price={firstItem.price}
            onSubmit={handleAddProduct}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
