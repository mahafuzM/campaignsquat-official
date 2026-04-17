import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { Upload, Save, Image as ImageIcon } from "lucide-react";

const AboutHeroEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/about-content/hero`);
        if (res.data) {
          setFormData({
            title: res.data.title || "",
            description: res.data.description || "",
            imageUrl: res.data.imageUrl || "",
          });
          if (res.data.imageUrl) {
            const imgPath = res.data.imageUrl.startsWith("/")
              ? res.data.imageUrl
              : `/${res.data.imageUrl}`;
            setImagePreview(`${(axios.defaults.baseURL || "")}${imgPath}`);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch hero data.");
      }
    };
    fetchData();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.imageUrl;

      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        const uploadRes = await axios.post(`/api/upload`, uploadData);
        finalImageUrl = uploadRes.data.url;
      }

      const res = await axios.post(`/api/about-content/hero/update`, {
        title: formData.title,
        description: formData.description,
        imageUrl: finalImageUrl,
      });

      if (res.data.success) {
        toast.success("Hero updated successfully!");
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to update hero.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3">
              About: Hero Section
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage your website's about page hero content and imagery.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#F7A400] text-white hover:bg-[#d98f00] text-[14px] font-medium py-2 px-6 rounded-md transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side - Form Inputs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-6">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Hero Headline
                </label>
                <textarea
                  className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-lg sm:text-xl font-bold rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-4 transition-all outline-none resize-none h-28"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. We Build Digital Products That Matter"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Detailed Description
                </label>
                <textarea
                  className="w-full bg-gray-50/50 border border-gray-200 text-gray-600 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-4 transition-all outline-none resize-none h-64 leading-relaxed"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Tell your story here..."
                />
              </div>

            </div>
          </div>

          {/* Right Side - Media Upload */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h2 className="text-sm font-semibold mb-4 text-gray-800">
                Hero Image
              </h2>

              <div className="relative group overflow-hidden rounded-md bg-gray-50 aspect-square mb-4 border border-dashed border-gray-300 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon
                      className="mx-auto text-gray-300 mb-2"
                      size={40}
                    />
                    <p className="text-xs text-gray-400 font-medium">No image selected</p>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-md font-semibold text-xs flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors">
                    <Upload size={14} /> REPLACE
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 text-center uppercase tracking-wide">
                Recommended: 1200 x 800px (PNG/JPG)
              </p>
            </div>

            {/* Quick Status Card */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-3">
                Live Status
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 text-xs">Title Length:</span>
                  <span className="font-mono text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200 text-xs">
                    {formData.title.length} chars
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 text-xs">Description:</span>
                  <span className="font-mono text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200 text-xs">
                    {formData.description.length} chars
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-500 text-xs">Image:</span>
                  {imagePreview ? (
                    <span className="text-green-600 font-semibold text-xs flex items-center gap-1">
                      Attached
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold text-xs">
                      Missing
                    </span>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeroEdit;
