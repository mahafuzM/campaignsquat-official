const mongoose = require('mongoose');

const OtherPageSchema = new mongoose.Schema({
    pageTitle: { 
        type: String, 
        required: true,
        trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    
    // --- SECTION 1: BUTTON CONFIG (Hero) ---
    btnText: { type: String, default: "" }, 
    btnLink: { type: String, default: "" }, 
    image: { type: String },

    // --- SECTION 2: EXPERTISE ENGINE DATA ---
    sec2Title: { type: String, default: "" }, 
    sec2Desc: { type: String, default: "" }, 
    expertiseCards: [
        {
            title: { type: String, default: "" },
            desc: { type: String, default: "" },
            cardImage: { type: String, default: "" } 
        }
    ],

    // --- SECTION 3: CUSTOM STANDALONE MODULE ---
    extraTitle: { type: String, default: "" },
    extraSubtitle: { type: String, default: "" },
    extraBtnText: { type: String, default: "" },
    extraBtnLink: { type: String, default: "" },
    extraImage: { type: String, default: "" },
    extraColor: { type: String, default: "#F7A400" },

    // --- SECTION 4: ALTERNATE FEATURES ---
    featureData: [
        {
            title: { type: String, default: "" },
            desc: { type: String, default: "" },
            img: { type: String, default: "" } 
        }
    ],

    // --- SECTION 5: WORKING PROCESS ---
    processMainTitle: { type: String, default: "" },
    processMainSubtitle: { type: String, default: "" },
    processSteps: [
        {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            img: { type: String, default: "" } 
        }
    ],

    // --- SECTION 6: WHY CHOOSE US ---
    sec6Title: { 
        type: String, 
        default: "Why is Campaignsquat Ltd the best UI UX Design service provider?" 
    },
    sec6Desc: { 
        type: String, 
        default: "" 
    },
    sec6Points: [
        { type: String } 
    ],
    sec6BtnText: { 
        type: String, 
        default: "Book a Free Consultation" 
    },
    sec6BtnLink: { 
        type: String, 
        default: "/home/contact" 
    },
    sec6Image: { 
        type: String, 
        default: "" 
    },

    // --- SECTION 7: INDUSTRIES EXPERTISE ---
    industryMainTitle: { 
        type: String, 
        default: "Industry Expertise in High-Performance UI/UX Design Solutions" 
    },
    industryMainSubtitle: { 
        type: String, 
        default: "" 
    },
    industryData: [
        {
            title: { type: String, default: "" },
            desc: { type: String, default: "" }, 
            img: { type: String, default: "" } 
        }
    ],

    // --- SECTION 8: FAQ SECTION (NEW) ---
    faqMainTitle: { 
        type: String, 
        default: "Frequently Asked Questions" 
    },
    faqMainSubtitle: { 
        type: String, 
        default: "Find answers to your most common queries about our services." 
    },
    faqs: [
        {
            question: { type: String, default: "" },
            answer: { type: String, default: "" }
        }
    ],

    // --- 👇 SECTION 9: SEO CONTENT BLOCKS (NEW) ---
    seoContentBlocks: [
        {
            type: { 
                type: String, 
                enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'list'], 
                default: 'p' 
            },
            text: { type: String, default: "" },
            items: [{ type: String }] // Bullet list-এর আইটেমগুলোর জন্য
        }
    ],
    
    // --- SEO & SETTINGS ---
    metaTitle: { 
        type: String,
        trim: true 
    },
    metaDescription: { 
        type: String,
        trim: true 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('OtherPage', OtherPageSchema);