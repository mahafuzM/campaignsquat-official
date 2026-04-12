const OtherPage = require('../models/OtherPage');

// ১. নতুন পেজ তৈরি (Create)
exports.createPage = async (req, res) => {
    try {
        const { 
            pageTitle, slug, content, metaTitle, metaDescription, 
            btnText, btnLink, sec2Title, sec2Desc, expertiseCards, featureData,
            extraTitle, extraSubtitle, extraBtnText, extraBtnLink, extraColor,
            processMainTitle, processMainSubtitle, processSteps,
            sec6Title, sec6Desc, sec6Points, sec6BtnText, sec6BtnLink,
            industryMainTitle, industryMainSubtitle, industryData,
            // 👇 ৮. FAQ Section Fields
            faqMainTitle, faqMainSubtitle, faqs,
            // 👇 ৯. SEO Content Blocks Field
            seoContentBlocks
        } = req.body;
        
        const existingPage = await OtherPage.findOne({ slug: slug.toLowerCase() });
        if (existingPage) return res.status(400).json({ message: "Slug already exists!" });

        // Data Parsing
        let parsedCards = expertiseCards ? (typeof expertiseCards === "string" ? JSON.parse(expertiseCards) : expertiseCards) : [];
        let parsedFeatures = featureData ? (typeof featureData === "string" ? JSON.parse(featureData) : featureData) : [];
        let parsedSteps = processSteps ? (typeof processSteps === "string" ? JSON.parse(processSteps) : processSteps) : [];
        let parsedSec6Points = sec6Points ? (typeof sec6Points === "string" ? JSON.parse(sec6Points) : sec6Points) : [];
        let parsedIndustryData = industryData ? (typeof industryData === "string" ? JSON.parse(industryData) : industryData) : [];
        
        // 👇 ৮. FAQ ডাটা পার্সিং
        let parsedFaqs = faqs ? (typeof faqs === "string" ? JSON.parse(faqs) : faqs) : [];

        // 👇 ৯. SEO Content Blocks পার্সিং
        let parsedSeoBlocks = seoContentBlocks ? (typeof seoContentBlocks === "string" ? JSON.parse(seoContentBlocks) : seoContentBlocks) : [];

        // ইমেজ হ্যান্ডলিং
        let heroImage = "";
        let extraSectionImage = "";
        let sec6SideImage = "";

        if (req.files) {
            if (req.files['image']) heroImage = `/uploads/${req.files['image'][0].filename}`;
            if (req.files['extraImage']) extraSectionImage = `/uploads/${req.files['extraImage'][0].filename}`;
            if (req.files['sec6Image']) sec6SideImage = `/uploads/${req.files['sec6Image'][0].filename}`;
        }

        // কার্ড ইমেজ হ্যান্ডলিং (Section 2)
        if (req.files && req.files['cardImages']) {
            const cardFiles = req.files['cardImages'];
            let fileIndex = 0;
            parsedCards = parsedCards.map((card) => {
                if (card.hasFile && cardFiles[fileIndex]) {
                    const path = `/uploads/${cardFiles[fileIndex].filename}`;
                    fileIndex++;
                    return { ...card, cardImage: path };
                }
                return card;
            });
        }

        // ফিচার ইমেজ হ্যান্ডলিং (Section 4)
        if (req.files && req.files['featureImages']) {
            const featureFiles = req.files['featureImages'];
            let featFileIndex = 0;
            parsedFeatures = parsedFeatures.map((feat) => {
                if (feat.hasFile && featureFiles[featFileIndex]) {
                    const path = `/uploads/${featureFiles[featFileIndex].filename}`;
                    featFileIndex++;
                    return { ...feat, img: path };
                }
                return feat;
            });
        }

        // প্রসেস স্টেপস ইমেজ হ্যান্ডলিং (Section 5)
        if (req.files && req.files['processImages']) {
            const processFiles = req.files['processImages'];
            let stepFileIndex = 0;
            parsedSteps = parsedSteps.map((step) => {
                if (step.hasFile && processFiles[stepFileIndex]) {
                    const path = `/uploads/${processFiles[stepFileIndex].filename}`;
                    stepFileIndex++;
                    return { ...step, img: path };
                }
                return step;
            });
        }

        // ইন্ডাস্ট্রি ইমেজ হ্যান্ডলিং (Section 7)
        if (req.files && req.files['industryImages']) {
            const industryFiles = req.files['industryImages'];
            let indFileIndex = 0;
            parsedIndustryData = parsedIndustryData.map((ind) => {
                if (ind.hasFile && industryFiles[indFileIndex]) {
                    const path = `/uploads/${industryFiles[indFileIndex].filename}`;
                    indFileIndex++;
                    return { ...ind, img: path };
                }
                return ind;
            });
        }

        const newPage = new OtherPage({
            pageTitle,
            slug: slug.toLowerCase(),
            content,
            metaTitle: metaTitle || pageTitle,
            metaDescription: metaDescription || "",
            btnText: btnText || "",
            btnLink: btnLink || "",
            sec2Title: sec2Title || "",
            sec2Desc: sec2Desc || "",
            expertiseCards: parsedCards, 
            featureData: parsedFeatures, 
            image: heroImage,
            extraTitle: extraTitle || "",
            extraSubtitle: extraSubtitle || "",
            extraBtnText: extraBtnText || "",
            extraBtnLink: extraBtnLink || "",
            extraColor: extraColor || "#F7A400",
            extraImage: extraSectionImage,
            processMainTitle: processMainTitle || "",
            processMainSubtitle: processMainSubtitle || "",
            processSteps: parsedSteps,
            sec6Title: sec6Title || "",
            sec6Desc: sec6Desc || "",
            sec6Points: parsedSec6Points,
            sec6BtnText: sec6BtnText || "",
            sec6BtnLink: sec6BtnLink || "",
            sec6Image: sec6SideImage,
            industryMainTitle: industryMainTitle || "",
            industryMainSubtitle: industryMainSubtitle || "" ,
            industryData: parsedIndustryData,
            // 👇 ৮. Save FAQ Data
            faqMainTitle: faqMainTitle || "",
            faqMainSubtitle: faqMainSubtitle || "",
            faqs: parsedFaqs,
            // 👇 ৯. Save SEO Content Blocks
            seoContentBlocks: parsedSeoBlocks
        });

        await newPage.save();
        res.status(201).json({ success: true, message: "SEO Page Deployed Successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// ২. পেজ আপডেট (Update)
exports.updatePage = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            pageTitle, slug, content, metaTitle, metaDescription, 
            btnText, btnLink, sec2Title, sec2Desc, expertiseCards, featureData,
            extraTitle, extraSubtitle, extraBtnText, extraBtnLink, extraColor,
            processMainTitle, processMainSubtitle, processSteps,
            sec6Title, sec6Desc, sec6Points, sec6BtnText, sec6BtnLink,
            industryMainTitle, industryMainSubtitle, industryData,
            // 👇 ৮. FAQ Section Fields
            faqMainTitle, faqMainSubtitle, faqs,
            // 👇 ৯. SEO Content Blocks Field
            seoContentBlocks
        } = req.body;

        const updateData = {
            pageTitle,
            slug: slug ? slug.toLowerCase() : undefined,
            content, metaTitle, metaDescription, btnText, btnLink, sec2Title, sec2Desc,
            extraTitle, extraSubtitle, extraBtnText, extraBtnLink, extraColor,
            processMainTitle, processMainSubtitle,
            sec6Title, sec6Desc, sec6BtnText, sec6BtnLink,
            industryMainTitle, industryMainSubtitle,
            // 👇 ৮. FAQ টেক্সট আপডেট
            faqMainTitle, faqMainSubtitle
        };

        if (req.files) {
            if (req.files['image']) updateData.image = `/uploads/${req.files['image'][0].filename}`;
            if (req.files['extraImage']) updateData.extraImage = `/uploads/${req.files['extraImage'][0].filename}`;
            if (req.files['sec6Image']) updateData.sec6Image = `/uploads/${req.files['sec6Image'][0].filename}`;
        }

        // কার্ড আপডেট (Section 2)
        if (expertiseCards) {
            let parsedCards = typeof expertiseCards === "string" ? JSON.parse(expertiseCards) : expertiseCards;
            if (req.files && req.files['cardImages']) {
                const cardFiles = req.files['cardImages'];
                let fileIndex = 0;
                parsedCards = parsedCards.map((card) => {
                    if (card.hasFile && cardFiles[fileIndex]) {
                        const path = `/uploads/${cardFiles[fileIndex].filename}`;
                        fileIndex++;
                        return { ...card, cardImage: path };
                    }
                    return card;
                });
            }
            updateData.expertiseCards = parsedCards;
        }

        // ফিচার আপডেট (Section 4)
        if (featureData) {
            let parsedFeatures = typeof featureData === "string" ? JSON.parse(featureData) : featureData;
            if (req.files && req.files['featureImages']) {
                const featureFiles = req.files['featureImages'];
                let featFileIndex = 0;
                parsedFeatures = parsedFeatures.map((feat) => {
                    if (feat.hasFile && featureFiles[featFileIndex]) {
                        const path = `/uploads/${featureFiles[featFileIndex].filename}`;
                        featFileIndex++;
                        return { ...feat, img: path };
                    }
                    return feat;
                });
            }
            updateData.featureData = parsedFeatures;
        }

        // প্রসেস স্টেপস আপডেট (Section 5)
        if (processSteps) {
            let parsedSteps = typeof processSteps === "string" ? JSON.parse(processSteps) : processSteps;
            if (req.files && req.files['processImages']) {
                const processFiles = req.files['processImages'];
                let stepFileIndex = 0;
                parsedSteps = parsedSteps.map((step) => {
                    if (step.hasFile && processFiles[stepFileIndex]) {
                        const path = `/uploads/${processFiles[stepFileIndex].filename}`;
                        stepFileIndex++;
                        return { ...step, img: path };
                    }
                    return step;
                });
            }
            updateData.processSteps = parsedSteps;
        }

        // ইন্ডাস্ট্রি ডাটা আপডেট (Section 7)
        if (industryData) {
            let parsedIndustryData = typeof industryData === "string" ? JSON.parse(industryData) : industryData;
            if (req.files && req.files['industryImages']) {
                const industryFiles = req.files['industryImages'];
                let indFileIndex = 0;
                parsedIndustryData = parsedIndustryData.map((ind) => {
                    if (ind.hasFile && industryFiles[indFileIndex]) {
                        const path = `/uploads/${industryFiles[indFileIndex].filename}`;
                        indFileIndex++;
                        return { ...ind, img: path };
                    }
                    return ind;
                });
            }
            updateData.industryData = parsedIndustryData;
        }

        // 👇 ৮. FAQ অ্যারে আপডেট
        if (faqs) {
            updateData.faqs = typeof faqs === "string" ? JSON.parse(faqs) : faqs;
        }

        // 👇 ৯. SEO Content Blocks আপডেট
        if (seoContentBlocks) {
            updateData.seoContentBlocks = typeof seoContentBlocks === "string" ? JSON.parse(seoContentBlocks) : seoContentBlocks;
        }

        if (sec6Points) {
            updateData.sec6Points = typeof sec6Points === "string" ? JSON.parse(sec6Points) : sec6Points;
        }

        const updated = await OtherPage.findByIdAndUpdate(
            id, 
            { $set: updateData }, 
            { returnDocument: 'after', runValidators: true } 
        );

        if (!updated) return res.status(404).json({ message: "Page not found" });
        res.status(200).json({ success: true, message: "Page Updated Successfully!", data: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// ৩-৫ ফাংশনগুলো (getAllPages, getPageBySlug, deletePage) একই থাকবে...
exports.getAllPages = async (req, res) => {
    try {
        const pages = await OtherPage.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPageBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await OtherPage.findOne({ slug: slug.toLowerCase() }); 
        if (!page) return res.status(404).json({ message: "Page Not Found" });
        res.status(200).json(page);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePage = async (req, res) => {
    try {
        const deleted = await OtherPage.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Page not found" });
        res.status(200).json({ success: true, message: "Page Purged!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};