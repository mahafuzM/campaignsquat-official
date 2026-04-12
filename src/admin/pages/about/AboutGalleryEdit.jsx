import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutGalleryEdit = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // আপনার বেইজ URL
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/about-gallery`);
        // ডাটাবেস থেকে সরাসরি অ্যারে আসতে পারে অথবা অবজেক্টের ভেতর images থাকতে পারে
        const data = res.data.images || res.data;
        if (Array.isArray(data)) setImages(data);
      } catch (err) { console.error("Fetch Error:", err); }
    };
    fetchGallery();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // ১. ফাইল আপলোড করা
      const res = await axios.post(`${BASE_URL}/api/upload`, formData);
      
      // ২. নতুন ইমেজ পাথ অ্যারেতে যোগ করা
      const newImageUrl = res.data.url; 
      const updatedImages = [...images, newImageUrl];
      
      // ৩. ডাটাবেসে নতুন অ্যারে আপডেট করা
      const updateRes = await axios.post(`${BASE_URL}/api/about-gallery/update`, { images: updatedImages });
      
      if (updateRes.data) {
        // আপডেট হওয়ার পর নতুন লিস্ট সেট করা (যাতে সাথে সাথে প্রিভিউ দেখা যায়)
        setImages(updateRes.data.images || updatedImages);
        alert("✅ Upload Success!");
      }
    } catch (err) { 
      console.error(err);
      alert("❌ Upload failed!"); 
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (index) => {
    if (window.confirm("Delete this image?")) {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
      try {
        await axios.post(`${BASE_URL}/api/about-gallery/update`, { images: updatedImages });
      } catch (err) {
        alert("❌ Delete sync failed!");
        // ভুল হলে আবার আগের ডাটা নিয়ে আসা
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-poppins text-black">
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-[#F7A400] pb-2 inline-block text-black">
        Gallery Image Management
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {images.map((img, idx) => {
          // ✅ স্লাশ হ্যান্ডেলিং লজিক
          const fullImgUrl = img.startsWith('http') 
            ? img 
            : `${BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`;

          return (
            <div key={idx} className="relative aspect-[3/4] rounded-xl shadow-lg border-2 border-white bg-white group">
              {/* মেইন ইমেজ */}
              <img 
                src={fullImgUrl} 
                className="w-full h-full object-cover rounded-xl" 
                alt="Gallery Item" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found'; }}
              />
              
              {/* 🔴 ডিলিট বাটন */}
              <button 
                onClick={() => removeImage(idx)}
                className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-800 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-xl z-10 border-2 border-white transition-transform active:scale-90"
                title="Remove Image"
              >
                <span className="text-sm font-bold">✕</span>
              </button>
            </div>
          );
        })}

        {/* আপলোড কার্ড */}
        <label className="border-3 border-dashed border-gray-400 flex flex-col items-center justify-center aspect-[3/4] rounded-xl cursor-pointer hover:border-[#F7A400] hover:bg-orange-50 transition-all">
          <input type="file" hidden onChange={handleUpload} disabled={uploading} accept="image/*" />
          <div className="text-4xl text-gray-400 mb-2">
            {uploading ? <div className="animate-spin h-8 w-8 border-4 border-t-[#F7A400] rounded-full border-gray-200"></div> : '+'}
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase">
            {uploading ? 'Uploading' : 'Add New'}
          </span>
        </label>
      </div>
    </div>
  );
};

export default AboutGalleryEdit;