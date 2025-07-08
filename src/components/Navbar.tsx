
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { t, locale, setLocale, availableLocales } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-950 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">CRM+ERP</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
            {t('landing.features.title')}
          </Link>
          <Link to="/pricing" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
            Tarifs
          </Link>
          <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
            À propos
          </Link>
          <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
            Contact
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLocales.map((l) => (
                <DropdownMenuItem 
                  key={l} 
                  onClick={() => setLocale(l)}
                  className={locale === l ? "bg-gray-100 dark:bg-gray-800" : ""}
                >
                  {l === 'fr' ? 'Français' : 'English'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
            {t('common.login')} <span aria-hidden="true">&rarr;</span>
          </Link>
          
          <Button asChild>
            <Link to="/register">{t('common.register')}</Link>
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">CRM+ERP</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/features"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {t('landing.features.title')}
                  </Link>
                  <Link
                    to="/pricing"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Tarifs
                  </Link>
                  <Link
                    to="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    À propos
                  </Link>
                  <Link
                    to="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Contact
                  </Link>
                </div>
                <div className="py-6">
                  <div className="flex items-center gap-x-4 mb-4">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Globe className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {availableLocales.map((l) => (
                          <DropdownMenuItem 
                            key={l} 
                            onClick={() => setLocale(l)}
                            className={locale === l ? "bg-gray-100 dark:bg-gray-800" : ""}
                          >
                            {l === 'fr' ? 'Français' : 'English'}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {t('common.login')}
                  </Link>
                  <div className="mt-4">
                    <Button asChild className="w-full">
                      <Link to="/register">{t('common.register')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;