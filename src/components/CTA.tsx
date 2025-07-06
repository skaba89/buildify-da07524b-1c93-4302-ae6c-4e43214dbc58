
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <div className="bg-blue-600 dark:bg-blue-700">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to streamline your business operations?
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100">
            Start managing your business more efficiently today with our all-in-one platform.
            No credit card required to get started.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get started for free
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;