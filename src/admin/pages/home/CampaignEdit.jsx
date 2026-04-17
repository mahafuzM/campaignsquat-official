import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import { Upload, Save, Image as ImageIcon, Loader2, Info } from "lucide-react";
import toast from "react-hot-toast";

const CampaignEdit = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await axios.get("/api/about");
        if (res.data) {
          // Account for wrapped or direct response
          const data = res.data.success !== undefined ? res.data.data : res.data;
          
          if (data) {
            setFormData({
              title: data.title || "",
              description: data.description || "",
            });

            if (data.imageUrl) {
              setPreview(
                data.imageUrl.startsWith("http")
                  ? data.imageUrl
                  : `${axios.defaults.baseURL || ""}/${data.imageUrl.replace(/^\//, "")}`
              );
            }
          }
        }
      } catch (err) {
        toast.error("Failed to load campaign data.");
        console.error("Error fetching about data:", err);
      }
    };
    fetchAboutData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (file) data.append("image", file);

    try {
      const res = await axios.post("/api/about", data);
      if (res.data && res.data.success !== false) {
        toast.success("Campaign section updated successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update campaign section.");
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
              <Info className="text-[#F7A400]" size={16} />
            </div>
            Manage Campaign Section
          </h1>
          <p className="text-sm text-gray-500 mt-1">Update the promotional banner, main title, and descriptive content.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold rounded-md uppercase tracking-widest shadow-sm">
            v3.0 System
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Text Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
               
               <div className="space-y-6">
                 <div>
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                     Main Title
                   </label>
                   <input
                     type="text"
                     name="title"
                     value={formData.title}
                     onChange={handleChange}
                     placeholder="e.g. We Engineering Growth."
                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#F7A400] outline-none text-xl font-bold text-gray-900 transition-colors shadow-sm"
                     required
                   />
                   <p className="text-xs text-gray-400 mt-2 font-medium">
                     * Use HTML tags (e.g., &lt;span&gt;, &lt;br&gt;) if needed for specific text styling.
                   </p>
                 </div>

                 <div>
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                     Description Content
                   </label>
                   <textarea
                     name="description"
                     value={formData.description}
                     onChange={handleChange}
                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg h-48 focus:bg-white focus:border-[#F7A400] outline-none text-sm text-gray-700 leading-relaxed transition-colors shadow-sm resize-none"
                     required
                   />
                 </div>
               </div>
            </div>

          </div>

          {/* Right Column: Image Upload & Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F7A400]"></div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">Section Banner Image</h2>
              
              <div className="relative group border-2 border-dashed border-gray-200 rounded-lg p-2 hover:border-[#F7A400] transition-colors bg-gray-50 flex flex-col items-center justify-center min-h-[280px]">
                {preview ? (
                  <div className="relative w-full h-full rounded-md overflow-hidden bg-white">
                    <img
                      src={preview}
                      alt="Banner Preview"
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Upload size={14} /> Change Banner Image
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400 mb-4 group-hover:text-[#F7A400] transition-colors">
                      <ImageIcon size={32} />
                    </div>
                    <p className="text-gray-900 text-sm font-semibold">Click to upload banner</p>
                    <p className="text-gray-500 text-xs mt-1 px-4">Drag and drop or browse your local library.</p>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  accept="image/*"
                />
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-md p-3 mt-4">
                <p className="text-xs text-orange-800 text-center font-medium">
                  Recommended configuration: 800x1000px, WebP format.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Global Save Action */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#F7A400] text-black font-bold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-[#F7A400]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {loading ? "Synchronizing Data..." : "Update Campaign Section"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignEdit;
