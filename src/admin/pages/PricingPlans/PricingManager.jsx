import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import { Plus, Trash2, Edit, Save, X, Tag } from "lucide-react";
import toast from "react-hot-toast";

const PricingManager = () => {
  const [plans, setPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: "UI/UX Design",
    name: "",
    price: "",
    subText: "",
    isPopular: false,
  });

  const [features, setFeatures] = useState([""]); // Dynamic array

  const categories = [
    "UI/UX Design",
    "Web Development",
    "Software Development",
    "Mobile App Development",
    "CMS Packages",
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(`/api/pricing/all`);
      setPlans(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load pricing plans");
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeatureField = () => setFeatures([...features, ""]);
  const removeFeatureField = (index) =>
    setFeatures(features.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      features: features.filter((f) => f.trim() !== ""),
    };

    try {
      if (isEditing) {
        await axios.put(`/api/pricing/${currentId}`, payload);
        toast.success("Plan Updated Successfully!");
      } else {
        await axios.post(`/api/pricing/add`, payload);
        toast.success("New Plan Added Successfully!");
      }
      resetForm();
      fetchPlans();
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.response?.data?.message || "Operation Failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setIsEditing(true);
    setCurrentId(plan._id);
    setFormData({
      category: plan.category,
      name: plan.name,
      price: plan.price,
      subText: plan.subText,
      isPopular: plan.isPopular,
    });
    setFeatures(plan.features && plan.features.length ? plan.features : [""]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await axios.delete(`/api/pricing/${id}`);
        fetchPlans();
        toast.success("Deleted Successfully!");
      } catch (err) {
        toast.error("Delete Failed!");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      category: "UI/UX Design",
      name: "",
      price: "",
      subText: "",
      isPopular: false,
    });
    setFeatures([""]);
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F7A400]/10 flex items-center justify-center">
              <Tag className="text-[#F7A400]" size={16} />
            </div>
            Pricing Models Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">Configure service tiers and subscription plans.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Builder */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 md:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#F7A400]" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                {isEditing ? "Edit Pricing Plan" : "Create New Plan"}
              </h2>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors bg-gray-50 px-2 py-1 rounded"
                >
                  <X size={14} /> Cancel
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-[#F7A400] text-sm text-gray-900 transition-colors shadow-sm"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Essential Pack"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-[#F7A400] text-sm text-gray-900 transition-colors shadow-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $450"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-[#F7A400] text-sm text-gray-900 transition-colors shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                    Sub-text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. / Design Only"
                    value={formData.subText}
                    onChange={(e) => setFormData({ ...formData, subText: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-[#F7A400] text-sm text-gray-900 transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  Features (Title: Description)
                </label>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Concept: Basic UI Draft"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-grow p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-[#F7A400] text-sm text-gray-900 transition-colors shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeatureField(index)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addFeatureField}
                  className="mt-3 flex items-center justify-center w-full gap-2 text-gray-600 font-medium text-xs bg-gray-50 border border-gray-200 border-dashed py-2 rounded-lg hover:bg-[#F7A400]/5 hover:text-[#F7A400] hover:border-[#F7A400]/50 transition-colors"
                >
                  <Plus size={14} /> Add Feature Field
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="w-4 h-4 text-[#F7A400] bg-gray-100 border-gray-300 rounded focus:ring-[#F7A400] focus:ring-1 cursor-pointer accent-[#F7A400]"
                />
                <label htmlFor="popular" className="font-semibold text-sm cursor-pointer text-gray-700">
                  Highlight as Popular Plan
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F7A400] text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm shadow-md shadow-[#F7A400]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : isEditing ? (
                    <><Save size={16} /> Save Changes</>
                  ) : (
                    <><Plus size={16} /> Add Pricing Plan</>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Plans List */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 md:p-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Active Plans Registry</h2>
            
            {plans.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">No pricing plans found. Create one to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {plans.map((plan) => (
                  <div
                    key={plan._id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between group transition-all duration-200 ${plan.isPopular ? "border-[#F7A400]/50 bg-[#F7A400]/5 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm border ${plan.isPopular ? "bg-[#F7A400] text-black border-[#F7A400]/20" : "bg-gray-50 text-gray-500 border-gray-100"}`}>
                        {plan.price[0] === '$' || plan.price[0] === '৳' ? plan.price[0] : '$'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 text-base">{plan.name}</h4>
                          {plan.isPopular && (
                            <span className="bg-[#F7A400] text-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold shadow-sm">Popular</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded font-medium uppercase tracking-wider">
                            {plan.category}
                          </span>
                          <p className="text-sm text-gray-800 font-bold ml-1">
                            {plan.price} <span className="text-gray-400 font-medium text-xs">{plan.subText}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 sm:mt-0 justify-end">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="p-2 text-gray-400 bg-white border border-gray-200 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded-lg transition-colors shadow-sm"
                        title="Edit Plan"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(plan._id)}
                        className="p-2 text-gray-400 bg-white border border-gray-200 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-lg transition-colors shadow-sm"
                        title="Delete Plan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PricingManager;

