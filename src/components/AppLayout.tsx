import React, { useState, useRef, useEffect } from 'react';
import { Navigation } from './Navigation';
import { HeroSection } from './HeroSection';
import { CategoryCard } from './CategoryCard';
import { MachineryCard } from './MachineryCard';
import { MachineDetailModal } from './MachineDetailModal';
import { BookingModal } from './BookingModal';
import { AdminDashboard } from './AdminDashboard';
import { TrustBadges } from './TrustBadges';
import { BrandCarousel } from './BrandCarousel';
import { Footer } from './Footer';
import { supabase } from '../lib/supabase';
import { Machine, BookingRequest, Category } from '../types';

const AppLayout: React.FC = () => {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [showMachineDetail, setShowMachineDetail] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [machinery, setMachinery] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  
  const categoriesRef = useRef<HTMLDivElement>(null);
  const hireRef = useRef<HTMLDivElement>(null);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch machinery from Supabase
  useEffect(() => {
    const fetchMachinery = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('machinery')
          .select('*')
          .order('featured', { ascending: false })
          .order('name');

        if (selectedCategory) {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        
        // Transform snake_case to camelCase
        const transformedData = (data || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          image: item.image,
          dailyRate: item.daily_rate,
          weeklyRate: item.weekly_rate,
          monthlyRate: item.monthly_rate,
          description: item.description,
          specifications: item.specifications,
          featured: item.featured
        }));
        
        setMachinery(transformedData);
      } catch (error) {
        console.error('Error fetching machinery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachinery();
  }, [selectedCategory]);

  // Fetch bookings from Supabase
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Transform snake_case to camelCase
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
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const displayedMachinery = machinery;

  const handleMachineClick = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowMachineDetail(true);
  };

  const handleBookNow = () => {
    setShowMachineDetail(false);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    try {
      // Transform camelCase to snake_case for Supabase
      const bookingData = {
        machine_id: booking.machineId,
        machine_name: booking.machineName,
        customer_name: booking.customerName,
        company: booking.company,
        phone: booking.phone,
        email: booking.email,
        job_site: booking.jobSite,
        start_date: booking.startDate,
        end_date: booking.endDate,
        delivery_option: booking.deliveryOption,
        extras: booking.extras,
        notes: booking.notes,
        status: 'pending',
        total_cost: booking.totalCost
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select();

      if (error) throw error;

      // Transform the response back to camelCase
      if (data && data[0]) {
        const newBooking: BookingRequest = {
          id: data[0].id,
          machineId: data[0].machine_id,
          machineName: data[0].machine_name,
          customerName: data[0].customer_name,
          company: data[0].company,
          phone: data[0].phone,
          email: data[0].email,
          jobSite: data[0].job_site,
          startDate: data[0].start_date,
          endDate: data[0].end_date,
          deliveryOption: data[0].delivery_option,
          extras: data[0].extras,
          notes: data[0].notes,
          status: data[0].status,
          totalCost: data[0].total_cost,
          createdAt: data[0].created_at
        };
        
        setBookings([newBooking, ...bookings]);
      }

      alert('Booking request submitted! We will contact you shortly.');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking. Please try again.');
    }
  };

  const handleUpdateStatus = async (id: string, status: 'approved' | 'declined') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
      alert(`Booking ${status}! Email notification sent.`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('There was an error updating the booking status.');
    }
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHire = () => {
    setShowBookingModal(true);
  };

  if (showAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation onAdminClick={() => setShowAdmin(false)} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button onClick={() => setShowAdmin(false)} className="mb-4 text-[#EB8B1D] hover:underline">← Back to Site</button>
          <AdminDashboard bookings={bookings} onUpdateStatus={handleUpdateStatus} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onAdminClick={() => setShowAdmin(true)} />
      <HeroSection onBrowseClick={scrollToCategories} onHireClick={scrollToHire} />
      <TrustBadges />
      <BrandCarousel />

      <section id="categories" ref={categoriesRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#1A1A1A] mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onClick={() => {
                  setSelectedCategory(category.id);
                  hireRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="featured" ref={hireRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-[#1A1A1A]">
              {selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.name}` : 'All Machinery'}
            </h2>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} className="text-[#EB8B1D] hover:underline">View All</button>
            )}
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading machinery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedMachinery.map(machine => (
                <MachineryCard key={machine.id} machine={machine} onClick={() => handleMachineClick(machine)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <MachineDetailModal 
        machine={selectedMachine} 
        isOpen={showMachineDetail} 
        onClose={() => setShowMachineDetail(false)}
        onBookNow={handleBookNow}
      />

      <BookingModal 
        machine={selectedMachine || undefined}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default AppLayout;