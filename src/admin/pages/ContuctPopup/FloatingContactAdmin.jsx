import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Save,
  Plus,
  Trash2,
  Loader2,
  Link as LinkIcon,
  Layers,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

const FloatingContactAdmin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ব্যাকএন্ড URL নিশ্চিত করুন (আপনার পোর্টের সাথে মিলিয়ে)
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
      toast.error("ডাটা লোড করতে সমস্যা হয়েছে");
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
      toast.success("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed. Check your connection.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#F7A400]" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-poppins text-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              Floating <span className="text-[#F7A400]">Contact</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage quick-access buttons for your users.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addMenuItem}
              className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-80"
            >
              <Plus size={18} /> Add New Link
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#F7A400] text-black px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center"
            >
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={item.text}
                  placeholder="Button Text"
                  onChange={(e) =>
                    handleInputChange(index, "text", e.target.value)
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:border-[#F7A400] outline-none"
                />
                <select
                  value={item.icon}
                  onChange={(e) =>
                    handleInputChange(index, "icon", e.target.value)
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm outline-none"
                >
                  <option value="calendar">📅 Calendar</option>
                  <option value="whatsapp">💬 WhatsApp</option>
                  <option value="zap">⚡ Zap</option>
                  <option value="message">✉️ Message</option>
                </select>
                <div className="relative w-full">
                  <LinkIcon
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={item.link}
                    placeholder="https://..."
                    onChange={(e) =>
                      handleInputChange(index, "link", e.target.value)
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 pl-10 text-sm focus:border-[#F7A400] outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => removeMenuItem(index)}
                className="bg-white text-red-500 p-3 rounded-xl border border-red-50 hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {menuItems.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <Layers className="mx-auto mb-2 opacity-20" size={48} /> No items
              found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingContactAdmin;
