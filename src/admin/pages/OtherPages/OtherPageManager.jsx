import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import JoditEditor from "jodit-react";
import { Plus, Trash2, Save } from "lucide-react";

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
    // 👇 8. FAQ Section
    faqMainTitle: "",
    faqMainSubtitle: "",
    faqs: [],
    // 👇 9. SEO Content Blocks (New)
    seoContentBlocks: [], // [{ type: "p", text: "", items: [] }]
  });

  const [newCard, setNewCard] = useState({
    title: "",
    desc: "",
    cardImage: null,
  });
  const [newFeature, setNewFeature] = useState({
    title: "",
    desc: "",
    img: null,
  });
  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    img: null,
  });
  const [newPoint, setNewPoint] = useState("");
  const [newIndustry, setNewIndustry] = useState({
    title: "",
    desc: "",
    img: null,
  });
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  const API_BASE = "/api/other-pages";

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing content...",
      height: 400,
      uploader: { insertImageAsBase64URI: true },
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
      ],
    }),
    [],
  );

  const fetchPages = useCallback(async () => {
    try {
      const res = await axios.get(API_BASE);
      setPages(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to sync with registry");
    }
  }, []);

  useEffect(() => {
    fetchPages();
    setMounted(true);
  }, [fetchPages]);

  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    const autoSlug = titleValue
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, pageTitle: titleValue, slug: autoSlug }));
  };

  const startEdit = (page) => {
    setEditId(page._id);
    const safeParse = (data) => {
      try {
        if (!data) return [];
        return typeof data === "string" ? JSON.parse(data) : data;
      } catch (e) {
        return [];
      }
    };

    setFormData({
      pageTitle: page.pageTitle || "",
      slug: page.slug || "",
      content: page.content || "",
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      btnText: page.btnText || "",
      btnLink: page.btnLink || "",
      image: page.image || null,
      sec2Title: page.sec2Title || "",
      sec2Desc: page.sec2Desc || "",
      expertiseCards: safeParse(page.expertiseCards),
      featureData: safeParse(page.featureData),
      processMainTitle: page.processMainTitle || "",
      processMainSubtitle: page.processMainSubtitle || "",
      processSteps: safeParse(page.processSteps),
      sec6Title: page.sec6Title || "",
      sec6Desc: page.sec6Desc || "",
      sec6Points: safeParse(page.sec6Points),
      sec6BtnText: page.sec6BtnText || "Book a Free Consultation",
      sec6BtnLink: page.sec6BtnLink || "/home/contact",
      sec6Image: page.sec6Image || null,
      industryMainTitle: page.industryMainTitle || "",
      industryMainSubtitle: page.industryMainSubtitle || "",
      industryData: safeParse(page.industryData),
      faqMainTitle: page.faqMainTitle || "",
      faqMainSubtitle: page.faqMainSubtitle || "",
      faqs: safeParse(page.faqs),
      // 👇 Load Section 9
      seoContentBlocks: safeParse(page.seoContentBlocks),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("মামা, ডাটা এডিটের জন্য রেডি!");
  };

  const resetForm = () => {
    setFormData({
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
    setEditId(null);
  };

  // --- 1-8 Handlers (অক্ষত) ---
  const addCard = () => {
    if (!newCard.title?.trim() || !newCard.desc?.trim())
      return toast.error("Card details required!");
    setFormData((prev) => ({
      ...prev,
      expertiseCards: [...(prev.expertiseCards || []), { ...newCard }],
    }));
    setNewCard({ title: "", desc: "", cardImage: null });
  };
  const removeCard = (index) =>
    setFormData((prev) => ({
      ...prev,
      expertiseCards: prev.expertiseCards.filter((_, i) => i !== index),
    }));

  const addFeature = () => {
    if (!newFeature.title || !newFeature.desc)
      return toast.error("Feature integrity check failed!");
    setFormData((prev) => ({
      ...prev,
      featureData: [...prev.featureData, newFeature],
    }));
    setNewFeature({ title: "", desc: "", img: null });
  };
  const removeFeature = (index) =>
    setFormData((prev) => ({
      ...prev,
      featureData: prev.featureData.filter((_, i) => i !== index),
    }));

  const addProcessStep = () => {
    if (!newStep.title?.trim() || !newStep.description?.trim())
      return toast.error("Step details required!");
    setFormData((prev) => ({
      ...prev,
      processSteps: [...(prev.processSteps || []), { ...newStep }],
    }));
    setNewStep({ title: "", description: "", img: null });
  };
  const removeProcessStep = (index) =>
    setFormData((prev) => ({
      ...prev,
      processSteps: prev.processSteps.filter((_, i) => i !== index),
    }));

  const addPoint = () => {
    if (!newPoint.trim()) return toast.error("Point content required!");
    setFormData((prev) => ({
      ...prev,
      sec6Points: [...(prev.sec6Points || []), newPoint.trim()],
    }));
    setNewPoint("");
  };
  const removePoint = (index) =>
    setFormData((prev) => ({
      ...prev,
      sec6Points: prev.sec6Points.filter((_, i) => i !== index),
    }));

  const addIndustry = () => {
    if (!newIndustry.title?.trim() || !newIndustry.desc?.trim())
      return toast.error("Industry details required!");
    setFormData((prev) => ({
      ...prev,
      industryData: [...(prev.industryData || []), { ...newIndustry }],
    }));
    setNewIndustry({ title: "", desc: "", img: null });
  };
  const removeIndustry = (index) =>
    setFormData((prev) => ({
      ...prev,
      industryData: prev.industryData.filter((_, i) => i !== index),
    }));

  const addFaq = () => {
    if (!newFaq.question?.trim() || !newFaq.answer?.trim())
      return toast.error("Question and Answer required!");
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { ...newFaq }],
    }));
    setNewFaq({ question: "", answer: "" });
    toast.success("FAQ Added!");
  };
  const removeFaq = (index) =>
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));

  // 👇 --- 9. Section 9 SEO Blocks Logic ---
  const addSeoBlock = () => {
    setFormData((prev) => ({
      ...prev,
      seoContentBlocks: [
        ...(prev.seoContentBlocks || []),
        { type: "p", text: "", items: [] },
      ],
    }));
  };

  const updateSeoBlock = (index, field, value) => {
    const updated = [...formData.seoContentBlocks];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, seoContentBlocks: updated }));
  };

  const addSeoListItem = (blockIndex) => {
    const updated = [...formData.seoContentBlocks];
    if (!updated[blockIndex].items) updated[blockIndex].items = [];
    updated[blockIndex].items.push("");
    setFormData((prev) => ({ ...prev, seoContentBlocks: updated }));
  };

  const updateSeoListItem = (blockIndex, itemIndex, value) => {
    const updated = [...formData.seoContentBlocks];
    updated[blockIndex].items[itemIndex] = value;
    setFormData((prev) => ({ ...prev, seoContentBlocks: updated }));
  };

  const removeSeoListItem = (blockIndex, itemIndex) => {
    const updated = [...formData.seoContentBlocks];
    updated[blockIndex].items = updated[blockIndex].items.filter(
      (_, i) => i !== itemIndex,
    );
    setFormData((prev) => ({ ...prev, seoContentBlocks: updated }));
  };

  const removeSeoBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      seoContentBlocks: prev.seoContentBlocks.filter((_, i) => i !== index),
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("মামা, নিশ্চিত তো? ডিলিট করলে কিন্তু আর ফিরে পাবি না!"))
      return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      toast.success("Node Deleted Successfully! 🔥");
      fetchPages();
    } catch (err) {
      toast.error("মামা, ডিলিট করতে গিয়ে ঝামেলা হইছে!");
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (
          ![
            "expertiseCards",
            "featureData",
            "processSteps",
            "sec6Points",
            "industryData",
            "faqs",
            "seoContentBlocks",
            "image",
            "sec6Image",
          ].includes(key)
        ) {
          data.append(key, formData[key]);
        }
      });

      if (formData.image instanceof File) data.append("image", formData.image);
      if (formData.sec6Image instanceof File)
        data.append("sec6Image", formData.sec6Image);

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
        if (ind.img instanceof File) {
          data.append("industryImages", ind.img);
          return { title: ind.title, desc: ind.desc, hasFile: true };
        }
        return { ...ind, hasFile: false };
      });
      data.append("industryData", JSON.stringify(processedIndustries));

      data.append("sec6Points", JSON.stringify(formData.sec6Points));
      data.append("faqs", JSON.stringify(formData.faqs));

      // 👇 9. Append Section 9 Data
      data.append(
        "seoContentBlocks",
        JSON.stringify(formData.seoContentBlocks),
      );

      const token = localStorage.getItem("adminToken");
      await axios({
        method: editId ? "put" : "post",
        url: editId ? `${API_BASE}/${editId}` : API_BASE,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      toast.success(editId ? "Production Node Updated" : "New Node Deployed");
      resetForm();
      fetchPages();
    } catch (err) {
      toast.error("Engine Process Failure");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-8 bg-white min-h-screen text-black selection:bg-yellow-300">
      <div className="max-w-7xl mx-auto font-sans">
        <header className="flex justify-between items-center mb-8 border-b-4 border-black pb-4 font-black italic uppercase">
          <h2 className="text-4xl tracking-tighter">
            SEO Engine Manager{" "}
            <span className="text-sm not-italic font-normal lowercase bg-black text-white px-2 ml-2">
              v2.0
            </span>
          </h2>
          {editId && (
            <button
              onClick={resetForm}
              className="bg-red-600 text-white px-6 py-2 text-sm hover:skew-x-2 transition-transform border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Abort Edit
            </button>
          )}
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* SECTION 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              <div className="border-2 border-black p-4 space-y-3 bg-[#fdfdfd] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <label className="text-[10px] font-bold uppercase underline decoration-[#F7A400] decoration-2">
                  1. Core Identity
                </label>
                <input
                  type="text"
                  placeholder="PAGE TITLE"
                  className="w-full border-2 border-black p-3 font-bold focus:bg-yellow-50 outline-none transition-colors"
                  value={formData.pageTitle}
                  onChange={handleTitleChange}
                  required
                />
                <input
                  type="text"
                  readOnly
                  placeholder="SLUG"
                  className="w-full border-2 border-black p-2 bg-gray-100 text-[10px] font-mono opacity-70"
                  value={formData.slug}
                />
              </div>

              <div className="border-2 border-black p-4 space-y-3 bg-[#F0F7FF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <label className="text-[10px] font-bold uppercase underline decoration-blue-500 decoration-2">
                  2. Action Trigger
                </label>
                <input
                  type="text"
                  placeholder="BTN TEXT"
                  className="w-full border-2 border-black p-2 text-sm outline-none focus:bg-white"
                  value={formData.btnText}
                  onChange={(e) =>
                    setFormData({ ...formData, btnText: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="BTN LINK (URL)"
                  className="w-full border-2 border-black p-2 text-sm outline-none focus:bg-white"
                  value={formData.btnLink}
                  onChange={(e) =>
                    setFormData({ ...formData, btnLink: e.target.value })
                  }
                />
              </div>

              <div className="border-2 border-black p-4 space-y-3 bg-[#FFFDEB] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase underline decoration-yellow-600 decoration-2">
                    3. SEO Protocol
                  </label>
                  <span
                    className={`text-[9px] font-bold ${formData.metaDescription.length > 160 ? "text-red-500" : "text-gray-400"}`}
                  >
                    {formData.metaDescription.length}/160
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="META TITLE"
                  className="w-full border-2 border-black p-2 text-sm outline-none"
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                />
                <textarea
                  placeholder="META DESCRIPTION"
                  rows="3"
                  className="w-full border-2 border-black p-2 text-sm resize-none outline-none focus:bg-white"
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaDescription: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase">
                    SEO IMAGE PATH / UPLOAD
                  </span>
                  <input
                    type="file"
                    className="text-[10px] file:mr-4 file:py-1 file:px-4 file:border-2 file:border-black file:text-[10px] file:font-bold file:bg-white hover:file:bg-black hover:file:text-white file:transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                  />
                  {formData.image && (
                    <p className="text-[8px] truncate font-mono bg-black/5 p-1">
                      {typeof formData.image === "string"
                        ? formData.image
                        : formData.image.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="border-2 border-black h-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <JoditEditor
                  ref={editorRef}
                  value={formData.content}
                  config={config}
                  onChange={(newContent) =>
                    setFormData((prev) => ({ ...prev, content: newContent }))
                  }
                />
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="border-2 border-black p-6 bg-[#F9FAFB] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <label className="text-[11px] font-bold uppercase bg-black text-white px-4 py-1 mb-6 inline-block italic skew-x-[-10deg]">
              Section 2: Knowledge Modules
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <p className="text-[9px] font-bold uppercase text-gray-400 tracking-tighter">
                  // Global Header Configuration
                </p>
                <input
                  type="text"
                  placeholder="MODULE MAIN TITLE"
                  className="w-full border-2 border-black p-3 text-sm font-black uppercase italic outline-none focus:ring-2 ring-[#F7A400]"
                  value={formData.sec2Title}
                  onChange={(e) =>
                    setFormData({ ...formData, sec2Title: e.target.value })
                  }
                />
                <textarea
                  placeholder="MODULE MAIN DESCRIPTION"
                  className="w-full border-2 border-black p-3 text-sm h-32 resize-none outline-none focus:bg-white"
                  value={formData.sec2Desc}
                  onChange={(e) =>
                    setFormData({ ...formData, sec2Desc: e.target.value })
                  }
                />
              </div>

              <div className="border-2 border-black p-5 bg-white space-y-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#F7A400] text-black text-[8px] font-black px-2 py-1 uppercase">
                  New Entry
                </div>
                <p className="text-[10px] font-bold uppercase underline">
                  Append Expertise Card
                </p>
                <input
                  type="text"
                  placeholder="CARD TITLE"
                  className="w-full border-b-2 border-black p-1 text-sm font-bold outline-none focus:border-[#F7A400] transition-all"
                  value={newCard.title}
                  onChange={(e) =>
                    setNewCard({ ...newCard, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="CARD DESCRIPTION"
                  className="w-full border-b-2 border-black p-1 text-xs outline-none h-20 resize-none focus:border-[#F7A400]"
                  value={newCard.desc}
                  onChange={(e) =>
                    setNewCard({ ...newCard, desc: e.target.value })
                  }
                />
                <div className="space-y-1">
                  <label className="text-[9px] font-bold block uppercase text-blue-600">
                    Vector Icon / Display Image
                  </label>
                  <input
                    type="file"
                    className="text-[10px] w-full"
                    onChange={(e) =>
                      setNewCard({ ...newCard, cardImage: e.target.files[0] })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={addCard}
                  className="w-full bg-black text-white text-xs font-bold py-3 uppercase hover:bg-[#F7A400] hover:text-black transition-all active:scale-95 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]"
                >
                  + Queue for Production
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
              {formData.expertiseCards.map((card, idx) => (
                <div
                  key={idx}
                  className="border-2 border-black p-3 bg-white relative group min-h-[140px] hover:-translate-y-1 transition-transform"
                >
                  <button
                    type="button"
                    onClick={() => removeCard(idx)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold border-2 border-black hover:rotate-90 transition-transform"
                  >
                    ×
                  </button>
                  <div className="flex items-start gap-2 mb-2">
                    {card.cardImage ? (
                      <div className="w-10 h-10 border border-black overflow-hidden flex-shrink-0">
                        <img
                          src={
                            card.cardImage instanceof File
                              ? URL.createObjectURL(card.cardImage)
                              : `/api${card.cardImage}`
                          }
                          className="w-full h-full object-cover"
                          alt="icon"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center text-[8px] text-gray-400">
                        NO IMG
                      </div>
                    )}
                    <h5 className="font-black text-[11px] uppercase leading-tight line-clamp-2">
                      {card.title}
                    </h5>
                  </div>
                  <p className="text-[10px] line-clamp-3 opacity-70 italic border-t border-black/5 pt-1">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* SECTION 3 */}
          <div className="bg-[#111] p-6 rounded-lg border border-white/5 mt-10">
            <h3 className="text-[#F7A400] font-black uppercase italic mb-6 tracking-widest border-b border-white/10 pb-2">
              // Section 03: Custom Standalone Module
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-bold uppercase">
                  Section Title
                </label>
                <input
                  type="text"
                  placeholder="Ex: Driving Dubai's Digital Transformation"
                  className="bg-black border border-white/10 p-3 rounded text-white focus:border-[#F7A400] outline-none"
                  value={formData.extraTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, extraTitle: e.target.value })
                  }
                />
              </div>

              {/* Subtitle / Description */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-gray-400 text-xs font-bold uppercase">
                  Section Subtitle / Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Write a short description for this section..."
                  className="bg-black border border-white/10 p-3 rounded text-white focus:border-[#F7A400] outline-none"
                  value={formData.extraSubtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, extraSubtitle: e.target.value })
                  }
                ></textarea>
              </div>

              {/* Button Text */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-bold uppercase">
                  Button Text
                </label>
                <input
                  type="text"
                  placeholder="Ex: Contact Us"
                  className="bg-black border border-white/10 p-3 rounded text-white focus:border-[#F7A400] outline-none"
                  value={formData.extraBtnText}
                  onChange={(e) =>
                    setFormData({ ...formData, extraBtnText: e.target.value })
                  }
                />
              </div>

              {/* Button URL */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-bold uppercase">
                  Button URL (Link)
                </label>
                <input
                  type="text"
                  placeholder="Ex: /contact or https://..."
                  className="bg-black border border-white/10 p-3 rounded text-white focus:border-[#F7A400] outline-none"
                  value={formData.extraBtnLink}
                  onChange={(e) =>
                    setFormData({ ...formData, extraBtnLink: e.target.value })
                  }
                />
              </div>

              {/* Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-bold uppercase">
                  Section Image (Right Side)
                </label>
                <input
                  type="file"
                  className="bg-black border border-white/10 p-2 rounded text-white file:bg-[#F7A400] file:border-none file:px-4 file:py-1 file:rounded file:mr-4 file:cursor-pointer"
                  onChange={(e) =>
                    setFormData({ ...formData, extraImage: e.target.files[0] })
                  }
                />
              </div>

              {/* Accent Color */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-bold uppercase">
                  Accent Color (Glow/Lines)
                </label>
                <input
                  type="color"
                  className="bg-black border border-white/10 p-1 h-12 rounded w-full cursor-pointer"
                  value={formData.extraColor}
                  onChange={(e) =>
                    setFormData({ ...formData, extraColor: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* --- SECTION 4: FEATURE INTEGRATION (REVERSE GRID) --- */}
          <div className="mt-10 border-2 border-black p-6 bg-[#02050A] text-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
            <label className="text-[11px] font-bold uppercase bg-[#F7A400] text-black px-4 py-1 mb-6 inline-block italic skew-x-[-10deg]">
              Section 4: Feature Component Builder
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left: Input Form */}
              <div className="space-y-4 border-2 border-white/10 p-5 bg-white/5 relative">
                <p className="text-[10px] font-bold uppercase text-[#F7A400] tracking-widest">
                  // Inject New Feature
                </p>

                <div>
                  <input
                    type="text"
                    placeholder="FEATURE TITLE (E.G. SCALABLE ARCHITECTURE)"
                    className="w-full bg-transparent border-b-2 border-white/20 p-2 text-sm font-bold outline-none focus:border-[#F7A400] transition-all uppercase"
                    value={newFeature.title}
                    onChange={(e) =>
                      setNewFeature({ ...newFeature, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <textarea
                    placeholder="FEATURE DESCRIPTION..."
                    className="w-full bg-transparent border-2 border-white/10 p-3 text-xs outline-none h-28 resize-none focus:border-[#F7A400]"
                    value={newFeature.desc}
                    onChange={(e) =>
                      setNewFeature({ ...newFeature, desc: e.target.value })
                    }
                  />
                </div>

                <div className="bg-white/5 p-3 border border-dashed border-white/20">
                  <label className="text-[9px] font-black uppercase text-gray-400 block mb-2">
                    Feature Image (16:10 Recommended)
                  </label>
                  <input
                    type="file"
                    className="text-[10px] file:bg-[#F7A400] file:border-none file:px-3 file:py-1 file:mr-4 file:font-bold cursor-pointer"
                    onChange={(e) =>
                      setNewFeature({ ...newFeature, img: e.target.files[0] })
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={addFeature}
                  className="w-full bg-white text-black text-[11px] font-black py-4 uppercase hover:bg-[#F7A400] transition-all"
                >
                  + Push Feature to List
                </button>
              </div>

              {/* Right: Preview Queue */}
              <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2 custom-scrollbar">
                <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">
                  // Live Queue ({formData.featureData.length})
                </p>

                {formData.featureData.length === 0 && (
                  <div className="text-[10px] italic opacity-30 py-20 text-center border-2 border-dashed border-white/5 uppercase tracking-tighter">
                    Empty Stack: Waiting for data injection...
                  </div>
                )}

                {formData.featureData.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-white/10 p-3 bg-white/5 flex gap-4 items-center relative group hover:border-[#F7A400]/40 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold border-2 border-black z-20 hover:scale-110 transition-transform"
                    >
                      ×
                    </button>

                    {/* Image Preview Block */}
                    <div className="w-20 h-14 bg-black flex-shrink-0 border border-white/10 overflow-hidden relative">
                      {item.img ? (
                        <img
                          src={
                            item.img instanceof File
                              ? URL.createObjectURL(item.img)
                              : `/api${item.img}`
                          }
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                          alt="feat"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[8px] text-gray-600 font-bold">
                          NO IMG
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h6 className="text-[11px] font-black uppercase text-[#F7A400] truncate">
                        {item.title}
                      </h6>
                      <p className="text-[9px] text-gray-400 line-clamp-2 leading-tight mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- SECTION 5: PROCESS STEPS BUILDER --- */}
          <div className="mt-10 border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(247,164,0,1)]">
            <label className="text-[11px] font-bold uppercase bg-black text-white px-4 py-1 mb-6 inline-block italic skew-x-[-10deg]">
              Section 5: Working Process Manager
            </label>

            {/* Header Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pb-6 border-b-2 border-dashed border-gray-200">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400">
                  Main Section Title
                </label>
                <input
                  type="text"
                  placeholder="E.G. OUR DESIGN PROCESS"
                  className="w-full border-2 border-black p-3 text-sm font-black uppercase outline-none focus:ring-2 ring-[#F7A400]"
                  value={formData.processMainTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processMainTitle: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400">
                  Main Section Subtitle
                </label>
                <input
                  type="text"
                  placeholder="SHORT SUBTITLE HERE..."
                  className="w-full border-2 border-black p-3 text-sm outline-none"
                  value={formData.processMainSubtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processMainSubtitle: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left: Step Form */}
              <div className="space-y-4 bg-gray-50 p-5 border-2 border-black relative">
                <p className="text-[10px] font-bold uppercase text-[#F7A400] tracking-widest">
                  // Add Individual Step
                </p>
                <input
                  type="text"
                  placeholder="STEP TITLE (E.G. DISCOVERY)"
                  className="w-full border-2 border-black p-2 text-sm font-bold outline-none"
                  value={newStep.title}
                  onChange={(e) =>
                    setNewStep({ ...newStep, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="STEP DESCRIPTION..."
                  className="w-full border-2 border-black p-2 text-xs h-24 resize-none outline-none"
                  value={newStep.description}
                  onChange={(e) =>
                    setNewStep({ ...newStep, description: e.target.value })
                  }
                />
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase">
                    Step Icon/Graphic
                  </label>
                  <input
                    type="file"
                    className="text-[10px] w-full"
                    onChange={(e) =>
                      setNewStep({ ...newStep, img: e.target.files[0] })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={addProcessStep}
                  className="w-full bg-[#F7A400] text-black text-xs font-black py-3 uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                >
                  + Add Step to Process
                </button>
              </div>

              {/* Right: Step Queue Preview */}
              <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                <p className="text-[10px] font-bold uppercase text-gray-400">
                  // Current Process Flow
                </p>
                {formData.processSteps.length === 0 && (
                  <div className="text-[10px] italic opacity-50 py-10 text-center border-2 border-dashed">
                    No steps defined yet.
                  </div>
                )}

                {formData.processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-black p-3 bg-white flex gap-4 items-center relative group"
                  >
                    <button
                      type="button"
                      onClick={() => removeProcessStep(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] border-2 border-black z-10"
                    >
                      ×
                    </button>
                    <div className="w-12 h-12 bg-black flex-shrink-0 border border-gray-200 overflow-hidden flex items-center justify-center">
                      {step.img && (
                        <img
                          src={
                            step.img instanceof File
                              ? URL.createObjectURL(step.img)
                              : `/api${step.img}`
                          }
                          className="w-full h-full object-contain p-1 invert"
                          alt="step-icon"
                        />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <h6 className="text-[11px] font-black uppercase truncate">
                        {step.title}
                      </h6>
                      <p className="text-[9px] text-gray-500 line-clamp-1 italic">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- SECTION 6: WHY CHOOSE US (CHECKLIST) --- */}
          <div className="mt-10 border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(247,164,0,1)]">
            <label className="text-[11px] font-bold uppercase bg-black text-white px-4 py-1 mb-6 inline-block italic skew-x-[-10deg]">
              Section 6: Why Choose Us (Checklist)
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black mb-1">
                    SECTION TITLE
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-black p-3 text-sm font-bold outline-none uppercase"
                    value={formData.sec6Title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, sec6Title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black mb-1">
                    DESCRIPTION
                  </label>
                  <textarea
                    className="w-full border-2 border-black p-3 text-sm h-32 resize-none outline-none"
                    value={formData.sec6Desc || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, sec6Desc: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="BTN TEXT"
                    className="border-2 border-black p-2 text-xs outline-none font-bold"
                    value={formData.sec6BtnText || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, sec6BtnText: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="BTN LINK"
                    className="border-2 border-black p-2 text-xs outline-none font-bold"
                    value={formData.sec6BtnLink || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, sec6BtnLink: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black mb-1">
                    SIDE IMAGE
                  </label>
                  <input
                    type="file"
                    className="text-xs"
                    onChange={(e) =>
                      setFormData({ ...formData, sec6Image: e.target.files[0] })
                    }
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-5 border-2 border-black">
                <p className="text-[10px] font-bold uppercase mb-4 text-[#F7A400] italic">
                  // Dynamic List Points
                </p>

                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Type a point..."
                    className="flex-1 border-2 border-black p-2 text-sm outline-none font-medium"
                    value={newPoint || ""}
                    onChange={(e) => setNewPoint(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addPoint())
                    }
                  />
                  <button
                    type="button"
                    onClick={addPoint}
                    className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase hover:bg-[#F7A400]"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                  {/* Safe Map using Optional Chaining */}
                  {formData.sec6Points?.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white border-2 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <span className="text-[12px] font-bold">{point}</span>
                      <button
                        type="button"
                        onClick={() => removePoint(index)}
                        className="text-red-600 font-black px-2 hover:scale-125 transition-transform"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION 7: INDUSTRIES SECTION --- */}
          <div className="p-6 bg-[#0F1117] border border-white/5 rounded-xl mt-8">
            <h3 className="text-[#F7A400] font-black italic uppercase text-xl mb-6 flex items-center gap-2">
              <span className="bg-[#F7A400] text-black px-2 py-0.5 rounded text-sm">
                07
              </span>
              Industries Section
            </h3>

            {/* Main Titles */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Main Title
                </label>
                <input
                  type="text"
                  value={formData.industryMainTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      industryMainTitle: e.target.value,
                    })
                  }
                  placeholder="Ex: Industry Expertise in High-Performance UI/UX Design"
                  className="w-full bg-[#02050A] border border-white/10 p-3 rounded text-white focus:border-[#F7A400] outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Main Subtitle
                </label>
                <textarea
                  value={formData.industryMainSubtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      industryMainSubtitle: e.target.value,
                    })
                  }
                  placeholder="Write a short description..."
                  className="w-full bg-[#02050A] border border-white/10 p-3 rounded text-white focus:border-[#F7A400] outline-none h-24"
                />
              </div>
            </div>

            {/* Industry Cards List */}
            <div className="space-y-4">
              <label className="block text-gray-400 text-sm mb-2">
                Industry Cards (Image, Title, Desc)
              </label>
              {formData.industryData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-black/40 border border-white/5 rounded-lg relative group"
                >
                  {/* ✅ Image Upload (Perfectly Updated) */}
                  <div className="md:col-span-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const newItems = [...formData.industryData];
                          newItems[index] = {
                            ...newItems[index],
                            img: file,
                            hasFile: true,
                          };
                          setFormData({ ...formData, industryData: newItems });
                        }
                      }}
                      className="w-full bg-[#02050A] border border-white/10 p-1.5 rounded text-white text-[10px] cursor-pointer file:bg-[#F7A400] file:text-black file:border-none file:rounded file:px-2 file:py-1 file:mr-2 file:font-bold"
                    />
                    {item.img && (
                      <p className="text-[10px] text-gray-500 mt-1 truncate px-1">
                        {item.img instanceof File
                          ? item.img.name
                          : "Current: " + item.img.split("/").pop()}
                      </p>
                    )}
                  </div>

                  {/* Title */}
                  <div className="md:col-span-1">
                    <input
                      type="text"
                      placeholder="Industry Title"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...formData.industryData];
                        newItems[index].title = e.target.value;
                        setFormData({ ...formData, industryData: newItems });
                      }}
                      className="w-full bg-[#02050A] border border-white/10 p-2 rounded text-white text-sm focus:border-[#F7A400] outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-1">
                    <input
                      type="text"
                      placeholder="Short Description"
                      value={item.desc}
                      onChange={(e) => {
                        const newItems = [...formData.industryData];
                        newItems[index].desc = e.target.value;
                        setFormData({ ...formData, industryData: newItems });
                      }}
                      className="w-full bg-[#02050A] border border-white/10 p-2 rounded text-white text-sm focus:border-[#F7A400] outline-none"
                    />
                  </div>

                  {/* Remove Button */}
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = formData.industryData.filter(
                          (_, i) => i !== index,
                        );
                        setFormData({ ...formData, industryData: newItems });
                      }}
                      className="text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              {/* Add More Button */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    industryData: [
                      ...formData.industryData,
                      { img: null, title: "", desc: "", hasFile: false },
                    ],
                  })
                }
                className="w-full py-3 border-2 border-dashed border-white/10 text-gray-400 hover:text-[#F7A400] hover:border-[#F7A400]/50 transition-all rounded-lg font-bold uppercase text-xs tracking-widest"
              >
                + ADD NEW INDUSTRY CARD
              </button>
            </div>
          </div>

          {/* --- Section 8: FAQ Settings --- */}
          <div className="p-6 bg-gray-800 rounded-xl border border-white/5 space-y-6">
            <h3 className="text-xl font-bold text-[#F7A400] flex items-center gap-2">
              <span className="bg-[#F7A400]/10 p-2 rounded-lg text-[#F7A400]">
                08
              </span>
              FAQ Section
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="FAQ Main Title"
                className="w-full bg-gray-900 border border-white/10 p-3 rounded text-white focus:border-[#F7A400] outline-none"
                value={formData.faqMainTitle}
                onChange={(e) =>
                  setFormData({ ...formData, faqMainTitle: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="FAQ Main Subtitle"
                className="w-full bg-gray-900 border border-white/10 p-3 rounded text-white focus:border-[#F7A400] outline-none"
                value={formData.faqMainSubtitle}
                onChange={(e) =>
                  setFormData({ ...formData, faqMainSubtitle: e.target.value })
                }
              />
            </div>

            {/* FAQ Input Form */}
            <div className="bg-gray-900/50 p-4 rounded-lg border border-dashed border-white/20">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Question"
                  className="w-full bg-gray-800 border border-white/10 p-2 rounded"
                  value={newFaq.question}
                  onChange={(e) =>
                    setNewFaq({ ...newFaq, question: e.target.value })
                  }
                />
                <textarea
                  placeholder="Answer"
                  className="w-full bg-gray-800 border border-white/10 p-2 rounded"
                  value={newFaq.answer}
                  onChange={(e) =>
                    setNewFaq({ ...newFaq, answer: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={addFaq}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-bold transition-colors"
                >
                  Add to FAQ List
                </button>
              </div>
            </div>

            {/* FAQ List Display */}
            <div className="space-y-3">
              {formData.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-900 p-3 rounded border border-white/5"
                >
                  <div>
                    <p className="text-sm font-bold text-white">
                      Q: {faq.question}
                    </p>
                    <p className="text-xs text-gray-400">
                      A: {faq.answer.substring(0, 50)}...
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-red-500 hover:bg-red-500/10 p-2 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SECTION 9: DYNAMIC SEO CONTENT BUILDER ================= */}
          <div className="bg-[#111] p-6 rounded-lg border border-white/10 mt-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Section 9: SEO Content Blocks
                </h2>
                <p className="text-sm text-gray-500">
                  Add unlimited titles, paragraphs, and lists for SEO.
                </p>
              </div>
              <button
                type="button"
                onClick={addSeoBlock}
                className="flex items-center gap-2 bg-[#F7A400] text-black px-4 py-2 rounded font-bold hover:bg-orange-500 transition-all"
              >
                <Plus size={18} /> Add New Block
              </button>
            </div>

            <div className="space-y-6">
              {formData.seoContentBlocks?.map((block, index) => (
                <div
                  key={index}
                  className="relative p-5 border border-white/5 bg-[#0A0A0A] rounded-md group"
                >
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    {/* Tag Type Selector */}
                    <div className="w-full md:w-40">
                      <label className="text-xs text-gray-500 block mb-1">
                        Select Tag
                      </label>
                      <select
                        value={block.type}
                        onChange={(e) =>
                          updateSeoBlock(index, "type", e.target.value)
                        }
                        className="w-full bg-[#1a1a1a] text-white border border-white/10 rounded px-2 py-2.5 outline-none focus:border-[#F7A400]"
                      >
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

                    {/* Content Input Area */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        Content Text
                      </label>
                      {block.type === "list" ? (
                        <div className="space-y-2">
                          {block.items?.map((item, i) => (
                            <div key={i} className="flex gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) =>
                                  updateSeoListItem(index, i, e.target.value)
                                }
                                placeholder="Enter list item text..."
                                className="w-full bg-[#1a1a1a] text-white border border-white/10 rounded px-4 py-2 outline-none focus:border-[#F7A400]"
                              />
                              <button
                                type="button"
                                onClick={() => removeSeoListItem(index, i)}
                                className="text-red-500 p-2 hover:bg-red-500/10 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addSeoListItem(index)}
                            className="text-[#F7A400] text-sm font-medium hover:underline flex items-center gap-1 mt-2"
                          >
                            + Add Item to List
                          </button>
                        </div>
                      ) : (
                        <textarea
                          value={block.text}
                          onChange={(e) =>
                            updateSeoBlock(index, "text", e.target.value)
                          }
                          placeholder="Write your content here... (Supports HTML for links)"
                          className="w-full bg-[#1a1a1a] text-white border border-white/10 rounded px-4 py-2 min-h-[100px] outline-none focus:border-[#F7A400]"
                        />
                      )}
                    </div>
                  </div>

                  {/* Remove Block Button */}
                  <button
                    type="button"
                    onClick={() => removeSeoBlock(index)}
                    className="absolute -top-3 -right-3 bg-red-600 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {(!formData.seoContentBlocks ||
              formData.seoContentBlocks.length === 0) && (
              <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-lg text-gray-500">
                No SEO blocks added. Click the button above to add titles or
                text.
              </div>
            )}
          </div>
          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-8 text-white font-black text-4xl uppercase italic shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-[#F7A400] hover:text-black hover:-translate-y-1 active:translate-y-0 active:shadow-none"}`}
          >
            {loading ? (
              <>
                <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-8 h-8"></span>
                Synchronizing...
              </>
            ) : editId ? (
              "Update Production Node"
            ) : (
              "Deploy Production Node"
            )}
          </button>
        </form>

        {/* REGISTRY LIST */}
        <div className="mt-20 border-t-8 border-black pt-10">
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-black uppercase italic text-3xl tracking-tighter decoration-[#F7A400] underline underline-offset-8">
              Global Node Registry
            </h3>
            <p className="text-[10px] font-mono font-bold bg-black text-white px-3 py-1">
              TOTAL NODES: {pages.length}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pages.map((page) => (
              <div
                key={page._id}
                className="border-2 border-black p-5 flex flex-col justify-between hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all bg-white group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-2 h-full bg-[#F7A400] translate-x-full group-hover:translate-x-0 transition-transform"></div>
                <div>
                  <h4 className="font-black uppercase text-[14px] leading-tight mb-2 group-hover:text-[#F7A400] transition-colors line-clamp-2">
                    {page.pageTitle}
                  </h4>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-[9px] font-mono opacity-60 uppercase tracking-tighter truncate">
                      PATH: /p/{page.slug}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t-2 border-black/5">
                  <a
                    href={`/p/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-black uppercase underline decoration-blue-500 decoration-4 underline-offset-2 hover:bg-blue-50 transition-colors"
                  >
                    View
                  </a>
                  <button
                    type="button"
                    onClick={() => startEdit(page)}
                    className="text-[11px] font-black uppercase underline decoration-[#F7A400] decoration-4 underline-offset-2 hover:bg-yellow-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(page._id)}
                    className="text-[11px] font-black uppercase underline decoration-red-600 decoration-4 underline-offset-2 text-red-600 hover:bg-red-50 transition-colors ml-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherPageManager;
