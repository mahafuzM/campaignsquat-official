import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Layout,
  Type,
  List as ListIcon,
  Save,
  Edit,
  Trash,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

const BlogManager = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Ui/Ux Design");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [sections, setSections] = useState([
    { type: "text", value: "", items: [] },
  ]);

  // ✅ ডাইনামিক বেস ইউআরএল সেটআপ
  const BASE_URL =
    window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

  // 🔥 ১০০% পারফেক্ট স্লাগ জেনারেটর লজিক
  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!editingId) {
      setUrl(generateSlug(newTitle));
    }
  };

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }, [BASE_URL]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const addSection = (type) => {
    if (type === "list") {
      setSections([...sections, { type, value: "", items: [""] }]);
    } else {
      setSections([...sections, { type, value: "", items: [] }]);
    }
  };

  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const handleSectionChange = (index, field, val) => {
    const newSections = [...sections];
    newSections[index][field] = val;
    setSections(newSections);
  };

  const handleListItemChange = (sIndex, iIndex, val) => {
    const newSections = [...sections];
    newSections[sIndex].items[iIndex] = val;
    setSections(newSections);
  };

  const addListItem = (sIndex) => {
    const newSections = [...sections];
    newSections[sIndex].items.push("");
    setSections(newSections);
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setUrl(blog.url);
    setCategory(blog.category);
    setDescription(blog.description);
    try {
      setSections(
        typeof blog.sections === "string"
          ? JSON.parse(blog.sections)
          : blog.sections,
      );
    } catch (e) {
      console.error("Sections parsing error", e);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("url", url);
    formData.append("category", category);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    formData.append("sections", JSON.stringify(sections));

    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/api/blogs/${editingId}`, formData);
        alert("Blog Updated Successfully! 🔥");
      } else {
        await axios.post(`${BASE_URL}/api/blogs`, formData);
        alert("Blog Published Successfully! 🚀");
      }
      setEditingId(null);
      fetchBlogs();
      // ফর্ম রিসেট করার জন্য রিলোড দিতে পারেন অথবা ম্যানুয়ালি স্টেট ক্লিয়ার করতে পারেন
      window.location.reload();
    } catch (err) {
      console.error("Error submitting:", err.response?.data);
      alert(err.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog? 🗑️")) {
      try {
        await axios.delete(`${BASE_URL}/api/blogs/${id}`);
        setBlogs(blogs.filter((blog) => blog._id !== id));
        alert("Blog deleted successfully!");
      } catch (err) {
        alert("Error deleting blog.");
      }
    }
  };

  const fixImagePath = (path) => {
    if (!path) return "";
    return path.startsWith("http")
      ? path
      : `${BASE_URL}/${path.replace(/\\/g, "/")}`;
  };

  return (
    <div className="bg-white min-h-screen text-black font-poppins pb-20">
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200 mb-0">
        <h2 className="text-3xl font-extrabold text-[#F7A400]">
          Campaignsquat Content Studio
        </h2>
        <div className="flex flex-col items-end">
          <span className="text-gray-500 text-sm font-medium">
            Agency Admin Dashboard
          </span>
          {editingId && (
            <span className="text-blue-500 text-xs font-bold">
              Editing Mode Active
            </span>
          )}
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row w-full"
      >
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/3 p-8 bg-gray-50 border-r border-gray-200 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl text-black font-bold border-l-4 border-[#F7A400] pl-3">
              General Information
            </h3>

            <div>
              <label className="block text-[12px] font-bold text-black  mb-1">
                Post Title
              </label>
              <input
                type="text"
                value={title}
                placeholder="e.g. Scalable Design Systems"
                className="w-full bg-white border border-gray-300 p-3 rounded focus:ring-2 focus:ring-[#F7A400] outline-none"
                onChange={handleTitleChange}
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-black mb-1">
                Slug URL (Auto-generated)
              </label>
              <input
                type="text"
                value={url}
                placeholder="e.g. scalable-design-2026"
                className="w-full bg-gray-100 border border-gray-300 p-3 rounded text-sm outline-none font-mono"
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-black mb-1">
                Short Description
              </label>
              <textarea
                value={description}
                placeholder="Catchy summary..."
                className="w-full bg-white border border-gray-300 p-3 rounded text-sm outline-none resize-none"
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-black mb-1">
                Category
              </label>
              <select
                value={category}
                className="w-full bg-white border border-gray-300 p-3 rounded outline-none"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Ui/Ux Design">Ui/Ux Design</option>
                <option value="Web Development">Web Development</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Mobile Apps Development">
                  Mobile Apps Development
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-black mb-1">
                Featured Image {editingId && "(Optional)"}
              </label>
              <input
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#F7A400] file:text-white hover:file:bg-black cursor-pointer"
                onChange={(e) => setImage(e.target.files[0])}
                required={!editingId}
              />
            </div>
          </div>
        </div>

        {/* Right Content: Builder */}
        <div className="w-full lg:w-2/3 p-8 lg:p-12 space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-black flex items-center gap-3">
              <Layout className="text-[#F7A400]" /> Article Builder
            </h3>
            <button
              type="submit"
              className="hidden lg:flex items-center gap-2 bg-[#F7A400] text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
            >
              <Save size={18} /> {editingId ? "Update Changes" : "Publish Post"}
            </button>
          </div>

          <div className="space-y-10">
            {sections.map((section, sIndex) => (
              <div
                key={sIndex}
                className="relative bg-gray-50 p-6 rounded-xl border border-gray-100 group"
              >
                <button
                  type="button"
                  onClick={() => removeSection(sIndex)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                <div className="flex items-center gap-2 text-[11px] text-[#F7A400] tracking-tighter mb-4 font-black">
                  {section.type} Block
                </div>
                {section.type !== "list" ? (
                  <textarea
                    value={section.value}
                    className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium text-gray-800 placeholder-gray-300 resize-none"
                    rows={section.type === "heading" ? 1 : 4}
                    placeholder={`Write your ${section.type} here...`}
                    onChange={(e) =>
                      handleSectionChange(sIndex, "value", e.target.value)
                    }
                  />
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={section.value}
                      placeholder="List Title"
                      className="w-full bg-transparent border-b border-gray-200 p-2 font-bold text-lg outline-none"
                      onChange={(e) =>
                        handleSectionChange(sIndex, "value", e.target.value)
                      }
                    />
                    <div className="grid grid-cols-1 gap-3">
                      {section.items.map((item, iIndex) => (
                        <div key={iIndex} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={item}
                            placeholder="Point details..."
                            className="flex-1 bg-white border border-gray-200 p-2 rounded text-sm outline-none"
                            onChange={(e) =>
                              handleListItemChange(
                                sIndex,
                                iIndex,
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addListItem(sIndex)}
                      className="text-xs font-bold text-[#F7A400] hover:underline"
                    >
                      + Add point
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="sticky bottom-8 bg-white border border-gray-200 p-4 rounded-2xl shadow-2xl flex items-center justify-between z-10">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addSection("heading")}
                className="p-2 hover:bg-gray-100 rounded text-gray-600 text-sm font-medium"
              >
                Heading
              </button>
              <button
                type="button"
                onClick={() => addSection("text")}
                className="p-2 hover:bg-gray-100 rounded text-gray-600 text-sm font-medium"
              >
                Text
              </button>
              <button
                type="button"
                onClick={() => addSection("list")}
                className="p-2 hover:bg-gray-100 rounded text-gray-600 text-sm font-medium"
              >
                List
              </button>
            </div>
            <button
              type="submit"
              className="lg:hidden bg-[#F7A400] text-white px-4 py-2 rounded font-bold"
            >
              {editingId ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      </form>

      {/* --- BLOG HISTORY TABLE --- */}
      <div className="mx-8 mt-16 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800">
            Published Blog History
          </h3>
          <span className="bg-[#F7A400] text-white px-3 py-1 rounded-full text-xs font-bold">
            {blogs.length} Posts
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-[12px] font-bold text-black">
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Title & Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <img
                      src={fixImagePath(blog.image)}
                      alt=""
                      className="w-20 h-12 object-cover rounded shadow-sm border border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800 truncate max-w-xs">
                      {blog.title}
                    </div>
                    <div className="text-[10px] text-[#F7A400] font-bold ">
                      {blog.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              No blog posts found in history.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManager;
