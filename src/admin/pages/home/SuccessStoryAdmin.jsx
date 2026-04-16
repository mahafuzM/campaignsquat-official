import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, Save, UploadCloud } from "lucide-react";

// ✅ Dynamic Base URL - যা লোকাল এবং সার্ভার দুই জায়গাতেই কাজ করবে
const BASE_URL =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

axios.defaults.baseURL = BASE_URL;

const SuccessStoryAdmin = () => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
    sectionBg: "#0A0A0A",
    accentColor: "#f7a400",
    stories: [],
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // ১. ডেটা ফেচ করা
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/success-story");
      if (res.data) {
        setFormData({
          sectionTitle: res.data.sectionTitle || "",
          sectionSubtitle: res.data.sectionSubtitle || "",
          sectionBg: res.data.sectionBg || "#0A0A0A",
          accentColor: res.data.accentColor || "#f7a400",
          stories: res.data.stories || [],
        });
        setHistory(res.data.history || []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ২. ইমেজ আপলোড হ্যান্ডলার (অটো-সিঙ্ক সহ)
  const handleImageUpload = async (index, file) => {
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append("file", file);
    setLoading(true);
    try {
      const res = await axios.post("/api/upload", uploadData);
      const updatedStories = [...formData.stories];

      // সার্ভার থেকে আসা ইউআরএল সেভ করা
      updatedStories[index].image = res.data.url;

      const newFormData = { ...formData, stories: updatedStories };
      setFormData(newFormData);

      // ইমেজ আপলোড হওয়ার সাথে সাথে ডাটাবেসে সেভ করে ফেলা ভালো
      await axios.post("/api/success-story/update", newFormData);
      alert("✅ Image Uploaded & Saved!");
    } catch (err) {
      alert("❌ Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // ৩. নতুন স্টোরি অ্যাড
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
  };

  // ৪. ডিলিট এবং সিঙ্ক
  const deleteStory = async (index) => {
    if (window.confirm("Are you sure?")) {
      const updatedStories = formData.stories.filter((_, i) => i !== index);
      const updatedData = { ...formData, stories: updatedStories };
      setFormData(updatedData);
      setLoading(true);
      try {
        await axios.post("/api/success-story/update", updatedData);
        fetchData(); // লেটেস্ট হিস্ট্রি পাওয়ার জন্য
      } catch (err) {
        alert("❌ Delete failed!");
        fetchData();
      } finally {
        setLoading(false);
      }
    }
  };

  // ৫. ম্যানুয়াল সিঙ্ক
  const handleSync = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/success-story/update", formData);
      if (res.data) {
        setHistory(res.data.history || []);
        alert("✅ All Data Synced to MongoDB!");
      }
    } catch (err) {
      alert("❌ Sync Failed!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ইমেজ রেন্ডারিং হেল্পার (এটি লোকাল এবং সার্ভার দুইটাই ম্যানেজ করবে)
  const getFullImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const cleanPath = path.replace(/^\//, "");
    return `${BASE_URL}/${cleanPath}`;
  };

  // ইনপুট পরিবর্তনের জন্য কমন ফাংশন
  const updateField = (index, field, value) => {
    const updated = [...formData.stories];
    updated[index][field] = value;
    setFormData({ ...formData, stories: updated });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen font-poppins text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Theme Control */}
        <div className="bg-white p-6 rounded-[5px] shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">
            Section Theme & Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500">
                Section Title
              </label>
              <input
                className="border p-2 rounded outline-none focus:border-black"
                value={formData.sectionTitle}
                onChange={(e) =>
                  setFormData({ ...formData, sectionTitle: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500">
                Section Subtitle
              </label>
              <input
                className="border p-2 rounded outline-none focus:border-black"
                value={formData.sectionSubtitle}
                onChange={(e) =>
                  setFormData({ ...formData, sectionSubtitle: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Stories Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-black">Manage Success Stories</h3>
          <div className="grid grid-cols-1 gap-6">
            {formData.stories.map((story, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-[5px] border border-gray-200 shadow-sm relative group"
              >
                <button
                  onClick={() => deleteStory(index)}
                  className="absolute top-4 right-4 text-red-500 hover:scale-110"
                >
                  <Trash2 size={20} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image Section */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400">
                      Client Image
                    </label>
                    <div className="relative h-40 w-full bg-gray-50 border-2 border-dashed rounded overflow-hidden flex items-center justify-center">
                      {story.image ? (
                        <img
                          src={getFullImageUrl(story.image)}
                          className="w-full h-full object-cover"
                          alt="Client"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/300?text=Error+Loading";
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <UploadCloud size={30} className="text-gray-300" />
                          <span className="text-[10px] text-gray-400 mt-1">
                            Click to Upload
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

                  {/* Info Section */}
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Name"
                      className="border p-2 rounded text-sm"
                      value={story.name}
                      onChange={(e) =>
                        updateField(index, "name", e.target.value)
                      }
                    />
                    <input
                      placeholder="Role"
                      className="border p-2 rounded text-sm"
                      value={story.role}
                      onChange={(e) =>
                        updateField(index, "role", e.target.value)
                      }
                    />
                    <input
                      placeholder="Company"
                      className="border p-2 rounded text-sm"
                      value={story.company}
                      onChange={(e) =>
                        updateField(index, "company", e.target.value)
                      }
                    />
                    <input
                      placeholder="Video URL"
                      className="border p-2 rounded text-sm"
                      value={story.videoUrl}
                      onChange={(e) =>
                        updateField(index, "videoUrl", e.target.value)
                      }
                    />
                    <div className="md:col-span-2">
                      <textarea
                        placeholder="Feedback"
                        className="border p-2 rounded text-sm w-full h-20"
                        value={story.feedback}
                        onChange={(e) =>
                          updateField(index, "feedback", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-[10px] font-bold text-gray-400">
                        Rating (1-5)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className="border p-1 w-16 text-center"
                        value={story.rating}
                        onChange={(e) =>
                          updateField(
                            index,
                            "rating",
                            parseInt(e.target.value) || 5,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addStory}
            className="w-full border-2 border-dashed border-gray-300 py-4 rounded-[5px] flex items-center justify-center gap-2 text-gray-500 hover:border-black hover:text-black bg-white font-bold text-sm"
          >
            <Plus size={20} /> Add New Success Story
          </button>
        </div>

        <button
          onClick={handleSync}
          disabled={loading}
          className="w-full justify-center bg-[#F7A400] text-black font-semibold py-2 rounded-[5px] border-2 border-[#F7A400] hover:bg-black hover:text-white transition-all flex items-center gap-2"
        >
          <Save size={24} />{" "}
          {loading ? "Processing..." : "Sync to MongoDB Atlas"}
        </button>
      </div>
    </div>
  );
};

export default SuccessStoryAdmin;
