import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger', isLoading?: boolean }> = 
  ({ children, variant = 'primary', className = '', isLoading, disabled, ...props }) => {
  
  const baseStyle = "px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gold-500 hover:bg-gold-600 text-royal-900 shadow-md",
    secondary: "bg-royal-800 hover:bg-royal-700 text-gold-100 shadow-md",
    outline: "border-2 border-royal-800 text-royal-800 hover:bg-royal-800 hover:text-gold-100",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  return (
    <button 
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input 
      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-royal-800 focus:border-transparent ${className}`}
      {...props}
    />
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode, color?: 'green' | 'red' | 'yellow' | 'gray' }> = ({ children, color = 'gray' }) => {
  const colors = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  );
};

export const SectionTitle: React.FC<{ title: string, subtitle?: string, center?: boolean }> = ({ title, subtitle, center }) => (
  <div className={`mb-10 ${center ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal-800 mb-2 relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold-400 rounded-full opacity-60"></span>
    </h2>
    {subtitle && <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);