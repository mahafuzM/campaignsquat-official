import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'; 
// আপনার লোগোটি এখানে ইমপোর্ট করুন
import logo from '../assets/images/campaign-squat-2-1.png'; 

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/admin-login', { 
                email: email.trim(), 
                password: password 
            });
            
            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Connection error!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#02050A] px-4 font-poppins relative overflow-hidden">
            {/* Background Glow Decor */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F7A400]/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

            {/* --- Main Container for Alignment --- */}
            <div className="max-w-[500px] w-full relative pt-12">
                
                {/* --- Floating Logo with Glass Effect --- */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 group">
                    <div className="relative p-[1.5px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(247,164,0,0.15)]">
                        {/* Mini Spinning Border for Logo */}
                        <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F7A400_0%,#0B1120_50%,#F7A400_100%)]" />
                        
                        <div className="relative bg-[#0B1120] p-4 rounded-[15px] backdrop-blur-xl">
                            <img 
                                src={logo} 
                                alt="Campaignsquat Logo" 
                                className="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-110" 
                            />
                        </div>
                    </div>
                </div>

                {/* --- Advanced Running Border Card --- */}
                <div className="relative p-[2px] rounded-3xl overflow-hidden shadow-2xl">
                    {/* The Running Border Logic */}
                    <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F7A400_0%,#0B1120_30%,#F7A400_50%,#0B1120_80%,#F7A400_100%)]" />

                    {/* Inner Content Box */}
                    <div className="relative bg-[#0B1120] rounded-[22px] p-10 md:p-12 pt-16 z-10 backdrop-blur-xl border border-white/5">
                        <div className="text-center mb-10">
                            <h1 className="text-[12px]  font-bold text-[#F7A400]  tracking-[0.2em] mb-2">
                                Campaignsquat Ltd.
                            </h1>
                            <h2 className="text-4xl font-extrabold text-white tracking-tight">
                                Admin <span className="text-[#F7A400]">Panel</span>
                            </h2>
                            <div className="w-12 h-[2px] bg-[#F7A400] mx-auto mt-4 rounded-full"></div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8">
                            {error && (
                                <div className="bg-red-500/20 text-white p-4 rounded-xl text-sm border border-red-500/30 animate-shake text-center">
                                    {error}
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-white font-medium ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#F7A400] transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 rounded-xl border border-white/10 text-white focus:ring-2 focus:ring-[#F7A400] focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                                        placeholder="admin@campaignsquat.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-white font-medium ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#F7A400] transition-colors" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full pl-12 pr-12 py-4 bg-white/5 rounded-xl border border-white/10 text-white focus:ring-2 focus:ring-[#F7A400] focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button with Internal Running Border */}
                            <div className="relative group p-[1px] rounded-xl overflow-hidden mt-4">
                                <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F7A400_0%,#3b82f6_50%,#F7A400_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full py-4 bg-[#F7A400] hover:bg-[#ffb31a] text-[#02050A] font-semibold text-[15px]  tracking-widest rounded-[5px] transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-3 border-[#02050A] border-t-transparent rounded-full animate-spin"></div>
                                    ) : 'Login'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-10 text-center border-t border-white/5 pt-6">
                            <p className="text-sm text-white">
                                &copy; 2026 <span className="text-white font-semibold">Campaignsquat Ltd.</span> All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.2s ease-in-out 0s 2;
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;