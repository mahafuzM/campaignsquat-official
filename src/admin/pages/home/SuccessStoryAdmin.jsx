import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Save, UploadCloud, RefreshCcw } from 'lucide-react';

const SuccessStoryAdmin = () => {
  const [formData, setFormData] = useState({
    sectionTitle: '',
    sectionSubtitle: '',
    sectionBg: '#0A0A0A',
    accentColor: '#f7a400',
    stories: []
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/success-story');
      if (res.data) {
        setFormData({
          sectionTitle: res.data.sectionTitle || '',
          sectionSubtitle: res.data.sectionSubtitle || '',
          sectionBg: res.data.sectionBg || '#0A0A0A',
          accentColor: res.data.accentColor || '#f7a400',
          stories: res.data.stories || []
        });
        setHistory(res.data.history || []);
      }
    } catch (err) { console.error("Fetch error:", err); }
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append('file', file);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/upload', uploadData); 
      const updatedStories = [...formData.stories];
      updatedStories[index].image = res.data.url; 
      setFormData({ ...formData, stories: updatedStories });
    } catch (err) { alert("Image upload failed!"); }
    finally { setLoading(false); }
  };

  const addStory = () => {
    setFormData({
      ...formData,
      stories: [...formData.stories, { 
        name: '', role: '', company: '', feedback: '', 
        image: '', videoUrl: '', rating: 5 
      }]
    });
  };

  // ✅ ডিলিট ফাংশনটি আপডেট করা হলো যাতে ডাটাবেসেও আপডেট হয়ে যায়
  const deleteStory = async (index) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      const updatedStories = formData.stories.filter((_, i) => i !== index);
      const updatedData = { ...formData, stories: updatedStories };
      
      // প্রথমে স্ক্রিন থেকে সরিয়ে দিচ্ছি
      setFormData(updatedData);

      // এরপর অটোমেটিক ডাটাবেসে সেভ করে দিচ্ছি
      setLoading(true);
      try {
        const res = await axios.post('http://localhost:5000/api/success-story/update', updatedData);
        if (res.data) {
          setHistory(res.data.history || []);
        }
      } catch (err) {
        alert("❌ Failed to sync deletion to database!");
        fetchData(); // ফেইল করলে আগের ডেটা আবার ফিরিয়ে আনবে
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSync = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/success-story/update', formData);
      if (res.data) {
        setHistory(res.data.history || []);
        alert("✅ Success Stories Synced & Saved!");
      }
    } catch (err) { alert("❌ Sync Failed!"); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen font-poppins text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Theme & Header Control */}
        <div className="bg-white p-6 rounded-[5px] shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-2  ">Section Theme & Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 ">Section Title</label>
              <input className="border p-2 rounded outline-none focus:border-black" value={formData.sectionTitle} onChange={(e) => setFormData({...formData, sectionTitle: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 ">Section Subtitle</label>
              <input className="border p-2 rounded outline-none focus:border-black" value={formData.sectionSubtitle} onChange={(e) => setFormData({...formData, sectionSubtitle: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 ">Background Color</label>
              <div className="flex gap-2">
                <input type="color" className="h-10 w-20 cursor-pointer" value={formData.sectionBg} onChange={(e) => setFormData({...formData, sectionBg: e.target.value})} />
                <input className="border p-2 flex-grow font-mono" value={formData.sectionBg} readOnly />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 ">Accent (Theme) Color</label>
              <div className="flex gap-2">
                <input type="color" className="h-10 w-20 cursor-pointer" value={formData.accentColor} onChange={(e) => setFormData({...formData, accentColor: e.target.value})} />
                <input className="border p-2 flex-grow font-mono" value={formData.accentColor} readOnly />
              </div>
            </div>
          </div>
        </div>

        {/* Stories Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-black ">Manage Success Stories</h3>
          <div className="grid grid-cols-1 gap-6">
            {formData.stories.map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-[5px] border border-gray-200 shadow-sm relative group">
                <button onClick={() => deleteStory(index)} className="absolute top-4 right-4 text-red-500 hover:scale-110 transition"><Trash2 size={20}/></button>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image Upload */}
                 {/* Client Image Section */}
<div className="flex flex-col gap-2">
  <label className="text-[10px] font-bold text-gray-400 ">Client Image</label>
  <div className="relative h-40 w-full bg-gray-50 border-2 border-dashed rounded overflow-hidden flex items-center justify-center">
    {story.image ? (
      <img 
        /* স্লাশ লজিক চেক: স্লাশ থাকুক বা না থাকুক, লিঙ্ক ঠিকভাবে তৈরি হবে */
        src={story.image.startsWith('http') 
          ? story.image 
          : `http://localhost:5000${story.image.startsWith('/') ? '' : '/'}${story.image}`
        } 
        className="w-full h-full object-cover" 
        alt="Client" 
      />
    ) : (
      <div className="flex flex-col items-center">
        <UploadCloud size={30} className="text-gray-300" />
        <span className="text-[10px] text-gray-400 mt-1">Click to Upload</span>
      </div>
    )}
    <input 
      type="file" 
      accept="image/*" 
      className="absolute inset-0 opacity-0 cursor-pointer" 
      onChange={(e) => handleImageUpload(index, e.target.files[0])} 
    />
  </div>
  {/* ইমেজ ডিলিট করার অপশন (ঐচ্ছিক কিন্তু ভালো) */}
  {story.image && (
    <button 
      onClick={() => {
        const updated = [...formData.stories];
        updated[index].image = '';
        setFormData({...formData, stories: updated});
      }}
      className="text-[10px] text-red-500 font-bold hover:underline"
    >
      Remove Image
    </button>
  )}
</div>

                  {/* Basic Info */}
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Name" className="border p-2 rounded text-sm" value={story.name} onChange={(e) => {
                      const updated = [...formData.stories]; updated[index].name = e.target.value; setFormData({...formData, stories: updated});
                    }} />
                    <input placeholder="Role (e.g. CEO)" className="border p-2 rounded text-sm" value={story.role} onChange={(e) => {
                      const updated = [...formData.stories]; updated[index].role = e.target.value; setFormData({...formData, stories: updated});
                    }} />
                    <input placeholder="Company" className="border p-2 rounded text-sm" value={story.company} onChange={(e) => {
                      const updated = [...formData.stories]; updated[index].company = e.target.value; setFormData({...formData, stories: updated});
                    }} />
                    <input placeholder="Video URL (YouTube/Vimeo Embed)" className="border p-2 rounded text-sm" value={story.videoUrl} onChange={(e) => {
                      const updated = [...formData.stories]; updated[index].videoUrl = e.target.value; setFormData({...formData, stories: updated});
                    }} />
                    <div className="md:col-span-2">
                      <textarea placeholder="Client Feedback" className="border p-2 rounded text-sm w-full h-20" value={story.feedback} onChange={(e) => {
                        const updated = [...formData.stories]; updated[index].feedback = e.target.value; setFormData({...formData, stories: updated});
                      }} />
                    </div>
                    <div className="flex items-center gap-4">
                       <label className="text-[10px] font-bold text-gray-400 ">Rating (1-5)</label>
                       <input type="number" min="1" max="5" className="border p-1 w-16 text-center" value={story.rating} onChange={(e) => {
                        const updated = [...formData.stories]; updated[index].rating = parseInt(e.target.value); setFormData({...formData, stories: updated});
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={addStory} className="w-full border-2 border-dashed border-gray-300 py-4 rounded-[5px] flex items-center justify-center gap-2 text-gray-500 hover:border-black hover:text-black transition-all bg-white font-bold  text-sm">
            <Plus size={20}/> Add New Success Story
          </button>
        </div>

        {/* Global Save */}
        <button onClick={handleSync} disabled={loading} className="w-full justify-center bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2">
          <Save size={24} /> {loading ? "Processing..." : "Sync to MongoDB Atlas"}
        </button>

        {/* History Logs */}
        <div className="bg-white p-6 rounded-[5px] border border-gray-200 shadow-sm">
          <h3 className="text-xs font-black  border-b pb-2 mb-4">Activity History</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {history.slice().reverse().map((log, i) => (
              <div key={i} className="flex justify-between text-[11px] bg-gray-50 p-2 rounded border border-gray-100">
                <span className="font-bold text-blue-600">[{new Date(log.date).toLocaleTimeString()}]</span>
                <span className=" font-medium">{log.action}</span>
                <span className="italic text-gray-400">{new Date(log.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuccessStoryAdmin;