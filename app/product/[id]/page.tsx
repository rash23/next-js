interface Params {
  id: string;
}

export default function ProductPage({ params: { id } }: { params: Params }) {
  return (
    <div>
      <h1>Product {id}</h1>
    </div>
  );
}
