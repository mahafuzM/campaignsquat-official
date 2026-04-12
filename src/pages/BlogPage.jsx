import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // ১. হেলমেট ইমপোর্ট করবি
import BlogHero from '../components/BlogHero';
import BlogContent from '../components/BlogContent';
import Contact from '../components/Contact';
import DynamicSchema from '../components/DynamicSchema';

const BlogPage = () => {
  
  // 2. Page load holei scroll top-e niye jawar logic
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });
  }, []);

  return (
    <main className="w-full bg-[#02050A]">
      <DynamicSchema />
      {/* ৩. Blog Page SEO Meta Tags */}
      <Helmet>
        <title>Blog & Insights | Campaignsquat Ltd - Digital Trends & Guides</title>
        <meta name="description" content="Stay updated with the latest trends in UI/UX design, web development, and software innovations. Read the Campaignsquat Ltd blog for expert insights and business growth tips." />
        <meta name="keywords" content="Digital Marketing Blog, Tech Insights, UI/UX Trends, Web Development Guides, Campaignsquat Blog" />
        <link rel="canonical" href="https://www.campaignsquat.com/blog" />
      </Helmet>

      <BlogHero /> 
      <BlogContent />
      <Contact />
    </main>
  );
};

export default BlogPage;
