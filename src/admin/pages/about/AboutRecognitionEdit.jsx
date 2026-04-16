import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Plus, Trash2, Save, Globe, Info, Loader2 } from "lucide-react";

const AboutRecognitionEdit = () => {
  const [mainTitle, setMainTitle] = useState("");
  const [image, setImage] = useState("");
  const [platforms, setPlatforms] = useState([{ platform: "", desc: "" }]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // app.jsx থেকে আসা বেইজ URL
  const API_BASE = axios.defaults.baseURL;

  // ১. ডাটাবেস থেকে বর্তমান ডাটা লোড করা
  useEffect(() => {
    axios
      .get("/api/about-recognition")
      .then((res) => {
        if (res.data) {
          setMainTitle(res.data.mainTitle || "");
          setImage(res.data.image || "");
          setPlatforms(res.data.platforms || [{ platform: "", desc: "" }]);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ২. ইমেজ আপলোড হ্যান্ডলার
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const res = await axios.post("/api/upload", formData);
      setImage(res.data.url);
    } catch (err) {
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // ৩. সব ডাটা একসাথে সেভ/আপডেট করা
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.post("/api/about-recognition/update", {
        mainTitle,
        image,
        platforms,
      });
      alert("✅ Recognition Content Updated Successfully!");
    } catch (err) {
      alert("❌ Update failed!");
    } finally {
      setLoading(false);
    }
  };

  // ৪. প্ল্যাটফর্ম ম্যানেজমেন্ট ফাংশন
  const addMore = () => setPlatforms([...platforms, { platform: "", desc: "" }]);

  const removePlatform = (index) => {
    if (platforms.length > 1) {
      setPlatforms(platforms.filter((_, i) => i !== index));
    } else {
      alert("At least one platform is required!");
    }
  };

  const updatePlatform = (index, field, value) => {
    const newArr = [...platforms];
    newArr[index][field] = value;
    setPlatforms(newArr);
  };

  // ইমেজ পাথ হ্যান্ডলিং
  const fullImgUrl = image?.startsWith("http") 
    ? image 
    : `${API_BASE}${image?.startsWith("/") ? "" : "/"}${image}`;

  return (
    <div className="p-6 md:p-10 bg-[#F8FAFC] min-h-screen text-slate-900 font-poppins">
      
      {/* Header Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic flex items-center gap-3">
            <Globe className="text-[#F7A400]" size={32} />
            Recognition <span className="text-[#F7A400]">Admin</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Manage global awards and platform achievements</p>
        </div>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-[#F7A400] hover:text-black transition-all shadow-xl disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {loading ? "SAVING..." : "SAVE CHANGES"}
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Main Title Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#F7A400]"></div>
          <label className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">
            <Info size={14} /> Section Heading
          </label>
          <input
            className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-xl focus:border-[#F7A400] focus:bg-white outline-none font-bold text-2xl transition-all"
            placeholder="e.g. The Global Recognition"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
          />
        </div>

        {/* Image Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
             <label className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-6 block">
              Feature Illustration
            </label>
            <div className="relative group cursor-pointer">
              <input
                type="file"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept="image/*"
              />
              <div className="border-3 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center group-hover:border-[#F7A400] group-hover:bg-orange-50 transition-all">
                <Upload className="text-slate-300 group-hover:text-[#F7A400] mb-2" size={40} />
                <span className="text-sm font-bold text-slate-500 group-hover:text-black">
                  {uploading ? "Uploading..." : "Click to Replace Image"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
            {image ? (
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white aspect-video w-full">
                <img src={fullImgUrl} className="w-full h-full object-cover" alt="Preview" />
              </div>
            ) : (
              <div className="text-slate-300 italic text-sm">No preview available</div>
            )}
          </div>
        </div>

        {/* Platforms List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">
              Recognition Platforms ({platforms.length})
            </h3>
            <button
              onClick={addMore}
              className="flex items-center gap-2 text-[#F7A400] font-bold text-sm hover:underline"
            >
              <Plus size={18} /> Add New Platform
            </button>
          </div>

          {platforms.map((p, index) => (
            <div
              key={index}
              className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 transition-all hover:border-[#F7A400]"
            >
              <div className="flex-1 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Name</label>
                  <input
                    className="w-full p-3 bg-slate-50 border border-transparent rounded-xl font-black text-xl focus:border-[#F7A400] outline-none transition-all"
                    placeholder="e.g. Upwork"
                    value={p.platform}
                    onChange={(e) => updatePlatform(index, "platform", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                  <textarea
                    className="w-full p-3 bg-slate-50 border border-transparent rounded-xl font-medium focus:border-[#F7A400] outline-none min-h-[80px] transition-all"
                    placeholder="e.g. Top Rated Agency"
                    value={p.desc}
                    onChange={(e) => updatePlatform(index, "desc", e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={() => removePlatform(index)}
                className="self-start md:self-center p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutRecognitionEdit;