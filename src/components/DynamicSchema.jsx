import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const DynamicSchema = ({ pageTitle }) => {
  const location = useLocation();
  const baseUrl = "https://campaignsquat.com";
  const pathnames = location.pathname.split('/').filter((x) => x);

  // ১. Breadcrumb Schema Logic
  const breadcrumbElements = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl,
    },
  ];

  pathnames.forEach((value, index) => {
    const url = `${baseUrl}/${pathnames.slice(0, index + 1).join('/')}`;
    // URL থেকে নাম নিয়ে ফরম্যাট করা (যেমন: saas-dashboard -> Saas Dashboard)
    const displayName = pageTitle || value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    breadcrumbElements.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": displayName,
      "item": url,
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbElements,
  };

  // ২. Organization Schema (শুধু হোমপেজের জন্য)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Campaignsquat Ltd.",
    "url": baseUrl,
    "logo": `${baseUrl}/campaign-squat-2-1.png`, // আপনার লোগো ফাইল নেম আপডেট করা হয়েছে
    "sameAs": [
      "https://www.facebook.com/campaignsquat",
      "https://www.linkedin.com/company/campaignsquatltd/",
      "https://www.instagram.com/campaignsquatbd/",
      "https://x.com/CampaignSquat",
      "https://uk.pinterest.com/campaignsquatltd/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "01330-093408", // আপনার নতুন ফোন নম্বর আপডেট করা হয়েছে
      "contactType": "customer service",
      "areaServed": "Global"
    }
  };

  return (
    <Helmet>
      {/* Breadcrumb সব পেজে থাকবে */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Organization Schema শুধু হোমপেজে (/) দেখাবে */}
      {location.pathname === "/" && (
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default DynamicSchema;
