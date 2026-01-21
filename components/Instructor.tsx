import React, { useState, useEffect, useRef } from 'react';
import { Zap, Shield, Server, Terminal, Fingerprint } from 'lucide-react';

// Custom HackerBot Icon Component (Reused from Hero)
const HackerBot = ({ className, strokeWidth, style }: { className?: string, strokeWidth?: number, style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M12 2v2" />
    <circle cx="12" cy="2" r="1" fill="currentColor" className="opacity-50" />
    <rect width="18" height="18" x="3" y="4" rx="4" />
    <path d="M8 11l3 2-3 2" strokeLinecap="square" className="animate-[blink-eye_4s_infinite]" /> 
    <path d="M14 15h4" className="animate-pulse" />
  </svg>
);

// Custom MoneyBot Icon Component (Reused from Hero)
const MoneyBot = ({ className, strokeWidth, style }: { className?: string, strokeWidth?: number, style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <rect width="20" height="16" x="2" y="4" rx="3" />
    <path d="M2 10h20" className="opacity-30" />
    <path d="M12 7v10" />
    <path d="M16 9a4 4 0 0 0-8 0c0 4 8 3 8 7a4 4 0 0 1-8 0" />
    <circle cx="5" cy="16" r="1" fill="currentColor" className="opacity-50" />
    <circle cx="19" cy="8" r="1" fill="currentColor" className="opacity-50" />
  </svg>
);

export const Instructor: React.FC = () => {
  const [iconMode, setIconMode] = useState<'robot' | 'money'>('robot');
  const [isGlitching, setIsGlitching] = useState(false);
  
  // States for Tilt Effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Start Glitch
      setIsGlitching(true);

      // 2. Swap Icon mid-glitch (250ms delay)
      setTimeout(() => {
        setIconMode(prev => prev === 'robot' ? 'money' : 'robot');
      }, 250);

      // 3. Stop Glitch (500ms duration total)
      setTimeout(() => {
        setIsGlitching(false);
      }, 500);

    }, 4000); // Repeat every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle Mouse Move for 3D Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 }); 
  };

  const CurrentIcon = iconMode === 'robot' ? HackerBot : MoneyBot;
  const mainIconColor = iconMode === 'robot' ? 'text-cyan-400' : 'text-emerald-400';
  const glitchColor1 = iconMode === 'robot' ? 'text-red-500' : 'text-blue-500';
  const glitchColor2 = iconMode === 'robot' ? 'text-blue-500' : 'text-purple-500';

  return (
    <section className="py-32 relative overflow-hidden bg-black animate-in zoom-in-95 duration-700">
       
       <style>{`
        @keyframes float-complex {
          0% { transform: translateY(0); filter: brightness(1); }
          50% { transform: translateY(-15px); filter: brightness(1.1); }
          100% { transform: translateY(0); filter: brightness(1); }
        }
        @keyframes blink-eye {
          0%, 45%, 55%, 90%, 100% { opacity: 1; transform: scaleY(1); }
          50%, 95% { opacity: 0; transform: scaleY(0.1); }
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-20deg); }
          40% { transform: skew(20deg); }
          60% { transform: skew(-10deg); }
          80% { transform: skew(10deg); }
          100% { transform: skew(0deg); }
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(2px, -2px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(2px, -2px); }
          100% { clip-path: inset(0% 0 90% 0); transform: translate(-2px, 2px); }
        }
        .glitch-active .glitch-layer-1 {
          animation: glitch-anim-1 0.3s infinite linear alternate-reverse;
          display: block;
        }
        .glitch-active .glitch-layer-2 {
          animation: glitch-anim-2 0.3s infinite linear alternate-reverse;
          display: block;
        }
        .glitch-active .main-icon {
          animation: glitch-skew 0.3s infinite linear;
          opacity: 0.8;
        }
      `}</style>

       {/* Background Tech Mesh */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">

            {/* Left: Animated 3D Glitch Bot (Identical to Hero) */}
            <div className="w-full md:w-1/2 relative flex items-center justify-center">
                
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px]"></div>

                {/* INTERACTIVE TILT CONTAINER */}
                <div 
                  ref={containerRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 cursor-pointer perspective-container"
                  style={{ 
                    perspective: '1000px'
                  }}
                >
                  {/* The transforming element */}
                  <div 
                    className="relative w-full h-full transition-transform duration-100 ease-out"
                    style={{ 
                        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
                    }}
                  >
                      {/* Float Animation Wrapper */}
                      <div className="w-full h-full" style={{ animation: 'float-complex 6s ease-in-out infinite' }}>
                          
                          {/* Glitch Wrapper */}
                          <div className={`relative w-full h-full ${isGlitching ? 'glitch-active' : ''}`}>
                              
                              {/* Layer 1: Chromatic Aberration */}
                              <CurrentIcon 
                                  className={`glitch-layer-1 absolute inset-0 w-full h-full opacity-70 hidden ${glitchColor1}`} 
                                  strokeWidth={1}
                              />
                              
                              {/* Layer 2: Chromatic Aberration */}
                              <CurrentIcon 
                                  className={`glitch-layer-2 absolute inset-0 w-full h-full opacity-70 hidden ${glitchColor2}`} 
                                  strokeWidth={1}
                              />

                              {/* Main Layer */}
                              <CurrentIcon 
                                  className={`main-icon absolute inset-0 w-full h-full ${mainIconColor} drop-shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300`} 
                                  strokeWidth={1}
                              />

                          </div>
                      </div>
                  </div>
                </div>
            </div>

            {/* Right: Agency Manifesto */}
            <div className="w-full md:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-900/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Terminal size={12} />
                    System Core v3.0
                </div>

                <h2 className="text-5xl font-heading font-black mb-6 text-white leading-none tracking-tighter">
                    NÓS SOMOS A <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 animate-gradient-x">
                        HACK.ER AGENCY
                    </span>
                </h2>

                <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed mb-8">
                    <p>
                        Esqueça agências tradicionais. Nós somos um <strong className="text-white">Laboratório de Engenharia de Automação</strong>.
                    </p>
                    <p>
                        Nossa arquitetura não é baseada em pessoas sentadas em escritórios, mas em <span className="text-cyan-400">Agentes Autônomos</span> que vivem na nuvem. Nós escrevemos o código que substitui a burocracia.
                    </p>
                    <p className="border-l-2 border-cyan-500/50 pl-4 italic text-gray-500">
                        "Enquanto seus concorrentes dormem, nossos sistemas estão negociando, vendendo e organizando sua empresa."
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { icon: Zap, label: "Latência Zero", desc: "Respostas em milissegundos" },
                        { icon: Shield, label: "Criptografia Militar", desc: "Seus dados blindados" },
                        { icon: Server, label: "Infra Própria", desc: "Sem dependência de terceiros" },
                        { icon: Fingerprint, label: "Identidade Única", desc: "IA treinada no seu tom de voz" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5">
                            <div className="mt-1 text-gray-500 group-hover:text-cyan-400 transition-colors">
                                <item.icon size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">{item.label}</h4>
                                <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                    <div className="text-xs font-mono text-gray-500">
                        EST. 2024 // SAO PAULO - BR
                    </div>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                    </div>
                </div>
            </div>

          </div>
       </div>
    </section>
  );
};