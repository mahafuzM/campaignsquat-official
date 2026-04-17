import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, X, Image as ImageIcon, Plus, Loader2, Trash2 } from "lucide-react";

const AboutGalleryEdit = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // app.jsx থেকে আসা বেইজ URL
  

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("/api/about-gallery");
        const data = res.data.images || res.data;
        if (Array.isArray(data)) setImages(data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchGallery();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // ১. ফাইল আপলোড
      const res = await axios.post("/api/upload", formData);
      const newImageUrl = res.data.url;
      const updatedImages = [...images, newImageUrl];

      // ২. ডাটাবেসে অ্যারে আপডেট
      const updateRes = await axios.post("/api/about-gallery/update", { 
        images: updatedImages 
      });

      if (updateRes.data) {
        setImages(updateRes.data.images || updatedImages);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (index) => {
    if (window.confirm("Are you sure you want to remove this memory?")) {
      const updatedImages = images.filter((_, i) => i !== index);
      const originalImages = [...images]; // ব্যাকআপ
      
      setImages(updatedImages); // UI আপডেট আগে (Optimistic Update)

      try {
        await axios.post("/api/about-gallery/update", { images: updatedImages });
      } catch (err) {
        alert("❌ Delete sync failed!");
        setImages(originalImages); // ভুল হলে আগের ডাটা ফিরিয়ে আনা
      }
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#F8FAFC] min-h-screen font-poppins text-slate-900">
      
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">
            Gallery <span className="text-[#F7A400]">Manager</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Organize and maintain your office & team memories</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Images</span>
            <span className="text-xl font-black text-black">{images.length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          
          {/* Add New Image Card */}
          <label className="group relative flex flex-col items-center justify-center aspect-[3/4] rounded-3xl border-3 border-dashed border-slate-200 bg-white hover:border-[#F7A400] hover:bg-orange-50/30 transition-all cursor-pointer overflow-hidden order-first">
            <input
              type="file"
              hidden
              onChange={handleUpload}
              disabled={uploading}
              accept="image/*"
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-10 w-10 text-[#F7A400] animate-spin" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-[#F7A400] group-hover:text-white transition-colors">
                  <Plus size={32} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-black transition-colors">Add Memory</span>
              </div>
            )}
          </label>

          {/* Gallery Items */}
          {images.map((img, idx) => {
            const cleanPath = img.startsWith("/") ? img : `/${img}`;
            const fullImgUrl = img.startsWith("http") ? img : `${(axios.defaults.baseURL || "")}${cleanPath}`;

            return (
              <div
                key={idx}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-500 border-4 border-white"
              >
                {/* Main Image */}
                <img
                  src={fullImgUrl}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Gallery Item"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x800?text=Error+Loading";
                  }}
                />

                {/* Overlays & Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => removeImage(idx)}
                      className="w-full bg-white/10 backdrop-blur-md hover:bg-red-500 text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition-all border border-white/20 active:scale-95"
                    >
                      <Trash2 size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">Remove</span>
                    </button>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-7 h-7 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-[10px] font-bold text-white border border-white/30">
                  {idx + 1}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Empty State */}
      {images.length === 0 && !uploading && (
        <div className="flex flex-col items-center justify-center py-32 text-slate-300">
          <ImageIcon size={64} strokeWidth={1} />
          <p className="mt-4 font-medium uppercase tracking-widest text-sm">No images in gallery yet</p>
        </div>
      )}
    </div>
  );
};

export default AboutGalleryEdit;