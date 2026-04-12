import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // ১. এইটা ইমপোর্ট করবি

/* 1. Importing all About Page Sections */
import AboutHero from '../components/AboutHero';
import AboutVision from '../components/AboutVision';
import AboutMission from '../components/AboutMission'; 
import AboutFeatures from '../components/AboutFeatures';
import AboutRecognition from '../components/AboutRecognition';
import AboutTeam from '../components/AboutTeam';
import AboutGallery from '../components/AboutGallery';
import Contact from '../components/Contact';
import DynamicSchema from '../components/DynamicSchema';

const About = () => {

  // Page-e click korle scroll upore niye jawar jonno eita dorkar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#02050A]">
      <DynamicSchema />
      {/* ২. SEO Meta Tags for About Page */}
      <Helmet>
        <title>About Us | Campaignsquat Ltd - Your Innovation Partner</title>
        <meta name="description" content="Discover Campaignsquat Ltd's journey, our mission to drive digital excellence, and the expert team building next-gen UI/UX, web, and software solutions." />
        <meta name="keywords" content="Campaignsquat Team, Our Mission, Digital Agency Vision, UI/UX Experts, Software Engineers" />
        <link rel="canonical" href="https://www.campaignsquat.com/about-us" />
      </Helmet>

      {/* Section 1: Hero Section */}
      <AboutHero />

      {/* Section 2: Excellence Through Innovation Section */}
      <AboutVision />

      {/* Section 3: Image Gallery */}
      <AboutGallery />

      {/* Section 4: Our Mission & Vision */}
      <AboutMission />
      
      {/* Section 5: Features */}
      <AboutFeatures />

      {/* Section 6: Recognition */}
      <AboutRecognition />

      {/* Section 7: Team */}
      <AboutTeam />

      <Contact />
    </main>
  );
};

export default About;
