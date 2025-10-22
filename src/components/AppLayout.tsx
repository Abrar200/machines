import React, { useState, useRef } from 'react';
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

import { categories } from '../data/categories';
import { machinery } from '../data/machinery';
import { machineryExtended } from '../data/machineryExtended';
import { otherMachinery } from '../data/otherMachinery';

import { Machine, BookingRequest } from '../types';

const AppLayout: React.FC = () => {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [showMachineDetail, setShowMachineDetail] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categoriesRef = useRef<HTMLDivElement>(null);
  const hireRef = useRef<HTMLDivElement>(null);

  const allMachinery = [...machinery, ...machineryExtended, ...otherMachinery];

  
  const displayedMachinery = selectedCategory 
    ? allMachinery.filter(m => m.category === selectedCategory)
    : allMachinery;

  const handleMachineClick = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowMachineDetail(true);
  };

  const handleBookNow = () => {
    setShowMachineDetail(false);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: BookingRequest = {
      ...booking,
      id: `REQ-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookings([...bookings, newBooking]);
    alert('Booking request submitted! We will contact you shortly.');
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'declined') => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    alert(`Booking ${status}! Email notification sent.`);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedMachinery.map(machine => (
              <MachineryCard key={machine.id} machine={machine} onClick={() => handleMachineClick(machine)} />
            ))}
          </div>
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
