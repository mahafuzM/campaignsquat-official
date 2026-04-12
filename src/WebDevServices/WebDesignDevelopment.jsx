import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // Helmet import korlam
import WebDesignDevelopment from '../components/WebDesignDevelopment'; 
import Contact from '../components/Contact';

const WebDesignDevelopmentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Eikhanei Helmet "porate" hoy SEO-r jonno */}
      <Helmet>
        <title>Web Design & Development | Your Agency Name</title>
        <meta name="description" content="High-end web design and enterprise-grade software development services." />
      </Helmet>

      <div className="w-full bg-[#02050A] min-h-screen">
        <WebDesignDevelopment />
        <Contact />
      </div>
    </>
  );
};

export default WebDesignDevelopmentPage;