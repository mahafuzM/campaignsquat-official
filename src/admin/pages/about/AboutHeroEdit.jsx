import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutHeroEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // ইমেজ ফাইল এবং প্রিভিউয়ের জন্য স্টেট
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.campaignsquat.com/api/about-content/hero",
        );
        if (res.data) {
          setFormData({
            title: res.data.title || "",
            description: res.data.description || "",
            imageUrl: res.data.imageUrl || "",
          });
          // ডাটাবেসে ইমেজ থাকলে প্রিভিউ দেখানো
          if (res.data.imageUrl) {
            setImagePreview(
              `https://api.campaignsquat.com${res.data.imageUrl}`,
            );
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  // ফাইল সিলেক্ট হ্যান্ডলার
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      let finalImageUrl = formData.imageUrl;

      // ১. যদি নতুন ছবি সিলেক্ট করা থাকে তবে আপলোড হবে
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        const uploadRes = await axios.post(
          "https://api.campaignsquat.com/api/upload",
          uploadData,
        );
        finalImageUrl = uploadRes.data.url;
      }

      // ২. মেইন ডাটা আপডেট (হিস্টোরি ছাড়া)
      const res = await axios.post(
        "https://api.campaignsquat.com/api/about-content/hero/update",
        {
          title: formData.title,
          description: formData.description,
          imageUrl: finalImageUrl,
        },
      );

      if (res.data.success) {
        setStatus("✅ Content Updated Successfully!");
        setSelectedFile(null);
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("❌ Error Syncing Data!");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen text-black font-poppins w-full">
      {/* Header - Full Display */}
      <div className="flex justify-between items-center mb-8 w-full border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-bold  tracking-tighter text-black">
          About Hero Control
        </h2>
        {status && (
          <span className="text-green-600 font-bold bg-green-50 px-4 py-1 rounded-[5px]">
            {status}
          </span>
        )}
      </div>

      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: Headline & Image */}
            <div className="space-y-8">
              <div>
                <label className="block font-bold mb-2  text-[12px] text-black">
                  Main Headline
                </label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 p-5 rounded-[5px] focus:border-black outline-none h-40 text-xl font-semibold"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter main headline..."
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-[12px]  text-black">
                  Desktop Image Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-[5px] cursor-pointer file:mr-4 file:py-2 file:px-6 file:rounded-[5px] file:border-0 file:text-sm file:font-bold file:bg-black file:text-white"
                />

                {/* Image Preview Area */}
                {imagePreview && (
                  <div className="mt-6 border border-gray-200 p-2 rounded-[5px] bg-gray-50">
                    <p className="text-[10px] text-gray-400 mb-2 font-bold ">
                      Image Preview:
                    </p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-72 object-cover rounded-[5px] shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Description */}
            <div className="flex flex-col">
              <label className="block font-bold mb-2  text-[12px]  text-black">
                Full Description
              </label>
              <textarea
                className="w-full bg-gray-50 border border-gray-200 p-5 rounded-[5px] focus:border-black outline-none flex-grow min-h-[500px] leading-relaxed text-gray-800"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter detailed description..."
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? "SYNCING DATA..." : "PUSH TO LIVE SITE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutHeroEdit;
