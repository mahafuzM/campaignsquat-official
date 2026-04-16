import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPlus, FaSave, FaCloudUploadAlt } from "react-icons/fa";

const AboutTeamEdit = () => {
  const [formData, setFormData] = useState({
    badgeText: "",
    mainTitle: "",
    highlightTitle: "",
    ceoName: "",
    ceoDesignation: "",
    experienceType: "",
    ceoMessage: "",
    closingTitle: "",
    closingSub: "",
    image: "",
    recognitionItems: [],
  });
  const [loading, setLoading] = useState(false);

  // app.jsx থেকে আসা baseURL ব্যবহার করার জন্য
  const API_BASE = axios.defaults.baseURL;

  useEffect(() => {
    axios.get("/api/about-team")
      .then((res) => {
        if (res.data) setFormData(res.data);
      })
      .catch(err => console.error("Data loading failed", err));
  }, []);

  // --- ইমেজ আপলোড হ্যান্ডলার ---
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    
    try {
  const res = await axios.post("/api/upload", fd);
  
  // যদি ব্যাকএন্ড থেকে res.data.url এ শুধু '/uploads/...' পার্টটুকু আসে
  if (res.data && res.data.url) {
    setFormData((prev) => ({ ...prev, image: res.data.url }));
    alert("Image Uploaded!"); 
  }
} catch (err) {
  console.error("Upload error:", err);
  alert("Upload failed! Please try again.");
}
  };

  // --- ডাইনামিক আইটেম ম্যানেজমেন্ট ---
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.recognitionItems];
    newItems[index][field] = value;
    setFormData({ ...formData, recognitionItems: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      recognitionItems: [
        ...formData.recognitionItems,
        { platformName: "", description: "" },
      ],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.recognitionItems.filter((_, i) => i !== index);
    setFormData({ ...formData, recognitionItems: newItems });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.post("/api/about-team/update", formData);
      alert("Everything Updated Successfully! 🚀");
    } catch (err) {
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  // ইমেজ পাথ ক্লিন করা
  const fullImageUrl = formData.image?.startsWith("http")
    ? formData.image
    : `${API_BASE}${formData.image?.startsWith("/") ? "" : "/"}${formData.image}`;

  return (
    <div className="p-6 md:p-10 bg-[#F4F7F6] min-h-screen font-poppins text-slate-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black mb-8 border-b-4 border-[#2E7D32] pb-2 inline-block uppercase italic tracking-tighter">
          CEO Message & <span className="text-[#F7A400]">Recognition</span>
        </h2>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl flex flex-col gap-10 border border-slate-100">
          
          {/* --- CEO & HERO SECTION --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Image Preview & Upload */}
            <div className="md:col-span-2 bg-slate-50 p-6 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center">
              <label className="font-black uppercase text-xs text-slate-400 mb-4 tracking-widest">CEO Profile Photo</label>
              <div className="flex flex-col items-center gap-4">
                {formData.image && (
                  <div className="relative group">
                    <img
                      src={fullImageUrl}
                      className="w-32 h-40 object-cover rounded-xl shadow-lg border-4 border-white"
                      alt="CEO Preview"
                    />
                  </div>
                )}
                <label className="cursor-pointer bg-white border border-slate-200 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#F7A400] hover:text-white transition-all shadow-sm">
                  <FaCloudUploadAlt /> {formData.image ? "Change Photo" : "Upload Photo"}
                  <input type="file" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-slate-600">CEO Name</label>
              <input
                className="p-3 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:border-[#F7A400] outline-none transition-all font-semibold"
                value={formData.ceoName}
                onChange={(e) => setFormData({ ...formData, ceoName: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-slate-600">Experience Badge Text</label>
              <input
                className="p-3 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:border-[#F7A400] outline-none transition-all font-semibold"
                placeholder="e.g. 10+ Years"
                value={formData.experienceType}
                onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-slate-600">Main Heading (Dark)</label>
              <input
                className="p-3 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:border-[#F7A400] outline-none transition-all font-bold"
                value={formData.mainTitle}
                onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-slate-600">Heading Highlight (Orange)</label>
              <input
                className="p-3 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:border-[#F7A400] outline-none transition-all font-bold text-[#F7A400]"
                value={formData.highlightTitle}
                onChange={(e) => setFormData({ ...formData, highlightTitle: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="font-bold text-sm text-slate-600">CEO Message Content</label>
              <textarea
                className="p-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-[#F7A400] outline-none transition-all min-h-[150px] leading-relaxed"
                value={formData.ceoMessage}
                onChange={(e) => setFormData({ ...formData, ceoMessage: e.target.value })}
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* --- RECOGNITION ITEMS --- */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-[#F7A400] uppercase italic tracking-tight">
                Recognition List
              </h3>
              <button
                onClick={addItem}
                className="flex items-center gap-2 bg-[#2E7D32] text-white px-5 py-2 rounded-lg font-bold hover:bg-black transition-all shadow-md active:scale-95"
              >
                <FaPlus size={12} /> ADD ITEM
              </button>
            </div>

            <div className="grid gap-4">
              {formData.recognitionItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group bg-slate-50 p-6 rounded-xl border border-transparent hover:border-[#F7A400] transition-all flex flex-col md:flex-row gap-6"
                >
                  <button
                    onClick={() => removeItem(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-black transition-all z-10"
                  >
                    <FaTrash size={10} />
                  </button>

                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Platform (H3)</label>
                    <input
                      className="w-full p-3 bg-white border border-slate-200 rounded-lg font-bold focus:border-[#F7A400] outline-none"
                      placeholder="Clutch"
                      value={item.platformName}
                      onChange={(e) => handleItemChange(index, "platformName", e.target.value)}
                    />
                  </div>

                  <div className="flex-[2] space-y-2">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Achivement (P)</label>
                    <input
                      className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:border-[#F7A400] outline-none"
                      placeholder="Top B2B Service Provider 2024"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-[#2E7D32] text-white font-black py-5 rounded-xl text-xl uppercase hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? "SYNCING..." : <><FaSave /> SAVE ALL CHANGES</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutTeamEdit;