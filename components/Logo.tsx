import React from 'react';
import { useApp } from '../context';

export const Logo = ({ darkText = true }: { darkText?: boolean; }) => {
  const { themeSettings } = useApp();
  const { logoUrl, layout } = themeSettings;
  const logoHeight = layout.logoHeight || 32;
    
    if (logoUrl) {
        return (
            <div style={{ height: `${logoHeight}px` }} className="flex items-center">
                <img src={logoUrl} alt="Techwally Logo" className="h-full w-auto object-contain" />
            </div>
        );
    }

  return (
    <div style={{ height: `${logoHeight}px` }} className="flex items-center gap-2.5">
      <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#007C7E"/>
            <stop offset="100%" stopColor="#004849"/>
          </linearGradient>
        </defs>
        <path d="M50 0L95.5 27.5V82.5L50 110L4.5 82.5V27.5L50 0Z" stroke="url(#logoGradient)" strokeWidth="8"/>
        <path d="M35 38H50V72" stroke="url(#logoGradient)" strokeWidth="9" strokeLinejoin="round"/>
        <path d="M50 38H65L57.5 55L65 72H50" stroke="url(#logoGradient)" strokeWidth="9" strokeLinejoin="round"/>
      </svg>
      <span className={`text-3xl font-bold tracking-tight ${darkText ? 'text-secondary' : 'text-white'}`}>
        Techwally
      </span>
    </div>
  );
};