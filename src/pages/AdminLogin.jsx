import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/campaign-squat-2-1.png";
import { GoogleLogin } from '@react-oauth/google';

const AdminLogin = () => {
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

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      // Send the credential to our newly created backend route
      const response = await axios.post("/api/auth/google-login", {
        credential: credentialResponse.credential
      });

      if (response.data.success || response.data.token) {
        const token = response.data.token;
        localStorage.setItem("adminToken", token);
        
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        window.location.href = "/admin"; // Redirect to dashboard
      } else {
        setError("Unexpected response from Google login server.");
      }
    } catch (err) {
      console.error("Google Login Error Details:", err.response);
      setError(err.response?.data?.message || "Google Authentication failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setError("Google Login was closed or failed.");
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

            <div className="space-y-6">
              {error && (
                <div className="bg-red-500/20 text-white p-4 rounded-xl text-sm border border-red-500/30 animate-shake text-center mb-6">
                  {error}
                </div>
              )}
              {loading && (
                <div className="flex justify-center my-4 mb-6">
                  <div className="w-8 h-8 border-4 border-[#0B1120] border-t-[#F7A400] rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap
                theme="filled_black"
                shape="rectangular"
                size="large"
                text="continue_with"
                width="310"
              />
            </div>

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