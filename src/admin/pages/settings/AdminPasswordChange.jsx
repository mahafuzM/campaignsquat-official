import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, Mail, User, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminProfileManager = () => {
    // স্টেট ম্যানেজমেন্ট
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const navigate = useNavigate();

    // টোকেন থেকে বর্তমান ইমেইল বের করা (প্রিভিউ এর জন্য)
    const token = localStorage.getItem('adminToken');
    const adminEmailFromToken = token ? JSON.parse(atob(token.split('.')[1] || "{}")).email : "Admin";

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // ভ্যালিডেশন
        if (newPassword && newPassword !== confirmPassword) {
            return setMessage({ type: 'error', text: 'নতুন পাসওয়ার্ড দুটি মিলছে না!' });
        }
        
        if (newPassword && newPassword.length < 6) {
            return setMessage({ type: 'error', text: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।' });
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // আপনার ব্যাকএন্ড এপিআই অনুযায়ী এন্ডপয়েন্ট সেট করুন
            // এখানে ইমেইল এবং পাসওয়ার্ড দুইটাই পাঠানো হচ্ছে
            const res = await axios.put('/api/admin/update-profile', 
                { currentPassword, newEmail, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                setMessage({ type: 'success', text: 'ক্রেডেনশিয়াল সফলভাবে আপডেট হয়েছে! আবার লগইন করুন।' });
                
                setTimeout(() => {
                    localStorage.removeItem('adminToken');
                    navigate('/admin-login');
                }, 2500);
            }
        } catch (err) {
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'পুরনো পাসওয়ার্ডটি সঠিক নয় বা সার্ভারে সমস্যা হচ্ছে!' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#02050A] px-4 font-poppins py-10">
            <div className="max-w-[500px] w-full relative">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/admin')}
                    className="absolute -top-12 left-0 text-gray-500 hover:text-[#F7A400] flex items-center gap-2 transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                    <span className="text-sm font-medium tracking-wide">Back to Dashboard</span>
                </button>

                <div className="relative p-[1.5px] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(247,164,0,0.07)]">
                    {/* Running Border Animation */}
                    <div className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F7A400_0%,#0B1120_30%,#F7A400_50%,#0B1120_80%,#F7A400_100%)]" />

                    <div className="relative bg-[#0B1120] rounded-[22px] p-8 md:p-10 z-10 backdrop-blur-3xl border border-white/5">
                        <div className="text-center mb-8">
                            <div className="bg-[#F7A400]/10 w-16 h-16 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-4 border border-[#F7A400]/20">
                                <ShieldCheck className="text-[#F7A400] -rotate-3" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                Profile <span className="text-[#F7A400]">Manager</span>
                            </h2>
                            <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-2">Campaignsquat Ltd Secure Hub</p>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-5">
                            {message.text && (
                                <div className={`p-4 rounded-xl text-[13px] border text-center animate-shake ${
                                    message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'
                                }`}>
                                    {message.text}
                                </div>
                            )}

                            {/* --- New Email Section --- */}
                            <div className="space-y-1.5">
                                <label className="text-gray-400 text-[12px] font-medium ml-1">New Admin Email (Optional)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#F7A400] transition-colors" size={18} />
                                    <input
                                        type="email"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 text-white focus:ring-1 focus:ring-[#F7A400] outline-none transition-all placeholder:text-gray-700 text-sm"
                                        placeholder="new-email@gmail.com"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* --- New Password Section --- */}
                            <div className="space-y-1.5">
                                <label className="text-gray-400 text-[12px] font-medium ml-1">New Password (Optional)</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#F7A400] transition-colors" size={18} />
                                    <input
                                        type={showPass ? "text" : "password"}
                                        className="w-full pl-12 pr-12 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 text-white focus:ring-1 focus:ring-[#F7A400] outline-none transition-all placeholder:text-gray-700 text-sm"
                                        placeholder="Min. 6 characters"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password (Only shows if new password is typed) */}
                            {newPassword && (
                                <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                    <label className="text-gray-400 text-[12px] font-medium ml-1">Confirm New Password</label>
                                    <div className="relative group">
                                        <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#F7A400] transition-colors" size={18} />
                                        <input
                                            type="password"
                                            className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] rounded-xl border border-white/10 text-white focus:ring-1 focus:ring-[#F7A400] outline-none transition-all placeholder:text-gray-700 text-sm"
                                            placeholder="Match with new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="h-[1px] bg-white/5 my-2 w-full"></div>

                            {/* --- Current Password (MANDATORY) --- */}
                            <div className="space-y-1.5">
                                <label className="text-[#F7A400] text-[11px] font-bold uppercase tracking-widest ml-1">Verify Identity (Current Password) *</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#F7A400] transition-colors" size={18} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-[#F7A400]/5 rounded-xl border border-[#F7A400]/20 text-white focus:ring-1 focus:ring-[#F7A400] outline-none transition-all placeholder:text-gray-700 text-sm"
                                        placeholder="Enter current password to save"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-[#F7A400] hover:bg-[#ffb31a] text-[#02050A] font-bold text-[13px] uppercase tracking-[0.2em] rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center mt-6 shadow-[0_10px_25px_rgba(247,164,0,0.15)]"
                            >
                                {loading ? <div className="w-5 h-5 border-2 border-[#02050A] border-t-transparent rounded-full animate-spin"></div> : 'Confirm Changes'}
                            </button>
                        </form>

                        {/* Status Bar */}
                        <div className="mt-8 p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-[#F7A400]/10 flex items-center justify-center border border-[#F7A400]/10 group-hover:scale-110 transition-transform">
                                <User size={18} className="text-[#F7A400]" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Active Identity</p>
                                <p className="text-white text-sm truncate font-medium">
                                    {newEmail || adminEmailFromToken}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-4px); } 60% { transform: translateX(4px); } }
                .animate-shake { animation: shake 0.3s ease-in-out 1; }
            `}</style>
        </div>
    );
};

export default AdminProfileManager;