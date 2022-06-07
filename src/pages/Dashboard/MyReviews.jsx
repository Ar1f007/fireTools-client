import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '../../components';
import { MdOutlineDateRange } from 'react-icons/md';

import auth from '../../config/firebase';
import authFetch from '../../config/axios';
import { confirmModal } from '../../utils/ConfirmModal';
import MySwal from '../../config/sweetAlert';
import customAlert from '../../utils/CustomAlert';

export const MyReviews = () => {
  const [user, loading] = useAuthState(auth);

  const fetchReviews = async () => {
    if (user) {
      const { data } = await authFetch.get(`/reviews/${user.email}`);
      return data;
    }
  };

  const { data: reviews, isLoading, refetch } = useQuery('reviews', fetchReviews);

  const handleRemove = async (id) => {
    const res = await confirmModal('You want to remove this review?', 'Yes', 'No');

    if (res.isConfirmed) {
      const response = await authFetch.delete(`/reviews/${id}`);

      if (response.status === 200) {
        MySwal.fire('Success', 'Review deleted', 'success');
        refetch();
      } else {
        customAlert('error', 'Could not perform the task, try again.');
      }
    }
  };

  if (loading || isLoading) {
    return <Spinner />;
  }

  return (
    <section className="py-10 px-8 xl:px-20">
      {reviews?.length === 0 ? (
        <h1 className="text-center text-gray-600 dark:text-white text-3xl">
          You have not posted any reviews yet
        </h1>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {reviews?.map((review) => (
            <div key={review._id} className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Ratings : {review?.ratings}</h2>
                <p>{review?.testimonial}</p>
                <div className="card-actions justify-between mt-2">
                  <p className="flex items-center gap-2">
                    <MdOutlineDateRange />
                    <span>{new Date(review.createdAt).toLocaleDateString('en-US')}</span>
                  </p>
                  <button className="btn btn-error btn-sm" onClick={() => handleRemove(review._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
};
