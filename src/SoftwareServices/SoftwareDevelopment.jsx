import React, { useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
// Main Software Development component import
import SoftwareDevelopmentComp from '../components/SoftwareDevelopment'; 

// Performance optimize korar jonno Contact-ke lazy load kora holo
const Contact = lazy(() => import('../components/Contact'));

const SoftwareDevelopment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HelmetProvider>
      <div className="w-full bg-[#02050A] min-h-screen">
        {/* Main Component: Metadata, Schema, and Content eikhane thakbe */}
        <SoftwareDevelopmentComp />
        
        {/* Contact section-ti lazy load kora holo jate initial page load fast hoy.
            Suspense fallback-ti loading somoy layout-ke dhore rakhbe.
        */}
        <Suspense fallback={<div className="h-40 bg-[#02050A]"></div>}>
          <Contact />
        </Suspense>
      </div>
    </HelmetProvider>
  );
};

export default SoftwareDevelopment;