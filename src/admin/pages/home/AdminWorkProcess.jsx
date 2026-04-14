import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminWorkProcess = () => {
  const [steps, setSteps] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: 0,
    image: null,
  });

  const fetchSteps = async () => {
    try {
      const res = await axios.get(
        "https://api.campaignsquat.com/api/work-process",
      );
      setSteps(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("order", formData.order);
    if (formData.image) data.append("image", formData.image);

    try {
      if (isEditing) {
        await axios.put(
          `https://api.campaignsquat.com/api/work-process/${editId}`,
          data,
        );
        alert("Updated Successfully! ✅");
      } else {
        await axios.post(
          "https://api.campaignsquat.com/api/work-process",
          data,
        );
        alert("Added Successfully! ✅");
      }
      resetForm();
      fetchSteps();
    } catch (err) {
      alert("Error saving data!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(
          `https://api.campaignsquat.com/api/work-process/${id}`,
        );
        fetchSteps();
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  const handleEdit = (step) => {
    setIsEditing(true);
    setEditId(step._id);
    setFormData({
      title: step.title,
      description: step.description,
      order: step.order,
      image: null,
    });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ title: "", description: "", order: 0, image: null });
  };

  return (
    <div className="min-h-screen bg-white text-black font-poppins p-6 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Work Process Management
          </h1>
          <p className="text-[12px] text-black mt-1">
            Manage your agency's working steps and methodology.
          </p>
        </div>
        <div className="text-right">
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[12px] font-bold  tracking-wider">
            Live Section
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Form Section */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 p-6 rounded-[5px] border border-gray-100 shadow-sm sticky top-10">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              {isEditing ? "📝 Edit Process Step" : "✨ Add New Step"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[12px] font-semibold mb-2 text-black">
                  Step Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Discovery"
                  className="w-full bg-white border border-gray-200 p-3 rounded-[5px] focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-2 text-black">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the process..."
                  className="w-full bg-white border border-gray-200 p-3 rounded-[5px] focus:ring-2 focus:ring-orange-500 outline-none h-32 transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold mb-2 text-black">
                    Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 p-3 rounded-[5px] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-2 text-black">
                    Icon/Image
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="text-[10px] text-black file:mr-5 file:py-4 file:px-4 file:rounded-[5px] file:border-0 file:text-xs file:font-bold file:bg-gray-200 file:text-black hover:file:bg-orange-500 hover:file:text-white cursor-pointer w-full mt-2 "
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2"
                >
                  {isEditing ? "Update Changes" : "Save Step"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 text-gray-700 px-6 rounded-[5px] font-bold text-xs  hover:bg-red-100 hover:text-red-600 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: History Section */}
        <div className="lg:col-span-7">
          <h2 className="text-lg font-bold mb-6">Process History & Sorting</h2>
          <div className="space-y-4">
            {steps.length > 0 ? (
              steps.map((step) => (
                <div
                  key={step._id}
                  className="flex items-center justify-between bg-white border border-gray-100 p-5 rounded-[5px] shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-gray-900 rounded-[5px] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                      <img
                        src={`https://api.campaignsquat.com${step.image}`}
                        alt=""
                        className="w-8 h-8 object-contain brightness-0 invert"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-tighter bg-orange-50 px-2 rounded">
                          Step {step.order}
                        </span>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(step)}
                      className="p-3 bg-gray-100 text-gray-700 rounded-[5px] hover:bg-black hover:text-white transition-all shadow-sm"
                    >
                      ⚙️
                    </button>
                    <button
                      onClick={() => handleDelete(step._id)}
                      className="p-3 bg-red-50 text-red-500 rounded-[5px] hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[5px]">
                <p className="text-gray-400 italic">
                  No history found. Create your first process step!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkProcess;
