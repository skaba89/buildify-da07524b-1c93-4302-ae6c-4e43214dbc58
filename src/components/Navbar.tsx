
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-950 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-gray-900 dark:text-white">ERP+CRM</span>
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
          <Link to="/#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Features
          </Link>
          <Link to="/#pricing" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Pricing
          </Link>
          <Link to="/#about" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            About
          </Link>
          <Link to="/#contact" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Contact
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link to="/login">
            <Button variant="outline">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button>Get started</Button>
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50 bg-gray-900/80" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="text-xl font-bold text-gray-900 dark:text-white">ERP+CRM</span>
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
                    to="/#features"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    to="/#pricing"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/#about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/#contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
                <div className="py-6 space-y-2">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get started
                  </Link>
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