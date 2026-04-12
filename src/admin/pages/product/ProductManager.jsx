import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Save, Trash2 } from 'lucide-react';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
    // মেইন স্টেট
    const [formData, setFormData] = useState({
        name: '', description: '', buttonText: '', buttonUrl: '', image: null
    });

    // ডাইনামিক সেকশন স্টেট (রাইট সাইডের জন্য)
    const [sections, setSections] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products/all');
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --- Dynamic Block Logic ---
    const addSection = (type) => {
        const newSection = type === 'list' 
            ? { type, value: '', items: [''] } 
            : { type, value: '' };
        setSections([...sections, newSection]);
    };

    const removeSection = (index) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    const handleListItemChange = (sIndex, iIndex, value) => {
        const newSections = [...sections];
        newSections[sIndex].items[iIndex] = value;
        setSections(newSections);
    };

    const addListItem = (sIndex) => {
        const newSections = [...sections];
        newSections[sIndex].items.push('');
        setSections(newSections);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // ফিক্সড সাবমিট ফাংশন
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('buttonText', formData.buttonText || "Get The Product");
        data.append('buttonUrl', formData.buttonUrl || "/book-meeting");
        data.append('contentSections', JSON.stringify(sections));
        
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            // কনফিগ যোগ করা হয়েছে যাতে মাল্টিপার্ট ডেটা ঠিকঠাক যায়
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            if (isEditing) {
                await axios.put(`http://localhost:5000/api/products/${currentId}`, data, config);
                alert("Product Updated!");
            } else {
                await axios.post('http://localhost:5000/api/products/add', data, config);
                alert("Product Added!");
            }
            resetForm();
            fetchProducts();
        } catch (err) {
            console.error("Submission Error:", err.response?.data || err.message);
            alert("Action failed! Check console for errors.");
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentId(product._id);
        setFormData({
            name: product.name,
            description: product.description,
            buttonText: product.buttonText || '',
            buttonUrl: product.buttonUrl || '',
            image: null 
        });
        setSections(product.contentSections || []);
        setPreviewUrl(`http://localhost:5000${product.image}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                fetchProducts();
            } catch (err) {
                console.error("Error deleting product:", err);
                alert("Delete failed!");
            }
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', buttonText: '', buttonUrl: '', image: null });
        setSections([]);
        setPreviewUrl(null);
        setIsEditing(false);
        setCurrentId(null);
    };

    return (
        <div className="p-4 md:p-10 bg-white min-h-screen text-black font-sans w-full">
            <div className="max-w-[1600px] mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
                    
                    {/* --- LEFT SIDE --- */}
                    <div className="w-full lg:w-1/3 space-y-6">
                        <div className="bg-gray-50 p-6 rounded-[5px] border border-gray-200 shadow-sm">
                            <h3 className="text-xl text-black font-bold mb-6 flex items-center gap-2">
                                {isEditing ? "📝 Edit Info" : "➕ Product Info"}
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[12px] font-bold text-black">Product Name</label>
                                    <input type="text" className="w-full p-3 bg-white border border-gray-300 rounded-[5px] outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                                </div>

                                <div>
                                    <label className="text-[12px] font-bold text-black">Short Description</label>
                                    <textarea className="w-full p-3 bg-white border border-gray-300 rounded-[5px] h-24 outline-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                                </div>

                                <div>
                                    <label className="text-[12px] font-bold text-black">Product Image</label>
                                    <input type="file" className="w-full p-2 border border-gray-300 rounded-[5px] bg-white" onChange={handleImageChange} required={!isEditing} />
                                    {previewUrl && <img src={previewUrl} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-[5px] border shadow-sm" />}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[12px] font-bold text-black">Button Text</label>
                                        <input type="text" placeholder="Buy Now" className="w-full p-2 bg-white border rounded-[5px] text-sm outline-none" value={formData.buttonText} onChange={(e) => setFormData({...formData, buttonText: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="text-[12px] font-bold text-black">URL</label>
                                        <input type="text" placeholder="/order" className="w-full p-2 bg-white border rounded-[5px] text-sm outline-none" value={formData.buttonUrl} onChange={(e) => setFormData({...formData, buttonUrl: e.target.value})} />
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <button type="button" onClick={resetForm} className="mt-6 w-full py-2 text-sm font-bold text-red-500 border border-red-200 rounded-[5px] hover:bg-red-50 transition-all">Cancel Editing</button>
                            )}
                        </div>
                    </div>

                    {/* --- RIGHT SIDE --- */}
                    <div className="w-full lg:w-2/3 bg-white p-8 lg:p-12 border border-gray-100 rounded-[5px] shadow-sm space-y-8 min-h-[600px] relative">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-3"><Layout className="text-[#F7A400]"/> Article Builder</h3>
                            <button type="submit" className="hidden lg:flex items-center gap-2 bg-[#F7A400] text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all active:scale-95">
                                <Save size={18}/> {isEditing ? "Update Changes" : "Publish Post"}
                            </button>
                        </div>

                        <div className="space-y-10 pb-24">
                            {sections.length === 0 && (
                                <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[5px] text-gray-300 font-medium">
                                    Start building your article by adding blocks below
                                </div>
                            )}

                            {sections.map((section, sIndex) => (
                                <div key={sIndex} className="relative bg-gray-50 p-6 rounded-[5px] border border-gray-100 group">
                                    <button type="button" onClick={() => removeSection(sIndex)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                                        <Trash2 size={20}/>
                                    </button>
                                    
                                    <div className="flex items-center gap-2 text-[11px] text-[#F7A400]  tracking-tighter mb-4 font-black">
                                        {section.type} Block
                                    </div>

                                    {section.type !== 'list' ? (
                                        <textarea 
                                            value={section.value} 
                                            className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium text-gray-800 placeholder-gray-300 resize-none" 
                                            rows={section.type === 'heading' ? 1 : 4} 
                                            placeholder={`Write your ${section.type} here...`} 
                                            onChange={(e) => handleSectionChange(sIndex, 'value', e.target.value)} 
                                        />
                                    ) : (
                                        <div className="space-y-4">
                                            <input 
                                                type="text" 
                                                value={section.value} 
                                                placeholder="List Title" 
                                                className="w-full bg-transparent border-b border-gray-200 p-2 font-bold text-lg outline-none" 
                                                onChange={(e) => handleSectionChange(sIndex, 'value', e.target.value)} 
                                            />
                                            <div className="grid grid-cols-1 gap-3">
                                                {section.items.map((item, iIndex) => (
                                                    <div key={iIndex} className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 bg-[#F7A400] rounded-full"></div>
                                                        <input 
                                                            type="text" 
                                                            value={item} 
                                                            placeholder="Point details..." 
                                                            className="flex-1 bg-white border border-gray-200 p-2 rounded text-sm outline-none" 
                                                            onChange={(e) => handleListItemChange(sIndex, iIndex, e.target.value)} 
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <button type="button" onClick={() => addListItem(sIndex)} className="text-xs font-bold text-[#F7A400] hover:underline">+ Add point</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Floating ToolBar */}
                        <div className="sticky bottom-8 bg-white/80 backdrop-blur-md border border-gray-200 p-4 rounded-[5px] shadow-2xl flex items-center justify-between z-10">
                            <div className="flex gap-4">
                                <button type="button" onClick={() => addSection('heading')} className="px-4 py-2 hover:bg-gray-100 rounded-[5px] text-gray-600 text-sm font-bold">H1 Heading</button>
                                <button type="button" onClick={() => addSection('text')} className="px-4 py-2 hover:bg-gray-100 rounded-[5px] text-gray-600 text-sm font-bold">Paragraph</button>
                                <button type="button" onClick={() => addSection('list')} className="px-4 py-2 hover:bg-gray-100 rounded-[5px] text-gray-600 text-sm font-bold">Bullet List</button>
                            </div>
                            <button type="submit" className="lg:hidden bg-[#F7A400] text-white px-6 py-2 rounded-full font-bold">
                                {isEditing ? "Update" : "Publish"}
                            </button>
                        </div>
                    </div>
                </form>

                {/* --- Data Table --- */}
                <div className="mt-20 bg-white rounded-[5px] border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
                        <h4 className="font-bold">Live Products ({products.length})</h4>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[12px] font-bold text-black   border-b">
                                <th className="p-6">Thumbnail</th>
                                <th className="p-6">Product Details</th>
                                <th className="p-6 text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map(p => (
                                <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6 w-32">
                                        <img src={`http://localhost:5000${p.image}`} className="w-16 h-16 object-cover rounded-[5px] border" alt="" />
                                    </td>
                                    <td className="p-6">
                                        <div className="font-bold text-gray-900">{p.name}</div>
                                        <div className="text-xs text-gray-400 mt-1 line-clamp-1">{p.description}</div>
                                    </td>
                                    <td className="p-6 text-right space-x-4">
                                        <button onClick={() => handleEdit(p)} className="text-sm font-bold text-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => handleDelete(p._id)} className="text-sm font-bold text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductManager;