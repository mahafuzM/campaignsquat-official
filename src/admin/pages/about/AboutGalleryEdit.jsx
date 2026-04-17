import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { Upload, Image as ImageIcon, Plus, Loader2, Trash2 } from "lucide-react";

const AboutGalleryEdit = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("/api/about-gallery");
        const data = res.data.images || res.data;
        if (Array.isArray(data)) setImages(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load gallery images.");
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
        toast.success("Image uploaded successfully! ✅");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed! ❌");
    } finally {
      setUploading(false);
      // Reset the file input block so the same file could be uploaded again if needed
      e.target.value = null;
    }
  };

  const removeImage = async (index) => {
    if (window.confirm("Are you sure you want to remove this memory?")) {
      const updatedImages = images.filter((_, i) => i !== index);
      const originalImages = [...images]; // ব্যাকআপ
      
      setImages(updatedImages); // UI আপডেট আগে (Optimistic Update)

      try {
        await axios.post("/api/about-gallery/update", { images: updatedImages });
        toast.success("Image removed successfully! 🗑️");
      } catch (err) {
        console.error("Delete sync error:", err);
        toast.error("Delete sync failed! ❌");
        setImages(originalImages); // ভুল হলে আগের ডাটা ফিরিয়ে আনা
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3">
              About: Gallery Section
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Organize and maintain your office and team visual memories.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-all shadow-sm"
            >
              Back
            </button>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Total Images:</span>
              <span className="text-sm font-black text-[#F7A400]">{images.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-100 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            
            {/* Add New Image Card */}
            <label className="group relative flex flex-col items-center justify-center aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 hover:border-[#F7A400] hover:bg-orange-50/30 transition-all cursor-pointer overflow-hidden order-first">
              <input
                type="file"
                hidden
                onChange={handleUpload}
                disabled={uploading}
                accept="image/*"
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 text-[#F7A400] animate-spin" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:bg-[#F7A400] group-hover:text-white transition-colors border border-gray-200 group-hover:border-[#F7A400]">
                    <Plus size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Add Memory</span>
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
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 border border-gray-200"
                >
                  {/* Main Image */}
                  <img
                    src={fullImgUrl}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={`Gallery Item ${idx + 1}`}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x800?text=Error+Loading";
                    }}
                  />

                  {/* Overlays & Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                    <div className="p-3 w-full">
                      <button
                        onClick={() => removeImage(idx)}
                        className="w-full bg-white/10 backdrop-blur-sm hover:bg-red-500 text-white py-2.5 rounded-md flex items-center justify-center gap-1.5 transition-colors border border-white/20 active:scale-95"
                      >
                        <Trash2 size={14} />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Number Badge */}
                  <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-md flex items-center justify-center text-[10px] font-bold text-white border border-white/20">
                    {idx + 1}
                  </div>
                </div>
              );
            })}

          </div>

          {/* Empty State */}
          {images.length === 0 && !uploading && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <ImageIcon size={48} strokeWidth={1.5} className="text-gray-300" />
              <p className="mt-3 font-medium uppercase tracking-widest text-xs">No images in gallery yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutGalleryEdit;