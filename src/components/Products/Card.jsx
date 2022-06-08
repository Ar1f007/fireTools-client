import { Link } from 'react-router-dom';
export const Card = ({ product }) => {
  const { name, image, price, _id } = product;
  return (
    <Link
      to={`/products/details/${_id}`}
      className="border shadow p-5 hover:shadow-md dark:bg-neutral"
    >
      <img className="object-cover w-full" src={image} alt={name} />

      <div className="mt-2 space-y-3">
        <div className="flex justify-between text-base dark:text-neutral">
          <p> {name} </p>

          <p> ${price.toFixed(2)} </p>
        </div>
      </div>
    </Link>
  );
};
