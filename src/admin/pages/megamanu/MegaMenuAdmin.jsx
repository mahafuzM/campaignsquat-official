import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import {
  LayoutGrid,
  FileText,
  Upload,
  Image as ImageIcon,
  Plus,
  PlusCircle,
  Trash2,
  Edit3,
  Check,
  Save,
  Globe,
  Info,
  Loader2,
  HelpCircle,
  Briefcase,
  Workflow,
  Sparkles,
  ChevronRight,
  Search,
} from "lucide-react";

const MegaMenuAdmin = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const categories = [
    "UI/UX Design",
    "Web Design & Development",
    "Software Development",
    "Mobile App Development",
  ];

  const [formData, setFormData] = useState({
    id: null,
    category: "UI/UX Design",
    title: "",
    slug: "",
    path: "",
    headerText: "",
    paragraphText: "",
    sec2Title: "",
    sec2Desc: "",
    sec4Title: "",
    sec4Desc: "",
    sec5Title: "",
    sec5Desc: "",
    sec6Title: "",
    sec6Desc: "",
    sec7Title: "",
    sec7Desc: "",
  });

  const [expertise, setExpertise] = useState([
    { title: "", desc: "", img: null, preview: null },
  ]);
  const [features, setFeatures] = useState([
    { title: "", desc: "", img: null, preview: null },
  ]);
  const [processSteps, setProcessSteps] = useState([
    { title: "", desc: "", img: null, preview: null },
  ]);
  const [industries, setIndustries] = useState([
    { title: "", desc: "", img: null, preview: null },
  ]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [points, setPoints] = useState([""]);
  const [sideImage, setSideImage] = useState(null);
  const [sidePreview, setSidePreview] = useState(null);
  const [contentImage, setContentImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchMenus = async () => {
    setFetching(true);
    try {
      const res = await axios.get("/api/megamenu");
      setMenus(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load menus.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      setFormData({
        ...formData,
        title: value,
        slug: generatedSlug,
        path: `/services/${generatedSlug}`,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContentImage(file);
      setPreview(URL.createObjectURL(file));
      toast.success("Hero image selected! ✅");
    }
  };

  // --- Dynamic Item Handlers ---
  const addExpertiseCard = () => setExpertise([...expertise, { title: "", desc: "", img: null, preview: null }]);
  const removeExpertiseCard = (index) => setExpertise(expertise.filter((_, i) => i !== index));
  const handleExpertiseChange = (index, field, value) => {
    const updated = [...expertise];
    updated[index][field] = value;
    setExpertise(updated);
  };
  const handleExpertiseFile = (index, file) => {
    if (!file) return;
    const updated = [...expertise];
    updated[index].img = file;
    updated[index].preview = URL.createObjectURL(file);
    setExpertise(updated);
  };

  const addFeatureCard = () => setFeatures([...features, { title: "", desc: "", img: null, preview: null }]);
  const removeFeatureCard = (index) => setFeatures(features.filter((_, i) => i !== index));
  const handleFeatureChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };
  const handleFeatureFile = (index, file) => {
    if (!file) return;
    const updated = [...features];
    updated[index].img = file;
    updated[index].preview = URL.createObjectURL(file);
    setFeatures(updated);
  };

  const addProcessStep = () => setProcessSteps([...processSteps, { title: "", desc: "", img: null, preview: null }]);
  const removeProcessStep = (index) => setProcessSteps(processSteps.filter((_, i) => i !== index));
  const handleProcessChange = (index, field, value) => {
    const updated = [...processSteps];
    updated[index][field] = value;
    setProcessSteps(updated);
  };
  const handleProcessFile = (index, file) => {
    if (!file) return;
    const updated = [...processSteps];
    updated[index].img = file;
    updated[index].preview = URL.createObjectURL(file);
    setProcessSteps(updated);
  };

  const addIndustryCard = () => setIndustries([...industries, { title: "", desc: "", img: null, preview: null }]);
  const removeIndustryCard = (index) => setIndustries(industries.filter((_, i) => i !== index));
  const handleIndustryChange = (index, field, value) => {
    const updated = [...industries];
    updated[index][field] = value;
    setIndustries(updated);
  };
  const handleIndustryFile = (index, file) => {
    if (!file) return;
    const updated = [...industries];
    updated[index].img = file;
    updated[index].preview = URL.createObjectURL(file);
    setIndustries(updated);
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));
  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const addPoint = () => setPoints([...points, ""]);
  const removePoint = (index) => setPoints(points.filter((_, i) => i !== index));
  const handlePointChange = (index, value) => {
    const updated = [...points];
    updated[index] = value;
    setPoints(updated);
  };

  const handleSideImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSideImage(file);
      setSidePreview(URL.createObjectURL(file));
      toast.success("Side image selected! ✅");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item._id,
      category: item.category,
      title: item.title,
      slug: item.slug || "",
      path: item.path,
      headerText: item.headerText || "",
      paragraphText: item.paragraphText || "",
      sec2Title: item.sec2Title,
      sec2Desc: item.sec2Desc,
      sec4Title: item.sec4Title || "",
      sec4Desc: item.sec4Desc || "",
      sec5Title: item.sec5Title || "",
      sec5Desc: item.sec5Desc || "",
      sec6Title: item.sec6Title || "",
      sec6Desc: item.sec6Desc || "",
      sec7Title: item.sec7Title || "",
      sec7Desc: item.sec7Desc || "",
    });

    const getImgUrl = (path) => path ? (path.startsWith("/") ? path : `/${path}`) : null;

    if (item.image) setPreview(getImgUrl(item.image));
    if (item.sideImg) setSidePreview(getImgUrl(item.sideImg));
    if (item.points) setPoints(item.points);

    if (item.expertiseCards) {
      setExpertise(item.expertiseCards.map(card => ({
        title: card.title,
        desc: card.desc,
        img: null,
        preview: getImgUrl(card.img)
      })));
    }

    if (item.featureData) {
      setFeatures(item.featureData.map(card => ({
        title: card.title,
        desc: card.desc,
        img: null,
        preview: getImgUrl(card.img)
      })));
    }

    if (item.processSteps) {
      setProcessSteps(item.processSteps.map(step => ({
        title: step.title,
        desc: step.desc,
        img: null,
        preview: getImgUrl(step.img)
      })));
    }

    if (item.industryData) {
      setIndustries(item.industryData.map(card => ({
        title: card.title,
        desc: card.desc,
        img: null,
        preview: getImgUrl(card.img)
      })));
    }

    if (item.faqData) {
      setFaqs(item.faqData.map(faq => ({
        question: faq.question,
        answer: faq.answer,
      })));
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Editing mode enabled", { icon: "📝" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`/api/megamenu/${id}`);
        toast.success("Service deleted! 🗑️");
        fetchMenus();
      } catch (err) {
        console.error(err);
        toast.error("Deletion failed! ❌");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    if (contentImage) data.append("image", contentImage);
    if (sideImage) data.append("sideImage", sideImage);
    data.append("points", JSON.stringify(points));
    data.append("faqData", JSON.stringify(faqs));

    const processCards = (cards, dataName, imagePrefix) => {
      const metaData = cards.map((item, idx) => {
        if (item.img instanceof File) {
          data.append(`${imagePrefix}${idx}`, item.img);
        }
        return {
          title: item.title,
          desc: item.desc,
          img: item.preview ? (item.preview.startsWith("blob:") ? "" : item.preview.replace(/^\/+/, "")) : "",
        };
      });
      data.append(dataName, JSON.stringify(metaData));
    };

    processCards(expertise, "expertiseData", "expertiseImage");
    processCards(features, "featureData", "featureImage");
    processCards(processSteps, "processData", "processImage");
    processCards(industries, "industryData", "industryImage");

    try {
      const url = formData.id ? `/api/megamenu/${formData.id}` : `/api/megamenu`;
      const method = formData.id ? "put" : "post";
      await axios({ method, url, data });

      toast.success(formData.id ? "Service Updated! ✅" : "Service Published! 🚀");
      fetchMenus();

      // Reset
      setFormData({
        id: null, category: "UI/UX Design", title: "", slug: "", path: "",
        headerText: "", paragraphText: "", sec2Title: "", sec2Desc: "",
        sec4Title: "", sec4Desc: "", sec5Title: "", sec5Desc: "",
        sec6Title: "", sec6Desc: "", sec7Title: "", sec7Desc: "",
      });
      setExpertise([{ title: "", desc: "", img: null, preview: null }]);
      setFeatures([{ title: "", desc: "", img: null, preview: null }]);
      setProcessSteps([{ title: "", desc: "", img: null, preview: null }]);
      setIndustries([{ title: "", desc: "", img: null, preview: null }]);
      setFaqs([{ question: "", answer: "" }]);
      setPoints([""]);
      setSideImage(null); setSidePreview(null);
      setContentImage(null); setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Submission failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  const renderSectionHeader = (icon, title, count) => (
    <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-6">
      <div className="flex items-center gap-2">
        {React.cloneElement(icon, { size: 18, className: "text-[#F7A400]" })}
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
          {title} {count !== undefined && `(${count})`}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3 flex items-center gap-3">
              <Sparkles className="text-[#F7A400]" size={28} />
              Service Builder Pro
            </h1>
            <p className="text-sm text-gray-500 mt-2 pl-4">
              {formData.id ? `Editing: ${formData.title}` : "Create a high-fidelity digital service architecture."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              form="builder-form"
              disabled={loading}
              className="px-8 py-3 bg-[#F7A400] text-white rounded-md font-bold text-sm flex items-center gap-2 transition-all shadow-sm hover:bg-[#d98f00] disabled:opacity-70"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {loading ? "PROCESSING..." : formData.id ? "UPDATE ARCHITECTURE" : "PUBLISH SERVICE"}
            </button>
          </div>
        </div>

        <form id="builder-form" onSubmit={handleSubmit} className="space-y-10">
          
          {/* Main Config & Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar: Configuration */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                {renderSectionHeader(<LayoutGrid />, "Core Config")}
                
                <div className="space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50/50 border border-gray-200 p-3 rounded-md font-bold text-gray-900 focus:ring-2 focus:ring-[#F7A400]/20 outline-none transition-all appearance-none"
                    >
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Name</label>
                    <input
                      name="title"
                      placeholder="e.g. UX Design"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50/50 border border-gray-200 p-3 rounded-md font-bold text-gray-900 focus:ring-2 focus:ring-[#F7A400]/20 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-600 uppercase tracking-wider">URL Slug (Auto)</label>
                    <input
                      name="slug"
                      value={formData.slug}
                      readOnly
                      className="w-full bg-blue-50/30 border border-blue-100 p-3 rounded-md font-mono text-sm text-blue-700 font-bold outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Path Preview</label>
                    <p className="bg-gray-50 p-2 rounded text-[10px] font-mono text-gray-400 truncate">{formData.path}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main: Hero Content */}
            <div className="lg:col-span-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                {renderSectionHeader(<FileText />, "Hero Section (1)")}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hero Heading (H1)</label>
                      <input
                        name="headerText"
                        placeholder="Catchy H1..."
                        value={formData.headerText}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 p-3 rounded-md font-bold text-gray-900 focus:ring-2 focus:ring-[#F7A400]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hero Description (P)</label>
                      <textarea
                        name="paragraphText"
                        placeholder="Detailed sub-text..."
                        value={formData.paragraphText}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 border border-gray-200 p-3 rounded-md h-32 focus:ring-2 focus:ring-[#F7A400]/20 outline-none transition-all resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hero Image</label>
                    <div className="relative group border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/30 hover:border-[#F7A400] transition-all cursor-pointer h-full min-h-[160px] flex items-center justify-center">
                      <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      {preview ? (
                        <img src={preview} className="max-h-40 object-contain rounded border border-gray-200 bg-white p-1" alt="Hero" />
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto text-gray-300 mb-2" size={32} />
                          <p className="text-[10px] font-bold text-gray-400">UPLOAD HERO MEDIA</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Cards: Expertise & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Expertise Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Workflow size={18} className="text-[#F7A400]" />
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">2. Expertise</h3>
                </div>
                <button type="button" onClick={addExpertiseCard} className="text-[#F7A400] hover:text-[#d98f00]"><PlusCircle size={20} /></button>
              </div>

              <div className="space-y-4 mb-6">
                <input
                  name="sec2Title" placeholder="Expertise Title..." value={formData.sec2Title} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-md font-bold text-gray-900 outline-none focus:ring-1 focus:ring-[#F7A400]"
                />
                <textarea
                  name="sec2Desc" placeholder="Brief section description..." value={formData.sec2Desc} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-md h-20 outline-none resize-none text-sm"
                />
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {expertise.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50/50 border border-gray-100 rounded-lg relative group">
                    <button type="button" onClick={() => removeExpertiseCard(index)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={12} /></button>
                    <div className="flex gap-4">
                      <div className="w-16 h-16 shrink-0 border border-gray-200 rounded-md bg-white relative flex items-center justify-center overflow-hidden">
                        <input type="file" onChange={(e) => handleExpertiseFile(index, e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        {item.preview ? <img src={item.preview} className="w-full h-full object-cover" alt="EX" /> : <ImageIcon className="text-gray-200" size={24} />}
                      </div>
                      <div className="flex-grow space-y-2">
                        <input value={item.title} onChange={(e) => handleExpertiseChange(index, "title", e.target.value)} placeholder="Title" className="w-full bg-transparent border-b border-gray-200 font-bold text-sm outline-none" />
                        <textarea value={item.desc} onChange={(e) => handleExpertiseChange(index, "desc", e.target.value)} placeholder="Description" className="w-full bg-transparent text-xs outline-none h-10 resize-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#F7A400]" />
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">3. Feature Details</h3>
                </div>
                <button type="button" onClick={addFeatureCard} className="text-[#F7A400] hover:text-[#d98f00]"><PlusCircle size={20} /></button>
              </div>

              <div className="space-y-4 mt-[108px] max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {features.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50/50 border border-gray-100 rounded-lg relative group">
                    <button type="button" onClick={() => removeFeatureCard(index)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={12} /></button>
                    <div className="flex gap-4">
                      <div className="w-16 h-16 shrink-0 border border-gray-200 rounded-md bg-white relative flex items-center justify-center overflow-hidden">
                        <input type="file" onChange={(e) => handleFeatureFile(index, e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        {item.preview ? <img src={item.preview} className="w-full h-full object-cover" alt="FT" /> : <ImageIcon className="text-gray-200" size={24} />}
                      </div>
                      <div className="flex-grow space-y-2">
                        <input value={item.title} onChange={(e) => handleFeatureChange(index, "title", e.target.value)} placeholder="Title" className="w-full bg-transparent border-b border-gray-200 font-bold text-sm outline-none" />
                        <textarea value={item.desc} onChange={(e) => handleFeatureChange(index, "desc", e.target.value)} placeholder="Description" className="w-full bg-transparent text-xs outline-none h-10 resize-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process & Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Process Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Workflow size={18} className="text-[#F7A400]" />
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">4. workflow Process</h3>
                </div>
                <button type="button" onClick={addProcessStep} className="text-[#F7A400] hover:text-[#d98f00]"><PlusCircle size={20} /></button>
              </div>
              <div className="space-y-4 mb-6">
                <input name="sec4Title" placeholder="Process Heading..." value={formData.sec4Title} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-md font-bold text-gray-900 outline-none" />
                <textarea name="sec4Desc" placeholder="Description..." value={formData.sec4Desc} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-md h-20 outline-none resize-none text-sm" />
              </div>
              <div className="space-y-4">
                {processSteps.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50/50 border border-gray-100 rounded-lg group">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">{index+1}</div>
                    <div className="flex-grow space-y-2">
                      <input value={item.title} onChange={(e) => handleProcessChange(index, "title", e.target.value)} placeholder="Step Title" className="w-full bg-transparent border-b border-gray-200 font-bold text-sm outline-none" />
                      <textarea value={item.desc} onChange={(e) => handleProcessChange(index, "desc", e.target.value)} placeholder="Step description" className="w-full bg-transparent text-xs outline-none h-12 resize-none" />
                    </div>
                    <button type="button" onClick={() => removeProcessStep(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
               <div className="flex items-center gap-2 mb-6">
                <Check size={18} className="text-[#F7A400]" />
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">5. Why Choose Us</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <input name="sec5Title" placeholder="Why Choose Us Title..." value={formData.sec5Title} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-md font-bold text-gray-900 outline-none" />
                  <textarea name="sec5Desc" placeholder="Brief paragraph..." value={formData.sec5Desc} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-md h-28 outline-none resize-none text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Illustration Media</label>
                  <div className="relative group border-2 border-dashed border-gray-200 rounded-lg p-3 bg-gray-50/30 hover:border-[#F7A400] transition-all cursor-pointer flex-grow flex items-center justify-center">
                    <input type="file" onChange={handleSideImage} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    {sidePreview ? <img src={sidePreview} className="max-h-32 object-contain" alt="Side" /> : <div className="text-center"><ImageIcon className="mx-auto text-gray-200 mb-1" size={24} /><p className="text-[9px] font-bold text-gray-300">UPLOAD SIDE IMG</p></div>}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Key Points / Benefits</p>
                  <button type="button" onClick={addPoint} className="text-[#F7A400] text-xs font-bold hover:underline flex items-center gap-1"><Plus size={14}/> ADD POINT</button>
                </div>
                <div className="grid gap-2">
                  {points.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 px-3 rounded-md border border-gray-100 group">
                      <Check size={14} className="text-[#F7A400] shrink-0" />
                      <input value={p} onChange={(e) => handlePointChange(idx, e.target.value)} placeholder="Benefit item..." className="flex-grow bg-transparent text-sm outline-none font-medium" />
                      <button type="button" onClick={() => removePoint(idx)} className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Industry & FAQ */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            {renderSectionHeader(<Briefcase />, "6. Industry Expertise", industries.length)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
              <div className="space-y-4">
                <input name="sec6Title" placeholder="Industry Heading..." value={formData.sec6Title} onChange={handleInputChange} className="w-full bg-white border border-gray-200 p-3 rounded-md font-bold text-xl outline-none" />
                <textarea name="sec6Desc" placeholder="Description of your reach in industries..." value={formData.sec6Desc} onChange={handleInputChange} className="w-full bg-white border border-gray-200 p-3 rounded-md h-24 outline-none resize-none text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {industries.map((item, idx) => (
                   <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-md relative group">
                     <button type="button" onClick={() => removeIndustryCard(idx)} className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"><Trash2 size={10}/></button>
                     <div className="flex flex-col gap-2">
                       <div className="w-10 h-10 rounded border bg-white flex items-center justify-center overflow-hidden relative">
                         <input type="file" onChange={(e) => handleIndustryFile(idx, e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                         {item.preview ? <img src={item.preview} className="w-full h-full object-cover" /> : <ImageIcon size={18} className="text-gray-200" />}
                       </div>
                       <input value={item.title} onChange={(e) => handleIndustryChange(idx, "title", e.target.value)} placeholder="Industry" className="bg-transparent border-b border-gray-200 font-bold text-xs outline-none" />
                     </div>
                   </div>
                ))}
                <button type="button" onClick={addIndustryCard} className="border-2 border-dashed border-gray-200 rounded-md flex flex-col items-center justify-center text-gray-300 hover:border-[#F7A400] hover:text-[#F7A400] transition-all min-h-[100px]">
                  <Plus size={24} />
                  <span className="text-[10px] font-bold mt-1 uppercase">ADD NEW</span>
                </button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-[#F7A400]" />
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">7. FAQ Strategy</h3>
                </div>
                <button type="button" onClick={addFaq} className="text-[#F7A400] flex items-center gap-1 text-xs font-bold"><Plus size={16}/> ADD FAQ</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <input name="sec7Title" placeholder="FAQ Section Heading..." value={formData.sec7Title} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-md font-bold text-lg outline-none" />
                <input name="sec7Desc" placeholder="FAQ Section Subtitle..." value={formData.sec7Desc} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-md text-sm outline-none" />
              </div>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-gray-50/50 border border-gray-100 rounded-lg relative group">
                    <button type="button" onClick={() => removeFaq(idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                         <span className="text-xs font-black text-[#F7A400]">Q{idx+1}</span>
                         <input value={faq.question} onChange={(e) => handleFaqChange(idx, "question", e.target.value)} placeholder="Enter the question..." className="flex-grow bg-transparent border-b border-gray-200 font-bold text-sm outline-none py-1" />
                      </div>
                      <div className="flex items-start gap-3 pl-6">
                        <textarea value={faq.answer} onChange={(e) => handleFaqChange(idx, "answer", e.target.value)} placeholder="Provide answer..." className="w-full bg-white border border-gray-100 p-3 rounded-md text-xs outline-none h-20 resize-none font-medium" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* List of Published Services */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
             <div className="flex items-center gap-3">
               <Globe className="text-[#F7A400]" size={24} />
               <h2 className="text-xl font-bold">Published Portfolio Services</h2>
             </div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input placeholder="Search services..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm outline-none w-64 focus:border-[#F7A400]" />
             </div>
           </div>

           {fetching ? (
             <div className="py-20 flex flex-col items-center justify-center text-gray-400">
               <Loader2 className="animate-spin mb-2" size={32} />
               <p className="text-xs font-medium uppercase tracking-widest">FETCHING DATA...</p>
             </div>
           ) : menus.length === 0 ? (
             <div className="py-20 text-center text-gray-300 border-2 border-dashed border-gray-100 rounded-lg">
               <Sparkles className="mx-auto mb-4 opacity-50" size={48} strokeWidth={1}/>
               <p className="text-sm italic">No services published yet. Start building one above!</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {menus.map((item) => (
                  <div key={item._id} className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-[#F7A400]/30 relative">
                    <div className="h-40 bg-gray-50 border-b border-gray-50 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={item.image.startsWith("/") ? item.image : `/${item.image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                      ) : (
                        <ImageIcon size={48} className="text-gray-200" />
                      )}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md border border-gray-100">
                        <span className="text-[10px] font-black uppercase text-[#F7A400] tracking-widest">{item.category}</span>
                      </div>
                    </div>
                    <div className="p-5 flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-[#F7A400] transition-colors">{item.title}</h3>
                        <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-tight">{item.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 bg-gray-50 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Edit3 size={16} /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                        <button onClick={() => window.open(item.path, "_blank")} className="p-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-900 hover:text-white transition-all"><ChevronRight size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenuAdmin;
