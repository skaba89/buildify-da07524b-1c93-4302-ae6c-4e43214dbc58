
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              All-in-One Business Management Platform
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Combine CRM and ERP functionalities in a single, powerful platform. Manage customers, inventory, sales, and employees with ease.
            </p>
          </div>
          <div className="space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;