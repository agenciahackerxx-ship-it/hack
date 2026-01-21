import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { FeatureVideo } from './components/FeatureVideo';
import { ToolsTicker } from './components/ToolsTicker';
import { Curriculum } from './components/Curriculum';
import { Pricing } from './components/Pricing';
import { Instructor } from './components/Instructor';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';
import { FullWidthImage } from './components/FullWidthImage';
import { Testimonials } from './components/Testimonials';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <>
            <Hero onNavigateToSolutions={() => setActiveTab('solutions')} />
            <FeatureVideo />
            <ToolsTicker />
            {/* Social Proof Numbers - Monochrome */}
            <section className="py-20 border-b border-white/10 bg-black/80 backdrop-blur-sm">
              <div className="container mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-24 text-center">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <span className="block text-4xl md:text-5xl font-black text-white mb-2">100%</span>
                  <span className="text-gray-500 uppercase text-sm tracking-widest font-bold">Margem de Lucro</span>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                  <span className="block text-4xl md:text-5xl font-black text-white mb-2">&lt; 5s</span>
                  <span className="text-gray-500 uppercase text-sm tracking-widest font-bold">Tempo de Resposta</span>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                  <span className="block text-4xl md:text-5xl font-black text-white mb-2">Zero</span>
                  <span className="text-gray-500 uppercase text-sm tracking-widest font-bold">Custo por Mensagem</span>
                </div>
              </div>
            </section>
            <Testimonials />
          </>
        );
      case 'solutions':
        return (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
            <Curriculum />
            <FullWidthImage />
            <Pricing />
          </div>
        );
      case 'about':
        return <Instructor />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero onNavigateToSolutions={() => setActiveTab('solutions')} />;
    }
  };

  return (
    <main className="min-h-screen text-gray-200 overflow-x-hidden selection:bg-white selection:text-black font-sans bg-black">
      
      {/* GLOBAL BACKGROUND VIDEO - Darker & Desaturated & Minimalist */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-black/90 z-10"></div> {/* Overlay Muito Escuro para contraste High-End */}
        {/* Background Gradient Mesh para profundidade extra */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),rgba(0,0,0,1))] z-10 pointer-events-none"></div>
        
        {/* Vídeo de fundo atualizado: Rede Neural Minimalista/Abstrata */}
        <video 
          src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4" 
          poster="https://images.pexels.com/videos/3129671/free-video-3129671.jpg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1280"
          className="w-full h-full object-cover grayscale opacity-30"
          autoPlay 
          loop 
          muted 
          playsInline
        />
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="pt-20"> {/* Espaçamento para a Navbar fixa */}
        {renderContent()}
      </div>

      <footer className="py-8 border-t border-white/10 text-center text-gray-600 text-sm bg-black mt-auto">
        <div className="container mx-auto px-4">
          <p className="mb-2">&copy; {new Date().getFullYear()} Hack.er Agency. Todos os direitos reservados.</p>
          <p className="text-xs font-mono">CODE • AUTOMATION • SECURITY</p>
        </div>
      </footer>
    </main>
  );
};

export default App;