import React, { useState } from 'react';
import { Machine, BookingRequest } from '../types';

interface BookingModalProps {
  machine?: Machine;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ machine, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '', 
    company: '', 
    phone: '', 
    email: '', 
    jobSite: '',
    startDate: '', 
    endDate: '', 
    deliveryOption: 'delivery' as 'delivery' | 'pickup',
    extras: [] as string[], 
    notes: '', 
    termsAccepted: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    
    if (!machine) {
      alert('Please select a machine first');
      return;
    }

    const days = Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const dailyRate = machine.dailyRate || 0;
    const totalCost = dailyRate * days;

    onSubmit({
      machineId: machine.id,
      machineName: machine.name,
      customerName: formData.customerName,
      company: formData.company,
      phone: formData.phone,
      email: formData.email,
      jobSite: formData.jobSite,
      startDate: formData.startDate,
      endDate: formData.endDate,
      deliveryOption: formData.deliveryOption,
      extras: formData.extras,
      notes: formData.notes,
      totalCost
    });
    
    // Reset form
    setFormData({
      customerName: '', 
      company: '', 
      phone: '', 
      email: '', 
      jobSite: '',
      startDate: '', 
      endDate: '', 
      deliveryOption: 'delivery',
      extras: [], 
      notes: '', 
      termsAccepted: false
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full my-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Request Hire</h2>
          <button onClick={onClose} className="text-3xl text-gray-400 hover:text-[#EB8B1D]">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {machine && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">{machine.name}</p>
              <p className="text-sm text-gray-600">${machine.dailyRate}/day</p>
            </div>
          )}
          <input 
            type="text" 
            placeholder="Full Name *" 
            required 
            value={formData.customerName} 
            onChange={e => setFormData({...formData, customerName: e.target.value})} 
            className="w-full p-3 border rounded-lg" 
          />
          <input 
            type="text" 
            placeholder="Company" 
            value={formData.company} 
            onChange={e => setFormData({...formData, company: e.target.value})} 
            className="w-full p-3 border rounded-lg" 
          />
          <input 
            type="tel" 
            placeholder="Phone *" 
            required 
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})} 
            className="w-full p-3 border rounded-lg" 
          />
          <input 
            type="email" 
            placeholder="Email *" 
            required 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            className="w-full p-3 border rounded-lg" 
          />
          <input 
            type="text" 
            placeholder="Job Site Address *" 
            required 
            value={formData.jobSite} 
            onChange={e => setFormData({...formData, jobSite: e.target.value})} 
            className="w-full p-3 border rounded-lg" 
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date *</label>
              <input 
                type="date" 
                required 
                value={formData.startDate} 
                onChange={e => setFormData({...formData, startDate: e.target.value})} 
                className="w-full p-3 border rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date *</label>
              <input 
                type="date" 
                required 
                value={formData.endDate} 
                onChange={e => setFormData({...formData, endDate: e.target.value})} 
                className="w-full p-3 border rounded-lg" 
              />
            </div>
          </div>
          <textarea 
            placeholder="Notes" 
            value={formData.notes} 
            onChange={e => setFormData({...formData, notes: e.target.value})} 
            className="w-full p-3 border rounded-lg h-24"
          ></textarea>
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={formData.termsAccepted} 
              onChange={e => setFormData({...formData, termsAccepted: e.target.checked})} 
              className="w-4 h-4" 
            />
            <span className="text-sm">I agree to the Hire Terms & Conditions</span>
          </label>
          <button 
            type="submit" 
            className="w-full bg-[#EB8B1D] text-white py-3 rounded-lg font-bold hover:bg-[#d67a15]"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};