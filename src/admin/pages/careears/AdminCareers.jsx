import React, { useState, useEffect, useCallback } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import {
  Plus,
  Trash2,
  Briefcase,
  Save,
  Edit3,
  Layout,
  Type,
  List,
  Heading as HeadingIcon,
  Code,
  Terminal,
  Layers,
  Globe,
  MapPin,
  Clock,
  ShieldCheck,
  Cpu,
  Laptop,
  Search,
  Database,
  Smartphone,
  Info,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";

const iconMap = {
  Code,
  Terminal,
  Layers,
  Globe,
  Briefcase,
  ShieldCheck,
  Cpu,
  Database,
  Smartphone,
  Laptop,
  Search,
  Info,
};

const AdminCareers = () => {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("On-site");
  const [jobType, setJobType] = useState("Full Time");
  const [salary, setSalary] = useState("Negotiable");
  const [shift, setShift] = useState("Day Shift");
  const [iconName, setIconName] = useState("Code");

  const [sections, setSections] = useState([
    { type: "heading", value: "Key Responsibilities" },
    { type: "list", items: [""] },
  ]);

  const fetchJobs = useCallback(async () => {
    setFetching(true);
    try {
      const res = await axios.get("/api/jobs");
      if (Array.isArray(res.data)) setJobs(res.data);
      else if (res.data && Array.isArray(res.data.data)) setJobs(res.data.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      toast.error("Failed to load job listings.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const addSection = (type) => {
    let newSection;
    if (type === "requirements") {
      newSection = { type, value: "Core Requirements", items: [{ label: "", desc: "" }] };
    } else if (type === "list") {
      newSection = { type, value: "", items: [""] };
    } else {
      newSection = { type, value: "" };
    }
    setSections([...sections, newSection]);
  };

  const updateSection = (index, val) => {
    const s = [...sections];
    s[index].value = val;
    setSections(s);
  };

  const updateListItem = (sIdx, lIdx, val) => {
    const s = [...sections];
    s[sIdx].items[lIdx] = val;
    setSections(s);
  };

  const updateRequirementItem = (sIdx, lIdx, field, val) => {
    const s = [...sections];
    const items = [...s[sIdx].items];
    items[lIdx] = { ...items[lIdx], [field]: val };
    s[sIdx] = { ...s[sIdx], items };
    setSections(s);
  };

  const addListItem = (index) => {
    const s = [...sections];
    if (s[index].type === "requirements") s[index].items.push({ label: "", desc: "" });
    else s[index].items.push("");
    setSections(s);
  };

  const removeListItem = (sIdx, lIdx) => {
    const s = [...sections];
    if (s[sIdx].items.length > 1) {
      s[sIdx].items.splice(lIdx, 1);
      setSections(s);
    }
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
    toast("Section removed", { icon: "🗑️" });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) { toast.error("Position title is required!"); return; }
    setLoading(true);

    const preparedSections = sections.map((sec) => {
      const base = { type: sec.type, value: sec.value || "" };
      if (sec.type === "requirements") {
        return {
          ...base,
          requirementItems: (sec.items || []).map((it) => ({
            label: typeof it === "object" ? it.label || "" : "",
            desc: typeof it === "object" ? it.desc || "" : "",
          })),
          items: [],
        };
      }
      return { ...base, items: Array.isArray(sec.items) ? sec.items : [] };
    });

    const payload = { title: title.trim(), location, jobType, salary, shift, iconName, sections: preparedSections };

    try {
      if (editingId) {
        await axios.put(`/api/jobs/${editingId}`, payload);
      } else {
        await axios.post("/api/jobs", payload);
      }
      toast.success(editingId ? "Job Updated! ✅" : "Job Published! 🚀");
      resetForm();
      fetchJobs();
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error(err.response?.data?.message || "Action failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job posting?")) return;
    try {
      await axios.delete(`/api/jobs/${id}`);
      toast.success("Job deleted! 🗑️");
      fetchJobs();
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Delete failed.");
    }
  };

  const handleEdit = (job) => {
    if (!job) return;
    setEditingId(job._id);
    setTitle(job.title || "");
    setLocation(job.location || "On-site");
    setJobType(job.jobType || "Full Time");
    setSalary(job.salary || "Negotiable");
    setShift(job.shift || "Day Shift");
    setIconName(job.iconName || job.icon || "Code");
    const restoredSections = (job.sections || []).map((sec) => {
      if (sec.type === "requirements") {
        return { ...sec, items: (sec.requirementItems || []).map((ri) => ({ label: ri.label || "", desc: ri.desc || "" })) };
      }
      return sec;
    });
    setSections(restoredSections);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Editing mode enabled", { icon: "📝" });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setLocation("On-site");
    setJobType("Full Time");
    setSalary("Negotiable");
    setShift("Day Shift");
    setIconName("Code");
    setSections([
      { type: "heading", value: "Key Responsibilities" },
      { type: "list", items: [""] },
    ]);
  };

  const inputClass = "w-full bg-gray-50/50 border border-gray-200 p-3 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-[#F7A400]/20 transition-all";
  const selectClass = "w-full bg-gray-50/50 border border-gray-200 p-3 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-[#F7A400]/20 transition-all appearance-none";
  const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block";

  return (
    <div className="min-h-screen bg-gray-50/30 font-poppins pb-20">

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#F7A400]/10 p-2 rounded-md">
            <Briefcase className="text-[#F7A400]" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Career Studio</h1>
            <p className="text-xs text-gray-400">{editingId ? `Editing: ${title}` : "Publish a new job opening"}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {editingId && (
            <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-md font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-600">
              <X size={16} /> Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-[#F7A400] text-white px-7 py-2.5 rounded-md font-bold text-sm hover:bg-[#d98f00] transition-all shadow-sm disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? "Processing..." : editingId ? "Update Job" : "Publish Job"}
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Sidebar: Job Specifications */}
          <aside className="w-full lg:w-[340px] shrink-0 space-y-6">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-3 mb-6">
                Job Specifications
              </h3>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Position Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Senior Web Developer"
                  />
                </div>

                <div>
                  <label className={labelClass}>Brand Icon Category</label>
                  <select value={iconName} onChange={(e) => setIconName(e.target.value)} className={selectClass}>
                    <option value="Code">Code / Engineering</option>
                    <option value="Terminal">Terminal / DevOps</option>
                    <option value="Layers">Layers / Design</option>
                    <option value="Globe">Globe / Marketing</option>
                    <option value="Briefcase">Briefcase / HR</option>
                    <option value="ShieldCheck">Shield / Security</option>
                    <option value="Cpu">CPU / Hardware</option>
                    <option value="Database">Database / Backend</option>
                    <option value="Smartphone">Smartphone / App</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Job Type</label>
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)} className={selectClass}>
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Remote</option>
                      <option>On-site</option>
                      <option>Contract</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Salary</label>
                    <input type="text" value={salary} placeholder="Negotiable" onChange={(e) => setSalary(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Shift</label>
                    <input type="text" value={shift} placeholder="Day Shift" onChange={(e) => setShift(e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <h4 className="text-xs font-bold text-amber-700 mb-1.5 flex items-center gap-1.5">
                <Info size={14} /> Pro Tip
              </h4>
              <p className="text-[11px] text-amber-600 leading-relaxed">
                Always place a <strong>Heading (H2)</strong> before a <strong>Bullet List</strong> for better structure and readability.
              </p>
            </div>
          </aside>

          {/* Right Main Area: Content Builder */}
          <main className="flex-grow space-y-6">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Layout size={18} className="text-[#F7A400]" /> Content Builder
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Structure your job description with headings, paragraphs & lists</p>
                </div>
                <div className="flex gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                  {[
                    { type: "heading", icon: HeadingIcon, title: "Add H2 Heading", color: "orange" },
                    { type: "text", icon: Type, title: "Add Paragraph", color: "blue" },
                    { type: "list", icon: List, title: "Add Bullet List", color: "green" },
                    { type: "summary", icon: Info, title: "Add Summary", color: "purple" },
                  ].map(({ type, icon: Icon, title: t, color }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addSection(type)}
                      title={t}
                      className="p-2.5 bg-white shadow-sm rounded-md hover:bg-gray-50 text-gray-500 transition-all border border-gray-100"
                    >
                      <Icon size={18} />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSection("requirements")}
                    title="Add Core Requirements Grid"
                    className="p-2.5 bg-[#F7A400] rounded-md text-white hover:bg-[#d98f00] transition-all shadow-sm"
                  >
                    <ShieldCheck size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {sections.map((section, idx) => (
                  <div key={idx} className="group relative bg-gray-50/50 p-6 rounded-lg border border-gray-100 hover:border-[#F7A400]/30 transition-all">
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="absolute -top-2.5 -right-2.5 bg-red-500 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all shadow-md"
                    >
                      <Trash2 size={12} />
                    </button>

                    {/* Heading / Requirements Title */}
                    {(section.type === "heading" || section.type === "requirements") && (
                      <div className="mb-4">
                        <span className="text-[10px] font-black text-[#F7A400] uppercase tracking-widest block mb-2">H2 Section Title</span>
                        <input
                          type="text"
                          value={section.value}
                          placeholder="Enter heading..."
                          className="w-full bg-transparent text-xl font-bold text-gray-900 outline-none border-b-2 border-dashed border-gray-200 focus:border-[#F7A400] pb-2 transition-all"
                          onChange={(e) => updateSection(idx, e.target.value)}
                        />
                      </div>
                    )}

                    {/* Text/Summary */}
                    {(section.type === "text" || section.type === "summary") && (
                      <div>
                        <span className={`text-[10px] font-black uppercase tracking-widest block mb-3 ${section.type === "summary" ? "text-purple-500" : "text-blue-500"}`}>
                          {section.type === "summary" ? "📋 Role Insight" : "✏️ Text Content"}
                        </span>
                        <textarea
                          value={section.value}
                          placeholder="Describe the details here..."
                          className="w-full bg-white border border-gray-200 p-4 rounded-md text-gray-700 outline-none resize-none focus:border-[#F7A400]/40 transition-all"
                          rows={4}
                          onChange={(e) => updateSection(idx, e.target.value)}
                        />
                      </div>
                    )}

                    {/* Bullet List */}
                    {section.type === "list" && (
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-black text-[#F7A400] uppercase tracking-widest block mb-2">List Section Heading</span>
                          <input
                            type="text"
                            value={section.value || ""}
                            placeholder="e.g. Key Responsibilities"
                            className="w-full bg-transparent text-lg font-bold text-gray-900 outline-none border-b border-dashed border-gray-200 focus:border-[#F7A400] pb-1 transition-all"
                            onChange={(e) => updateSection(idx, e.target.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-green-600 uppercase flex items-center gap-1.5"><List size={12} /> Bullet Points</span>
                          <button type="button" onClick={() => addListItem(idx)} className="text-[10px] font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-full border border-green-100 hover:bg-green-600 hover:text-white transition-all">
                            + Add Item
                          </button>
                        </div>
                        <div className="space-y-2">
                          {section.items.map((item, lIdx) => (
                            <div key={lIdx} className="flex gap-3 items-center group/item bg-white p-2.5 px-3 rounded-md border border-gray-100">
                              <div className="w-1.5 h-1.5 bg-[#F7A400] rounded-full shrink-0" />
                              <input
                                type="text"
                                value={item}
                                placeholder="Type list item..."
                                className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-700"
                                onChange={(e) => updateListItem(idx, lIdx, e.target.value)}
                              />
                              <button onClick={() => removeListItem(idx, lIdx)} className="text-gray-200 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all">
                                <X size={15} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Core Requirements Grid */}
                    {section.type === "requirements" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center bg-amber-50 p-3 rounded-lg border border-amber-100">
                          <span className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-1.5"><ShieldCheck size={14} /> Essential Requirements Grid</span>
                          <button type="button" onClick={() => addListItem(idx)} className="text-[10px] font-bold bg-[#F7A400] text-white px-3 py-1.5 rounded-md hover:bg-[#d98f00] transition-all">
                            Add Row
                          </button>
                        </div>
                        <div className="space-y-2">
                          {section.items.map((item, lIdx) => (
                            <div key={lIdx} className="flex flex-col md:flex-row gap-3 items-end group/item bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:border-[#F7A400]/30 transition-all">
                              <div className="flex-1 w-full">
                                <label className="text-[9px] font-bold text-gray-400 uppercase mb-1 block">Criterion</label>
                                <input
                                  type="text"
                                  value={item.label}
                                  placeholder="e.g. Experience"
                                  className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#F7A400] outline-none text-sm font-bold text-gray-800 p-2 rounded transition-all"
                                  onChange={(e) => updateRequirementItem(idx, lIdx, "label", e.target.value)}
                                />
                              </div>
                              <div className="flex-[3] w-full">
                                <label className="text-[9px] font-bold text-gray-400 uppercase mb-1 block">Description</label>
                                <input
                                  type="text"
                                  value={item.desc}
                                  placeholder="e.g. 3+ years in React"
                                  className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#F7A400] outline-none text-sm p-2 rounded transition-all"
                                  onChange={(e) => updateRequirementItem(idx, lIdx, "desc", e.target.value)}
                                />
                              </div>
                              <button onClick={() => removeListItem(idx, lIdx)} className="p-2 text-gray-300 hover:text-red-500 transition-colors mb-1">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {sections.length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-lg">
                    <Sparkles className="mx-auto text-gray-200 mb-3" size={40} strokeWidth={1} />
                    <p className="text-gray-400 text-sm font-medium">No sections added yet. Start building above!</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Job Inventory Table */}
        <div className="mt-10 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Job Inventory</h3>
              <p className="text-xs text-gray-400 mt-0.5">Manage your active job listings</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-gray-900">{jobs.length}</span>
              <span className="text-[10px] block font-bold text-gray-400 uppercase tracking-widest">Total Posts</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            {fetching ? (
              <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="animate-spin mb-2" size={28} />
                <p className="text-xs font-medium uppercase tracking-widest">Loading listings...</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-8 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Position & Identity</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Attributes</th>
                    <th className="px-8 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {jobs.map((job) => {
                    const IconComponent = iconMap[job.iconName] || Briefcase;
                    return (
                      <tr key={job._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#F7A400]/10 rounded-lg flex items-center justify-center text-[#F7A400] shrink-0 group-hover:bg-[#F7A400] group-hover:text-white transition-all">
                              <IconComponent size={20} />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{job.title}</div>
                              <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                                <MapPin size={11} className="text-[#F7A400]" /> {job.location}
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{job.jobType}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex flex-wrap gap-2">
                            <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">
                              <Clock size={12} className="text-blue-400" /> {job.shift}
                            </span>
                            <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full text-xs font-bold text-amber-700">
                              {job.salary}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => handleEdit(job)}
                              className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-4 py-2 rounded-md font-bold text-sm hover:bg-blue-600 hover:text-white transition-all"
                            >
                              <Edit3 size={14} /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="flex items-center gap-1.5 bg-red-50 text-red-500 px-4 py-2 rounded-md font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {jobs.length === 0 && !fetching && (
            <div className="p-20 text-center border-t border-gray-50">
              <Database className="mx-auto text-gray-200 mb-3" size={40} strokeWidth={1} />
              <p className="text-gray-400 text-sm italic">Database is empty. Publish your first job post above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCareers;
