
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-700 dark:text-gray-300">
        {t('notFound.title')}
      </h2>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        {t('notFound.message')}
      </p>
      <Button asChild className="mt-8">
        <Link to="/">{t('notFound.returnHome')}</Link>
      </Button>
    </div>
  );
};

export default NotFound;