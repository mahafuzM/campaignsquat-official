import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import {
  Layout,
  Save,
  Trash2,
  Edit3,
  Package,
  Upload,
  Type,
  List as ListIcon,
  FileText,
  X,
  Plus,
  Loader2,
  Sparkles,
  Link,
  MousePointerClick,
} from "lucide-react";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    buttonText: "",
    buttonUrl: "",
    image: null,
  });

  const [sections, setSections] = useState([]);

  const getImgUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return cleanPath;
  };

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const res = await axios.get("/api/products/all");
      const actualData = Array.isArray(res.data) ? res.data : res.data.data || [];
      setProducts(actualData);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const addSection = (type) => {
    const newSection = type === "list" ? { type, value: "", items: [""] } : { type, value: "" };
    setSections([...sections, newSection]);
  };

  const removeSection = (index) => setSections(sections.filter((_, i) => i !== index));

  const handleSectionChange = (index, field, value) => {
    const s = [...sections];
    s[index][field] = value;
    setSections(s);
  };

  const handleListItemChange = (sIndex, iIndex, value) => {
    const s = [...sections];
    s[sIndex].items[iIndex] = value;
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewUrl(URL.createObjectURL(file));
      toast.success("Image selected! ✅");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { toast.error("Product name is required!"); return; }
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("buttonText", formData.buttonText || "Get The Product");
    data.append("buttonUrl", formData.buttonUrl || "/book-meeting");
    data.append("contentSections", JSON.stringify(sections));
    if (formData.image) data.append("image", formData.image);

    try {
      if (isEditing) {
        await axios.put(`/api/products/${currentId}`, data);
        toast.success("Product Updated! ✅");
      } else {
        await axios.post("/api/products/add", data);
        toast.success("Product Added! 🚀");
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error("Action failed! Check console for errors. ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      buttonText: product.buttonText || "",
      buttonUrl: product.buttonUrl || "",
      image: null,
    });
    setSections(product.contentSections || []);
    setPreviewUrl(getImgUrl(product.image));
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Editing mode enabled", { icon: "📝" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product deleted! 🗑️");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Delete failed!");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", buttonText: "", buttonUrl: "", image: null });
    setSections([]);
    setPreviewUrl(null);
    setIsEditing(false);
    setCurrentId(null);
  };

  const inputClass = "w-full bg-gray-50/50 border border-gray-200 p-3 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-[#F7A400]/20 transition-all text-sm";
  const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block";

  return (
    <div className="min-h-screen bg-gray-50/30 font-poppins pb-20">

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#F7A400]/10 p-2 rounded-md">
            <Package className="text-[#F7A400]" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Product Manager</h1>
            <p className="text-xs text-gray-400">{isEditing ? `Editing: ${formData.name}` : "Add a new product listing"}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {isEditing && (
            <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-md font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-600">
              <X size={16} /> Cancel
            </button>
          )}
          <button
            type="submit"
            form="product-form"
            disabled={loading}
            className="flex items-center gap-2 bg-[#F7A400] text-white px-7 py-2.5 rounded-md font-bold text-sm hover:bg-[#d98f00] transition-all shadow-sm disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? "Processing..." : isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 pt-8">
        <form id="product-form" onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Sidebar: Product Info */}
            <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pb-3 border-b border-gray-100 mb-6">
                  Product Info
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Product Name</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.name}
                      placeholder="e.g. Digital Marketing Toolkit"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Short Description</label>
                    <textarea
                      className={`${inputClass} resize-none h-24`}
                      value={formData.description}
                      placeholder="Describe this product briefly..."
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Product Image {isEditing && "(Optional)"}</label>
                    <div className="relative group border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/30 hover:border-[#F7A400] transition-all cursor-pointer overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={handleImageChange}
                        required={!isEditing}
                      />
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover" />
                      ) : (
                        <div className="py-8 text-center">
                          <Upload className="mx-auto text-gray-300 mb-2" size={28} />
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Upload Product Image</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}><MousePointerClick size={10} className="inline mr-1" />Button Text</label>
                      <input type="text" placeholder="Buy Now" className={inputClass} value={formData.buttonText}
                        onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })} />
                    </div>
                    <div>
                      <label className={labelClass}><Link size={10} className="inline mr-1" />Button URL</label>
                      <input type="text" placeholder="/order" className={inputClass} value={formData.buttonUrl}
                        onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })} />
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right: Content Builder */}
            <main className="flex-grow space-y-4">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Layout size={18} className="text-[#F7A400]" /> Content Builder
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Build rich product description blocks</p>
                  </div>
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
                    <div key={sIndex} className="group relative bg-gray-50/50 p-5 rounded-lg border border-gray-100 hover:border-[#F7A400]/30 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          section.type === "heading" ? "text-[#F7A400]" :
                          section.type === "text" ? "text-blue-500" : "text-green-600"
                        }`}>
                          {section.type === "heading" ? "📌 Heading" : section.type === "text" ? "✏️ Text Block" : "📋 Bullet List"}
                        </span>
                        <button type="button" onClick={() => removeSection(sIndex)} className="p-1 text-gray-300 hover:text-red-500 transition-colors">
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
                                <button type="button" onClick={() => removeListItem(sIndex, iIndex)} className="text-gray-200 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all">
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button type="button" onClick={() => addListItem(sIndex)} className="text-xs font-bold text-[#F7A400] hover:underline flex items-center gap-1 mt-2">
                            <Plus size={12} /> Add point
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {sections.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-lg">
                      <Sparkles className="mx-auto text-gray-200 mb-3" size={36} strokeWidth={1} />
                      <p className="text-gray-400 text-sm">Add content blocks to build your product description</p>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </form>

        {/* Products Table */}
        <div className="mt-10 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Live Products</h3>
              <p className="text-xs text-gray-400 mt-0.5">All published product listings</p>
            </div>
            <span className="bg-[#F7A400]/10 text-[#F7A400] border border-[#F7A400]/20 px-3 py-1 rounded-full text-xs font-bold">
              {products.length} Products
            </span>
          </div>

          {fetching ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="animate-spin mb-2" size={28} />
              <p className="text-xs font-medium uppercase tracking-widest">Loading products...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Thumbnail</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest">Product Details</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black text-gray-400 tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center">
                        {p.image ? (
                          <img src={getImgUrl(p.image)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={p.name} />
                        ) : (
                          <Package size={20} className="text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{p.name}</div>
                      <div className="text-xs text-gray-400 mt-1 line-clamp-1">{p.description}</div>
                      {p.buttonText && (
                        <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-[#F7A400] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                          <MousePointerClick size={9} /> {p.buttonText}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => handleEdit(p)} className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                          <Edit3 size={13} /> Edit
                        </button>
                        <button onClick={() => handleDelete(p._id)} className="flex items-center gap-1.5 bg-red-50 text-red-500 px-3 py-1.5 rounded-md font-bold text-xs hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {products.length === 0 && !fetching && (
            <div className="p-20 text-center border-t border-gray-50">
              <Package className="mx-auto text-gray-200 mb-3" size={40} strokeWidth={1} />
              <p className="text-gray-400 text-sm italic">No products listed yet. Add your first product above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
