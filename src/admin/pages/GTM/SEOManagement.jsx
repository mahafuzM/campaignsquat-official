import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Globe, Save, Loader2 } from 'lucide-react';

const SEOManagement = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [googleCode, setGoogleCode] = useState("");

  // ১. ডাটাবেজ থেকে এসইও ডাটা ফেচ করা
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/api/seo-settings"); 
        if (res.data) {
          // ব্যাকএন্ডের googleVerificationCode ফিল্ডটি স্টেট-এ সেট করা হচ্ছে
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

  // ২. ডাটা সেভ বা আপডেট করা
  const handleSave = async (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন: খালি কোড সাবমিট করা যাবে না
    if (!googleCode.trim()) {
      return toast.error("Please enter the verification code first!");
    }

    setLoading(true);
    try {
      // ✅ PUT মেথড ব্যবহার করা হয়েছে আপনার ব্যাকএন্ডের রাউট অনুযায়ী
      const response = await axios.put("/api/seo-settings", { 
        googleVerificationCode: googleCode.trim() 
      });

      if (response.status === 200 || response.data) {
        toast.success("Search Console Code Updated Successfully!");
      }
    } catch (err) {
      console.error("❌ Save Error:", err.response || err);
      // ব্যাকএন্ড থেকে আসা মেসেজ দেখানো হবে, না থাকলে ডিফল্ট মেসেজ
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#F7A400]" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-white min-h-screen font-poppins text-black">
      <header className="mb-10">
        <h2 className="text-black text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="text-[#F7A400]">🔍</span> Search Console Setup
        </h2>
        <p className="text-gray-600 mt-2 text-sm uppercase tracking-widest font-medium">
          Connect Campaignsquat Ltd with Google Search Console
        </p>
      </header>

      <div className="max-w-3xl bg-white border border-gray-200 rounded-[5px] p-8 shadow-sm relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F7A400]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <form onSubmit={handleSave} className="relative z-10 space-y-8">
          <div>
            <label className="flex items-center gap-2 text-black text-sm font-bold mb-3 uppercase">
              <Globe size={16} className="text-[#F7A400]" />
              HTML Tag Verification Code
            </label>
            <input
              type="text"
              placeholder="Example: googledd4fca90..."
              className="w-full bg-gray-50 border border-gray-300 p-4 rounded-[3px] text-black focus:border-[#F7A400] focus:ring-1 focus:ring-[#F7A400] outline-none transition-all text-lg font-mono"
              value={googleCode}
              onChange={(e) => setGoogleCode(e.target.value)}
              required
            />
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded text-gray-700 text-[11px] leading-relaxed">
              <p className="flex items-start gap-2 italic">
                <span className="text-[#F7A400] font-bold">Instruction:</span>
                আপনার Search Console এর মেটা ট্যাগ থেকে শুধু `content="..."` এর ভেতরের অংশটুকু এখানে দিন।
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto min-w-[200px] bg-[#F7A400] text-black hover:bg-black hover:text-white px-8 py-4 rounded-[3px] font-bold flex items-center justify-center gap-3 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                SAVING...
              </>
            ) : (
              <>
                <Save size={20} />
                SAVE VERIFICATION
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SEOManagement;