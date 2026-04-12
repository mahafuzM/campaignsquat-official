import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Save, Plus, Trash2, Loader2, CheckCircle, 
  Globe, Share2, Phone, Mail, MapPin 
} from 'lucide-react';

const AdminFooter = () => {
  const [footerData, setFooterData] = useState({
    brandName: '',
    brandDescription: '',
    socialLinks: [], // এটা নতুন যোগ করা হয়েছে
    services: [],
    quickLinks: [],
    contact: { email: '', phone: '', offices: [] },
    hiringStatus: { showCard: true, isHiring: true, title: '', description: '', hiringNotice: '' }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const BASE_URL = 'http://localhost:5000/api/footer';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL);
        if (res.data) {
          // নিশ্চিত করা হচ্ছে যে সব অ্যারে অন্তত খালি অ্যারে হিসেবে আছে
          setFooterData({
            ...res.data,
            socialLinks: res.data.socialLinks || [],
            services: res.data.services || [],
            quickLinks: res.data.quickLinks || [],
            contact: {
              ...res.data.contact,
              offices: res.data.contact?.offices || []
            }
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(BASE_URL, footerData);
      setMessage('Footer updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Error updating footer');
    } finally {
      setSaving(false);
    }
  };

  // ডাইনামিক অ্যারে আইটেম অ্যাড করার লজিক
  const addArrayItem = (type) => {
    const newData = { ...footerData };
    if (type === 'services') newData.services.push({ name: '', link: '' });
    if (type === 'quickLinks') newData.quickLinks.push({ name: '', url: '' });
    if (type === 'socialLinks') newData.socialLinks.push({ platform: '', url: '' });
    if (type === 'offices') newData.contact.offices.push({ country: '', address: '' });
    setFooterData(newData);
  };

  const removeArrayItem = (type, index) => {
    const newData = { ...footerData };
    if (type === 'services') newData.services = newData.services.filter((_, i) => i !== index);
    if (type === 'quickLinks') newData.quickLinks = newData.quickLinks.filter((_, i) => i !== index);
    if (type === 'socialLinks') newData.socialLinks = newData.socialLinks.filter((_, i) => i !== index);
    if (type === 'offices') newData.contact.offices = newData.contact.offices.filter((_, i) => i !== index);
    setFooterData(newData);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#F7A400]" size={40} /></div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black p-6 md:p-10 font-poppins selection:bg-[#F7A400] selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Footer <span className="text-[#F7A400]">Panel</span></h1>
            <p className="text-gray-500 text-sm mt-1">Manage your website's bottom architecture and contact info.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-[#F7A400] text-white px-10 py-3 rounded-md font-bold flex items-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-orange-200"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? 'Updating...' : 'Save Changes'}
          </button>
        </div>

        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle size={20} className="text-green-500" /> {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. Brand & Socials */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-gray-800">
                <Globe size={20} className="text-[#F7A400]"/> Brand Identity
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">Company Name</label>
                  <input 
                    type="text" 
                    value={footerData.brandName} 
                    onChange={(e) => setFooterData({...footerData, brandName: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">Short Description</label>
                  <textarea 
                    rows="3"
                    value={footerData.brandDescription} 
                    onChange={(e) => setFooterData({...footerData, brandDescription: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] outline-none transition-all"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                  <Share2 size={20} className="text-[#F7A400]"/> Social Presence
                </h2>
                <button onClick={() => addArrayItem('socialLinks')} className="text-[#F7A400] hover:bg-orange-50 p-2 rounded-full transition-colors"><Plus size={20}/></button>
              </div>
              <div className="space-y-3">
                {footerData.socialLinks.map((social, idx) => (
                  <div key={idx} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <input 
                      placeholder="Platform (e.g. facebook)" 
                      value={social.platform} 
                      onChange={(e) => {
                        const newLinks = [...footerData.socialLinks];
                        newLinks[idx].platform = e.target.value;
                        setFooterData({...footerData, socialLinks: newLinks});
                      }}
                      className="w-1/3 bg-white border border-gray-200 rounded p-2 text-sm outline-none focus:border-[#F7A400]"
                    />
                    <input 
                      placeholder="Profile URL" 
                      value={social.url} 
                      onChange={(e) => {
                        const newLinks = [...footerData.socialLinks];
                        newLinks[idx].url = e.target.value;
                        setFooterData({...footerData, socialLinks: newLinks});
                      }}
                      className="flex-1 bg-white border border-gray-200 rounded p-2 text-sm outline-none focus:border-[#F7A400]"
                    />
                    <button onClick={() => removeArrayItem('socialLinks', idx)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Contact & Offices */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-gray-800">
              <Phone size={20} className="text-[#F7A400]"/> Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
                  <input type="email" value={footerData.contact.email} onChange={(e) => setFooterData({...footerData, contact: {...footerData.contact, email: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 pl-10 focus:border-[#F7A400] outline-none shadow-inner text-sm"/>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">Support Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18}/>
                  <input type="text" value={footerData.contact.phone} onChange={(e) => setFooterData({...footerData, contact: {...footerData.contact, phone: e.target.value}})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 pl-10 focus:border-[#F7A400] outline-none shadow-inner text-sm"/>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-t pt-6">
                <span className="text-sm font-bold text-gray-800">GLOBAL OFFICES</span>
                <button onClick={() => addArrayItem('offices')} className="text-xs bg-black text-white px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-[#F7A400] transition-colors shadow-sm"><Plus size={14}/> Add Office</button>
              </div>
              {footerData.contact.offices.map((office, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-200 relative group">
                  <div className="flex-1 space-y-3">
                    <input placeholder="Country" value={office.country} onChange={(e) => {
                      const newOffices = [...footerData.contact.offices];
                      newOffices[idx].country = e.target.value;
                      setFooterData({...footerData, contact: {...footerData.contact, offices: newOffices}});
                    }} className="w-full bg-transparent border-b border-gray-300 p-1 font-bold text-sm outline-none focus:border-[#F7A400]"/>
                    <textarea placeholder="Full Address" value={office.address} onChange={(e) => {
                      const newOffices = [...footerData.contact.offices];
                      newOffices[idx].address = e.target.value;
                      setFooterData({...footerData, contact: {...footerData.contact, offices: newOffices}});
                    }} className="w-full bg-transparent border-b border-gray-300 p-1 text-sm outline-none focus:border-[#F7A400]" rows="2"></textarea>
                  </div>
                  <button onClick={() => removeArrayItem('offices', idx)} className="text-gray-300 hover:text-red-500 p-2"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Menus (Services & Quick Links) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Services */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Services Menu</h2>
                  <button onClick={() => addArrayItem('services')} className="text-[#F7A400] hover:bg-orange-50 p-2 rounded-full transition-colors"><Plus size={20}/></button>
               </div>
               <div className="space-y-3">
                  {footerData.services.map((service, idx) => (
                    <div key={idx} className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg border border-gray-100 group">
                      <div className="flex items-center gap-2">
                         <input placeholder="Service Title" value={service.name} onChange={(e) => {
                           const newServices = [...footerData.services];
                           newServices[idx].name = e.target.value;
                           setFooterData({...footerData, services: newServices});
                         }} className="flex-1 bg-transparent font-semibold text-sm outline-none border-b border-transparent focus:border-[#F7A400]"/>
                         <button onClick={() => removeArrayItem('services', idx)} className="opacity-0 group-hover:opacity-100 text-red-500 transition-all"><Trash2 size={16}/></button>
                      </div>
                      <input placeholder="Path (e.g. /service/web)" value={service.link} onChange={(e) => {
                        const newServices = [...footerData.services];
                        newServices[idx].link = e.target.value;
                        setFooterData({...footerData, services: newServices});
                      }} className="w-full bg-transparent text-gray-400 text-xs outline-none border-b border-transparent focus:border-[#F7A400]"/>
                    </div>
                  ))}
               </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Quick Links</h2>
                  <button onClick={() => addArrayItem('quickLinks')} className="text-[#F7A400] hover:bg-orange-50 p-2 rounded-full transition-colors"><Plus size={20}/></button>
               </div>
               <div className="space-y-3">
                  {footerData.quickLinks.map((link, idx) => (
                    <div key={idx} className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg border border-gray-100 group">
                      <div className="flex items-center gap-2">
                         <input placeholder="Label" value={link.name} onChange={(e) => {
                           const newLinks = [...footerData.quickLinks];
                           newLinks[idx].name = e.target.value;
                           setFooterData({...footerData, quickLinks: newLinks});
                         }} className="flex-1 bg-transparent font-semibold text-sm outline-none border-b border-transparent focus:border-[#F7A400]"/>
                         <button onClick={() => removeArrayItem('quickLinks', idx)} className="opacity-0 group-hover:opacity-100 text-red-500 transition-all"><Trash2 size={16}/></button>
                      </div>
                      <input placeholder="URL" value={link.url} onChange={(e) => {
                        const newLinks = [...footerData.quickLinks];
                        newLinks[idx].url = e.target.value;
                        setFooterData({...footerData, quickLinks: newLinks});
                      }} className="w-full bg-transparent text-gray-400 text-xs outline-none border-b border-transparent focus:border-[#F7A400]"/>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* 4. Hiring Settings */}
          <div className="bg-black text-white p-8 rounded-xl lg:col-span-2 shadow-xl">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Career Opportunity Card
            </h2>
            <div className="flex flex-wrap gap-10 mb-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={footerData.hiringStatus.showCard} onChange={(e) => setFooterData({...footerData, hiringStatus: {...footerData.hiringStatus, showCard: e.target.checked}})} className="accent-[#F7A400] w-5 h-5"/>
                <span className="text-gray-300 group-hover:text-white transition-colors">Visible to Public</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={footerData.hiringStatus.isHiring} onChange={(e) => setFooterData({...footerData, hiringStatus: {...footerData.hiringStatus, isHiring: e.target.checked}})} className="accent-[#F7A400] w-5 h-5"/>
                <span className="text-gray-300 group-hover:text-white transition-colors">Active Hiring Mode</span>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                   <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Card Title</label>
                   <input placeholder="e.g. JOIN THE TEAM" value={footerData.hiringStatus.title} onChange={(e) => setFooterData({...footerData, hiringStatus: {...footerData.hiringStatus, title: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#F7A400]"/>
                </div>
                <div className="md:col-span-1">
                   <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Blinking Notice</label>
                   <input placeholder="e.g. We Are Hiring!" value={footerData.hiringStatus.hiringNotice} onChange={(e) => setFooterData({...footerData, hiringStatus: {...footerData.hiringStatus, hiringNotice: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#F7A400]"/>
                </div>
                <div className="md:col-span-1">
                   <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Short Message</label>
                   <textarea placeholder="Tell them why they should join..." value={footerData.hiringStatus.description} onChange={(e) => setFooterData({...footerData, hiringStatus: {...footerData.hiringStatus, description: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#F7A400]" rows="1"></textarea>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminFooter;