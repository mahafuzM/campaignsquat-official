import React, { useState, useEffect, useCallback } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import {
  Plus,
  Trash2,
  Layout,
  Type,
  List as ListIcon,
  Save,
  Edit3,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  FileText,
  X,
  Upload,
  Tag,
  Clock,
  ChevronRight,
} from "lucide-react";

const BlogManager = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Ui/Ux Design");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [sections, setSections] = useState([
    { type: "text", value: "", items: [] },
  ]);

  const generateSlug = (text) =>
    text.toString().toLowerCase().trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!editingId) setUrl(generateSlug(newTitle));
  };

  const fetchBlogs = useCallback(async () => {
    setFetching(true);
    try {
      const res = await axios.get("/api/blogs");
      const data = Array.isArray(res.data) ? res.data : (Array.isArray(res.data?.data) ? res.data.data : []);
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to load blog posts.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const addSection = (type) => {
    const newSec = type === "list"
      ? { type, value: "", items: [""] }
      : { type, value: "", items: [] };
    setSections([...sections, newSec]);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSectionChange = (index, field, val) => {
    const s = [...sections];
    s[index][field] = val;
    setSections(s);
  };

  const handleListItemChange = (sIndex, iIndex, val) => {
    const s = [...sections];
    s[sIndex].items[iIndex] = val;
    setSections(s);
  };

  const addListItem = (sIndex) => {
    const s = [...sections];
    s[sIndex].items.push("");
    setSections(s);
  };

  const removeListItem = (sIndex, iIndex) => {
    const s = [...sections];
    if (s[sIndex].items.length > 1) {
      s[sIndex].items.splice(iIndex, 1);
      setSections(s);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setUrl("");
    setCategory("Ui/Ux Design");
    setDescription("");
    setImage(null);
    setImagePreview(null);
    setSections([{ type: "text", value: "", items: [] }]);
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setUrl(blog.url);
    setCategory(blog.category);
    setDescription(blog.description);
    if (blog.image) setImagePreview(fixImagePath(blog.image));
    try {
      setSections(typeof blog.sections === "string" ? JSON.parse(blog.sections) : blog.sections);
    } catch (e) {
      console.error("Sections parsing error", e);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Editing mode enabled", { icon: "📝" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { toast.error("Post title is required!"); return; }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("url", url);
    formData.append("category", category);
    formData.append("description", description);
    if (image) formData.append("image", image);
    formData.append("sections", JSON.stringify(sections));

    try {
      if (editingId) {
        await axios.put(`/api/blogs/${editingId}`, formData);
        toast.success("Blog Updated! ✅");
      } else {
        await axios.post("/api/blogs", formData);
        toast.success("Blog Published! 🚀");
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error("Error submitting:", err);
      toast.error(err.response?.data?.message || "Submission failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
      toast.success("Blog deleted! 🗑️");
    } catch (err) {
      toast.error("Error deleting blog.");
    }
  };

  const fixImagePath = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `/${path.replace(/\\/g, "/")}`;
  };

  const inputClass = "w-full bg-gray-50/50 border border-gray-200 p-3 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-[#F7A400]/20 transition-all text-sm";
  const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block";

  const sectionTypeConfig = {
    text: { label: "✏️ Text Block", color: "blue" },
    heading: { label: "📌 Heading", color: "orange" },
    list: { label: "📋 Bullet List", color: "green" },
  };

  return (
    <div className="min-h-screen bg-gray-50/30 font-poppins pb-20">

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#F7A400]/10 p-2 rounded-md">
            <FileText className="text-[#F7A400]" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Content Studio</h1>
            <p className="text-xs text-gray-400">{editingId ? `Editing: ${title}` : "Write & publish a new blog post"}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {editingId && (
            <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-md font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-600">
              <X size={16} /> Cancel
            </button>
          )}
          <button
            type="submit"
            form="blog-form"
            disabled={loading}
            className="flex items-center gap-2 bg-[#F7A400] text-white px-7 py-2.5 rounded-md font-bold text-sm hover:bg-[#d98f00] transition-all shadow-sm disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? "Processing..." : editingId ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 pt-8">
        <form id="blog-form" onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Sidebar: Post Settings */}
            <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pb-3 border-b border-gray-100 mb-6">
                  Post Settings
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Post Title</label>
                    <input
                      type="text"
                      value={title}
                      placeholder="e.g. Scalable Design Systems"
                      className={inputClass}
                      onChange={handleTitleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1.5 block">Slug URL (Auto)</label>
                    <input
                      type="text"
                      value={url}
                      className="w-full bg-blue-50/30 border border-blue-100 p-3 rounded-md font-mono text-xs text-blue-700 font-bold outline-none"
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Short Description</label>
                    <textarea
                      value={description}
                      placeholder="Catchy summary for the post..."
                      className={`${inputClass} resize-none h-24`}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Category</label>
                    <select value={category} className={inputClass} onChange={(e) => setCategory(e.target.value)}>
                      <option value="Ui/Ux Design">Ui/Ux Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Mobile Apps Development">Mobile Apps Development</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Featured Image {editingId && "(Optional)"}</label>
                    <div className="relative group border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/30 hover:border-[#F7A400] transition-all cursor-pointer overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImage(file);
                            setImagePreview(URL.createObjectURL(file));
                            toast.success("Image selected! ✅");
                          }
                        }}
                        required={!editingId}
                      />
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-36 object-cover" />
                      ) : (
                        <div className="py-8 text-center">
                          <Upload className="mx-auto text-gray-300 mb-2" size={28} />
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Upload Featured Image</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right: Article Builder */}
            <main className="flex-grow space-y-4">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Layout size={18} className="text-[#F7A400]" /> Article Builder
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Add and arrange content blocks</p>
                  </div>
                  {/* Section Adder Buttons */}
                  <div className="flex gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                    {[
                      { type: "heading", icon: FileText, label: "Heading" },
                      { type: "text", icon: Type, label: "Text" },
                      { type: "list", icon: ListIcon, label: "List" },
                    ].map(({ type, icon: Icon, label }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => addSection(type)}
                        title={`Add ${label} Block`}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white shadow-sm rounded-md text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#F7A400] transition-all border border-gray-100"
                      >
                        <Icon size={14} /> {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {sections.map((section, sIndex) => (
                    <div
                      key={sIndex}
                      className="group relative bg-gray-50/50 p-5 rounded-lg border border-gray-100 hover:border-[#F7A400]/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          section.type === "heading" ? "text-[#F7A400]" :
                          section.type === "text" ? "text-blue-500" : "text-green-600"
                        }`}>
                          {sectionTypeConfig[section.type]?.label || section.type}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeSection(sIndex)}
                          className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {section.type !== "list" ? (
                        <textarea
                          value={section.value}
                          className={`w-full bg-white border border-gray-100 p-3 rounded-md outline-none resize-none transition-all focus:border-[#F7A400]/30 ${
                            section.type === "heading" ? "text-xl font-bold text-gray-900" : "text-sm text-gray-700 leading-relaxed"
                          }`}
                          rows={section.type === "heading" ? 2 : 5}
                          placeholder={`Write your ${section.type} here...`}
                          onChange={(e) => handleSectionChange(sIndex, "value", e.target.value)}
                        />
                      ) : (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={section.value}
                            placeholder="List Section Title..."
                            className="w-full bg-transparent border-b border-dashed border-gray-200 pb-2 font-bold text-gray-900 outline-none focus:border-[#F7A400] transition-all"
                            onChange={(e) => handleSectionChange(sIndex, "value", e.target.value)}
                          />
                          <div className="space-y-2 mt-3">
                            {section.items.map((item, iIndex) => (
                              <div key={iIndex} className="flex items-center gap-2 bg-white p-2.5 px-3 rounded-md border border-gray-100 group/item">
                                <div className="w-1.5 h-1.5 bg-[#F7A400] rounded-full shrink-0" />
                                <input
                                  type="text"
                                  value={item}
                                  placeholder="Bullet point..."
                                  className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                                  onChange={(e) => handleListItemChange(sIndex, iIndex, e.target.value)}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeListItem(sIndex, iIndex)}
                                  className="text-gray-200 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => addListItem(sIndex)}
                            className="text-xs font-bold text-[#F7A400] hover:underline flex items-center gap-1 mt-2"
                          >
                            <Plus size={12} /> Add point
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {sections.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-lg">
                      <Sparkles className="mx-auto text-gray-200 mb-3" size={36} strokeWidth={1} />
                      <p className="text-gray-400 text-sm">Add sections to start building your article</p>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </form>

        {/* Blog History Table */}
        <div className="mt-10 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Published Blog History</h3>
              <p className="text-xs text-gray-400 mt-0.5">All published articles</p>
            </div>
            <span className="bg-[#F7A400]/10 text-[#F7A400] border border-[#F7A400]/20 px-3 py-1 rounded-full text-xs font-bold">
              {blogs.length} Posts
            </span>
          </div>

          <div className="overflow-x-auto">
            {fetching ? (
              <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="animate-spin mb-2" size={28} />
                <p className="text-xs font-medium uppercase tracking-widest">Loading posts...</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Preview</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Title & Category</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Date</th>
                    <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-20 h-14 rounded-md overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center">
                          {blog.image ? (
                            <img src={fixImagePath(blog.image)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <ImageIcon size={20} className="text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 text-sm truncate max-w-xs">{blog.title}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Tag size={10} className="text-[#F7A400]" />
                          <span className="text-[10px] text-[#F7A400] font-bold">{blog.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <Clock size={11} />
                          {new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md font-bold text-xs hover:bg-blue-600 hover:text-white transition-all"
                          >
                            <Edit3 size={13} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="flex items-center gap-1.5 bg-red-50 text-red-500 px-3 py-1.5 rounded-md font-bold text-xs hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {blogs.length === 0 && !fetching && (
            <div className="p-20 text-center border-t border-gray-50">
              <Sparkles className="mx-auto text-gray-200 mb-3" size={40} strokeWidth={1} />
              <p className="text-gray-400 text-sm italic">No blog posts published yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManager;
