import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit, Save, X } from "lucide-react"; // আইকন ব্যবহারের জন্য

const IndustryAdd = () => {
  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    description: "",
    pages: "",
    growth: "",
    ceoName: "",
    ceoTitle: "",
    color: "#ffffff",
    imgBg: "#f0f0f0",
    link: "",
  });
  const [projectImg, setProjectImg] = useState(null);
  const [ceoImg, setCeoImg] = useState(null);

  // --- নতুন স্টেটসমূহ ---
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // কোন আইটেমটি এডিট হচ্ছে
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // মোডাল কন্ট্রোল

  // ১. ডাটাবেস থেকে সব কার্ড লোড করা
  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "https://api.campaignsquat.com/api/industries",
      );
      setHistory(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // ২. নতুন কার্ড অ্যাড করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    if (projectImg) data.append("projectImg", projectImg);
    if (ceoImg) data.append("ceoImg", ceoImg);

    try {
      const response = await axios.post(
        "https://api.campaignsquat.com/api/industries",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      alert("Card Added Successfully! ✅");
      fetchHistory();
      // ফর্ম ক্লিয়ার করা
      setFormData({
        title: "",
        heading: "",
        description: "",
        pages: "",
        growth: "",
        ceoName: "",
        ceoTitle: "",
        color: "#ffffff",
        imgBg: "#f0f0f0",
        link: "",
      });
    } catch (err) {
      alert("Error adding card ❌");
    } finally {
      setLoading(false);
    }
  };

  // ৩. ডিলিট ফাংশন
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await axios.delete(
          `https://api.campaignsquat.com/api/industries/${id}`,
        );
        alert("Card Deleted! 🗑️");
        fetchHistory();
      } catch (err) {
        alert("Delete failed! ❌");
      }
    }
  };

  // ৪. এডিট মোডাল ওপেন করা
  const handleEditClick = (item) => {
    setEditingItem({ ...item }); // আইটেমটি এডিট স্টেটে নেওয়া
    setIsEditModalOpen(true);
  };

  // ৫. আপডেট সাবমিট করা
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    Object.keys(editingItem).forEach((key) => {
      if (key !== "projectImg" && key !== "ceoImg") {
        data.append(key, editingItem[key]);
      }
    });

    if (projectImg) data.append("projectImg", projectImg);
    if (ceoImg) data.append("ceoImg", ceoImg);

    try {
      await axios.put(
        `https://api.campaignsquat.com/api/industries/${editingItem._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      alert("Card Updated Successfully! ✅");
      setIsEditModalOpen(false);
      setEditingItem(null);
      fetchHistory();
    } catch (err) {
      alert("Update failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "border border-gray-400 p-3 rounded-md focus:ring-2 focus:ring-[#F7A400] outline-none transition-all text-black placeholder:text-gray-700 font-medium";

  return (
    <div className="w-full min-h-screen bg-white font-poppins text-black">
      <div className="p-4 md:p-8">
        {/* --- আপনার দেওয়া অরিজিনাল ফর্ম (Add Section) --- */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-lg border border-gray-300 shadow-sm p-6 md:p-10"
        >
          <div className="flex items-center justify-between mb-8 border-b border-gray-300 pb-4">
            <h2 className="text-3xl font-bold text-black ">
              Add New Work Card
            </h2>
            <p className="text-sm text-black font-medium italic">
              Fill all details to create a new industry card
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-black tracking-wider">
                Project Title
              </label>
              <input
                className={inputStyle}
                value={formData.title}
                placeholder="Enter title..."
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-black  tracking-wider">
                Main Heading
              </label>
              <input
                className={inputStyle}
                value={formData.heading}
                placeholder="Enter heading..."
                onChange={(e) =>
                  setFormData({ ...formData, heading: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
              <label className="text-[12px] font-bold text-black tracking-wider">
                Project Description
              </label>
              <textarea
                rows="4"
                className={inputStyle}
                value={formData.description}
                placeholder="Write a short description..."
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-black  tracking-wider">
                Total Pages (e.g. 40+)
              </label>
              <input
                className={inputStyle}
                value={formData.pages}
                placeholder="40+"
                onChange={(e) =>
                  setFormData({ ...formData, pages: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-black  tracking-wider">
                Growth Percentage (e.g. 36%)
              </label>
              <input
                className={inputStyle}
                value={formData.growth}
                placeholder="36%"
                onChange={(e) =>
                  setFormData({ ...formData, growth: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg border border-gray-300">
              <label className="text-[12px] font-bold text-black">
                Card Background Color
              </label>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="color"
                  className="w-16 h-10 cursor-pointer rounded border border-black"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
                <span className="font-mono text-black font-bold uppercase">
                  {formData.color}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg border border-gray-300">
              <label className="text-[12px] font-bold text-black">
                Image Box Background
              </label>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="color"
                  className="w-16 h-10 cursor-pointer rounded border border-black"
                  value={formData.imgBg}
                  onChange={(e) =>
                    setFormData({ ...formData, imgBg: e.target.value })
                  }
                />
                <span className="font-mono text-black font-bold uppercase">
                  {formData.imgBg}
                </span>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 border-t border-gray-300 pt-6 mt-4">
              <h3 className="text-[14px] font-bold text-black flex items-center gap-2 mb-6 uppercase tracking-tighter">
                <span className="w-3 h-8 bg-[#F7A400]"></span> Images & CEO
                Information
              </h3>
            </div>

            <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md border border-gray-200">
              <label className="text-[12px] font-bold text-black ">
                Project Main Image
              </label>
              <input
                type="file"
                onChange={(e) => setProjectImg(e.target.files[0])}
                className="block w-full text-sm text-black font-bold file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-black file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-black hover:file:text-white cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md border border-gray-200">
              <label className="text-[12px] font-bold text-black">
                CEO Profile Image
              </label>
              <input
                type="file"
                onChange={(e) => setCeoImg(e.target.files[0])}
                className="block w-full text-sm text-black font-bold file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-black file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-black hover:file:text-white cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-black ">
                CEO Name
              </label>
              <input
                className={inputStyle}
                value={formData.ceoName}
                placeholder="Enter name"
                onChange={(e) =>
                  setFormData({ ...formData, ceoName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-black ">
                CEO Title/Position
              </label>
              <input
                className={inputStyle}
                value={formData.ceoTitle}
                placeholder="Founder & CEO"
                onChange={(e) =>
                  setFormData({ ...formData, ceoTitle: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
              <label className="text-[12px] font-bold text-black">
                Behance / External Project Link
              </label>
              <input
                className={inputStyle}
                value={formData.link}
                placeholder="https://behance.net/..."
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-10 border-t border-gray-300 pt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2"
            >
              {loading ? "Saving..." : "🚀 Save New Project Card"}
            </button>
          </div>
        </form>

        {/* --- History & Table Section --- */}
        <div className="mt-16 bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden mb-20">
          <div className="p-6 bg-gray-50 border-b border-gray-300 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-black">
              📂 Project History & Management
            </h2>
            <span className="bg-black text-white px-3 py-1 text-xs font-bold rounded-full">
              Total: {history.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-white text-[14px]  tracking-widest">
                  <th className="p-4 border-r border-gray-800">
                    Project Title
                  </th>
                  <th className="p-4 border-r border-gray-800">Heading</th>
                  <th className="p-4 border-r border-gray-800 text-center">
                    Stats
                  </th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-200 hover:bg-orange-50 transition-colors group"
                    >
                      <td className="p-4 text-[12px] font-semibold text-black">
                        {item.title}
                      </td>
                      <td className="p-4 text-[12px] text-gray-700 font-medium truncate max-w-[250px]">
                        {item.heading}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col text-[10px] font-black ">
                          <span className="text-[12px] text-orange-600">
                            Pages: {item.pages}
                          </span>
                          <span className="text-[12px] text-blue-600">
                            Growth: {item.growth}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          {/* এডিট বাটন */}
                          <button
                            onClick={() => handleEditClick(item)}
                            className="p-2 bg-blue-100 text-blue-600 rounded border border-blue-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          {/* ডিলিট বাটন */}
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 bg-red-100 text-red-600 rounded border border-red-200 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-20 text-center text-gray-400 font-medium italic uppercase tracking-widest"
                    >
                      No data found in database. Add your first card!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Edit Modal (Pop-up) --- */}
        {isEditModalOpen && editingItem && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border border-gray-300 relative">
              <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center z-10">
                <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                  Update Project: {editingItem.title}
                </h2>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X size={24} className="text-black" />
                </button>
              </div>

              <form
                onSubmit={handleUpdate}
                className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Project Title
                  </label>
                  <input
                    className={inputStyle}
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Main Heading
                  </label>
                  <input
                    className={inputStyle}
                    value={editingItem.heading}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        heading: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    className={inputStyle}
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Pages
                  </label>
                  <input
                    className={inputStyle}
                    value={editingItem.pages}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, pages: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Growth
                  </label>
                  <input
                    className={inputStyle}
                    value={editingItem.growth}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, growth: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    CEO Name
                  </label>
                  <input
                    className={inputStyle}
                    value={editingItem.ceoName}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        ceoName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    CEO Title
                  </label>
                  <input
                    className={inputStyle}
                    value={editingItem.ceoTitle}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        ceoTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-1 md:col-span-2 flex flex-col gap-4 bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <p className="text-sm font-bold text-orange-800 uppercase italic">
                    Optional: Select new images to replace old ones
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="file"
                      onChange={(e) => setProjectImg(e.target.files[0])}
                      className="text-sm"
                    />
                    <input
                      type="file"
                      onChange={(e) => setCeoImg(e.target.files[0])}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 pt-6 flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-black text-[#F7A400] font-black py-4 rounded shadow-lg uppercase tracking-widest hover:bg-[#F7A400] hover:text-black transition-all"
                  >
                    {loading ? "Updating..." : "Confirm Update"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingItem(null);
                    }}
                    className="flex-1 bg-gray-200 text-black font-black py-4 rounded uppercase tracking-widest hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustryAdd;
