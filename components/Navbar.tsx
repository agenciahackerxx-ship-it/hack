import React from 'react';
import { Bot, Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Soluções' },
    { id: 'about', label: 'Sobre Nós' },
    { id: 'contact', label: 'Contato' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo Area */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 bg-black border border-white/20 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] group-hover:border-cyan-500/50 transition-all">
            <Terminal className="text-white group-hover:text-cyan-400 transition-colors" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-xl leading-none tracking-tighter text-white">
              HACK<span className="text-cyan-400">.ER</span>
            </span>
            <span className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase group-hover:text-gray-300 transition-colors">AGENCY</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden
                ${activeTab === tab.id 
                  ? 'text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-white rounded-full"></div>
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
           <button 
             onClick={() => setActiveTab('contact')}
             className="px-5 py-2 bg-transparent text-white hover:bg-white hover:text-black text-sm font-bold rounded-lg transition-all shadow-lg border border-white/30 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
           >
             Diagnóstico Gratuito
           </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black/95 border-b border-white/10 backdrop-blur-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                p-4 rounded-xl text-left font-bold border border-transparent transition-all
                ${activeTab === tab.id 
                  ? 'bg-white/10 text-white border-white/30' 
                  : 'text-gray-400 active:bg-white/5'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};