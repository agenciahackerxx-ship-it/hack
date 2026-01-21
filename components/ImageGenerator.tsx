import React, { useState } from 'react';
import { generateMarketingImage } from '../services/geminiService';
import { LoadingState } from '../types';
import { Image as ImageIcon, Sparkles, Loader2, Download, Maximize2 } from 'lucide-react';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setStatus(LoadingState.LOADING);
    setImageUrl(null);
    
    try {
      const url = await generateMarketingImage(prompt, size);
      setImageUrl(url);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <section className="py-20 bg-black relative border-t border-white/10">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/20 text-gray-300 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14} /> Gemini 3 Pro
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-4">
              Gerador de Assets <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Nano Banana</span>
            </h2>
            <p className="text-gray-400">Crie imagens exclusivas para seu marketing em segundos.</p>
          </div>

          <div className="bg-black/80 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Descreva a imagem (ex: Um robô futurista atendendo um cliente em um escritório de vidro)..."
                className="flex-1 bg-black border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
              />
              
              <div className="flex gap-2">
                {(['1K', '2K', '4K'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                      size === s 
                      ? 'bg-white border-white text-black' 
                      : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={status === LoadingState.LOADING || !prompt}
                className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2 justify-center"
              >
                {status === LoadingState.LOADING ? <Loader2 className="animate-spin" /> : <ImageIcon size={20} />}
                <span className="hidden md:inline">Gerar</span>
              </button>
            </div>

            {/* Display Area */}
            <div className="aspect-video w-full bg-black/60 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
              {status === LoadingState.LOADING && (
                <div className="flex flex-col items-center gap-3 text-white">
                  <Loader2 className="animate-spin" size={40} />
                  <span className="text-xs uppercase tracking-widest animate-pulse text-gray-400">Renderizando Pixels...</span>
                </div>
              )}

              {status === LoadingState.IDLE && !imageUrl && (
                <div className="text-gray-600 flex flex-col items-center">
                  <Maximize2 size={40} className="mb-2 opacity-50" />
                  <span className="text-sm font-mono">Aguardando Prompt</span>
                </div>
              )}

              {imageUrl && (
                <>
                  <img src={imageUrl} alt="Generated" className="w-full h-full object-contain" />
                  <a 
                    href={imageUrl} 
                    download={`brum-ai-${Date.now()}.png`}
                    className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Download size={20} />
                  </a>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};