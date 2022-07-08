import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useUpdateEmail } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import authFetch from '../../config/axios';
import auth from '../../config/firebase';

import MySwal from '../../config/sweetAlert';
import customAlert from '../../utils/CustomAlert';
import { splitFirebaseErrorMsg } from '../../utils/splitFirebaseErrorMsg';

const classList =
  'w-full block py-3 px-6 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white';
const hrClasses = 'border-gray-200 dark:border-gray-700';

export const MyProfileDropdown = ({ userId, refetch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [updateEmail, , error] = useUpdateEmail(auth);

  const navigate = useNavigate();

  const handleEmailChange = async () => {
    const { value: email } = await MySwal.fire({
      title: 'Type your email address',
      input: 'email',
      inputPlaceholder: 'Enter your email address',
    });

    if (email) {
      try {
        await updateEmail(email);
        customAlert('success', 'Updated email address');
        await authFetch.put(`/users/${userId}`, { email });
        navigate('/login');
        signOut(auth);
        localStorage.removeItem('fire_token');
        customAlert('info', 'Please login again');
      } catch (error) {
        customAlert('Something went wrong');
      }
    }
  };

  if (error) {
    customAlert('error', splitFirebaseErrorMsg(error.message));
  }

  return (
    <div className="relative inline-block ">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative z-10 flex items-center p-1 text-sm bg-[#e3e5e7] text-gray-600 border border-transparent rounded-md focus:border-gray-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-gray-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
      >
        <svg
          className="w-4 h-4 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 z-20 w-max py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
          <button className={classList}>Upload image</button>
          <hr className={hrClasses} />
          <button className={classList} onClick={handleEmailChange}>
            Change email
          </button>
        </div>
      )}
    </div>
  );
};
