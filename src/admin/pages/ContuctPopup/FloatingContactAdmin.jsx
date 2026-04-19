import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import {
  Save,
  Plus,
  Trash2,
  Loader2,
  Link as LinkIcon,
  Layers,
  Phone,
  Settings,
  MoreHorizontal,
  Calendar,
  MessageCircle,
  Zap,
  Mail
} from "lucide-react";
import toast from "react-hot-toast";

const FloatingContactAdmin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const BASE_URL = "/api/contact-menu";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setMenuItems(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contact menu data");
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = () => {
    setMenuItems([
      ...menuItems,
      { text: "", icon: "calendar", link: "", order: menuItems.length },
    ]);
  };

  const removeMenuItem = (index) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...menuItems];
    updatedItems[index][field] = value;
    setMenuItems(updatedItems);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(BASE_URL, menuItems);
      toast.success("Floating contact updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full border border-gray-200 outline-none focus:border-[#F7A400] transition-colors bg-gray-50 focus:bg-white text-gray-900 shadow-sm text-[13px] p-2 rounded";
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
            <Phone className="text-[#F7A400]" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Floating Contact</h1>
            <p className="text-xs text-gray-500 mt-1">Manage quick-access popup menu links</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button
            onClick={addMenuItem}
            className="flex items-center gap-1.5 bg-gray-900 text-white px-4 py-1.5 rounded font-bold text-xs hover:bg-black transition-colors shadow-sm"
          >
            <Plus size={14} />
            Add New
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#F7A400] text-black px-4 py-1.5 rounded font-bold text-xs hover:bg-[#e59800] transition-colors shadow-sm disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-4">
        {menuItems.length > 0 ? (
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider w-12 text-center">#</th>
                    <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Button Label</th>
                    <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider w-40">Icon</th>
                    <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Source Link (URL)</th>
                    <th className="px-4 py-2 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {menuItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-4 py-3 text-center text-xs font-bold text-gray-400">{index + 1}</td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => handleInputChange(index, "text", e.target.value)}
                          placeholder="e.g. WhatsApp Us"
                          className={inputClass}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <select
                            value={item.icon}
                            onChange={(e) => handleInputChange(index, "icon", e.target.value)}
                            className={`${inputClass} appearance-none pr-8`}
                          >
                            <option value="calendar">📅 Calendar</option>
                            <option value="whatsapp">💬 WhatsApp</option>
                            <option value="zap">⚡ Zap</option>
                            <option value="message">✉️ Message</option>
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <MoreHorizontal size={14} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <LinkIcon size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={item.link}
                            onChange={(e) => handleInputChange(index, "link", e.target.value)}
                            placeholder="https://..."
                            className={`${inputClass} pl-7 font-mono text-[12px]`}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => removeMenuItem(index)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                          title="Remove Item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-100 rounded-xl py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Layers className="text-gray-200" size={32} />
            </div>
            <h3 className="text-sm font-bold text-gray-900">No links configuration</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Create quick access buttons for your floating contact popup.</p>
            <button
              onClick={addMenuItem}
              className="mt-6 flex items-center gap-1.5 bg-[#F7A400] text-black px-6 py-2 rounded font-bold text-xs hover:bg-[#e59800] transition-shadow shadow-sm"
            >
              <Plus size={14} />
              Create First Link
            </button>
          </div>
        )}
      </div>

      {/* Info Context */}
      <div className="mt-8 bg-black/5 border border-black/5 rounded-lg p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-black/5">
            <Settings className="text-[#F7A400]" size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Popup Customization Guide</h4>
            <p className="text-[12px] text-gray-600 leading-relaxed max-w-2xl">
              The links configured here will appear in the floating contact bubble on the main website. Each button can be linked to external sites, messaging platforms (like WhatsApp API), or appointment booking calendars. 
              <span className="block mt-2 font-bold text-[#F7A400]">Note: Changes apply instantly across the site after saving.</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FloatingContactAdmin;
