import React from 'react';
import { 
  Code2, Terminal, Cpu, Layers, Globe, Zap, 
  Layout, Server, Hexagon, Box, Cpu as Chip 
} from 'lucide-react';

const SkillsGrid = () => {
  const techStack = [
    { name: "Java", icon: <Code2 size={18} /> },
    { name: "Python", icon: <Terminal size={18} /> },
    { name: "Rust", icon: <Chip size={18} /> },
    { name: "C++", icon: <Code2 size={18} /> },
    { name: "C#", icon: <Layers size={18} /> },
    { name: "PHP", icon: <Globe size={18} /> },
    { name: "Ruby", icon: <Zap size={18} /> },
    { name: "React", icon: <Hexagon size={18} /> },
    { name: "Next.js", icon: <Layout size={18} /> },
    { name: "Tailwind CSS", icon: <Box size={18} /> },
    { name: "Node.js", icon: <Server size={18} /> },
    { name: "Vue.js", icon: <Hexagon size={18} /> },
    { name: "Svelte", icon: <Zap size={18} /> },
  ];

  // গ্যাপ বন্ধ করার জন্য লুপে ২বার ডুপ্লিকেট রাখাই যথেষ্ট যদি ক্যালকুলেশন সঠিক থাকে
  const displayStack = [...techStack, ...techStack];

  return (
    <section className="w-full bg-[#02050A] py-8 md:py-16 overflow-hidden pt-8 md:pt-10 ">
      
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } /* ২বার রিপিট করলে ৫০% হবে */
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marqueeLeft 40s linear infinite;
          }
          
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marqueeRight 40s linear infinite;
          }
          
          /* মোবাইলে স্পিড আরও স্মুথ রাখার জন্য */
          @media (max-width: 768px) {
            .animate-marquee-left, .animate-marquee-right {
              animation-duration: 50s; 
            }
          }

          .animate-marquee-left:hover, .animate-marquee-right:hover {
            animation-play-state: paused;
          }

          .mask-fade {
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
        `}
      </style>

      <div className="w-full flex flex-col gap-4 md:gap-8">
        
        {/* Row 1: Left */}
        <div className="w-full overflow-hidden mask-fade">
          <div className="animate-marquee-left">
            {displayStack.map((tech, index) => (
              <div 
                key={`row1-${index}`} 
                className="flex items-center space-x-2 md:space-x-3 px-4 md:px-6 py-2 md:py-3 rounded-[5px]  border border-white/10 bg-white/5 mx-2"
              >
                <div className="text-[#F7A400]">{tech.icon}</div>
                <span className="text-white text-[13px] md:text-[15px] font-semibold tracking-wide whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right */}
        <div className="w-full overflow-hidden mask-fade">
          <div className="animate-marquee-right">
            {displayStack.map((tech, index) => (
              <div 
                key={`row2-${index}`} 
                className="flex items-center space-x-2 md:space-x-3 px-4 md:px-6 py-2 md:py-3 rounded-[5px]  border border-white/10 bg-white/5 mx-2"
              >
                <div className="text-[#F7A400]">{tech.icon}</div>
                <span className="text-white text-[13px] md:text-[15px] font-semibold tracking-wide whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Left */}
        <div className="w-full overflow-hidden mask-fade">
          <div className="animate-marquee-left">
            {displayStack.map((tech, index) => (
              <div 
                key={`row3-${index}`} 
                className="flex items-center space-x-2 md:space-x-3 px-4 md:px-6 py-2 md:py-3 rounded-[5px]  border border-white/10 bg-white/5 mx-2"
              >
                <div className="text-[#F7A400]">{tech.icon}</div>
                <span className="text-white text-[13px] md:text-[15px] font-semibold tracking-wide whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsGrid;