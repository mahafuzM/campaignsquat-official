import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit3, Trash2, PlusCircle, XCircle, LayoutGrid, CheckCircle2 } from "lucide-react";

const AboutFeaturesEdit = () => {
  const [features, setFeatures] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    iconPath: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ১. ফিচার লিস্ট ফেচ করা
  const fetchFeatures = async () => {
    try {
      const res = await axios.get("/api/about-features");
      setFeatures(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // ২. এডিট মোড অ্যাক্টিভ করা
  const handleEditClick = (feature) => {
    setEditingId(feature._id);
    setFormData({
      title: feature.title,
      desc: feature.desc,
      iconPath: feature.iconPath,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ৩. অ্যাড বা আপডেট সাবমিট করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.post(`/api/about-features/update/${editingId}`, formData);
      } else {
        await axios.post("/api/about-features/add", formData);
      }
      setFormData({ title: "", desc: "", iconPath: "" });
      setEditingId(null);
      fetchFeatures();
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ৪. ডিলিট করা
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This feature will be permanently removed!")) {
      try {
        await axios.delete(`/api/about-features/${id}`);
        fetchFeatures();
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#F9FAFB] min-h-screen font-poppins text-slate-900">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-2">
          <LayoutGrid className="text-[#F7A400]" size={28} />
          <h2 className="text-3xl font-black text-black tracking-tight uppercase italic">
            Features <span className="text-[#F7A400]">Manager</span>
          </h2>
        </div>
        <p className="text-slate-500 text-sm">Create, update or remove agency service features</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-sm mb-12 border border-slate-100 relative overflow-hidden transition-all"
        >
          {/* Top Indicator Line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#F7A400]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block">Feature Title</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:border-[#F7A400] outline-none transition-all font-bold"
                placeholder="e.g. Creative Strategy"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block">Icon Path (SVG 'd')</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:border-[#F7A400] outline-none transition-all font-mono text-xs"
                placeholder="M10 20l..."
                value={formData.iconPath}
                onChange={(e) => setFormData({ ...formData, iconPath: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block">Feature Description</label>
              <textarea
                rows="3"
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:border-[#F7A400] outline-none transition-all leading-relaxed"
                placeholder="Explain what this feature offers..."
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-50">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "", desc: "", iconPath: "" });
                }}
                className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all"
              >
                <XCircle size={18} /> CANCEL
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-3 bg-black text-white rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-slate-200 ${loading ? 'opacity-50' : 'hover:bg-[#F7A400] hover:text-black'}`}
            >
              {editingId ? <CheckCircle2 size={18} /> : <PlusCircle size={18} />}
              {loading ? "SYNCING..." : editingId ? "UPDATE FEATURE" : "ADD NEW FEATURE"}
            </button>
          </div>
        </form>

        {/* List Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Current Active Features ({features.length})</h3>
          
          {features.map((f) => (
            <div
              key={f._id}
              className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-[#F7A400] transition-all"
            >
              <div className="flex gap-5 items-start">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 text-[#F7A400] group-hover:bg-[#F7A400] group-hover:text-white transition-colors">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.iconPath} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black mb-1 leading-tight tracking-tight italic">
                    {f.title}
                  </h4>
                  <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={() => handleEditClick(f)}
                  className="flex-1 md:flex-none p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  title="Edit"
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(f._id)}
                  className="flex-1 md:flex-none p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutFeaturesEdit;