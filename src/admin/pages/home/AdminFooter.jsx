import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import {
  Save,
  Plus,
  Trash2,
  Globe,
  Share2,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  LayoutGrid
} from "lucide-react";

const AdminFooter = () => {
  const [footerData, setFooterData] = useState({
    brandName: "",
    brandDescription: "",
    socialLinks: [],
    services: [],
    quickLinks: [],
    contact: { email: "", phone: "", offices: [] },
    hiringStatus: {
      showCard: true,
      isHiring: true,
      title: "",
      description: "",
      hiringNotice: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const BASE_URL = "/api/footer";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL);
        if (res.data) {
          const data = res.data;
          setFooterData({
            brandName: data.brandName || "",
            brandDescription: data.brandDescription || "",
            socialLinks: data.socialLinks || [],
            services: data.services || [],
            quickLinks: data.quickLinks || [],
            contact: {
              email: data.contact?.email || "",
              phone: data.contact?.phone || "",
              offices: data.contact?.offices || [],
            },
            hiringStatus: {
              showCard: data.hiringStatus?.showCard ?? true,
              isHiring: data.hiringStatus?.isHiring ?? true,
              title: data.hiringStatus?.title || "",
              description: data.hiringStatus?.description || "",
              hiringNotice: data.hiringStatus?.hiringNotice || "",
            },
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch footer data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const cleanedData = {
        ...footerData,
        socialLinks: footerData.socialLinks.map((link) => ({
          ...link,
          platform: link.platform.toLowerCase().trim(),
        })),
      };

      const response = await axios.put(BASE_URL, cleanedData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Footer settings updated successfully!");
      }
    } catch (err) {
      console.error("Save Error:", err.response?.data);
      toast.error(
        err.response?.data?.message || "Failed to update footer settings."
      );
    } finally {
      setSaving(false);
    }
  };

  const addArrayItem = (type) => {
    const newData = { ...footerData };
    if (type === "services") newData.services.push({ name: "", link: "" });
    if (type === "quickLinks") newData.quickLinks.push({ name: "", url: "" });
    if (type === "socialLinks")
      newData.socialLinks.push({ platform: "", url: "" });
    if (type === "offices")
      newData.contact.offices.push({ country: "", address: "" });
    setFooterData(newData);
    toast.success("New item added.");
  };

  const removeArrayItem = (type, index) => {
    toast(
      (t) => (
        <div>
          <p className="text-sm font-medium text-gray-900 mb-3">
            Are you sure you want to remove this item?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                const newData = { ...footerData };
                if (type === "services")
                  newData.services = newData.services.filter(
                    (_, i) => i !== index
                  );
                if (type === "quickLinks")
                  newData.quickLinks = newData.quickLinks.filter(
                    (_, i) => i !== index
                  );
                if (type === "socialLinks")
                  newData.socialLinks = newData.socialLinks.filter(
                    (_, i) => i !== index
                  );
                if (type === "offices")
                  newData.contact.offices = newData.contact.offices.filter(
                    (_, i) => i !== index
                  );
                setFooterData(newData);
                toast.success("Item removed.");
              }}
              className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/30">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#F7A400]/30 border-t-[#F7A400] rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-500 animate-pulse">
            Loading Footer Settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3">
              Footer Architecture
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage your website's global footer details, quick links, and career widget.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#F7A400] text-white hover:bg-[#d98f00] text-[14px] font-medium py-2 px-6 rounded-md transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
          >
            {saving ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Brand & Socials */}
          <div className="space-y-8">
            {/* Brand Identity */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
                <Globe size={18} className="text-[#F7A400]" /> Brand Identity
              </h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={footerData.brandName}
                    onChange={(e) =>
                      setFooterData({ ...footerData, brandName: e.target.value })
                    }
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none"
                    placeholder="e.g. CampaignSquat"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    Short Description
                  </label>
                  <textarea
                    rows="3"
                    value={footerData.brandDescription}
                    onChange={(e) =>
                      setFooterData({
                        ...footerData,
                        brandDescription: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none resize-none"
                    placeholder="Briefly describe what your agency does..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Social Presence */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Share2 size={18} className="text-[#F7A400]" /> Social Links
                </h2>
                <button
                  onClick={() => addArrayItem("socialLinks")}
                  className="bg-[#F7A400]/10 text-[#F7A400] hover:bg-[#F7A400] hover:text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Plus size={14} /> Add Social
                </button>
              </div>
              <div className="space-y-3">
                {footerData.socialLinks.map((social, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-center bg-gray-50/50 p-3 rounded-md border border-gray-100 group"
                  >
                    <input
                      placeholder="e.g. facebook"
                      value={social.platform}
                      onChange={(e) => {
                        const newLinks = [...footerData.socialLinks];
                        newLinks[idx].platform = e.target.value;
                        setFooterData({ ...footerData, socialLinks: newLinks });
                      }}
                      className="w-1/3 bg-white border border-gray-200 rounded p-2 text-sm outline-none focus:border-[#F7A400]"
                    />
                    <input
                      placeholder="https://..."
                      value={social.url}
                      onChange={(e) => {
                        const newLinks = [...footerData.socialLinks];
                        newLinks[idx].url = e.target.value;
                        setFooterData({ ...footerData, socialLinks: newLinks });
                      }}
                      className="flex-1 bg-white border border-gray-200 rounded p-2 text-sm outline-none focus:border-[#F7A400]"
                    />
                    <button
                      onClick={() => removeArrayItem("socialLinks", idx)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {footerData.socialLinks.length === 0 && (
                   <p className="text-sm text-gray-400 text-center py-4">No social links added yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact & Offices */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-fit">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
              <Phone size={18} className="text-[#F7A400]" /> Contact & Offices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 block">
                  Support Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={16}
                  />
                  <input
                    type="email"
                    value={footerData.contact.email}
                    onChange={(e) =>
                      setFooterData({
                        ...footerData,
                        contact: { ...footerData.contact, email: e.target.value },
                      })
                    }
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 pl-9 transition-all outline-none"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 block">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    value={footerData.contact.phone}
                    onChange={(e) =>
                      setFooterData({
                        ...footerData,
                        contact: { ...footerData.contact, phone: e.target.value },
                      })
                    }
                    className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 pl-9 transition-all outline-none"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-t border-gray-100 pt-6 mb-4">
                <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" /> Global Offices
                </span>
                <button
                  onClick={() => addArrayItem("offices")}
                  className="bg-gray-100 text-gray-700 hover:bg-[#F7A400] hover:text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Plus size={14} /> Add Office
                </button>
              </div>
              
              {footerData.contact.offices.map((office, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 items-start bg-gray-50/50 p-4 rounded-md border border-gray-100 relative group"
                >
                  <div className="flex-1 space-y-3">
                    <input
                      placeholder="Country / Location Name"
                      value={office.country}
                      onChange={(e) => {
                        const newOffices = [...footerData.contact.offices];
                        newOffices[idx].country = e.target.value;
                        setFooterData({
                          ...footerData,
                          contact: { ...footerData.contact, offices: newOffices },
                        });
                      }}
                      className="w-full bg-white border border-gray-200 rounded p-2 text-sm font-semibold outline-none focus:border-[#F7A400]"
                    />
                    <textarea
                      placeholder="Full physical address..."
                      value={office.address}
                      onChange={(e) => {
                        const newOffices = [...footerData.contact.offices];
                        newOffices[idx].address = e.target.value;
                        setFooterData({
                          ...footerData,
                          contact: { ...footerData.contact, offices: newOffices },
                        });
                      }}
                      className="w-full bg-white border border-gray-200 rounded p-2 text-xs outline-none focus:border-[#F7A400] resize-none"
                      rows="2"
                    ></textarea>
                  </div>
                  <button
                    onClick={() => removeArrayItem("offices", idx)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
               {footerData.contact.offices.length === 0 && (
                 <p className="text-sm text-gray-400 text-center py-2">No offices configured.</p>
              )}
            </div>
          </div>

          {/* Menus (Services & Quick Links) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Services */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <LayoutGrid size={18} className="text-[#F7A400]" /> Services Menu
                </h2>
                <button
                  onClick={() => addArrayItem("services")}
                  className="bg-[#F7A400]/10 text-[#F7A400] hover:bg-[#F7A400] hover:text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Plus size={14} /> Add Service
                </button>
              </div>
              <div className="space-y-3">
                {footerData.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 bg-gray-50/50 p-3 rounded-md border border-gray-100 group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        placeholder="Service Label"
                        value={service.name}
                        onChange={(e) => {
                          const newServices = [...footerData.services];
                          newServices[idx].name = e.target.value;
                          setFooterData({ ...footerData, services: newServices });
                        }}
                        className="flex-1 bg-white border border-gray-200 rounded p-2 text-sm font-semibold outline-none focus:border-[#F7A400]"
                      />
                      <button
                        onClick={() => removeArrayItem("services", idx)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <input
                      placeholder="URL Path (/services/...)"
                      value={service.link}
                      onChange={(e) => {
                        const newServices = [...footerData.services];
                        newServices[idx].link = e.target.value;
                        setFooterData({ ...footerData, services: newServices });
                      }}
                      className="w-full bg-white border border-gray-200 rounded p-1.5 text-xs outline-none focus:border-[#F7A400]"
                    />
                  </div>
                ))}
                 {footerData.services.length === 0 && (
                   <p className="text-sm text-gray-400 text-center py-2">No services added.</p>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <LinkIcon size={18} className="text-[#F7A400]" /> Quick Links
                </h2>
                <button
                  onClick={() => addArrayItem("quickLinks")}
                  className="bg-[#F7A400]/10 text-[#F7A400] hover:bg-[#F7A400] hover:text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Plus size={14} /> Add Link
                </button>
              </div>
              <div className="space-y-3">
                {footerData.quickLinks.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 bg-gray-50/50 p-3 rounded-md border border-gray-100 group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        placeholder="Link Label"
                        value={link.name}
                        onChange={(e) => {
                          const newLinks = [...footerData.quickLinks];
                          newLinks[idx].name = e.target.value;
                          setFooterData({ ...footerData, quickLinks: newLinks });
                        }}
                        className="flex-1 bg-white border border-gray-200 rounded p-2 text-sm font-semibold outline-none focus:border-[#F7A400]"
                      />
                      <button
                        onClick={() => removeArrayItem("quickLinks", idx)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <input
                      placeholder="Destination URL"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...footerData.quickLinks];
                        newLinks[idx].url = e.target.value;
                        setFooterData({ ...footerData, quickLinks: newLinks });
                      }}
                       className="w-full bg-white border border-gray-200 rounded p-1.5 text-xs outline-none focus:border-[#F7A400]"
                    />
                  </div>
                ))}
                 {footerData.quickLinks.length === 0 && (
                   <p className="text-sm text-gray-400 text-center py-2">No links added.</p>
                )}
              </div>
            </div>
            
          </div>

          {/* Hiring Settings (Converted to match Light Theme layout) */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm lg:col-span-2 relative overflow-hidden">
             {/* Subtle decorative background for this specific section to make it pop safely */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7A400]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 relative z-10">
              <Briefcase size={18} className="text-[#F7A400]" /> 
              Careers Widget Settings
              {footerData.hiringStatus.isHiring && (
                 <span className="ml-2 flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
              )}
            </h2>
            
            <div className="flex flex-wrap gap-6 mb-8 relative z-10">
              <label className="flex items-center gap-2.5 cursor-pointer group bg-gray-50/50 px-4 py-2 rounded-md border border-gray-100">
                <input
                  type="checkbox"
                  checked={footerData.hiringStatus.showCard}
                  onChange={(e) =>
                    setFooterData({
                      ...footerData,
                      hiringStatus: { ...footerData.hiringStatus, showCard: e.target.checked },
                    })
                  }
                  className="accent-[#F7A400] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable Career Widget
                </span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer group bg-gray-50/50 px-4 py-2 rounded-md border border-gray-100">
                <input
                  type="checkbox"
                  checked={footerData.hiringStatus.isHiring}
                  onChange={(e) =>
                    setFooterData({
                      ...footerData,
                      hiringStatus: { ...footerData.hiringStatus, isHiring: e.target.checked },
                    })
                  }
                  className="accent-[#F7A400] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 items-center flex gap-2">
                  Active Hiring Status
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 block">
                  Widget Title
                </label>
                <input
                  placeholder="e.g. JOIN THE TEAM"
                  value={footerData.hiringStatus.title}
                  onChange={(e) =>
                    setFooterData({
                      ...footerData,
                      hiringStatus: { ...footerData.hiringStatus, title: e.target.value },
                    })
                  }
                  className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none uppercase font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 block">
                  Blinking Sub-notice
                </label>
                <input
                  placeholder="e.g. We Are Hiring!"
                  value={footerData.hiringStatus.hiringNotice}
                  onChange={(e) =>
                    setFooterData({
                      ...footerData,
                      hiringStatus: { ...footerData.hiringStatus, hiringNotice: e.target.value },
                    })
                  }
                  className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none font-semibold text-[#F7A400]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 block">
                  Call-to-Action Message
                </label>
                <textarea
                  placeholder="Tell them why they should join..."
                  value={footerData.hiringStatus.description}
                  onChange={(e) =>
                    setFooterData({
                      ...footerData,
                      hiringStatus: { ...footerData.hiringStatus, description: e.target.value },
                    })
                  }
                  className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-2.5 transition-all outline-none resize-none"
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFooter;
