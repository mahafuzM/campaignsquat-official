import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
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
      toast.error("Failed to load features.");
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
        toast.success("Feature updated successfully! ✅");
      } else {
        await axios.post("/api/about-features/add", formData);
        toast.success("Feature added successfully! ✅");
      }
      setFormData({ title: "", desc: "", iconPath: "" });
      setEditingId(null);
      fetchFeatures();
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Process failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  // ৪. ডিলিট করা
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This feature will be permanently removed!")) {
      try {
        await axios.delete(`/api/about-features/${id}`);
        toast.success("Feature removed successfully! 🗑️");
        fetchFeatures();
      } catch (err) {
        console.error("Delete Error:", err);
        toast.error("Delete failed! ❌");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3 flex items-center gap-3">
              <LayoutGrid className="text-[#F7A400]" size={28} />
              About: Features
            </h1>
            <p className="text-sm text-gray-500 mt-2 pl-4">
              Create, update or remove agency service features and offerings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-all shadow-sm"
            >
              Back
            </button>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Total Features:</span>
              <span className="text-sm font-black text-[#F7A400]">{features.length}</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 transition-all mb-12 relative overflow-hidden"
        >
          {/* Top Indicator Line for Editing State */}
          {editingId && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#F7A400]"></div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Feature Title</label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm font-bold rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-3 transition-all outline-none"
                placeholder="e.g. Creative Strategy"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Icon Path (SVG 'd')</label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-600 text-xs font-mono rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-3 transition-all outline-none"
                placeholder="M10 20l..."
                value={formData.iconPath}
                onChange={(e) => setFormData({ ...formData, iconPath: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Feature Description</label>
              <textarea
                rows="3"
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-600 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-3 transition-all outline-none leading-relaxed resize-none"
                placeholder="Explain what this feature offers..."
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "", desc: "", iconPath: "" });
                }}
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50"
                disabled={loading}
              >
                <XCircle size={16} /> Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-2 bg-[#F7A400] text-white rounded-md font-medium text-sm flex items-center gap-2 transition-all shadow-sm disabled:opacity-70 ${loading ? '' : 'hover:bg-[#d98f00]'}`}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : editingId ? (
                <CheckCircle2 size={16} />
              ) : (
                <PlusCircle size={16} />
              )}
              {loading ? "Saving..." : editingId ? "Update Feature" : "Add Feature"}
            </button>
          </div>
        </form>

        {/* List Section */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 border-b border-gray-200 pb-2">
            Active Features Directory
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f._id}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between gap-4 group hover:border-[#F7A400]/50 transition-all hover:shadow-md"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-orange-50 rounded-md flex items-center justify-center shrink-0 border border-orange-100 text-[#F7A400] group-hover:bg-[#F7A400] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.iconPath} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                      {f.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                      {f.desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 w-full pt-4 border-t border-gray-50 mt-auto">
                  <button
                    onClick={() => handleEditClick(f)}
                    className="flex-1 py-2 bg-blue-50/50 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(f._id)}
                    className="flex-1 py-2 bg-red-50/50 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}

            {features.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-400 bg-white rounded-lg border border-gray-100 border-dashed">
                <LayoutGrid size={40} className="mb-3 text-gray-300" />
                <p className="text-sm font-medium">No features added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFeaturesEdit;