import React from 'react';

interface HeroSectionProps {
  onBrowseClick: () => void;
  onHireClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBrowseClick, onHireClick }) => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center bg-[#1A1A1A] overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:object-center object-[center_20%]"
      >
        <source src="/elite.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
          Heavy Machinery <span className="text-[#EB8B1D]">Hire</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 font-light max-w-3xl mx-auto">
          Premium equipment delivered fast across Adelaide
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <button 
            onClick={onBrowseClick}
            className="bg-[#EB8B1D] text-[#1A1A1A] px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-[#d67a15] transition-all transform hover:scale-105"
          >
            Browse Machinery
          </button>
          <button 
            onClick={onHireClick}
            className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-white hover:text-[#1A1A1A] transition-all"
          >
            Request a Hire
          </button>
        </div>
      </div>
    </section>
  );
};