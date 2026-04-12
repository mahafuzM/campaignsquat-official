const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// ১. সব প্রোডাক্ট দেখা
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ২. একটি নির্দিষ্ট প্রোডাক্ট দেখা
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "প্রোডাক্ট পাওয়া যায়নি!" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ৩. নতুন প্রোডাক্ট যোগ করা
exports.createProduct = async (req, res) => {
    try {
        const { name, description, buttonText, buttonUrl, contentSections, testimonials } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        const newProduct = new Product({
            name,
            description,
            buttonText,
            buttonUrl,
            image: imagePath,
            // রাউটারে parse করা হয়েছে তাই সরাসরি বসিয়ে দিলেই হবে
            contentSections: contentSections || [],
            testimonials: testimonials || []
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ৪. আপডেট বা এডিট করা
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, buttonText, buttonUrl, contentSections, testimonials } = req.body;
        
        let updateData = { 
            name, 
            description, 
            buttonText, 
            buttonUrl,
            contentSections: contentSections || [],
            testimonials: testimonials || []
        };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
            // পুরান ইমেজ ডিলিট করা
            const oldProduct = await Product.findById(req.params.id);
            if (oldProduct && oldProduct.image) {
                const oldPath = path.join(__dirname, '..', oldProduct.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ৫. ডিলিট করা
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product && product.image) {
            const fullPath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "প্রোডাক্ট সফলভাবে ডিলিট হয়েছে!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};