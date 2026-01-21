import React, { useState, useRef } from 'react';
import { generateVideoWithVeo } from '../services/geminiService';
import { LoadingState } from '../types';
import { Video, Loader2, Upload, AlertCircle, Play, Film, Key } from 'lucide-react';
import { Button } from './Button';

export const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkApiKey = async (): Promise<boolean> => {
    const win = window as any;
    if (win.aistudio && win.aistudio.hasSelectedApiKey) {
      const hasKey = await win.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        if (win.aistudio.openSelectKey) {
          await win.aistudio.openSelectKey();
          // Assume success after dialog interaction or check again
          return true; 
        }
        return false;
      }
      return true;
    }
    // Fallback if not in the specific environment (dev/local) usually implies env key is set
    return true; 
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setErrorMsg('');
    setStatus(LoadingState.LOADING);
    setVideoUrl(null);

    try {
      // 1. Check API Key requirements for Veo
      const keyReady = await checkApiKey();
      if (!keyReady) {
        setStatus(LoadingState.IDLE);
        return; // User cancelled or failed to select key
      }

      // 2. Prepare Image Base64 (raw)
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      
      reader.onload = async () => {
        const base64Result = reader.result as string;
        // Split metadata "data:image/png;base64," from actual data
        const base64Data = base64Result.split(',')[1];
        
        try {
          const url = await generateVideoWithVeo(
            prompt || "Animate this image realistically", 
            base64Data, 
            selectedImage.type, 
            aspectRatio
          );
          setVideoUrl(url);
          setStatus(LoadingState.SUCCESS);
        } catch (err: any) {
          console.error(err);
          setErrorMsg(err.message || "Erro ao gerar vídeo. Verifique se sua chave tem acesso ao Veo.");
          setStatus(LoadingState.ERROR);
        }
      };
      
      reader.onerror = () => {
        setErrorMsg("Erro ao ler o arquivo de imagem.");
        setStatus(LoadingState.ERROR);
      };

    } catch (e) {
      setErrorMsg("Erro inesperado.");
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <section className="py-20 bg-black relative border-t border-white/10">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-4">
              <Film size={14} /> Veo 3.1 Fast
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-4">
              Animador de Imagens <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Veo</span>
            </h2>
            <p className="text-gray-400">Dê vida às suas imagens estáticas com Inteligência Artificial de vídeo.</p>
          </div>

          <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Controls Column */}
              <div className="space-y-6">
                
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${selectedImage ? 'border-purple-500/50 bg-purple-900/10' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                  {imagePreview ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold uppercase">Trocar Imagem</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="text-gray-500 mb-4" size={32} />
                      <span className="text-gray-400 text-sm font-medium">Clique para fazer upload</span>
                      <span className="text-gray-600 text-xs mt-1">PNG ou JPG</span>
                    </>
                  )}
                </div>

                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">Instrução de Movimento</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: Câmera orbitando o objeto, luzes piscando, fumaça subindo..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-purple-500/50 focus:outline-none transition-all resize-none h-24"
                  />
                </div>

                {/* Aspect Ratio Selector */}
                <div className="flex gap-4">
                   <button 
                     onClick={() => setAspectRatio('16:9')}
                     className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase transition-all ${aspectRatio === '16:9' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
                   >
                     Paisagem (16:9)
                   </button>
                   <button 
                     onClick={() => setAspectRatio('9:16')}
                     className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase transition-all ${aspectRatio === '9:16' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
                   >
                     Retrato (9:16)
                   </button>
                </div>

                <Button 
                  fullWidth 
                  onClick={handleGenerate}
                  disabled={status === LoadingState.LOADING || !selectedImage}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 border-none text-white hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  {status === LoadingState.LOADING ? (
                    <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Processando Vídeo...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Play size={18} fill="currentColor" /> Gerar Animação</span>
                  )}
                </Button>

                {status === LoadingState.ERROR && (
                  <div className="text-red-400 text-xs bg-red-900/20 p-3 rounded-lg border border-red-500/20 flex items-center gap-2">
                    <AlertCircle size={14} /> {errorMsg}
                  </div>
                )}
                
                <div className="text-[10px] text-gray-600 text-center flex items-center justify-center gap-1">
                  <Key size={10} /> Requer chave de API com faturamento ativo
                </div>

              </div>

              {/* Output Column */}
              <div className="bg-black/40 border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden min-h-[400px]">
                
                {status === LoadingState.LOADING && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 backdrop-blur-sm">
                    <Loader2 size={48} className="text-purple-500 animate-spin mb-4" />
                    <span className="text-purple-300 text-sm font-mono animate-pulse">Renderizando Frames...</span>
                    <span className="text-gray-600 text-xs mt-2 max-w-[200px] text-center">Isso pode levar cerca de 1 a 2 minutos.</span>
                  </div>
                )}

                {!videoUrl && status !== LoadingState.LOADING && (
                  <div className="text-center p-8 opacity-30">
                    <Film size={64} className="mx-auto mb-4" />
                    <p className="text-sm font-mono">O vídeo gerado aparecerá aqui</p>
                  </div>
                )}

                {videoUrl && (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                     <video 
                       src={videoUrl} 
                       controls 
                       autoPlay 
                       loop 
                       className={`max-w-full max-h-full ${aspectRatio === '9:16' ? 'h-full w-auto' : 'w-full h-auto'}`}
                     />
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};