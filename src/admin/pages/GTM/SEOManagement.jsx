import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { 
  Globe, 
  Save, 
  Loader2, 
  Search, 
  Info, 
  Settings,
  ShieldCheck
} from "lucide-react";

const SEOManagement = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [googleCode, setGoogleCode] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/api/seo-settings"); 
        if (res.data) {
          setGoogleCode(res.data.googleVerificationCode || "");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        toast.error("Failed to load current settings.");
      } finally {
        setFetching(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    
    if (!googleCode.trim()) {
      return toast.error("Verification code is required");
    }

    setLoading(true);
    try {
      await axios.put("/api/seo-settings", { 
        googleVerificationCode: googleCode.trim() 
      });
      toast.success("Search Console Code Updated!");
    } catch (err) {
      console.error("❌ Save Error:", err.response || err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 outline-none focus:border-[#F7A400] transition-colors bg-gray-50 focus:bg-white text-gray-900 shadow-sm text-sm p-2 rounded";
  const labelClass = "text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block";

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50/30 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F7A400] mb-2" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading SEO Settings...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-6 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7A400]/10 flex items-center justify-center shrink-0 border border-[#F7A400]/20">
            <Search className="text-[#F7A400]" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">SEO Management</h1>
            <p className="text-xs text-gray-500 mt-1">Google Search Console & Meta Verification</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-1.5 bg-[#F7A400] text-black px-4 py-1.5 rounded font-bold text-xs hover:bg-[#e59800] transition-colors shadow-sm disabled:opacity-50 border border-transparent"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {loading ? "Saving..." : "Save Verification"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Verification Col */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#F7A400]" />
            
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-50">
              <ShieldCheck size={14} className="text-[#F7A400]" />
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Search Console Verification</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>HTML Tag Verification Code</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[10px] font-bold text-gray-400 select-none">CODE</span>
                  <input
                    type="text"
                    value={googleCode}
                    onChange={(e) => setGoogleCode(e.target.value)}
                    placeholder="googledd4fca90..."
                    className={`${inputClass} pl-12 font-mono text-sm tracking-tight`}
                  />
                </div>
              </div>

              <div className="bg-blue-50/50 p-3 rounded border border-blue-100/30 flex items-start gap-2 text-[11px] font-medium text-blue-800 leading-relaxed">
                <Info size={14} className="shrink-0 mt-0.5" />
                <p>
                  <span className="font-bold">Instruction:</span> Search Console-এর মেটা ট্যাগ থেকে শুধু <code className="bg-blue-100 px-1 rounded text-blue-900">content="..."</code> অংশের ভেতরের কোডটুকু এখানে দিন।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Col */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={14} className="text-gray-400" />
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Status & Impact</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-100 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${googleCode ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <span className="text-[11px] font-bold text-gray-600">Verification Active</span>
                </div>
                <span className="text-[9px] text-gray-400 font-mono italic">
                  {googleCode ? 'Running' : 'Not Set'}
                </span>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-100 rounded text-[10px] text-gray-500 leading-relaxed">
                <p className="font-bold text-gray-700 mb-1 leading-none uppercase tracking-tighter">Why is this important?</p>
                This code allows Google to verify ownership of your domain. Once verified, you can track organic search performance, indexing status, and fix crawl errors through the Google Search Console dashboard.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SEOManagement;