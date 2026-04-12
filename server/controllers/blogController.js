const Blog = require('../models/Blog');

/**
 * ১. সব ব্লগ নিয়ে আসা (পিক্সেল পারফেক্ট সর্টিং)
 */
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * ২. সিঙ্গেল ব্লগ খুঁজে বের করা (URL অথবা ID দিয়ে)
 */
exports.getBlogByUrl = async (req, res) => {
    try {
        const { url } = req.params;
        // প্রথমে URL (Slug) দিয়ে খোঁজা হবে, না পেলে ID দিয়ে ট্রাই করবে
        let blog = await Blog.findOne({ url: url });
        
        if (!blog && url.match(/^[0-9a-fA-F]{24}$/)) {
            blog = await Blog.findById(url);
        }
        
        if (!blog) return res.status(404).json({ message: "Blog not found." });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * ৩. নতুন ব্লগ অ্যাড করা
 */
exports.createBlog = async (req, res) => {
    try {
        let sectionsData = [];
        if (req.body.sections) {
            sectionsData = typeof req.body.sections === 'string' 
                ? JSON.parse(req.body.sections) 
                : req.body.sections;
        }

        // 🔥 ১০০% নিখুঁত স্লাগ জেনারেশন লজিক
        const generateSlug = (text) => {
            return text
                .toString()
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')     // স্পেসকে হাইফেন
                .replace(/[^\w-]+/g, '')  // স্পেশাল ক্যারেক্টার রিমুভ
                .replace(/--+/g, '-')     // ডাবল হাইফেন রিমুভ
                .replace(/^-+/, '')       // শুরুর হাইফেন রিমুভ
                .replace(/-+$/, '');      // শেষের হাইফেন রিমুভ
        };

        const finalUrl = req.body.url ? generateSlug(req.body.url) : generateSlug(req.body.title);

        const blog = new Blog({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            sections: sectionsData,
            image: req.file ? `uploads/${req.file.filename}` : '',
            url: finalUrl,
            author: req.body.author || "Md Maharab Biswas Api" // তোমার ডিফল্ট নাম সেট করা আছে
        });

        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * ৪. ব্লগ আপডেট করা (PUT)
 */
exports.updateBlog = async (req, res) => {
    try {
        let sectionsData = [];
        if (req.body.sections) {
            sectionsData = typeof req.body.sections === 'string' 
                ? JSON.parse(req.body.sections) 
                : req.body.sections;
        }

        // স্লাগ আপডেট লজিক
        const generateSlug = (text) => {
            return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
        };

        const updateData = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            sections: sectionsData,
            author: req.body.author || "Md Maharab Biswas Api"
        };

        // যদি নতুন করে ইউআরএল পাঠানো হয় তবেই আপডেট হবে
        if (req.body.url) {
            updateData.url = generateSlug(req.body.url);
        }

        // ইমেজ হ্যান্ডলিং: যদি ফাইল থাকে তবেই পাথ আপডেট হবে
        if (req.file) {
            updateData.image = `uploads/${req.file.filename}`;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            { $set: updateData }, 
            { new: true, runValidators: true } // runValidators দিলে স্কিমা অনুযায়ী ডাটা চেক করবে
        );

        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * ৫. ব্লগ ডিলিট করা
 */
exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};