import React from 'react';
import { SectionTitle, Button, Input } from '../components/UI';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-royal-900 py-20 text-center text-white relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]"></div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gold-400 relative z-10 mb-4">Contact Us</h1>
          <p className="text-gold-100 relative z-10 text-lg">We'd Love To Hear From You</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
           {/* Info */}
           <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-serif font-bold text-royal-800 mb-4">Get in Touch</h2>
                <p className="text-gray-600 text-lg">We are always happy to hear from our guests. Whether you have a question about our menu, need assistance with a reservation, or want to plan an event, our team is here to help.</p>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                   <div className="bg-gold-100 p-4 rounded-full text-royal-800 shrink-0"><MapPin className="w-6 h-6"/></div>
                   <div>
                      <h4 className="font-bold text-royal-800 text-xl mb-1">Address</h4>
                      <p className="text-gray-600">123 Royal Heritage Road,<br/>Connaught Place, New Delhi, India 110001</p>
                   </div>
                </div>
                
                <div className="flex items-start gap-6">
                   <div className="bg-gold-100 p-4 rounded-full text-royal-800 shrink-0"><Phone className="w-6 h-6"/></div>
                   <div>
                      <h4 className="font-bold text-royal-800 text-xl mb-1">Phone</h4>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-gray-600">+91 11 2345 6789</p>
                   </div>
                </div>

                <div className="flex items-start gap-6">
                   <div className="bg-gold-100 p-4 rounded-full text-royal-800 shrink-0"><Mail className="w-6 h-6"/></div>
                   <div>
                      <h4 className="font-bold text-royal-800 text-xl mb-1">Email</h4>
                      <p className="text-gray-600">reservations@sufiyanadarbar.com</p>
                      <p className="text-gray-600">events@sufiyanadarbar.com</p>
                   </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-lg h-80 border-2 border-gold-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0649231718!2d77.21772131508246!3d28.62779398241967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Google Map"
                ></iframe>
              </div>
           </div>

           {/* Form */}
           <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl border-t-4 border-gold-500 h-fit">
              <h3 className="text-2xl font-serif font-bold text-royal-800 mb-6">Send Message</h3>
              <form className="space-y-5" onSubmit={(e) => {e.preventDefault(); alert('Message sent! We will contact you soon.'); }}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Name" required placeholder="Your Name" />
                    <Input label="Phone" placeholder="Mobile Number" />
                 </div>
                 <Input label="Email" type="email" required placeholder="your@email.com" />
                 <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-royal-800 focus:border-transparent bg-white">
                       <option>General Inquiry</option>
                       <option>Reservation Help</option>
                       <option>Private Event / Banquet</option>
                       <option>Feedback</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea 
                      rows={6} 
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-royal-800 focus:border-transparent resize-none" 
                      required
                      placeholder="How can we help you?"
                    ></textarea>
                 </div>
                 <Button type="submit" className="w-full text-lg py-3">Send Message</Button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};