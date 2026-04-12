import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // ১. হেলমেট ইমপোর্ট করা হলো
/* Components Import */
import ContactHero from '../components/ContactHero'; 
import Contact from '../components/Contact'; 
import ContactMap from '../components/ContactMap';
import DynamicSchema from '../components/DynamicSchema';

const ContactPage = () => {
  
  // 2. Page-e click korle jate ekdom upore niye jay
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-[#02050A]">
      <DynamicSchema />
      {/* ৩. Contact Page SEO Meta Tags */}
      <Helmet>
        <title>Contact Us | Campaignsquat Ltd - Get a Free Consultation</title>
        <meta name="description" content="Have a project in mind? Contact Campaignsquat Ltd today for expert UI/UX, web, and software development services. Let's build something amazing together." />
        <meta name="keywords" content="Contact Campaignsquat, Hire UI/UX Designers, Web Development Inquiry, Software Solutions Bangladesh, Tech Support" />
        <link rel="canonical" href="https://www.campaignsquat.com/contact" />
      </Helmet>

      {/* ১. আপনার নতুন কন্টাক্ট হিরো */}
      <ContactHero />

      {/* ২. হিরোর ঠিক নিচেই কন্টাক্ট সেকশন */}
      <Contact />
      
      <ContactMap />
      <div className="pb-20"></div>
    </main>
  );
};

export default ContactPage;
