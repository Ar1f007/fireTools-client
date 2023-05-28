import auth from '../config/firebase';
import authFetch from '../config/axios';

import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import customAlert from '../utils/CustomAlert';
import { useCheckAdmin } from '../hooks/useCheckAdmin';
import { ImWarning } from 'react-icons/im';
import getDiscountedPrice from '../utils/discountedPrice';

const phoneRegex =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fetchUserData = async () => {
  const { data } = await authFetch('/users/my-profile');

  return data;
};

export const ProductDetails = () => {
  const { data: userData, isLoading: userDataLoading } = useQuery('user', fetchUserData);

  const { id } = useParams();
  const [user, loading] = useAuthState(auth);
  const [admin] = useCheckAdmin(user);
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const fetchData = async () => {
    const { data } = await authFetch(`/products/details/${id}`);
    return data;
  };

  const { data, isLoading } = useQuery(['data', id], fetchData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
      address: userData?.location || '',
      phoneNumber: userData?.phone || '',
      orderQuantity: data?.min_order_quantity,
    },
    mode: 'onChange',
  });
  const [, setTotal] = useState(data?.price * data?.min_order_quantity);
  const [stockIsLow, setStockIsLow] = useState(false);

  useEffect(() => {
    if (data) {
      setValue('orderQuantity', data.min_order_quantity);
      setTotal(data?.price * data?.min_order_quantity);

      if (data.available_quantity < data.min_order_quantity) {
        setStockIsLow(true);
      }
    }
  }, [data, setValue]);

  const getTotal = () => {
    if (data?.discount > 0) {
      return (
        getDiscountedPrice(data?.price, data?.discount, false) * getValues('orderQuantity')
      ).toFixed(2);
    }

    return (data?.price * getValues('orderQuantity')).toFixed(2);
  };

  const onSubmit = async (values) => {
    setIsPlacingOrder(true);
    const orderData = {
      name: values.name,
      email: values.email,
      address: values.address,
      phoneNumber: values.phoneNumber,
      orderQuantity: values.orderQuantity,
      total: +getTotal(),
      productName: data.name,
      productId: id,
      userId: user.uid,
      paid: false,
    };

    try {
      const { data: response } = await authFetch.post('/orders', orderData);
      if (response.acknowledged) {
        const availableQuantity = data?.available_quantity - values.orderQuantity;
        await authFetch.put(`/products/${id}`, { available_quantity: availableQuantity });

        customAlert('success', 'Order is placed');
        navigate('/dashboard/my-orders');

        setIsPlacingOrder(false);
      }
    } catch (error) {
      setIsPlacingOrder(false);
    }
    setIsPlacingOrder(false);
  };

  if (isLoading || loading || userDataLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-slate-50 dark:bg-neutral min-h-[70vh] px-5 py-16">
      <div className={`grid grid-cols-1 ${!admin && 'xl:grid-cols-2'} max-w-screen-2xl mx-auto`}>
        <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
          {/* Image */}
          <div className="max-w-sm min-w-[290px]">
            <img src={data?.image} alt={data?.name} className="w-full object-cover" />
          </div>
          {/* Image */}

          {/* Description */}
          <div>
            <h1 className="text-2xl font-bold text-neutral dark:text-gray-300">{data?.name}</h1>
            <p className="text-base text-gray-600 my-4 dark:text-gray-400">{data?.description}</p>

            <div className="py-4">
              <div className="my-1 xl:max-w-[75%] flex justify-between">
                <p className="font-semibold text-neutral dark:text-gray-300">Price</p>
                {/* <p>${data?.price.toFixed(2)} / unit</p> */}
                <p>
                  {data?.discount > 0 ? (
                    <s>${data?.price.toFixed(2)}</s>
                  ) : (
                    <>${data?.price.toFixed(2)}</>
                  )}
                  {data?.discount > 0 && (
                    <>&nbsp;{getDiscountedPrice(data?.price, data?.discount)}</>
                  )}{' '}
                  /&nbsp; <span className="text-sm">unit</span>
                </p>
              </div>
              <div className="my-1 xl:max-w-[75%] flex justify-between">
                <p className="font-semibold text-neutral dark:text-gray-300">Available Quantity</p>
                <p>{data?.available_quantity}</p>
              </div>
              <div className="my-1 xl:max-w-[75%] flex justify-between">
                <p className="font-semibold text-neutral dark:text-gray-300">
                  Minimum order quantity
                </p>
                <p>{data?.min_order_quantity}</p>
              </div>
            </div>

            {stockIsLow && (
              <p className="flex items-baseline gap-2 font-medium py-2 px-4 rounded-md bg-amber-400 text-neutral">
                <i>
                  <ImWarning className="font-bold" />
                </i>
                <span>
                  We are not taking any order for this product at the moment as the available stock
                  is not enough.
                </span>
              </p>
            )}
          </div>
          {/* Description */}
        </div>
        <div>
          {!admin && (
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto shadow p-8 pt-4">
              <h2 className="text-center font-bold text-2xl text-neutral">Order Form</h2>
              {/* Name */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  className="input input-bordered w-full"
                  {...register('name', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </div>
              <p className="text-sm text-error mt-1">{errors.name?.message}</p>
              {/* Email */}
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="input input-bordered w-full"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Please enter your email',
                    },
                    pattern: {
                      value: emailRegex,
                      message: 'Not a valid email address',
                    },
                  })}
                />
              </div>
              <p className="text-sm text-error mt-1">{errors.email?.message}</p>

              {/* Address */}
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Type your address"
                  id="address"
                  className="input input-bordered w-full"
                  {...register('address', { required: 'Address is required' })}
                />
              </div>
              <p className="text-sm text-error mt-1">{errors.address?.message}</p>

              {/* Phone number */}
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Your phone number"
                  id="phoneNumber"
                  className="input input-bordered w-full"
                  {...register('phoneNumber', {
                    require: 'Phone number is required',
                    pattern: {
                      value: phoneRegex,
                      message: 'Not a valid phone number',
                    },
                  })}
                />
              </div>
              <p className="text-sm text-error mt-1">{errors.phoneNumber?.message}</p>

              {/* Order quantity */}
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="orderQuantity"
                >
                  Order Quantity
                </label>
                <input
                  type="text"
                  placeholder="Quantity. eg: 100"
                  id="orderQuantity"
                  className="input input-bordered w-full"
                  {...register('orderQuantity', {
                    required: { value: true, message: 'Quantity is required' },
                    min: data?.min_order_quantity,
                    max: data?.available_quantity,
                    valueAsNumber: true,
                    validate: {
                      number: (v) => !isNaN(v) || 'should be a number',
                      decimal: (v) => Number.isInteger(v) || "Can't be a decimal number",
                    },
                  })}
                />
              </div>

              <p className="text-sm text-error mt-1">{errors.orderQuantity?.message}</p>
              {errors.orderQuantity?.type === 'min' && (
                <p className="text-sm text-error mt-1">{`Can not order less than ${data.min_order_quantity}`}</p>
              )}
              {errors.orderQuantity?.type === 'max' && (
                <p className="text-sm text-error mt-1">{`Can not order more than ${data.available_quantity}`}</p>
              )}

              {/* Total */}
              <div className="flex items-center gap-2 mt-3">
                <p className="text-base font-semibold text-gray-600">Total:</p>
                <span className="text-base text-success font-semibold">
                  $ {errors.orderQuantity || stockIsLow ? 0 : getTotal()}
                </span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className={`mt-8 w-full px-4 py-2 tracking-wide btn font-normal normal-case text-base dark:btn-outline ${
                  isPlacingOrder && 'loading'
                }`}
                disabled={
                  errors.orderQuantity ||
                  data?.available_quantity < data?.min_order_quantity ||
                  isPlacingOrder
                }
              >
                {!isPlacingOrder && 'Place Order'}
              </button>
              {/* Submit button */}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
