import React from 'react';
import { Machine } from '../types';

interface MachineryCardProps {
  machine: Machine;
  onClick: () => void;
}

export const MachineryCard: React.FC<MachineryCardProps> = ({ machine, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={machine.image} 
          alt={machine.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {machine.featured && (
          <div className="absolute top-4 right-4 bg-[#EB8B1D] text-white px-3 py-1 rounded-full text-sm font-bold">
            Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#EB8B1D] transition-colors">{machine.name}</h3>
        <p className="text-[#BFBFBF] text-sm mb-3">{machine.category}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#EB8B1D]">${machine.dailyRate}</p>
            <p className="text-xs text-[#BFBFBF]">per day</p>
          </div>
          <button className="bg-[#EB8B1D] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#d67a15] transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};