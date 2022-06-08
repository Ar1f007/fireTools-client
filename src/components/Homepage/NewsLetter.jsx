import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MySwal from '../../config/sweetAlert';
import emailSchema from '../../validation/emailSchema';

export const NewsLetter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit = () => {
    MySwal.fire('', 'Thank you for subscribing to our newsletter', 'success');
    reset();
  };
  return (
    <section className="bg-slate-100 dark:bg-gray-900">
      <div className="container px-4 py-20 lg:py-16 mx-auto lg:flex lg:items-center justify-evenly">
        <h2 className="text-xl font-bold tracking-tight text-gray-600 xl:text-2xl dark:text-white">
          Join us to get the latest product updates and offers
        </h2>

        <div className="mt-8 lg:mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:-mx-2"
          >
            <input
              {...register('email')}
              type="text"
              className="input input-bordered mr-2 w-full min-w-[200px]"
              placeholder="Email Address"
            />

            <button className="btn btn-primary">Subscribe</button>
          </form>
          {errors?.email && (
            <p className="text-sm text-gray-800 my-2 dark:text-gray-200">
              {errors?.email?.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
