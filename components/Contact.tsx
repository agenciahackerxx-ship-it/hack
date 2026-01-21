import React, { useState } from 'react';
import { Send, AlertTriangle, CheckCircle2, Lock, ArrowRight, Activity, CalendarClock, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { FAQ_ITEMS } from '../constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessModel: '',
    bottleneck: ''
  });

  const handleAuditRequest = () => {
    // -------------------------------------------------------
    // CONFIGURAÇÃO: NÚMERO DE WHATSAPP
    // Substitua pelo seu número real no formato internacional (55 + DDD + Número)
    // -------------------------------------------------------
    const DESTINATION_NUMBER = "5551999625865"; 
    // -------------------------------------------------------

    const message = `*HACK.ER AGENCY - NOVO CLIENTE* 🚀\n\n` +
      `👤 *Nome:* ${formData.name || 'Não informado'}\n` +
      `📱 *WhatsApp:* ${formData.phone || 'Não informado'}\n` +
      `🏢 *Setor:* ${formData.businessModel || 'Não selecionado'}\n` +
      `⚠️ *Gargalo:* ${formData.bottleneck || 'Não detalhado'}\n\n` +
      `Tenho interesse na entrega do site em 24h e gostaria do diagnóstico gratuito.`;

    const url = `https://wa.me/${DESTINATION_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="pt-32 pb-20 relative overflow-hidden bg-black animate-in fade-in duration-700">
      
      {/* VIDEO BACKGROUND LAYER */}
      <div className="absolute inset-0 w-full h-full z-0">
         {/* Overlay Escuro para Contraste */}
         <div className="absolute inset-0 bg-black/85 z-10"></div>
         
         {/* Vídeo de Rede/Conexão Abstrata */}
         <video 
           src="https://videos.pexels.com/video-files/3129540/3129540-hd_1920_1080_25fps.mp4" 
           className="w-full h-full object-cover opacity-40 grayscale"
           autoPlay 
           loop 
           muted 
           playsInline 
         />
      </div>

      {/* Background Grid & Glow (Texture Overlay) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none z-10"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[128px] pointer-events-none z-10"></div>

      <div className="container mx-auto px-4 relative z-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-6 animate-pulse backdrop-blur-md">
            <AlertTriangle size={12} />
            Últimas vagas para consultoria gratuita
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 text-white tracking-tight drop-shadow-lg">
            Seu Site Profissional <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Entregue em 24 Horas</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Não é apenas um site. É um <strong>Diagnóstico Completo de Automação</strong>. Mapeamos quanto sua empresa pode crescer com a infraestrutura digital certa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto mb-24 items-start">
          
          {/* Left Column: The Offer & Value Stack */}
          <div className="lg:col-span-5 space-y-8">
             
             {/* Value Card */}
             <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                   <Activity size={100} className="text-cyan-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">O que você recebe na Call:</h3>
                <p className="text-sm text-gray-500 mb-6">Diagnóstico avaliado em R$ 997, gratuito por tempo limitado.</p>
                
                <ul className="space-y-4">
                  {[
                    "Análise Oculta do seu atendimento atual",
                    "Cálculo de ROI (Retorno sobre Investimento)",
                    "Demonstração ao vivo do Robô no seu nicho",
                    "Plano de Entrega Expressa (24h)",
                    "Estratégia para recuperar leads antigos"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 size={18} className="text-cyan-400 mt-1 shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
             </div>

             {/* Social Proof Mini */}
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex items-center gap-4">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs text-white">
                        <img src={`https://randomuser.me/api/portraits/men/${i+20}.jpg`} className="w-full h-full rounded-full grayscale opacity-70" alt="Client" />
                     </div>
                   ))}
                </div>
                <div>
                   <p className="text-white font-bold text-sm">+150 Sites</p>
                   <p className="text-gray-500 text-xs">Entregues este ano</p>
                </div>
             </div>

          </div>

          {/* Right Column: The "Terminal" Form */}
          <div className="lg:col-span-7">
             <div className="bg-black/80 backdrop-blur-xl border border-white/15 p-1 rounded-3xl shadow-2xl relative">
                {/* Decorative Top Bar */}
                <div className="bg-[#111] rounded-t-[20px] px-6 py-3 border-b border-white/10 flex items-center justify-between">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                   </div>
                   <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase">
                      <Lock size={10} /> Conexão Criptografada
                   </div>
                </div>

                <div className="p-6 md:p-8 bg-gradient-to-b from-[#050505] to-black rounded-b-[20px]">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-cyan-400">>></span> Solicitar Site em 24h
                  </h3>

                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2 group">
                        <label className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">Nome do Responsável</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:border-cyan-500/50 focus:bg-cyan-900/5 focus:outline-none transition-all placeholder-gray-700 font-light" 
                          placeholder="Ex: João Silva" 
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">WhatsApp Corporativo</label>
                        <input 
                          type="text" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:border-cyan-500/50 focus:bg-cyan-900/5 focus:outline-none transition-all placeholder-gray-700 font-light" 
                          placeholder="(00) 00000-0000" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">Modelo de Negócio</label>
                      <select 
                        value={formData.businessModel}
                        onChange={(e) => setFormData({...formData, businessModel: e.target.value})}
                        className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:border-cyan-500/50 focus:bg-cyan-900/5 focus:outline-none transition-all font-light appearance-none"
                      >
                        <option value="" disabled>Selecione seu setor...</option>
                        <option className="bg-black">Imobiliária / Corretor</option>
                        <option className="bg-black">Clínica / Saúde</option>
                        <option className="bg-black">Advocacia / Escritório</option>
                        <option className="bg-black">Delivery / Restaurante</option>
                        <option className="bg-black">E-commerce / Varejo</option>
                        <option className="bg-black">Outros</option>
                      </select>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">Desafio Atual</label>
                      <textarea 
                        value={formData.bottleneck}
                        onChange={(e) => setFormData({...formData, bottleneck: e.target.value})}
                        className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:border-cyan-500/50 focus:bg-cyan-900/5 focus:outline-none transition-all placeholder-gray-700 font-light h-32 resize-none" 
                        placeholder="Ex: Preciso de um site rápido para lançar minha campanha..."
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <Button 
                        fullWidth 
                        type="button"
                        onClick={handleAuditRequest}
                        className="group relative overflow-hidden bg-white text-black hover:bg-cyan-400 border-none h-14"
                      >
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                         <span className="relative z-10 flex items-center justify-center gap-2 text-base font-bold uppercase tracking-wide">
                           Chamar no WhatsApp <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                         </span>
                      </Button>
                      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                         <CalendarClock size={12} />
                         <span>Atendimento 24h: <span className="text-white font-mono">Disponível Agora</span></span>
                      </div>
                    </div>
                  </form>
                </div>
             </div>
          </div>

        </div>

        {/* FAQ Area - Styled as System Logs */}
        <div className="max-w-3xl mx-auto border-t border-white/10 pt-16 relative">
           <div className="flex items-center gap-3 mb-8 justify-center">
             <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
             <h3 className="text-xl font-bold text-white font-mono uppercase tracking-widest shadow-black drop-shadow-md">System FAQ</h3>
             <div className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
           </div>
           
           <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <details key={idx} className="group bg-[#0A0A0A]/90 backdrop-blur-md border border-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/30 open:border-cyan-500/30 open:bg-black">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
                  <span className="font-medium text-gray-300 group-hover:text-white transition-colors flex items-center gap-3">
                    <span className="text-cyan-500/50 font-mono text-xs">0{idx + 1}</span>
                    {item.question}
                  </span>
                  <ChevronDown className="transform group-open:rotate-180 transition-transform text-gray-500 group-hover:text-cyan-400 w-4 h-4" />
                </summary>
                <div className="px-5 pb-5 pl-12 text-gray-400 text-sm leading-relaxed border-t border-dashed border-white/5 pt-4 animate-in slide-in-from-top-2">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};