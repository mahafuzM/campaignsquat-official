import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
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
  FolderKanban,
  Save,
  Upload,
  Loader2,
  Sparkles,
  Calendar,
  User,
  Globe,
  Tag,
} from "lucide-react";

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
  const [fetching, setFetching] = useState(false);
  const [editId, setEditId] = useState(null);

  const categories = [
    "Website Development",
    "Ecommerce Development",
    "UI/UX Design",
    "Software Development",
    "Mobile App Development",
  ];

  const fetchProjects = async () => {
    setFetching(true);
    try {
      const res = await axios.get("/api/projects");
      const data = Array.isArray(res.data) ? res.data : (Array.isArray(res.data?.data) ? res.data.data : []);
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects", err);
      toast.error("Failed to load projects.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  // --- Builder Logic ---
  const addSection = (type) => {
    let newSection;
    if (type === "list") newSection = { type, title: "", items: [""] };
    else if (type === "featureList") newSection = { type, mainTitle: "", items: [{ subTitle: "", desc: "" }] };
    else if (type === "heading") newSection = { type, value: "", subtitle: "" };
    else if (type === "solution") newSection = { type, title: "", value: "" };
    else newSection = { type, value: "" };
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

  const removeSection = (index) => setSections(sections.filter((_, i) => i !== index));

  // --- Form Logic ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      const slug = value.toLowerCase().trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({ ...prev, title: value, fullName: slug }));
    } else if (name === "year") {
      setFormData((prev) => ({ ...prev, year: value.replace(/\D/g, "").slice(0, 4) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      toast.success("Image selected! ✅");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) { toast.error("Project title is required!"); return; }
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append("sections", JSON.stringify(sections));
      if (image) data.append("imageUrl", image);

      if (editId) {
        const res = await axios.put(`/api/projects/${editId}`, data);
        if (res.data.success) toast.success("Project updated! ✅");
        else toast.success("Project updated! ✅");
      } else {
        const res = await axios.post("/api/projects", data);
        if (res.data.success) toast.success("Project added! 🚀");
        else toast.success("Project added! 🚀");
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Operation failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      toast.success("Deleted successfully! 🗑️");
      fetchProjects();
    } catch (err) {
      toast.error("Delete failed.");
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
    if (project.imageUrl) {
      setImagePreview(project.imageUrl.startsWith("http")
        ? project.imageUrl
        : `/uploads/${project.imageUrl}`);
    } else {
      setImagePreview(null);
    }
    try {
      let loadedSections = [];
      if (project.sections) {
        loadedSections = typeof project.sections === "string" ? JSON.parse(project.sections) : project.sections;
      }
      setSections(Array.isArray(loadedSections) ? loadedSections : []);
    } catch (e) {
      setSections([]);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Editing mode enabled", { icon: "📝" });
  };

  const resetForm = () => {
    setFormData({ title: "", fullName: "", category: "Website Development", description: "", clientName: "", year: "2026", projectUrl: "" });
    setSections([]);
    setImage(null);
    setImagePreview(null);
    setEditId(null);
  };

  const inputClass = "w-full bg-gray-50/50 border border-gray-200 p-3 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-[#F7A400]/20 transition-all text-sm";
  const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block";

  const sectionButtons = [
    { type: "heading", icon: HeadingIcon, label: "Heading", cls: "" },
    { type: "text", icon: Type, label: "Text", cls: "" },
    { type: "list", icon: ListIcon, label: "List", cls: "" },
    { type: "featureList", icon: Stars, label: "Features", cls: "bg-[#F7A400] text-white border-[#F7A400] hover:bg-[#d98f00]" },
    { type: "info", icon: Info, label: "Info", cls: "text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100" },
    { type: "solution", icon: CheckCircle2, label: "Solution", cls: "text-green-700 bg-green-50 border-green-200 hover:bg-green-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 font-poppins pb-20">

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#F7A400]/10 p-2 rounded-md">
            <FolderKanban className="text-[#F7A400]" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Project Manager</h1>
            <p className="text-xs text-gray-400">{editId ? `Editing: ${formData.title}` : "Add a new case study or portfolio project"}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {editId && (
            <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-md font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-600">
              <X size={16} /> Cancel
            </button>
          )}
          <button
            type="submit"
            form="project-form"
            disabled={loading}
            className="flex items-center gap-2 bg-[#F7A400] text-white px-7 py-2.5 rounded-md font-bold text-sm hover:bg-[#d98f00] transition-all shadow-sm disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? "Processing..." : editId ? "Update Project" : "Save Project"}
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 pt-8">
        <form id="project-form" onSubmit={handleSubmit}>
          <div className="flex flex-col xl:flex-row gap-8">

            {/* Left: Core Details */}
            <aside className="w-full xl:w-[340px] shrink-0 space-y-6">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pb-3 border-b border-gray-100 mb-6">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Project Title</label>
                    <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Project Title" required className={inputClass} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1.5 block">Slug (Auto-generated)</label>
                    <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="project-slug" className="w-full bg-blue-50/30 border border-blue-100 p-3 rounded-md font-mono text-xs text-blue-700 font-bold outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}><Tag size={10} className="inline mr-1" />Category</label>
                      <select name="category" value={formData.category} onChange={handleInputChange} className={inputClass}>
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}><Calendar size={10} className="inline mr-1" />Year</label>
                      <input name="year" value={formData.year} onChange={handleInputChange} placeholder="2026" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}><User size={10} className="inline mr-1" />Client Name</label>
                    <input name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Client Name" className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}><Globe size={10} className="inline mr-1" />Project URL</label>
                    <input name="projectUrl" value={formData.projectUrl} onChange={handleInputChange} placeholder="https://example.com" className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Short Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Brief project description..." className={`${inputClass} resize-none h-20`} />
                  </div>

                  <div>
                    <label className={labelClass}>Project Thumbnail</label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/30 hover:border-[#F7A400] transition-all cursor-pointer overflow-hidden">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-36 object-cover" />
                      ) : (
                        <div className="py-8 text-center">
                          <Upload className="mx-auto text-gray-300 mb-2" size={28} />
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Upload Thumbnail</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right: Case Study Builder */}
            <main className="flex-grow">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 min-h-[600px] flex flex-col">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Layout size={18} className="text-[#F7A400]" /> Case Study Builder
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Add dynamic sections for the project detail page</p>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-4 flex-1">
                  {sections.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-lg">
                      <Sparkles className="mx-auto text-gray-200 mb-3" size={36} strokeWidth={1} />
                      <p className="text-gray-400 text-sm">Use the buttons below to add case study blocks</p>
                    </div>
                  )}

                  {sections.map((section, idx) => (
                    <div key={idx} className="group relative bg-gray-50/50 rounded-lg border border-gray-100 hover:border-[#F7A400]/30 transition-all overflow-hidden">
                      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          section.type === "heading" ? "text-[#F7A400]" :
                          section.type === "featureList" ? "text-amber-600" :
                          section.type === "solution" ? "text-green-600" :
                          section.type === "info" ? "text-blue-600" :
                          section.type === "list" ? "text-green-600" : "text-blue-500"
                        }`}>
                          {section.type === "heading" ? "📌 Heading" :
                           section.type === "text" ? "✏️ Text Block" :
                           section.type === "list" ? "📋 Bullet List" :
                           section.type === "featureList" ? "⭐ Feature Grid" :
                           section.type === "info" ? "ℹ️ Info Block" : "✅ Solution"}
                        </span>
                        <button type="button" onClick={() => removeSection(idx)} className="p-1 text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="p-5">
                        {/* Feature List */}
                        {section.type === "featureList" && (
                          <div className="space-y-4">
                            <input value={section.mainTitle} onChange={(e) => updateSection(idx, "mainTitle", e.target.value)}
                              placeholder="KEY FEATURES (Main Title)"
                              className="w-full bg-transparent text-lg font-black outline-none border-b border-dashed border-gray-200 focus:border-[#F7A400] pb-2 uppercase tracking-tight" />
                            <div className="space-y-3">
                              {section.items.map((feature, fIdx) => (
                                <div key={fIdx} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                  <input value={feature.subTitle} onChange={(e) => updateFeatureItem(idx, fIdx, "subTitle", e.target.value)}
                                    placeholder="Feature Name" className="w-full font-bold text-gray-900 outline-none border-b border-gray-100 focus:border-[#F7A400] mb-2 bg-transparent text-sm" />
                                  <textarea value={feature.desc} onChange={(e) => updateFeatureItem(idx, fIdx, "desc", e.target.value)}
                                    placeholder="Feature Description" className="w-full text-xs text-gray-600 outline-none h-14 resize-none bg-transparent" />
                                </div>
                              ))}
                            </div>
                            <button type="button" onClick={() => addFeatureItem(idx)}
                              className="w-full py-2 border-2 border-dashed border-gray-200 rounded-md text-gray-400 font-bold text-xs uppercase hover:border-[#F7A400] hover:text-[#F7A400] transition-all">
                              + Add Feature
                            </button>
                          </div>
                        )}

                        {/* Heading */}
                        {section.type === "heading" && (
                          <div className="space-y-2">
                            <input value={section.value} onChange={(e) => updateSection(idx, "value", e.target.value)}
                              placeholder="SECTION HEADING"
                              className="w-full bg-transparent text-xl font-bold text-gray-900 outline-none uppercase focus:border-b focus:border-[#F7A400]" />
                            <input value={section.subtitle} onChange={(e) => updateSection(idx, "subtitle", e.target.value)}
                              placeholder="Subtitle (optional)..."
                              className="w-full bg-transparent text-sm italic text-gray-500 outline-none border-l-2 border-gray-200 pl-3" />
                          </div>
                        )}

                        {/* Text */}
                        {section.type === "text" && (
                          <textarea value={section.value} onChange={(e) => updateSection(idx, "value", e.target.value)}
                            placeholder="Enter descriptive content..."
                            className="w-full bg-white border border-gray-100 p-3 rounded-md outline-none text-sm text-gray-700 leading-relaxed h-24 resize-none focus:border-[#F7A400]/30" />
                        )}

                        {/* Bullet List */}
                        {section.type === "list" && (
                          <div className="space-y-3">
                            <input value={section.title} onChange={(e) => updateSection(idx, "title", e.target.value)}
                              placeholder="LIST TITLE"
                              className="w-full bg-transparent text-gray-900 font-bold outline-none border-b border-dashed border-gray-200 focus:border-[#F7A400] pb-1" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                              {section.items.map((item, lIdx) => (
                                <div key={lIdx} className="flex items-center gap-2 bg-white p-2.5 px-3 rounded-md border border-gray-100">
                                  <span className="w-1.5 h-1.5 bg-[#F7A400] rounded-full shrink-0" />
                                  <input value={item} onChange={(e) => updateListItem(idx, lIdx, e.target.value)}
                                    placeholder="Point..." className="w-full bg-transparent outline-none text-sm text-gray-700" />
                                </div>
                              ))}
                            </div>
                            <button type="button" onClick={() => addListItem(idx)} className="text-xs font-bold text-[#F7A400] hover:underline flex items-center gap-1">
                              <Plus size={11} /> Add Point
                            </button>
                          </div>
                        )}

                        {/* Info */}
                        {section.type === "info" && (
                          <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <Info className="text-blue-500 shrink-0" size={18} />
                            <input value={section.value} onChange={(e) => updateSection(idx, "value", e.target.value)}
                              placeholder="Important info note..." className="w-full bg-transparent font-medium text-blue-900 outline-none text-sm" />
                          </div>
                        )}

                        {/* Solution */}
                        {section.type === "solution" && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                              <input value={section.title} onChange={(e) => updateSection(idx, "title", e.target.value)}
                                placeholder="SOLUTION TITLE"
                                className="w-full bg-transparent text-base font-bold text-gray-900 outline-none uppercase" />
                            </div>
                            <textarea value={section.value} onChange={(e) => updateSection(idx, "value", e.target.value)}
                              placeholder="Describe the solution..."
                              className="w-full bg-white border border-gray-200 p-3 rounded-md text-gray-700 text-sm h-24 resize-none outline-none focus:border-green-300" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section Adder Toolbar */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Add Case Study Blocks</p>
                  <div className="flex flex-wrap gap-2">
                    {sectionButtons.map(({ type, icon: Icon, label, cls }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => addSection(type)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md border text-xs font-bold transition-all ${
                          cls || "bg-white border-gray-200 text-gray-600 hover:border-[#F7A400] hover:text-[#F7A400]"
                        }`}
                      >
                        <Icon size={14} /> {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </form>

        {/* Projects History Table */}
        <div className="mt-10 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Project History</h3>
              <p className="text-xs text-gray-400 mt-0.5">All published case studies</p>
            </div>
            <span className="bg-[#F7A400]/10 text-[#F7A400] border border-[#F7A400]/20 px-3 py-1 rounded-full text-xs font-bold">
              {projects.length} Projects
            </span>
          </div>

          {fetching ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="animate-spin mb-2" size={28} />
              <p className="text-xs font-medium uppercase tracking-widest">Loading projects...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Visual</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Information</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Category</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {projects.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl.startsWith("http") ? item.imageUrl : `/uploads/${item.imageUrl}`}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <FolderKanban size={20} className="text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{item.title}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">{item.fullName}</div>
                      {item.clientName && (
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                          <User size={9} /> {item.clientName}
                          {item.year && <> · <Calendar size={9} /> {item.year}</>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => handleEdit(item)} className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                          <Edit3 size={13} /> Edit
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="flex items-center gap-1.5 bg-red-50 text-red-500 px-3 py-1.5 rounded-md font-bold text-xs hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {projects.length === 0 && !fetching && (
            <div className="p-20 text-center border-t border-gray-50">
              <FolderKanban className="mx-auto text-gray-200 mb-3" size={40} strokeWidth={1} />
              <p className="text-gray-400 text-sm italic">No projects listed yet. Add your first case study!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProject;
