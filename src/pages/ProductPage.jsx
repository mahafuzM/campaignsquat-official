import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // ১. ইম্পোর্ট করবি
/* Components Import */
import ProductHero from '../components/ProductHero';
import ProductFormCRM from '../components/ProductFormCRM';
import Contact from '../components/Contact';
import DynamicSchema from '../components/DynamicSchema';

const ProductPage = () => {

  // 2. Page load holei scroll top-e niye jabe
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#02050A]">
      <DynamicSchema />
      {/* ৩. Product Page SEO Meta Tags */}
      <Helmet>
        <title>Our Products | Campaignsquat Ltd - Innovation in SaaS & Tools</title>
        <meta name="description" content="Explore innovative digital products by Campaignsquat Ltd. Featuring FormCRM, Crewlix, and Axilthemes - designed to streamline your business and creative workflow." />
        <meta name="keywords" content="FormCRM, Crewlix, Axilthemes, SaaS Products, Business Automation Tools, Campaignsquat Ltd Products" />
        <link rel="canonical" href="https://www.campaignsquat.com/our-product" />
      </Helmet>
      
      {/* 1. Hero Section: As you designed with text changes */}
      <ProductHero />

      {/* 2. Products Section: Featuring FormCRM, Crewlix, and Axilthemes */}
      <ProductFormCRM />

      {/* 3. Global Contact Section for inquiries */}
      <Contact />
      
      {/* Bottom spacing for a clean look */}
      <div className="pb-20"></div>

    </div>
  );
};

export default ProductPage;