import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Save,
  Plus,
  Trash2,
  Layout,
  Type,
  Shield,
  Loader2,
  Sparkles,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

// ✅ ডাইনামিক বেস ইউআরএল সেটআপ


const TechnicalEdgeAdmin = () => {
  const [mainHeader, setMainHeader] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [assets, setAssets] = useState([
    { icon: "zap", title: "", description: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const commonIcons = [
    "zap",
    "shield",
    "layers",
    "map",
    "cpu",
    "database",
    "code",
    "globe",
    "smartphone",
    "server",
  ];

  // ১. আগের ডাটা লোড করা (Fetch Data)
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`/api/technical-edge`);
      if (res.data) {
        setMainHeader(res.data.mainHeader || "");
        setSubTitle(res.data.subTitle || "");
        setAssets(
          res.data.assets || [{ icon: "zap", title: "", description: "" }],
        );
      }
    } catch (err) {
      console.error("Error fetching technical edge data:", err);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ২. নতুন অ্যাসেট কার্ড অ্যাড করা
  const addAsset = () => {
    setAssets([...assets, { icon: "zap", title: "", description: "" }]);
  };

  // ৩. অ্যাসেট রিমুভ করা
  const removeAsset = (index) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  // ৪. অ্যাসেট চেঞ্জ হ্যান্ডেল করা
  const handleAssetChange = (index, field, value) => {
    const newAssets = [...assets];
    newAssets[index][field] = value;
    setAssets(newAssets);
  };

  // ৫. ডাটা সেভ করা (Submit Data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ এখানেও ডাইনামিক (axios.defaults.baseURL || "") কাজ করবে
      await axios.post(`/api/technical-edge`, {
        mainHeader,
        subTitle,
        assets,
      });
      alert("Technical Edge Updated Successfully! 🔥");
    } catch (err) {
      console.error("Update Error:", err);
      alert(err.response?.data?.message || "Update failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // আইকন প্রিভিউ ফাংশন
  const IconPreview = ({ name }) => {
    if (!name) return <LucideIcons.Box size={20} />;
    const iconName = name.charAt(0).toUpperCase() + name.slice(1);
    const IconComponent = LucideIcons[iconName] || LucideIcons.Box;
    return <IconComponent size={20} />;
  };

  if (fetching)
    return (
      <div className="p-20 text-center font-black text-[#F7A400] tracking-widest animate-pulse">
        Syncing Tactical Data...
      </div>
    );

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-Inter pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-50 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-black tracking-tight flex items-center gap-2">
            <Shield className="text-[#F7A400]" /> TECHNICAL EDGE MANAGER
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Campaignsquat Tactical Unit
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#F7A400] transition-all disabled:opacity-50 shadow-lg shadow-black/10"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          SAVE CHANGES
        </button>
      </header>

      <main className="max-w-[1200px] mx-auto p-8 lg:p-12">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* --- Section 1: Main Branding --- */}
          <section className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
              <Type className="text-[#F7A400]" size={20} />
              <h3 className="font-bold text-lg">Main Header & Intro</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-[11px] font-black uppercase text-gray-400 mb-2 block">
                  Section Header
                </label>
                <input
                  type="text"
                  value={mainHeader}
                  onChange={(e) => setMainHeader(e.target.value)}
                  placeholder="e.g. The Technical Edge"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none font-bold text-xl transition-all"
                />
              </div>
              <div>
                <label className="text-[11px] font-black uppercase text-gray-400 mb-2 block">
                  Strategic Sub-title
                </label>
                <input
                  type="text"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="e.g. Strategic Assets included with every partnership"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none text-gray-600 transition-all"
                />
              </div>
            </div>
          </section>

          {/* --- Section 2: Asset Cards Builder --- */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F7A400]/10 rounded-[5px]">
                  <Layout className="text-[#F7A400]" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black">
                    Tactical Asset Cards
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Total Assets: {assets.length}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={addAsset}
                className="flex items-center gap-2 text-[12px] font-black bg-black text-white px-5 py-2.5 rounded-[5px] hover:bg-[#F7A400] transition-all shadow-lg active:scale-95"
              >
                <Plus size={16} /> ADD NEW ASSET
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {assets.map((asset, index) => (
                <div
                  key={index}
                  className="bg-white p-7 rounded-[5px] border border-gray-100 shadow-sm relative group hover:shadow-xl hover:shadow-gray-200/50 hover:border-[#F7A400]/30 transition-all duration-300"
                >
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => removeAsset(index)}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-[5px] bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300"
                    title="Remove Asset"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="space-y-6">
                    {/* --- Icon Selection & Picker --- */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-[5px] border border-gray-100 group-hover:bg-white group-hover:border-[#F7A400]/20 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-[5px] flex items-center justify-center text-[#F7A400] shadow-sm border border-gray-100">
                          <IconPreview name={asset.icon} />
                        </div>
                        <div className="flex-1">
                          <label className="text-[12px] font-black text-gray-900  block mb-1 tracking-widest">
                            Lucide Icon Name
                          </label>
                          <input
                            type="text"
                            value={asset.icon}
                            onChange={(e) =>
                              handleAssetChange(index, "icon", e.target.value)
                            }
                            placeholder="e.g. zap, cpu, shield"
                            className="bg-transparent w-full outline-none text-sm font-bold text-black placeholder:text-gray-300"
                          />
                        </div>
                      </div>

                      {/* Quick Icon Picker Shortcuts */}
                      <div className="flex flex-wrap gap-2 p-2 bg-gray-50/50 rounded-[5px] border border-dashed border-gray-200">
                        {[
                          "zap",
                          "cpu",
                          "shield",
                          "layers",
                          "database",
                          "globe",
                          "code",
                          "server",
                          "activity",
                          "layout",
                        ].map((iName) => (
                          <button
                            key={iName}
                            type="button"
                            onClick={() =>
                              handleAssetChange(index, "icon", iName)
                            }
                            className={`p-2 rounded-[5px] border transition-all ${
                              asset.icon === iName
                                ? "bg-[#F7A400] border-[#F7A400] text-white shadow-md scale-110"
                                : "bg-white border-gray-100 text-gray-400 hover:border-[#F7A400] hover:text-[#F7A400]"
                            }`}
                          >
                            <IconPreview name={iName} />
                          </button>
                        ))}
                        <a
                          href="https://lucide.dev/icons"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center px-3 text-[10px] font-black text-[#F7A400] hover:underline uppercase"
                        >
                          More +
                        </a>
                      </div>
                    </div>

                    {/* --- Title Input --- */}
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase block mb-2 tracking-widest ml-1">
                        Asset Title
                      </label>
                      <input
                        type="text"
                        value={asset.title}
                        onChange={(e) =>
                          handleAssetChange(index, "title", e.target.value)
                        }
                        placeholder="e.g. High-Speed Deployment"
                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-[5px] focus:bg-white focus:border-[#F7A400] outline-none text-sm font-bold transition-all"
                      />
                    </div>

                    {/* --- Description Input --- */}
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase block mb-2 tracking-widest ml-1">
                        Strategic Description
                      </label>
                      <textarea
                        value={asset.description}
                        onChange={(e) =>
                          handleAssetChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Explain why this asset matters..."
                        rows="3"
                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-[5px] focus:bg-white focus:border-[#F7A400] outline-none text-xs leading-relaxed resize-none transition-all font-medium text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Index Badge */}
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gray-50 rounded-[5px] border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-300 group-hover:text-[#F7A400] group-hover:bg-white transition-all">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips Section */}
          <div className="bg-[#F7A400]/5 border border-[#F7A400]/20 p-6 rounded-[5px] flex items-start gap-4">
            <div className="bg-[#F7A400] p-2 rounded-[5px] text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="font-bold text-[#F7A400] text-sm">
                Pro Tip: Icon Names
              </h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                আইকনের জন্য Lucide React এর নামগুলো ব্যবহার করো (যেমন:{" "}
                <b>zap</b>, <b>shield-check</b>, <b>layers</b>, <b>map</b>,{" "}
                <b>cpu</b>)। <br />
                বড় হাতের অক্ষর বা ছোট হাতের অক্ষর—যেভাবেই লিখো, ফ্রন্টএন্ডে সেটা
                অটো-ম্যানেজ হয়ে যাবে।
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TechnicalEdgeAdmin;
