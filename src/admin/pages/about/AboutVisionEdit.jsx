import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { Upload, Save, Eye, Image as ImageIcon } from "lucide-react";

const AboutVisionEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ১. ডাটাবেস থেকে বর্তমান ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchVisionData = async () => {
      try {
        const res = await axios.get(`/api/about-vision-m`);
        if (res.data) {
          setFormData({
            title: res.data.title || "",
            description: res.data.description || "",
          });
          if (res.data.imageUrl) {
            const fullUrl = res.data.imageUrl.startsWith("http")
              ? res.data.imageUrl
              : `/${res.data.imageUrl.replace(/^\//, "")}`;
            setPreview(`${(axios.defaults.baseURL || "")}${fullUrl}`);
          }
        }
      } catch (err) {
        console.error("Error fetching vision data:", err);
        toast.error("Failed to load vision settings.");
      }
    };
    fetchVisionData();
  }, []);

  // ২. ইনপুট হ্যান্ডলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ৩. ডাটা আপডেট করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (file) data.append("image", file);

    try {
      const res = await axios.post(`/api/about-vision-m`, data);

      if (res.data.data && res.data.data.imageUrl) {
        setPreview(`${(axios.defaults.baseURL || "")}/${res.data.data.imageUrl.replace(/^\//, "")}`);
      }

      toast.success("Vision section updated successfully! ✅");
      setFile(null);
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      toast.error("Failed to update. Check server connection! ❌");
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
              About: Vision Section
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage your company's vision statement and primary vision imagery.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-all shadow-sm"
            >
              Cancel
            </button>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Main Vision Title
                </label>
                <textarea
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g. Your Success is Our Reputation..."
                  className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-lg sm:text-xl font-bold rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-4 transition-all outline-none resize-none"
                  required
                />
                <p className="text-[10px] text-gray-400 mt-1 italic">
                  * Use '\n' for line breaks in the title.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Vision Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="8"
                  className="w-full bg-gray-50/50 border border-gray-200 text-gray-600 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-4 transition-all outline-none resize-none leading-relaxed"
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Side: Media */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h2 className="text-sm font-semibold mb-4 text-gray-800">
                Vision Image
              </h2>

              <div className="relative group overflow-hidden rounded-md bg-gray-50 aspect-video lg:aspect-square mb-4 border border-dashed border-gray-300 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon className="mx-auto text-gray-300 mb-2" size={40} />
                    <p className="text-xs text-gray-400 font-medium">
                      No image selected
                    </p>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white p-4">
                  <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-md font-semibold text-xs flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors">
                    <Upload size={14} /> REPLACE
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-blue-50/50 p-3 rounded-md border border-blue-100/50 flex gap-2">
                <Eye size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-600 leading-relaxed">
                  Live Preview: This image will be displayed on the About page
                  with a 46% width ratio based on the frontend structure.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AboutVisionEdit;
