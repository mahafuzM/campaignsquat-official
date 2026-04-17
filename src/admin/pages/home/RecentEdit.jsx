import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { 
  Trash2, 
  Plus, 
  Save, 
  UploadCloud, 
  LayoutGrid, 
  Video, 
  Tag, 
  Activity, 
  FileText,
  Clock
} from "lucide-react";

const RecentEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    sectionBg: "#ffffff",
    projects: [],
  });
  const [history, setHistory] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/recent-projects");
      if (res.data) {
        setFormData({
          title: res.data.title || "",
          subtitle: res.data.subtitle || "",
          sectionBg: res.data.sectionBg || "#ffffff",
          projects: res.data.projects || [],
        });
        setHistory(res.data.history || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load section data.");
    }
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post("/api/upload", uploadData);
      const updatedProjects = [...formData.projects];
      updatedProjects[index].image = res.data.url;
      setFormData({ ...formData, projects: updatedProjects });
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Image upload failed.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { videoId: "", alt: "New Project", image: "" },
      ],
    });
    toast.success("New project card added.");
  };

  const deleteProject = async (index) => {
    toast((t) => (
      <div>
        <p className="text-sm font-medium text-gray-900 mb-3">
          Are you sure you want to delete this project card?
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
              const updatedProjects = formData.projects.filter((_, i) => i !== index);
              const newFormData = { ...formData, projects: updatedProjects };
              setFormData(newFormData);
              
              try {
                const res = await axios.post("/api/recent-projects/update", newFormData);
                if (res.data) {
                  setHistory(res.data.history || []);
                  toast.success("Project deleted and synced!");
                }
              } catch (err) {
                console.error("Delete sync failed:", err);
                toast.error("Failed to delete from server.");
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

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await axios.post("/api/recent-projects/update", formData);
      if (res.data) {
        setFormData({
          title: res.data.title,
          subtitle: res.data.subtitle,
          sectionBg: res.data.sectionBg,
          projects: res.data.projects,
        });
        setHistory(res.data.history || []);
        toast.success("All changes synced with database successfully!");
      }
    } catch (err) {
      toast.error("Sync failed.");
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3">
            Recent Projects Configuration
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your latest case studies and Vimeo integrations shown on the frontend.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={syncing || uploading}
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
               Main Content Control
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-gray-400" />
                Section Title
              </label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] block p-2.5 transition-all outline-none"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. LATEST WORKS"
              />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Tag className="w-4 h-4 text-gray-400" />
                Subtitle
              </label>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] block p-2.5 transition-all outline-none"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                placeholder="e.g. Check out our recent projects"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div>
           <div className="flex items-center gap-2 mb-6">
             <Activity className="w-5 h-5 text-[#F7A400]" />
             <h2 className="text-lg font-semibold text-gray-900">
               Projects Grid
             </h2>
             <span className="ml-auto bg-[#F7A400]/10 text-[#F7A400] text-xs px-3 py-1 rounded-full font-medium">
                Total: {formData.projects.length}
             </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow group flex flex-col"
              >
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50">
                  <span className="font-semibold text-sm text-gray-500 uppercase tracking-wider flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[#F7A400]"></span>
                     Project Card #{index + 1}
                  </span>
                  <button
                    onClick={() => deleteProject(index)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-5 flex-grow">
                  {/* Image UI */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 block">
                      Thumbnail Image
                    </label>
                    <div className="relative h-40 w-full bg-gray-50 border-2 border-dashed border-gray-200 hover:border-gray-300 rounded-md overflow-hidden flex items-center justify-center group/img cursor-pointer transition-colors">
                      {project.image ? (
                        <img
                          src={
                            project.image.startsWith("http")
                              ? project.image
                              : `${axios.defaults.baseURL}${project.image.startsWith("/") ? "" : "/"}${project.image}`
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          alt="Preview"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-400">
                          <UploadCloud size={28} className="mb-2" />
                          <span className="text-[10px] font-medium uppercase tracking-wider">
                            Upload Cover Image
                          </span>
                        </div>
                      )}
                      
                      {/* Overlay for uploading */}
                      {uploading && (
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

                  {/* Video ID */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                      <Video size={14} /> Vimeo Video ID
                    </label>
                    <input
                      className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none font-mono"
                      value={project.videoId}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[index].videoId = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      placeholder="e.g. 1153559168"
                    />
                  </div>

                  {/* ALT Text */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase">
                      <Tag size={14} /> SEO Alt Text
                    </label>
                    <input
                      className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none"
                      value={project.alt}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[index].alt = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      placeholder="Describe the image for SEO..."
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addProject}
              className="bg-white border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center p-10 hover:border-[#F7A400]/50 hover:bg-[#F7A400]/5 hover:text-[#F7A400] text-gray-400 transition-all min-h-[350px] group"
            >
              <div className="w-14 h-14 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center shadow-sm mb-4 transition-colors">
                 <Plus size={24} className="text-gray-400 group-hover:text-[#F7A400]" />
              </div>
              <span className="font-semibold uppercase tracking-wider text-sm group-hover:text-[#F7A400]">
                Add New Project
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

export default RecentEdit;