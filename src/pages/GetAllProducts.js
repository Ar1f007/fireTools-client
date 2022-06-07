import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Spinner } from '../components';
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
            <Link
              key={product._id}
              to={`/products/details/${product._id}`}
              className="block border-2 shadow-lg p-4"
            >
              <img
                alt="Trainer Product"
                src={product.image}
                className="object-cover w-full -mt-3 h-96"
              />

              <h5 className="mt-4 text-sm text-black/90">{product.name}r</h5>

              <div className="flex items-center justify-between mt-4 font-bold">
                <p className="text-lg">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
