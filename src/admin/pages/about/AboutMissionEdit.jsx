import React, { useState, useEffect } from "react";
import axios from "axios";
import { Target, Eye, Save, AlertCircle, CheckCircle2 } from "lucide-react";

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
  const [status, setStatus] = useState(""); // "success" or "error"

  // ১. ডাটা লোড করা (app.jsx এর baseURL ব্যবহার করে)
  useEffect(() => {
    axios.get("/api/about-mission")
      .then((res) => {
        if (res.data) setFormData(res.data);
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  // ২. ডাটা আপডেট হ্যান্ডলার
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    
    try {
      const res = await axios.post("/api/about-mission/update", formData);
      if (res.data) {
        setStatus("success");
        setTimeout(() => setStatus(""), 4000);
      }
    } catch (err) {
      console.error("Update Error:", err);
      setStatus("error");
      setTimeout(() => setStatus(""), 4000);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 md:p-10 bg-[#F4F7FA] min-h-screen font-poppins text-slate-900">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-black tracking-tight uppercase italic">
            Mission & <span className="text-[#F7A400]">Vision</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Update your company's core values and focus points</p>
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-xl border border-green-200 animate-fade-in">
            <CheckCircle2 size={18} />
            <span className="font-bold text-sm">Update Successful!</span>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2 rounded-xl border border-red-200">
            <AlertCircle size={18} />
            <span className="font-bold text-sm">Failed to Sync Data!</span>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-[#F7A400]/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-50 rounded-lg text-[#F7A400]">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold text-black uppercase tracking-tight">Mission Content</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-black text-slate-400 mb-1 block tracking-widest">Icon Path (SVG/URL)</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:border-[#F7A400] outline-none transition-all font-mono text-sm"
                    value={formData.missionIcon}
                    onChange={(e) => setFormData({ ...formData, missionIcon: e.target.value })}
                    placeholder="e.g. /icons/target.svg"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-slate-400 mb-1 block tracking-widest">Mission Title</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:border-[#F7A400] outline-none transition-all font-bold"
                    value={formData.missionTitle}
                    onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-slate-400 mb-1 block tracking-widest">Mission Description</label>
                  <textarea
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:border-[#F7A400] outline-none transition-all h-32 leading-relaxed"
                    value={formData.missionDesc}
                    onChange={(e) => setFormData({ ...formData, missionDesc: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-[#F7A400]/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
                  <Eye size={24} />
                </div>
                <h3 className="text-xl font-bold text-black uppercase tracking-tight">Vision Content</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-black text-slate-400 mb-1 block tracking-widest">Icon Path (SVG/URL)</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:border-[#F7A400] outline-none transition-all font-mono text-sm"
                    value={formData.visionIcon}
                    onChange={(e) => setFormData({ ...formData, visionIcon: e.target.value })}
                    placeholder="e.g. /icons/eye.svg"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-slate-400 mb-1 block tracking-widest">Vision Title</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:border-[#F7A400] outline-none transition-all font-bold"
                    value={formData.visionTitle}
                    onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-slate-400 mb-1 block tracking-widest">Vision Description</label>
                  <textarea
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:border-[#F7A400] outline-none transition-all h-32 leading-relaxed"
                    value={formData.visionDesc}
                    onChange={(e) => setFormData({ ...formData, visionDesc: e.target.value })}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`group relative overflow-hidden bg-black text-white px-12 py-4 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#F7A400] hover:text-black shadow-lg shadow-orange-200'}`}
            >
              {loading ? (
                "SYNCING DATA..."
              ) : (
                <>
                  SAVE ALL CHANGES
                  <Save size={18} className="group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutMissionEdit;