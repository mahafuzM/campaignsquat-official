import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  Check,
  X,
  LayoutDashboard,
  Type,
  ShieldCheck,
  Zap
} from "lucide-react";
import { toast } from "react-hot-toast";

const AgencyComparisonAdmin = () => {
  const [titlePart1, setTitlePart1] = useState("");
  const [brandName, setBrandName] = useState("");
  const [competitorLabel, setCompetitorLabel] = useState("");
  const [comparisonList, setComparisonList] = useState([
    { label: "", othersHasIt: false },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ ডাইনামিক বেস ইউআরএল (লোকাল এবং লাইভ অটোমেটিক হ্যান্ডেল করবে)
  const BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://api.campaignsquat.com";
    
  const API_URL = `${BASE_URL}/api/agency-comparison`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setTitlePart1(res.data.titlePart1 || "");
          setBrandName(res.data.brandName || "");
          setCompetitorLabel(res.data.competitorLabel || "");
          setComparisonList(
            res.data.comparisonList?.length > 0
              ? res.data.comparisonList
              : [{ label: "", othersHasIt: false }],
          );
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  const addItem = () =>
    setComparisonList([...comparisonList, { label: "", othersHasIt: false }]);

  // ✅ সংশোধিত removeItem ফাংশন
  const removeItem = async (index) => {
    if (comparisonList.length <= 1) {
      return toast.error("At least one item required!");
    }

    const confirmDelete = window.confirm("Are you sure you want to remove this feature? 🗑️");
    
    if (confirmDelete) {
      // ১. প্রথমে স্টেট থেকে ফিল্টার করে নতুন লিস্ট তৈরি করা
      const updatedList = comparisonList.filter((_, i) => i !== index);
      
      // ২. স্টেট আপডেট করা
      setComparisonList(updatedList);

      // ৩. সাইলেন্টলি সার্ভারে আপডেট পাঠানো (যাতে ডিলিট পার্মানেন্ট হয়)
      try {
        setSaving(true);
        await axios.post(API_URL, {
          titlePart1,
          brandName,
          competitorLabel,
          comparisonList: updatedList, // আপডেট করা লিস্ট পাঠানো হচ্ছে
        });
        toast.success("Feature removed permanently! 🚀");
      } catch (err) {
        console.error("Delete Sync Error:", err);
        toast.error("Failed to sync with server. Reloading data...");
        // যদি সার্ভারে সেভ না হয়, তবে ডাটা আবার আগের অবস্থায় ফিরিয়ে আনা (Optional)
        window.location.reload(); 
      } finally {
        setSaving(false);
      }
    }
  };

  const handleInputChange = (index, value) => {
    const newList = [...comparisonList];
    newList[index].label = value;
    setComparisonList(newList);
  };

  const toggleOthers = (index) => {
    const newList = [...comparisonList];
    newList[index].othersHasIt = !newList[index].othersHasIt;
    setComparisonList(newList);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post(API_URL, {
        titlePart1,
        brandName,
        competitorLabel,
        comparisonList,
      });
      toast.success("Comparison Table Updated! 🚀");
    } catch (err) {
      toast.error("Save Failed!");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 font-['Poppins']">Syncing Tactical Matrix...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-20 selection:bg-black selection:text-white">
      {/* Header Area */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-[5px] text-white">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tight">
              Comparison Manager
            </h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-[5px] font-bold hover:scale-105 transition-all shadow-lg disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {saving ? "SAVING..." : "SAVE DATA"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 space-y-10">
        {/* --- Top Titles Config --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-8 rounded-[5px] border-2 border-gray-100">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Header Text
            </label>
            <input
              type="text"
              value={titlePart1}
              onChange={(e) => setTitlePart1(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-[5px] p-4 font-bold focus:border-black outline-none"
              placeholder="What Do You Get By Choosing..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Brand Highlight
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-[5px] p-4 font-bold text-[#F7A400] focus:border-black outline-none"
              placeholder="Campaignsquat?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Competitor Label
            </label>
            <input
              type="text"
              value={competitorLabel}
              onChange={(e) => setCompetitorLabel(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-[5px] p-4 font-bold text-gray-400 focus:border-black outline-none"
              placeholder="Other Design Agencies"
            />
          </div>
        </div>

        {/* --- Comparison Table List --- */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[14px] font-semibold  text-gray-900">
              Features Comparison ({comparisonList.length})
            </h3>
            <button
              onClick={addItem}
              className="bg-black text-white px-4 py-2 rounded-[5px] text-xs font-bold flex items-center gap-2 hover:bg-gray-800 transition-all"
            >
              <Plus size={16} /> ADD FEATURE
            </button>
          </div>

          <div className="space-y-3">
            {comparisonList.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-4 bg-white border-2 border-gray-100 p-5 rounded-[5px] hover:border-black transition-all group"
              >
                {/* Label Input */}
                <div className="flex-1 w-full">
                  <span className="text-[14px] font-black text-gray-900  mb-1 block">
                    Feature Name
                  </span>
                  <div className="flex items-center gap-3">
                    <Type size={18} className="text-gray-300" />
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-full bg-transparent text-lg font-bold text-black border-b border-gray-100 focus:border-black outline-none py-1"
                      placeholder="Enter feature name..."
                    />
                  </div>
                </div>

                {/* Status Toggle (Others) */}
                <div className="flex items-center gap-4 px-6 border-l border-r border-gray-100">
                  <div className="text-center">
                    <span className="text-[14px] font-black text-gray-900  mb-2 block">
                      Others Status
                    </span>
                    <button
                      onClick={() => toggleOthers(index)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-[5px] font-bold text-xs transition-all ${item.othersHasIt ? "bg-green-100 text-green-600" : "bg-red-50 text-red-500 line-through decoration-red-300"}`}
                    >
                      {item.othersHasIt ? (
                        <Check size={14} strokeWidth={3} />
                      ) : (
                        <X size={14} strokeWidth={3} />
                      )}
                      {item.othersHasIt ? "OTHERS HAVE IT" : "OTHERS DONT HAVE"}
                    </button>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(index)}
                  className="p-3 bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Tip */}
        <div className="bg-black text-white p-8 rounded-[32px] flex items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-[#F7A400] flex items-center justify-center text-black font-bold">
            !
          </div>
          <p className="text-sm font-medium opacity-80 italic">
            "Others Don't Have" সিলেক্ট করলে ফ্রন্টএন্ডে ওই আইটেমটি অটোমেটিক
            **Line-through (দাগ কাটা)** এবং আবছা হয়ে যাবে। ক্যাম্পেইনস্কোয়াটের
            জন্য সবসময় "Check" মার্ক ডিফল্ট থাকবে।
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgencyComparisonAdmin;
