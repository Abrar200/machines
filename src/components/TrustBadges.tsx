import React from 'react';
import { Shield, Truck, Award, Headphones } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    { 
      Icon: Shield, 
      title: 'Fully Insured', 
      description: 'Comprehensive coverage on all equipment',
      bgColor: 'bg-orange-50',
      iconColor: 'text-[#EB8B1D]'
    },
    { 
      Icon: Truck, 
      title: 'Same-Day Delivery', 
      description: 'Fast turnaround across Adelaide',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      Icon: Award, 
      title: 'Premium Equipment', 
      description: 'Well-maintained, reliable machinery',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      Icon: Headphones, 
      title: '24/7 Support', 
      description: 'Always here when you need us',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A1A1A] mb-4">
          Why Choose Elite Machine Hire?
        </h2>
        <p className="text-center text-[#BFBFBF] mb-12 text-lg">
          Adelaide's trusted partner for premium machinery hire
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, idx) => (
            <div 
              key={idx} 
              className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 ${badge.bgColor} rounded-full mb-4`}>
                <badge.Icon className={`w-10 h-10 ${badge.iconColor}`} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{badge.title}</h3>
              <p className="text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
