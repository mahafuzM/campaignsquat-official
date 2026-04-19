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
  Link,
  MousePointerClick,
  Sparkles
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
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
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
      toast.success("Image selected");
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
        toast.success("Product Updated!");
      } else {
        await axios.post("/api/products/add", data);
        toast.success("Product Added!");
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error("Action failed.");
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
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
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

  const inputClass = "w-full border border-gray-200 outline-none focus:border-[#F7A400] transition-colors bg-gray-50 focus:bg-white text-gray-900 shadow-sm text-sm p-2 rounded";
  const labelClass = "text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-6 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7A400]/10 flex items-center justify-center shrink-0 border border-[#F7A400]/20">
            <Package className="text-[#F7A400]" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Product Manager</h1>
            <p className="text-xs text-gray-500 mt-1">{isEditing ? `Editing: ${formData.name}` : "Product catalog & details"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          {isEditing && (
            <button type="button" onClick={resetForm} className="px-3 py-1.5 rounded text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1">
              <X size={14} /> Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-1.5 bg-[#F7A400] text-black px-4 py-1.5 rounded font-bold text-xs hover:bg-[#e59800] transition-colors shadow-sm disabled:opacity-50 border border-transparent"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isEditing ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Setup */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#F7A400]" />
            <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Core Product Setup</h3>
            
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Product Name</label>
                <input type="text" className={inputClass} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. ERP System" required />
              </div>
              
              <div>
                <label className={labelClass}>Short Description</label>
                <textarea className={`${inputClass} resize-none h-16`} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Brief overview..." required />
              </div>

              <div>
                <label className={labelClass}>Thumbnail Image</label>
                <div className="relative group border border-dashed border-gray-300 rounded bg-gray-50 hover:border-[#F7A400] transition-colors cursor-pointer overflow-hidden p-2">
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleImageChange} required={!isEditing} />
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-24 object-cover rounded-sm border border-gray-200" />
                  ) : (
                    <div className="h-24 flex flex-col items-center justify-center text-center">
                      <Upload className="text-gray-400 mb-1" size={20} />
                      <span className="text-[10px] text-gray-500 font-medium">Click to upload</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className={labelClass}>Waitlist/Btn Text</label>
                  <input type="text" className={inputClass} value={formData.buttonText} onChange={(e) => setFormData({...formData, buttonText: e.target.value})} placeholder="Get Demo" />
                </div>
                <div>
                  <label className={labelClass}>Button URL</label>
                  <input type="text" className={inputClass} value={formData.buttonUrl} onChange={(e) => setFormData({...formData, buttonUrl: e.target.value})} placeholder="/contact" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Col: Builder */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-gray-50 pb-3">
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layout size={14} className="text-[#F7A400]" /> Content Blocks
              </h3>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 p-1 rounded-md">
                {[ { type: "heading", icon: FileText, label: "H3" }, { type: "text", icon: Type, label: "Text" }, { type: "list", icon: ListIcon, label: "List" } ].map(({ type, icon: Icon, label }) => (
                  <button key={type} type="button" onClick={() => addSection(type)} className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 shadow-sm rounded text-[10px] font-bold text-gray-600 hover:text-[#F7A400] transition-colors">
                    <Icon size={12} /> {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {sections.length === 0 ? (
                <div className="py-8 text-center bg-gray-50 border border-dashed border-gray-200 rounded text-gray-400">
                  <Sparkles size={24} className="mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No content blocks. Build the detailed view here.</p>
                </div>
              ) : (
                sections.map((section, sIndex) => (
                  <div key={sIndex} className="bg-gray-50 border border-gray-100 rounded-md p-3 relative group">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${section.type === 'heading' ? 'bg-amber-100 text-amber-700' : section.type === 'text' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {section.type} block
                      </span>
                      <button type="button" onClick={() => removeSection(sIndex)} className="text-gray-400 hover:text-red-500 bg-white border border-gray-200 rounded p-1 shadow-sm">
                        <Trash2 size={12} />
                      </button>
                    </div>

                    {section.type !== "list" ? (
                      <textarea
                        value={section.value}
                        onChange={(e) => handleSectionChange(sIndex, "value", e.target.value)}
                        placeholder={`Input your ${section.type}...`}
                        className={`w-full outline-none border border-gray-200 p-2 text-sm rounded bg-white focus:border-[#F7A400] min-h-[40px] resize-y ${section.type === 'heading' ? 'font-bold' : ''}`}
                        rows={section.type === 'heading' ? 1 : 3}
                      />
                    ) : (
                      <div className="space-y-2 bg-white border border-gray-200 p-2 rounded">
                        <input type="text" value={section.value} onChange={(e) => handleSectionChange(sIndex, "value", e.target.value)} placeholder="List Title (Optional)" className="w-full text-xs font-bold border-b border-gray-100 pb-1 mb-1 outline-none focus:border-[#F7A400]" />
                        {section.items.map((item, iIndex) => (
                          <div key={iIndex} className="flex items-center gap-1.5">
                            <div className="w-1 h-1 bg-[#F7A400] rounded-full shrink-0"/>
                            <input type="text" value={item} onChange={(e) => handleListItemChange(sIndex, iIndex, e.target.value)} placeholder={`Item ${iIndex + 1}`} className="flex-1 text-xs outline-none bg-gray-50 border border-gray-100 p-1.5 rounded focus:border-[#F7A400] transition-colors" />
                            <button type="button" onClick={() => removeListItem(sIndex, iIndex)} className="text-gray-300 hover:text-red-500">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addListItem(sIndex)} className="text-[10px] text-[#F7A400] font-bold mt-1 flex items-center gap-0.5 hover:underline decoration-[#F7A400]">
                          <Plus size={10} /> Add Item
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Active Products List (Compact Table) */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
            <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Published Products Registry</h3>
            
            {fetching ? (
              <div className="py-10 text-center"><Loader2 size={20} className="animate-spin text-[#F7A400] mx-auto mb-2" /><span className="text-xs text-gray-500 font-medium">Loading...</span></div>
            ) : products.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">Database empty.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-50/80 border-y border-gray-100">
                      <th className="py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-full">Product Entry</th>
                      <th className="py-2.5 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-gray-50/50 group transition-colors">
                        <td className="py-2 px-3 align-middle">
                          <div className="w-9 h-9 bg-gray-100 rounded overflow-hidden border border-gray-200 flex items-center justify-center shrink-0">
                            {p.image ? <img src={getImgUrl(p.image)} alt="IMG" className="w-full h-full object-cover" /> : <Package size={14} className="text-gray-300"/>}
                          </div>
                        </td>
                        <td className="py-2 px-3 align-middle">
                          <div className="text-xs font-bold text-gray-900">{p.name}</div>
                          <div className="text-[10px] text-gray-500 truncate w-[200px] sm:w-[300px]">{p.description}</div>
                        </td>
                        <td className="py-2 px-3 align-middle text-right">
                          <div className="flex justify-end gap-1.5">
                            <button onClick={() => handleEdit(p)} className="p-1.5 border border-gray-200 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded transition-colors shadow-sm bg-white" title="Edit">
                              <Edit3 size={14} />
                            </button>
                            <button onClick={() => handleDelete(p._id)} className="p-1.5 border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded transition-colors shadow-sm bg-white" title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductManager;
