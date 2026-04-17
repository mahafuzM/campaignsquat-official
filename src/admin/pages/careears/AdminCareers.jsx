import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Briefcase,
  Save,
  Edit,
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
  CheckCircle,
} from "lucide-react";

const iconMap = {
  Code: Code,
  Terminal: Terminal,
  Layers: Layers,
  Globe: Globe,
  Briefcase: Briefcase,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
  Database: Database,
  Smartphone: Smartphone,
  Laptop: Laptop,
  Search: Search,
  Info: Info,
};

const AdminCareers = () => {
  // --- State Management ---
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("On-site");
  const [jobType, setJobType] = useState("Full Time");
  const [salary, setSalary] = useState("Negotiable");
  const [shift, setShift] = useState("Day Shift");
  const [iconName, setIconName] = useState("Code");

  // Dynamic Content Builder State
  const [sections, setSections] = useState([
    { type: "heading", value: "Key Responsibilities" },
    { type: "list", items: [""] },
  ]);

  // ✅ Local vs Live Dynamic URL Logic
  

  // --- API Interactions ---
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      // Axios-er default config thakle valo, na thakle ekhane (axios.defaults.baseURL || "") force kora hoyeche
      const res = await axios.get(`/api/jobs`);

      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setJobs(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // --- Builder Logic ---
  const addSection = (type) => {
    let newSection;
    if (type === "requirements") {
      newSection = {
        type,
        value: "Core Requirements",
        items: [{ label: "", desc: "" }],
      };
    } else if (type === "list") {
      newSection = { type, items: [""] };
    } else {
      newSection = { type, value: "" };
    }
    setSections([...sections, newSection]);
  };

  const updateSection = (index, val) => {
    const newSections = [...sections];
    newSections[index].value = val;
    setSections(newSections);
  };

  const updateListItem = (sIdx, lIdx, val) => {
    const newSections = [...sections];
    newSections[sIdx].items[lIdx] = val;
    setSections(newSections);
  };

  const updateRequirementItem = (sIdx, lIdx, field, val) => {
    const newSections = [...sections];
    const newItems = [...newSections[sIdx].items];
    newItems[lIdx] = { ...newItems[lIdx], [field]: val };
    newSections[sIdx] = { ...newSections[sIdx], items: newItems };
    setSections(newSections);
  };

  const addListItem = (index) => {
    const newSections = [...sections];
    if (newSections[index].type === "requirements") {
      newSections[index].items.push({ label: "", desc: "" });
    } else {
      newSections[index].items.push("");
    }
    setSections(newSections);
  };

  const removeListItem = (sIdx, lIdx) => {
    const newSections = [...sections];
    if (newSections[sIdx].items.length > 1) {
      newSections[sIdx].items.splice(lIdx, 1);
      setSections(newSections);
    }
  };

  const removeSection = (index) => {
    if (window.confirm("Remove this entire section?")) {
      setSections(sections.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const preparedSections = sections.map((section) => {
      const base = { type: section.type, value: section.value || "" };
      if (section.type === "requirements") {
        return {
          ...base,
          requirementItems: (section.items || []).map((it) => ({
            label: typeof it === "object" ? it.label || "" : "",
            desc: typeof it === "object" ? it.desc || "" : "",
          })),
          items: [],
        };
      }
      return {
        ...base,
        items: Array.isArray(section.items) ? section.items : [],
      };
    });

    const payload = {
      title: title.trim(),
      location,
      jobType,
      salary,
      shift,
      iconName,
      sections: preparedSections,
    };

    try {
      let response;
      if (editingId) {
        response = await axios.put(
          `/api/jobs/${editingId}`,
          payload,
        );
      } else {
        response = await axios.post(`/api/jobs`, payload);
      }

      if (response.status === 200 || response.status === 201) {
        alert(editingId ? "✅ Job Updated!" : "✅ Job Published!");
        resetForm();
        fetchJobs();
      }
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Action failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await axios.delete(`/api/jobs/${id}`);
        if (res.status === 200) {
          alert("Job deleted!");
          fetchJobs();
        }
      } catch (err) {
        console.error("Delete Error:", err);
        alert("Delete failed.");
      }
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
        return {
          ...sec,
          items: (sec.requirementItems || []).map((ri) => ({
            label: ri.label || "",
            desc: ri.desc || "",
          })),
        };
      }
      return sec;
    });

    setSections(restoredSections);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <div className="bg-white min-h-screen text-black font-poppins pb-20">
      {/* --- Sticky Header --- */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-black p-2 rounded-[5px]">
            <Briefcase className="text-[#F7A400]" size={24} />
          </div>
          <h2 className="text-[22px] font-semibold tracking-tight text-black">
            Career Studio
          </h2>
        </div>
        <div className="flex gap-4">
          {editingId && (
            <button
              type="button" // টাইপ নিশ্চিত করা ভালো
              onClick={resetForm}
              className="px-6 py-3 rounded-[5px] font-bold border border-black hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
          )}
          <button
            type="button" // এটি যোগ করুন
            onClick={(e) => handleSubmit(e)} // ইভেন্ট (e) স্পষ্টভাবে পাস করুন
            className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-[5px] font-bold hover:bg-[#F7A400] transition-all shadow-lg active:scale-95"
          >
            <Save size={18} /> {editingId ? "Update Job" : "Publish Job"}
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row w-full">
        {/* --- Left Sidebar: Job Specs --- */}
        <aside className="w-full lg:w-1/3 p-8 bg-gray-50 border-r border-gray-200 space-y-8">
          <section>
            <h3 className="text-xl font-bold border-l-4 text-black border-black pl-3 mb-6">
              Job Specifications
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-black  mb-1 ">
                  Position Title
                </label>
                <input
                  type="text"
                  value={title}
                  className="w-full bg-white border border-gray-300 p-3 rounded-[5px] outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Web Developer"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-black mb-1 ">
                  Brand Icon Category
                </label>
                <div className="relative">
                  <select
                    value={iconName}
                    className="w-full bg-white border border-gray-300 p-3 rounded-[5px] text-sm outline-none appearance-none focus:ring-2 focus:ring-orange-200"
                    onChange={(e) => setIconName(e.target.value)}
                  >
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
                  <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
                    <Layout size={18} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-black u mb-1 ">
                    Job Type
                  </label>
                  <select
                    value={jobType}
                    className="w-full bg-white border border-gray-300 p-3 rounded-[5px] text-sm outline-none focus:ring-2 focus:ring-orange-200"
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Remote</option>
                    <option>On-site</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-black mb-1 ">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    className="w-full bg-white border border-gray-300 p-3 rounded-[5px] text-sm outline-none focus:ring-2 focus:ring-orange-200"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-black mb-1 ">
                  Salary & Shift
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={salary}
                      placeholder="Salary"
                      className="w-full bg-white border border-gray-300 p-3 rounded-[5px] text-sm outline-none focus:ring-2 focus:ring-orange-200"
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={shift}
                      placeholder="Shift"
                      className="w-full bg-white border border-gray-300 p-3 rounded-[5px] text-sm outline-none focus:ring-2 focus:ring-orange-200"
                      onChange={(e) => setShift(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <div className="bg-orange-50 p-4 rounded-[5px] border border-orange-100">
              <h4 className="text-xs font-bold text-orange-800 mb-2 flex items-center gap-1">
                <Info size={14} /> Pro Tip
              </h4>
              <p className="text-[11px] text-orange-700 leading-relaxed">
                Always place a <strong>Heading (h2)</strong> before a{" "}
                <strong>Bullet List (li)</strong> for better structure.
              </p>
            </div>
          </section>
        </aside>

        {/* --- Right Main Area: Content Builder --- */}
        <main className="w-full lg:w-2/3 p-8 lg:p-12 space-y-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Layout className="text-[#F7A400]" /> Content Builder
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Design the job description structure (h2 titles & li lists)
              </p>
            </div>
            <div className="flex gap-2 bg-gray-50 p-1.5 rounded-[5px] border border-gray-200">
              <button
                type="button"
                onClick={() => addSection("heading")}
                className="p-2.5 bg-white shadow-sm rounded-[5px] hover:bg-orange-50 text-gray-600 transition-all border border-transparent hover:border-orange-200"
                title="Add h2 Heading"
              >
                <HeadingIcon size={20} />
              </button>
              <button
                type="button"
                onClick={() => addSection("text")}
                className="p-2.5 bg-white shadow-sm rounded-[5px] hover:bg-orange-50 text-gray-600 transition-all border border-transparent hover:border-orange-200"
                title="Add Paragraph"
              >
                <Type size={20} />
              </button>
              <button
                type="button"
                onClick={() => addSection("list")}
                className="p-2.5 bg-white shadow-sm rounded-[5px] hover:bg-orange-50 text-gray-600 transition-all border border-transparent hover:border-orange-200"
                title="Add li List"
              >
                <List size={20} />
              </button>
              <button
                type="button"
                onClick={() => addSection("summary")}
                className="p-2.5 bg-white shadow-sm rounded-[5px] hover:bg-orange-50 text-gray-600 transition-all border border-transparent hover:border-orange-200"
                title="Add Summary/Info"
              >
                <Info size={20} />
              </button>
              <button
                type="button"
                onClick={() => addSection("requirements")}
                className="p-2.5 bg-orange-500 rounded-[5px] hover:bg-black text-white transition-all shadow-md"
                title="Add Core Requirements"
              >
                <ShieldCheck size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-8 rounded-[5px] border border-gray-200 hover:border-[#F7A400]/30 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300"
              >
                <button
                  onClick={() => removeSection(idx)}
                  className="absolute -top-3 -right-3 bg-red-500 shadow-lg p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 z-10 scale-90 hover:scale-100"
                >
                  <Trash2 size={16} />
                </button>

                {/* Heading Type (h2) */}
                {(section.type === "heading" ||
                  section.type === "requirements") && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-4 w-1 bg-orange-400 rounded-full"></div>
                      <label className="text-[10px] font-black text-orange-500 uppercase tracking-tighter">
                        H2 Section Title
                      </label>
                    </div>
                    <input
                      type="text"
                      value={section.value}
                      placeholder="Enter heading (e.g. Requirements)"
                      className="w-full bg-transparent text-2xl font-bold text-gray-900 outline-none border-b-2 border-dashed border-gray-100 focus:border-orange-200 pb-2"
                      onChange={(e) => updateSection(idx, e.target.value)}
                    />
                  </div>
                )}

                {/* Text/Summary Type */}
                {(section.type === "text" || section.type === "summary") && (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <label
                      className={`text-[10px] font-black uppercase mb-3 flex items-center gap-2 ${section.type === "summary" ? "text-purple-500" : "text-blue-500"}`}
                    >
                      {section.type === "summary" ? (
                        <>
                          <Info size={14} /> Role Insight
                        </>
                      ) : (
                        <>
                          <Type size={14} /> Text Content
                        </>
                      )}
                    </label>
                    <textarea
                      value={section.value}
                      placeholder="Describe the details here..."
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-[5px] text-gray-700 outline-none resize-none focus:bg-white focus:border-orange-100 transition-all"
                      rows="4"
                      onChange={(e) => updateSection(idx, e.target.value)}
                    />
                  </div>
                )}

                {/* Standard List Type (li) */}
                {section.type === "list" && (
                  <div className="space-y-4">
                    {/* --- Added List Heading Field --- */}
                    <div className="mb-4">
                      <label className="text-[10px] font-black text-orange-500 uppercase tracking-tighter block mb-1">
                        List Section Heading (h2)
                      </label>
                      <input
                        type="text"
                        value={section.value || ""}
                        placeholder="e.g. Key Responsibilities"
                        className="w-full bg-transparent text-lg font-bold text-gray-900 outline-none border-b border-dashed border-gray-200 focus:border-orange-300 pb-1 transition-all"
                        onChange={(e) => updateSection(idx, e.target.value)}
                      />
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                      <label className="text-[10px] font-black text-green-600 uppercase flex items-center gap-2">
                        <List size={14} /> LI - Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={() => addListItem(idx)}
                        className="text-[10px] font-bold bg-green-50 text-green-600 px-4 py-1.5 rounded-full border border-green-100 hover:bg-green-600 hover:text-white transition-all"
                      >
                        + Add List Item
                      </button>
                    </div>
                    <div className="space-y-3">
                      {section.items.map((item, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex gap-3 items-center group/item bg-gray-50/50 p-2 rounded-rounded-[5px] border border-transparent hover:border-gray-200"
                        >
                          <div className="w-2 h-2 bg-[#F7A400] rounded-full flex-shrink-0 ml-2"></div>
                          <input
                            type="text"
                            value={item}
                            placeholder="Type list item content..."
                            className="flex-1 bg-transparent outline-none text-sm font-medium py-1"
                            onChange={(e) =>
                              updateListItem(idx, lIdx, e.target.value)
                            }
                          />
                          <button
                            onClick={() => removeListItem(idx, lIdx)}
                            className="text-gray-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Requirements Table Type */}
                {section.type === "requirements" && (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center bg-orange-50 p-3 rounded-xl border border-orange-100">
                      <label className="text-[10px] font-black uppercase text-orange-600 flex items-center gap-2">
                        <ShieldCheck size={16} /> Essential Grid (Label &
                        Details)
                      </label>
                      <button
                        type="button"
                        onClick={() => addListItem(idx)}
                        className="text-[10px] font-bold bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-black transition-all shadow-sm"
                      >
                        Add New Row
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {section.items.map((item, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex flex-col md:flex-row gap-4 items-end group/item bg-white p-4 rounded-[5px] border border-gray-100 shadow-sm hover:border-orange-200 transition-all"
                        >
                          <div className="flex-1 w-full">
                            <label className="text-[9px] font-bold text-gray-400 uppercase mb-1 block">
                              Criterion
                            </label>
                            <input
                              type="text"
                              value={item.label}
                              placeholder="e.g. Experience"
                              className="w-full bg-gray-50 border-b-2 border-transparent focus:border-orange-400 outline-none text-sm font-bold text-gray-800 p-2 rounded transition-all"
                              onChange={(e) =>
                                updateRequirementItem(
                                  idx,
                                  lIdx,
                                  "label",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="flex-[3] w-full">
                            <label className="text-[9px] font-bold text-gray-400 uppercase mb-1 block">
                              Description
                            </label>
                            <input
                              type="text"
                              value={item.desc}
                              placeholder="e.g. 3+ years in React"
                              className="w-full bg-gray-50 border-b-2 border-transparent focus:border-orange-400 outline-none text-sm p-2 rounded transition-all"
                              onChange={(e) =>
                                updateRequirementItem(
                                  idx,
                                  lIdx,
                                  "desc",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <button
                            onClick={() => removeListItem(idx, lIdx)}
                            className="p-2 text-gray-300 hover:text-red-500 transition-colors mb-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {sections.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[5px]">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="text-gray-300" size={32} />
                </div>
                <p className="text-gray-400 font-medium">
                  No sections added yet. Start building!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* --- History Management Table --- */}
      <div className="mx-8 mt-16 bg-white border border-gray-200 rounded-[5px] overflow-hidden shadow-2xl shadow-gray-200/50">
        <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-2xl tracking-tight">Job Inventory</h3>
            <p className="text-sm text-gray-400 mt-1">
              Manage your active job listings
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-black">
              {jobs.length}
            </span>
            <span className="text-[10px] block font-bold text-gray-400 uppercase">
              Total Posts
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 text-center text-gray-400 font-medium italic animate-pulse">
              Loading listings...
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50/80 text-[10px] uppercase font-black text-gray-400 tracking-widest">
                <tr>
                  <th className="px-8 py-5">Position & Identity</th>
                  <th className="px-8 py-5">Attributes</th>
                  <th className="px-8 py-5 text-right">Control Panel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-orange-50/30 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-[#F7A400] group-hover:scale-110 transition-transform">
                          {(() => {
                            // iconMap থেকে ইউজার যেটা সিলেক্ট করেছে সেই আইকনটি খুঁজে বের করবে
                            // যদি না পাওয়া যায়, তবে ডিফল্ট হিসেবে Briefcase দেখাবে
                            const IconComponent =
                              iconMap[job.iconName] || Briefcase;
                            return <IconComponent size={20} />;
                          })()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">
                            {job.title}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                            <MapPin size={12} className="text-orange-400" />{" "}
                            {job.location}
                            <span className="text-gray-200">|</span>
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                              {job.jobType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600">
                          <Clock size={14} className="text-blue-400" />{" "}
                          {job.shift}
                        </span>
                        <span className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full text-xs font-bold text-orange-600">
                          {job.salary}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button
                          onClick={() => handleEdit(job)}
                          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {jobs.length === 0 && !loading && (
          <div className="p-20 text-center">
            <div className="mb-4 flex justify-center text-gray-200">
              <Database size={48} />
            </div>
            <h4 className="text-gray-400 font-medium italic">
              Database is empty. Publish your first job post!
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCareers;
