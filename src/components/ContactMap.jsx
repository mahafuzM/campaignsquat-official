import React from 'react';

const ContactMap = () => {
  // UK Office Street View URL
  const ukStreetViewUrl = "https://www.google.com/maps/embed?pb=!4v1769842342752!6m8!1m7!1sEGXlOFWqvxKEavnVPqaJTw!2m2!1d50.75865419278363!2d-2.075331714309204!3f12.464035224349287!4f-16.744119646869947!5f0.7820865974627469";
  // Bangladesh Office Street View URL
  const bdStreetViewUrl = "https://www.google.com/maps/embed?pb=!4v1769842733418!6m8!1m7!1s95IUlRF3D1tuYASrXmrX5g!2m2!1d23.54218552930441!2d89.16606898149857!3f174.99897757904654!4f-5.159014301472723!5f0.7820865974627469";

  return (
    <section className="w-full bg-[#02050A] py-12 md:py-20">
      <div className="max-w-[1445px] mx-auto px-2 md:px-16 lg:px-22 xl:px-16 space-y-20">
        
        {/* --- UK Office Section (First) --- */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-white text-3xl font-bold">Our UK Office Location</h2>
            <p className="text-[#F7A400] mt-2 tracking-wide">Unit 13 Freeland Park, Poole, England, BH16 6FA</p>
          </div>

          <div className="relative w-full h-[250px] md:h-[500px] rounded-[5px] overflow-hidden shadow-2xl border border-white/10 bg-black">
            <iframe
              title="UK Office Street View"
              src={ukStreetViewUrl}
              width="100%"
              height="100%"
              style={{ border: 0, backgroundColor: '#000' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-4 left-4 z-10 bg-black/60 p-3 rounded-lg border border-white/5 pointer-events-none">
              <span className="text-white text-[11px] font-sans uppercase tracking-widest opacity-80">
                © 2024 Google - United Kingdom
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a 
              href="https://maps.app.goo.gl/9gZ2KuRwXoLpRSV56" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#F7A400] text-sm hover:underline"
            >
              Open Original Maps View (UK Office)
            </a>
          </div>
        </div>

        {/* --- Bangladesh Office Section (Second) --- */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-white text-3xl font-bold">Our Bangladesh Office Location</h2>
            <p className="text-[#F7A400] mt-2">312 PaglaKanai Rod, Beparipara, Jhenaidah Sadar, Jhenaidah 7300</p>
          </div>

          <div className="relative w-full h-[250px] md:h-[500px] rounded-[5px] overflow-hidden shadow-2xl border border-white/10 bg-black">
            <iframe
              title="BD Office Street View"
              src={bdStreetViewUrl}
              width="100%"
              height="100%"
              style={{ border: 0, backgroundColor: '#000' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-4 left-4 z-10 bg-black/60 p-3 rounded-lg border border-white/5 pointer-events-none">
              <span className="text-white text-[11px] font-sans uppercase tracking-widest opacity-80">
                © 2024 Google - Bangladesh
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a 
              href="https://maps.app.goo.gl/YkUya6ZU2z1kH9Q98" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#F7A400] text-sm hover:underline"
            >
              Open Original Maps View (BD office)
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactMap;