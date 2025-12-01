import React from 'react';
import { SectionTitle } from '../components/UI';

export const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
       {/* Hero/Header for About */}
       <div className="bg-royal-900 py-20 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]"></div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gold-400 relative z-10 mb-4">Our Heritage</h1>
          <p className="text-gold-100 relative z-10 text-lg">Preserving the Legacy of Mughal Cuisine</p>
       </div>

       <div className="max-w-6xl mx-auto px-4 py-16 space-y-24">
          {/* Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="relative">
                <div className="absolute top-4 left-4 w-full h-full border-2 border-gold-400 rounded-lg -z-10 transform translate-x-2 translate-y-2"></div>
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop" 
                  alt="Chef cooking" 
                  className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                />
             </div>
             <div>
                <SectionTitle title="A Culinary Journey" subtitle="" />
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                   Established with a passion to revive the lost recipes of the Mughal era, <strong>Sufiyana Darbar</strong> is a tribute to the royal kitchens of India. Our journey began three decades ago in the narrow lanes of Old Delhi, where our founders mastered the art of slow-cooked curries and charcoal-grilled kebabs.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                   Today, we bring that authentic taste to a modern fine-dining setting. Every spice is hand-picked, every sauce is simmered for hours, and every dish tells a story of tradition and royalty.
                </p>
             </div>
          </div>

          {/* Banquet Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
             <div className="md:order-2 relative">
                <div className="absolute bottom-4 right-4 w-full h-full border-2 border-royal-800 rounded-lg -z-10 transform -translate-x-2 -translate-y-2"></div>
                <img 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop" 
                  alt="Banquet Hall" 
                  className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                />
             </div>
             <div className="md:order-1">
                <SectionTitle title="The Royal Banquet" subtitle="" />
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                   Our banquet hall is designed to host your special moments with grandeur. Whether it's a wedding reception, a corporate gala, or an intimate family gathering, our dedicated team ensures an impeccable experience.
                </p>
                <ul className="space-y-4 mt-6 text-gray-700">
                   <li className="flex items-center gap-3 bg-white p-3 rounded shadow-sm border border-gold-100">
                     <span className="text-gold-500 text-xl">✦</span> 
                     <span>Capacity for up to <strong>200 guests</strong></span>
                   </li>
                   <li className="flex items-center gap-3 bg-white p-3 rounded shadow-sm border border-gold-100">
                     <span className="text-gold-500 text-xl">✦</span> 
                     <span>Customized catering menus</span>
                   </li>
                   <li className="flex items-center gap-3 bg-white p-3 rounded shadow-sm border border-gold-100">
                     <span className="text-gold-500 text-xl">✦</span> 
                     <span>Premium decor and service</span>
                   </li>
                </ul>
             </div>
          </div>
       </div>
    </div>
  );
};