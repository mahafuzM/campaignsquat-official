const RecentProject = require('../models/RecentProject');

// ডাটা গেট করা
exports.getRecent = async (req, res) => {
  try {
    const data = await RecentProject.findOne();
    if (!data) return res.status(200).json({ title: "", subtitle: "", projects: [], history: [] });
    res.status(200).json(data);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Error" });
  }
};

// আপডেট লজিক (Latest Mongoose Standard + Image Fix + 10MB Support)
exports.updateRecent = async (req, res) => {
  try {
    const { title, subtitle, projects } = req.body;

    // ১. ইমেজ পাথ ভ্যালিডেশন এবং ক্লিনিং (WebP, JPG, PNG সব সাপোর্ট করবে)
    // এখানে আমরা নিশ্চিত করছি যে ডাটাবেজে শুধু ক্লিন পাথ সেভ হবে
    const sanitizedProjects = projects.map(project => ({
      ...project,
      image: project.image ? project.image.replace(/^http:\/\/localhost:5000/, '') : ''
    }));
    
    // নতুন হিস্টোরি অবজেক্ট
    const newLog = { 
      action: `Updated: ${sanitizedProjects.length} projects in grid`, 
      date: new Date() 
    };

    const updated = await RecentProject.findOneAndUpdate(
      {}, 
      { 
        $set: { 
          title, 
          subtitle, 
          projects: sanitizedProjects // ক্লিন এবং ভ্যালিডেটেড ডাটা
        },
        $push: { 
          history: { 
            $each: [newLog], 
            $position: 0, // নতুনটা সবসময় উপরে থাকবে
            $slice: 20    // হিস্টোরি সর্বোচ্চ ২০টি রাখবে
          } 
        } 
      },
      { 
        upsert: true, 
        returnDocument: 'after' // লেটেস্ট মুঙ্গুস স্ট্যান্ডার্ড
      }
    );

    res.status(200).json(updated);
  } catch (err) {
    // যদি রিকোয়েস্ট বডি খুব বড় হয় (১০ এমবি'র বেশি), তবে এখানে এরর ক্যাচ করবে
    console.error("Update Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Update failed. Make sure your data/images are within limits." 
    });
  }
};