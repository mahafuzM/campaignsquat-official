import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutGrid,
  FileText,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  Check,
} from "lucide-react";

const MegaMenuAdmin = () => {
  const [menus, setMenus] = useState([]);
  const categories = [
    "UI/UX Design",
    "Web Design & Development",
    "Software Development",
    "Mobile App Development",
  ];

  const API_BASE = "https://api.campaignsquat.com";

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
    // ✅ ৬ নম্বর সেকশনের মেইন টাইটেল ও ডেসক্রিপশন
    sec6Title: "",
    sec6Desc: "",
    // 🆕 ৭ নম্বর সেকশনের মেইন টাইটেল ও ডেসক্রিপশন
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

  // ✅ ৬ নম্বর সেকশনের জন্য নতুন স্টেট (ইন্ডাস্ট্রি কার্ডস)
  const [industries, setIndustries] = useState([
    { title: "", desc: "", img: null, preview: null },
  ]);

  // 🆕 ৭ নম্বর সেকশনের জন্য নতুন স্টেট (FAQ Data)
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const [points, setPoints] = useState([""]);
  const [sideImage, setSideImage] = useState(null);
  const [sidePreview, setSidePreview] = useState(null);

  const [contentImage, setContentImage] = useState(null);
  const [preview, setPreview] = useState(null);

const fetchMenus = async () => {
  try {
    // axios.defaults.baseURL সেট করা থাকলে শুধু পাথ দিলেই হবে
    const res = await axios.get("/api/megamenu"); 
    console.log("Data from backend:", res.data); // কনসোলে চেক করুন ডাটা আসছে কি না
    setMenus(res.data);
  } catch (err) {
    console.error("Fetch Error:", err.response?.data || err.message);
  }
};

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      // ১. সার্ভিস নেম থেকে সুন্দর স্লাগ তৈরি
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // সব স্পেস বা স্পেশাল ক্যারেক্টারকে ড্যাশ (-) করবে
        .replace(/(^-|-$)/g, ""); // শুরুতে বা শেষে ড্যাশ থাকলে মুছে ফেলবে

      setFormData({
        ...formData,
        title: value,
        slug: generatedSlug, // স্লাগ অটো সেট হবে
        path: `/services/${generatedSlug}`, // পাথ-ও অটোমেটিক তৈরি হবে
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setContentImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // --- Section 2 Handlers ---
  const addExpertiseCard = () =>
    setExpertise([
      ...expertise,
      { title: "", desc: "", img: null, preview: null },
    ]);
  const removeExpertiseCard = (index) =>
    setExpertise(expertise.filter((_, i) => i !== index));
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

  // --- Section 3 Handlers ---
  const addFeatureCard = () =>
    setFeatures([
      ...features,
      { title: "", desc: "", img: null, preview: null },
    ]);
  const removeFeatureCard = (index) =>
    setFeatures(features.filter((_, i) => i !== index));
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

  // --- Section 4 Handlers ---
  const addProcessStep = () =>
    setProcessSteps([
      ...processSteps,
      { title: "", desc: "", img: null, preview: null },
    ]);
  const removeProcessStep = (index) =>
    setProcessSteps(processSteps.filter((_, i) => i !== index));
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

  // --- ✅ Section 6 Handlers (Industries) ---
  const addIndustryCard = () =>
    setIndustries([
      ...industries,
      { title: "", desc: "", img: null, preview: null },
    ]);
  const removeIndustryCard = (index) =>
    setIndustries(industries.filter((_, i) => i !== index));
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

  // --- 🆕 Section 7 Handlers (FAQ) ---
  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));
  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  // --- Section 5 Handlers ---
  const addPoint = () => setPoints([...points, ""]);
  const removePoint = (index) =>
    setPoints(points.filter((_, i) => i !== index));
  const handlePointChange = (index, value) => {
    const updated = [...points];
    updated[index] = value;
    setPoints(updated);
  };
  const handleSideImage = (e) => {
    const file = e.target.files[0];
    setSideImage(file);
    if (file) setSidePreview(URL.createObjectURL(file));
  };

  const handleEdit = (item) => {
    setFormData({
      id: item._id,
      category: item.category,
      title: item.title,
      path: item.path,
      headerText: item.headerText || "",
      paragraphText: item.paragraphText || "",
      sec2Title: item.sec2Title,
      sec2Desc: item.sec2Desc,
      sec4Title: item.sec4Title || "",
      sec4Desc: item.sec4Desc || "",
      sec5Title: item.sec5Title || "",
      sec5Desc: item.sec5Desc || "",
      // ✅ ৬ নম্বর লোড
      sec6Title: item.sec6Title || "",
      sec6Desc: item.sec6Desc || "",
      // 🆕 ৭ নম্বর লোড
      sec7Title: item.sec7Title || "",
      sec7Desc: item.sec7Desc || "",
    });

    if (item.image) setPreview(`${API_BASE}/${item.image}`);
    if (item.sideImg) setSidePreview(`${API_BASE}/${item.sideImg}`);
    if (item.points) setPoints(item.points);

    if (item.expertiseCards) {
      setExpertise(
        item.expertiseCards.map((card) => ({
          title: card.title,
          desc: card.desc,
          img: null,
          preview: card.img ? `${API_BASE}/${card.img}` : null,
        })),
      );
    }

    if (item.featureData) {
      setFeatures(
        item.featureData.map((card) => ({
          title: card.title,
          desc: card.desc,
          img: null,
          preview: card.img ? `${API_BASE}/${card.img}` : null,
        })),
      );
    }

    if (item.processSteps) {
      setProcessSteps(
        item.processSteps.map((step) => ({
          title: step.title,
          desc: step.desc,
          img: null,
          preview: step.img ? `${API_BASE}/${step.img}` : null,
        })),
      );
    }

    // ✅ ৬ নম্বর ইন্ডাস্ট্রি ডাটা লোড
    if (item.industryData) {
      setIndustries(
        item.industryData.map((card) => ({
          title: card.title,
          desc: card.desc,
          img: null,
          preview: card.img ? `${API_BASE}/${card.img}` : null,
        })),
      );
    }

    // 🆕 ৭ নম্বর FAQ ডাটা লোড
    if (item.faqData) {
      setFaqs(
        item.faqData.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        })),
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${API_BASE}/api/megamenu/${id}`);
        fetchMenus();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // --- ১. কোর ইনফরমেশন (সরাসরি লুপ চালিয়ে এড করা হচ্ছে যাতে কোড ছোট থাকে) ---
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    // --- ২. ফাইলস (Hero & Side Image) ---
    if (contentImage) data.append("image", contentImage);
    if (sideImage) data.append("sideImage", sideImage);

    // --- ৩. সিম্পল অ্যারে ডাটা ---
    data.append("points", JSON.stringify(points));
    data.append("faqData", JSON.stringify(faqs));

    // --- ৪. ডাইনামিক কার্ড প্রসেসিং (Expertise, Features, Process, Industry) ---
    const processCards = (cards, dataName, imagePrefix) => {
      const metaData = cards.map((item, idx) => {
        // ১. যদি নতুন ইমেজ সিলেক্ট করা থাকে (File Object)
        if (item.img instanceof File) {
          data.append(`${imagePrefix}${idx}`, item.img);
        }

        return {
          title: item.title,
          desc: item.desc,
          // ২. যদি নতুন ইমেজ না থাকে, তবে আগের ইমেজ পাথটা পাঠাতে হবে (uploads/filename.jpg)
          // আপনার preview-তে https://api.campaignsquat.com/uploads/... থাকে, তাই শুধু uploads/... টুকু নিতে হবে
          img: item.preview ? item.preview.replace(`${API_BASE}/`, "") : "",
        };
      });
      data.append(dataName, JSON.stringify(metaData));
    };

    processCards(expertise, "expertiseData", "expertiseImage");
    processCards(features, "featureData", "featureImage");
    processCards(processSteps, "processData", "processImage");
    processCards(industries, "industryData", "industryImage");

    // --- ৫. API কল ---
    try {
      const url = formData.id
        ? `${API_BASE}/api/megamenu/${formData.id}`
        : `${API_BASE}/api/megamenu`;
      const method = formData.id ? "put" : "post";

      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        alert(
          formData.id
            ? "Service Updated Successfully! ✅"
            : "Service Published Successfully! 🚀",
        );
        fetchMenus();

        // ✅ রিসেট লজিক
        setFormData({
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
        setExpertise([{ title: "", desc: "", img: null, preview: null }]);
        setFeatures([{ title: "", desc: "", img: null, preview: null }]);
        setProcessSteps([{ title: "", desc: "", img: null, preview: null }]);
        setIndustries([{ title: "", desc: "", img: null, preview: null }]);
        setFaqs([{ question: "", answer: "" }]);
        setPoints([""]);
        setSideImage(null);
        setSidePreview(null);
        setContentImage(null);
        setPreview(null);
      }
    } catch (err) {
      console.error(
        "Critical Submission Error:",
        err.response?.data || err.message,
      );
      alert(
        `Error: ${err.response?.data?.message || "Check Console for details"}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 border-b-4 border-black pb-4 flex justify-between items-end">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Service Builder Pro
          </h1>
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
            {formData.id ? "Editing Mode" : "Desktop Upload Mode"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Section 1 & 2 Inputs (Category, Content, Media) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Configuration */}
            <div className="lg:col-span-5 space-y-6 font-poppins">
              <div className="bg-white border-[1px] border-black p-8 rounded-[5px]">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2  tracking-tight text-black">
                  <LayoutGrid size={20} className="text-black" /> Configuration
                </h2>

                <div className="space-y-5">
                  {/* ক্যাটাগরি */}
                  <div>
                    <label className="text-[11px] font-bold  text-black mb-1.5 block tracking-wide">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-white border-[1px] border-black p-3 rounded-lg font-semibold text-black outline-none cursor-pointer focus:ring-1 focus:ring-black transition-all appearance-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* মেইন নাম */}
                  <div>
                    <label className="text-[11px] font-bold text-black mb-1.5 block tracking-wide">
                      Service Name
                    </label>
                    <input
                      name="title"
                      placeholder="e.g. Web Development"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-white border-[1px] border-black p-3 rounded-[5px] font-semibold text-sm outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-black transition-all"
                      required
                    />
                  </div>

                  {/* অটোমেটিক ইউআরএল স্লাগ */}
                  <div>
                    <label className="text-[11px] text-blue-600 mb-1.5 block  font-bold tracking-wide">
                      URL Slug (Auto-generated)
                    </label>
                    <input
                      name="slug"
                      value={formData.slug}
                      readOnly
                      className="w-full bg-blue-50/50 border-[1px] border-blue-200 p-3 rounded-lg font-mono text-sm outline-none text-blue-700 font-bold"
                    />
                  </div>

                  {/* অটোমেটিক পাথ */}
                  <div>
                    <label className="text-[11px] font-bold  text-black mb-1.5 block tracking-wide">
                      Full Path Preview
                    </label>
                    <input
                      name="path"
                      value={formData.path}
                      readOnly
                      className="w-full bg-gray-50 border-[1px] border-gray-200 p-3 rounded-lg font-mono text-[10px] outline-none text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 1st section */}
            <div className="lg:col-span-7">
              <div className="bg-white border-2 border-black p-8 rounded-[5px]  h-full flex flex-col">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 tracking-tight text-black">
                  <FileText size={22} /> 1st section Content & Media
                </h2>

                <div className="space-y-6 flex-grow">
                  {/* Main H1 Heading */}
                  <div>
                    <label className="text-lg font-bold mb-1 block ">
                      Hero Section Heading (H1)
                    </label>
                    <input
                      name="headerText"
                      placeholder="Enter the catchy title for the hero section..."
                      value={formData.headerText}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border-2 border-black p-4 rounded-[5px] font-black text-sm outline-none focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Main Description */}
                  <div>
                    <label className="text-lg font-bold text-black mb-1 block ">
                      Hero Main Description (P)
                    </label>
                    <textarea
                      name="paragraphText"
                      placeholder="Write a detailed description that appears under the H1..."
                      value={formData.paragraphText}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border-2 border-black p-4 rounded-2xl h-40 outline-none resize-none font-medium focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="text-lg font-bold text-black mb-1 block ">
                      Hero Content Image
                    </label>
                    <div className="relative group border-4 border-dashed border-gray-200 rounded-3xl p-6 hover:border-blue-600 transition-all bg-gray-50 text-center cursor-pointer overflow-hidden">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                      />
                      {preview ? (
                        <div className="space-y-2">
                          <img
                            src={preview}
                            alt="Preview"
                            className="max-h-44 mx-auto rounded-xl border-2 border-black shadow-md object-cover"
                          />
                          <p className="text-xs font-bold text-blue-600 ">
                            Image Ready to Upload!
                          </p>
                        </div>
                      ) : (
                        <div className="py-4">
                          <Upload
                            className="mx-auto text-gray-300 group-hover:text-blue-600 transition-colors"
                            size={40}
                          />
                          <p className="text-lg font-semi mt-2 text-gray-400 group-hover:text-black">
                            Click to upload hero image
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 (Expertise) - Unchanged Design */}
          <div className="bg-white border border-black p-8 md:p-10 rounded-[5px] ">
            <h2 className="text-[20px] font-bold mb-6 flex items-center gap-2 tracking-tight text-black">
              <FileText size={22} /> Section 2:
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b-2 border pb-8">
              <div className="w-full md:w-1/2 space-y-4">
                <input
                  name="sec2Title"
                  placeholder="Expertise Section Title"
                  value={formData.sec2Title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-black p-4 rounded-[5px] font-bold text-lg outline-none"
                />
                <textarea
                  name="sec2Desc"
                  placeholder="Section Sub-title / Description"
                  value={formData.sec2Desc}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 border-black p-4 rounded-[5px] h-24 outline-none resize-none font-bold"
                />
              </div>
              <button
                type="button"
                onClick={addExpertiseCard}
                className="bg-black text-white px-6 py-3 rounded-[5px] font-black  flex items-center gap-2 hover:bg-blue-600 transition-all"
              >
                <Plus size={20} /> Add Expertise
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border-2 border-black p-6 rounded-[5px] relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeExpertiseCard(index)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-[5px] border-2 border-black opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-20 h-20 shrink-0 relative border-2 border-black rounded-[5px] bg-white flex items-center justify-center overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleExpertiseFile(index, e.target.files[0])
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      {item.preview ? (
                        <img
                          src={item.preview}
                          className="w-full h-full object-cover"
                          alt="Card"
                        />
                      ) : (
                        <ImageIcon className="text-gray-300" />
                      )}
                    </div>
                    <div className="flex-grow space-y-3">
                      <input
                        placeholder="Expertise Title"
                        value={item.title}
                        onChange={(e) =>
                          handleExpertiseChange(index, "title", e.target.value)
                        }
                        className="w-full bg-transparent border-b-2 border-black font-black text-lg outline-none"
                      />
                      <textarea
                        placeholder="Expertise Desc"
                        value={item.desc}
                        onChange={(e) =>
                          handleExpertiseChange(index, "desc", e.target.value)
                        }
                        className="w-full bg-transparent h-16 outline-none resize-none font-medium text-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🆕 Section 3 (Features) - Same Design as Section 2 */}
          <div className="bg-white border border-black p-8 md:p-10 rounded-[5px] ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b-2 border-black pb-8">
              <div className="w-full md:w-1/2">
                <h2 className="text-[20px] font-bold tracking-tighter text-black">
                  Section 3: Feature Details
                </h2>
                <p className="text-sm font-semibold text-black  mt-1">
                  Add additional features and highlights
                </p>
              </div>
              <button
                type="button"
                onClick={addFeatureCard}
                className="bg-black text-white px-6 py-3 rounded-[5px] font-black uppercase flex items-center gap-2 hover:bg-green-600 transition-all"
              >
                <Plus size={20} /> Add Feature
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border-2 border-black p-6 rounded-[5px] relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeFeatureCard(index)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-[5px] border-2 border-black opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-20 h-20 shrink-0 relative border-2 border-black rounded-[5px]bg-white flex items-center justify-center overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFeatureFile(index, e.target.files[0])
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      {item.preview ? (
                        <img
                          src={item.preview}
                          className="w-full h-full object-cover"
                          alt="Card"
                        />
                      ) : (
                        <ImageIcon className="text-gray-300" />
                      )}
                    </div>
                    <div className="flex-grow space-y-3">
                      <input
                        placeholder="Feature Title"
                        value={item.title}
                        onChange={(e) =>
                          handleFeatureChange(index, "title", e.target.value)
                        }
                        className="w-full bg-transparent border-b-2 border-black font-bold text-xl outline-none"
                      />
                      <textarea
                        placeholder="Feature Desc"
                        value={item.desc}
                        onChange={(e) =>
                          handleFeatureChange(index, "desc", e.target.value)
                        }
                        className="w-full bg-transparent h-16 outline-none resize-none font-medium text-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ✅ নতুন ৪ নম্বর সেকশনের UI (ডিজাইন অনুযায়ী) */}
          <div className="bg-white border border-black p-8 md:p-10 rounded-[5px] ">
            <h2 className="text-[20px] font-bold tracking-tighter text-black">
              Section 4:{" "}
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 mb-10 gap-4 border-b-2 border-black pb-8">
              <div className="w-full md:w-1/2 space-y-4">
                <input
                  name="sec4Title"
                  placeholder="Process Section Title (e.g. Our Process)"
                  value={formData.sec4Title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 border-black p-4 rounded-[5px] font-bold text-xl outline-none"
                />
                <textarea
                  name="sec4Desc"
                  placeholder="Section Description"
                  value={formData.sec4Desc}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 border-black p-4 rounded-[5px] h-24 outline-none resize-none font-bold"
                />
              </div>
              <button
                type="button"
                onClick={addProcessStep}
                className="bg-black text-white px-6 py-3 rounded-[5px] font-black uppercase flex items-center gap-2 hover:bg-orange-600 transition-all"
              >
                <Plus size={20} /> Add Process Step
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processSteps.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border-2 border-black p-6 rounded-[5px] relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeProcessStep(index)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full border-2 border-black opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-20 h-20 shrink-0 relative border-2 border-black rounded-xl bg-white flex items-center justify-center overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleProcessFile(index, e.target.files[0])
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      {item.preview ? (
                        <img
                          src={item.preview}
                          className="w-full h-full object-cover"
                          alt="Step"
                        />
                      ) : (
                        <ImageIcon className="text-gray-300" />
                      )}
                    </div>
                    <div className="flex-grow space-y-3">
                      <input
                        placeholder="Step Title"
                        value={item.title}
                        onChange={(e) =>
                          handleProcessChange(index, "title", e.target.value)
                        }
                        className="w-full bg-transparent border-b-2 border-black font-black text-lg outline-none"
                      />
                      <textarea
                        placeholder="Step Description"
                        value={item.desc}
                        onChange={(e) =>
                          handleProcessChange(index, "desc", e.target.value)
                        }
                        className="w-full bg-transparent h-16 outline-none resize-none font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ✅ ৫ নম্বর সেকশন (Why Choose Us) - ৪ নম্বর সেকশনের নিচে */}
          <div className="bg-white border border-black p-8 md:p-10 rounded-[5px] ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8 border-b-2 border-black pb-8">
              <div className="w-full md:w-2/3 space-y-4">
                <h2 className="text-[20px] font-bold  tracking-tighter text-black">
                  Section 5: Why Choose Us
                </h2>
                <input
                  name="sec5Title"
                  placeholder="Why Choose Title (e.g. Why Choose Campaignsquat?)"
                  value={formData.sec5Title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 border-black p-4 rounded-[5px] font-bold text-xl outline-none focus:border-[#F7A400]"
                />
                <textarea
                  name="sec5Desc"
                  placeholder="Section Description Paragraph"
                  value={formData.sec5Desc}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 border-black p-4 rounded-[5px] h-24 outline-none resize-none font-bold focus:border-[#F7A400]"
                />
              </div>

              {/* সাইড ইমেজ আপলোড */}
              <div className="w-full md:w-1/3">
                <label className="text-xl font-semibold  text-black mb-2 block ">
                  Side Illustration / Image
                </label>
                <div className="relative group border-4 border-dashed border-gray-200 rounded-[5px] p-4 hover:border-[#F7A400] transition-all bg-gray-50 text-center cursor-pointer overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSideImage}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  />
                  {sidePreview ? (
                    <img
                      src={sidePreview}
                      alt="Side Preview"
                      className="max-h-32 mx-auto rounded-lg border-2 border-black shadow-sm"
                    />
                  ) : (
                    <div className="py-2">
                      <ImageIcon className="mx-auto text-gray-300" size={30} />
                      <p className="text-[10px] font-bold  mt-1">
                        Upload Side Image
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* ডাইনামিক পয়েন্ট লিস্ট */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                  <Check size={20} className="text-[#F7A400] stroke-[4px]" />{" "}
                  Key Points / Benefits
                </h3>
                <button
                  type="button"
                  onClick={addPoint}
                  className="bg-black text-white px-4 py-4 rounded-[5px] font-black uppercase text-xs flex items-center gap-2 hover:bg-[#F7A400] hover:text-black transition-all"
                >
                  <Plus size={14} /> Add New Point
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 border-2 border-black p-3 rounded-2xl group transition-all hover:bg-white"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F7A400] border-2 border-black flex items-center justify-center font-black text-sm shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {index + 1}
                    </div>
                    <input
                      value={point}
                      onChange={(e) => handlePointChange(index, e.target.value)}
                      placeholder="Enter benefit point..."
                      className="flex-1 bg-transparent border-none outline-none font-bold text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removePoint(index)}
                      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ ৬ নম্বর সেকশন (Industries Section) */}
          <div className="bg-white border border-black p-8 md:p-10 rounded-[5px]  mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b-2 border-black pb-8">
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-[20px] font-bold tracking-tighter text-black flex items-center gap-2">
                  <LayoutGrid size={28} className="stroke-[3px]" /> 6. Industry
                  Expertise
                </h2>
                <input
                  name="sec6Title"
                  placeholder="Section 6 Title"
                  value={formData.sec6Title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 border-black p-4 rounded-[5px] font-black text-lg outline-none focus:border-blue-600"
                />
                <textarea
                  name="sec6Desc"
                  placeholder="Section Description..."
                  value={formData.sec6Desc}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 border-black p-4 rounded-[5px] h-24 outline-none resize-none font-bold"
                />
              </div>
              <button
                type="button"
                onClick={addIndustryCard}
                className="bg-black text-white px-6 py-3 rounded-[5px] font-black flex items-center gap-2 hover:bg-blue-600 transition-all  active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <Plus size={20} /> Add Industry
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industries.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border-2 border-black p-6 rounded-[5px] relative group hover:bg-white transition-all"
                >
                  <button
                    type="button"
                    onClick={() => removeIndustryCard(index)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full border-2 border-black opacity-0 group-hover:opacity-100 transition-all z-30 shadow-md"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-24 h-24 shrink-0 relative border-2 border-black rounded-[5px] bg-white flex items-center justify-center overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleIndustryFile(index, e.target.files[0])
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      {item.preview ? (
                        <img
                          src={item.preview}
                          className="w-full h-full object-cover"
                          alt="Industry Preview"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="text-gray-300" size={32} />
                          <p className="text-[10px] font-black text-gray-400  mt-1 text-center">
                            Upload Icon
                          </p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <Upload size={20} className="text-black" />
                      </div>
                    </div>

                    <div className="flex-grow space-y-3">
                      <input
                        placeholder="Industry Title"
                        value={item.title}
                        onChange={(e) =>
                          handleIndustryChange(index, "title", e.target.value)
                        }
                        className="w-full bg-transparent border-b-2 border-black font-black text-lg outline-none focus:border-blue-600"
                      />
                      <textarea
                        placeholder="Short description of your expertise in this industry..."
                        value={item.desc}
                        onChange={(e) =>
                          handleIndustryChange(index, "desc", e.target.value)
                        }
                        className="w-full bg-transparent h-16 outline-none resize-none font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- 🆕 Section 7: FAQ Management (Redesigned) --- */}
          <div className="bg-white border border-black p-8 md:p-10 rounded-[5px]  mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b-2 border-black pb-8">
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-[20px] font-bold  tracking-tighter text-black flex items-center gap-2">
                  <FileText size={28} className="stroke-[3px]" /> 7. FAQ
                  Strategy
                </h2>
                <input
                  name="sec7Title"
                  placeholder="FAQ Section Title (e.g. Frequently Asked Questions)"
                  value={formData.sec7Title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 border-black p-4 rounded-[5px] font-bold text-xl outline-none focus:border-[#F7A400]"
                />
                <input
                  name="sec7Desc"
                  placeholder="Short Section Sub-title"
                  value={formData.sec7Desc}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border-2 text-lg border-black p-4 rounded-[5px] font-bold outline-none"
                />
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="bg-black text-white px-6 py-3 rounded-[5px] font-black  flex items-center gap-2 hover:bg-[#F7A400] hover:text-black transition-all "
              >
                <Plus size={20} /> Add New FAQ
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border-2 border-black p-6 rounded-[5px] relative group hover:bg-white transition-all"
                >
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full border-2 border-black opacity-0 group-hover:opacity-100 transition-all z-30"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-black text-white w-8 h-8 rounded-[5px] flex items-center justify-center font-black text-xs shrink-0">
                        Q
                      </span>
                      <input
                        placeholder="Enter the question..."
                        value={faq.question}
                        onChange={(e) =>
                          handleFaqChange(index, "question", e.target.value)
                        }
                        className="w-full bg-transparent border-b-2 border-black font-bold text-lg outline-none  py-1"
                      />
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-[#F7A400] text-black w-8 h-8 rounded-[5px] flex items-center justify-center font-black text-xs shrink-0 mt-1">
                        A
                      </span>
                      <textarea
                        placeholder="Provide a detailed, SEO-friendly answer..."
                        value={faq.answer}
                        onChange={(e) =>
                          handleFaqChange(index, "answer", e.target.value)
                        }
                        className="w-full bg-white border-2 border-black p-4 rounded-[5px] h-24 outline-none resize-none font-medium text-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-black py-4 rounded-[5px] hover:bg-blue-600 transition-all transform active:scale-95  text-2xl hover:shadow-none hover:translate-x-1 hover:translate-y-1 mb-20"
          >
            {formData.id
              ? "🚀 Update Digital Architecture"
              : "🌍 Publish to Campaignsquat"}
          </button>
        </form>

        {/* --- All Services List (Table) --- */}
        <div className="mt-20 font-poppins">
          <h2 className="text-[22px] font-semibold mb-8  text-black">
            Manage Published Services
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {menus.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-6 bg-white border border-black rounded-[5px] hover:bg-gray-50 transition-all"
              >
                {/* Left Side: Image & Core Info */}
                <div className="flex items-center gap-6">
                  {item.image && (
  <img
    // এখানে URL-টি ডাইনামিক করে দিন যাতে লোকাল এবং লাইভ দুই জায়গাতেই পায়
    src={`${window.location.hostname === "localhost" ? "http://localhost:5000" : "https://api.campaignsquat.com"}/${item.image}`}
    className="w-20 h-20 object-cover rounded-[5px] border border-black"
    alt={item.title}
    // যদি ইমেজ লোড হতে ফেইল করে তবে কনসোলে এরর দেখাবে
    onError={(e) => console.log("Image Load Failed:", e.target.src)} 
  />
)}

                  <div>
                    {/* ১. ক্যাটাগরি (e.g., UI/UX Design) */}
                    <p className="text-[14px] font-black text-black  mb-1">
                      {item.category}
                    </p>

                    {/* ২. সার্ভিস টাইটেল (e.g., App Interfaces) */}
                    <h3 className="font-black text-[12px] text-black  leading-none">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Right Side: Simple Black Action Buttons */}
                <div className="flex gap-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-4 bg-white border border-black rounded-[5px] hover:bg-gray-50 transition-all group"
                  >
                    <Edit3
                      size={20}
                      strokeWidth={3}
                      className="text-blue-600 group-hover:scale-110 transition-transform"
                    />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-4 bg-white border border-black rounded-[5px] hover:bg-gray-50 transition-all group"
                  >
                    <Trash2
                      size={20}
                      strokeWidth={3}
                      className="text-red-600 group-hover:scale-110 transition-transform"
                    />
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

export default MegaMenuAdmin;
