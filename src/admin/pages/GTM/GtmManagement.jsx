import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { 
  Save, 
  Activity, 
  Loader2, 
  Settings, 
  ShieldCheck, 
  AlertCircle,
  Link
} from "lucide-react";

const GtmManagement = () => {
  const [gtmId, setGtmId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get("/api/gtm-config");
        if (res.data) {
          setGtmId(res.data.gtmId || "");
          setIsActive(res.data.isActive);
        }
      } catch (err) {
        console.error("Error fetching GTM config", err);
        toast.error("Failed to load GTM configuration");
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleUpdate = async () => {
    if (!gtmId.trim()) return toast.error("GTM ID is required");
    
    setSaving(true);
    try {
      await axios.put("/api/gtm-config", { gtmId, isActive });
      toast.success("GTM Configuration updated!");
    } catch (err) {
      toast.error("Failed to update configuration.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full border border-gray-200 outline-none focus:border-[#F7A400] transition-colors bg-gray-50 focus:bg-white text-gray-900 shadow-sm text-sm p-2 rounded";
  const labelClass = "text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/30 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F7A400] mb-2" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-6 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7A400]/10 flex items-center justify-center shrink-0 border border-[#F7A400]/20">
            <Settings className="text-[#F7A400]" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Tracking Configuration</h1>
            <p className="text-xs text-gray-500 mt-1">Manage Google Tag Manager & Analytics integration</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#F7A400] text-black px-4 py-1.5 rounded font-bold text-xs hover:bg-[#e59800] transition-colors shadow-sm disabled:opacity-50 border border-transparent"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Saving..." : "Save Config"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Config Col */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#F7A400]" />
            
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-50">
              <Activity size={14} className="text-[#F7A400]" />
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Parameters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className={labelClass}>Google Tag Manager ID</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[10px] font-bold text-gray-400 select-none">ID</span>
                  <input
                    type="text"
                    value={gtmId}
                    onChange={(e) => setGtmId(e.target.value)}
                    placeholder="GTM-XXXXXXX"
                    className={`${inputClass} pl-8 font-mono text-base tracking-widest uppercase`}
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-gray-400 leading-relaxed italic">
                  Enter your container ID from the GTM dashboard.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>
                    {isActive ? <ShieldCheck size={16} /> : <AlertCircle size={16} />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-none">Enable Tracking</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Activate/Deactivate tracking scripts</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsActive(!isActive)}
                  className={`w-9 h-5 rounded-full transition-all duration-300 relative border ${isActive ? 'bg-[#F7A400] border-[#e59800]' : 'bg-gray-300 border-gray-400'}`}
                >
                  <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-all duration-300 shadow-sm ${isActive ? 'left-[18px]' : 'left-[2px]'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Col */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Link size={14} className="text-blue-500" />
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Guidance</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50/50 p-4 rounded border border-blue-100/50">
                <h5 className="text-[11px] font-bold text-blue-800 mb-1">How it works?</h5>
                <p className="text-[11px] text-blue-700/80 leading-relaxed font-medium">
                  When enabled, the Google Tag Manager container will be injected into the website's head and body. This allows you to deploy tags (Analytics, FB Pixel, etc.) without modifying the code.
                </p>
              </div>

              <div className="bg-amber-50/50 p-4 rounded border border-amber-100/50">
                <h5 className="text-[11px] font-bold text-amber-800 mb-1">Verification</h5>
                <p className="text-[11px] text-amber-700/80 leading-relaxed font-medium italic">
                  "GTM চ্যক্ট করার পর মেইন ওয়েবসাইটের ক্যাশ রিফ্রেশ করতে হতে পারে। ডাটা সঠিকভাবে ট্র্যাক হচ্ছে কি না তা চেক করতে Google Tag Assistant ব্যবহার করুন।"
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GtmManagement;