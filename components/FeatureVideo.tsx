import React from 'react';
import { ScanFace, Activity, Cpu, Database, MessageCircle, Play } from 'lucide-react';

export const FeatureVideo: React.FC = () => {
  return (
    <section className="relative w-full h-[85vh] bg-black overflow-hidden border-y border-white/10 group">
      
      {/* Video Background - High Res 4K */}
      <div className="absolute inset-0 w-full h-full bg-gray-900">
        <video 
          src="https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4" 
          poster="https://images.pexels.com/videos/5377684/free-video-5377684.jpg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1280"
          className="w-full h-full object-cover opacity-80"
          autoPlay 
          loop 
          muted 
          playsInline
        />
        {/* Gradient Overlay for Text Readability without hiding video details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>

      {/* Center Play Button Visual (Decorative) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.2)]">
           <Play size={40} className="text-white fill-white ml-2 opacity-90" />
        </div>
        <div className="absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_linear_infinite] opacity-50"></div>
      </div>

      {/* UI Overlay Elements (HUD) */}
      <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-between py-12 z-20 pointer-events-none">
        
        {/* Top HUD */}
        <div className="flex justify-between items-start">
           <div className="flex items-center gap-3">
              <div className="bg-white/10 border border-white/30 px-3 py-1 rounded-sm text-white text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                SYSTEM: ONLINE
              </div>
           </div>
           
           <div className="hidden md:flex items-center gap-4 text-xs font-mono text-gray-300">
              <span className="animate-pulse tracking-widest">RECORDING...</span>
              <div className="flex gap-1">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
           </div>
        </div>

        {/* Bottom HUD & Title */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          
          <div className="max-w-4xl relative">
            <div className="mb-4 inline-flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-widest border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-950/30 backdrop-blur-md">
              <MessageCircle size={14} />
              <span>Resposta Instantânea</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-heading font-black text-white mb-4 tracking-tighter drop-shadow-2xl">
              ATENDIMENTO <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 animate-gradient-x bg-[length:200%_auto]">
                24 HORAS
              </span>
            </h2>
            
            <p className="text-gray-200 text-lg md:text-xl font-light max-w-xl border-l-4 border-cyan-400 pl-6 drop-shadow-md bg-black/30 p-2 rounded-r-lg backdrop-blur-sm">
              Seu negócio nunca mais vai perder um cliente por demora na resposta. Funciona enquanto você dorme.
            </p>
          </div>

          {/* HUD do canto inferior direito removido conforme solicitado */}

        </div>
      </div>
      
      {/* Scanning Overlay Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-[scan_8s_ease-in-out_infinite]"></div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};