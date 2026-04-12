import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutVisionEdit = () => {
  const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/about-content/vision');
        if (res.data) {
          setFormData({
            title: res.data.title || '',
            description: res.data.description || '',
            imageUrl: res.data.imageUrl || ''
          });
          if (res.data.imageUrl) setImagePreview(`http://localhost:5000${res.data.imageUrl}`);
        }
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = formData.imageUrl;
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        const uploadRes = await axios.post('http://localhost:5000/api/upload', uploadData);
        finalImageUrl = uploadRes.data.url;
      }

      await axios.post('http://localhost:5000/api/about-content/vision/update', {
        ...formData, imageUrl: finalImageUrl
      });

      setStatus('✅ Vision Updated Successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) { setStatus('❌ Error!'); }
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-10 bg-white min-h-screen text-black font-poppins w-full">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold uppercase">About Vision Control</h2>
        {status && <span className="text-green-600 font-bold">{status}</span>}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <label className="block font-bold mb-2">Headline</label>
            <textarea 
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-[5px] focus:border-black outline-none h-32" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Vision Image</label>
            <input type="file" onChange={handleFileSelect} className="w-full bg-gray-50 border p-3 rounded-[5px]" />
            {imagePreview && <img src={imagePreview} className="mt-4 w-full h-48 object-cover rounded-[5px]" alt="preview" />}
          </div>
        </div>
        <div>
          <label className="block font-bold mb-2">Description</label>
          <textarea 
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-[5px] focus:border-black outline-none h-full min-h-[350px]" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        <button type="submit" className="bg-black text-white px-10 py-4 rounded-[5px] font-bold md:col-span-2">
          {loading ? 'Updating...' : 'PUSH VISION CONTENT'}
        </button>
      </form>
    </div>
  );
};

export default AboutVisionEdit;