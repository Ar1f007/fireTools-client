import { useQuery } from 'react-query';
import { EditProfile, Spinner } from '../../components';
import { GoLocation } from 'react-icons/go';
import {
  AiOutlineMail,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlinePhone,
  AiFillEdit,
} from 'react-icons/ai';
import { FaUniversity } from 'react-icons/fa';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { MdRateReview } from 'react-icons/md';
import { HiStatusOnline } from 'react-icons/hi';

import authFetch from '../../config/axios';
import avatar from '../../assets/images/avatar.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MyProfileDropdown } from '../../components/Dashboard/MyProfileDropdown';

const fetchUserData = async () => {
  const { data } = await authFetch('/users/my-profile');
  return data;
};

export const MyProfile = () => {
  const { data, isLoading, refetch } = useQuery('user', fetchUserData);
  const [showForm, setShowForm] = useState(false);

  const handleEditProfile = () => {
    setShowForm(!showForm);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="py-10 px-8 xl:px-20">
      {/* <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl mb-5 -mt-4 ">
        Welcome, {user?.name} ! 🎉
      </h1> */}

      {/* Info */}
      <section className="grid lg:grid-cols-3 gap-16 max-w-7xl items-center">
        {/* profile info */}
        <div>
          {/* Image */}
          <div className="avatar">
            <figure className="max-w-[280px]">
              <img
                src={data.user?.image || avatar}
                alt="user"
                className="w-full rounded-full border-2"
              />
            </figure>
          </div>
          {/* Image */}

          {/* EDIT PROFILE FORM */}
          {showForm && (
            <EditProfile
              handleEditProfile={handleEditProfile}
              user={data?.user}
              refetch={refetch}
            />
          )}
          {/* EDIT PROFILE FORM */}

          {/* other's info */}
          {!showForm && (
            <div className="py-3 text-gray-800">
              <div className="flex items-center gap-x-3">
                <h2 className="text-2xl font-semibold mb-2">{data?.user?.name}</h2>
                <MyProfileDropdown userId={data?.user?._id} refetch={refetch} />
              </div>

              {/* Edit Profile */}
              <button
                onClick={handleEditProfile}
                className="btn btn-ghost btn-active btn-wide btn-sm my-4 hover:brightness-50 normal-case"
              >
                Edit profile
              </button>

              {/* Edit Profile */}
              <p className="text-[15px] font-normal mb-5 xl:w-[80%]">{data?.user?.bio || 'N/A'}</p>
              {/* Education */}
              <div className="flex items-center gap-2 text-[15px] mb-2 text-gray-800">
                <i>
                  <FaUniversity className="text-gray-600 text-lg" />
                </i>
                <span>University : {data?.user?.education || 'N/A'}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-[15px] mb-2 text-gray-800">
                <i>
                  <GoLocation className="text-gray-600 text-lg" />
                </i>
                <span>{data?.user?.location || 'N/A'}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-[15px] mb-5 text-gray-800 hover:link hover:text-primary">
                <i>
                  <AiOutlinePhone className="text-gray-600 text-lg" />
                </i>
                <a href={`tel:${data?.user?.phone}`}>{data?.user?.phone || 'N/A'}</a>
              </div>

              {/* Email*/}
              <div
                className="flex items-center gap-2 text-[15px] mb-2 text-gray-800 
            hover:link hover:text-primary
            "
              >
                <i>
                  <AiOutlineMail className="text-gray-600 text-lg" />
                </i>
                <a href={`mailto:${data?.user?.email}`}>{data?.user?.email || 'N/A'}</a>
              </div>

              {/* Linked In*/}
              <div
                className="flex items-center gap-2 text-[15px] mb-2 text-gray-800 
            
            "
              >
                <i>
                  <AiFillLinkedin className="text-gray-600 text-lg" />
                </i>
                <p>{data?.user?.linkedIn || 'N/A'}</p>
              </div>
              {/* Twitter*/}
              <div
                className="flex items-center gap-2 text-[15px] mb-2 text-gray-800 
            
            "
              >
                <i>
                  <AiOutlineTwitter className="text-gray-600 text-lg" />
                </i>
                <p>{data?.user?.twitter || 'N/A'}</p>
              </div>
              {/* Twitter*/}
              <div
                className="flex items-center gap-2 text-[15px] mb-2 text-gray-800 
            
            "
              >
                <i>
                  <AiOutlineGithub className="text-gray-600 text-lg" />
                </i>
                <p>{data?.user?.github || 'N/A'}</p>
              </div>
            </div>
          )}
          {/* other's info */}
        </div>

        {/* stats */}
        <div className="lg:col-span-2">
          <div className="grid xl:grid-cols-1 gap-4">
            {/* first row */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* first row - first col */}
              <div className="stats shadow py-10">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <BiPurchaseTagAlt className="text-primary w-8 h-8" />
                  </div>
                  <div className="stat-title">Total orders</div>
                  <div className="stat-value text-primary">{data?.orders || 'n/a'}</div>
                </div>
              </div>

              {/* first row - second col */}

              <div className="stats shadow py-10">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <MdRateReview className="text-secondary w-8 h-8" />
                  </div>
                  <div className="stat-title">Reviews given</div>
                  <div className="stat-value text-secondary">{data?.reviews || 'n/a'}</div>
                </div>
              </div>
            </div>

            {/* second row */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* second row - first col */}
              <div className="stats shadow py-10">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <HiStatusOnline className="text-secondary w-8 h-8" />
                  </div>
                  <div className="text-gray-700 font-xl font-bold">Check order status</div>
                  <Link
                    disabled={data?.user?.role === 'admin'}
                    to="/dashboard/my-orders"
                    className="btn btn-sm w-max btn-secondary mt-4 normal-case"
                  >
                    Order
                  </Link>
                </div>
              </div>

              {/* second row - second col */}

              <div className="stats shadow py-10">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <AiFillEdit className="text-accent w-8 h-8" />
                  </div>
                  <div className="text-gray-700 font-xl font-bold">Write review</div>
                  <Link
                    disabled={data?.user?.role === 'admin'}
                    to="/dashboard/add-review"
                    className="btn btn-sm w-max btn-accent normal-case mt-4"
                  >
                    Write
                  </Link>
                </div>
              </div>
            </div>
            {/* second row - second col */}
          </div>
        </div>
      </section>
    </section>
  );
};
