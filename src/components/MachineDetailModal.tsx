import React from 'react';
import { Machine } from '../types';

interface MachineDetailModalProps {
  machine: Machine | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({ machine, isOpen, onClose, onBookNow }) => {
  if (!isOpen || !machine) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A]">{machine.name}</h2>
          <button onClick={onClose} className="text-4xl text-gray-400 hover:text-[#EB8B1D]">&times;</button>
        </div>
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <img src={machine.image} alt={machine.name} className="w-full h-80 object-cover rounded-lg" />
          
          <div>
            <h3 className="text-xl font-bold mb-3 text-[#1A1A1A]">Specifications</h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(machine.specs).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-semibold text-[#1A1A1A]">{key}</td>
                      <td className="p-3 text-[#BFBFBF]">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 text-[#1A1A1A]">Hire Rates</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-[#EB8B1D]">${(machine as any).dailyRate || (machine as any).rates?.day || 0}</p>
                <p className="text-sm text-[#BFBFBF] mt-1">Per Day</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-[#EB8B1D]">${(machine as any).monthlyRate || (machine as any).rates?.weekend || 0}</p>
                <p className="text-sm text-[#BFBFBF] mt-1">Monthly</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-[#EB8B1D]">${(machine as any).weeklyRate || (machine as any).rates?.week || 0}</p>
                <p className="text-sm text-[#BFBFBF] mt-1">Per Week</p>
              </div>
            </div>
            {(machine as any).trailerIncluded && (
              <p className="mt-3 text-green-600 font-semibold">✓ Trailer Included</p>
            )}
          </div>


          <button 
            onClick={onBookNow}
            className="w-full bg-[#EB8B1D] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d67a15] transition-colors"
          >
            Select Dates & Hire
          </button>
        </div>
      </div>
    </div>
  );
};
