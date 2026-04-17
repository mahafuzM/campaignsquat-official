import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // ১. এই লাইনটা অ্যাড করবি

/* 1. Importing all components for the Home Page */
import Hero from '../components/Hero';
import BrandSlider from '../components/BrandSlider'; 
import CampaignSquat from '../components/campaignsquat'; 
import SkillsGrid from '../components/SkillsGrid'; 
import Services from '../components/Service'; 
import WorkProcess from '../components/WorkProcess';
import Agency from '../components/Agency'; 
import Recent from '../components/Recent';
import CaseStudy from '../components/CaseStudy'; 
import SuccessStory from '../components/SuccessStory'; 
import Questions from '../components/Questions';
import Contact from '../components/Contact';
import WorkByIndustry from '../components/WorkByIndustry';
import DynamicSchema from '../components/DynamicSchema';
import DigitalKendro from '../components/DigitalKendro';

const Home = () => {
  
  // Home page load hole scroll top-e niye jabe
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <DynamicSchema />
      {/* ২. SEO Meta Tags - এখানে তোর সব ইনফো দিয়ে দিলাম */}
     {/* ২. SEO Meta Tags - এখানে তোর সব ইনফো দিয়ে দিলাম */}
      <Helmet>
        {/* সাধারণ এসইও */}
        <title>Campaignsquat Ltd - Custom Software & High-Impact UI/UX Design Agency</title>
        <meta name="description" content="Campaignsquat Ltd is a premier tech agency specializing in Software Development, UI/UX Design, and data-driven digital growth. Transform your ideas into high-performance websites." />
        <meta name="keywords" content="UI/UX Design, Web Development, Software Development, App Development, SaaS, Campaignsquat Ltd" />
        <link rel="canonical" href="https://www.campaignsquat.com" />

        {/* ৩. সোশ্যাল মিডিয়া প্রিভিউ (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://campaignsquat.com/" />
        <meta property="og:title" content="Campaignsquat Ltd - Custom Software & UI/UX Design Agency" />
        <meta property="og:description" content=" Transform your ideas into high-performance websites and digital products. At Campaignsquat Ltd., we specialize in Software Development and UI/UX Design to scale your brand globally." />
        <meta property="og:image" content="https://campaignsquat.com/campaignsquat-open-graph-image.png" /> 

        {/* ৪. টুইটারের জন্য */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Campaignsquat Ltd - Custom Software & UI/UX Design Agency" />
        <meta name="twitter:description" content="Scale your digital presence with our expert Software Development and UI/UX Design solutions." />
        <meta name="twitter:image" content="https://campaignsquat.com/campaignsquat-open-graph-image.png" />
      </Helmet>

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Trusted Brand Logos Slider */}
      <BrandSlider />

      {/* 4. Company Overview & About Information */}
      <CampaignSquat />

      {/* 5. Technologies & Skillsets Grid */}
      <SkillsGrid />

      <DigitalKendro />

      {/* 6. Professional Services Offerings */}
      <Services />

      <WorkByIndustry />

      {/* 7. Step-by-Step Workflow Process */}
      <WorkProcess />

      {/* 8. Agency Specialized Features */}
      <Agency />

      {/* 9. Showcase of Recent Projects */}
      <Recent />

      {/* 10. In-depth Case Studies Analysis */}
      <CaseStudy />

      {/* 11. Client Testimonials & Success Stories */}
      <SuccessStory />

      {/* 12. Frequently Asked Questions (FAQ) */}
      <Questions />

      {/* 13. Project Inquiry & Contact Form */}
      <Contact />
      
    </main>
  );
};

export default Home;
