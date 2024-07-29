import { TopBar, Container, Title, Filters, ProductCard, ProductsGroupList } from '@/components/shared';

export default function Home() {
  const products = [
    {
      id: 1,
      name: 'Маргарита',
      imageUrl:
        'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-a-popular-pizza-topping-in-american-style-pizzerias-isolated-on-white-background-still-life_639032-229.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721779200&semt=ais_user',
      items: [{ price: 99 }],
    },
    {
      id: 2,
      name: 'Пепероні',
      imageUrl: 'https://roll-club.kh.ua/wp-content/uploads/2021/06/pizza.jpg',
      items: [{ price: 119 }],
    },
    {
      id: 3,
      name: 'Гавайська',
      imageUrl: 'https://i.obozrevatel.com/food/recipemain/2019/2/17/vchchai.jpg?size=636x424',
      items: [{ price: 139 }],
    },
  ];

  return (
    <>
      <Container className='mt-10'>
        <Title text='Всі піцци' size='lg' className='font-extrabold' />
      </Container>

      <TopBar />
      <Container className='mt-10 pb-14'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Filters />
          </div>
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              <ProductsGroupList title='Піцца' products={products} categoryId={1} />
              <ProductsGroupList title='Суши' products={products} categoryId={2} />
            </div>

            <div className='flex items-center gap-6 mt-12'>
              <span className='text-sm text-gray-400'>5 из 65</span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
