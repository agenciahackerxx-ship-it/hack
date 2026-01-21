import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border";
  
  const variants = {
    // Estilo Chrome/White Glow
    primary: "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:bg-gray-100",
    // Estilo Dark Metal
    secondary: "bg-black text-white border-white/20 hover:bg-white/10 hover:border-white",
    // Estilo Wireframe Cyan
    outline: "bg-transparent border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};