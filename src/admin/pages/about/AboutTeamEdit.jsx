import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPlus } from "react-icons/fa"; // আইকন ব্যবহারের জন্য

const AboutTeamEdit = () => {
  const [formData, setFormData] = useState({
    badgeText: "",
    mainTitle: "",
    highlightTitle: "",
    ceoName: "",
    ceoDesignation: "",
    experienceType: "",
    ceoMessage: "",
    closingTitle: "",
    closingSub: "",
    image: "",
    recognitionItems: [], // ✅ আপনার স্ক্রিনশটের সেই ডাইনামিক আইটেম লিস্ট
  });

  useEffect(() => {
    axios.get("https://api.campaignsquat.com/api/about-team").then((res) => {
      if (res.data) setFormData(res.data);
    });
  }, []);

  // --- ইমেজ আপলোড হ্যান্ডলার ---
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await axios.post(
        "https://api.campaignsquat.com/api/upload",
        fd,
      );
      setFormData({ ...formData, image: res.data.url });
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  // --- ডাইনামিক আইটেম ম্যানেজমেন্ট (Clutch, etc.) ---
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.recognitionItems];
    newItems[index][field] = value;
    setFormData({ ...formData, recognitionItems: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      recognitionItems: [
        ...formData.recognitionItems,
        { platformName: "", description: "" },
      ],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.recognitionItems.filter((_, i) => i !== index);
    setFormData({ ...formData, recognitionItems: newItems });
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        "https://api.campaignsquat.com/api/about-team/update",
        formData,
      );
      alert("Everything Updated Successfully! 🚀");
    } catch (err) {
      alert("Update failed!");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-poppins text-black">
      <h2 className="text-2xl font-black mb-6 border-b-4 border-[#2E7D32] pb-2 inline-block uppercase">
        CEO Message & Recognition Control
      </h2>

      <div className="bg-white p-8 rounded shadow-md flex flex-col gap-8">
        {/* --- CEO SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-bold">CEO Profile Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="p-2 border"
            />
            {formData.image && (
              <img
                src={`https://api.campaignsquat.com${formData.image}`}
                className="w-24 h-28 object-cover mt-2 rounded border"
                alt="CEO"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">CEO Name</label>
            <input
              className="p-3 border rounded"
              value={formData.ceoName}
              onChange={(e) =>
                setFormData({ ...formData, ceoName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Experience Type (On Image)</label>
            <input
              className="p-3 border rounded"
              value={formData.experienceType}
              onChange={(e) =>
                setFormData({ ...formData, experienceType: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Heading Title (Black)</label>
            <input
              className="p-3 border rounded"
              value={formData.mainTitle}
              onChange={(e) =>
                setFormData({ ...formData, mainTitle: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Heading Highlight (Orange)</label>
            <input
              className="p-3 border rounded text-[#F7A400]"
              value={formData.highlightTitle}
              onChange={(e) =>
                setFormData({ ...formData, highlightTitle: e.target.value })
              }
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="font-bold">Main CEO Message</label>
            <textarea
              className="p-3 border rounded h-32"
              value={formData.ceoMessage}
              onChange={(e) =>
                setFormData({ ...formData, ceoMessage: e.target.value })
              }
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* --- RECOGNITION ITEMS (স্ক্রিনশট অনুযায়ী) --- */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#F7A400]">
              Recognition Items (H3 & P)
            </h3>
            <button
              onClick={addItem}
              className="flex items-center gap-2 bg-[#2E7D32] text-white px-4 py-2 rounded font-bold hover:bg-black transition-all"
            >
              <FaPlus /> Add New Item
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {formData.recognitionItems.map((item, index) => (
              <div
                key={index}
                className="relative bg-gray-50 p-6 rounded border border-gray-200 flex flex-col md:flex-row gap-4"
              >
                <button
                  onClick={() => removeItem(index)}
                  className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-black transition-all"
                >
                  <FaTrash size={12} />
                </button>

                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400">
                    Platform Name (H3)
                  </label>
                  <input
                    className="p-3 border rounded font-bold"
                    placeholder="e.g. Clutch"
                    value={item.platformName}
                    onChange={(e) =>
                      handleItemChange(index, "platformName", e.target.value)
                    }
                  />
                </div>

                <div className="flex-[2] flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400">
                    Description (P)
                  </label>
                  <input
                    className="p-3 border rounded"
                    placeholder="e.g. Top B2B Service Provider"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="bg-[#2E7D32] text-white font-black py-4 rounded text-xl uppercase hover:bg-black transition-all shadow-xl"
        >
          Save All Changes 🚀
        </button>
      </div>
    </div>
  );
};

export default AboutTeamEdit;
