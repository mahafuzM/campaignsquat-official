import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { Plus, Save, Trash2, Edit3, Image as ImageIcon, LayoutGrid, Tag, Layers, AlignLeft, Hash } from "lucide-react";

const AdminWorkProcess = () => {
  const [steps, setSteps] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: 0,
    image: null,
  });

  const fetchSteps = async () => {
    try {
      const res = await axios.get("/api/work-process");
      setSteps(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load work processes.");
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
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("order", formData.order);
    if (formData.image) data.append("image", formData.image);

    try {
      if (isEditing) {
        await axios.put(`/api/work-process/${editId}`, data);
        toast.success("Process step updated successfully!");
      } else {
        await axios.post("/api/work-process", data);
        toast.success("New step added successfully!");
      }
      resetForm();
      fetchSteps();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving process step.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-sm font-medium text-gray-900 mb-3">
            Are you sure you want to delete this step?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await axios.delete(`/api/work-process/${id}`);
                  toast.success("Step deleted successfully!");
                  fetchSteps();
                } catch (err) {
                  toast.error("Failed to delete step.");
                }
              }}
              className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  };

  const handleEdit = (step) => {
    setIsEditing(true);
    setEditId(step._id);
    setFormData({
      title: step.title,
      description: step.description,
      order: step.order,
      image: null, // Don't prepopulate file
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ title: "", description: "", order: 0, image: null });
    // Reset file input if exists by id
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3">
            Work Process Management
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Define and manage your agency's working steps and methodology.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Form Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm sticky top-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
              <LayoutGrid className="w-5 h-5 text-[#F7A400]" />
              <h2 className="text-lg font-semibold text-gray-900">
                {isEditing ? "Edit Process Step" : "Add New Step"}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag className="w-4 h-4 text-gray-400" />
                  Step Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Discovery & Strategy"
                  className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] block p-2.5 transition-all outline-none"
                  required
                />
              </div>

              {/* Description Input */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <AlignLeft className="w-4 h-4 text-gray-400" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Elaborate on what happens in this step..."
                  rows={4}
                  className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] block p-2.5 transition-all outline-none resize-none"
                  required
                />
              </div>

              {/* Order and Image Upload in Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Hash className="w-4 h-4 text-gray-400" />
                    Order #
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    placeholder="1"
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] block p-2.5 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                    Icon/Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full px-4 py-2 border border-gray-200 bg-gray-50/50 text-gray-600 text-sm rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <span className="truncate max-w-[100px]">
                        {formData.image ? formData.image.name : "Choose File"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3 border-t border-gray-50">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#F7A400] text-white hover:bg-[#d98f00] font-medium py-2.5 px-4 rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Step
                    </>
                  )}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: History Section */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F7A400]" />
                Process Summary
              </h2>
              <span className="bg-[#F7A400]/10 text-[#F7A400] text-xs px-3 py-1 rounded-full font-medium">
                Total Steps: {steps.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              {steps.length > 0 ? (
                <table className="w-full text-sm text-left align-middle">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50/30 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-medium w-16 text-center">No.</th>
                      <th className="px-6 py-4 font-medium w-24">Icon</th>
                      <th className="px-6 py-4 font-medium">Title & Description</th>
                      <th className="px-6 py-4 font-medium text-right w-28">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {/* Sort steps by order before rendering */}
                    {[...steps]
                      .sort((a, b) => a.order - b.order)
                      .map((step) => (
                      <tr
                        key={step._id}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-bold font-mono">
                            {step.order}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 rounded bg-black flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
                            <img
                              src={`${axios.defaults.baseURL}${step.image}`}
                              alt={step.title}
                              className="w-6 h-6 object-contain invert brightness-0"
                              onError={(e) => {
                                e.target.onerror = null;
                                // Fallback icon styling if image breaks
                                e.target.parentElement.innerHTML = '<span class="text-white text-[10px]">Icon</span>';
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900 mb-1 line-clamp-1">
                            {step.title}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-2 max-w-md">
                            {step.description}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(step)}
                              className="p-2 text-gray-400 hover:text-[#F7A400] hover:bg-orange-50 rounded-md transition-all"
                              title="Edit Step"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(step._id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                              title="Delete Step"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    No work processes found. <br />
                    Add a new step using the form to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkProcess;