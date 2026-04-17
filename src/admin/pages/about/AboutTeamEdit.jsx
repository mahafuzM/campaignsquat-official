import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, Save, UploadCloud, Users, Loader2 } from "lucide-react";

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
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.get("/api/about-team");
        if (res.data) setFormData(res.data);
      } catch (err) {
        console.error("Data loading failed", err);
        toast.error("Failed to load team data.");
      }
    };
    fetchTeamData();
  }, []);

  // --- ইমেজ আপলোড হ্যান্ডলার ---
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    setUploading(true);
    
    try {
      const res = await axios.post("/api/upload", fd);
      
      if (res.data && res.data.url) {
        setFormData((prev) => ({ ...prev, image: res.data.url }));
        toast.success("Image uploaded successfully! ✅"); 
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed! ❌");
    } finally {
      setUploading(false);
      e.target.value = null;
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
        ...(formData.recognitionItems || []),
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
      toast.success("Team data updated successfully! ✅");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Update failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  // ইমেজ পাথ ক্লিন করা
  const fullImageUrl = formData.image?.startsWith("http")
    ? formData.image
    : `${(axios.defaults.baseURL || "")}${formData.image?.startsWith("/") ? "" : "/"}${formData.image}`;

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3 flex items-center gap-3">
              <Users className="text-[#F7A400]" size={28} />
              About: Team & CEO
            </h1>
            <p className="text-sm text-gray-500 mt-2 pl-4">
              Manage executive messages, profiles, and team data.
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

        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 space-y-8">
          
          {/* --- CEO & HERO SECTION --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Image Preview & Upload */}
            <div className="md:col-span-2 bg-gray-50/50 p-6 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
              <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase mb-4">CEO Profile Photo</label>
              <div className="flex flex-col items-center gap-4">
                {formData.image && (
                  <div className="relative group">
                    <img
                      src={fullImageUrl}
                      className="w-32 h-40 object-cover rounded-md shadow-sm border border-gray-200"
                      alt="CEO Preview"
                    />
                  </div>
                )}
                <label className="cursor-pointer bg-white border border-gray-200 px-6 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:border-[#F7A400] hover:text-[#F7A400] transition-all shadow-sm">
                  {uploading ? (
                    <Loader2 className="animate-spin text-[#F7A400]" size={16} />
                  ) : (
                    <UploadCloud size={16} />
                  )}
                  {uploading ? "Uploading..." : formData.image ? "Replace Photo" : "Upload Photo"}
                  <input type="file" onChange={handleFileChange} className="hidden" disabled={uploading} accept="image/*" />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">CEO Name</label>
              <input
                className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-md text-gray-900 font-bold focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all"
                value={formData.ceoName}
                onChange={(e) => setFormData({ ...formData, ceoName: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Experience Badge Text</label>
              <input
                className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-md text-gray-900 font-bold focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all"
                placeholder="e.g. 10+ Years"
                value={formData.experienceType}
                onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Main Heading</label>
              <input
                className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-md text-gray-900 font-bold focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all"
                value={formData.mainTitle}
                onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Heading Highlight</label>
              <input
                className="w-full p-3 bg-orange-50/30 border border-orange-100 rounded-md text-[#F7A400] font-bold focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all"
                value={formData.highlightTitle}
                onChange={(e) => setFormData({ ...formData, highlightTitle: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">CEO Message</label>
              <textarea
                className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-md text-gray-600 focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all min-h-[150px] leading-relaxed resize-none"
                value={formData.ceoMessage}
                onChange={(e) => setFormData({ ...formData, ceoMessage: e.target.value })}
              />
            </div>
          </div>

          <div className="border-t border-gray-100 my-8"></div>

          {/* --- RECOGNITION ITEMS --- */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                Stats / Recognition List
              </h3>
              <button
                onClick={addItem}
                className="flex items-center gap-1.5 text-[#F7A400] font-bold text-xs uppercase tracking-wider hover:text-[#d98f00] transition-colors"
              >
                <PlusCircle size={16} /> Add Item
              </button>
            </div>

            <div className="grid gap-4">
              {formData.recognitionItems?.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-50/30 p-6 rounded-lg border border-gray-200 hover:border-[#F7A400]/50 transition-all flex flex-col md:flex-row gap-6 shadow-sm"
                >
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Metric / Platform</label>
                    <input
                      className="w-full p-3 bg-white border border-gray-200 rounded-md font-bold text-gray-900 focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all"
                      placeholder="e.g. 500+"
                      value={item.platformName}
                      onChange={(e) => handleItemChange(index, "platformName", e.target.value)}
                    />
                  </div>

                  <div className="flex-[2] space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Description</label>
                    <input
                      className="w-full p-3 bg-white border border-gray-200 rounded-md text-gray-600 focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all"
                      placeholder="e.g. Projects Completed"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => removeItem(index)}
                      className="p-3 bg-red-50/50 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      title="Remove Item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {formData.recognitionItems?.length === 0 && (
               <div className="py-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 rounded-lg border border-gray-200 border-dashed">
                 <p className="text-sm font-medium">No recognition items added yet</p>
               </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutTeamEdit;