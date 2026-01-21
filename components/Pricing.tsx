import React from 'react';
import { Check, ShieldCheck, Zap, Server } from 'lucide-react';
import { Button } from './Button';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-black text-white mb-4">Planos de Implementação</h2>
          <p className="text-gray-400">Modelo "Chave na Mão". Você paga a instalação, o robô é seu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Plano Setup Promocional */}
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all flex flex-col hover:bg-black/80 group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <h3 className="text-2xl font-bold text-white mb-2">Pacote Inicial</h3>
            <p className="text-gray-500 mb-6 text-sm">Ideal para começar a atender automaticamente hoje.</p>
            <div className="text-3xl font-bold text-white mb-8">R$ 500<span className="text-sm font-normal text-gray-500">/instalação única</span></div>
            
            <div className="space-y-4 mb-8 flex-1">
               {["Robô de Atendimento WhatsApp", "Agendamento Automático", "Sem mensalidade de software", "Treinamento de uso rápido"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={16} className="text-gray-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
               ))}
            </div>
            <Button variant="outline" fullWidth className="border-white/30 text-white hover:bg-white hover:text-black hover:border-white">Quero Instalar Agora</Button>
          </div>

          {/* Plano Enterprise/Agency */}
          <div className="bg-gradient-to-b from-gray-900 to-black backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)] relative flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">
              Mais Completo
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              Sistema Completo <Server size={20} className="text-cyan-400" />
            </h3>
            <p className="text-gray-400 mb-6 text-sm">Para empresas que querem automação total.</p>
            
            <div className="text-4xl font-black text-white mb-8">Sob Consulta</div>

            <div className="space-y-4 mb-8 flex-1">
               {[
                 "Servidor Próprio (Seus dados seguros)",
                 "IA Avançada (Raciocínio Complexo)",
                 "Integração com sua Agenda/Sistema",
                 "Painel de Controle Exclusivo",
                 "Suporte Prioritário",
                 "Consultoria de Melhoria de Processos"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <div className="bg-white/10 rounded-full p-1">
                     <Check size={16} className="text-white" />
                   </div>
                   <span className="text-white font-medium">{item}</span>
                 </div>
               ))}
            </div>

            <Button fullWidth className="mb-4 animate-pulse bg-white text-black hover:bg-gray-200 border-none">
              SOLICITAR PROPOSTA
            </Button>
            
            <div className="text-center">
              <span className="text-xs text-gray-500">Satisfação garantida ou devolvemos a instalação.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};