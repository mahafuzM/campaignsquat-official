import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import {
  Save,
  Trash2,
  Link as LinkIcon,
  Loader2,
  AlertCircle,
  Plus,
  LayoutGrid
} from "lucide-react";

const ServiceEcosystemAdmin = () => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [services, setServices] = useState([{ name: "", url: "" }]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const API_URL = `/api/creative-services`;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setSectionTitle(res.data.sectionTitle || "");
          setServices(
            res.data.services?.length > 0 ? res.data.services : [{ name: "", url: "" }]
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
    if (services.length === 1) return toast.error("At least one item is required!");

    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (confirmDelete) {
      const updatedServices = services.filter((_, i) => i !== index);
      const originalServices = [...services];
      setServices(updatedServices);

      try {
        setSaving(true);
        await axios.post(API_URL, { sectionTitle, services: updatedServices });
        toast.success("Deleted and Updated!");
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
    if (services.some((s) => !s.name.trim())) return toast.error("Fill all names!");

    setSaving(true);
    try {
      await axios.post(API_URL, { sectionTitle, services });
      toast.success("Changes Saved Successfully!");
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
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-6 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7A400]/10 flex items-center justify-center shrink-0 border border-[#F7A400]/20">
            <LayoutGrid className="text-[#F7A400]" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Service Ecosystem</h1>
            <p className="text-xs text-gray-500 mt-1">Manage global ecosystem links</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#F7A400] text-black px-4 py-1.5 rounded font-bold text-xs hover:bg-[#e59800] transition-colors shadow-sm disabled:opacity-50 border border-transparent"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Global Settings */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#F7A400]" />
            <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Configuration</h3>
            
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Main Section Title</label>
                <input
                  type="text"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Creative Ecosystem"
                />
              </div>

              <div className="bg-amber-50/50 p-3 rounded border border-amber-100/50 flex items-start gap-2 mt-4 text-xs font-medium text-amber-800">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <p>External links should start with <b>https://</b> and internal links with <b>/</b>.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Array Management */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Ecosystem Registry ({services.length})</h3>
              <button
                onClick={addService}
                className="flex items-center gap-1 text-[10px] bg-gray-50 border border-gray-200 text-gray-600 hover:text-[#F7A400] hover:bg-white px-2 py-1 rounded transition-colors font-bold"
              >
                <Plus size={12} /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-50/80 border-y border-gray-100">
                      <th className="py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-5/12">Service Info</th>
                      <th className="py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-6/12">Redirect Path</th>
                      <th className="py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right w-1/12">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {services.map((service, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 group transition-colors">
                        <td className="py-2 px-3 align-middle">
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => handleInputChange(index, "name", e.target.value)}
                            className={`${inputClass} bg-transparent border-transparent px-1 py-1 shadow-none hover:bg-white border hover:border-gray-200`}
                            placeholder="e.g. App Design"
                          />
                        </td>
                        <td className="py-2 px-3 align-middle">
                          <div className="flex items-center gap-1.5 focus-within:ring-1 ring-[#F7A400]/50 rounded hover:bg-white hover:border-gray-200 border border-transparent transition-all">
                            <LinkIcon size={12} className="text-gray-400 shrink-0 ml-2" />
                            <input
                              type="text"
                              value={service.url}
                              onChange={(e) => handleInputChange(index, "url", e.target.value)}
                              className={`${inputClass} bg-transparent border-none px-1 py-1 shadow-none focus:bg-transparent mr-1`}
                              placeholder="/service"
                            />
                          </div>
                        </td>
                        <td className="py-2 px-3 align-middle text-right">
                          <button
                            onClick={() => removeService(index)}
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

              {services.length === 0 && (
                <div className="py-8 text-center text-xs text-gray-400 border border-dashed border-gray-200 bg-gray-50 rounded">
                  No services configured.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceEcosystemAdmin;
