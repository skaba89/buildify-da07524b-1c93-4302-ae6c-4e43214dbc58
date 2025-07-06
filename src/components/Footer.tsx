
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ERP+CRM SaaS. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/terms" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            Terms
          </Link>
          <Link to="/privacy" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            Privacy
          </Link>
          <Link to="/cookies" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;