import React, { useState } from 'react';
import { generateCinematicPrompt } from '../services/geminiService';
import { PromptResult, LoadingState } from '../types';
import { Sparkles, Copy, Loader2, AlertCircle, Terminal, Bot } from 'lucide-react';

export const ScriptGenerator: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState<PromptResult | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setStatus(LoadingState.LOADING);
    setResult(null);
    try {
      // Reutilizando o serviço existente para demonstração, mas com contexto visual diferente
      const data = await generateCinematicPrompt(idea);
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      setStatus(LoadingState.ERROR);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col items-center text-center mb-16">
            <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-cyan-500/30 backdrop-blur-md rounded-full px-6 py-2 mb-6">
              <span className="text-cyan-300 text-sm font-mono tracking-widest uppercase flex items-center gap-2">
                <Bot size={14} className="animate-bounce" /> Live Tech Demo
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">
              Teste Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Inteligência</span>
            </h2>
            <p className="text-gray-400 max-w-lg">
              Veja como nossa IA processa linguagem natural e estrutura dados complexos em segundos. Digite um cenário abaixo:
            </p>
          </div>

          <div className="bg-[#0A0A0F] border border-white/10 rounded-3xl p-2 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/5 to-transparent rounded-3xl pointer-events-none"></div>
            
            <div className="bg-[#0f0f16] rounded-2xl p-6 md:p-10 border border-white/5">
                <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs font-mono uppercase tracking-widest">
                  <Terminal size={14} />
                  <span>Agent Input Console</span>
                </div>

                <div className="relative mb-8 group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-50 blur transition duration-500"></div>
                  <div className="relative flex bg-black rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                    <input 
                      type="text" 
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Descreva um processo (ex: Quero um bot que agende reuniões)..."
                      className="w-full bg-transparent p-6 text-white text-lg placeholder-gray-600 focus:outline-none font-mono"
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button 
                      onClick={handleGenerate}
                      disabled={status === LoadingState.LOADING || !idea.trim()}
                      className="px-8 bg-white text-black font-bold hover:bg-cyan-400 hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
                    >
                      {status === LoadingState.LOADING ? <Loader2 className="animate-spin" /> : <Sparkles />}
                    </button>
                  </div>
                </div>

                {/* Results Display */}
                {status === LoadingState.ERROR && (
                  <div className="p-4 bg-red-900/10 border border-red-500/20 text-red-400 rounded-lg flex gap-3 text-sm">
                    <AlertCircle size={16} /> Erro de conexão com o Agente.
                  </div>
                )}

                {result && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="md:col-span-2 space-y-4">
                      <div className="bg-[#12121a] p-6 rounded-xl border border-cyan-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => copyToClipboard(result.prompt)} className="text-gray-400 hover:text-white">
                            <Copy size={16} />
                          </button>
                        </div>
                        <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2 block">Output Processado</span>
                        <p className="text-gray-300 font-mono text-sm leading-7 selection:bg-cyan-500/30">
                          {result.prompt}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-[#12121a] p-5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider mb-2 block">Restrições Identificadas</span>
                        <p className="text-gray-500 font-mono text-xs leading-5">{result.negativePrompt}</p>
                      </div>
                      <div className="bg-[#12121a] p-5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-2 block">Parâmetros Técnicos</span>
                        <p className="text-gray-500 font-mono text-xs leading-5">{result.settings}</p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};