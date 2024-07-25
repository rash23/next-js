import { TopBar, Container, Title } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className='mt-10'>
        <Title text='Всі піцци' size='lg' className='font-extrabold' />
      </Container>

      <TopBar />
      <div style={{ height: 3000 }}></div>
    </>
  );
}
