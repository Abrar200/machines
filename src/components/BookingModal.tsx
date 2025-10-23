import React, { useState, useEffect } from 'react';
import { Machine, BookingRequest } from '../types';
import { AlertCircle } from 'lucide-react';

interface BookingModalProps {
  machine?: Machine;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => void;
  bookedDates: string[];
}

export const BookingModal: React.FC<BookingModalProps> = ({ machine, isOpen, onClose, onSubmit, bookedDates }) => {
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

  const [dateError, setDateError] = useState('');

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
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
      setDateError('');
    }
  }, [isOpen]);

  useEffect(() => {
    // Validate dates whenever they change
    if (formData.startDate && formData.endDate) {
      validateDates(formData.startDate, formData.endDate);
    } else {
      setDateError('');
    }
  }, [formData.startDate, formData.endDate, bookedDates]);

  const validateDates = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const todayDate = new Date(today);

    if (startDate < todayDate) {
      setDateError('Start date cannot be in the past');
      return false;
    }

    if (endDate < startDate) {
      setDateError('End date must be after start date');
      return false;
    }

    // Check for conflicts with booked dates
    const requestedDates: string[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      requestedDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const hasConflict = requestedDates.some(date => bookedDates.includes(date));
    if (hasConflict) {
      setDateError('Machine is already booked for some of the selected dates');
      return false;
    }

    setDateError('');
    return true;
  };

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

    if (dateError) {
      alert('Please fix date selection errors');
      return;
    }

    if (!validateDates(formData.startDate, formData.endDate)) {
      return;
    }

    const days = Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
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
    
    onClose();
  };

  const isDateBooked = (dateString: string) => {
    return bookedDates.includes(dateString);
  };

  const calculateTotalCost = () => {
    if (!formData.startDate || !formData.endDate || !machine) return 0;
    const days = Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return (machine.dailyRate || 0) * days;
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full my-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A]">
          <div>
            <h2 className="text-2xl font-bold text-white">Request Hire</h2>
            <p className="text-gray-300 text-sm mt-1">Elite Machine Hire</p>
          </div>
          <button onClick={onClose} className="text-3xl text-white hover:text-[#EB8B1D] transition-colors">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {machine && (
            <div className="bg-gradient-to-r from-[#EB8B1D] to-[#FF9D2E] p-4 rounded-lg text-white">
              <p className="font-semibold text-lg">{machine.name}</p>
              <p className="text-sm opacity-90">${machine.dailyRate}/day • ${machine.weeklyRate}/week</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Full Name *" 
              required 
              value={formData.customerName} 
              onChange={e => setFormData({...formData, customerName: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB8B1D] focus:border-transparent transition-all" 
            />
            <input 
              type="text" 
              placeholder="Company" 
              value={formData.company} 
              onChange={e => setFormData({...formData, company: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB8B1D] focus:border-transparent transition-all" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="tel" 
              placeholder="Phone *" 
              required 
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB8B1D] focus:border-transparent transition-all" 
            />
            <input 
              type="email" 
              placeholder="Email *" 
              required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB8B1D] focus:border-transparent transition-all" 
            />
          </div>

          <input 
            type="text" 
            placeholder="Job Site Address *" 
            required 
            value={formData.jobSite} 
            onChange={e => setFormData({...formData, jobSite: e.target.value})} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EB8B1D] focus:border-transparent transition-all" 
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Start Date *</label>
              <input 
                type="date" 
                required 
                min={today}
                value={formData.startDate} 
                onChange={e => setFormData({...formData, startDate: e.target.value})} 
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EB8B1D] focus:border-transparent transition-all ${
                  dateError && formData.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">End Date *</label>
              <input 
                type="date" 
                required 
                min={formData.startDate || today}
                value={formData.endDate} 
                onChange={e => setFormData({...formData, endDate: e.target.value})} 
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EB8B1D] focus:border-transparent transition-all ${
                  dateError && formData.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
          </div>

          {dateError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{dateError}</p>
            </div>
          )}

          {bookedDates.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm font-medium mb-2">⚠️ Already Booked Dates for this Machine:</p>
              <div className="flex flex-wrap gap-2">
                {bookedDates.slice(0, 10).map((date, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                    {new Date(date).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}
                  </span>
                ))}
                {bookedDates.length > 10 && (
                  <span className="text-yellow-700 text-xs self-center">+{bookedDates.length - 10} more</span>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Delivery Option</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, deliveryOption: 'delivery'})}
                className={`p-3 border rounded-lg font-medium transition-all ${
                  formData.deliveryOption === 'delivery'
                    ? 'border-[#EB8B1D] bg-[#EB8B1D] text-white'
                    : 'border-gray-300 hover:border-[#EB8B1D]'
                }`}
              >
                🚚 Delivery
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, deliveryOption: 'pickup'})}
                className={`p-3 border rounded-lg font-medium transition-all ${
                  formData.deliveryOption === 'pickup'
                    ? 'border-[#EB8B1D] bg-[#EB8B1D] text-white'
                    : 'border-gray-300 hover:border-[#EB8B1D]'
                }`}
              >
                🏢 Pickup
              </button>
            </div>
          </div>

          <textarea 
            placeholder="Additional Notes (optional)" 
            value={formData.notes} 
            onChange={e => setFormData({...formData, notes: e.target.value})} 
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-[#EB8B1D] focus:border-transparent transition-all resize-none"
          ></textarea>

          {formData.startDate && formData.endDate && !dateError && (
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-[#EB8B1D]">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Estimated Total:</span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-[#EB8B1D]">${calculateTotalCost().toFixed(2)}</span>
                  <p className="text-sm text-gray-600">
                    {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s)
                  </p>
                </div>
              </div>
            </div>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.termsAccepted} 
              onChange={e => setFormData({...formData, termsAccepted: e.target.checked})} 
              className="w-5 h-5 mt-0.5 text-[#EB8B1D] border-gray-300 rounded focus:ring-[#EB8B1D]" 
            />
            <span className="text-sm text-gray-700">
              I agree to the Hire Terms & Conditions. I understand that this is a hire request and final confirmation will be provided by Elite Machine Hire.
            </span>
          </label>

          <button 
            type="submit" 
            disabled={!!dateError || !formData.termsAccepted}
            className="w-full bg-[#EB8B1D] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d67a15] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Submit Request
          </button>

          <p className="text-center text-xs text-gray-500">
            By submitting this request, we'll send you a confirmation email and contact you within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
};