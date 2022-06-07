import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { BsArrowRight } from 'react-icons/bs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useQuery } from 'react-query';
import authFetch from '../../config/axios';
import { Ratings } from '../../components';
import { motion } from 'framer-motion';

const fetchReviews = async () => {
  const { data } = await authFetch('/reviews');
  return data;
};
export const Reviews = () => {
  const { data } = useQuery('data', fetchReviews);

  return (
    <motion.section
      initial={{ y: 300, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, type: 'spring', bounce: 0.2 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <section className="bg-slate-50 rounded">
        <section className="max-w-screen-2xl mx-auto relative lg:px-20 xl:px-0">
          <div className="px-4 py-16 mx-auto sm:px-6 lg:px-0 lg:mr-0 sm:py-24 max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-16 gap-y-8 lg:items-center">
              <div className="max-w-xl text-center sm:text-left">
                <h2 className="text-neutral text-3xl font-bold tracking-tight sm:text-4xl">
                  Don't just take our word for it... <br className="hidden sm:block lg:hidden" />
                  Read reviews from our customers
                </h2>

                <p className="mt-4 text-gray-500">
                  Here are some of the recent reviews given by the customers...
                </p>

                <div className="hidden lg:mt-8 lg:flex lg:gap-4">
                  <button
                    aria-label="Previous slide"
                    className="p-3 text-secondary border border-secondary rounded-full hover:bg-secondary hover:text-white prev-button"
                  >
                    <svg
                      className="w-5 h-5 transform -rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>

                  <button
                    aria-label="Next slide"
                    className="p-3 text-secondary border border-secondary rounded-full hover:bg-secondary hover:text-white next-button"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="-mx-6 lg:col-span-2 lg:mx-0">
                <div className="swiper-container">
                  <ul className="swiper-wrapper">
                    <Swiper
                      modules={[Navigation, Pagination, A11y, Autoplay]}
                      spaceBetween={32}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      navigation={{
                        nextEl: '.next-button',
                        prevEl: '.prev-button',
                      }}
                      autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      breakpoints={{
                        640: {
                          centeredSlides: true,
                          slidesPerView: 1.25,
                        },

                        1024: {
                          centeredSlides: false,
                          slidesPerView: 1.5,
                        },
                      }}
                    >
                      {data?.map((review) => (
                        <SwiperSlide key={review._id}>
                          <li className="swiper-slide">
                            <blockquote className="flex flex-col justify-between h-full p-12 bg-white">
                              <div>
                                <Ratings stars={review.ratings} />

                                <div className="mt-4">
                                  <p className="mt-4 leading-relaxed text-gray-500">
                                    {review.testimonial}
                                  </p>
                                </div>
                              </div>

                              <footer className="mt-8 text-sm text-gray-500">
                                &mdash; {review.name}
                              </footer>
                            </blockquote>
                          </li>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </ul>
                </div>
              </div>
            </div>
            {/* mobile */}
            <div className="flex justify-center gap-4 mt-8 lg:hidden">
              <button
                aria-label="Previous slide"
                className="p-4 text-secondary border border-secondary rounded-full hover:bg-secondary hover:text-white prev-button"
              >
                <svg
                  className="w-5 h-5 transform -rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              <button
                aria-label="Next slide"
                className="p-4 text-secondary border border-secondary rounded-full hover:bg-secondary hover:text-white next-button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="lg:hidden absolute -bottom-16 left-1/2 -translate-x-1/2">
            <button className="btn btn-outline btn-secondary capitalize tracking-wider">
              Read More
              <i>
                <BsArrowRight className="text-2xl ml-1" />
              </i>
            </button>
          </div>
          <div className="hidden lg:block absolute lg:bottom-4 right-0 lg:px-20 xl:px-0">
            <button className="btn btn-outline btn-secondary px-5 capitalize tracking-wider">
              Read More
              <i>
                <BsArrowRight className="text-2xl ml-1" />
              </i>
            </button>
          </div>
        </section>
      </section>
    </motion.section>
  );
};
