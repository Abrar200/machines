import React, { useState, useEffect } from 'react';
import { BookingRequest } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { Calendar, Clock, DollarSign, MapPin, Phone, Mail, User, Building2, Package, X } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('all');
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);

  useEffect(() => {
    fetchBookings();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('bookings_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchBookings();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedData = (data || []).map((item: any) => ({
        id: item.id,
        machineId: item.machine_id,
        machineName: item.machine_name,
        customerName: item.customer_name,
        company: item.company,
        phone: item.phone,
        email: item.email,
        jobSite: item.job_site,
        startDate: item.start_date,
        endDate: item.end_date,
        deliveryOption: item.delivery_option,
        extras: item.extras,
        notes: item.notes,
        status: item.status,
        totalCost: item.total_cost,
        createdAt: item.created_at
      }));

      setBookings(transformedData);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'approved' | 'declined') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Booking ${status}!`);
      fetchBookings();
      setSelectedBooking(null);
    } catch (error: any) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const stats = {
    pending: bookings.filter(b => b.status === 'pending').length,
    approved: bookings.filter(b => b.status === 'approved').length,
    declined: bookings.filter(b => b.status === 'declined').length,
    total: bookings.length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#EB8B1D] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Elite Machine Hire Bookings</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-[#EB8B1D] font-semibold transition-colors"
            >
              Logout →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{stats.total}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.approved}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Declined</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{stats.declined}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'approved', 'declined'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                  filter === status 
                    ? 'bg-[#EB8B1D] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status} ({status === 'all' ? stats.total : stats[status]})
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.length === 0 ? (
            <div className="col-span-2 text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 text-lg">No {filter !== 'all' ? filter : ''} bookings found</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div 
                key={booking.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedBooking(booking)}
              >
                {/* Booking Header */}
                <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold text-lg">{booking.machineName}</h3>
                      <p className="text-gray-300 text-sm mt-1">#{booking.id.substring(0, 8).toUpperCase()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="w-4 h-4 text-[#EB8B1D]" />
                    <span className="font-medium">{booking.customerName}</span>
                  </div>

                  {booking.company && (
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Building2 className="w-4 h-4 text-[#EB8B1D]" />
                      <span>{booking.company}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 text-[#EB8B1D]" />
                    <span>
                      {new Date(booking.startDate).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })} → {new Date(booking.endDate).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 text-[#EB8B1D]" />
                    <span className="truncate">{booking.jobSite}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Total Cost</span>
                    <span className="text-2xl font-bold text-[#EB8B1D]">${booking.totalCost}</span>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateStatus(booking.id, 'approved');
                        }}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        ✓ Approve
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateStatus(booking.id, 'declined');
                        }}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        ✕ Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-6 sticky top-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-white text-2xl font-bold">{selectedBooking.machineName}</h2>
                  <p className="text-gray-300 mt-1">Booking #{selectedBooking.id.substring(0, 8).toUpperCase()}</p>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="text-white hover:text-[#EB8B1D] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-center">
                <span className={`px-6 py-2 rounded-full font-bold ${
                  selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedBooking.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedBooking.status.toUpperCase()}
                </span>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-3 text-[#1A1A1A]">Customer Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#EB8B1D]" />
                    <span className="font-medium">{selectedBooking.customerName}</span>
                  </div>
                  {selectedBooking.company && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#EB8B1D]" />
                      <span>{selectedBooking.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#EB8B1D]" />
                    <a href={`tel:${selectedBooking.phone}`} className="text-[#EB8B1D] hover:underline">{selectedBooking.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#EB8B1D]" />
                    <a href={`mailto:${selectedBooking.email}`} className="text-[#EB8B1D] hover:underline">{selectedBooking.email}</a>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-3 text-[#1A1A1A]">Booking Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold">{new Date(selectedBooking.startDate).toLocaleDateString('en-AU', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-semibold">{new Date(selectedBooking.endDate).toLocaleDateString('en-AU', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{Math.ceil((new Date(selectedBooking.endDate).getTime() - new Date(selectedBooking.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Site:</span>
                    <span className="font-semibold text-right">{selectedBooking.jobSite}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-semibold capitalize">{selectedBooking.deliveryOption}</span>
                  </div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-2 text-[#1A1A1A]">Additional Notes</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedBooking.notes}</p>
                </div>
              )}

              {/* Total Cost */}
              <div className="bg-gradient-to-r from-[#EB8B1D] to-[#FF9D2E] rounded-xl p-6 text-center text-white">
                <p className="text-sm opacity-90 mb-1">Estimated Total</p>
                <p className="text-4xl font-bold">${selectedBooking.totalCost.toFixed(2)}</p>
              </div>

              {/* Actions */}
              {selectedBooking.status === 'pending' && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleUpdateStatus(selectedBooking.id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                  >
                    ✓ Approve Booking
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedBooking.id, 'declined')}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                  >
                    ✕ Decline Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};