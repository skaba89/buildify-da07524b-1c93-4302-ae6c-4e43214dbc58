
import React from 'react';
import { useTranslation } from '@/i18n';
import { 
  Users, 
  BarChart3, 
  Building2, 
  Globe, 
  ShoppingCart, 
  UserCircle 
} from 'lucide-react';

const features = [
  {
    name: 'crmTitle',
    description: 'crmDescription',
    icon: Users,
  },
  {
    name: 'erpTitle',
    description: 'erpDescription',
    icon: ShoppingCart,
  },
  {
    name: 'hrTitle',
    description: 'hrDescription',
    icon: UserCircle,
  },
  {
    name: 'analyticsTitle',
    description: 'analyticsDescription',
    icon: BarChart3,
  },
  {
    name: 'multiCompanyTitle',
    description: 'multiCompanyDescription',
    icon: Building2,
  },
  {
    name: 'multiLanguageTitle',
    description: 'multiLanguageDescription',
    icon: Globe,
  },
];

const Features = () => {
  const { t } = useTranslation();

  return (
    <div id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
            {t('landing.features.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            {t('landing.features.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.name} 
                className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t(`landing.features.${feature.name}`)}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {t(`landing.features.${feature.description}`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;