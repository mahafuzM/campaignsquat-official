import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Save,
  Link as LinkIcon,
  Type,
  Loader2,
  AlertCircle,
  PlusCircle,
  LayoutGrid,
} from "lucide-react"; // ✅ Fixed here
import { toast } from "react-hot-toast";

const ServiceEcosystemAdmin = () => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [services, setServices] = useState([{ name: "", url: "" }]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ ডাইনামিক বেস ইউআরএল (লোকাল এবং লাইভ দুই জায়গায় কাজ করবে)
  

  const API_URL = `/api/creative-services`;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setSectionTitle(res.data.sectionTitle || "");
          setServices(
            res.data.services?.length > 0
              ? res.data.services
              : [{ name: "", url: "" }],
          );
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [API_URL]);

  const addService = () => setServices([...services, { name: "", url: "" }]);

  const removeService = async (index) => {
    if (services.length === 1)
      return toast.error("At least one item is required!");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this? 🗑️",
    );
    if (confirmDelete) {
      const updatedServices = services.filter((_, i) => i !== index);
      // অপটিমিস্টিক আপডেট (সাথে সাথে ইউআই থেকে সরানো)
      const originalServices = [...services];
      setServices(updatedServices);

      try {
        setSaving(true);
        await axios.post(API_URL, { sectionTitle, services: updatedServices });
        toast.success("Deleted and Updated! 🚀");
      } catch (err) {
        toast.error("Failed to sync delete");
        setServices(originalServices);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleInputChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleSave = async () => {
    if (services.some((s) => !s.name.trim()))
      return toast.error("Fill all names!");

    setSaving(true);
    try {
      await axios.post(API_URL, { sectionTitle, services });
      toast.success("All Changes Saved Successfully!");
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
        <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-400">
          Syncing Ecosystem...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 px-6 py-5">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-[22px] font-semibold tracking-tight text-black">
            Service Manager
          </h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-[5px] font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {saving ? "SAVING..." : "SAVE CHANGES"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10 space-y-12">
        {/* Section Heading Input */}
        <div className="space-y-3">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] ml-1">
            Main Section Title
          </label>
          <input
            type="text"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            className="w-full bg-white border-2 border-gray-100 rounded-[5px] p-5 text-black text-xl font-bold focus:border-black focus:ring-0 outline-none transition-all placeholder:text-gray-300 shadow-sm"
            placeholder="Enter Heading..."
          />
        </div>

        {/* Service Items List */}
        <div className="space-y-6">
          <div className="px-1">
            <label className="text-[14px] font-semibold text-gray-900 ">
              Ecosystem Items ({services.length})
            </label>
          </div>

          <div className="grid gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 p-6 bg-white border-2 border-gray-50 rounded-[5px] hover:border-gray-200 transition-all shadow-sm relative group"
              >
                {/* Service Name Input */}
                <div className="flex-1">
                  <span className="text-[12px] font-semibold text-gray-900  mb-2 block ml-1">
                    Service Name
                  </span>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="w-full bg-transparent border-b-2 border-gray-100 py-2 text-black text-lg font-bold focus:border-black outline-none transition-all"
                    placeholder="e.g. App Design"
                  />
                </div>

                {/* URL Input */}
                <div className="flex-[1.5]">
                  <span className="text-[12px] font-semibold text-gray-900  mb-2 block ml-1">
                    Redirect URL
                  </span>
                  <div className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-gray-900" />
                    <input
                      type="text"
                      value={service.url}
                      onChange={(e) =>
                        handleInputChange(index, "url", e.target.value)
                      }
                      className="w-full bg-transparent border-b-2 border-gray-100 py-2 text-black font-semibold focus:border-black outline-none transition-all"
                      placeholder="/service/details"
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-end justify-end md:pb-2">
                  <button
                    onClick={() => removeService(index)}
                    className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ বড় "ADD NEW ITEM" বাটন - এখন লিস্টের একদম নিচে */}
          <button
            onClick={addService}
            className="w-full group mt-4 flex items-center justify-center gap-3 bg-gray-50 hover:bg-black border-2 border-dashed border-gray-200 hover:border-black p-8 rounded-[24px] transition-all duration-300"
          >
            <div className="bg-white group-hover:bg-black p-2 rounded-full border border-gray-200 group-hover:border-white/20 transition-all">
              <Plus size={24} className="text-black group-hover:text-white" />
            </div>
            <span className="text-lg font-black uppercase tracking-widest text-gray-400 group-hover:text-white">
              Add Another Service
            </span>
          </button>
        </div>

        {/* Help Box */}
        <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 flex items-center gap-4">
          <div className="bg-black text-white p-2 rounded-lg">
            <AlertCircle size={20} />
          </div>
          <p className="text-sm font-medium text-gray-600 italic">
            Tip: External links should start with <b>https://</b> and local
            links with <b>/</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceEcosystemAdmin;
