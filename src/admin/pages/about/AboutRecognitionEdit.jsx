import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutRecognitionEdit = () => {
  const [mainTitle, setMainTitle] = useState('');
  const [image, setImage] = useState('');
  const [platforms, setPlatforms] = useState([{ platform: '', desc: '' }]);
  const [uploading, setUploading] = useState(false);

  // ডাটাবেস থেকে বর্তমান ডাটা লোড করা
  useEffect(() => {
    axios.get('http://localhost:5000/api/about-recognition')
      .then(res => {
        if (res.data) {
          setMainTitle(res.data.mainTitle || '');
          setImage(res.data.image || '');
          setPlatforms(res.data.platforms || [{ platform: '', desc: '' }]);
        }
      })
      .catch(err => console.log(err));
  }, []);

  // ইমেজ আপলোড হ্যান্ডলার
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setImage(res.data.url);
    } catch (err) {
      alert("Image upload failed!");
    }
    setUploading(false);
  };

  // সব ডাটা একসাথে সেভ/আপডেট করা
  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:5000/api/about-recognition/update', { 
        mainTitle, 
        image, 
        platforms 
      });
      alert("Recognition Content Updated Successfully!");
    } catch (err) {
      alert("Update failed!");
    }
  };

  // নতুন প্ল্যাটফর্ম রো যোগ করা
  const addMore = () => setPlatforms([...platforms, { platform: '', desc: '' }]);

  // কোনো প্ল্যাটফর্ম রিমুভ করা
  const removePlatform = (index) => {
    const newArr = platforms.filter((_, i) => i !== index);
    setPlatforms(newArr);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-black font-poppins">
      <h2 className="text-3xl font-black mb-6 border-b-4 text-black border-[#F7A400] pb-2 inline-block ">
        Global Recognition Admin
      </h2>
      
      <div className="bg-white p-8 rounded shadow-md border-t-8 border-[#F7A400] space-y-8">
        
        {/* ১. মেইন টাইটেল এডিট (H2) */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-700">Main Section Title (H2)</label>
          <input 
            className="p-4 border-2 rounded-[5px] focus:border-[#F7A400] outline-none font-bold text-xl" 
            placeholder="e.g. The Global Recognition" 
            value={mainTitle} 
            onChange={e => setMainTitle(e.target.value)} 
          />
        </div>

        {/* ২. ইমেজ আপলোড সেকশন */}
        <div className="p-6 bg-gray-50 rounded-[5px] border-2 border-dashed border-gray-300">
          <label className="block font-bold mb-3 text-lg">Recognition Image (Left Side)</label>
          <input type="file" onChange={handleImageUpload} className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F7A400] file:text-black hover:file:bg-black hover:file:text-white" />
          
          {uploading && <p className="text-[#F7A400] font-bold animate-pulse">Uploading...</p>}
          
          {image && (
            <div className="mt-4 shadow-xl inline-block rounded-[5px] overflow-hidden border-4 border-white">
              <img src={`http://localhost:5000${image}`} className="w-80 h-48 object-cover" alt="Preview" />
            </div>
          )}
        </div>

        {/* ৩. প্ল্যাটফর্ম লিস্ট (H3 & P) */}
        <div className="space-y-6">
          <label className="block font-bold text-xl border-b-2 pb-2 text-[#F7A400]">
            Recognition Items (H3 & P)
          </label>
          
          {platforms.map((p, index) => (
            <div key={index} className="relative group grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gray-50 border-2 rounded-[5px] hover:border-[#F7A400] transition-all duration-300">
              
              {/* রিমুভ বাটন */}
              <button 
                onClick={() => removePlatform(index)}
                className="absolute -top-3 -right-3 bg-red-600 text-white w-10 h-10 rounded-full font-bold shadow-lg hover:bg-black transition-all"
              >
                ✕
              </button>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Platform Name (H3)</label>
                <input 
                  className="p-3 border rounded-[5px] font-black text-xl focus:border-[#F7A400] outline-none" 
                  placeholder="e.g. Upwork" 
                  value={p.platform} 
                  onChange={e => {
                    const newArr = [...platforms];
                    newArr[index].platform = e.target.value;
                    setPlatforms(newArr);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description (P)</label>
                <textarea 
                  className="p-3 border rounded-lg font-medium focus:border-[#F7A400] outline-none min-h-[55px]" 
                  placeholder="e.g. Top Rated Agency" 
                  value={p.desc} 
                  onChange={e => {
                    const newArr = [...platforms];
                    newArr[index].desc = e.target.value;
                    setPlatforms(newArr);
                  }}
                />
              </div>
            </div>
          ))}
          
          <button 
            onClick={addMore} 
            className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-[5px] font-bold hover:bg-[#F7A400] hover:text-black transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span className="text-2xl">+</span> Add New item
          </button>
        </div>

        {/* ৪. ফাইনাল সেভ বাটন */}
        <button 
          onClick={handleUpdate} 
          className="w-full bg-[#F7A400] text-black font-black py-6 rounded-[5px] text-2xl tracking-[0.1em] hover:bg-black hover:text-white transition-all shadow-2xl border-b-8 border-black/20"
        >
          Save Recognition Changes
        </button>
      </div>
    </div>
  );
};

export default AboutRecognitionEdit;