import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Edit, Save, X, CheckCircle } from "lucide-react";

const PricingManager = () => {
  const [plans, setPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    category: "UI/UX Design",
    name: "",
    price: "",
    subText: "",
    isPopular: false,
  });

  const [features, setFeatures] = useState([""]); // ডাইনামিক ফিচার অ্যারে

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
      const res = await axios.get(
        "https://api.campaignsquat.com/api/pricing/all",
      );
      setPlans(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // ফিচারের ইনপুট হ্যান্ডেল করা
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
    const payload = {
      ...formData,
      features: features.filter((f) => f.trim() !== ""),
    };

    try {
      if (isEditing) {
        await axios.put(
          `https://api.campaignsquat.com/api/pricing/${currentId}`,
          payload,
        );
        alert("Plan Updated!");
      } else {
        await axios.post(
          "https://api.campaignsquat.com/api/pricing/add",
          payload,
        );
        alert("New Plan Added!");
      }
      resetForm();
      fetchPlans();
    } catch (err) {
      alert("Operation Failed!");
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
    setFeatures(plan.features || [""]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`https://api.campaignsquat.com/api/pricing/${id}`);
      fetchPlans();
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
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 flex items-center text-black gap-3">
          <div className="w-2 h-10  bg-[#F7A400] rounded-full" />
          Pricing Models Manager
        </h1>

        {/* --- Form Section --- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-[5px] shadow-sm border border-gray-100 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-[12px] font-semibold tracking-widest text-gray-900 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-4 bg-gray-50 rounded-[5px] border-none focus:ring-2 focus:ring-[#F7A400]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold  tracking-widest text-gray-900 mb-2">
                Plan Name
              </label>
              <input
                type="text"
                placeholder="e.g. Essential Pack"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-4 bg-gray-50 rounded-[5px] border-none focus:ring-2 focus:ring-[#F7A400]"
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold  tracking-widest text-gray-900 mb-2">
                Price
              </label>
              <input
                type="text"
                placeholder="e.g. $450"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full p-4 bg-gray-50 rounded-[5px] border-none focus:ring-2 focus:ring-[#F7A400]"
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold  tracking-widest text-gray-900 mb-2">
                Sub-text
              </label>
              <input
                type="text"
                placeholder="e.g. / Design Only"
                value={formData.subText}
                onChange={(e) =>
                  setFormData({ ...formData, subText: e.target.value })
                }
                className="w-full p-4 bg-gray-50 rounded-[5px] border-none focus:ring-2 focus:ring-[#F7A400]"
              />
            </div>
          </div>

          {/* ডাইনামিক ফিচার ইনপুট */}
          <div className="mb-8">
            <label className="block text-[12px] font-semibold tracking-widest text-gray-900 mb-4">
              Features (Use ':' for sub-text)
            </label>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Title: Description"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-grow p-4 bg-gray-50 rounded-[5px] border-none focus:ring-2 focus:ring-[#F7A400]"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeatureField(index)}
                    className="p-4 text-red-400 hover:bg-red-50 rounded-[5px]"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeatureField}
              className="mt-4 flex items-center gap-2 text-[#F7A400] font-bold text-sm bg-[#F7A400]/5 px-6 py-3 rounded-[5px] hover:bg-[#F7A400]/10"
            >
              <Plus size={18} /> Add Feature Line
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <input
              type="checkbox"
              id="popular"
              checked={formData.isPopular}
              onChange={(e) =>
                setFormData({ ...formData, isPopular: e.target.checked })
              }
              className="w-5 h-5 accent-[#F7A400]"
            />
            <label
              htmlFor="popular"
              className="font-bold text-sm cursor-pointer text-gray-600"
            >
              Mark as Popular Plan
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-grow bg-[#F7A400] text-black font-black py-4 rounded-[5px] flex items-center justify-center gap-2 hover:shadow-xl transition-all"
            >
              {isEditing ? (
                <>
                  <Save size={20} /> Update Plan
                </>
              ) : (
                <>
                  <Plus size={20} /> Create Strategic Plan
                </>
              )}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-8 bg-gray-100 text-gray-500 font-bold rounded-[5px] hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* --- List Section --- */}
        <div className="grid grid-cols-1 gap-4">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white p-6 rounded-[5px] border border-gray-100 flex items-center justify-between group hover:border-[#F7A400]/30 transition-all"
            >
              <div className="flex items-center gap-6">
                <div
                  className={`w-12 h-12 rounded-[5px] flex items-center justify-center font-black ${plan.isPopular ? "bg-[#F7A400] text-black" : "bg-gray-100 text-gray-400"}`}
                >
                  {plan.price[0]}
                </div>
                <div>
                  <h4 className="font-black text-lg">
                    {plan.name}{" "}
                    <span className="text-xs text-gray-300 font-normal ml-2 tracking-widest uppercase">
                      {plan.category}
                    </span>
                  </h4>
                  <p className="text-sm text-gray-400">
                    {plan.price} {plan.subText}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(plan)}
                  className="p-3 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingManager;
