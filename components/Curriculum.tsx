import React from 'react';
import { MODULES } from '../constants';
import * as LucideIcons from 'lucide-react';

export const Curriculum: React.FC = () => {
  return (
    <section className="py-20 relative bg-transparent animate-in slide-in-from-bottom-10 duration-700">
      {/* Background Decorative Elements - Silver/Gray */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 pt-10">
          <div className="inline-block px-4 py-1 rounded-full border border-white/20 bg-white/5 mb-6 backdrop-blur-md">
              <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">Nossos Produtos</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight text-white">
            O Que <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Entregamos</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto drop-shadow-md font-light">
            Soluções validadas para resolver problemas reais: falta de tempo, perda de clientes e erros de atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MODULES.map((module, idx) => {
            const IconComponent = (LucideIcons as any)[module.icon] || LucideIcons.Zap;
            
            return (
              <div key={idx} className="group relative bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl overflow-hidden hover:bg-black/80 transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                {/* Hover Glow Effect - White/Cyan */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center mb-8 group-hover:border-cyan-500/30 group-hover:bg-cyan-900/10 transition-colors">
                    <IconComponent size={32} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-all">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed text-sm font-light group-hover:text-gray-300 transition-colors">
                    {module.description}
                  </p>
                </div>

                {/* Background Pattern - Subtle */}
                <div className="absolute -bottom-10 -right-10 text-white/5 transform rotate-12 scale-150 group-hover:rotate-0 transition-transform duration-700 opacity-50">
                  <IconComponent size={150} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};