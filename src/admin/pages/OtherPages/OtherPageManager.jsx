import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import axios from "../../../axiosConfig";
import { toast } from "react-hot-toast";
import JoditEditor from "jodit-react";
import {
  Plus,
  Trash2,
  Save,
  X,
  FileText,
  MousePointerClick,
  Search,
  Layout,
  Zap,
  GitBranch,
  CheckSquare,
  Building2,
  HelpCircle,
  AlignLeft,
  Loader2,
  Globe,
  Edit3,
  Eye,
} from "lucide-react";

const OtherPageManager = () => {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    pageTitle: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    btnText: "",
    btnLink: "",
    image: null,
    sec2Title: "",
    sec2Desc: "",
    expertiseCards: [],
    featureData: [],
    processMainTitle: "",
    processMainSubtitle: "",
    processSteps: [],
    sec6Title: "",
    sec6Desc: "",
    sec6Points: [],
    sec6BtnText: "Book a Free Consultation",
    sec6BtnLink: "/home/contact",
    sec6Image: null,
    industryMainTitle: "",
    industryMainSubtitle: "",
    industryData: [],
    faqMainTitle: "",
    faqMainSubtitle: "",
    faqs: [],
    seoContentBlocks: [],
  });

  const [newCard, setNewCard] = useState({ title: "", desc: "", cardImage: null });
  const [newFeature, setNewFeature] = useState({ title: "", desc: "", img: null });
  const [newStep, setNewStep] = useState({ title: "", description: "", img: null });
  const [newPoint, setNewPoint] = useState("");
  const [newIndustry, setNewIndustry] = useState({ title: "", desc: "", img: null });
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  const API_BASE = "/api/other-pages";

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: "Start typing hero content...",
    height: 380,
    uploader: { insertImageAsBase64URI: true },
    buttons: ["bold", "italic", "underline", "|", "ul", "ol", "|", "link", "|", "align", "undo", "redo"],
    toolbarAdaptive: false,
    statusbar: false,
  }), []);

  const fetchPages = useCallback(async () => {
    try {
      const res = await axios.get(API_BASE);
      setPages(res.data);
    } catch (err) {
      toast.error("Failed to load pages.");
    }
  }, []);

  useEffect(() => {
    fetchPages();
    setMounted(true);
  }, [fetchPages]);

  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    const autoSlug = titleValue.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, pageTitle: titleValue, slug: autoSlug }));
  };

  const startEdit = (page) => {
    setEditId(page._id);
    const safeParse = (data) => {
      try { if (!data) return []; return typeof data === "string" ? JSON.parse(data) : data; } catch { return []; }
    };
    setFormData({
      pageTitle: page.pageTitle || "", slug: page.slug || "", content: page.content || "",
      metaTitle: page.metaTitle || "", metaDescription: page.metaDescription || "",
      btnText: page.btnText || "", btnLink: page.btnLink || "", image: page.image || null,
      sec2Title: page.sec2Title || "", sec2Desc: page.sec2Desc || "",
      expertiseCards: safeParse(page.expertiseCards), featureData: safeParse(page.featureData),
      processMainTitle: page.processMainTitle || "", processMainSubtitle: page.processMainSubtitle || "",
      processSteps: safeParse(page.processSteps), sec6Title: page.sec6Title || "",
      sec6Desc: page.sec6Desc || "", sec6Points: safeParse(page.sec6Points),
      sec6BtnText: page.sec6BtnText || "Book a Free Consultation",
      sec6BtnLink: page.sec6BtnLink || "/home/contact", sec6Image: page.sec6Image || null,
      industryMainTitle: page.industryMainTitle || "", industryMainSubtitle: page.industryMainSubtitle || "",
      industryData: safeParse(page.industryData), faqMainTitle: page.faqMainTitle || "",
      faqMainSubtitle: page.faqMainSubtitle || "", faqs: safeParse(page.faqs),
      seoContentBlocks: safeParse(page.seoContentBlocks),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Editing mode enabled", { icon: "📝" });
  };

  const resetForm = () => {
    setFormData({
      pageTitle: "", slug: "", content: "", metaTitle: "", metaDescription: "",
      btnText: "", btnLink: "", image: null, sec2Title: "", sec2Desc: "",
      expertiseCards: [], featureData: [], processMainTitle: "", processMainSubtitle: "",
      processSteps: [], sec6Title: "", sec6Desc: "", sec6Points: [],
      sec6BtnText: "Book a Free Consultation", sec6BtnLink: "/home/contact", sec6Image: null,
      industryMainTitle: "", industryMainSubtitle: "", industryData: [],
      faqMainTitle: "", faqMainSubtitle: "", faqs: [], seoContentBlocks: [],
    });
    setEditId(null);
  };

  // ---- Array handlers ----
  const addCard = () => {
    if (!newCard.title?.trim() || !newCard.desc?.trim()) return toast.error("Card title & description required!");
    setFormData((prev) => ({ ...prev, expertiseCards: [...(prev.expertiseCards || []), { ...newCard }] }));
    setNewCard({ title: "", desc: "", cardImage: null });
    toast.success("Expertise card added!");
  };
  const removeCard = (i) => setFormData((p) => ({ ...p, expertiseCards: p.expertiseCards.filter((_, idx) => idx !== i) }));

  const addFeature = () => {
    if (!newFeature.title || !newFeature.desc) return toast.error("Feature title & description required!");
    setFormData((prev) => ({ ...prev, featureData: [...prev.featureData, newFeature] }));
    setNewFeature({ title: "", desc: "", img: null });
    toast.success("Feature added!");
  };
  const removeFeature = (i) => setFormData((p) => ({ ...p, featureData: p.featureData.filter((_, idx) => idx !== i) }));

  const addProcessStep = () => {
    if (!newStep.title?.trim() || !newStep.description?.trim()) return toast.error("Step title & description required!");
    setFormData((prev) => ({ ...prev, processSteps: [...(prev.processSteps || []), { ...newStep }] }));
    setNewStep({ title: "", description: "", img: null });
    toast.success("Process step added!");
  };
  const removeProcessStep = (i) => setFormData((p) => ({ ...p, processSteps: p.processSteps.filter((_, idx) => idx !== i) }));

  const addPoint = () => {
    if (!newPoint.trim()) return toast.error("Point text required!");
    setFormData((prev) => ({ ...prev, sec6Points: [...(prev.sec6Points || []), newPoint.trim()] }));
    setNewPoint("");
  };
  const removePoint = (i) => setFormData((p) => ({ ...p, sec6Points: p.sec6Points.filter((_, idx) => idx !== i) }));

  const addIndustry = () => {
    if (!newIndustry.title?.trim() || !newIndustry.desc?.trim()) return toast.error("Industry title & description required!");
    setFormData((prev) => ({ ...prev, industryData: [...(prev.industryData || []), { ...newIndustry }] }));
    setNewIndustry({ title: "", desc: "", img: null });
    toast.success("Industry card added!");
  };
  const removeIndustry = (i) => setFormData((p) => ({ ...p, industryData: p.industryData.filter((_, idx) => idx !== i) }));

  const addFaq = () => {
    if (!newFaq.question?.trim() || !newFaq.answer?.trim()) return toast.error("Question and answer required!");
    setFormData((prev) => ({ ...prev, faqs: [...(prev.faqs || []), { ...newFaq }] }));
    setNewFaq({ question: "", answer: "" });
    toast.success("FAQ added!");
  };
  const removeFaq = (i) => setFormData((p) => ({ ...p, faqs: p.faqs.filter((_, idx) => idx !== i) }));

  // ---- SEO Blocks ----
  const addSeoBlock = () => setFormData((p) => ({ ...p, seoContentBlocks: [...(p.seoContentBlocks || []), { type: "p", text: "", items: [] }] }));
  const updateSeoBlock = (index, field, value) => {
    const updated = [...formData.seoContentBlocks];
    updated[index][field] = value;
    setFormData((p) => ({ ...p, seoContentBlocks: updated }));
  };
  const addSeoListItem = (blockIndex) => {
    const updated = [...formData.seoContentBlocks];
    if (!updated[blockIndex].items) updated[blockIndex].items = [];
    updated[blockIndex].items.push("");
    setFormData((p) => ({ ...p, seoContentBlocks: updated }));
  };
  const updateSeoListItem = (blockIndex, itemIndex, value) => {
    const updated = [...formData.seoContentBlocks];
    updated[blockIndex].items[itemIndex] = value;
    setFormData((p) => ({ ...p, seoContentBlocks: updated }));
  };
  const removeSeoListItem = (blockIndex, itemIndex) => {
    const updated = [...formData.seoContentBlocks];
    updated[blockIndex].items = updated[blockIndex].items.filter((_, i) => i !== itemIndex);
    setFormData((p) => ({ ...p, seoContentBlocks: updated }));
  };
  const removeSeoBlock = (index) => setFormData((p) => ({ ...p, seoContentBlocks: p.seoContentBlocks.filter((_, i) => i !== index) }));

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this page?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_BASE}/${id}`, { headers: { ...(token && { Authorization: `Bearer ${token}` }) } });
      toast.success("Page deleted! 🗑️");
      fetchPages();
    } catch { toast.error("Delete failed."); }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (!["expertiseCards","featureData","processSteps","sec6Points","industryData","faqs","seoContentBlocks","image","sec6Image"].includes(key)) {
          data.append(key, formData[key]);
        }
      });
      if (formData.image instanceof File) data.append("image", formData.image);
      if (formData.sec6Image instanceof File) data.append("sec6Image", formData.sec6Image);

      const appendArrayData = (array, fieldName, imageKey) => {
        const processed = array.map((item) => {
          if (item.img instanceof File || item.cardImage instanceof File) {
            data.append(imageKey, item.img || item.cardImage);
            return { ...item, hasFile: true, img: null, cardImage: null };
          }
          return { ...item, hasFile: false };
        });
        data.append(fieldName, JSON.stringify(processed));
      };

      appendArrayData(formData.expertiseCards, "expertiseCards", "cardImages");
      appendArrayData(formData.featureData, "featureData", "featureImages");
      appendArrayData(formData.processSteps, "processSteps", "processImages");

      const processedIndustries = formData.industryData.map((ind) => {
        if (ind.img instanceof File) { data.append("industryImages", ind.img); return { title: ind.title, desc: ind.desc, hasFile: true }; }
        return { ...ind, hasFile: false };
      });
      data.append("industryData", JSON.stringify(processedIndustries));
      data.append("sec6Points", JSON.stringify(formData.sec6Points));
      data.append("faqs", JSON.stringify(formData.faqs));
      data.append("seoContentBlocks", JSON.stringify(formData.seoContentBlocks));

      const token = localStorage.getItem("adminToken");
      await axios({
        method: editId ? "put" : "post",
        url: editId ? `${API_BASE}/${editId}` : API_BASE,
        data,
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      toast.success(editId ? "Page updated! ✅" : "Page deployed! 🚀");
      resetForm();
      fetchPages();
    } catch { toast.error("Submission failed! ❌"); }
    finally { setLoading(false); }
  };

  if (!mounted) return null;

  const inputClass = "w-full border border-gray-200 outline-none focus:border-[#F7A400] transition-colors bg-gray-50 focus:bg-white text-gray-900 shadow-sm text-sm p-2 rounded";
  const labelClass = "text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block";

  const SectionCard = ({ icon: Icon, number, title, children }) => (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 bg-gray-50/30">
        <div className="w-6 h-6 rounded bg-[#F7A400]/10 flex items-center justify-center border border-[#F7A400]/20">
          <Icon size={12} className="text-[#F7A400]" />
        </div>
        <div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block leading-none mb-0.5">Section {number}</span>
          <h3 className="font-bold text-gray-900 text-xs uppercase">{title}</h3>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-6 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7A400]/10 flex items-center justify-center shrink-0 border border-[#F7A400]/20">
            <FileText className="text-[#F7A400]" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Page Manager</h1>
            <p className="text-xs text-gray-500 mt-1">{editId ? `Editing: ${formData.pageTitle}` : "Create dynamic service & landing pages"}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          {editId && (
            <button type="button" onClick={resetForm} className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-4 py-1.5 rounded font-bold text-xs hover:bg-gray-200 transition-colors shadow-sm">
              <X size={14} /> Cancel
            </button>
          )}
          <button
            type="submit"
            form="page-form"
            disabled={loading}
            className="flex items-center gap-1.5 bg-[#F7A400] text-black px-4 py-1.5 rounded font-bold text-xs hover:bg-[#e59800] transition-colors shadow-sm disabled:opacity-50 border border-transparent"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {loading ? "Saving..." : editId ? "Update Page" : "Deploy Page"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <form id="page-form" onSubmit={handleSubmit} className="space-y-6">

          {/* ── SECTION 1: Core Identity + Hero Content ── */}
          <SectionCard icon={Layout} number="01" title="Core Identity & Hero Content">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Meta/Fields */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <label className={labelClass}>Page Title</label>
                  <input type="text" placeholder="e.g. SEO Services Dubai" className={inputClass} value={formData.pageTitle} onChange={handleTitleChange} required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1.5 block">URL Slug (Auto)</label>
                  <input type="text" readOnly className="w-full bg-blue-50/30 border border-blue-100 p-3 rounded-md font-mono text-xs text-blue-700 font-bold outline-none" value={formData.slug} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}><MousePointerClick size={10} className="inline mr-1" />Button Text</label>
                    <input type="text" placeholder="Get Started" className={inputClass} value={formData.btnText} onChange={(e) => setFormData({ ...formData, btnText: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Button URL</label>
                    <input type="text" placeholder="/contact" className={inputClass} value={formData.btnLink} onChange={(e) => setFormData({ ...formData, btnLink: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}><Search size={10} className="inline mr-1" />Meta Title</label>
                  <input type="text" placeholder="SEO Title tag..." className={inputClass} value={formData.metaTitle} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className={labelClass.replace("mb-1.5 block", "")}>Meta Description</label>
                    <span className={`text-[10px] font-bold ${formData.metaDescription.length > 160 ? "text-red-500" : "text-gray-400"}`}>{formData.metaDescription.length}/160</span>
                  </div>
                  <textarea placeholder="Meta description..." rows={3} className={`${inputClass} resize-none`} value={formData.metaDescription} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>SEO / Hero Image</label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/30 hover:border-[#F7A400] transition-all cursor-pointer overflow-hidden">
                    <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <div className="py-6 text-center pointer-events-none">
                      {formData.image ? (
                        <p className="text-xs font-bold text-[#F7A400]">{typeof formData.image === "string" ? formData.image : formData.image.name}</p>
                      ) : (
                        <>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Click to upload image</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Rich Text Editor */}
              <div className="lg:col-span-8">
                <label className={labelClass}>Hero / Main Content (Rich Text)</label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <JoditEditor ref={editorRef} value={formData.content} config={editorConfig}
                    onChange={(newContent) => setFormData((prev) => ({ ...prev, content: newContent }))} />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ── SECTION 2: Expertise / Knowledge Modules ── */}
          <SectionCard icon={Zap} number="02" title="Expertise Cards (Knowledge Modules)">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Section Title</label>
                  <input type="text" placeholder="Our Expertise" className={inputClass} value={formData.sec2Title} onChange={(e) => setFormData({ ...formData, sec2Title: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Section Description</label>
                  <textarea placeholder="Module main description..." className={`${inputClass} resize-none h-28`} value={formData.sec2Desc} onChange={(e) => setFormData({ ...formData, sec2Desc: e.target.value })} />
                </div>
              </div>
              <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-lg space-y-3">
                <p className="text-xs font-black text-[#F7A400] uppercase tracking-wider">Add New Card</p>
                <input type="text" placeholder="Card Title" className={inputClass} value={newCard.title} onChange={(e) => setNewCard({ ...newCard, title: e.target.value })} />
                <textarea placeholder="Card Description" className={`${inputClass} resize-none h-20`} value={newCard.desc} onChange={(e) => setNewCard({ ...newCard, desc: e.target.value })} />
                <div>
                  <label className="text-[10px] font-bold text-blue-500 uppercase block mb-1">Card Icon / Image</label>
                  <input type="file" onChange={(e) => setNewCard({ ...newCard, cardImage: e.target.files[0] })} className="text-xs text-gray-600 w-full file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#F7A400] file:text-black cursor-pointer" />
                </div>
                <button type="button" onClick={addCard} className="w-full py-2.5 bg-[#F7A400] text-white rounded-md text-xs font-bold uppercase hover:bg-[#d98f00] transition-all flex items-center justify-center gap-2">
                  <Plus size={14} /> Add Card
                </button>
              </div>
            </div>
            {formData.expertiseCards.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.expertiseCards.map((card, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-lg p-4 relative group hover:border-[#F7A400]/30 transition-all">
                    <button type="button" onClick={() => removeCard(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all">
                      <X size={10} />
                    </button>
                    {card.cardImage && <div className="w-9 h-9 mb-2 bg-gray-100 rounded-md overflow-hidden"><img src={card.cardImage instanceof File ? URL.createObjectURL(card.cardImage) : `/api${card.cardImage}`} className="w-full h-full object-cover" alt="icon" /></div>}
                    <p className="font-bold text-xs text-gray-900 truncate">{card.title}</p>
                    <p className="text-[10px] text-gray-400 line-clamp-2 mt-1">{card.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* ── SECTION 3: Standalone CTA Module (previously dark) ── */}
          <SectionCard icon={MousePointerClick} number="03" title="Standalone CTA / Banner Module">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Section Title</label>
                <input type="text" placeholder="Driving Digital Transformation" className={inputClass} value={formData.extraTitle || ""} onChange={(e) => setFormData({ ...formData, extraTitle: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Subtitle / Description</label>
                <textarea rows="3" placeholder="Short description..." className={`${inputClass} resize-none`} value={formData.extraSubtitle || ""} onChange={(e) => setFormData({ ...formData, extraSubtitle: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Button Text</label>
                <input type="text" placeholder="Contact Us" className={inputClass} value={formData.extraBtnText || ""} onChange={(e) => setFormData({ ...formData, extraBtnText: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Button URL</label>
                <input type="text" placeholder="/contact" className={inputClass} value={formData.extraBtnLink || ""} onChange={(e) => setFormData({ ...formData, extraBtnLink: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Section Image (Right)</label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/30 hover:border-[#F7A400] transition-all cursor-pointer overflow-hidden">
                  <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, extraImage: e.target.files[0] })} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="py-4 text-center pointer-events-none">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Upload Image</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ── SECTION 4: Feature Builder ── */}
          <SectionCard icon={Layout} number="04" title="Feature Component Builder">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-lg space-y-3">
                <p className="text-xs font-black text-[#F7A400] uppercase tracking-wider">Add Feature</p>
                <input type="text" placeholder="Feature Title (e.g. Scalable Architecture)" className={inputClass} value={newFeature.title} onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })} />
                <textarea placeholder="Feature Description..." className={`${inputClass} resize-none h-20`} value={newFeature.desc} onChange={(e) => setNewFeature({ ...newFeature, desc: e.target.value })} />
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Feature Image (16:10)</label>
                  <input type="file" onChange={(e) => setNewFeature({ ...newFeature, img: e.target.files[0] })} className="text-xs text-gray-600 w-full file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#F7A400] file:text-black cursor-pointer" />
                </div>
                <button type="button" onClick={addFeature} className="w-full py-2.5 bg-[#F7A400] text-white rounded-md text-xs font-bold uppercase hover:bg-[#d98f00] transition-all flex items-center justify-center gap-2">
                  <Plus size={14} /> Add Feature
                </button>
              </div>
              <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Queue ({formData.featureData.length})</p>
                {formData.featureData.length === 0 && (
                  <div className="text-xs italic text-gray-300 py-10 text-center border-2 border-dashed border-gray-100 rounded-lg">No features added yet...</div>
                )}
                {formData.featureData.map((item, idx) => (
                  <div key={idx} className="border border-gray-100 p-3 bg-white rounded-lg flex gap-3 items-center relative group hover:border-[#F7A400]/30 transition-all">
                    <button type="button" onClick={() => removeFeature(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all">
                      <X size={10} />
                    </button>
                    <div className="w-16 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0">
                      {item.img ? <img src={item.img instanceof File ? URL.createObjectURL(item.img) : `/api${item.img}`} className="w-full h-full object-cover" alt="feat" /> : <div className="flex items-center justify-center h-full text-[8px] text-gray-300">NO IMG</div>}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-gray-900 truncate">{item.title}</p>
                      <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ── SECTION 5: Process Steps ── */}
          <SectionCard icon={GitBranch} number="05" title="Working Process Manager">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className={labelClass}>Process Title</label>
                <input type="text" placeholder="OUR DESIGN PROCESS" className={inputClass} value={formData.processMainTitle} onChange={(e) => setFormData({ ...formData, processMainTitle: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Process Subtitle</label>
                <input type="text" placeholder="Short subtitle..." className={inputClass} value={formData.processMainSubtitle} onChange={(e) => setFormData({ ...formData, processMainSubtitle: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-lg space-y-3">
                <p className="text-xs font-black text-[#F7A400] uppercase tracking-wider">Add Step</p>
                <input type="text" placeholder="Step Title (e.g. Discovery)" className={inputClass} value={newStep.title} onChange={(e) => setNewStep({ ...newStep, title: e.target.value })} />
                <textarea placeholder="Step description..." className={`${inputClass} resize-none h-20`} value={newStep.description} onChange={(e) => setNewStep({ ...newStep, description: e.target.value })} />
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Step Icon/Graphic</label>
                  <input type="file" onChange={(e) => setNewStep({ ...newStep, img: e.target.files[0] })} className="text-xs text-gray-600 w-full file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#F7A400] file:text-black cursor-pointer" />
                </div>
                <button type="button" onClick={addProcessStep} className="w-full py-2.5 bg-[#F7A400] text-white rounded-md text-xs font-bold uppercase hover:bg-[#d98f00] transition-all flex items-center justify-center gap-2">
                  <Plus size={14} /> Add Step
                </button>
              </div>
              <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Process Flow ({formData.processSteps.length} steps)</p>
                {formData.processSteps.length === 0 && <div className="text-xs italic text-gray-300 py-10 text-center border-2 border-dashed border-gray-100 rounded-lg">No steps defined yet.</div>}
                {formData.processSteps.map((step, idx) => (
                  <div key={idx} className="border border-gray-100 p-3 bg-white rounded-lg flex gap-3 items-center relative group">
                    <button type="button" onClick={() => removeProcessStep(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all">
                      <X size={10} />
                    </button>
                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden shrink-0 flex items-center justify-center">
                      {step.img ? <img src={step.img instanceof File ? URL.createObjectURL(step.img) : `/api${step.img}`} className="w-full h-full object-contain p-1" alt="step" /> : <span className="text-xs font-black text-gray-300">{idx + 1}</span>}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-gray-900">{step.title}</p>
                      <p className="text-[10px] text-gray-400 line-clamp-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ── SECTION 6: Why Choose Us ── */}
          <SectionCard icon={CheckSquare} number="06" title="Why Choose Us (Checklist Section)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Section Title</label>
                  <input type="text" className={inputClass} placeholder="Why Choose Us" value={formData.sec6Title || ""} onChange={(e) => setFormData({ ...formData, sec6Title: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea className={`${inputClass} resize-none h-28`} placeholder="Main description..." value={formData.sec6Desc || ""} onChange={(e) => setFormData({ ...formData, sec6Desc: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>CTA Button Text</label>
                    <input type="text" placeholder="Book a Consultation" className={inputClass} value={formData.sec6BtnText || ""} onChange={(e) => setFormData({ ...formData, sec6BtnText: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>CTA Button URL</label>
                    <input type="text" placeholder="/contact" className={inputClass} value={formData.sec6BtnLink || ""} onChange={(e) => setFormData({ ...formData, sec6BtnLink: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Side Image</label>
                  <input type="file" className="text-xs text-gray-600 w-full file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#F7A400] file:text-black cursor-pointer" onChange={(e) => setFormData({ ...formData, sec6Image: e.target.files[0] })} />
                </div>
              </div>
              <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-lg">
                <p className="text-xs font-black text-[#F7A400] uppercase tracking-wider mb-3">Checklist Points</p>
                <div className="flex gap-2 mb-4">
                  <input type="text" placeholder="Type a point and press Enter…" className={`${inputClass} flex-1`} value={newPoint || ""} onChange={(e) => setNewPoint(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPoint())} />
                  <button type="button" onClick={addPoint} className="bg-[#F7A400] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-[#d98f00] transition-all">Add</button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {formData.sec6Points?.map((point, index) => (
                    <div key={index} className="flex items-center justify-between bg-white border border-gray-100 p-2.5 px-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#F7A400] rounded-full shrink-0" />
                        <span className="text-sm text-gray-700">{point}</span>
                      </div>
                      <button type="button" onClick={() => removePoint(index)} className="text-gray-300 hover:text-red-500 transition-colors ml-2"><X size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ── SECTION 7: Industries ── */}
          <SectionCard icon={Building2} number="07" title="Industries Section">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className={labelClass}>Industries Title</label>
                <input type="text" placeholder="Industry Expertise in..." className={inputClass} value={formData.industryMainTitle} onChange={(e) => setFormData({ ...formData, industryMainTitle: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Industries Subtitle</label>
                <textarea placeholder="Short description..." className={`${inputClass} resize-none h-20`} value={formData.industryMainSubtitle} onChange={(e) => setFormData({ ...formData, industryMainSubtitle: e.target.value })} />
              </div>
            </div>
            <div className="space-y-3">
              {formData.industryData.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50/50 border border-gray-100 rounded-lg relative group">
                  <button type="button" onClick={() => { const n = formData.industryData.filter((_, i) => i !== index); setFormData({ ...formData, industryData: n }); }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all"><X size={10} /></button>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Image</label>
                    <input type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { const n = [...formData.industryData]; n[index] = { ...n[index], img: e.target.files[0], hasFile: true }; setFormData({ ...formData, industryData: n }); }}}
                      className="text-xs text-gray-600 w-full file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#F7A400] file:text-black cursor-pointer" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Title</label>
                    <input type="text" placeholder="Industry Title" value={item.title} onChange={(e) => { const n = [...formData.industryData]; n[index].title = e.target.value; setFormData({ ...formData, industryData: n }); }} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Description</label>
                    <input type="text" placeholder="Short description" value={item.desc} onChange={(e) => { const n = [...formData.industryData]; n[index].desc = e.target.value; setFormData({ ...formData, industryData: n }); }} className={inputClass} />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setFormData({ ...formData, industryData: [...formData.industryData, { img: null, title: "", desc: "", hasFile: false }] })}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:text-[#F7A400] hover:border-[#F7A400] transition-all font-bold text-xs uppercase flex items-center justify-center gap-2">
                <Plus size={14} /> Add Industry Card
              </button>
            </div>
          </SectionCard>

          {/* ── SECTION 8: FAQ ── */}
          <SectionCard icon={HelpCircle} number="08" title="FAQ Section">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelClass}>FAQ Main Title</label>
                <input type="text" placeholder="Frequently Asked Questions" className={inputClass} value={formData.faqMainTitle} onChange={(e) => setFormData({ ...formData, faqMainTitle: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>FAQ Subtitle</label>
                <input type="text" placeholder="Everything you need to know..." className={inputClass} value={formData.faqMainSubtitle} onChange={(e) => setFormData({ ...formData, faqMainSubtitle: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-lg space-y-3">
                <p className="text-xs font-black text-[#F7A400] uppercase tracking-wider">Add Q&A</p>
                <input type="text" placeholder="Question?" className={inputClass} value={newFaq.question} onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })} />
                <textarea placeholder="Answer..." className={`${inputClass} resize-none h-20`} value={newFaq.answer} onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })} />
                <button type="button" onClick={addFaq} className="w-full py-2.5 bg-[#F7A400] text-white rounded-md text-xs font-bold uppercase hover:bg-[#d98f00] transition-all flex items-center justify-center gap-2">
                  <Plus size={14} /> Add FAQ
                </button>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {formData.faqs.length === 0 && <div className="text-xs italic text-gray-300 py-10 text-center border-2 border-dashed border-gray-100 rounded-lg">No FAQs added yet.</div>}
                {formData.faqs.map((faq, index) => (
                  <div key={index} className="flex justify-between items-start bg-white border border-gray-100 p-3 rounded-lg gap-3 group">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">Q: {faq.question}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">A: {faq.answer}</p>
                    </div>
                    <button type="button" onClick={() => removeFaq(index)} className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ── SECTION 9: SEO Content Blocks ── */}
          <SectionCard icon={AlignLeft} number="09" title="SEO Content Blocks">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-400">Add unlimited titles, paragraphs, and lists for SEO content.</p>
              <button type="button" onClick={addSeoBlock} className="flex items-center gap-1.5 bg-[#F7A400] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-[#d98f00] transition-all">
                <Plus size={14} /> Add Block
              </button>
            </div>
            <div className="space-y-3">
              {(!formData.seoContentBlocks || formData.seoContentBlocks.length === 0) && (
                <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-lg text-gray-400 text-xs">No SEO blocks added yet.</div>
              )}
              {formData.seoContentBlocks?.map((block, index) => (
                <div key={index} className="relative p-5 border border-gray-100 bg-gray-50/50 rounded-lg group hover:border-[#F7A400]/20 transition-all">
                  <button type="button" onClick={() => removeSeoBlock(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all"><X size={10} /></button>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-44 shrink-0">
                      <label className={labelClass}>Tag Type</label>
                      <select value={block.type} onChange={(e) => updateSeoBlock(index, "type", e.target.value)} className={inputClass}>
                        <option value="h1">H1 Title (Main)</option>
                        <option value="h2">H2 Title</option>
                        <option value="h3">H3 Title</option>
                        <option value="h4">H4 Title</option>
                        <option value="h5">H5 Title</option>
                        <option value="h6">H6 Title</option>
                        <option value="p">Paragraph (Text)</option>
                        <option value="list">Bullet List</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>Content</label>
                      {block.type === "list" ? (
                        <div className="space-y-2">
                          {block.items?.map((item, i) => (
                            <div key={i} className="flex gap-2">
                              <input type="text" value={item} onChange={(e) => updateSeoListItem(index, i, e.target.value)} placeholder="List item..." className={inputClass} />
                              <button type="button" onClick={() => removeSeoListItem(index, i)} className="text-gray-300 hover:text-red-500 transition-colors p-2"><Trash2 size={14} /></button>
                            </div>
                          ))}
                          <button type="button" onClick={() => addSeoListItem(index)} className="text-xs font-bold text-[#F7A400] hover:underline flex items-center gap-1 mt-1">
                            <Plus size={12} /> Add list item
                          </button>
                        </div>
                      ) : (
                        <textarea value={block.text} onChange={(e) => updateSeoBlock(index, "text", e.target.value)} placeholder="Write your content here..." className={`${inputClass} resize-none min-h-[80px]`} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </form>

        {/* ── Page Registry ── */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
          <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
            <div>
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Page Registry</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">All deployed service & landing pages</p>
            </div>
            <span className="bg-[#F7A400]/10 text-[#F7A400] px-2 py-0.5 rounded text-[10px] font-bold border border-[#F7A400]/20">
              {pages.length} Pages
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50/80 border-y border-gray-100">
                  <th className="py-2 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Page Title</th>
                  <th className="py-2 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Slug</th>
                  <th className="py-2 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-xs text-gray-400 italic">No pages deployed yet.</td>
                  </tr>
                ) : (
                  pages.map((page) => (
                    <tr key={page._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-2 px-3 align-middle">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-xs text-gray-900">{page.pageTitle}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 align-middle">
                        <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">/{page.slug}</span>
                      </td>
                      <td className="py-2 px-3 align-middle text-right">
                        <div className="flex justify-end gap-2 text-[10px]">
                          <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors font-semibold">
                            <Eye size={12} /> View
                          </a>
                          <button type="button" onClick={() => startEdit(page)} className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded hover:bg-amber-100 transition-colors font-semibold">
                            <Edit3 size={12} /> Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(page._id)} className="flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-600 rounded hover:bg-rose-100 transition-colors font-semibold">
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherPageManager;
