import { prisma } from '@/prisma/prisma-client';
import { CreateCartItemValues } from '@/shared/lib/dto/cart.dto';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-item-amount';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    return NextResponse.json({ message: '[CART_GET] Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    let userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredientsIds } } },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredientsIds?.map((id) => ({ id })) },
        },
      });
    }
    const updatedCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: '[CART_POST] Server error' }, { status: 500 });
  }
}
