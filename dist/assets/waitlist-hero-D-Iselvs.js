import{r as p,j as e}from"./vendor-react-CZDf6Nbr.js";import{j as x}from"./index-CkQleb1o.js";import{m as o}from"./vendor-motion-BSkV11Fe.js";import{l as h,A as u,P as w,y as g}from"./vendor-ui-BUSNgMT2.js";const N=()=>{const i=p.useRef(null),m=()=>{const a=i.current;if(!a)return;const s=a.getContext("2d");if(!s)return;const n=[],l=["#ef4444","#f87171","#fbbf24","#10b981","#ffffff","#dc2626"];a.width=a.offsetWidth||600,a.height=a.offsetHeight||600;const f=()=>({x:a.width/2,y:a.height/2,vx:(Math.random()-.5)*14,vy:(Math.random()-1.8)*12,life:110,color:l[Math.floor(Math.random()*l.length)],size:Math.random()*5+3,rotation:Math.random()*360,vRot:(Math.random()-.5)*10});for(let r=0;r<75;r++)n.push(f());const c=()=>{if(n.length===0){s.clearRect(0,0,a.width,a.height);return}s.clearRect(0,0,a.width,a.height);for(let r=0;r<n.length;r++){const t=n[r];t.x+=t.vx,t.y+=t.vy,t.vy+=.45,t.life-=1.8,t.rotation+=t.vRot,s.save(),s.translate(t.x,t.y),s.rotate(t.rotation*Math.PI/180),s.fillStyle=t.color,s.globalAlpha=Math.max(0,t.life/110),s.beginPath(),s.arc(0,0,t.size,0,Math.PI*2),s.fill(),s.restore(),t.life<=0&&(n.splice(r,1),r--)}requestAnimationFrame(c)};c()},d={baseBg:"#000000"};return e.jsxs("section",{id:"final-project",className:"relative w-full min-h-[600px] md:min-h-[700px] bg-black/50 flex items-center justify-center pt-20 pb-16 md:pt-28 md:pb-24 px-4 overflow-hidden",children:[e.jsx(x,{numBars:20,gradientFrom:"rgba(255, 65, 0, 0.45)",gradientTo:"transparent",animationDuration:2.2,className:"z-[0]"}),e.jsx("style",{children:`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 60s linear infinite;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes success-pulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 65px rgba(239, 68, 68, 0.8), 0 0 110px rgba(245, 158, 11, 0.4); }
        }
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes celebration-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .animate-success-pulse {
          animation: success-pulse 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-success-glow {
          animation: success-glow 2s ease-in-out infinite;
        }
        .animate-checkmark {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: checkmark-draw 0.4s ease-out 0.3s forwards;
        }
        .animate-ring {
          animation: celebration-ring 0.8s ease-out forwards;
        }
      `}),e.jsxs("div",{className:"absolute inset-0 w-full h-full pointer-events-none overflow-hidden",style:{perspective:"1200px",transform:"perspective(1200px) rotateX(15deg)",transformOrigin:"center bottom",opacity:1},children:[e.jsx("div",{className:"absolute inset-0 animate-spin-slow will-change-transform",children:e.jsx("div",{className:"absolute top-1/2 left-1/2 w-[95vw] h-[95vw] sm:w-[800px] sm:h-[800px] md:w-[1400px] md:h-[1400px] lg:w-[2000px] lg:h-[2000px] max-w-none",style:{transform:"translate(-50%, -50%) rotate(279.05deg)",zIndex:0},children:e.jsx("img",{src:"https://framerusercontent.com/images/oqZEqzDEgSLygmUDuZAYNh2XQ9U.png?scale-down-to=2048",alt:"",className:"w-full h-full object-cover opacity-50 select-none",loading:"lazy",decoding:"async"})})}),e.jsx("div",{className:"absolute inset-0 animate-spin-slow-reverse will-change-transform",children:e.jsx("div",{className:"absolute top-1/2 left-1/2 w-[80vw] h-[80vw] sm:w-[600px] sm:h-[600px] md:w-[1000px] md:h-[1000px] max-w-none",style:{transform:"translate(-50%, -50%) rotate(304.42deg)",zIndex:1},children:e.jsx("img",{src:"https://framerusercontent.com/images/UbucGYsHDAUHfaGZNjwyCzViw8.png?scale-down-to=1024",alt:"",className:"w-full h-full object-cover opacity-60 select-none",loading:"lazy",decoding:"async"})})}),e.jsx("div",{className:"absolute inset-0 animate-spin-slow will-change-transform",children:e.jsx("div",{className:"absolute top-1/2 left-1/2 w-[65vw] h-[65vw] sm:w-[480px] sm:h-[480px] md:w-[800px] md:h-[800px] max-w-none",style:{transform:"translate(-50%, -50%) rotate(48.33deg)",zIndex:2},children:e.jsx("img",{src:"https://framerusercontent.com/images/Ans5PAxtJfg3CwxlrPMSshx2Pqc.png",alt:"App Rotating Icons",className:"w-full h-full object-cover opacity-80 select-none",loading:"lazy",decoding:"async"})})})]}),e.jsx("div",{className:"absolute inset-0 z-10 pointer-events-none",style:{background:`linear-gradient(to top, ${d.baseBg} 15%, rgba(0, 0, 0, 0.75) 50%, transparent 100%)`}}),e.jsxs("div",{className:"relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-6 pt-10 pb-12",children:[e.jsx(o.div,{initial:{opacity:0,scale:.8},whileInView:{opacity:1,scale:1},viewport:{once:!0,amount:.2},transition:{duration:.6,ease:[.16,1,.3,1]},className:"clay-icon-well w-18 h-18 sm:w-20 sm:h-20 rounded-3xl overflow-hidden mb-1 flex items-center justify-center p-3",children:e.jsx("img",{src:"/logoletter.png",alt:"Navya Tech Lettermark",className:"w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",loading:"lazy"})}),e.jsx(o.h2,{initial:{opacity:0,y:30,scale:.97},whileInView:{opacity:1,y:0,scale:1},viewport:{once:!0,amount:.2},transition:{duration:.7,delay:.1,ease:[.16,1,.3,1]},className:"text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-heading max-w-3xl text-white drop-shadow-lg",children:"We treat every project like our reputation depends on its success, because it does."}),e.jsx(o.p,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.6,delay:.2,ease:[.16,1,.3,1]},className:"text-base sm:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed",children:"No empty promises. Just thoughtful technology, clear communication, and work that delivers."}),e.jsxs(o.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.6,delay:.3,ease:[.16,1,.3,1]},className:"w-full max-w-lg px-4 mt-2 relative flex flex-col items-center justify-center gap-4",children:[e.jsxs("div",{className:"text-xs font-mono font-semibold uppercase tracking-widest text-red-300/90 flex items-center gap-1.5 mb-1",children:[e.jsx(h,{className:"w-4 h-4 text-emerald-400"}),e.jsx("span",{children:"Start Your Project • Direct Engineering Team"})]}),e.jsxs("div",{className:"w-full flex flex-col sm:flex-row items-center justify-center gap-4",children:[e.jsx("canvas",{ref:i,className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-50"}),e.jsxs("a",{href:`https://wa.me/919355412903?text=${encodeURIComponent("Hi we would like to know more about services")}`,target:"_blank",rel:"noopener noreferrer",onClick:m,className:"clay-btn-primary w-full sm:w-auto px-9 py-4 rounded-full font-bold text-white transition-all flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider cursor-pointer shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:scale-105","aria-label":"Start Project with Navya Tech Industry on WhatsApp",children:[e.jsx("span",{children:"Start Project"}),e.jsx(u,{className:"w-4 h-4"})]}),e.jsxs("div",{className:"relative w-full sm:w-auto flex items-center justify-center",children:[e.jsx("div",{className:"absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 blur-md pointer-events-none call-now-aura-layer","aria-hidden":"true"}),e.jsxs("a",{href:"tel:+919355412903",className:"clay-btn-secondary relative z-10 w-full sm:w-auto px-8 py-4 rounded-full text-white font-medium text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 border border-red-500/50 hover:border-red-400 hover:scale-105 call-now-breathing-button","aria-label":"Call Navya Tech Industry at +919355412903",children:[e.jsx(w,{className:"w-4 h-4 text-red-400"}),e.jsx("span",{children:"Call Now!"})]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 text-xs font-mono text-zinc-400 mt-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full",children:[e.jsx(g,{className:"w-3.5 h-3.5 text-emerald-400 shrink-0"}),e.jsx("span",{children:"We typically respond within 30 minutes. No obligation inquiry."})]})]})]})]})};export{N as WaitlistHero,N as default};
