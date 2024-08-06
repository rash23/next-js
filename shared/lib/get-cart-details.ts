import { calcCartItemTotalAmount } from './calc-cart-item-total-amount';

import { CartDTO } from './dto/cart.dto';
export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  type?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

type ReturnProps = {
  items: CartStateItem[];
  totalAmount: number;
};

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items: CartStateItem[] = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalAmount(item),
    pizzaSize: item.productItem.size,
    type: item.productItem.type,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return { items, totalAmount: data.totalAmount || 0 };
};
