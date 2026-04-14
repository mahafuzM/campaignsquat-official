import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutFeaturesEdit = () => {
  const [features, setFeatures] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    iconPath: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchFeatures = () => {
    axios
      .get("https://api.campaignsquat.com/api/about-features")
      .then((res) => setFeatures(res.data));
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleEditClick = (feature) => {
    setEditingId(feature._id);
    setFormData({
      title: feature.title,
      desc: feature.desc,
      iconPath: feature.iconPath,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.post(
          `https://api.campaignsquat.com/api/about-features/update/${editingId}`,
          formData,
        );
      } else {
        await axios.post(
          "https://api.campaignsquat.com/api/about-features/add",
          formData,
        );
      }
      setFormData({ title: "", desc: "", iconPath: "" });
      setEditingId(null);
      fetchFeatures();
    } catch (err) {
      alert("Action failed!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this feature?")) {
      await axios.delete(
        `https://api.campaignsquat.com/api/about-features/${id}`,
      );
      fetchFeatures();
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-poppins text-black">
      <h2 className="text-3xl text-black font-bold mb-6 border-b-4 border-[#F7A400] pb-2 inline-block ">
        {editingId ? "Edit Feature" : "Manage Features"}
      </h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t-8 border-[#F7A400]"
      >
        <div className="flex flex-col gap-2">
          <label className="font-bold">Title</label>
          <input
            className="p-3 border rounded focus:outline-[#F7A400]"
            placeholder="Enter Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Icon Path (SVG d)</label>
          <input
            className="p-3 border rounded focus:outline-[#F7A400]"
            placeholder="Paste SVG Path"
            value={formData.iconPath}
            onChange={(e) =>
              setFormData({ ...formData, iconPath: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="font-bold">Description</label>
          <textarea
            rows="3"
            className="p-3 border rounded focus:outline-[#F7A400]"
            placeholder="Enter feature description..."
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            required
          />
        </div>
        <div className="flex items-end gap-3">
          <button
            type="submit"
            className="flex-1 bg-[#F7A400] text-black font-extrabold py-3 rounded hover:bg-black hover:text-white transition-all tracking-wider"
          >
            {editingId ? "Update Feature" : "Add Feature"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: "", desc: "", iconPath: "" });
              }}
              className="bg-gray-500 text-white px-6 py-3 rounded font-bold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List Section */}
      <div className="grid grid-cols-1 gap-6">
        {features.map((f) => (
          <div
            key={f._id}
            className="bg-white p-6 md:p-8 rounded-[5px] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center border-l-[12px] border-[#F7A400] hover:shadow-md transition-shadow"
          >
            <div className="flex-1 pr-4">
              {/* Title কে বড় করা হয়েছে (text-2xl) */}
              <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-2  tracking-tight">
                {f.title}
              </h4>
              {/* Description কে বড় এবং স্পষ্ট করা হয়েছে (text-lg) */}
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                {f.desc}
              </p>
              <div className="mt-3 inline-block bg-gray-100 px-3 py-1 rounded text-[10px] text-gray-400 font-mono">
                Icon Path: {f.iconPath.substring(0, 30)}...
              </div>
            </div>

            <div className="flex gap-4 mt-6 md:mt-0 w-full md:w-auto">
              <button
                onClick={() => handleEditClick(f)}
                className="flex-1 md:flex-none px-8 py-3 bg-blue-50 text-blue-600 font-black border-2 border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all text-lg"
              >
                EDIT
              </button>
              <button
                onClick={() => handleDelete(f._id)}
                className="flex-1 md:flex-none px-8 py-3 bg-red-50 text-red-600 font-black border-2 border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all text-lg"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutFeaturesEdit;
