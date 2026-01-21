import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const FEEDBACKS = [
  {
    name: "Ricardo Mendes",
    role: "Diretor Comercial - Mendes Imóveis",
    content: "Cara, sério... o bot agendou 3 visitas pra amanhã enquanto eu tava em reunião externa. A qualificação dos leads é outro nível, só chega no meu WhatsApp quem realmente tem interesse e orçamento. Economizou horas do meu time.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Dra. Paula Souza",
    role: "Proprietária - OdontoCenter",
    content: "Antes minha secretária ficava o dia todo no telefone confirmando agenda. Agora o sistema faz tudo automático pelo Zap. O número de pacientes que faltavam sem avisar caiu drasticamente. Recomendo demais!",
    stars: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Carlos Ferreira",
    role: "Fundador - Burger Kingu",
    content: "A gente sofria muito com pedido errado em noite de movimento. O atendente virtual não erra uma. Pega o pedido, calcula a taxa de entrega e já manda impresso pra cozinha. Aumentou nosso faturamento em 30% só por não perder venda na demora.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Fernanda Lima",
    role: "CEO - Modas Lima",
    content: "Eu perdia muita venda pq demorava pra responder direct e zap. Coloquei o sistema pra rodar e acordei com 2 vendas feitas as 3 da manhã. É bizarro de bom, parece que tem um funcionário trabalhando 24h sem reclamar.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Dr. Roberto Alves",
    role: "Sócio - H3 Advogados",
    content: "A Hack.er foi super ágil. Configuraram o servidor próprio pra gente, então os dados dos clientes ficam seguros, o que é crucial pro jurídico. A IA responde de forma muito formal e precisa, impressionou os sócios.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Júlia Tech",
    role: "CTO - StartGrowth",
    content: "Implementei na minha operação de SaaS e o suporte N1 foi praticamente zerado. A IA resolve 80% das dúvidas simples e só passa pra humano o que é bucha. O ROI veio no primeiro mês só com a economia de equipe.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/20 text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
            <CheckCircle size={14} className="text-cyan-400" /> Resultados Reais
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
            Quem Usa, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-cyan-200">Aprova</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEEDBACKS.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 relative backdrop-blur-sm flex flex-col"
            >
              <Quote className="absolute top-6 right-6 text-white/5 group-hover:text-cyan-500/20 transition-colors" size={40} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} size={14} className="fill-cyan-400 text-cyan-400" />
                ))}
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed font-light text-sm flex-grow italic">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 rounded-full border-2 border-white/10 object-cover group-hover:border-cyan-400/50 transition-colors"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};