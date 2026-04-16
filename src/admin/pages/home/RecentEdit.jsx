import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, Save, UploadCloud } from "lucide-react";

const RecentEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    sectionBg: "#02050A",
    projects: [],
  });
  const [history, setHistory] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // ✅ Dynamic URL
      const res = await axios.get("/api/recent-projects");
      if (res.data) {
        setFormData({
          title: res.data.title || "",
          subtitle: res.data.subtitle || "",
          sectionBg: res.data.sectionBg || "#02050A",
          projects: res.data.projects || [],
        });
        setHistory(res.data.history || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    setUploading(true);
    try {
      // ✅ Dynamic URL for Upload
      const res = await axios.post("/api/upload", uploadData);
      const updatedProjects = [...formData.projects];
      updatedProjects[index].image = res.data.url;
      setFormData({ ...formData, projects: updatedProjects });
    } catch (err) {
      alert("Image upload failed!");
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
  };

  const deleteProject = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project card?"
    );

    if (confirmDelete) {
      const updatedProjects = formData.projects.filter((_, i) => i !== index);
      const newFormData = { ...formData, projects: updatedProjects };

      setFormData(newFormData);

      try {
        // ✅ Dynamic URL for Delete/Update
        const res = await axios.post("/api/recent-projects/update", newFormData);
        if (res.data) {
          setHistory(res.data.history || []);
          alert("✅ Project deleted and synced with database!");
        }
      } catch (err) {
        console.error("Delete sync failed:", err);
        alert("❌ Failed to delete from server!");
      }
    }
  };

  const handleSync = async () => {
    try {
      // ✅ Dynamic URL for Sync
      const res = await axios.post("/api/recent-projects/update", formData);
      if (res.data) {
        setFormData({
          title: res.data.title,
          subtitle: res.data.subtitle,
          sectionBg: res.data.sectionBg,
          projects: res.data.projects,
        });
        setHistory(res.data.history || []);
        alert("✅ Saved & History Updated!");
      }
    } catch (err) {
      alert("❌ Sync Failed!");
      console.error(err);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen text-black font-poppins w-full">
      <div className="w-full space-y-8">
        {/* Header Control */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-black text-2xl font-bold mb-6 tracking-wider">
            Main Content Control
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="bg-white border border-gray-300 p-3 rounded text-black outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Section Title"
            />
            <input
              className="bg-white border border-gray-300 p-3 rounded text-black outline-none"
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              placeholder="Subtitle"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formData.projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-lg border border-gray-200 relative shadow-sm"
            >
              <div className="flex justify-between items-center mb-4 text-black font-bold border-b border-gray-200 pb-2">
                <span>PROJECT CARD #{index + 1}</span>
                <button
                  onClick={() => deleteProject(index)}
                  className="text-red-600 hover:scale-110 transition p-1"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 ">
                    Image (Click to Edit/Upload)
                  </label>
                  <div className="relative h-32 w-full bg-white border-2 border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center group cursor-pointer">
                    {project.image ? (
                      <img
                        // ✅ Dynamic BaseURL and Slash Handling
                        src={
                          project.image.startsWith("http")
                            ? project.image
                            : `${axios.defaults.baseURL}${project.image.startsWith("/") ? "" : "/"}${project.image}`
                        }
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <UploadCloud size={32} />
                        <span className="text-[10px] mt-1 font-bold ">
                          Upload from Device
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleImageUpload(index, e.target.files[0])
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500">
                    Edit Vimeo Video ID
                  </label>
                  <input
                    className="w-full bg-white border border-gray-300 p-2 rounded text-sm text-black font-mono"
                    value={project.videoId}
                    onChange={(e) => {
                      const updated = [...formData.projects];
                      updated[index].videoId = e.target.value;
                      setFormData({ ...formData, projects: updated });
                    }}
                    placeholder="e.g. 1153559168"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">
                    SEO Alt Text
                  </label>
                  <input
                    className="w-full bg-white border border-gray-300 p-2 rounded text-sm text-black"
                    value={project.alt}
                    onChange={(e) => {
                      const updated = [...formData.projects];
                      updated[index].alt = e.target.value;
                      setFormData({ ...formData, projects: updated });
                    }}
                    placeholder="Project Description"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addProject}
            className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-10 hover:border-black hover:bg-gray-50 transition-all min-h-[250px]"
          >
            <Plus size={48} className="text-gray-400" />
            <span className="mt-2 font-bold text-gray-500 uppercase text-xs">
              Add New Project
            </span>
          </button>
        </div>

        {/* Global Save Button */}
        <button
          onClick={handleSync}
          className="bg-[#F7A400] w-full justify-center text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2"
        >
          <Save size={24} />{" "}
          {uploading ? "Uploading..." : "Sync All Changes to MongoDB"}
        </button>

        {/* History Log */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-black font-black mb-4 uppercase tracking-tighter text-sm border-b border-black pb-2 inline-block">
            System History & Logs
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto mt-4 text-left">
            {history.length > 0 ? (
              history.map((log, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200 text-[11px]"
                >
                  <span className="text-blue-700 font-bold">
                    [{new Date(log.date).toLocaleTimeString()}]
                  </span>
                  <span className="flex-grow ml-4 text-black uppercase font-bold">
                    {log.action}
                  </span>
                  <span className="text-gray-500 italic font-mono">
                    {new Date(log.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">No logs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentEdit;