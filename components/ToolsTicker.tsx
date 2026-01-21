import React from 'react';

const TOOLS = [
  "N8N WORKFLOW", "DOCKER", "EVOLUTION API", "GEMINI 1.5 PRO", "POSTGRESQL", "SUPABASE", "STRIPE", "TYPEBOT", "RABBITMQ", "REDIS"
];

export const ToolsTicker: React.FC = () => {
  return (
    <div className="w-full bg-black/60 backdrop-blur-sm py-6 border-y border-white/5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] items-center">
        {[...TOOLS, ...TOOLS, ...TOOLS].map((tool, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="text-2xl font-heading font-bold text-gray-500/50 hover:text-cyan-400 transition-colors cursor-default">
              {tool}
            </span>
            <div className="w-2 h-2 rounded-full bg-cyan-500/30 ml-8"></div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};