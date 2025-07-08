
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useTranslation } from '@/i18n';

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;