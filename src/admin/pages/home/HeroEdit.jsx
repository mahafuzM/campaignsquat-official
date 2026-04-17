import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import { Trash2, Plus, Check, LayoutGrid, Tag, Save, MonitorPlay } from "lucide-react";
import toast from "react-hot-toast";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/hero`);
        if (res.data) {
          const heroData = res.data.success ? res.data.data : res.data;
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
              : `/${heroData.imageUrl.replace(/^\//, "")}`;
            setPreviewUrl(fullImgPath);
          }

          setAvailableIcons(heroData.iconHistory || []);
        }
      } catch (err) {
        toast.error("Failed to load hero data.");
      }
    };
    fetchData();
  }, []);

  const handleAddIcon = async () => {
    if (!newIconName) return toast.error("Please enter an icon name.");
    try {
      const res = await axios.post(`/api/hero/icons/add`, {
        name: newIconName.toLowerCase().trim(),
      });
      if (res.data.success) {
        setAvailableIcons([...availableIcons, res.data.data]);
        setNewIconName("");
        toast.success("Icon asset added!");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error adding icon");
    }
  };

  const handleDeleteIcon = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await axios.delete(`/api/hero/icons/${id}`);
      if (res.data.success) {
        setAvailableIcons(availableIcons.filter((icon) => icon._id !== id));
        toast.success("Icon removed.");
      }
    } catch (err) {
      toast.error("Error deleting icon");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

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
      const res = await axios.post(`/api/hero`, formData);
      if (res.data.success) {
        toast.success("Hero section successfully updated!");
        setSelectedFile(null);
      }
    } catch (err) {
      toast.error("Error updating hero section.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F7A400]/10 flex items-center justify-center">
              <MonitorPlay className="text-[#F7A400]" size={16} />
            </div>
            Hero Customizer
          </h1>
          <p className="text-sm text-gray-500 mt-1">Configure layout, assets, and typography for the main landing area.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold rounded-md uppercase tracking-widest shadow-sm">
            v3.0 System
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Heading Group */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Main Heading</label>
              <textarea
                rows="2"
                className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:bg-gray-50 focus:border-[#F7A400] outline-none text-2xl font-bold text-gray-900 transition-colors shadow-sm"
                value={content.heading}
                placeholder="Enter compelling headline..."
                onChange={(e) => setContent({ ...content, heading: e.target.value })}
              />
            </div>

            {/* Paragraph Group */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Supporting Paragraph</label>
              <textarea
                rows="4"
                className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:bg-gray-50 focus:border-[#F7A400] outline-none text-sm text-gray-600 leading-relaxed transition-colors shadow-sm"
                value={content.paragraph}
                placeholder="Briefly describe your agency's value proposition..."
                onChange={(e) => setContent({ ...content, paragraph: e.target.value })}
              />
            </div>

            {/* Vimeo Config */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Vimeo Integration ID</label>
              <input
                type="text"
                className="w-full p-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#F7A400] text-sm text-gray-900 transition-colors shadow-sm font-mono"
                value={content.vimeoId}
                placeholder="e.g. 845942363"
                onChange={(e) => setContent({ ...content, vimeoId: e.target.value })}
              />
              <p className="text-xs text-gray-400 mt-1">Numerical ID of the video displayed on the play button popup.</p>
            </div>
            
          </div>

          {/* Right Column: Visuals & Badge */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Image Upload */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F7A400]"></div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">Primary Hero Asset</label>
              <div className="relative group border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-[#F7A400] transition-colors text-center bg-gray-50 hover:bg-[#F7A400]/5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-white border border-gray-100 shadow-sm rounded-full text-gray-400 group-hover:text-[#F7A400] transition-colors">
                    <MonitorPlay size={20} />
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-1">Upload New Asset</p>
                </div>
              </div>
              {previewUrl && (
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                  <img src={previewUrl} alt="Preview" className="w-full h-[140px] object-cover" />
                </div>
              )}
            </div>

            {/* Badge Config */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
               <div className="flex items-center gap-2 mb-4">
                  <LayoutGrid size={16} className="text-gray-900" />
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Badge Icon Config</h2>
               </div>
              
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="text"
                    placeholder="Lucide ID (e.g. zap)..."
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:border-[#F7A400] text-sm text-gray-900 transition-colors"
                    value={newIconName}
                    onChange={(e) => setNewIconName(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddIcon}
                  className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md font-medium text-xs flex items-center transition-colors shadow-sm"
                >
                  <Plus size={14} className="mr-1" /> Add
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableIcons.map((icon) => (
                  <div
                    key={icon._id}
                    onClick={() => setContent({ ...content, badge: icon.name })}
                    className={`group relative h-16 flex flex-col items-center justify-center rounded-md border transition-all cursor-pointer ${content.badge === icon.name ? "border-[#F7A400] bg-[#F7A400]/5" : "border-gray-200 bg-white hover:border-gray-300"}`}
                  >
                    {content.badge === icon.name && (
                      <div className="absolute top-0 right-0 p-1 bg-[#F7A400] rounded-bl-md">
                        <Check size={10} className="text-white" strokeWidth={4} />
                      </div>
                    )}
                    <span className={`text-[11px] font-semibold capitalize mt-1 ${content.badge === icon.name ? "text-gray-900" : "text-gray-500"}`}>
                      {icon.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteIcon(icon._id, e)}
                      className="absolute inset-0 bg-red-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
                    >
                      <Trash2 size={14} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Global Save Action */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#F7A400] text-black font-bold py-3 px-8 rounded-lg transition-all flex items-center gap-2 text-sm shadow-md shadow-[#F7A400]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {loading ? "Synchronizing..." : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroEdit;
