import { signOut } from 'firebase/auth';
import { useId } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import auth from '../../config/firebase';
import links from '../../utils/Links';

export const Navbar = () => {
  const id = useId();
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem('fire_token');
    navigate('/');
  };

  return (
    <nav className="max-w-screen-2xl mx-auto navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user && (
              <li key={`${id}-dashboard`}>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
            {links.map((link, i) => (
              <li key={`${id}-${link.name}`}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          FireTools
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {user && (
            <li key={`${id}-dashboard`}>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          )}
          {links.map((link, i) => (
            <li key={i}>
              <NavLink to={link.path}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {/* Login button */}
        {!user && !loading && (
          <Link
            to="/login"
            className="btn glass normal-case text-gray-600 mr-3 hidden lg:flex px-4"
          >
            Log in
          </Link>
        )}

        {user && !loading && (
          <button className="btn glass dark:btn-outline normal-case text-gray-600 dark:text-gray-300 mr-3 hidden lg:flex px-4">
            {user?.displayName}
          </button>
        )}

        {/* Show LOADING or SIGN UP or SIGN OUT button*/}
        {loading ? (
          <button className="btn btn-secondary loading px-[1.5rem]"></button>
        ) : user ? (
          <button className="btn btn-secondary" onClick={handleSignOut}>
            Sign out
          </button>
        ) : (
          <Link to="/sign-up" className="btn btn-secondary normal-case px-4">
            Sign up
          </Link>
        )}
      </div>
    </nav>
  );
};
