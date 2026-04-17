import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import { Trash2, Edit, Save, X, PlusCircle, Briefcase, Loader2, Image as ImageIcon, BriefcaseBusiness, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

const IndustryAdd = () => {
  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    description: "",
    pages: "",
    growth: "",
    ceoName: "",
    ceoTitle: "",
    color: "#ffffff",
    imgBg: "#f0f0f0",
    link: "",
  });
  const [projectImg, setProjectImg] = useState(null);
  const [ceoImg, setCeoImg] = useState(null);

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 1. Fetch data
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/industries`);
      if (Array.isArray(res.data)) {
        setHistory(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setHistory(res.data.data);
      }
    } catch (err) {
      console.error("Data fetch error:", err.response?.data || err.message);
      toast.error("Failed to load projects history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 2. Add new card
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (projectImg) data.append("projectImg", projectImg);
    if (ceoImg) data.append("ceoImg", ceoImg);

    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`/api/industries`, data, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      toast.success("Project card added successfully!");
      fetchHistory();

      setFormData({
        title: "", heading: "", description: "", pages: "", growth: "",
        ceoName: "", ceoTitle: "", color: "#ffffff", imgBg: "#f0f0f0", link: "",
      });
      setProjectImg(null);
      setCeoImg(null);
      
      // Reset file inputs visually
      document.getElementById('projectImgInput').value = '';
      document.getElementById('ceoImgInput').value = '';

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Error adding project. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete function
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`/api/industries/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      toast.success("Project deleted successfully.");
      fetchHistory();
    } catch (err) {
      toast.error("Failed to delete project.");
    }
  };

  // 4. Edit modal controls
  const handleEditClick = (item) => {
    setEditingItem({ ...item });
    setIsEditModalOpen(true);
  };

  // 5. Update logic
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    const textFields = [
      "title", "heading", "description", "pages", "growth",
      "ceoName", "ceoTitle", "link", "color", "imgBg",
    ];

    textFields.forEach((field) => {
      data.append(field, editingItem[field] || "");
    });

    if (projectImg instanceof File) data.append("projectImg", projectImg);
    if (ceoImg instanceof File) data.append("ceoImg", ceoImg);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(`/api/industries/${editingItem._id}`, data, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      if (response.status === 200 || response.data.success) {
        toast.success("Project updated successfully!");
        setIsEditModalOpen(false);
        setEditingItem(null);
        setProjectImg(null);
        setCeoImg(null);
        fetchHistory();
      }
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      toast.error("Update failed. Please review your data.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#F7A400] outline-none text-sm text-gray-900 transition-colors shadow-sm";

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F7A400]/10 flex items-center justify-center">
              <BriefcaseBusiness className="text-[#F7A400]" size={16} />
            </div>
            Project & Industries Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit, and organize portfolio projects and industry case studies.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold rounded-md uppercase tracking-widest shadow-sm">
            v3.0 System
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="xl:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-[#F7A400]"></div>
             <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
               <PlusCircle size={16} className="text-[#F7A400]" /> Add New Project
             </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Project Title</label>
                  <input className={inputStyle} value={formData.title} placeholder="e.g. Fintech App" onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Main Heading</label>
                  <input className={inputStyle} value={formData.heading} placeholder="e.g. Revolutionizing Finance" onChange={(e) => setFormData({ ...formData, heading: e.target.value })} required />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Project Description</label>
                <textarea rows="3" className={`${inputStyle} resize-none`} value={formData.description} placeholder="Short overview..." onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Total Pages</label>
                  <input className={inputStyle} value={formData.pages} placeholder="e.g. 40+" onChange={(e) => setFormData({ ...formData, pages: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Growth Metric</label>
                  <input className={inputStyle} value={formData.growth} placeholder="e.g. 36%" onChange={(e) => setFormData({ ...formData, growth: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Card Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" className="w-8 h-8 rounded cursor-pointer border-0 p-0" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
                    <span className="text-xs font-mono font-semibold uppercase">{formData.color}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Image BG Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" className="w-8 h-8 rounded cursor-pointer border-0 p-0" value={formData.imgBg} onChange={(e) => setFormData({ ...formData, imgBg: e.target.value })} />
                    <span className="text-xs font-mono font-semibold uppercase">{formData.imgBg}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex flex-col gap-4">
                 <h3 className="text-xs font-bold text-blue-900 border-b border-blue-200 pb-2">MEDIA & PERSONNEL</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">Project Mockup / Image</label>
                      <input id="projectImgInput" type="file" onChange={(e) => setProjectImg(e.target.files[0])} className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">CEO Profile Picture</label>
                      <input id="ceoImgInput" type="file" onChange={(e) => setCeoImg(e.target.files[0])} className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700" />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">CEO Name</label>
                  <input className={inputStyle} value={formData.ceoName} placeholder="e.g. John Doe" onChange={(e) => setFormData({ ...formData, ceoName: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">CEO Title</label>
                  <input className={inputStyle} value={formData.ceoTitle} placeholder="e.g. Founder & CEO" onChange={(e) => setFormData({ ...formData, ceoTitle: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">External Link</label>
                <input className={inputStyle} value={formData.link} placeholder="https://behance.net/..." onChange={(e) => setFormData({ ...formData, link: e.target.value })} />
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F7A400] text-black font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-[#F7A400]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <PlusCircle size={18} />}
                {loading ? "Saving Project..." : "Add New Project Card"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: History Table */}
        <div className="xl:col-span-7">
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-gray-900"></div>
             
             <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
               <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Portfolio History</h2>
               <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{history.length} Entries</span>
             </div>

             <div className="overflow-x-auto min-h-[400px]">
                {history.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                        <th className="p-4 font-bold">Project Details</th>
                        <th className="p-4 font-bold text-center hidden sm:table-cell">Metrics</th>
                        <th className="p-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item) => (
                        <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm flex-shrink-0 flex items-center justify-center p-1">
                                <img
                                  src={`${(axios.defaults.baseURL || "")}${item.projectImg}`}
                                  className="w-full h-full object-contain rounded-md"
                                  alt="Mockup"
                                  onError={(e) => { e.target.src = "https://placehold.co/100x100?text=IMG"; }}
                                />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                                <p className="text-xs text-gray-500 truncate max-w-[200px] mt-0.5">{item.heading}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-center hidden sm:table-cell">
                            <div className="flex flex-col items-center justify-center gap-1">
                              {item.pages && <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">PG: {item.pages}</span>}
                              {item.growth && <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><TrendingUp size={10} /> {item.growth}</span>}
                            </div>
                          </td>
                          <td className="p-4 text-right">
                             <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditClick(item)} className="p-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm">
                                  <Edit size={16} />
                                </button>
                                <button onClick={() => {
                                  toast(
                                    (t) => (
                                      <div className="flex flex-col gap-3">
                                        <p className="text-sm font-medium">Delete <strong>{item.title}</strong>?</p>
                                        <div className="flex gap-2">
                                          <button className="bg-red-500 text-white px-3 py-1.5 rounded text-xs font-bold" onClick={() => { handleDelete(item._id); toast.dismiss(t.id); }}>Delete</button>
                                          <button className="bg-gray-200 text-black px-3 py-1.5 rounded text-xs font-bold" onClick={() => toast.dismiss(t.id)}>Cancel</button>
                                        </div>
                                      </div>
                                    ),
                                    { duration: Infinity, position: 'top-center' }
                                  );
                                }} className="p-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm">
                                  <Trash2 size={16} />
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6">
                    <Briefcase className="text-gray-300 mb-3" size={48} />
                    <p className="text-gray-500 font-medium text-sm">No portfolio projects found.</p>
                    <p className="text-xs text-gray-400 mt-1">Use the form on the left to add a new project.</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Modern Edit Modal */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 outline-none">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <div className="sticky top-0 bg-white/90 backdrop-blur-md px-8 py-5 border-b border-gray-100 flex justify-between items-center z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Edit Project: {editingItem.title}</h2>
                <p className="text-xs text-gray-500 mt-1">Update fields below to modify the portfolio entry.</p>
              </div>
              <button
                onClick={() => { setIsEditModalOpen(false); setEditingItem(null); }}
                className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Project Title</label>
                  <input className={inputStyle} value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Main Heading</label>
                  <input className={inputStyle} value={editingItem.heading} onChange={(e) => setEditingItem({ ...editingItem, heading: e.target.value })} required />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Description</label>
                  <textarea rows="3" className={`${inputStyle} resize-none`} value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Pages</label>
                  <input className={inputStyle} value={editingItem.pages} onChange={(e) => setEditingItem({ ...editingItem, pages: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Growth Metric</label>
                  <input className={inputStyle} value={editingItem.growth} onChange={(e) => setEditingItem({ ...editingItem, growth: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">CEO Name</label>
                        <input className={inputStyle} value={editingItem.ceoName} onChange={(e) => setEditingItem({ ...editingItem, ceoName: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">CEO Title</label>
                        <input className={inputStyle} value={editingItem.ceoTitle} onChange={(e) => setEditingItem({ ...editingItem, ceoTitle: e.target.value })} />
                    </div>
                </div>

                <div>
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">External Link</label>
                   <input className={inputStyle} value={editingItem.link || ""} onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })} />
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-orange-700 mb-2 block">Update Card Background</label>
                    <div className="flex gap-4">
                        <input type="color" className="w-10 h-10 rounded cursor-pointer border-0 p-0" value={editingItem.color} onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })} />
                        <input type="color" className="w-10 h-10 rounded cursor-pointer border-0 p-0" value={editingItem.imgBg} onChange={(e) => setEditingItem({ ...editingItem, imgBg: e.target.value })} />
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 bg-blue-50/50 p-6 rounded-lg border border-blue-100 mt-2">
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-4 border-b border-blue-200 pb-2">Replace Images (Optional)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">New Project Image</label>
                        <input type="file" onChange={(e) => setProjectImg(e.target.files[0])} className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-white file:border file:border-gray-200 file:text-gray-700 file:cursor-pointer hover:file:bg-gray-50" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1">New CEO Image</label>
                        <input type="file" onChange={(e) => setCeoImg(e.target.files[0])} className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-white file:border file:border-gray-200 file:text-gray-700 file:cursor-pointer hover:file:bg-gray-50" />
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => { setIsEditModalOpen(false); setEditingItem(null); }}
                  className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 bg-[#F7A400] text-black font-bold rounded-lg shadow-md shadow-[#F7A400]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryAdd;
