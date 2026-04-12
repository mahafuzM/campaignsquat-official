import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // ১. ইম্পোর্ট করবি
import ServiceHero from '../components/ServiceHero';
import ServiceUi from '../components/ServiceUi';

import Contact from '../components/Contact';
import DynamicSchema from '../components/DynamicSchema';

const Service = () => {
  
  // 2. Page load hole scroll top-e niye jawar logic
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#02050A]">
      {/* ৩. Service Page-এর জন্য SEO মেটা ট্যাগ */}
      <DynamicSchema />
      <Helmet>
        <title>Our Services | Campaignsquat Ltd - UI/UX, Web & App Development</title>
        <meta name="description" content="Explore our wide range of services including professional UI/UX design, custom web development, enterprise software solutions, and cross-platform mobile app development." />
        <meta name="keywords" content="UI/UX Design Services, Web Development Agency, Software Solutions, Mobile App Development, ERP/CRM Systems, Campaignsquat" />
        <link rel="canonical" href="https://www.campaignsquat.com/service" />
      </Helmet>

      {/* Section 1: Hero Section */}
      <ServiceHero />
      
      {/* Section 2: UI/UX Services */}
      <ServiceUi />

      
     
      {/* Section 6: Global Contact */}
      <Contact />
    </main>
  );
};

export default Service;