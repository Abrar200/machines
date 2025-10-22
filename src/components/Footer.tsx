import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#1A1A1A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img 
              src="/footer.png" 
              alt="Elite Machine Hire" 
              className="h-16 w-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-[#EB8B1D] mb-4">Elite Machine Hire</h3>
            <p className="text-[#BFBFBF] text-sm">
              Supplying reliable machinery for projects big and small — across Adelaide & South Australia.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-[#BFBFBF]">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-[#EB8B1D] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#EB8B1D] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#EB8B1D] transition-colors">Contact</Link></li>
              <li><a href="#featured" className="hover:text-[#EB8B1D] transition-colors">Browse Equipment</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Equipment Categories</h4>
            <ul className="space-y-2 text-[#BFBFBF]">
              <li><a href="#categories" className="hover:text-[#EB8B1D] transition-colors">Heavy Machinery</a></li>
              <li><a href="#categories" className="hover:text-[#EB8B1D] transition-colors">Vibratory</a></li>
              <li><a href="#categories" className="hover:text-[#EB8B1D] transition-colors">Trench Roller</a></li>
              <li><a href="#categories" className="hover:text-[#EB8B1D] transition-colors">Garden Tractors</a></li>
              <li><a href="#categories" className="hover:text-[#EB8B1D] transition-colors">Chainsaw</a></li>
              <li><a href="#categories" className="hover:text-[#EB8B1D] transition-colors">Trailers</a></li>
              <li><a href="#categories" className="hover:text-[#EB8B1D] transition-colors">Wheel Dumper</a></li>
              <li><a href="#categories" className="hover:text-[#EB8B1D] transition-colors">Auger</a></li>
              <li><a href="#categories" className="hover:text-[#EB8B1D] transition-colors">Sweeper</a></li>
            </ul>

          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-[#BFBFBF] text-sm">
              <li>103 Globe Derby Drive</li>
              <li>Globe Derby, Adelaide, SA</li>
              <li className="pt-2"><a href="tel:0414236306" className="hover:text-[#EB8B1D] transition-colors">0414 236 306</a></li>
              <li>Mon–Fri: 7:00am–5:00pm</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-[#BFBFBF] text-sm">
          <p>
            © 2025 Elite Machine Hire. Powered by{' '}
            <a 
              href="https://nexadigital.com.au" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#EB8B1D] hover:text-[#FF9D2E] transition-colors font-medium"
            >
              Nexa Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};