import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import logo from "../assets/images/campaign-squat-2-1.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // --- 🌍 Dynamic API URL Logic ---
    // Local-e thakle 5000 port-e call hobe, hosting-e thakle api sub-domain-e
    const API_BASE_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "/api";

    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin-login`, {
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (response.data.success || response.data.token) {
        const token = response.data.token;
        localStorage.setItem("adminToken", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Use window.location for a clean redirect on both local/hosting
        window.location.href = "/admin";
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Detailed error message handling
      const msg =
        err.response?.data?.message || "Login failed. Server is unreachable!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02050A] px-4 font-poppins relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F7A400]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-[500px] w-full relative pt-12">
        {/* Floating Logo */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 group">
          <div className="relative p-[1.5px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(247,164,0,0.15)]">
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

        {/* Card with Running Border */}
        <div className="relative p-[2px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F7A400_0%,#0B1120_30%,#F7A400_50%,#0B1120_80%,#F7A400_100%)]" />

          <div className="relative bg-[#0B1120] rounded-[22px] p-10 md:p-12 pt-16 z-10 backdrop-blur-xl border border-white/5">
            <div className="text-center mb-10">
              <h1 className="text-[12px] font-bold text-[#F7A400] tracking-[0.2em] mb-2">
                CAMPAIGNSQUAT LTD.
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

              <div className="space-y-2">
                <label className="text-white font-medium ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#F7A400] transition-colors"
                    size={20}
                  />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 rounded-xl border border-white/10 text-white focus:ring-2 focus:ring-[#F7A400] outline-none transition-all"
                    placeholder="admin@campaignsquat.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium ml-1">Password</label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#F7A400] transition-colors"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="w-full pl-12 pr-12 py-4 bg-white/5 rounded-xl border border-white/10 text-white focus:ring-2 focus:ring-[#F7A400] outline-none transition-all"
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

              <div className="relative group p-[1px] rounded-xl overflow-hidden mt-4">
                <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F7A400_0%,#3b82f6_50%,#F7A400_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-4 bg-[#F7A400] hover:bg-[#ffb31a] text-[#02050A] font-bold tracking-widest rounded-[5px] transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-[#02050A] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "SECURE LOGIN"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-10 text-center border-t border-white/5 pt-6 text-sm text-gray-400">
              © 2026{" "}
              <span className="text-white font-semibold">
                Campaignsquat Ltd.
              </span>{" "}
              All Rights Reserved.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
