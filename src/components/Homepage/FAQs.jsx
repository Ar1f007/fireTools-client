import question from '../../assets/icons/question.svg';
import { motion } from 'framer-motion';

export const FAQs = () => {
  return (
    <section className="py-16 lg:pb-28">
      <motion.h2
        initial={{ y: 100, opacity: 0.3 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="text-center text-xl lg:text-3xl font-bold text-gray-700 -mt-12 mb-16"
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="w-full max-w-screen-2xl mx-auto lg:grid grid-cols-2 md:px-8 xl:px-0">
        <div className="max-w-lg">
          <img src={question} alt="question icon w-full" />
        </div>
        <div className="space-y-4 mt-10 lg:mt-0">
          <details className="p-6 border-l-4 border-accent bg-gray-50 group" open>
            <summary className="flex items-center justify-between cursor-pointer">
              <h5 className="text-lg font-medium text-gray-900">
                How long does it take to ship my order?
              </h5>

              <span className="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 leading-relaxed text-gray-700">
              <b>Domestic orders</b> normally arrive within 3-7 days of shipping, unless otherwise
              noted.
              <br />
              <br />
              <b>International orders</b> normally arrive within 2-4 weeks of shipping. Please note
              that these orders need to pass through the customs office in your country before it
              will be released for final delivery, which can occasionally cause additional delays.
            </p>
          </details>

          <details className="p-6 border-l-4 border-accent bg-gray-50 group">
            <summary className="flex items-center justify-between cursor-pointer">
              <h5 className="text-lg font-medium text-gray-900">
                What payment methods do you accept?
              </h5>

              <span className="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 leading-relaxed text-gray-700">
              We accept payment by cards. Visa, Mastercard, American Express, Maestro and Diners
              Club etc.
            </p>
          </details>
          <details className="p-6 border-l-4 border-accent bg-gray-50 group">
            <summary className="flex items-center justify-between cursor-pointer">
              <h5 className="text-lg font-medium text-gray-900">Do you accept return?</h5>

              <span className="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 leading-relaxed text-gray-700">
              Yes, Buyers can always submit a return request. If the reason stated within the
              request satisfies our return policy, then they will get their refund within 7 working
              days
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};
