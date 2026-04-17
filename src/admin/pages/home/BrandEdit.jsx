import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import { Trash2, UploadCloud, Image as ImageIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const BrandEdit = () => {
  const [brands, setBrands] = useState([]);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all brand logos
  const fetchBrands = async () => {
    try {
      const res = await axios.get(`/api/brands`);
      if (Array.isArray(res.data)) {
        setBrands(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setBrands(res.data.data);
      } else {
        setBrands([]);
      }
    } catch (err) {
      toast.error("Failed to fetch brand logos.");
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle local file selection and preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  // Upload Logo
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image file first.");

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await axios.post(`/api/brands`, formData);
      if (res.data && res.data.success !== false) {
          toast.success("Brand logo uploaded successfully!");
          setFile(null);
          setPreviewUrl(null);
          document.getElementById("fileInput").value = "";
          fetchBrands();
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to upload logo.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Logo
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/brands/${id}`);
      if (res.data && res.data.success !== false) {
          toast.success("Logo deleted successfully.");
          fetchBrands();
      }
    } catch (err) {
      toast.error("Failed to delete logo.");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F7A400]/10 flex items-center justify-center">
              <UploadCloud className="text-[#F7A400]" size={16} />
            </div>
            Brand Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Upload and manage trusted partner and client logos.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold rounded-md uppercase tracking-widest shadow-sm">
            v3.0 System
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 relative overflow-hidden sticky top-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#F7A400]"></div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">Upload New Logo</h2>
            
            <form onSubmit={handleUpload} className="flex flex-col">
              <div className="relative group border-2 border-dashed border-gray-200 rounded-lg p-8 hover:border-[#F7A400] transition-colors text-center bg-gray-50 hover:bg-[#F7A400]/5 mb-6">
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center gap-3">
                  {previewUrl ? (
                    <div className="w-full h-24 overflow-hidden rounded-md flex items-center justify-center bg-white border border-gray-100 p-2">
                      <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-full text-gray-400 group-hover:text-[#F7A400] transition-colors">
                        <ImageIcon size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-semibold">Click to select</p>
                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, or JPG (max. 2MB)</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !file}
                className="w-full bg-[#F7A400] text-black font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-[#F7A400]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <UploadCloud size={18} />
                )}
                {loading ? "Uploading..." : "Upload to Library"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: History Section */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 relative overflow-hidden min-h-[400px]">
             <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
             <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
               <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Logo Library</h2>
               <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{brands.length} Total</span>
             </div>

            {brands.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ImageIcon className="text-gray-300 mb-3" size={48} />
                <p className="text-gray-500 font-medium">No brands uploaded yet.</p>
                <p className="text-sm text-gray-400 mt-1">Upload your first logo from the left panel.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {brands.map((brand) => {
                  const imageUrl = brand.url?.startsWith("http")
                    ? brand.url
                    : `${(axios.defaults.baseURL || "")}${brand.url}`;
                    
                  return (
                    <div
                      key={brand._id}
                      className="group relative bg-gray-50 border border-gray-200 rounded-lg p-4 transition-all hover:border-[#F7A400] hover:shadow-md flex items-center justify-center h-28"
                    >
                      <div className="h-full w-full flex items-center justify-center overflow-hidden mix-blend-multiply">
                        <img
                          src={imageUrl}
                          alt="Brand Logo"
                          className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>

                      {/* Quick Actions Dropdown Overlay */}
                      <button
                        onClick={() => handleDelete(brand._id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 transform scale-90 group-hover:scale-100"
                        title="Delete Logo"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BrandEdit;
