import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Filter from 'bad-words';
import reviewSchema from '../../validation/reviewSchema';
import customAlert from '../../utils/CustomAlert';
import authFetch from '../../config/axios';
import { useEffect, useState } from 'react';
const filter = new Filter();

export const AddReview = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });
  const [isAddingReview, setIsAddingReview] = useState(false);

  const onSubmit = async (data) => {
    setIsAddingReview(true);
    const isTestimonialNotClean = filter.isProfane(data.testimonial);
    const isNameNotClean = filter.isProfane(data.name);

    if (isTestimonialNotClean || isNameNotClean) {
      customAlert('warning', 'Can not contain bad words! Please review it');
      setIsAddingReview(false);
      return;
    }

    const createdAt = new Date().getTime();

    const { data: response } = await authFetch.post('/reviews', { ...data, createdAt });

    if (response.insertedId) {
      setIsAddingReview(false);
      customAlert('success', 'Your review was successfully added');
    }

    setIsAddingReview(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className="py-20 px-4">
      <div className="w-full bg-slate-100 shadow-lg max-w-2xl mx-auto p-4 lg:p-12 rounded">
        <h1 className="text-2xl font-medium text-neutral text-center capitalize">
          Express your journey with us
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              id="name"
              className="input input-bordered w-full "
              {...register('name')}
            />
          </div>
          <p className="text-sm text-error mt-1">{errors.name?.message}</p>

          {/* Testimonial */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200 "
              htmlFor="testimonial"
            >
              Testimonial
            </label>
            <textarea
              type="text"
              placeholder="Say something..."
              id="testimonial"
              className="textarea textarea-bordered w-full max-h-64 min-h-[100px]"
              {...register('testimonial')}
            />
          </div>
          <p className="text-sm text-error mt-1">{errors.testimonial?.message}</p>

          {/* ratings */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="ratings"
            >
              Rating number
            </label>
            <input
              type="text"
              placeholder="Your rating. eg: 4"
              id="ratings"
              className="input input-bordered w-full "
              {...register('ratings')}
            />
          </div>

          <p className="text-sm text-error mt-1">{errors.ratings?.message}</p>

          <button
            className={`btn w-full mt-6 ${isAddingReview && 'loading'}`}
            disabled={isAddingReview}
          >
            {!isAddingReview && 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};
