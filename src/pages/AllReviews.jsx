import { Ratings, Spinner } from '../components';
import { useQuery } from 'react-query';
import authFetch from '../config/axios';
import { useEffect, useState } from 'react';

const fetchReviews = async () => {
  const { data } = await authFetch('/all-reviews');
  return data;
};
export const AllReviews = () => {
  const { data: reviews, isLoading } = useQuery('all-reviews', fetchReviews);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const avgRatings = () => {
      return (
        reviews?.reduce((acc, cur) => {
          acc = acc + cur.ratings;
          return acc;
        }, 0) / reviews?.length
      );
    };

    if (reviews) {
      setAvgRating(avgRatings());
    }
  }, [reviews]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="min-h-screen py-16 px-4 lg:px-5 w-full max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between font-semibold text-gray-600 dark:text-white text-xl lg:text-xl ">
        <h1 className="border-b-2 py-3 max-w-fit">Total Reviews: {reviews?.length}</h1>
        <p className="btn glass normal-case text-gray-600 dark:text-white px-4">
          Average : {avgRating} / 5
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-10">
        {reviews?.length === 0 ? (
          <h1>No reviews yet</h1>
        ) : (
          <>
            {reviews?.map((review) => (
              <div key={review._id} className="shadow">
                <blockquote className="flex flex-col justify-between h-full p-12 bg-white">
                  <div>
                    <Ratings stars={review.ratings} />

                    <div className="mt-4">
                      <p className="mt-4 leading-relaxed text-gray-500">{review.testimonial}</p>
                    </div>
                  </div>

                  <footer className="mt-8 text-sm text-gray-500">&mdash; {review.name}</footer>
                </blockquote>
              </div>
            ))}
          </>
        )}
      </section>
    </section>
  );
};
