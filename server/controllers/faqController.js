const Faq = require('../models/Faq');

exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1 });
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
};

exports.updateFaqs = async (req, res) => {
  try {
    const { faqs } = req.body;

    // ১. ডিলিট অপারেশন শেষ হওয়া পর্যন্ত await নিশ্চিত করুন
    const deleteResult = await Faq.deleteMany({});
    console.log(`Cleared database. Deleted ${deleteResult.deletedCount} old records.`);

    // ২. যদি ডাটা না থাকে তবে খালি অ্যারে পাঠানো
    if (!faqs || faqs.length === 0) {
      console.log("No FAQs provided, database is now empty.");
      return res.status(200).json([]);
    }

    // ৩. আইডি ক্লিন করা এবং ডেটা ভ্যালিডেট করা
    const freshFaqs = faqs
      .filter(f => f.question && f.answer) 
      .map((faq, index) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
        order: index // অটোমেটিক সিরিয়াল বজায় রাখা
      }));

    // ৪. নতুন ডাটা ইনসার্ট করা
    if (freshFaqs.length > 0) {
      const savedFaqs = await Faq.insertMany(freshFaqs);
      console.log(`Successfully inserted ${savedFaqs.length} fresh FAQs.`);
      res.status(200).json(savedFaqs);
    } else {
      res.status(200).json([]);
    }

  } catch (err) {
    console.error("Backend Sync Error:", err);
    res.status(500).json({ 
      error: "Database update failed.", 
      details: err.message 
    });
  }
}; // ব্র্যাকেট এখানে ঠিক করা হয়েছে