import React from 'react';
import NotFoundImage from '../../public/notFound.svg';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center flex-col dark:bg-gray-900">
      <div className=" flex justify-center">
        <img src={NotFoundImage} alt="" className="w-[70%] border" />
      </div>
      <div className="text-center w-full mt-12 max-md:p-12">
        <div className="w-full text-center">
          <p className="text-sm font-medium text-red-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist.Here are some
            helpful links:
          </p>

          <div className="flex justify-center items-center mt-6 gap-x-3">
            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 text-white border rounded-lg gap-x-2 sm:w-auto bg-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <Link to="/">Take me home</Link>
            </button>
          </div>
        </div>
        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="/images/components/illustration.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
