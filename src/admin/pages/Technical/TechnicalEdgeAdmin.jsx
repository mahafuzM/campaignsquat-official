import React, { useState, useEffect, useCallback } from "react";
import axios from "../../../axiosConfig";
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
import toast from "react-hot-toast";

const TechnicalEdgeAdmin = () => {
  const [mainHeader, setMainHeader] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [assets, setAssets] = useState([
    { icon: "zap", title: "", description: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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
      toast.error("Failed to load Technical Edge data");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addAsset = () => {
    setAssets([...assets, { icon: "zap", title: "", description: "" }]);
  };

  const removeAsset = (index) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const handleAssetChange = (index, field, value) => {
    const newAssets = [...assets];
    newAssets[index][field] = value;
    setAssets(newAssets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/technical-edge`, {
        mainHeader,
        subTitle,
        assets,
      });
      toast.success("Technical Edge Updated Successfully! 🔥");
    } catch (err) {
      console.error("Update Error:", err);
      toast.error(err.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const IconPreview = ({ name }) => {
    if (!name) return <LucideIcons.Box size={20} />;
    const iconName = name.charAt(0).toUpperCase() + name.slice(1);
    const IconComponent = LucideIcons[iconName] || LucideIcons.Box;
    return <IconComponent size={20} />;
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#F7A400] animate-spin" />
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            Syncing Tactical Data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 font-sans pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8 mt-2 sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F7A400]/10 flex items-center justify-center">
              <Shield className="text-[#F7A400]" size={16} />
            </div>
            Technical Edge Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">Campaignsquat Tactical Unit Assets</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 md:mt-0 bg-[#F7A400] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-[#e59800] transition-all disabled:opacity-50 shadow-md shadow-[#F7A400]/20 active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Save size={16} />
          )}
          Save Changes
        </button>
      </div>

      <main className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Main Branding Section */}
          <section className="bg-white p-6 border border-gray-100 shadow-sm rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#F7A400]" />
            <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
              <Type className="text-[#F7A400]" size={20} />
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Main Header & Intro</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  Section Header
                </label>
                <input
                  type="text"
                  value={mainHeader}
                  onChange={(e) => setMainHeader(e.target.value)}
                  placeholder="e.g. The Technical Edge"
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none font-bold text-lg text-gray-900 transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  Strategic Sub-title
                </label>
                <input
                  type="text"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="e.g. Strategic Assets included with every partnership"
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none text-gray-700 transition-all shadow-sm"
                />
              </div>
            </div>
          </section>

          {/* Tactical Asset Cards */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7A400]/10 flex items-center justify-center">
                  <Layout className="text-[#F7A400]" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Tactical Asset Cards
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    Managing {assets.length} assets
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={addAsset}
                className="flex items-center gap-1.5 text-xs font-bold bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:border-[#F7A400] hover:text-[#F7A400] transition-all shadow-sm active:scale-[0.98]"
              >
                <Plus size={14} /> Add New Asset
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {assets.map((asset, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:border-[#F7A400]/50 hover:shadow-md transition-all duration-200"
                >
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => removeAsset(index)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
                    title="Remove Asset"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="space-y-5 pr-8">
                    {/* Icon Selection */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group-hover:bg-white group-hover:border-[#F7A400]/30 transition-colors">
                        <div className="w-10 h-10 shrink-0 bg-white rounded-md flex items-center justify-center text-[#F7A400] shadow-sm border border-gray-100">
                          <IconPreview name={asset.icon} />
                        </div>
                        <div className="flex-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1 tracking-widest">
                            Lucide Icon Name
                          </label>
                          <input
                            type="text"
                            value={asset.icon}
                            onChange={(e) => handleAssetChange(index, "icon", e.target.value)}
                            placeholder="e.g. zap, cpu"
                            className="bg-transparent w-full outline-none text-sm font-bold text-gray-900 placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      {/* Quick Icon Set */}
                      <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
                        {[
                          "zap", "cpu", "shield", "layers", "database",
                          "globe", "code", "server", "activity", "layout"
                        ].map((iName) => (
                          <button
                            key={iName}
                            type="button"
                            onClick={() => handleAssetChange(index, "icon", iName)}
                            className={`p-1.5 rounded-md border transition-all ${
                              asset.icon === iName
                                ? "bg-[#F7A400] border-[#F7A400] text-black shadow-sm"
                                : "bg-white border-gray-200 text-gray-500 hover:border-[#F7A400] hover:text-[#F7A400]"
                            }`}
                          >
                            <IconPreview name={iName} />
                          </button>
                        ))}
                        <a
                          href="https://lucide.dev/icons"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center px-2 text-[10px] font-bold text-blue-500 hover:text-blue-700 hover:underline uppercase"
                        >
                          More
                        </a>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase block mb-1 tracking-wider">
                        Asset Title
                      </label>
                      <input
                        type="text"
                        value={asset.title}
                        onChange={(e) => handleAssetChange(index, "title", e.target.value)}
                        placeholder="e.g. High-Speed Deployment"
                        className="w-full bg-white border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none text-sm font-semibold transition-all shadow-sm"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase block mb-1 tracking-wider">
                        Strategic Description
                      </label>
                      <textarea
                        value={asset.description}
                        onChange={(e) => handleAssetChange(index, "description", e.target.value)}
                        placeholder="Explain why this asset matters..."
                        rows="3"
                        className="w-full bg-white border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none text-sm leading-relaxed resize-none transition-all font-medium text-gray-700 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Index Badge */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400 group-hover:text-[#F7A400] group-hover:bg-white group-hover:border-[#F7A400]/30 transition-all shadow-sm">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Guidelines */}
          <div className="bg-[#F7A400]/5 border border-[#F7A400]/20 p-5 rounded-xl flex items-start gap-4">
            <div className="bg-[#F7A400] p-2 rounded-lg text-black shrink-0 mt-0.5">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Design System Info</h4>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                Use Lucide React icon names for tactical assets (e.g., <b>shield-check</b>, <b>cpu</b>). The frontend will automatically map these names to the appropriate scalable vector icons on the public site.
              </p>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
};

export default TechnicalEdgeAdmin;
