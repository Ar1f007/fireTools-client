import { useQuery } from 'react-query';
import { Spinner } from '../components';
import { Card } from '../components/Products/Card';
import authFetch from '../config/axios';

const fetchProducts = async () => {
  const { data } = await authFetch('/products');
  return data;
};
export const GetAllProducts = () => {
  const { data, isLoading } = useQuery('products', fetchProducts);
  if (isLoading) return <Spinner />;
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div className="grid md:grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
          {data?.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
