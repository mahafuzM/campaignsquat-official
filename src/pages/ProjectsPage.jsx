import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // ১. ইম্পোর্ট করবি
/* Components Import */
import ProjectHero from '../components/ProjectHero';
import ProjectFilter from '../components/ProjectFilter';
import Contact from '../components/Contact';
import DynamicSchema from '../components/DynamicSchema';

const Projects = () => {

  // 2. Page load holei scroll top-e niye jabe
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-[#02050A]">
     <DynamicSchema />
      {/* ৩. Projects Page SEO Meta Tags */}
      <Helmet>
        <title>Our Projects | Campaignsquat Ltd - Case Studies & Portfolio</title>
        <meta name="description" content="Explore Campaignsquat Ltd's portfolio. See how we've helped businesses grow through innovative UI/UX design, custom web applications, and high-performance mobile apps." />
        <meta name="keywords" content="Campaignsquat Portfolio, Web Design Projects, UI/UX Case Studies, Software Development Showcase, Mobile App Portfolio" />
        <link rel="canonical" href="https://www.campaignsquat.com/our-projects" />
      </Helmet>

      <ProjectHero />

      <ProjectFilter />

      <Contact />
    </main>
  );
};

export default Projects;