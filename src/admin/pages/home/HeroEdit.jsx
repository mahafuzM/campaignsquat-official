import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Check, LayoutGrid, Tag } from 'lucide-react';

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
    imageUrl: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/hero');
        if (res.data) {
          setContent(res.data);
          if (res.data.imageUrl) setPreviewUrl(res.data.imageUrl);
        }
        
        const iconRes = await axios.get('http://localhost:5000/api/hero/icons');
        setAvailableIcons(iconRes.data);
      } catch (err) { 
        console.log("Error loading data:", err); 
      }
    };
    fetchData();
  }, []);

  const handleAddIcon = async () => {
    if (!newIconName) return;
    try {
      const res = await axios.post('http://localhost:5000/api/hero/icons/add', { 
        name: newIconName.toLowerCase().trim() 
      });
      setAvailableIcons([...availableIcons, res.data]);
      setNewIconName("");
    } catch (err) {
      alert(err.response?.data?.error || "Error adding icon");
    }
  };

  const handleDeleteIcon = async (id, e) => {
    e.stopPropagation(); 
    if (!window.confirm("Remove this icon from history?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/hero/icons/${id}`);
      setAvailableIcons(availableIcons.filter(icon => icon._id !== id));
      if (availableIcons.find(i => i._id === id)?.name === content.badge) {
        setContent({...content, badge: ""});
      }
    } catch (err) {
      console.log("Delete error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('badge', content.badge);
    formData.append('heading', content.heading);
    formData.append('paragraph', content.paragraph);
    formData.append('vimeoId', content.vimeoId);
    if (selectedFile) formData.append('heroImage', selectedFile);

    try {
      await axios.post('http://localhost:5000/api/hero', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Hero Section Updated Successfully! 🎉');
    } catch (err) {
      alert('Error updating hero section.');
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-black font-['poppins'] pb-20">
      <div className="w-full px-6 md:px-12 py-10">
        <div className="flex justify-between items-end border-b border-gray-200 pb-8 mb-10">
            <div>
                <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Hero Customizer</h1>
                <p className="text-black mt-2 text-lg ">Refine your agency's first impression.</p>
            </div>
            <div className="hidden md:block">
               <span className="px-4 py-2 bg-black text-white text-[14px] font-semibold rounded-[5px] tracking-widest">v3.0 Stable</span>
            </div>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full space-y-12">
          
          {/* --- New Premium Icon Management Section --- */}
          <div className="bg-white border border-gray-200 rounded-[5px] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-gray-50 bg-[#FCFCFC]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#F7A400] rounded-[5px] text-black">
                  <LayoutGrid size={24} />
                </div>
                <h2 className="font-semibold text-[20px] text-black">Badge Icon Library</h2>
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="relative flex-1 group">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18}/>
                  <input 
                    type="text" 
                    placeholder="Enter Lucide icon name (e.g. sparkless, code, zap)..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
                    value={newIconName}
                    onChange={(e) => setNewIconName(e.target.value)}
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleAddIcon}
                  className="bg-black text-white px-10 py-4 rounded-[5px] font-semibold flex items-center gap-2 hover:bg-gray-800 active:scale-95 transition-all shadow-xl shadow-black/10"
                >
                  <Plus size={20} strokeWidth={3}/> Add Asset
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[14px] font-bold text-black ">Selectable Library</p>
                <div className="h-[1px] flex-1 bg-gray-100 mx-4"></div>
                <p className="text-xs font-medium text-gray-400">{availableIcons.length} icons stored</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {availableIcons.length > 0 ? availableIcons.map((icon) => (
                  <div 
                    key={icon._id} 
                    onClick={() => setContent({...content, badge: icon.name})}
                    className={`group relative h-24 flex flex-col items-center justify-center rounded-[5px] border-2 transition-all duration-300 cursor-pointer overflow-hidden ${content.badge === icon.name ? 'border-[#F7A400] bg-[#F7A400]/5' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg'}`}
                  >
                    {/* Selected Indicator */}
                    {content.badge === icon.name && (
                      <div className="absolute top-0 right-0 p-1.5 bg-[#F7A400] rounded-bl-[5px] shadow-sm animate-in fade-in zoom-in duration-300">
                        <Check size={12} className="text-white" strokeWidth={4} />
                      </div>
                    )}
                    
                    <span className={`text-[13px] font-bold capitalize tracking-tight transition-colors ${content.badge === icon.name ? 'text-[#F7A400]' : 'text-black'}`}>
                      {icon.name}
                    </span>
                    
                    {/* Modern Delete Overlay */}
                    <button 
                      type="button" 
                      onClick={(e) => handleDeleteIcon(icon._id, e)}
                      className="absolute inset-0 bg-red-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[5px]"
                    >
                      <Trash2 size={20} className="text-white" />
                    </button>
                  </div>
                )) : (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center bg-gray-50 rounded-[5px] border-2 border-dashed border-gray-200">
                     <p className="text-gray-400 font-medium">No assets found. Start building your library!</p>
                  </div>
                )}
              </div>

              {/* Active Selection Badge */}
              <div className="mt-8 flex items-center gap-4 bg-gray-50 p-2 pl-6 rounded-[5px] border border-gray-100 self-start inline-flex">
                <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Active Badge:</span>
                <div className="px-6 py-2 bg-white text-black text-sm font-black rounded-[5px] border border-gray-200 shadow-sm">
                  {content.badge ? content.badge.toUpperCase() : "NOT SELECTED"}
                </div>
              </div>
            </div>
          </div>

          {/* --- Rest of the sections (Untouched as requested) --- */}
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[14px] text-black uppercase tracking-wider">Main Heading</label>
            <textarea 
              rows="2"
              className="w-full p-6 bg-[#FBFBFB] border border-gray-200 rounded-[5px] focus:bg-white focus:border-black outline-none text-4xl font-extrabold transition-all duration-300 shadow-sm"
              value={content.heading}
              onChange={(e) => setContent({...content, heading: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[14px] text-black uppercase tracking-wider">Description Paragraph</label>
            <textarea 
              rows="6"
              className="w-full p-6 bg-[#FBFBFB] border border-gray-200 rounded-[5px] focus:bg-white focus:border-black outline-none text-2xl leading-relaxed transition-all duration-300 shadow-sm"
              value={content.paragraph}
              onChange={(e) => setContent({...content, paragraph: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-[14px] text-black uppercase tracking-wider">Vimeo Video ID</label>
              <input 
                type="text" 
                className="w-full p-6 bg-[#FBFBFB] border border-gray-200 rounded-[5px] outline-none focus:bg-white focus:border-black text-xl shadow-sm"
                value={content.vimeoId}
                onChange={(e) => setContent({...content, vimeoId: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold text-[14px] text-black uppercase tracking-wider">Banner Image</label>
              <div className="relative group border-2 border-dashed border-gray-200 rounded-[5px] p-10 hover:border-black transition-all duration-300 text-center bg-[#FBFBFB]">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl text-gray-300">📁</span>
                    <p className="text-[12px] text-black">Upload or drag and drop image here</p>
                </div>
              </div>
              
              {previewUrl && (
                <div className="mt-6">
                  <img src={previewUrl} alt="Preview" className="w-full h-[400px] object-cover rounded-2xl border-2 border-gray-100 shadow-xl" />
                </div>
              )}
            </div>
          </div>

          <div className="pt-10 border-t border-gray-200 flex justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#F7A400] text-black text-[15px] hover:text-white hover:bg-[#02050A] font-bold py-4 px-12 rounded-xl border-2 border-[#F7A400] transition-all duration-300 shadow-lg shadow-[#F7A400]/20 active:scale-95"
              >
                {loading ? 'Updating...' : 'Save All Changes'}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroEdit;