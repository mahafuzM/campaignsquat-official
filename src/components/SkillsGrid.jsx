import React from 'react';
import Icon from 'tech-stack-icons';

const SkillsGrid = () => {
  const techStack = [
    { name: "Java", iconId: "java" },
    { name: "Python", iconId: "python" },
    { name: "Rust", iconId: "rust" },
    { name: "C++", iconId: "cpp" },
    { name: "C#", iconId: "csharp" },
    { name: "PHP", iconId: "php" },
    { name: "Ruby", iconId: "ruby" },
    { name: "React", iconId: "react" },
    { name: "Next.js", iconId: "nextjs" },
    { name: "Tailwind CSS", iconId: "tailwindcss" },
    { name: "Node.js", iconId: "nodejs" },
    { name: "Vue.js", iconId: "vuejs" },
    { name: "Svelte", iconId: "sveltejs" },
  ];

  const displayStack = [...techStack, ...techStack];

  return (
    <section className="relative w-full bg-[#000000] py-8 md:py-12 lg:py-16 overflow-hidden font-poppins">
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marqueeLeft 35s linear infinite;
          }
          
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marqueeRight 35s linear infinite;
          }
          
          @media (max-width: 768px) {
            .animate-marquee-left, .animate-marquee-right {
              animation-duration: 45s; 
            }
          }

          .animate-marquee-left:hover, .animate-marquee-right:hover {
            animation-play-state: paused;
          }

          /* Fade mask for smooth edges */
          .mask-fade {
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }

          .tech-card {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            z-index: 10;
          }

          .tech-card:hover {
            border-color: #F7A400;
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.9), 0 0 20px -5px rgba(247, 164, 0, 0.3);
            z-index: 100 !important;
          }

          /* Fixing the half-visible / clipping issue */
          .marquee-container {
            padding: 25px 0; /* Extra padding to allow hover translation without clipping */
            overflow: visible !important;
          }

          .icon-box {
            background: rgba(255, 255, 255, 0.95); /* Bright white background for visibility */
            padding: 6px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }

          .tech-name {
            color: #E2E8F0;
            transition: color 0.3s;
          }
          .tech-card:hover .tech-name {
            color: #F7A400;
          }
        `}
      </style>

      <div className="w-full flex flex-col gap-4 relative z-10">
        
        {/* Row 1: Left */}
        <div className="w-full marquee-container mask-fade">
          <div className="animate-marquee-left">
            {displayStack.map((tech, index) => (
              <div 
                key={`row1-${index}`} 
                className="tech-card flex items-center gap-4 px-6 md:px-9 py-3.5 md:py-5 rounded-2xl mx-3 md:mx-4 group cursor-pointer"
              >
                <div className="icon-box w-9 h-9 md:w-11 md:h-11 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Icon name={tech.iconId} />
                </div>
                <span className="tech-name text-[16px] md:text-[19px] font-bold tracking-wide whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right */}
        <div className="w-full marquee-container mask-fade">
          <div className="animate-marquee-right">
            {displayStack.map((tech, index) => (
              <div 
                key={`row2-${index}`} 
                className="tech-card flex items-center gap-4 px-6 md:px-9 py-3.5 md:py-5 rounded-2xl mx-3 md:mx-4 group cursor-pointer"
              >
                <div className="icon-box w-9 h-9 md:w-11 md:h-11 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Icon name={tech.iconId} />
                </div>
                <span className="tech-name text-[16px] md:text-[19px] font-bold tracking-wide whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsGrid;