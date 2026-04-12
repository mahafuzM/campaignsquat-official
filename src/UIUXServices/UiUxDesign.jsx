import React, { useEffect } from 'react';
import UIUXDesignSection from '../components/UIUXDesign'; 
import Contact from '../components/Contact';
// Helmet eikhane dorkar nei, karon amra component-er bhetore detail SEO korechi

const UiUxDesignPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#02050A] min-h-screen">
      {/* Eikhane alada kore Helmet dewar dorkar nei. 
        Component-er bhetore je SEO settings kora hoyeche, shetai best practice.
      */}
      
      <UIUXDesignSection /> 
      <Contact />
    </div>
  );
};

export default UiUxDesignPage;