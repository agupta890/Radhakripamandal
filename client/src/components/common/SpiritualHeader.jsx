import React from 'react';

const SpiritualHeader = ({ title, subtitle, breadcrumb }) => {
  return (
    <div className="relative bg-gradient-to-b from-maroon-950 via-maroon-900 to-maroon-950 text-white py-14 px-4 overflow-hidden border-b-4 border-gold-500">
      {/* Background Sacred Geometric / Mandala Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Radial soft glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-3">
        {breadcrumb && (
          <p className="text-gold-400 text-xs md:text-sm tracking-wider uppercase font-semibold">
            {breadcrumb}
          </p>
        )}
        <div className="inline-flex items-center justify-center gap-2 text-gold-300 text-xl font-serif">
          <span>❖</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-normal leading-snug md:leading-normal text-white font-spiritual py-1">
            {title}
          </h1>
          <span>❖</span>
        </div>
        {subtitle && (
          <p className="text-cream-200 max-w-2xl mx-auto text-sm md:text-base font-hindi font-light leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-2 rounded-full"></div>
      </div>
    </div>
  );
};

export default SpiritualHeader;
