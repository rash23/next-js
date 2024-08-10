import { TopBar, Container, Title, Filters, ProductsGroupList } from '@/shared/components/shared';
import { findPizzas } from '@/shared/lib';
import { Suspense } from 'react';
import { GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);
  
  return (
    <>
      <Container className='mt-10'>
        <Title text='Всі піцци' size='lg' className='font-extrabold' />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Container className='mt-10 pb-14'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList key={category.id} title={category.name} products={category.products} categoryId={category.id} />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
