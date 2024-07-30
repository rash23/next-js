import { Container, GroupVariants, ProductImage, ProductsGroupList, Title } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

interface Params {
  id: string;
}

export default async function ProductPage({ params: { id } }: { params: Params }) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          product: {
            include: {
              items: true,
            },
          },
        },
      },
    },
  });

  if (!product) return notFound();

  return (
    <Container className='flex flex-col my-10'>
      <div className='flex flex-1'>
        <ProductImage imageUrl={product.imageUrl} size={30} />
        <div className='w-[490px] bg-[#FCFCFC] p-7'>
          <Title text={product.name} size='md' className='font-extrabold mb-1' />

          <p className='text-gray-400'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In dicta sed itaque dignissimos, accusamus cumque quod eveniet officia
            ipsum quas adipisci quis a, ea nostrum? Nam quidem consequuntur placeat architecto?
          </p>

          <div>
            <div className='flex flex-col gap-3 mt-5 mb-8'>
              <GroupVariants
              selectedValue='1'
                items={[
                  {
                    name: 'Маленька',
                    value: '1',
                  },
                  {
                    name: 'Середня',
                    value: '2',
                  },
                  {
                    name: 'Велика',
                    value: '3',
                    disabled: true,
                  },
                ]}
              />
            </div>
            {/* 
            <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
              <IngredientsList ingredients={ingredients} onClickAdd={toggleAddIngredient} selectedIds={selectedIngredientsIds} />
            </div>

            <Button loading={loading} onClick={handleClickAdd} className='h-[55px] px-10 text-base rounded-[18px] w-full'>
              Добавить в корзину за {totalPrice} ₽
            </Button> */}
          </div>
        </div>
{/* 
        <ProductsGroupList
          className='mt-20'
          listClassName='grid-cols-4'
          key={product.category.id}
          title='Рекомендації'
          products={product.category.products}
          categoryId={product.category.id}
        /> */}
      </div>
    </Container>
  );
}
