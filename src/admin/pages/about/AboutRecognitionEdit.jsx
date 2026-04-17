import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { Upload, PlusCircle, Trash2, Save, Globe, Info, Loader2 } from "lucide-react";

const AboutRecognitionEdit = () => {
  const [mainTitle, setMainTitle] = useState("");
  const [image, setImage] = useState("");
  const [platforms, setPlatforms] = useState([{ platform: "", desc: "" }]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // ১. ডাটাবেস থেকে বর্তমান ডাটা লোড করা
  useEffect(() => {
    const fetchRecognitionData = async () => {
      try {
        const res = await axios.get("/api/about-recognition");
        if (res.data) {
          setMainTitle(res.data.mainTitle || "");
          setImage(res.data.image || "");
          setPlatforms(res.data.platforms || [{ platform: "", desc: "" }]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load recognition data.");
      }
    };
    fetchRecognitionData();
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
      toast.success("Image uploaded successfully! ✅");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed! ❌");
    } finally {
      setUploading(false);
      e.target.value = null;
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
      toast.success("Recognition data updated successfully! ✅");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed! ❌");
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
      toast.error("At least one platform is required!");
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
    : `${(axios.defaults.baseURL || "")}${image?.startsWith("/") ? "" : "/"}${image}`;

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3 flex items-center gap-3">
              <Globe className="text-[#F7A400]" size={28} />
              About: Recognition
            </h1>
            <p className="text-sm text-gray-500 mt-2 pl-4">
              Manage global awards and platform achievements.
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
              onClick={handleUpdate}
              disabled={loading}
              className="px-6 py-2 bg-[#F7A400] text-white rounded-md font-medium text-sm flex items-center gap-2 transition-all shadow-sm disabled:opacity-70 hover:bg-[#d98f00]"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Main Title Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-2">
              <Info size={14} className="text-[#F7A400]" /> Section Heading
            </label>
            <input
              className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-xl font-bold rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-4 transition-all outline-none"
              placeholder="e.g. The Global Recognition"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
            />
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-center">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-4 block">
                Feature Illustration
              </label>
              <div className="relative group cursor-pointer h-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-[#F7A400] hover:bg-orange-50/30 transition-all">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  accept="image/*"
                  disabled={uploading}
                />
                <div className="flex flex-col items-center gap-3">
                  {uploading ? (
                    <Loader2 className="text-[#F7A400] animate-spin mb-2" size={32} />
                  ) : (
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center group-hover:bg-[#F7A400] group-hover:text-white transition-colors group-hover:border-[#F7A400] mb-2">
                      <Upload size={24} />
                    </div>
                  )}
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-900">
                    {uploading ? "Uploading..." : "Click to Replace Image"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[300px]">
              {image ? (
                <div className="relative rounded-md overflow-hidden border border-gray-200 shadow-sm w-full h-full flex pt-[56.25%] bg-gray-50">
                  <img src={fullImgUrl} className="absolute inset-0 w-full h-full object-contain p-2" alt="Preview" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-300">
                  <Globe size={48} strokeWidth={1} />
                  <span className="mt-3 text-xs uppercase tracking-widest font-medium">No preview available</span>
                </div>
              )}
            </div>
          </div>

          {/* Platforms List Section */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                Recognition Platforms ({platforms.length})
              </h3>
              <button
                onClick={addMore}
                className="flex items-center gap-1.5 text-[#F7A400] font-bold text-xs uppercase tracking-wider hover:text-[#d98f00] transition-colors"
              >
                <PlusCircle size={16} /> Add Platform
              </button>
            </div>

            {platforms.map((p, index) => (
              <div
                key={index}
                className="group relative bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 transition-all hover:border-[#F7A400]/50"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Platform Name</label>
                    <input
                      className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-md font-bold text-gray-900 focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all"
                      placeholder="e.g. Upwork"
                      value={p.platform}
                      onChange={(e) => updatePlatform(index, "platform", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 min-h-[4rem]">
                    <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Description</label>
                    <textarea
                      className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-md text-gray-600 focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none min-h-[80px] transition-all resize-none"
                      placeholder="e.g. Top Rated Agency"
                      value={p.desc}
                      onChange={(e) => updatePlatform(index, "desc", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={() => removePlatform(index)}
                    className="p-3 bg-red-50/50 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    title="Remove Platform"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRecognitionEdit;