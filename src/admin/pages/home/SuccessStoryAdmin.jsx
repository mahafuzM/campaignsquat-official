import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { 
  Trash2, 
  Plus, 
  Save, 
  UploadCloud,
  LayoutGrid,
  Quote,
  Clock,
  Star,
  Video,
  User,
  Briefcase,
  Type
} from "lucide-react";

const SuccessStoryAdmin = () => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
    sectionBg: "#ffffff",
    accentColor: "#f7a400",
    stories: [],
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // 1. Fetch Data
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/success-story");
      if (res.data) {
        setFormData({
          sectionTitle: res.data.sectionTitle || "",
          sectionSubtitle: res.data.sectionSubtitle || "",
          sectionBg: res.data.sectionBg || "#ffffff",
          accentColor: res.data.accentColor || "#f7a400",
          stories: res.data.stories || [],
        });
        setHistory(res.data.history || []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load section data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Image Upload Handler (Auto sync)
  const handleImageUpload = async (index, file) => {
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append("file", file);
    setLoading(true);
    
    try {
      const res = await axios.post("/api/upload", uploadData);
      const updatedStories = [...formData.stories];

      // Save valid URL
      updatedStories[index].image = res.data.url;

      const newFormData = { ...formData, stories: updatedStories };
      setFormData(newFormData);

      // Auto save on upload
      await axios.post("/api/success-story/update", newFormData);
      toast.success("Image uploaded & saved successfully!");
    } catch (err) {
      toast.error("Image upload failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Add New Story
  const addStory = () => {
    setFormData({
      ...formData,
      stories: [
        ...formData.stories,
        {
          name: "",
          role: "",
          company: "",
          feedback: "",
          image: "",
          videoUrl: "",
          rating: 5,
        },
      ],
    });
    toast.success("New success story added.");
  };

  // 4. Delete & Sync
  const deleteStory = async (index) => {
    toast((t) => (
      <div>
        <p className="text-sm font-medium text-gray-900 mb-3">
          Are you sure you want to delete this success story?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const updatedStories = formData.stories.filter((_, i) => i !== index);
              const updatedData = { ...formData, stories: updatedStories };
              setFormData(updatedData);
              setLoading(true);
              
              try {
                await axios.post("/api/success-story/update", updatedData);
                toast.success("Story deleted and synced!");
                fetchData(); 
              } catch (err) {
                toast.error("Failed to delete from server.");
                fetchData();
              } finally {
                setLoading(false);
              }
            }}
            className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: 4000 });
  };

  // 5. Manual Sync
  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await axios.post("/api/success-story/update", formData);
      if (res.data) {
        setHistory(res.data.history || []);
        toast.success("All data synced to MongoDB successfully!");
      }
    } catch (err) {
      toast.error("Sync failed.");
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  // Render Image Helper
  const getFullImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const cleanPath = path.replace(/^\//, "");
    return `${axios.defaults.baseURL}/${cleanPath}`;
  };

  const updateField = (index, field, value) => {
    const updated = [...formData.stories];
    updated[index][field] = value;
    setFormData({ ...formData, stories: updated });
  };

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3">
            Success Stories Configuration
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your customer testimonials, reviews, and success metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={syncing || loading}
            className="bg-[#F7A400] text-white hover:bg-[#d98f00] text-[14px] font-medium py-2 px-6 rounded-md transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
          >
            {syncing ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {syncing ? "Syncing..." : "Sync Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Top Control Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
             <LayoutGrid className="w-5 h-5 text-[#F7A400]" />
             <h2 className="text-lg font-semibold text-gray-900">
               Section Theme & Content
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Type className="w-4 h-4 text-gray-400" />
                Section Title
              </label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] block p-2.5 transition-all outline-none"
                value={formData.sectionTitle}
                onChange={(e) =>
                  setFormData({ ...formData, sectionTitle: e.target.value })
                }
                placeholder="e.g. Clients Testimonial"
              />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Type className="w-4 h-4 text-gray-400" />
                Section Subtitle
              </label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] block p-2.5 transition-all outline-none"
                value={formData.sectionSubtitle}
                onChange={(e) =>
                  setFormData({ ...formData, sectionSubtitle: e.target.value })
                }
                placeholder="e.g. What people say about us"
              />
            </div>
          </div>
        </div>

        {/* Stories Management */}
        <div>
           <div className="flex items-center gap-2 mb-6">
             <Quote className="w-5 h-5 text-[#F7A400]" />
             <h2 className="text-lg font-semibold text-gray-900">
               Manage Success Stories
             </h2>
             <span className="ml-auto bg-[#F7A400]/10 text-[#F7A400] text-xs px-3 py-1 rounded-full font-medium">
                Total: {formData.stories.length}
             </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {formData.stories.map((story, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50">
                  <span className="font-semibold text-sm text-gray-500 uppercase tracking-wider flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[#F7A400]"></span>
                     Testimonial #{index + 1}
                  </span>
                  <button
                    onClick={() => deleteStory(index)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                    title="Delete Story"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Image Section */}
                  <div className="lg:col-span-3">
                    <label className="text-xs font-semibold text-gray-600 block mb-2">
                      Client Photo
                    </label>
                    <div className="relative h-44 w-full bg-gray-50 border-2 border-dashed border-gray-200 hover:border-gray-300 rounded-md overflow-hidden flex items-center justify-center group/img cursor-pointer transition-colors">
                      {story.image ? (
                        <img
                          src={getFullImageUrl(story.image)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          alt="Client"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = '<span class="text-gray-400 text-xs">Error Loading</span>';
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-400">
                          <UploadCloud size={28} className="mb-2" />
                          <span className="text-[10px] font-medium uppercase tracking-wider">
                            Upload Photo
                          </span>
                        </div>
                      )}
                      
                      {/* Overlay for uploading */}
                      {loading && !story.image && (
                         <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-sm z-10">
                           <span className="w-6 h-6 border-2 border-[#F7A400]/30 border-t-[#F7A400] rounded-full animate-spin" />
                         </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-0"
                        onChange={(e) =>
                          handleImageUpload(index, e.target.files[0])
                        }
                      />
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="lg:col-span-9 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                          <User size={14} /> Client Name
                        </label>
                        <input
                          className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none"
                          value={story.name}
                          onChange={(e) => updateField(index, "name", e.target.value)}
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      
                      {/* Role */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                          <Briefcase size={14} /> Job Title / Role
                        </label>
                        <input
                          className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none"
                          value={story.role}
                          onChange={(e) => updateField(index, "role", e.target.value)}
                          placeholder="e.g. CEO"
                        />
                      </div>

                      {/* Company */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                          <LayoutGrid size={14} /> Company
                        </label>
                        <input
                          className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none"
                          value={story.company}
                          onChange={(e) => updateField(index, "company", e.target.value)}
                          placeholder="e.g. TechCorp"
                        />
                      </div>

                      {/* Video URL */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                          <Video size={14} /> Video Link (Optional)
                        </label>
                        <input
                          className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none"
                          value={story.videoUrl}
                          onChange={(e) => updateField(index, "videoUrl", e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                        <Quote size={14} /> Testimonial Content
                      </label>
                      <textarea
                        className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none resize-none h-24"
                        value={story.feedback}
                        onChange={(e) => updateField(index, "feedback", e.target.value)}
                        placeholder="Write the success story or feedback here..."
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-md border border-gray-100 inline-flex">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                        <Star size={14} className="text-[#F7A400] fill-current" /> Rating
                      </label>
                      <select 
                        className="bg-white border border-gray-200 text-gray-900 text-sm font-medium rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-1.5 outline-none cursor-pointer"
                        value={story.rating}
                        onChange={(e) => updateField(index, "rating", parseInt(e.target.value) || 5)}
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} Stars</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addStory}
              className="bg-white border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center py-10 hover:border-[#F7A400]/50 hover:bg-[#F7A400]/5 hover:text-[#F7A400] text-gray-400 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center shadow-sm mb-3 transition-colors">
                 <Plus size={20} className="text-gray-400 group-hover:text-[#F7A400]" />
              </div>
              <span className="font-semibold uppercase tracking-wider text-sm group-hover:text-[#F7A400]">
                Add New Testimonial
              </span>
            </button>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm mt-8">
          <h3 className="text-gray-900 font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            System Update History
          </h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {history.length > 0 ? (
              history.map((log, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center bg-gray-50/50 p-3.5 rounded-md border border-gray-100 text-xs text-gray-600 gap-2 sm:gap-4"
                >
                  <span className="text-[#F7A400] font-semibold whitespace-nowrap">
                    {new Date(log.date).toLocaleDateString()} at {new Date(log.date).toLocaleTimeString()}
                  </span>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <span className="font-medium text-gray-800">
                    {log.action}
                  </span>
                </div>
              ))
            ) : (
               <div className="text-center py-8">
                 <p className="text-sm text-gray-400">No logs found yet.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryAdmin;
