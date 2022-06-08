import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import productSchema from '../../../validation/AddProductSchema';
import axios from 'axios';
import authFetch from '../../../config/axios';
import MySwal from '../../../config/sweetAlert';
import customAlert from '../../../utils/CustomAlert';
import { useState } from 'react';

export const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('file', data.image[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    const postImage = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dv3wezqsc/image/upload',
          formData
        );

        if (response.data.secure_url) {
          const img = response.data.secure_url;

          const productInfo = {
            name: data.productName,
            description: data.description,
            price: data.price,
            available_quantity: data.availableQuantity,
            min_order_quantity: data.minimumOrderQuantity,
            image: img,
          };

          const serverResponse = await authFetch.post('/products', productInfo);
          if (serverResponse.status === 201) {
            setLoading(false);
            reset();
            MySwal.fire('Success', 'Product was added', 'success');
          }
        }
      } catch (error) {
        customAlert('error', 'Something went wrong');
        setLoading(false);
      }

      setLoading(false);
    };

    postImage();
  };

  return (
    <section className="py-20 px-4">
      <div className="w-full bg-slate-100 shadow-lg max-w-2xl mx-auto p-4 lg:p-12 rounded">
        <h1 className="text-2xl font-medium text-neutral text-center capitalize">
          Fill up the form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              type="text"
              placeholder="Product name"
              id="productName"
              className="input input-bordered w-full "
              {...register('productName')}
            />
          </div>
          <p className="text-sm text-error mt-1">{errors.productName?.message}</p>

          {/* Description*/}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200 "
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              type="text"
              placeholder="Product description..."
              id="description"
              className="textarea textarea-bordered w-full max-h-64 min-h-[100px]"
              {...register('description')}
            />
          </div>
          <p className="text-sm text-error mt-1">{errors.description?.message}</p>

          {/* price */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="price"
            >
              Price per Unit
            </label>
            <input
              type="text"
              placeholder="Enter price per unit"
              id="price"
              className="input input-bordered w-full "
              {...register('price')}
            />
          </div>
          <p className="text-sm text-error mt-1">{errors.price?.message}</p>

          {/* Available quantity */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="availableQuantity"
            >
              Available quantity
            </label>
            <input
              type="text"
              placeholder="product in stock. eg: 100"
              id="availableQuantity"
              className="input input-bordered w-full "
              {...register('availableQuantity')}
            />
          </div>
          <p className="text-sm text-error mt-1">{errors.availableQuantity?.message}</p>

          {/* Minimum order quantity */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="minimumOrder"
            >
              Minimum order quantity
            </label>
            <input
              type="text"
              placeholder="minimum order taken. eg: 50"
              id="minimumOrder"
              className="input input-bordered w-full "
              {...register('minimumOrderQuantity')}
            />
          </div>
          <p className="text-sm text-error mt-1">{errors.minimumOrderQuantity?.message}</p>

          {/* Image */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="productImage"
            >
              Product Image
            </label>

            <input
              id="productImage"
              type="file"
              {...register('image')}
              aria-label="pick an image for product"
              className="block w-full max-w-lg text-sm text-neutral file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-normal file:text-gray-700 file:bg-gray-300 hover:file:bg-neutral hover:file:text-base-100 hover:file:pointer focus:border-gray-300 cursor-pointer"
            />
          </div>
          <p className="text-sm text-error mt-1">{errors.image?.message}</p>

          <button className={`btn w-full mt-6 ${loading && 'loading'}`} disabled={loading}>
            {!loading && 'Add Product'}
          </button>
        </form>
      </div>
    </section>
  );
};
