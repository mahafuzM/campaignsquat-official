import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios এড করা হয়েছে
import {
  Send,
  CheckCircle2,
  Phone,
  Circle,
  CheckCircle,
  ChevronDown,
  X,
} from "lucide-react"; // X আইকন এড করা হয়েছে
import profileImg from "../assets/images/Md. Maharab Biswas Api.jpg";

const Contact = () => {
  const navigate = useNavigate();

  // States for Selection
  const [budget, setBudget] = useState("");
  const [service, setService] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // নতুন স্টেট: পপ-আপ মোডাল দেখানোর জন্য
  const [showSuccess, setShowSuccess] = useState(false);

  // Form Data State (ডিজাইন ঠিক রেখে ডাটা ধরার জন্য)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [isSending, setIsSending] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSending(true); // লোডিং শুরু

  const payload = {
    ...formData,
    service,
    budget,
  };

  try {
    // ২. baseURL ব্যবহার করে ক্লিন পাথ
    const res = await axios.post("/api/contacts/submit", payload);
    
    if (res.data.success) {
      setShowSuccess(true);
      setFormData({ fullName: "", email: "", whatsapp: "", details: "" });
      setBudget("");
      setService("");
    }
  } catch (err) {
    alert("❌ Failed to send message.");
  } finally {
    setIsSending(false); // লোডিং শেষ
  }
};

  const budgetOptions = [
    "Less than $1K",
    "$1K - $5K",
    "$5K - $10K",
    "$10K - $20K",
    "More than $20K",
  ];
  const serviceOptions = [
    "UI/UX Design",
    "Website Development",
    "Software Development",
    "Mobile App Development",
  ];

  return (
    <section className="w-full bg-[#050505] py-8 md:py-12 font-poppins text-white overflow-hidden relative">
      {/* ----------------------------------------------------------- */}
      {/* 🌟 SUCCESS POP-UP MODAL (Screen Shot অনুসারী ডিজাইন) 🌟 */}
      {/* ----------------------------------------------------------- */}
      {showSuccess && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          {/* মোডাল বক্স - হুবহু স্ক্রিনশটের মত গোল বর্ডার এবং গ্লো */}
          <div className="relative border border-[#F7A400] rounded-[30px] bg-[#0A0A0A] p-10 md:p-14 text-center shadow-[0_0_60px_rgba(247,164,0,0.3)] max-w-[500px] w-full animate-scaleIn">
            {/* ক্লোজ বাটন (ঐচ্ছিক, সৌন্দর্যের জন্য) */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* সোনালী চেক আইকন গ্লো সহ */}
            <div className="flex justify-center mb-10">
              <div className="relative">
                <div className="absolute inset-0 bg-[#F7A400] rounded-full blur-2xl opacity-40"></div>
                <CheckCircle
                  size={90}
                  className="text-[#F7A400] relative z-10"
                />
              </div>
            </div>

            {/* টেক্সট কন্টেন্ট */}
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4">
              Message Sent!
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              We have received your message. Our team will get back to you
              shortly.
            </p>

            {/* সম্পূর্ণ গোল্ডেন বাটন (আপনার স্ক্রিনশটের মতো) */}
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/"); // হোম পেজে নিয়ে যাবে
              }}
              className="w-full bg-[#F7A400] text-black text-xl font-bold py-5 rounded-[15px] hover:bg-white transition-all duration-300 shadow-lg active:scale-95"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------- */}

      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F7A400]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1445px] mx-auto px-2 md:px-12 lg:px-16 xl:px-14 relative z-10">
        {/* Main Wrapper Box */}
        <div className="border border-white/10 rounded-[5px] bg-[#02050A]/50 p-6 md:p-10 lg:p-10 xl:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* LEFT SIDE: PROFILE */}
            <div className="lg:col-span-5 space-y-10 ">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 rounded-[5px] border border-green-500/30 bg-green-500/10 text-green-400 text-[13px] font-medium  tracking-wider">
                  Ready to Scale? Let’s Talk!
                </div>

                <h2 className="text-[18px] md:text-[22px] lg:text-[26px] xl:text-[32px] font-semibold leading-[1.2] tracking-tight">
                  Designing and developing high-growth SaaS products and
                  websites
                </h2>

                <div className="space-y-4">
                  {[
                    "Zero-Risk Start: No long-term contracts.",
                    "Full Ownership: 100% source code & assets.",
                    "Reliable Support: Assistance after go-live.",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-white text-[14px] md:text-[16px] xl:text-[18px]"
                    >
                      <CheckCircle2
                        size={22}
                        className="text-[#ffffff400] shrink-0 mt-0.5"
                      />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="w-62 h-62 md:w-56 md:h-56 rounded-[5px] overflow-hidden border border-white/10">
                  <img
                    src={profileImg}
                    alt="Md. Maharab Biswas Api"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[16px] md:text-[20px] lg:text-[20px] xl:text-[24px] font-semibold">
                    Md Maharab Biswas Api
                  </h4>
                  <p className="text-[#FFFFFF400] text-[12px] md:text-[17px] font-semibold">
                    Founder & CEO
                  </p>
                </div>
                <div className="space-y-4 ">
                  <a
                    href="tel:+8801330093408"
                    className="flex items-center gap-3 text-white hover:text-[#F7A400] transition-colors font-medium group"
                  >
                    <Phone
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span>+88 01330093408</span>
                  </a>

                  <a
                    href="https://wa.me/8801330093408"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#25D366] transition-colors font-medium group"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="group-hover:scale-110 transition-transform"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Send Message Directly</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: FORM */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Standard Input Fields */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[14px] md:text-[16px] font-semibold  text-white">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Garry A. Leighton"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-[5px] p-2 md:p-2 focus:border-[#F7A400] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[14px] md:text-[16px] font-semibold  text-white">
                        Your Email
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="yourmail@gmail.com"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-[5px] p-2 md:p-2 focus:border-[#F7A400] outline-none transition-all placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[14px] md:text-[16px] font-semibold  text-white">
                        Whatsapp Number
                      </label>
                      <input
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        type="tel"
                        placeholder="1123 1234567"
                        className="w-full bg-white/5 border border-white/10 rounded-[5px] p-2 md:p-2 focus:border-[#F7A400] outline-none transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>
                </div>

                {/* 1. Select Service - Custom Dropdown */}
                <div className="space-y-4">
                  <label className="text-[14px] md:text-[16px] font-semibold text-white">
                    Select Service
                  </label>
                  <div className="relative">
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className={`w-full bg-white/5 border rounded-[5px] p-2 md:p-2 text-white flex justify-between items-center cursor-pointer transition-all ${
                        service || isOpen
                          ? "border-[#F7A400]"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span
                        className={service ? "text-white" : "text-white/20"}
                      >
                        {service || "Choose a service"}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${isOpen ? "rotate-180 text-[#F7A400]" : "text-white/50"}`}
                      />
                    </div>

                    {isOpen && (
                      <div className="absolute z-50 w-full mt-2 bg-[#050505] border border-white/10 rounded-[5px] overflow-hidden shadow-2xl">
                        {serviceOptions.map((srv) => (
                          <div
                            key={srv}
                            onClick={() => {
                              setService(srv);
                              setIsOpen(false);
                            }}
                            className="px-4 py-3 text-white hover:bg-[#F7A400] hover:text-black cursor-pointer transition-colors"
                          >
                            {srv}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Project Budget Selection */}
                <div className="space-y-4">
                  <label className="text-[14px] md:text-[16px] font-semibold text-white">
                    Project Budget
                  </label>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBudget(opt)}
                        className={`group flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2 rounded-[5px] border text-[13px] md:text-[14px] font-semibold transition-all duration-300 grow md:grow-0 justify-start ${
                          budget === opt
                            ? "border-2 border-[#F7A400] text-[#F7A400] bg-transparent shadow-[0_0_15px_rgba(247,164,0,0.1)]"
                            : "border-white/10 bg-white/5 text-white hover:border-[#F7A400]/40"
                        }`}
                      >
                        {budget === opt ? (
                          <CheckCircle
                            size={18}
                            fill="#F7A400"
                            className="text-black shrink-0"
                          />
                        ) : (
                          <Circle
                            size={18}
                            className="text-white/30 group-hover:text-[#F7A400] shrink-0"
                          />
                        )}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[14px] md:text-[16px] font-bold  text-white">
                    Project Details
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows="4"
                    placeholder="I’m planning a complete redesign for my website and SaaS platform........"
                    className="w-full bg-white/5 border border-white/10 rounded-[5px] p-4 focus:border-[#F7A400] outline-none transition-all resize-none placeholder:text-white/20"
                  ></textarea>
                </div>

                {/* Line-up Hover Button */}
                {/* Line-up Hover Button */}
<button
  type="submit"
  disabled={isSending} // মেসেজ পাঠানোর সময় বাটন ডিজেবল থাকবে
  className={`group relative w-full md:w-auto px-8 md:px-6 py-2 bg-[#F7A400] border-2 border-[#F7A400] rounded-[5px] font-semibold text-black overflow-hidden transition-all duration-300 ${
    isSending ? "opacity-70 cursor-not-allowed" : ""
  }`}
>
  <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
    {isSending ? (
      "Sending..."
    ) : (
      <>
        Sent Message
        <Send
          size={18}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
        />
      </>
    )}
  </span>
  <div className="absolute inset-0 bg-[#02050A] translate-y-[102%] group-hover:translate-y-0 transition-transform duration-300"></div>
</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* পপ-আপের জন্য কিছু CSS এনিমেশন (ঐচ্ছিক, সৌন্দর্যের জন্য) */}
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
          .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        `}
      </style>
    </section>
  );
};

export default Contact;
