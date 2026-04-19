import{j as a,a as h}from"./index-DGoHTnQ9.js";import{r as l}from"./react-vendor-CoeVENAX.js";const _=()=>{const[i,n]=l.useState([]),[u,w]=l.useState(!0),c=[{name:"Google",url:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"},{name:"Microsoft",url:"https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"},{name:"Amazon",url:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"},{name:"Meta",url:"https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"},{name:"Microsoft",url:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"},{name:"Apple",url:"https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"},{name:"Stripe",url:"https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"},{name:"Netflix",url:"https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"}];if(l.useEffect(()=>{let e=!0;return(async()=>{var s;try{const t=await h.get("/api/brands");if(e){const g=Array.isArray(t.data)?t.data:Array.isArray((s=t.data)==null?void 0:s.data)?t.data.data:[];n(g.length>0?g:c)}}catch(t){console.error("স্লাইডার ডাটা লোড হচ্ছে না:",t),e&&n(c)}finally{e&&w(!1)}})(),()=>{e=!1}},[]),u&&i.length===0)return null;const m=Math.ceil(i.length/2),d=i.slice(0,m),p=i.slice(m),r="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",f=e=>e!=null&&e.url?e.url.startsWith("http")?e.url:`${h.defaults.baseURL||""}${e.url}`:r;return a.jsxs("section",{className:"relative w-full bg-[#000000] pt-0 md:pt-4 pb-8 md:pb-16 overflow-hidden font-poppins",children:[a.jsx("div",{className:"relative z-10 w-full",children:a.jsxs("div",{className:"relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_15%,_black_85%,transparent_100%)] flex flex-col gap-6 md:gap-12",children:[a.jsx("div",{className:"flex overflow-hidden",children:a.jsx("div",{className:"flex animate-scroll-right whitespace-nowrap items-center pause-on-hover",children:[...d,...d].map((e,o)=>a.jsx("div",{className:"flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12",children:a.jsx("img",{src:f(e),alt:e.name||"Brand",loading:"lazy",onError:s=>{s.target.src=r},className:"w-full h-full object-contain transition-all duration-500 cursor-pointer scale-90 hover:scale-100"})},`row1-${e._id||o}`))})}),a.jsx("div",{className:"flex overflow-hidden",children:a.jsx("div",{className:"flex animate-scroll-left whitespace-nowrap items-center pause-on-hover",children:[...p,...p].map((e,o)=>a.jsx("div",{className:"flex-shrink-0 w-[140px] md:w-[180px] lg:w-[250px] h-16 md:h-24 flex items-center justify-center px-3 md:px-12",children:a.jsx("img",{src:f(e),alt:e.name||"Brand",loading:"lazy",onError:s=>{s.target.src=r},className:"w-full h-full object-contain transition-all duration-500 cursor-pointer scale-90 hover:scale-100"})},`row2-${e._id||o}`))})})]})}),a.jsx("style",{children:`
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
      `})]})};export{_ as B};
