import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, Check, LayoutGrid, Tag } from "lucide-react";

const HeroEdit = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [availableIcons, setAvailableIcons] = useState([]);
  const [newIconName, setNewIconName] = useState("");

  const [content, setContent] = useState({
    badge: "",
    heading: "",
    paragraph: "",
    vimeoId: "",
    imageUrl: "",
  });

  const API_BASE =
    window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

  // ১. ডাটা লোড করা (Fetch Data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/hero`);
        // ব্যাকএন্ডে res.json({ success: true, data }) পাঠানো হয়, তাই res.data.data ব্যবহার করা হয়েছে
        if (res.data && res.data.success && res.data.data) {
          const heroData = res.data.data;
          setContent({
            badge: heroData.badge || "",
            heading: heroData.heading || "",
            paragraph: heroData.paragraph || "",
            vimeoId: heroData.vimeoId || "",
            imageUrl: heroData.imageUrl || "",
          });

          if (heroData.imageUrl) {
            const fullImgPath = heroData.imageUrl.startsWith("http")
              ? heroData.imageUrl
              : `${API_BASE}/${heroData.imageUrl.replace(/^\//, "")}`;
            setPreviewUrl(fullImgPath);
          }

          // আইকন লাইব্রেরি সেট করা
          setAvailableIcons(heroData.iconHistory || []);
        }
      } catch (err) {
        console.error("Data load failed:", err);
      }
    };
    fetchData();
  }, [API_BASE]);

  // ২. আইকন হ্যান্ডেলিং
  const handleAddIcon = async () => {
    if (!newIconName) return;
    try {
      const res = await axios.post(`${API_BASE}/api/hero/icons/add`, {
        name: newIconName.toLowerCase().trim(),
      });
      if (res.data.success) {
        setAvailableIcons([...availableIcons, res.data.data]);
        setNewIconName("");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error adding icon");
    }
  };

  const handleDeleteIcon = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Remove this icon from history?")) return;
    try {
      const res = await axios.delete(`${API_BASE}/api/hero/icons/${id}`);
      if (res.data.success) {
        setAvailableIcons(availableIcons.filter((icon) => icon._id !== id));
      }
    } catch (err) {
      console.log("Delete error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // ৩. ডাটা সাবমিট (Submit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("badge", content.badge);
    formData.append("heading", content.heading);
    formData.append("paragraph", content.paragraph);
    formData.append("vimeoId", content.vimeoId);
    if (selectedFile) formData.append("heroImage", selectedFile);

    try {
      const res = await axios.post(`${API_BASE}/api/hero`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        alert("Hero Section Updated Successfully! 🎉");
        // স্টেট রিফ্রেশ করা
        setSelectedFile(null);
      }
    } catch (err) {
      alert("Error updating hero section.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-black font-['poppins'] pb-20">
      <div className="w-full px-6 md:px-12 py-10">
        <div className="flex justify-between items-end border-b border-gray-200 pb-8 mb-10">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
              Hero Customizer
            </h1>
            <p className="text-black mt-2 text-lg">
              Refine your agency's first impression.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="px-4 py-2 bg-black text-white text-[14px] font-semibold rounded-[5px] tracking-widest">
              v3.0 Stable
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-12">
          {/* Badge Icon Library */}
          <div className="bg-white border border-gray-200 rounded-[5px] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-gray-50 bg-[#FCFCFC]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#F7A400] rounded-[5px] text-black">
                  <LayoutGrid size={24} />
                </div>
                <h2 className="font-semibold text-[20px] text-black">
                  Badge Icon Library
                </h2>
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="relative flex-1 group">
                  <Tag
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Enter Lucide icon name (e.g. sparkless, zap)..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-black transition-all"
                    value={newIconName}
                    onChange={(e) => setNewIconName(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddIcon}
                  className="bg-black text-white px-10 py-4 rounded-[5px] font-semibold flex items-center gap-2"
                >
                  <Plus size={20} strokeWidth={3} /> Add Asset
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {availableIcons.map((icon) => (
                  <div
                    key={icon._id}
                    onClick={() => setContent({ ...content, badge: icon.name })}
                    className={`group relative h-24 flex flex-col items-center justify-center rounded-[5px] border-2 transition-all cursor-pointer ${content.badge === icon.name ? "border-[#F7A400] bg-[#F7A400]/5" : "border-gray-100 bg-white"}`}
                  >
                    {content.badge === icon.name && (
                      <div className="absolute top-0 right-0 p-1.5 bg-[#F7A400] rounded-bl-[5px]">
                        <Check
                          size={12}
                          className="text-white"
                          strokeWidth={4}
                        />
                      </div>
                    )}
                    <span
                      className={`text-[13px] font-bold capitalize ${content.badge === icon.name ? "text-[#F7A400]" : "text-black"}`}
                    >
                      {icon.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteIcon(icon._id, e)}
                      className="absolute inset-0 bg-red-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[5px]"
                    >
                      <Trash2 size={20} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[14px] uppercase">
              Main Heading
            </label>
            <textarea
              rows="2"
              className="w-full p-6 bg-[#FBFBFB] border border-gray-200 rounded-[5px] focus:bg-white focus:border-black outline-none text-4xl font-extrabold shadow-sm"
              value={content.heading}
              onChange={(e) =>
                setContent({ ...content, heading: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[14px] uppercase">
              Description Paragraph
            </label>
            <textarea
              rows="4"
              className="w-full p-6 bg-[#FBFBFB] border border-gray-200 rounded-[5px] focus:bg-white focus:border-black outline-none text-xl leading-relaxed shadow-sm"
              value={content.paragraph}
              onChange={(e) =>
                setContent({ ...content, paragraph: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-[14px] uppercase">
                Vimeo Video ID
              </label>
              <input
                type="text"
                className="w-full p-6 bg-[#FBFBFB] border border-gray-200 rounded-[5px] outline-none focus:border-black text-xl shadow-sm"
                value={content.vimeoId}
                onChange={(e) =>
                  setContent({ ...content, vimeoId: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold text-[14px] uppercase">
                Banner Image
              </label>
              <div className="relative group border-2 border-dashed border-gray-200 rounded-[5px] p-10 hover:border-black transition-all text-center bg-[#FBFBFB]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl">📁</span>
                  <p className="text-[12px] text-black">
                    Upload or drag and drop image here
                  </p>
                </div>
              </div>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-[300px] object-cover rounded-xl mt-4 border shadow-md"
                />
              )}
            </div>
          </div>

          <div className="pt-10 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#F7A400] text-black hover:bg-black hover:text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save All Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroEdit;
