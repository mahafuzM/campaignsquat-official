import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, User, Clock, Eye, ArrowLeft, Share2,
  Facebook, Twitter, Linkedin, Instagram 
} from 'lucide-react';
import Contact from '../components/Contact';

const BlogDetails = () => {
  const { url } = useParams(); // App.js এ :url থাকলে এটি ব্যবহার করুন
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // ডাটাবেস থেকে স্লাগ অনুযায়ী ডেটা আনা
        const res = await axios.get(`${BASE_URL}/api/blogs/url/${url}`);
        if (res.data) {
          setBlog(res.data);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchBlog();
  }, [url]);

  // ইমেজ পাথ ঠিক করার ফাংশন
  const fixImagePath = (path) => {
    if (!path) return "https://via.placeholder.com/1200x600";
    if (path.startsWith('http')) return path;
    let cleanPath = path.replace(/\\/g, '/');
    if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);
    return `${BASE_URL}/${cleanPath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02050A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#F7A400] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#02050A] text-white flex flex-col items-center justify-center font-poppins">
        <h2 className="text-2xl mb-4 text-[#F7A400]">Blog Not Found!</h2>
        <button onClick={() => navigate('/blog')} className="underline">Go Back to Blogs</button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#02050A] font-poppins text-white overflow-x-hidden -mt-8 md:-mt-10">
      <div className="max-w-[1445px] mx-auto px-4 md:px-12 lg:px-20 py-8 md:py-18">
        
        <div className="bg-[#0a0a0a] border border-[#ffffff10] rounded-[5px] overflow-hidden shadow-2xl">
          
          {/* 1. Header */}
          <div className="p-6 md:p-16 lg:p-20 text-center flex flex-col gap-8">
            <h1 className="text-[22px] md:text-[28px] lg:text-[28px] font-bold leading-tight max-w-[1200px] mx-auto">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 border-b border-[#ffffff10] pb-8 text-white">
                <div className="flex items-center gap-2 font-medium"><User size={18} className="text-white"/> By {blog.author || 'Admin'}</div>
                <div className="flex items-center gap-2"><Calendar size={18} className="text-white"/> {new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <div className="flex items-center gap-2"><Clock size={18} className="text-white"/> {blog.readTime || '10 Min Read'}</div>
                <div className="flex items-center gap-2"><Eye size={18} className="text-white"/> {blog.views || '0'} Views</div>
            </div>
          </div>

          {/* 2. Main Image */}
          <div className="px-4 md:px-16 lg:px-20 -mt-4 md:-mt-8 mb-10">
            <div className="w-full h-[250px] md:h-[500px] lg:h-[600px] rounded-[5px] overflow-hidden border border-[#ffffff10]">
              <img src={fixImagePath(blog.image)} className="w-full h-full object-cover" alt={blog.title} />
            </div>
          </div>

          {/* 3. Share Bar */}
          <div className="bg-[#02050A] border-y border-[#ffffff10] px-6 md:px-24 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Share2 size={20} className="text-white" />
              <span className=" font-semibold text-[12px] md:text-[14px] tracking-widest">Share Post</span>
            </div>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-[#ffffff15] rounded-full flex items-center justify-center hover:text-[#f7a400] transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 4. Content Area */}
          <div className="p-6 md:p-16 lg:p-24 flex flex-col gap-10">
            {blog.sections && blog.sections.map((item, index) => {
              if (item.type === 'heading') {
                return <h2 key={index} className="text-[20px] md:text-[22px] font-bold text-white mt-4 border-l-4 border-[#f7a400] pl-4">{item.value}</h2>;
              } 
              else if (item.type === 'image') {
                return (
                  <div key={index} className="w-full h-[250px] md:h-[450px] rounded-[5px] overflow-hidden border border-[#ffffff10] my-4">
                    <img src={fixImagePath(item.value)} className="w-full h-full object-cover" alt="content" />
                  </div>
                );
              } 
              else if (item.type === 'list') {
                return (
                  <ul key={index} className="space-y-2 md:space-y-3 ml-2 md:ml-4">
                    {item.items && item.items.map((point, i) => {
                      const hasColon = point.includes(': ');
                      const parts = hasColon ? point.split(': ') : [point];
                      
                      return (
                        <li key={i} className="flex items-start gap-3 text-[14px] md:text-[16px] leading-relaxed">
                          <span className="text-[#f7a400] mt-1.5 flex-shrink-0">•</span> 
                          <span>
                            {hasColon ? (
                              <>
                                <strong className="text-white font-bold">{parts[0]}:</strong> {parts.slice(1).join(': ')}
                              </>
                            ) : (
                              point
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                );
              } 
              else {
                return <p key={index} className="text-[14px] md:text-[16px] leading-[1.8] text-justify font-light">{item.value}</p>;
              }
            })}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-[#ffffff10]">
              <div className="flex flex-wrap gap-4">
                {blog.tags && blog.tags.map(tag => (
                  <span key={tag} className="px-6 py-2 bg-[#111] border border-[#ffffff10] text-white text-[10px] md:text-[12px] rounded hover:border-[#f7a400] transition-all cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-12 mb-16">
          <button onClick={() => navigate('/blog')} className="flex items-center gap-3 bg-[#f7a400] text-black px-12 py-2 rounded-[5px] font-semibold border-2 border-[#f7a400] hover:bg-transparent hover:text-white transition-all duration-300 text-[14px] md:text-[15px]">
            <ArrowLeft size={20} /> Back To Blog
          </button>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default BlogDetails;