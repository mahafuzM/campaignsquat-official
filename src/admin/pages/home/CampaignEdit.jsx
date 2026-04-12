import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

const CampaignEdit = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // ১. ডাটাবেস থেকে বর্তমান ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/about');
        if (res.data) {
          setFormData({
            title: res.data.title,
            description: res.data.description
          });
          setPreview(res.data.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    };
    fetchAboutData();
  }, []);

  // ২. ইনপুট হ্যান্ডলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); // সাথে সাথে প্রিভিউ দেখাবে
    }
  };

  // ৩. ডাটা আপডেট করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (file) data.append('image', file);

    try {
      await axios.post('http://localhost:5000/api/about', data);
      setMessage({ type: 'success', text: 'Campaign section updated successfully! ✅' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update. Check server connection! ❌' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-poppins">
      <div className="max-w-4xl mx-auto bg-white rounded-[5px] shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#050910] p-6 text-white">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Save className="text-[#F7A400]" size={24} /> 
            Manage Campaign Section
          </h2>
          <p className="text-white text-[10px] mt-1  tracking-widest">Update Banner, Title & Description</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
          
          {/* Status Messages */}
          {message.text && (
            <div className={`p-4 rounded-[5px] flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <span className="font-medium text-sm">{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Left Side: Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-bold text-black mb-2">Main Title</label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. We Engineering Growth."
                  className="w-full border border-gray-300 p-3 rounded-[5px] focus:ring-2 focus:ring-[#F7A400] outline-none text-gray-800 transition-all"
                  required
                />
                <p className="text-[10px] text-black mt-1 italic">* Use HTML tags if needed for styling.</p>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-black mb-2">Description Content</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-[5px] h-40 focus:ring-2 focus:ring-[#F7A400] outline-none text-gray-800 transition-all resize-none"
                  required
                />
              </div>
            </div>

            {/* Right Side: Image Upload & Preview */}
            <div className="space-y-6">
              <label className="block text-[12px] font-bold text-black mb-2">Section Banner Image</label>
              
              <div className="relative group border-2 border-dashed border-gray-300 rounded-[5px] p-4 hover:border-[#F7A400] transition-all bg-gray-50 flex flex-col items-center justify-center min-h-[250px]">
                {preview ? (
                  <div className="relative w-full h-full">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-[5px] shadow-md" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[5px]">
                      <p className="text-white text-sm font-bold flex items-center gap-2">
                        <Upload size={16} /> Change Image
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                    <p className="text-gray-500 text-sm font-medium">Click to upload banner</p>
                  </div>
                )}
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
              <p className="text-[10px] text-black text-center">Recommended size: 800x1000px (WebP format preferred)</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button 
              type="submit"
              disabled={loading}
              className={`bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#050910] border-t-transparent rounded-[5px] animate-spin"></div>
                  Updating Data...
                </>
              ) : (
                <>
                  <Save size={20} /> Update Campaign Section
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignEdit;