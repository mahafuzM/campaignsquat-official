import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, Save, Loader2 } from "lucide-react";

const FaqAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // আপনার লোকালহোস্ট API URL
  const API_URL = "https://api.campaignsquat.com/api/faqs";

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setFetching(true);
      const res = await axios.get(API_URL);
      // নিশ্চিত করা হচ্ছে যে ডাটাবেস থেকে আসা ডাটা যেন অ্যারে হয়
      setFaqs(res.data || []);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    } finally {
      setFetching(false);
    }
  };

  const addFaq = () => {
    // নতুন FAQ লিস্টের শুরুতে অ্যাড হবে
    setFaqs([{ question: "", answer: "", order: 0 }, ...faqs]);
  };

  // ✅ ডিলিট ফাংশন আপডেট করা হয়েছে (OK করলে সরাসরি ডাটাবেস আপডেট হবে)
  const deleteFaq = async (index) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      const newFaqs = faqs.filter((_, i) => i !== index);
      // ১. প্রথমে স্টেট আপডেট করা
      setFaqs([...newFaqs]);

      // ২. সরাসরি ডাটাবেসে সেভ পাঠানো
      setLoading(true);
      try {
        const faqsToSync = newFaqs.map((f, idx) => ({
          question: f.question || "",
          answer: f.answer || "",
          order: idx,
        }));

        const response = await axios.post(`${API_URL}/update`, {
          faqs: faqsToSync,
        });

        if (response.data) {
          setFaqs(response.data);
          console.log("Deleted & Saved to DB");
        }
      } catch (err) {
        console.error("Auto-save Error:", err);
        alert("❌ ডিলিট হয়েছে কিন্তু ডাটাবেসে সেভ হতে সমস্যা হয়েছে!");
        fetchFaqs(); // এরর হলে ডাটা ক্লিয়ার না করে আবার লোড করবে
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (faqs.length === 0) {
      const confirmClear = window.confirm(
        "You are about to clear all FAQs. Proceed?",
      );
      if (!confirmClear) return;
    }

    setLoading(true);
    try {
      // ব্যাকএন্ডে পাঠানোর আগে অপ্রয়োজনীয় ID এবং মেটাডাটা বাদ দেওয়া
      const faqsToSync = faqs.map((f, index) => ({
        question: f.question || "",
        answer: f.answer || "",
        order: index,
      }));

      const response = await axios.post(`${API_URL}/update`, {
        faqs: faqsToSync,
      });

      if (response.data) {
        setFaqs(response.data);
        alert("✅ Database updated successfully!");
      }
    } catch (err) {
      console.error("Save Error:", err);
      alert("❌ Error saving data! Check if server is running.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Loader2 className="animate-spin text-black" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-poppins text-black">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b-2 border-black pb-4">
          <h2 className="text-3xl text-black font-bold  tracking-tighter">
            Manage FAQs
          </h2>
          <span className="bg-black text-white px-3 py-1 text-xs font-bold rounded">
            Live Items: {faqs.length}
          </span>
        </div>

        <div className="space-y-4">
          {faqs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-400 italic">
                No FAQs found. Let's create some!
              </p>
            </div>
          )}

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative group transition-all hover:shadow-md hover:border-black/10"
            >
              <button
                onClick={() => deleteFaq(index)}
                className="absolute top-4 right-4 text-gray-300 hover:text-red-600 transition-colors p-2"
              >
                <Trash2 size={20} />
              </button>

              <div className="space-y-4 pr-10">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-black ">
                    Question
                  </label>
                  <input
                    className="w-full border-b-2 border-gray-50 focus:border-black outline-none py-2 transition-all font-semibold text-lg bg-transparent"
                    value={faq.question}
                    placeholder="Enter question..."
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

                <div className="flex flex-col gap-1">
                  <label className="text-[12px]  font-bold text-black ">
                    Answer
                  </label>
                  <textarea
                    className="w-full border border-gray-100 focus:border-black outline-none p-3 rounded-md h-28 text-sm leading-relaxed transition-all resize-none"
                    value={faq.answer}
                    placeholder="Enter detailed answer..."
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
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={addFaq}
            className="w-full border-2 border-dashed border-gray-400 py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white hover:border-black transition-all font-bold uppercase text-xs tracking-widest text-gray-400 hover:text-black"
          >
            <Plus size={18} /> Add New Question
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className={`w-full justify-center bg-[#F7A400] text-black text-[14px] md:text-[15px] hover:text-white hover:bg-[#02050A] font-semibold py-2 px-8 rounded-[5px] border-2 border-[#F7A400] transition-all duration-300 flex items-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "   active:scale-[0.99]"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Updating Database...
              </>
            ) : (
              <>
                <Save size={20} /> Save All Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqAdmin;
