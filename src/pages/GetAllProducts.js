import { useQuery } from 'react-query';
import { Spinner } from '../components';
import { Card } from '../components/Products/Card';
import authFetch from '../config/axios';
import { useState } from 'react';

const fetchProducts = async () => {
  const { data } = await authFetch('/all-products');
  return data;
};

export const GetAllProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useQuery('allProducts', fetchProducts);

  const [filteredProducts, setFilteredProducts] = useState(data || []);

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredProducts(data || []);
    } else {
      const filtered = data.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="px-4 py-3 border border-gray-300 rounded-md w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-primary-500"
            style={{ maxWidth: '340px' }}
          />
        </div>

        <div className="grid md:grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
          {(searchQuery === '' ? data : filteredProducts).map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
