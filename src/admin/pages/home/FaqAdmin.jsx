import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import { 
  Trash2, 
  Plus, 
  Save, 
  Loader2, 
  MessageCircleQuestion, 
  GripVertical,
  HelpCircle,
  Database
} from "lucide-react";

const FaqAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setFetching(true);
      const res = await axios.get("/api/faqs");
      setFaqs(res.data || []);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      toast.error("Failed to load FAQs.");
    } finally {
      setFetching(false);
    }
  };

  const addFaq = () => {
    setFaqs([{ question: "", answer: "", order: 0 }, ...faqs]);
    toast.success("New FAQ added!");
  };

  const deleteFaq = async (index) => {
    toast((t) => (
      <div>
        <p className="text-sm font-medium text-gray-900 mb-3">
          Are you sure you want to delete this FAQ?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const newFaqs = faqs.filter((_, i) => i !== index);
              setFaqs([...newFaqs]);

              setLoading(true);
              try {
                const faqsToSync = newFaqs.map((f, idx) => ({
                  question: f.question || "",
                  answer: f.answer || "",
                  order: idx,
                }));

                const response = await axios.post("/api/faqs/update", {
                  faqs: faqsToSync,
                });

                if (response.data) {
                  setFaqs(response.data);
                  toast.success("FAQ deleted and synced!");
                }
              } catch (err) {
                console.error("Auto-save Error:", err);
                toast.error("Deleted locally but failed to save to server.");
                fetchFaqs();
              } finally {
                setLoading(false);
              }
            }}
            className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: 4000 });
  };

  const handleSave = async () => {
    if (faqs.length === 0) {
      toast((t) => (
        <div>
          <p className="text-sm font-medium text-gray-900 mb-3">
            You are about to clear all FAQs. Proceed?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                performSave();
              }}
              className="px-3 py-1.5 text-xs font-medium bg-[#F7A400] text-white hover:bg-[#e09400] rounded-md transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      ), { duration: 4000 });
      return;
    }

    performSave();
  };

  const performSave = async () => {
    setLoading(true);
    try {
      const faqsToSync = faqs.map((f, index) => ({
        question: f.question || "",
        answer: f.answer || "",
        order: index,
      }));

      const response = await axios.post("/api/faqs/update", {
        faqs: faqsToSync,
      });

      if (response.data) {
        setFaqs(response.data);
        toast.success("All FAQs synced successfully!");
      }
    } catch (err) {
      console.error("Save Error:", err);
      toast.error("Error saving FAQs!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/30">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#F7A400]/30 border-t-[#F7A400] rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-500 animate-pulse">
            Loading FAQs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 text-gray-900 font-poppins p-6 md:p-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-[#F7A400] pl-3">
            FAQ Management
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Add, update, or remove Frequently Asked Questions on your website.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-gray-100 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#F7A400]" />
              <span className="text-sm font-semibold">Total: {faqs.length}</span>
           </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-[#F7A400] text-white hover:bg-[#d98f00] text-[14px] font-medium py-2 px-6 rounded-md transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl">
        <div className="space-y-4">
          {faqs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium pb-4">
                No FAQs found. Let's create some!
              </p>
              <button
                onClick={addFaq}
                className="bg-white border border-[#F7A400] text-[#F7A400] hover:bg-[#F7A400] hover:text-white transition-colors px-6 py-2 rounded-md text-sm font-semibold"
              >
                Add Your First FAQ
              </button>
            </div>
          )}

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm relative group hover:border-[#F7A400]/30 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50">
                <span className="font-semibold text-sm text-gray-500 uppercase tracking-wider flex items-center gap-2">
                   <GripVertical className="w-4 h-4 text-gray-300 cursor-move" />
                   Question #{faqs.length - index} 
                   {/* Reversed visual numbering because unshift adds to top */}
                </span>
                <button
                  onClick={() => deleteFaq(index)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Icon Placeholder (Optional UI enhancement) */}
                <div className="hidden lg:flex lg:col-span-1 justify-center pt-2">
                   <div className="w-10 h-10 rounded-full bg-[#F7A400]/10 flex items-center justify-center">
                     <MessageCircleQuestion className="w-5 h-5 text-[#F7A400]" />
                   </div>
                </div>

                {/* Form Inputs */}
                <div className="lg:col-span-11 space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 block">
                      FAQ Question
                    </label>
                    <input
                      className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-3 transition-all outline-none font-medium"
                      value={faq.question}
                      placeholder="e.g. How long does a project take?"
                      onChange={(e) => {
                        const newFaqs = [...faqs];
                        newFaqs[index] = {
                          ...newFaqs[index],
                          question: e.target.value,
                        };
                        setFaqs(newFaqs);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 block">
                      Answer / Details
                    </label>
                    <textarea
                      className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-[#F7A400]/20 focus:border-[#F7A400] p-3 transition-all outline-none resize-none h-28 leading-relaxed"
                      value={faq.answer}
                      placeholder="Enter a detailed answer..."
                      onChange={(e) => {
                        const newFaqs = [...faqs];
                        newFaqs[index] = {
                          ...newFaqs[index],
                          answer: e.target.value,
                        };
                        setFaqs(newFaqs);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {faqs.length > 0 && (
             <button
               onClick={addFaq}
               className="w-full bg-white border-2 border-dashed border-gray-200 py-6 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#F7A400]/50 hover:bg-[#F7A400]/5 hover:text-[#F7A400] text-gray-400 transition-all font-semibold uppercase text-xs tracking-wider group"
             >
               <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center shadow-sm transition-colors mb-1">
                 <Plus size={20} className="text-gray-400 group-hover:text-[#F7A400]" />
               </div>
               Add New FAQ Item
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqAdmin;