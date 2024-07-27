import { prisma } from './prisma-client';
import { categories, ingredients, products } from './constants';
import { hashSync } from 'bcrypt';
import { Prisma } from '@prisma/client';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({ productId, type, size }: { productId: number; type?: number; size?: number }) => {
  return {
    productId,
    price: randomNumber(190, 600),
    type,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  // Create a user
  await prisma.user.createMany({
    data: [
      {
        fullName: 'test',
        email: 'test1@gmail.com',
        password: hashSync('test', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'admin',
        email: 'admin@gmail.com',
        password: hashSync('admin', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  // Create categories
  await prisma.category.createMany({
    data: categories,
  });

  // Create ingredients
  await prisma.ingredient.createMany({
    data: ingredients,
  });

  // Create products
  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепероні фреш',
      imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сирна',
      imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чорізо фреш',
      imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 15),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Піцца "Пепероні фреш"
      generateProductItem({ productId: pizza1.id, type: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, type: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, type: 2, size: 40 }),

      // Піцца "Сирна"
      generateProductItem({ productId: pizza2.id, type: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, type: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, type: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, type: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, type: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, type: 2, size: 40 }),

      // Піцца "Чорізо фреш"
      generateProductItem({ productId: pizza3.id, type: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, type: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, type: 2, size: 40 }),

      // Додаткові товари
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '22222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      userId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
