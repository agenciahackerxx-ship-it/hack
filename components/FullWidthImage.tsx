import React from 'react';

export const FullWidthImage: React.FC = () => {
  return (
    <section className="w-full h-[500px] relative overflow-hidden group border-y border-white/10 bg-black">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop" 
           alt="Cyberpunk Digital Infrastructure"
           className="w-full h-full object-cover opacity-40 transition-transform duration-[3s] ease-in-out transform group-hover:scale-110 grayscale group-hover:grayscale-0"
         />
      </div>
      
      {/* Scanline Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none opacity-20"></div>
      
      {/* Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-20"></div>

      {/* Center Text/Graphic */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
         <div className="text-center px-4">
            <div className="inline-block px-4 py-1 border border-cyan-500/30 bg-black/50 backdrop-blur-md rounded-full mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="text-cyan-400 text-xs font-mono uppercase tracking-[0.5em]">Web Development</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity duration-1000 scale-90 group-hover:scale-100 uppercase leading-tight">
               ENTREGAMOS SEU SITE <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">EM 24 HORAS</span>
            </h2>
         </div>
      </div>
    </section>
  );
};