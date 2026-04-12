const MegaMenu = require('../models/MegaMenu');
const fs = require('fs');
const path = require('path');

// ১. সব মেনু ডাটা গেট করা
exports.getMenu = async (req, res) => {
    try {
        const menu = await MegaMenu.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ২. নতুন ক্যাটাগরি বা সার্ভিস মেনুতে যোগ করা
exports.createMenu = async (req, res) => {
    try {
        const getFilePath = (fieldname) => {
            const file = req.files ? req.files.find(f => f.fieldname === fieldname) : null;
            return file ? `uploads/${file.filename}` : "";
        };

        const processCardImages = (data, fieldPrefix) => {
            if (!data) return [];
            try {
                const parsed = typeof data === 'string' ? JSON.parse(data) : data;
                return parsed.map((item, index) => {
                    const img = getFilePath(`${fieldPrefix}${index}`);
                    return { ...item, img: img || "" };
                });
            } catch (e) { return []; }
        };

        const newMenu = new MegaMenu({
            ...req.body,
            image: getFilePath('image'),
            sideImg: getFilePath('sideImage'),
            description: `<p>${req.body.paragraphText || ""}</p>`,
            order: Number(req.body.order) || 0,
            points: req.body.points ? JSON.parse(req.body.points) : [],
            faqData: req.body.faqData ? JSON.parse(req.body.faqData) : [],
            expertiseCards: processCardImages(req.body.expertiseData, 'expertiseImage'),
            featureData: processCardImages(req.body.featureData, 'featureImage'),
            processSteps: processCardImages(req.body.processData, 'processImage'),
            industryData: processCardImages(req.body.industryData, 'industryImage')
        });

        const savedMenu = await newMenu.save();
        res.status(201).json(savedMenu);
    } catch (error) {
        res.status(400).json({ message: "Error creating menu", error: error.message });
    }
};

// ৩. নির্দিষ্ট আইডি বা স্লাগ দিয়ে ডাটা পাওয়া
exports.getMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);
        
        let item = isObjectId ? await MegaMenu.findById(id) : await MegaMenu.findOne({ slug: id });

        if (!item) {
            return res.status(404).json({ message: "Service details not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ৪. মেনু আইটেম আপডেট করা (Perfected Logic)
exports.updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        let oldItem = await MegaMenu.findById(id);
        if (!oldItem) return res.status(404).json({ message: "Item not found" });

        const deleteFile = (filePath) => {
            if (filePath) {
                const fullPath = path.join(__dirname, '..', filePath);
                if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
            }
        };

        // মেইন ইমেজ আপডেট
        let dbImagePath = oldItem.image;
        const mainImage = req.files?.find(f => f.fieldname === 'image');
        if (mainImage) {
            deleteFile(oldItem.image);
            dbImagePath = `uploads/${mainImage.filename}`;
        }

        // সাইড ইমেজ আপডেট
        let sideImgPath = oldItem.sideImg;
        const sideImage = req.files?.find(f => f.fieldname === 'sideImage');
        if (sideImage) {
            deleteFile(oldItem.sideImg);
            sideImgPath = `uploads/${sideImage.filename}`;
        }

        // কার্ডের ইমেজ এবং ডাটা আপডেট করার ফাংশন
        const updateCardImages = (newData, oldData, fieldPrefix) => {
            if (!newData) return oldData;
            try {
                const parsed = typeof newData === 'string' ? JSON.parse(newData) : newData;
                return parsed.map((item, index) => {
                    const newFile = req.files?.find(f => f.fieldname === `${fieldPrefix}${index}`);
                    if (newFile) {
                        // আগের কার্ডের ইমেজ থাকলে ডিলিট করতে পারেন (অপশনাল)
                        return { ...item, img: `uploads/${newFile.filename}` };
                    }
                    // নতুন ইমেজ না থাকলে পুরনো ডাটার ইমেজটা ধরে রাখবে
                    const existingImg = oldData && oldData[index] ? oldData[index].img : "";
                    return { ...item, img: item.img || existingImg };
                });
            } catch (e) { return oldData; }
        };

        const updateData = {
            ...req.body,
            image: dbImagePath,
            sideImg: sideImgPath,
            order: Number(req.body.order) || 0,
            description: `<p>${req.body.paragraphText || ""}</p>`,
            points: req.body.points ? JSON.parse(req.body.points) : oldItem.points,
            faqData: req.body.faqData ? JSON.parse(req.body.faqData) : oldItem.faqData,
            expertiseCards: updateCardImages(req.body.expertiseData, oldItem.expertiseCards, 'expertiseImage'),
            featureData: updateCardImages(req.body.featureData, oldItem.featureData, 'featureImage'),
            processSteps: updateCardImages(req.body.processData, oldItem.processSteps, 'processImage'),
            industryData: updateCardImages(req.body.industryData, oldItem.industryData, 'industryImage')
        };

        const updatedMenu = await MegaMenu.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedMenu);
    } catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
};

// ৫. মেনু আইটেম ডিলিট করা
exports.deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await MegaMenu.findById(id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        const deleteFile = (filePath) => {
            if (filePath && typeof filePath === 'string') {
                const fullPath = path.join(__dirname, '..', filePath);
                if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
            }
        };

        deleteFile(item.image);
        deleteFile(item.sideImg);
        item.expertiseCards?.forEach(c => deleteFile(c.img));
        item.featureData?.forEach(f => deleteFile(f.img));
        item.processSteps?.forEach(p => deleteFile(p.img));
        item.industryData?.forEach(ind => deleteFile(ind.img));

        await MegaMenu.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};