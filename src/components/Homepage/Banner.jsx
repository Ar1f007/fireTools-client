import { Link } from 'react-router-dom';

export const Banner = () => {
  return (
    <header className="relative bg-white bg-fixed bg-no-repeat bg-cover">
      <img
        className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
        src="https://res.cloudinary.com/dv3wezqsc/image/upload/v1657283226/firetools/toolshop_psaxot.jpg"
        alt="tools"
      />

      <div
        className={`hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-white sm:to-transparent`}
      ></div>

      <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-[70vh] lg:items-center lg:flex">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-neutral">
            Need new tools? <br />
            <strong className="font-extrabold text-primary sm:block">We got you covered.</strong>
          </h1>

          <div className="flex flex-wrap gap-4 mt-8 text-center justify-center lg:justify-start">
            <a
              href="#products"
              className="btn btn-primary block px-10 py-3 text-sm normal-case font-medium rounded shadow"
            >
              Get Started
            </a>

            <Link
              to="/"
              className="block border-2 border-transparent px-10 py-3 text-sm font-medium bg-white rounded shadow text-primary hover:text-[#4506CB]"
              href="/about"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
