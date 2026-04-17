import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { Target, Eye, Save } from "lucide-react";

const AboutMissionEdit = () => {
  const [formData, setFormData] = useState({
    missionIcon: "",
    missionTitle: "",
    missionDesc: "",
    visionIcon: "",
    visionTitle: "",
    visionDesc: "",
  });
  const [loading, setLoading] = useState(false);

  // ১. ডাটা লোড করা
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const res = await axios.get("/api/about-mission");
        if (res.data) setFormData(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load mission data.");
      }
    };
    fetchMissionData();
  }, []);

  // ২. ডাটা আপডেট হ্যান্ডলার
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post("/api/about-mission/update", formData);
      if (res.data) {
        toast.success("Mission & Vision updated successfully! ✅");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Failed to update data! ❌");
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
              About: Mission & Vision
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Update your company's core values and primary focus points.
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

        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 hover:border-[#F7A400]/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-50 rounded-md text-[#F7A400]">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Mission Content</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Icon Path (SVG/URL)</label>
                  <input
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-600 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-3 transition-all outline-none font-mono"
                    value={formData.missionIcon}
                    onChange={(e) => setFormData({ ...formData, missionIcon: e.target.value })}
                    placeholder="e.g. /icons/target.svg"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Mission Title</label>
                  <input
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-lg font-bold rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-3 transition-all outline-none"
                    value={formData.missionTitle}
                    onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Mission Description</label>
                  <textarea
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-600 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-4 transition-all outline-none resize-none h-32 leading-relaxed"
                    value={formData.missionDesc}
                    onChange={(e) => setFormData({ ...formData, missionDesc: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-md text-blue-500">
                  <Eye size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Vision Content</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Icon Path (SVG/URL)</label>
                  <input
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-600 text-sm rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 p-3 transition-all outline-none font-mono"
                    value={formData.visionIcon}
                    onChange={(e) => setFormData({ ...formData, visionIcon: e.target.value })}
                    placeholder="e.g. /icons/eye.svg"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Vision Title</label>
                  <input
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-lg font-bold rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 p-3 transition-all outline-none"
                    value={formData.visionTitle}
                    onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Vision Description</label>
                  <textarea
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-600 text-sm rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 p-4 transition-all outline-none resize-none h-32 leading-relaxed"
                    value={formData.visionDesc}
                    onChange={(e) => setFormData({ ...formData, visionDesc: e.target.value })}
                  />
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutMissionEdit;