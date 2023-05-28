import { Link } from 'react-router-dom';
import cutShortText from '../../utils/cutShortText';
import getDiscountedPrice from '../../utils/discountedPrice';

export const ToolCard = ({ item }) => {
  const {
    _id,
    name,
    description,
    min_order_quantity,
    available_quantity,
    price,
    image,
    discount = 0,
  } = item;

  return (
    <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="bg-base-200 p-4 min-h-[18.75rem]">
        <img className="rounded w-full object-cover object-center" src={image} alt={name} />
      </div>
      <div className="flex items-center px-6 py-3 bg-gray-800">
        <h1 className="mx-3 text-lg font-semibold text-white">{name}</h1>
      </div>

      <div className="px-6 py-4">
        <p className="py-2 text-gray-700 dark:text-gray-400">{cutShortText(description)}. . .</p>

        <div className="flex items-center justify-between flex-wrap gap-2 mt-2 text-gray-700 dark:text-gray-200">
          <div className="badge badge-outline">
            <span className="ml-1 font-medium">
              {/* ${price.toFixed(2)} / <span className="text-sm">unit</span> */}
              {discount > 0 ? <s>${price.toFixed(2)}</s> : <>${price.toFixed(2)}</>}
              {discount > 0 && <>&nbsp;{getDiscountedPrice(price, discount)}</>} /&nbsp;
              <span className="text-sm">unit</span>
            </span>
          </div>
          <div className="badge badge-outline">
            Available <span className="hidden xl:inline-block">&nbsp;quantity</span>:{' '}
            <span className="font-medium ml-1"> {available_quantity}</span>
          </div>
        </div>

        <div className="badge badge-outline flex items-center mt-2 text-gray-700 dark:text-gray-200">
          Minimum order <span className="hidden xl:inline-block">&nbsp;quantity</span>:
          <span className="font-medium ml-1"> {min_order_quantity}</span>
        </div>
        <div className="flex mt-6">
          <Link
            to={`/products/details/${_id}`}
            className="btn-md btn btn-outline w-full text-gray-800 dark:text-gray-300 tracking-wide font-bold"
          >
            Order now
          </Link>
        </div>
      </div>
    </div>
  );
};
