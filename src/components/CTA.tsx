
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n';
import { Link } from 'react-router-dom';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-blue-600 dark:bg-blue-700 py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              {t('landing.cta.title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
              {t('landing.cta.subtitle')}
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/register">{t('landing.cta.button')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-blue-700">
              <Link to="#contact">{t('landing.cta.secondaryButton')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;