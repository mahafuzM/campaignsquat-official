import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  Check,
  X,
  LayoutDashboard,
  Type,
  AlertCircle
} from "lucide-react";

const AgencyComparisonAdmin = () => {
  const [titlePart1, setTitlePart1] = useState("");
  const [brandName, setBrandName] = useState("");
  const [competitorLabel, setCompetitorLabel] = useState("");
  const [comparisonList, setComparisonList] = useState([{ label: "", othersHasIt: false }]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const API_URL = `/api/agency-comparison`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setTitlePart1(res.data.titlePart1 || "");
          setBrandName(res.data.brandName || "");
          setCompetitorLabel(res.data.competitorLabel || "");
          setComparisonList(
            res.data.comparisonList?.length > 0 ? res.data.comparisonList : [{ label: "", othersHasIt: false }]
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

  const addItem = () => setComparisonList([...comparisonList, { label: "", othersHasIt: false }]);

  const removeItem = async (index) => {
    if (comparisonList.length <= 1) return toast.error("At least one item required!");

    const confirmDelete = window.confirm("Are you sure you want to remove this feature?");
    if (confirmDelete) {
      const updatedList = comparisonList.filter((_, i) => i !== index);
      setComparisonList(updatedList);

      try {
        setSaving(true);
        await axios.post(API_URL, {
          titlePart1,
          brandName,
          competitorLabel,
          comparisonList: updatedList,
        });
        toast.success("Feature removed permanently!");
      } catch (err) {
        console.error("Delete Sync Error:", err);
        toast.error("Failed to sync delete. Reloading...");
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
      toast.success("Comparison Table Updated!");
    } catch (err) {
      toast.error("Save Failed!");
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
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Syncing Matrix...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-6 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7A400]/10 flex items-center justify-center shrink-0 border border-[#F7A400]/20">
            <LayoutDashboard className="text-[#F7A400]" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Comparison Manager</h1>
            <p className="text-xs text-gray-500 mt-1">Manage brand VS competitors feature matrix</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#F7A400] text-black px-4 py-1.5 rounded font-bold text-xs hover:bg-[#e59800] transition-colors shadow-sm disabled:opacity-50 border border-transparent"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Saving..." : "Save Data"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Setup Col */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#F7A400]" />
            <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Matrix Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Header Text</label>
                <input
                  type="text"
                  value={titlePart1}
                  onChange={(e) => setTitlePart1(e.target.value)}
                  className={inputClass}
                  placeholder="What Do You Get By Choosing..."
                />
              </div>
              <div>
                <label className={labelClass}>Brand Highlight (Us)</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className={`${inputClass} text-[#F7A400] font-bold`}
                  placeholder="Campaignsquat"
                />
              </div>
              <div>
                <label className={labelClass}>Competitor Label</label>
                <input
                  type="text"
                  value={competitorLabel}
                  onChange={(e) => setCompetitorLabel(e.target.value)}
                  className={`${inputClass} text-gray-600 font-bold`}
                  placeholder="Other Agencies"
                />
              </div>
            </div>

            <div className="bg-amber-50/50 p-3 rounded border border-amber-100/50 flex items-start gap-2 mt-5 text-[11px] font-medium text-amber-800 leading-relaxed">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <p>For items where others don't have it, the frontend automatically applies a line-through styling. Campaignsquat always has everything checked by default.</p>
            </div>
          </div>
        </div>

        {/* Features List Col */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Features Comparison ({comparisonList.length})</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-1 text-[10px] bg-gray-50 border border-gray-200 text-gray-600 hover:text-[#F7A400] hover:bg-white px-2 py-1 rounded transition-colors font-bold"
              >
                <Plus size={12} /> Add Feature
              </button>
            </div>

            <div className="space-y-2">
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-50/80 border-y border-gray-100">
                      <th className="py-2 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-7/12">Feature Name</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-4/12 text-center">Others Status</th>
                      <th className="py-2 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right w-1/12">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {comparisonList.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 group transition-colors">
                        <td className="py-2 px-3 align-middle">
                          <div className="flex items-center gap-2 focus-within:ring-1 ring-[#F7A400]/50 rounded hover:bg-white hover:border-gray-200 border border-transparent transition-all">
                            <Type size={12} className="text-gray-400 shrink-0 ml-2" />
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => handleInputChange(index, e.target.value)}
                              className={`${inputClass} border-none shadow-none px-1 py-1 focus:bg-transparent min-w-[200px] font-medium`}
                              placeholder="Feature name..."
                            />
                          </div>
                        </td>
                        <td className="py-2 px-3 align-middle text-center">
                          <button
                            onClick={() => toggleOthers(index)}
                            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                              item.othersHasIt 
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
                                : "bg-rose-50 text-rose-500 hover:bg-rose-100 line-through decoration-rose-300"
                            }`}
                          >
                            {item.othersHasIt ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                            {item.othersHasIt ? "HAVE IT" : "DON'T HAVE"}
                          </button>
                        </td>
                        <td className="py-2 px-3 align-middle text-right">
                          <button
                            onClick={() => removeItem(index)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgencyComparisonAdmin;
