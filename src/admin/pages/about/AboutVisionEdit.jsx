import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Save, AlertCircle, CheckCircle2, Eye } from "lucide-react";

const AboutVisionEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const API_BASE = "/api";

  // ১. ডাটাবেস থেকে বর্তমান ডাটা নিয়ে আসা (ইউআরএল ফিক্সড)
  useEffect(() => {
    const fetchVisionData = async () => {
      try {
        // ✅ এখানে ইউআরএল অবশ্যই index.js এর সাথে মিলতে হবে
        const res = await axios.get(`${API_BASE}/api/about-vision-m`);
        if (res.data) {
          setFormData({
            title: res.data.title || "",
            description: res.data.description || "",
          });
          if (res.data.imageUrl) {
            const fullUrl = res.data.imageUrl.startsWith("http")
              ? res.data.imageUrl
              : `${API_BASE}/${res.data.imageUrl.replace(/^\//, "")}`;
            setPreview(fullUrl);
          }
        }
      } catch (err) {
        console.error("Error fetching vision data:", err);
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

  // ৩. ডাটা আপডেট করা (ইউআরএল ও হেডার ফিক্সড)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    // ✅ তোর রাউটে uploadM.single("image") দেওয়া আছে, তাই এখানেও "image" হতে হবে
    if (file) data.append("image", file);

    try {
      // ✅ ইউআরএল ফিক্সড: /api/about-vision-m
      const res = await axios.post(`${API_BASE}/api/about-vision-m`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // নিশ্চিত হ যে কী-এর নাম 'token' নাকি 'adminToken'
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.data && res.data.data.imageUrl) {
        setPreview(`${API_BASE}/${res.data.data.imageUrl.replace(/^\//, "")}`);
      }

      setMessage({
        type: "success",
        text: "Vision section updated successfully! ✅",
      });
      setFile(null);
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      setMessage({
        type: "error",
        text: "Failed to update. Check server connection! ❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#F8F9FA] min-h-screen font-poppins">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#02050A] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Save className="text-[#F7A400]" size={22} />
              Edit About Vision
            </h2>
            <p className="text-gray-400 text-[11px] mt-1 uppercase tracking-wider">
              Manage Company Vision Content
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Section: About Page
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10">
          {/* Status Alert */}
          {message.text && (
            <div
              className={`mb-8 p-4 rounded-lg flex items-center gap-3 animate-in fade-in duration-500 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
            >
              {message.type === "success" ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span className="font-medium text-sm">{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Side: Inputs (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-black mb-2 uppercase tracking-tight">
                  Main Vision Title
                </label>
                <textarea
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g. Your Success is Our Reputation..."
                  className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-[#F7A400] outline-none text-gray-800 transition-all text-lg font-semibold"
                  required
                />
                <p className="text-[10px] text-gray-500 mt-2 italic">
                  * Use '\n' for line breaks in the title.
                </p>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-black mb-2 uppercase tracking-tight">
                  Vision Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-[#F7A400] outline-none text-gray-800 transition-all leading-relaxed"
                  required
                />
              </div>
            </div>

            {/* Right Side: Media (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              <label className="block text-[13px] font-bold text-black mb-2 uppercase tracking-tight">
                Vision Image
              </label>

              <div className="relative group border-2 border-dashed border-gray-300 rounded-xl overflow-hidden hover:border-[#F7A400] transition-all bg-gray-50 aspect-video lg:aspect-square flex items-center justify-center">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                      <Upload size={30} className="mb-2 text-[#F7A400]" />
                      <p className="text-sm font-bold">Replace Vision Image</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <Upload className="mx-auto text-gray-400 mb-3" size={40} />
                    <p className="text-gray-500 text-sm font-medium">
                      Click or Drag to Upload
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-2">
                <Eye size={16} className="text-blue-600 shrink-0" />
                <p className="text-[10px] text-blue-700">
                  Live Preview: This image will be displayed on the About page
                  with a 46% width ratio.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#F7A400] text-black hover:text-white hover:bg-[#02050A] font-bold py-3 px-10 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center justify-center gap-2 min-w-[220px] ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={18} /> Update Vision Section
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-[5px] transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutVisionEdit;
