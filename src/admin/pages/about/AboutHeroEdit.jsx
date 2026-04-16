import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Send, Image as ImageIcon, CheckCircle } from "lucide-react";

const AboutHeroEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ডাইনামিক API BASE (আপনার আগের লজিক অনুযায়ী)
  const API_BASE =
    window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/about-content/hero`);
        if (res.data) {
          setFormData({
            title: res.data.title || "",
            description: res.data.description || "",
            imageUrl: res.data.imageUrl || "",
          });
          if (res.data.imageUrl) {
            // স্লাশ চেক করে প্রিভিউ সেট করা
            const imgPath = res.data.imageUrl.startsWith("/")
              ? res.data.imageUrl
              : `/${res.data.imageUrl}`;
            setImagePreview(`${API_BASE}${imgPath}`);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [API_BASE]);

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
    setStatus("");

    try {
      let finalImageUrl = formData.imageUrl;

      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        const uploadRes = await axios.post(
          `${API_BASE}/api/upload`,
          uploadData,
        );
        finalImageUrl = uploadRes.data.url;
      }

      const res = await axios.post(
        `${API_BASE}/api/about-content/hero/update`,
        {
          title: formData.title,
          description: formData.description,
          imageUrl: finalImageUrl,
        },
      );

      if (res.data.success) {
        setStatus("success");
        setSelectedFile(null);
        setTimeout(() => setStatus(""), 4000);
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 md:p-10 bg-[#F9FAFB] min-h-screen font-poppins text-slate-900">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-black tracking-tight uppercase italic">
            About Hero <span className="text-[#F7A400]">Editor</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage your website's about page hero section
          </p>
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg border border-green-200 animate-bounce">
            <CheckCircle size={18} />
            <span className="font-bold text-sm">
              Successfully Pushed to Live!
            </span>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Side - Form Inputs (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="mb-6">
                <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 mb-2 block">
                  Hero Headline
                </label>
                <textarea
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-xl focus:border-[#F7A400] focus:bg-white outline-none h-32 text-xl font-bold transition-all"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. We Build Digital Products That Matter"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 mb-2 block">
                  Detailed Description
                </label>
                <textarea
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-xl focus:border-[#F7A400] focus:bg-white outline-none h-80 leading-relaxed text-slate-600 transition-all"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Tell your story here..."
                />
              </div>
            </div>

            {/* Submit Button Area */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className={`flex-grow md:flex-grow-0 group bg-black text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#F7A400] hover:text-black"}`}
                disabled={loading}
              >
                {loading ? "SYNCING..." : "PUBLISH CHANGES"}
                <Send
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Right Side - Media Upload (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 mb-4 block">
                Feature Image
              </label>

              <div className="relative group overflow-hidden rounded-xl bg-slate-100 aspect-square mb-4 border-2 border-dashed border-slate-200 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon
                      className="mx-auto text-slate-300 mb-2"
                      size={48}
                    />
                    <p className="text-xs text-slate-400">No image selected</p>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-xl">
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

              <p className="text-[10px] text-slate-400 text-center italic">
                Recommended: 1200 x 800px (PNG/JPG)
              </p>
            </div>

            {/* Quick Status Card */}
            <div className="bg-black p-6 rounded-2xl shadow-lg text-white">
              <h4 className="text-[10px] uppercase tracking-[3px] font-bold text-[#F7A400] mb-4">
                Live Preview Info
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50 text-xs">Title Length:</span>
                  <span className="font-mono">
                    {formData.title.length} chars
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50 text-xs">Last Status:</span>
                  <span className="text-green-400 font-bold">
                    {status === "success" ? "Updated" : "Synced"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutHeroEdit;
