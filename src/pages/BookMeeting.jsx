import React, { useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookMeeting = () => {
    useEffect(() => {
        // Calendly script load korar jonno
        const script = document.createElement('script');
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Page theke ber hoye gele script remove kore clean up kora
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <main className="bg-[#02050a] min-h-screen py-12 font-poppins text-white">
            <div className="max-w-[1200px] mx-auto px-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 text-[#F7A400] hover:text-white transition-all duration-300 mb-2 group"
                        >
                            <FaChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform " />
                            <span className="font-medium text-xl">Back to Home</span>
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold">Book a Strategy Session</h1>
                    </div>
                    <div className="max-w-md">
                        <p className="text-white/60 text-lg leading-relaxed">
                            Ready to scale? Pick a slot and let's discuss how <span className="text-[#F7A400]">Campaign Squat</span> can help you grow.
                        </p>
                    </div>
                </div>

                {/* Calendly Inline Widget Container */}
                <div 
                    className="calendly-inline-widget rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]" 
                    data-url="https://calendly.com/campaignsquatltd/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=02050a&text_color=ffffff&primary_color=f7a400" 
                    style={{ minWidth: '320px', height: '750px' }} 
                />
            </div>
        </main>
    );
};

export default BookMeeting;