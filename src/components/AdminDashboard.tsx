import React, { useState } from 'react';
import { BookingRequest } from '../types';

interface AdminDashboardProps {
  bookings: BookingRequest[];
  onUpdateStatus: (id: string, status: 'approved' | 'declined') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ bookings, onUpdateStatus }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('all');

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Hire Requests Dashboard</h2>
      
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'approved', 'declined'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize ${
              filter === status 
                ? 'bg-[#EB8B1D] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status} ({bookings.filter(b => status === 'all' || b.status === status).length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredBookings.map(booking => (
          <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-[#1A1A1A]">{booking.machineName}</h3>
                <p className="text-sm text-[#BFBFBF]">Ref: {booking.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {booking.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div><span className="font-semibold">Customer:</span> {booking.customerName}</div>
              <div><span className="font-semibold">Phone:</span> {booking.phone}</div>
              <div><span className="font-semibold">Email:</span> {booking.email}</div>
              <div><span className="font-semibold">Dates:</span> {booking.startDate} to {booking.endDate}</div>
              <div><span className="font-semibold">Total:</span> ${booking.totalCost}</div>
              <div><span className="font-semibold">Delivery:</span> {booking.deliveryOption}</div>
            </div>

            {booking.status === 'pending' && (
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => onUpdateStatus(booking.id, 'approved')}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  Approve
                </button>
                <button 
                  onClick={() => onUpdateStatus(booking.id, 'declined')}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
