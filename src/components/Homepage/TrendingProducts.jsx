import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ToolCard } from './ToolCard';
import { Spinner } from '../../components';
import authFetch from '../../config/axios';

const fetchData = async () => {
  const { data } = await authFetch('/orders/top-ordered-products');

  return data;
};

export const TrendingProducts = () => {
  const { data, isLoading } = useQuery('trendingProducts', fetchData);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="py-10 lg:py-20" id="products">
      <h2 className="text-4xl text-center font-bold text-neutral dark:text-gray-200">
        Trending Products
      </h2>

      <section className="px-4 mt-12 lg:mt-16 max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center place-content-center place-items-center">
        {data?.map((item) => (
          <ToolCard key={item._id} item={item} />
        ))}
      </section>
      <div className="flex justify-center mt-16">
        <Link to="/products" className="btn btn-secondary">
          View All Products
        </Link>
      </div>
    </section>
  );
};
