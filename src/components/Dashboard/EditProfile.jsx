import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import authFetch from '../../config/axios';
import customAlert from '../../utils/CustomAlert';

export const EditProfile = ({ user, handleEditProfile, refetch }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      bio: user?.bio,
      location: user?.location,
      education: user?.education,
      phone: user?.phone,
      linkedIn: user?.linkedIn,
      twitter: user?.twitter,
    },
  });

  const onSubmit = async (data) => {
    const response = await authFetch.put(`/users/${user._id}`, data);

    if (response.status === 200) {
      customAlert('success', 'Updated successfully');
      handleEditProfile();
      refetch();
    }
  };

  return (
    <motion.div
      initial={{ y: '-1vh' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
      className="py-3"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form-control w-full max-w-xs mb-2">
          <label className="label">
            <span className="label-text font-semibold text-gray-800">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered input-sm w-full max-w-[300px]"
            {...register('name')}
          />
        </div>

        {/* Bio */}
        <div className="form-control w-full max-w-xs mb-2">
          <label className="label">
            <span className="label-text font-semibold text-gray-800">Bio</span>
          </label>
          <textarea
            placeholder="Add a bio"
            className="textarea textarea-bordered w-full max-w-[300px] max-h-80"
            {...register('bio')}
          />
        </div>

        {/* Location */}
        <div className="form-control w-full max-w-xs mb-2">
          <label className="label">
            <span className="label-text font-semibold text-gray-800">Location</span>
          </label>
          <input
            type="text"
            placeholder="Your location"
            className="input input-bordered input-sm w-full max-w-[300px]"
            {...register('location')}
          />
        </div>

        {/* Education */}
        <div className="form-control w-full max-w-xs mb-2">
          <label className="label">
            <span className="label-text font-semibold text-gray-800">Education</span>
          </label>
          <input
            type="text"
            placeholder="Location"
            className="input input-bordered input-sm w-full max-w-[300px]"
            {...register('education')}
          />
        </div>

        {/* Phone */}
        <div className="form-control w-full max-w-xs mb-2">
          <label className="label">
            <span className="label-text font-semibold text-gray-800">Phone</span>
          </label>
          <input
            type="text"
            placeholder="phone"
            className="input input-bordered input-sm w-full max-w-[300px]"
            {...register('phone')}
          />
        </div>

        {/* Linked In*/}
        <div className="form-control w-full max-w-xs mb-2">
          <label className="label">
            <span className="label-text font-semibold text-gray-800">LinkedIn</span>
          </label>
          <input
            type="text"
            placeholder="LinkedIn username"
            className="input input-bordered input-sm w-full max-w-[300px]"
            {...register('linkedIn')}
          />
        </div>
        {/* Twitter*/}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold text-gray-800">Twitter</span>
          </label>
          <input
            type="text"
            placeholder="Twitter username"
            className="input input-bordered w-full max-w-[300px]"
            {...register('twitter')}
          />
        </div>
        {/* Github */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold text-gray-800">Github</span>
          </label>
          <input
            type="text"
            placeholder="Github username"
            className="input input-bordered w-full max-w-[300px]"
            {...register('github')}
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button className="btn btn-primary btn-sm capitalize">Save</button>
          <button
            onClick={handleEditProfile}
            className="btn btn-ghost btn-active hover:brightness-50 btn-sm capitalize"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};
