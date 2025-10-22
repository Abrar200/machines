import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation onAdminClick={() => {}} />
      
      <div className="pt-20 pb-16 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Elite Machine Hire</h1>
          <p className="text-xl opacity-90">Your trusted partner for premium machinery hire in Adelaide</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Who We Are</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Elite Machine Hire is Adelaide's premier machinery rental service, providing top-quality construction and landscaping equipment to contractors, builders, and homeowners since 2010. With over a decade of experience, we've built our reputation on reliability, quality equipment, and exceptional customer service.
          </p>

          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 mt-12">Our Mission</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We're committed to providing the best machinery hire experience in Adelaide. Our mission is to deliver premium equipment that's well-maintained, reliable, and available when you need it. We understand that downtime costs money, which is why we ensure every machine is serviced and ready to perform.
          </p>

          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 mt-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#EB8B1D] mb-3">Quality Equipment</h3>
              <p className="text-gray-700">All our machinery is regularly serviced and maintained to the highest standards.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#EB8B1D] mb-3">Fast Delivery</h3>
              <p className="text-gray-700">Quick delivery and pickup across Adelaide and surrounding areas.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#EB8B1D] mb-3">Competitive Rates</h3>
              <p className="text-gray-700">Transparent pricing with no hidden fees. Daily, weekend, and weekly rates available.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#EB8B1D] mb-3">Expert Support</h3>
              <p className="text-gray-700">Our team provides guidance on equipment selection and operation.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
