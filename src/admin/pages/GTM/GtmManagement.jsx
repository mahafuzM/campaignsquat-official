import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Activity, ShieldCheck, AlertCircle } from 'lucide-react';

const GtmManagement = () => {
  const [gtmId, setGtmId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // ডাটাবেজ থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get('/api/gtm-config');
        if (res.data) {
          setGtmId(res.data.gtmId);
          setIsActive(res.data.isActive);
        }
      } catch (err) {
        console.error("Error fetching GTM config", err);
      }
    };
    fetchConfig();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.put('/api/gtm-config', { gtmId, isActive });
      setMessage({ type: 'success', text: 'GTM Configuration updated successfully!' });
      
      // ৫ সেকেন্ড পর সাকসেস মেসেজ হাইড করা
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update configuration.' });
    }
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-10 bg-white min-h-screen font-poppins selection:bg-[#F7A400] selection:text-black">
      
      {/* Header Area */}
      <div className="mb-10">
        <h1 className="text-black text-3xl font-bold tracking-tight">Tag Manager Configuration</h1>
        <p className="text-gray-600 mt-2 text-sm uppercase tracking-widest font-medium">Manage your website tracking and analytics</p>
      </div>

      <div className="max-w-3xl bg-white border border-gray-200 rounded-[5px] p-8 relative overflow-hidden group shadow-sm">
        {/* Decorative background glow - adjusted for light mode */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F7A400]/5 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Status Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
            {message.type === 'success' ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-semibold">{message.text}</span>
          </div>
        )}

        <div className="space-y-8">
          {/* GTM ID Input */}
          <div>
            <label className="flex items-center gap-2 text-black text-sm font-bold mb-3">
              <Activity size={16} className="text-[#F7A400]" />
              GOOGLE TAG MANAGER ID (CONTAINER ID)
            </label>
            <input 
              type="text" 
              value={gtmId}
              onChange={(e) => setGtmId(e.target.value)}
              placeholder="e.g. GTM-XXXXXXX"
              className="w-full bg-gray-50 border border-gray-300 p-4 rounded-[3px] text-black focus:border-[#F7A400] focus:ring-1 focus:ring-[#F7A400] outline-none transition-all text-xl font-mono tracking-wider uppercase"
            />
            <p className="mt-2 text-gray-500 text-[11px] font-medium">
              আপনার Google Tag Manager ড্যাশবোর্ড থেকে কন্টেইনার আইডিটি এখানে বসান।
            </p>
          </div>

          {/* Active Status Toggle */}
          <div className="flex items-center justify-between p-5 bg-gray-50 border border-gray-200 rounded-[3px]">
            <div>
              <p className="text-black font-bold">Enable Tracking Script</p>
              <p className="text-gray-600 text-xs mt-1 font-medium">এটি অফ করলে ওয়েবসাইট থেকে সকল ট্র্যাকিং বন্ধ হয়ে যাবে।</p>
            </div>
            
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`w-14 h-7 rounded-full transition-all duration-300 relative ${isActive ? 'bg-[#F7A400]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-sm ${isActive ? 'left-8' : 'left-1'}`} />
            </button>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button 
              onClick={handleUpdate}
              disabled={loading}
              className="w-full md:w-auto min-w-[200px] bg-[#F7A400] text-black hover:bg-black hover:text-white px-8 py-4 rounded-[3px] font-bold text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98] group/btn shadow-md"
            >
              <Save size={20} className="group-hover/btn:scale-110 transition-transform" />
              {loading ? "SAVING CONFIG..." : "SAVE CHANGES"}
            </button>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-8 max-w-3xl border-l-4 border-[#F7A400] bg-gray-50 p-6">
        <h4 className="text-black font-bold text-sm mb-2">💡 Quick Tip:</h4>
        <p className="text-gray-600 text-xs leading-relaxed font-medium">
          GTM আইডি পরিবর্তন করার পর মেইন ওয়েবসাইটের ক্যাশ রিফ্রেশ করতে হতে পারে। ডাটা সঠিকভাবে ট্র্যাক হচ্ছে কি না তা চেক করতে **Google Tag Assistant** ব্রাউজার এক্সটেনশনটি ব্যবহার করুন।
        </p>
      </div>
    </div>
  );
};

export default GtmManagement;