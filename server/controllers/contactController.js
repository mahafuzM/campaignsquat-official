const Contact = require('../models/Contact'); 

// ১. কন্টাক্ট সাবমিট করা
exports.submitContact = async (req, res) => {
  console.log("---------- New Request Received ----------");
  try {
    const { fullName, email, whatsapp, service, budget, details } = req.body;
    const newContact = new Contact({ fullName, email, whatsapp, service, budget, details });
    await newContact.save();
    console.log("✅ Data Saved to MongoDB");
    res.status(201).json({ success: true, message: "Saved!" });
  } catch (err) {
    console.error("❌ DB Save Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ২. সব মেসেজ দেখা (Admin Panel)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ৩. মেসেজ ডিলিট করা (নতুন যোগ করা হলো) ✅
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params; // URL থেকে ID নেওয়া
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: "Message not found!" });
    }

    console.log(`🗑️ Message Deleted: ${id}`);
    res.status(200).json({ success: true, message: "Deleted Successfully!" });
  } catch (err) {
    console.error("❌ Delete Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};