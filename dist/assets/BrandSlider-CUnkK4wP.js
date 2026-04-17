import{j as a,a as u}from"./index-1cChyfF4.js";import{r as i}from"./react-vendor-Dao1vdbI.js";const y=()=>{const[s,f]=i.useState([]),[h,p]=i.useState(!0),r=window.location.hostname==="localhost"?"http://localhost:5000":"/api";if(i.useEffect(()=>{let e=!0;return(async()=>{var m;try{const t=await u.get(`${r}/api/brands`);if(e){const x=Array.isArray(t.data)?t.data:((m=t.data)==null?void 0:m.brands)||[];f(x)}}catch(t){console.error("স্লাইডার ডাটা লোড হচ্ছে না:",t)}finally{e&&p(!1)}})(),()=>{e=!1}},[r]),h||!Array.isArray(s)||s.length===0)return null;const n=Math.ceil(s.length/2),o=s.slice(0,n),c=s.slice(n),d=e=>e!=null&&e.url?e.url.startsWith("http")?e.url:`${r}${e.url}`:"";return a.jsxs("section",{className:"w-full bg-[#02050A] md:py-4 overflow-hidden font-poppins relative z-10",children:[a.jsx("div",{className:"w-full py-10 md:py-16",children:a.jsxs("div",{className:"relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)] flex flex-col gap-3 md:gap-10",children:[a.jsx("div",{className:"flex overflow-hidden",children:a.jsx("div",{className:"flex animate-scroll-right whitespace-nowrap items-center pause-on-hover",children:[...o,...o].map((e,l)=>a.jsx("div",{className:"flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12",children:a.jsx("img",{src:d(e),alt:e.name||"Brand",loading:"lazy",className:"w-full h-full object-contain brightness-110 filter grayscale hover:grayscale-0 transition-all duration-300"})},`row1-${e._id||l}`))})}),a.jsx("div",{className:"flex overflow-hidden",children:a.jsx("div",{className:"flex animate-scroll-left whitespace-nowrap items-center pause-on-hover",children:[...c,...c].map((e,l)=>a.jsx("div",{className:"flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12",children:a.jsx("img",{src:d(e),alt:e.name||"Brand",loading:"lazy",className:"w-full h-full object-contain brightness-110 filter grayscale hover:grayscale-0 transition-all duration-300"})},`row2-${e._id||l}`))})})]})}),a.jsx("style",{children:`
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }

        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `})]})};export{y as B};
