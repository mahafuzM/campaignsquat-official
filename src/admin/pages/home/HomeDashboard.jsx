import React from 'react';
import { Link } from 'react-router-dom';

const HomeDashboard = () => {
  // তোমার হোম পেজের সব সেকশনের লিস্ট
  const sections = [
    { id: 1, name: 'Hero Header Section', path: 'hero', icon: '🚀' },
    { id: 2, name: 'Brand Logos Slider', path: 'brands', icon: '🏢' },
    { id: 3, name: 'Company Overview (About)', path: 'about', icon: 'ℹ️' },
    { id: 4, name: 'Skills & Technologies', path: 'skills', icon: '💻' },
    { id: 5, name: 'Services Offerings', path: 'services', icon: '🛠️' },
    // ভবিষ্যতে আরও সেকশন এখানে যোগ করবে...
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#F7A400] mb-8">Home Page Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link 
            key={section.id} 
            to={`/admin/home/${section.path}`}
            className="bg-[#050910] border border-gray-800 p-6 rounded-xl hover:border-[#F7A400] transition-all group"
          >
            <div className="text-4xl mb-4">{section.icon}</div>
            <h3 className="text-xl font-semibold text-white group-hover:text-[#F7A400]">
              {section.name}
            </h3>
            <p className="text-gray-500 mt-2 text-sm">Click to edit this section content</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeDashboard;