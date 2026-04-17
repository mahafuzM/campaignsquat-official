import{j as a,a as f}from"./index-u_PRR_Sl.js";import{r as l}from"./react-vendor-Dao1vdbI.js";const w=()=>{const[t,m]=l.useState([]),[h,p]=l.useState(!0);if(l.useEffect(()=>{let e=!0;return(async()=>{var d;try{const s=await f.get("/api/brands");if(e){const x=Array.isArray(s.data)?s.data:Array.isArray((d=s.data)==null?void 0:d.data)?s.data.data:[];m(x)}}catch(s){console.error("স্লাইডার ডাটা লোড হচ্ছে না:",s)}finally{e&&p(!1)}})(),()=>{e=!1}},[]),h||!Array.isArray(t)||t.length===0)return null;const i=Math.ceil(t.length/2),n=t.slice(0,i),o=t.slice(i),c=e=>e!=null&&e.url?e.url.startsWith("http")?e.url:`${f.defaults.baseURL||""}${e.url}`:"";return a.jsxs("section",{className:"w-full bg-[#02050A] md:py-4 overflow-hidden font-poppins relative z-10",children:[a.jsx("div",{className:"w-full py-10 md:py-16",children:a.jsxs("div",{className:"relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)] flex flex-col gap-3 md:gap-10",children:[a.jsx("div",{className:"flex overflow-hidden",children:a.jsx("div",{className:"flex animate-scroll-right whitespace-nowrap items-center pause-on-hover",children:[...n,...n].map((e,r)=>a.jsx("div",{className:"flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12",children:a.jsx("img",{src:c(e),alt:e.name||"Brand",loading:"lazy",className:"w-full h-full object-contain brightness-110 filter grayscale hover:grayscale-0 transition-all duration-300"})},`row1-${e._id||r}`))})}),a.jsx("div",{className:"flex overflow-hidden",children:a.jsx("div",{className:"flex animate-scroll-left whitespace-nowrap items-center pause-on-hover",children:[...o,...o].map((e,r)=>a.jsx("div",{className:"flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12",children:a.jsx("img",{src:c(e),alt:e.name||"Brand",loading:"lazy",className:"w-full h-full object-contain brightness-110 filter grayscale hover:grayscale-0 transition-all duration-300"})},`row2-${e._id||r}`))})})]})}),a.jsx("style",{children:`
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
      `})]})};export{w as B};
