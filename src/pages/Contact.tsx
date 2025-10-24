import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onAdminClick={() => {}} />
      
      <div className="pt-20 pb-16 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl opacity-90">Get in touch for machinery hire inquiries</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#EB8B1D] text-white p-3 rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-gray-700">0414 236 306</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#EB8B1D] text-white p-3 rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-700">info@elitemachinehire.com.au</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#EB8B1D] text-white p-3 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-gray-700">103 Globe Derby Drive<br/>Globe Derby, Adelaide, SA</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#EB8B1D] text-white p-3 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Hours</h3>
                  <p className="text-gray-700">Mon-Fri: 7am - 5pm<br/>Sat & Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">Send a Message</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-lg border" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-lg border" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <textarea placeholder="Your Message" rows={5} required className="w-full px-4 py-3 rounded-lg border" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                <button type="submit" className="w-full bg-[#EB8B1D] text-white py-3 rounded-lg font-bold hover:bg-[#d67a15] transition">
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;