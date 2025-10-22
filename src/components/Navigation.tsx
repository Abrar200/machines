import React, { useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

interface NavigationProps {
  onAdminClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1A1A1A] text-white py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#EB8B1D]" />
                <a href="tel:0414236306" className="hover:text-[#EB8B1D] transition-colors">0414 236 306</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#EB8B1D]" />
                <span>info@elitemachinehire.com.au</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#EB8B1D]" />
              <span>Mon–Fri: 7:00am–5:00pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b-4 border-[#EB8B1D]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/685afce20bfda24fc0f1d36c_1761146694117_7e8c0118.png" 
                alt="Elite Machine Hire" 
                className="h-16 w-auto cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('categories')} className="text-[#1A1A1A] hover:text-[#EB8B1D] font-bold text-lg transition-colors">
                Browse Equipment
              </button>
              <button onClick={() => scrollToSection('featured')} className="text-[#1A1A1A] hover:text-[#EB8B1D] font-bold text-lg transition-colors">
                Featured Machines
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-[#1A1A1A] hover:text-[#EB8B1D] font-bold text-lg transition-colors">
                Contact Us
              </button>
              <button onClick={onAdminClick} className="text-[#BFBFBF] hover:text-[#EB8B1D] font-semibold transition-colors">
                Admin
              </button>
              <button 
                onClick={() => scrollToSection('featured')}
                className="bg-[#EB8B1D] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#d67a15] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Request a Hire
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#1A1A1A]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden pb-4 space-y-2 border-t border-gray-200 pt-4">
              <button onClick={() => scrollToSection('categories')} className="block w-full text-left px-4 py-3 text-[#1A1A1A] hover:bg-gray-100 font-semibold">Browse Equipment</button>
              <button onClick={() => scrollToSection('featured')} className="block w-full text-left px-4 py-3 text-[#1A1A1A] hover:bg-gray-100 font-semibold">Featured Machines</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-3 text-[#1A1A1A] hover:bg-gray-100 font-semibold">Contact Us</button>
              <button onClick={onAdminClick} className="block w-full text-left px-4 py-3 text-[#BFBFBF] hover:bg-gray-100 font-semibold">Admin</button>
              <button onClick={() => scrollToSection('featured')} className="block w-full text-left px-4 py-3 bg-[#EB8B1D] text-white rounded-lg font-bold mt-2">Request a Hire</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
