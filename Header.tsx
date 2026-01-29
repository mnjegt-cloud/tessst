
import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

interface HeaderProps {
  onAboutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAboutClick }) => {
  return (
    <header className="relative flex flex-col items-center pt-12 pb-16 px-6 overflow-hidden">
      {/* Premium subtle glow background */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-white/[0.02] blur-[120px] rounded-full -z-10" />

      <nav className="w-full max-w-6xl flex justify-between items-center fixed top-0 left-1/2 -translate-x-1/2 z-[80] py-6 px-8 pointer-events-none">
        <button 
          onClick={onAboutClick}
          className="pointer-events-auto bg-zinc-900/60 hover:bg-zinc-800 text-white px-6 py-2.5 rounded-full text-xs font-bold border border-white/5 backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
        >
          Our Story
        </button>
        <div className="flex gap-3 pointer-events-auto">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="w-10 h-10 flex items-center justify-center bg-zinc-900/60 border border-white/5 rounded-full backdrop-blur-xl hover:bg-zinc-800 transition-all">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" className="w-4 h-4 invert" alt="WhatsApp" />
          </a>
          <a href="https://instagram.com/laserart.lb" target="_blank" className="w-10 h-10 flex items-center justify-center bg-zinc-900/60 border border-white/5 rounded-full backdrop-blur-xl hover:bg-zinc-800 transition-all">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" className="w-4 h-4 invert" alt="Instagram" />
          </a>
        </div>
      </nav>

      <div className="mt-8 flex flex-col items-center animate-reveal">
        <div className="group relative w-28 h-28 mb-8">
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-3xl group-hover:bg-white/40 transition-all duration-700" />
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden ring-1 ring-white/20 shadow-2xl bg-black">
            <img src="logo.webp" alt="Laser Art LB" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-center leading-none">
          <span className="bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent">
            LASER ART LB
          </span>
        </h1>
        
        <div className="mt-8 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase">Lebanon</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="text-zinc-200 text-xs font-bold uppercase tracking-tight">Delivery $4 • Pay on Arrival</span>
        </div>
      </div>
    </header>
  );
};
