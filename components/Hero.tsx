import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Terminal, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { HERO_HEADLINE, HERO_SUBHEADLINE } from '../constants';

interface HeroProps {
  onNavigateToSolutions: () => void;
}

// Custom HackerBot Icon Component (2D Flat Version)
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

// Custom MoneyBot Icon Component (2D Flat Version)
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

export const Hero: React.FC<HeroProps> = ({ onNavigateToSolutions }) => {
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
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (Sensitivity: divide by higher number for less movement)
    const rotateX = ((y - centerY) / centerY) * -25; // Max -25deg to 25deg
    const rotateY = ((x - centerX) / centerX) * 25;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 }); // Reset to flat
  };

  // Helper to render the correct icon based on state
  const CurrentIcon = iconMode === 'robot' ? HackerBot : MoneyBot;
  
  // Dynamic class for the main icon color
  const mainIconColor = iconMode === 'robot' ? 'text-cyan-400' : 'text-emerald-400';
  const glitchColor1 = iconMode === 'robot' ? 'text-red-500' : 'text-blue-500';
  const glitchColor2 = iconMode === 'robot' ? 'text-blue-500' : 'text-purple-500';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-20 animate-in fade-in duration-1000 bg-black">
      
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

      <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">
        
        {/* Floating Badge */}
        <div className="animate-float inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-gray-300 text-xs font-bold tracking-[0.2em] uppercase">Security Level: Max</span>
        </div>

        {/* Main Hero Visual: Glitch Icon Left + Text Right */}
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 mb-8 w-full max-w-[90rem]">
          
          {/* INTERACTIVE TILT CONTAINER */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 cursor-pointer perspective-container"
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
                {/* Float Animation Wrapper - Independent of Tilt */}
                <div className="w-full h-full" style={{ animation: 'float-complex 6s ease-in-out infinite' }}>
                    
                    {/* Glow Background */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] ${iconMode === 'robot' ? 'bg-cyan-500/20' : 'bg-emerald-500/20'} rounded-full blur-2xl animate-pulse transition-colors duration-500`}></div>
                    
                    {/* Glitch Wrapper */}
                    <div className={`relative w-full h-full ${isGlitching ? 'glitch-active' : ''}`}>
                        
                        {/* Layer 1: Chromatic Aberration (Red/Magenta) */}
                        <CurrentIcon 
                            className={`glitch-layer-1 absolute inset-0 w-full h-full opacity-70 hidden ${glitchColor1}`} 
                            strokeWidth={1.5}
                        />
                        
                        {/* Layer 2: Chromatic Aberration (Blue/Cyan) */}
                        <CurrentIcon 
                            className={`glitch-layer-2 absolute inset-0 w-full h-full opacity-70 hidden ${glitchColor2}`} 
                            strokeWidth={1.5}
                        />

                        {/* Main Layer */}
                        <CurrentIcon 
                            className={`main-icon absolute inset-0 w-full h-full ${mainIconColor} drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300`} 
                            strokeWidth={1.5}
                        />

                    </div>
                </div>
             </div>
          </div>

          {/* Text - Aligned Right of Logo */}
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] text-center xl:text-left text-white tracking-tighter">
            VENDAS NO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-cyan-300 glow-text whitespace-nowrap">
              PILOTO AUTOMÁTICO
            </span>
          </h1>

        </div>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light text-center mix-blend-plus-lighter border-l border-white/10 pl-6">
          {HERO_SUBHEADLINE}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg mb-12">
          <Button onClick={onNavigateToSolutions} fullWidth className="group relative overflow-hidden bg-white text-black hover:bg-gray-200 border-none">
            <span className="relative z-10 flex items-center justify-center gap-2">
              INICIAR PROTOCOLO <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          
          <button onClick={onNavigateToSolutions} className="flex items-center gap-4 text-white hover:text-cyan-400 transition-colors group px-6 py-4 rounded-lg hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/20">
            <div className="relative">
              <div className="absolute inset-0 bg-white blur-lg opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative w-12 h-12 rounded-lg bg-black flex items-center justify-center border border-white/20 group-hover:border-cyan-400 transition-colors">
                <ShieldCheck fill="currentColor" size={18} className="ml-1 text-gray-400 group-hover:text-cyan-400" />
              </div>
            </div>
            <span className="font-bold tracking-wide text-sm uppercase">Ver Demo</span>
          </button>
        </div>
      </div>

    </section>
  );
};