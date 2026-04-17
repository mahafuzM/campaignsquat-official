import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Trash2,
  Edit3,
  Type,
  Heading as HeadingIcon,
  List as ListIcon,
  Info,
  Stars,
  Plus,
  X,
  Layout,
  CheckCircle2,
} from "lucide-react";

// ✅ Global Axios Setup (এটি সাধারণত App.jsx এ থাকে, তবে এখানেও কাজ করবে)


const AdminProject = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    category: "Website Development",
    description: "",
    clientName: "",
    year: "2026",
    projectUrl: "",
  });

  const [sections, setSections] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const categories = [
    "Website Development",
    "Ecommerce Development",
    "UI/UX Design",
    "Software Development",
    "Mobile App Development",
  ];

  // ✅ API URL এখন ডাইনামিক (Global baseURL ব্যবহার করবে)
  const API_URL = "/api/projects";

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = Array.isArray(res.data) ? res.data : (Array.isArray(res.data?.data) ? res.data.data : []);
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- Builder Logic ---
  const addSection = (type) => {
    let newSection;
    if (type === "list") {
      newSection = { type, title: "", items: [""] };
    } else if (type === "featureList") {
      newSection = { type, mainTitle: "", items: [{ subTitle: "", desc: "" }] };
    } else if (type === "heading") {
      newSection = { type, value: "", subtitle: "" };
    } else if (type === "solution") {
      newSection = { type, title: "", value: "" };
    } else {
      newSection = { type, value: "" };
    }
    setSections([...sections, newSection]);
  };

  const updateSection = (index, field, val) => {
    const updated = [...sections];
    updated[index][field] = val;
    setSections(updated);
  };

  const updateListItem = (sIdx, lIdx, val) => {
    const updated = [...sections];
    updated[sIdx].items[lIdx] = val;
    setSections(updated);
  };

  const addListItem = (sIdx) => {
    const updated = [...sections];
    updated[sIdx].items.push("");
    setSections(updated);
  };

  const updateFeatureItem = (sIdx, fIdx, field, val) => {
    const updated = [...sections];
    updated[sIdx].items[fIdx][field] = val;
    setSections(updated);
  };

  const addFeatureItem = (sIdx) => {
    const updated = [...sections];
    updated[sIdx].items.push({ subTitle: "", desc: "" });
    setSections(updated);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  // --- Core Form Logic ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      setFormData((prev) => ({
        ...prev,
        title: value,
        fullName: slug,
      }));
    } else if (name === "year") {
      const cleanYear = value.replace(/\D/g, "").slice(0, 4);
      setFormData((prev) => ({
        ...prev,
        year: cleanYear,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append("sections", JSON.stringify(sections));

      if (image) {
        data.append("imageUrl", image);
      }

      if (editId) {
        const response = await axios.put(`${API_URL}/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.success) alert("Project updated successfully!");
      } else {
        const response = await axios.post(API_URL, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.success) alert("Project added successfully!");
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Operation failed!";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProjects();
        alert("Deleted successfully");
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setFormData({
      title: project.title || "",
      fullName: project.fullName || "",
      category: project.category || "Website Development",
      description: project.description || "",
      clientName: project.clientName || "",
      year: project.year ? project.year.toString() : "2026",
      projectUrl: project.projectUrl || "",
    });

    // ✅ ইমেজ প্রিভিউ এখন ডাইনামিক বেস ইউআরএল থেকে আসবে
    if (project.imageUrl) {
      setImagePreview(`${axios.defaults.baseURL}/uploads/${project.imageUrl}`);
    } else {
      setImagePreview(null);
    }

    try {
      let loadedSections = [];
      if (project.sections) {
        loadedSections =
          typeof project.sections === "string"
            ? JSON.parse(project.sections)
            : project.sections;
      }
      setSections(Array.isArray(loadedSections) ? loadedSections : []);
    } catch (e) {
      console.error("Error parsing sections during edit:", e);
      setSections([]);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      fullName: "",
      category: "Website Development",
      description: "",
      clientName: "",
      year: "2026",
      projectUrl: "",
    });
    setSections([]);
    setImage(null);
    setImagePreview(null);
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-10 font-['Poppins']">
      <div className="max-w-[1600px] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col xl:flex-row gap-8"
        >
          {/* LEFT: CORE DETAILS */}
          <div className="w-full xl:w-[450px]">
            <div className="bg-white border border-gray-200 p-6 rounded-xl sticky top-6 shadow-xl">
              <h2 className="text-black text-xl font-bold mb-6 flex items-center gap-2 italic">
                {editId ? (
                  <Edit3 size={20} className="text-[#F7A400]" />
                ) : (
                  <Plus size={20} className="text-[#F7A400]" />
                )}
                {editId ? "Update Project" : "Add New Project"}
              </h2>

              <div className="space-y-4">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Project Title"
                  required
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-black outline-none focus:border-[#F7A400] font-medium"
                />
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name (Slug)"
                  required
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-black outline-none focus:border-[#F7A400] text-sm italic"
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-200 p-3 rounded text-black outline-none text-sm cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Year"
                    className="bg-gray-50 border border-gray-200 p-3 rounded text-black outline-none"
                  />
                </div>

                <input
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Client Name"
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-black outline-none focus:border-[#F7A400]"
                />

                <div className="border border-dashed border-gray-300 p-4 rounded bg-gray-50">
                  <p className="text-[10px] text-gray-500 uppercase mb-2 font-bold">
                    Project Thumbnail
                  </p>
                  {imagePreview && (
                    <div className="mb-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded border border-gray-200 shadow-sm"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="text-xs text-black w-full cursor-pointer file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-black file:text-[#F7A400]"
                  />
                </div>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Card Description (Short)"
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-black outline-none h-24 resize-none focus:border-[#F7A400]"
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-black text-white font-black rounded hover:bg-[#F7A400] hover:text-black transition-all tracking-wider shadow-lg uppercase"
                >
                  {loading
                    ? "Processing..."
                    : editId
                      ? "Update Project"
                      : "Save Full Project"}
                </button>

                {editId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full py-2 text-red-600 font-bold text-sm underline"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: CASE STUDY BUILDER */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-xl min-h-[600px] flex flex-col">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                <div>
                  <h3 className="text-black text-[20px] font-bold flex items-center gap-2">
                    <Layout className="text-[#F7A400]" /> Case Study Content
                    Builder
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Add dynamic sections for the project details page
                  </p>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                {sections.length > 0 ? (
                  sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="relative group border border-transparent hover:border-gray-100 rounded-lg p-1"
                    >
                      <button
                        type="button"
                        onClick={() => removeSection(idx)}
                        className="absolute -top-3 -right-3 bg-red-600 text-white p-1 rounded-full border-2 border-white z-10 opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>

                      {section.type === "featureList" ? (
                        <div className="bg-gray-50 p-6 rounded-lg border-l-8 border-[#F7A400] shadow-md text-black">
                          <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
                            <Stars size={24} className="text-[#F7A400]" />
                            <input
                              value={section.mainTitle}
                              onChange={(e) =>
                                updateSection(idx, "mainTitle", e.target.value)
                              }
                              placeholder="KEY FEATURES (Main Title)"
                              className="w-full bg-transparent text-xl font-black outline-none uppercase tracking-tighter"
                            />
                          </div>
                          <div className="space-y-6">
                            {section.items.map((feature, fIdx) => (
                              <div
                                key={fIdx}
                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                              >
                                <input
                                  value={feature.subTitle}
                                  onChange={(e) =>
                                    updateFeatureItem(
                                      idx,
                                      fIdx,
                                      "subTitle",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Feature Name"
                                  className="w-full font-bold text-black outline-none border-b border-gray-100 focus:border-[#F7A400] mb-2"
                                />
                                <textarea
                                  value={feature.desc}
                                  onChange={(e) =>
                                    updateFeatureItem(
                                      idx,
                                      fIdx,
                                      "desc",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Feature Description"
                                  className="w-full text-sm text-gray-600 outline-none h-16 resize-none"
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addFeatureItem(idx)}
                              className="w-full py-2 border-2 border-dashed border-gray-300 rounded text-gray-400 font-bold text-xs uppercase"
                            >
                              + Add Another Point
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-gray-100 p-6 rounded-lg">
                          {section.type === "heading" && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <HeadingIcon
                                  size={20}
                                  className="text-[#F7A400]"
                                />
                                <input
                                  value={section.value}
                                  onChange={(e) =>
                                    updateSection(idx, "value", e.target.value)
                                  }
                                  placeholder="SECTION HEADING"
                                  className="w-full bg-transparent text-xl font-bold text-black outline-none uppercase"
                                />
                              </div>
                              <input
                                value={section.subtitle}
                                onChange={(e) =>
                                  updateSection(idx, "subtitle", e.target.value)
                                }
                                placeholder="Subtitle (optional)..."
                                className="w-full bg-transparent text-sm italic text-gray-500 outline-none pl-8 border-l-2 border-gray-200"
                              />
                            </div>
                          )}
                          {section.type === "text" && (
                            <textarea
                              value={section.value}
                              onChange={(e) =>
                                updateSection(idx, "value", e.target.value)
                              }
                              placeholder="Enter descriptive content..."
                              className="w-full bg-transparent outline-none text-black h-24 resize-none"
                            />
                          )}
                          {section.type === "list" && (
                            <div className="space-y-4">
                              <input
                                value={section.title}
                                onChange={(e) =>
                                  updateSection(idx, "title", e.target.value)
                                }
                                placeholder="LIST TITLE"
                                className="w-full bg-transparent text-black font-black outline-none border-b border-gray-200 pb-2"
                              />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {section.items.map((item, lIdx) => (
                                  <div
                                    key={lIdx}
                                    className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200 shadow-sm"
                                  >
                                    <span className="text-[#F7A400] text-xs">
                                      ●
                                    </span>
                                    <input
                                      value={item}
                                      onChange={(e) =>
                                        updateListItem(
                                          idx,
                                          lIdx,
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Point..."
                                      className="w-full bg-transparent outline-none text-sm text-black"
                                    />
                                  </div>
                                ))}
                              </div>
                              <button
                                type="button"
                                onClick={() => addListItem(idx)}
                                className="text-[10px] font-bold uppercase text-black hover:underline"
                              >
                                + Add Point
                              </button>
                            </div>
                          )}
                          {section.type === "info" && (
                            <div className="flex items-center gap-4 bg-blue-50 p-3 rounded border border-blue-100">
                              <Info className="text-blue-600" />
                              <input
                                value={section.value}
                                onChange={(e) =>
                                  updateSection(idx, "value", e.target.value)
                                }
                                placeholder="Important Info..."
                                className="w-full bg-transparent font-medium text-blue-900 outline-none"
                              />
                            </div>
                          )}
                          {section.type === "solution" && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <CheckCircle2
                                  size={20}
                                  className="text-green-600"
                                />
                                <input
                                  value={section.title}
                                  onChange={(e) =>
                                    updateSection(idx, "title", e.target.value)
                                  }
                                  placeholder="SOLUTION TITLE"
                                  className="w-full bg-transparent text-lg font-bold text-black outline-none uppercase"
                                />
                              </div>
                              <textarea
                                value={section.value}
                                onChange={(e) =>
                                  updateSection(idx, "value", e.target.value)
                                }
                                placeholder="Describe the solution..."
                                className="w-full bg-transparent border border-gray-200 p-3 rounded text-black h-24 resize-none focus:border-green-500"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-xl">
                    <Layout size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">
                      No sections added.
                    </p>
                  </div>
                )}
              </div>

              {/* STICKY BUTTONS */}
              <div className="mt-8 pt-6 border-t border-gray-100 sticky bottom-0 bg-white pb-2 z-20">
                <p className="text-[12px] font-black text-black mb-3 ">
                  Add Case Study Blocks ↓
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => addSection("heading")}
                    className="p-2 bg-white border border-gray-200 hover:border-[#F7A400] text-black rounded transition-all flex items-center gap-2 text-xs font-bold uppercase shadow-sm"
                  >
                    <HeadingIcon size={16} /> Head
                  </button>
                  <button
                    type="button"
                    onClick={() => addSection("text")}
                    className="p-2 bg-white border border-gray-200 hover:border-[#F7A400] text-black rounded transition-all flex items-center gap-2 text-xs font-bold uppercase shadow-sm"
                  >
                    <Type size={16} /> Text
                  </button>
                  <button
                    type="button"
                    onClick={() => addSection("list")}
                    className="p-2 bg-white border border-gray-200 hover:border-[#F7A400] text-black rounded transition-all flex items-center gap-2 text-xs font-bold uppercase shadow-sm"
                  >
                    <ListIcon size={16} /> List
                  </button>
                  <button
                    type="button"
                    onClick={() => addSection("featureList")}
                    className="p-2 bg-black border border-black text-white rounded transition-all flex items-center gap-2 text-xs font-bold uppercase shadow-lg hover:bg-[#F7A400] hover:text-black"
                  >
                    <Stars size={16} /> Features
                  </button>
                  <button
                    type="button"
                    onClick={() => addSection("info")}
                    className="p-2 bg-white border border-gray-200 hover:border-[#F7A400] text-black rounded transition-all flex items-center gap-2 text-xs font-bold uppercase shadow-sm"
                  >
                    <Info size={16} /> Info
                  </button>
                  <button
                    type="button"
                    onClick={() => addSection("solution")}
                    className="p-2 bg-green-50 border border-green-200 hover:border-green-500 text-green-700 rounded transition-all flex items-center gap-2 text-xs font-bold uppercase shadow-sm"
                  >
                    <CheckCircle2 size={16} /> Solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* HISTORY TABLE */}
        <div className="mt-12 max-w-full bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-black font-black text-xl uppercase tracking-tighter italic underline decoration-[#F7A400] decoration-4">
              Manage Projects History ({projects.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-[#F7A400] uppercase text-[10px] font-black tracking-widest">
                  <th className="p-5">Visual</th>
                  <th className="p-5">Information</th>
                  <th className="p-5">Category</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="p-5">
                      {item.imageUrl && (
                        <img
                          src={`http://localhost:3000/uploads/${item.imageUrl}`}
                          alt={item.title}
                          className="w-24 h-16 object-cover rounded shadow-md border border-gray-200"
                        />
                      )}
                    </td>
                    <td className="p-5">
                      <div className="font-black text-lg uppercase tracking-tighter text-black">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-gray-500 font-bold underline italic">
                        {item.fullName}
                      </div>
                    </td>
                    <td className="p-5 italic font-bold text-gray-700">
                      {item.category}
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-white border border-gray-200 text-black rounded hover:bg-black hover:text-white transition-all shadow-md"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-red-50 text-red-600 border border-red-100 rounded hover:bg-red-600 hover:text-white transition-all shadow-md"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProject;
