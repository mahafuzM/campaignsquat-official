import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, UploadCloud } from "lucide-react";

const BrandEdit = () => {
  const [brands, setBrands] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ১. ডাইনামিক বেস ইউআরএল সেটআপ
  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://api.campaignsquat.com";

  // ২. ডাটাবেস থেকে সব লোগো আনা
  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/brands`);
      setBrands(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [API_BASE_URL]);

  // ৩. পিসি থেকে ফাইল সিলেক্ট এবং আপলোড
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("আগে একটি ইমেজ ফাইল সিলেক্ট করুন!");

    const formData = new FormData();
    formData.append("image", file); // Backend-e jodi 'image' field check kore

    setLoading(true);
    try {
      // Token thakle headers-e pathano uchit
      const token = localStorage.getItem("adminToken"); 
      
      await axios.post(`${API_BASE_URL}/api/brands`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": token ? `Bearer ${token}` : ""
        },
      });
      
      alert("সফলভাবে আপলোড হয়েছে!");
      setFile(null);
      document.getElementById("fileInput").value = ""; // Input reset
      fetchBrands(); 
    } catch (err) {
      console.error("Upload error:", err);
      alert("আপলোড ব্যর্থ হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  // ৪. ডিলিট ফাংশন
  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি নিশ্চিত যে এই লোগোটি ডিলিট করতে চান?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`${API_BASE_URL}/api/brands/${id}`, {
          headers: { "Authorization": token ? `Bearer ${token}` : "" }
        });
        fetchBrands(); 
      } catch (err) {
        console.error("Delete error:", err);
        alert("ডিলিট করা সম্ভব হয়নি!");
      }
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen text-black font-poppins">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <UploadCloud className="text-[#F7A400]" /> Brand Logo Management
        </h1>

        {/* --- Upload Section --- */}
        <div className="bg-gray-50 p-8 rounded-[5px] border-2 border-dashed border-gray-200 mb-10 text-center">
          <form onSubmit={handleUpload} className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-white px-6 py-3 rounded-[5px] shadow-sm border border-gray-200 hover:bg-gray-100 transition-all mb-4 text-sm font-semibold inline-block"
            >
              {file ? file.name : "Select your logo"}
            </label>

            <button
              disabled={loading}
              className={`bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Uploading..." : "Upload Logo"}
            </button>
          </form>
        </div>

        {/* --- History / List Section --- */}
        <h2 className="text-xl font-bold mb-4 border-l-4 border-[#F7A400] pl-3">
          Upload History
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="relative group bg-white border border-gray-100 rounded-[5px] p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-center h-32"
            >
              <div className="h-full w-full flex items-center justify-center overflow-hidden">
                <img
                  // Image source fixing
                  src={brand.url?.startsWith('http') ? brand.url : `${API_BASE_URL}${brand.url}`}
                  alt="Brand"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(brand._id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-[5px] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {brands.length === 0 && (
          <div className="text-center py-20 text-gray-400 italic">
            এখনো কোনো লোগো আপলোড করা হয়নি।
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandEdit;