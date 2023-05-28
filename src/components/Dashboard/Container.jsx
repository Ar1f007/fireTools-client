import { Link, Outlet, useLocation } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCheckAdmin } from '../../hooks/useCheckAdmin';
import { Spinner } from '../../components';
import auth from '../../config/firebase';
import adminLinks from '../../utils/adminLinks';
import userLinks from '../../utils/userLinks';

const activeClass = 'bg-primary text-base-100';
const inactiveClass = 'bg-transparent hover:bg-base-200 active:bg-primary';

export const Container = () => {
  const [user, loading] = useAuthState(auth);
  const [admin, checkingStatus] = useCheckAdmin(user);
  const location = useLocation();

  const matchRoute = (route) => route === location.pathname;

  if (loading || checkingStatus) {
    return <Spinner />;
  }

  return (
    <div className="drawer drawer-mobile bg-slate-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col no-scrollbar">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden flex items-center pl-5 pt-2"
        >
          <IoIosArrowForward className="font-bold text-xl" />
          <span className="font-medium ml-1">Sidebar</span>
        </label>
        {/* <!-- Page content here --> */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 gap-3 overflow-y-auto w-max lg:w-80 lg:border-r border-gray-200 bg-slate-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link
              to="/dashboard"
              className={matchRoute('/dashboard') ? activeClass : inactiveClass}
            >
              My Profile
            </Link>
          </li>

          {!admin &&
            userLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className={matchRoute(link.path) ? activeClass : inactiveClass}
                >
                  {link.name}
                </Link>
              </li>
            ))}

          {admin &&
            adminLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className={matchRoute(link.path) ? activeClass : inactiveClass}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
