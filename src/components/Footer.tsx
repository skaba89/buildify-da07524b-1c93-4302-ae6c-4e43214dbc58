
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CRM+ERP SaaS. Tous droits réservés.
          </p>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/terms" className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
            Conditions d'utilisation
          </Link>
          <Link to="/privacy" className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
            Politique de confidentialité
          </Link>
          <Link to="/contact" className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;