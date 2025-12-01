import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle, Button, Input, Badge } from '../components/UI';
import { ArrowRight, Star, Clock, Users, Quote, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { api } from '../services/data';
import { useStore } from '../context/StoreContext';

const REVIEWS = [
  {
    id: 1,
    name: "Arjun Malhotra",
    role: "Food Critic",
    text: "The Galouti Kebabs here are arguably the best in the city. The texture is incredibly smooth, and the spice blend is a secret I wish I knew. A true royal feast that takes you back in time.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Travel Vlogger",
    text: "I stumbled upon Sufiyana Darbar during my trip to Delhi. The ambiance perfectly captures the Mughal era. The staff was so welcoming and the Biryani was flavorful and authentic.",
    rating: 5
  },
  {
    id: 3,
    name: "Vikram Rathore",
    role: "Regular Guest",
    text: "We celebrated our anniversary here. The banquet team decorated the table beautifully. The Mutton Rogan Josh is a must-try. Highly recommended for special occasions!",
    rating: 4
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Event Planner",
    text: "Hosted a corporate dinner at their banquet hall. The service was impeccable, and the guests couldn't stop praising the food. Professionalism at its best.",
    rating: 5
  }
];

export const Home: React.FC = () => {
  const { menu, addToCart } = useStore();
  const [resData, setResData] = useState({ name: '', phone: '', email: '', date: '', time: '', guests: 2 });
  const [resStatus, setResStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [activeReview, setActiveReview] = useState(0);

  // Filter popular items (Chef Special)
  const popularItems = menu.filter(item => item.isChefSpecial).slice(0, 4);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextReview = () => setActiveReview((prev) => (prev + 1) % REVIEWS.length);
  const prevReview = () => setActiveReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setResStatus('submitting');
    await api.createReservation(resData);
    setResStatus('success');
  };

  const scrollToReservation = () => {
    const section = document.getElementById('reservation');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover"
          />
          {/* Darker overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gold-400 mb-2 drop-shadow-xl">
            Sufiyana Darbar
          </h1>
          <p className="text-lg md:text-xl text-gray-300 uppercase tracking-[0.3em] mb-8">
            Restaurant & Banquet
          </p>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
            Where Royal Heritage Meets Culinary Excellence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/menu">
              <Button className="w-full sm:w-auto text-lg py-3 px-8 shadow-gold-500/20">
                View Menu
              </Button>
            </Link>
            <Button 
              onClick={scrollToReservation}
              variant="outline" 
              className="w-full sm:w-auto text-lg py-3 px-8 border-gold-400 text-gold-100 hover:bg-gold-400 hover:text-royal-900 bg-royal-900/40 backdrop-blur-sm"
            >
              Book a Table
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-white shadow-lg rounded-lg border border-gold-100 hover:-translate-y-1 transition-transform duration-300">
            <Star className="w-12 h-12 text-gold-500 mx-auto mb-6" />
            <h3 className="text-xl font-serif font-bold mb-3 text-royal-800">Authentic Flavors</h3>
            <p className="text-gray-600 leading-relaxed">Recipes passed down through generations of royal chefs, preserving the true essence of Mughal cuisine.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg border border-gold-100 hover:-translate-y-1 transition-transform duration-300">
            <Users className="w-12 h-12 text-gold-500 mx-auto mb-6" />
            <h3 className="text-xl font-serif font-bold mb-3 text-royal-800">Royal Banquet</h3>
            <p className="text-gray-600 leading-relaxed">Luxurious space equipped for weddings, parties, and corporate events with capacity for 200+ guests.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg border border-gold-100 hover:-translate-y-1 transition-transform duration-300">
            <Clock className="w-12 h-12 text-gold-500 mx-auto mb-6" />
            <h3 className="text-xl font-serif font-bold mb-3 text-royal-800">Open Late</h3>
            <p className="text-gray-600 leading-relaxed">Serving royal delicacies until midnight on weekends. The perfect spot for late-night cravings.</p>
          </div>
        </div>
      </section>

      {/* Popular Items - Royal Signatures */}
      {popularItems.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle title="Royal Signatures" subtitle="Our most beloved culinary masterpieces selected by our Head Chef." center />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularItems.map((item) => (
                <div key={item.id} className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 right-2">
                       <Badge color="yellow">Chef Special</Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif font-bold text-lg text-royal-800 line-clamp-1">{item.name}</h4>
                      <span className="font-bold text-gold-600">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{item.description}</p>
                    <Button onClick={() => addToCart(item)} className="w-full gap-2 text-sm mt-auto">
                      <ShoppingBag className="w-4 h-4" /> Add to Feast
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/menu">
                <Button variant="outline" className="px-8 border-royal-800 text-royal-800 hover:bg-royal-800 hover:text-gold-100">
                  View Full Menu
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Carousel */}
      <section className="py-20 bg-royal-800 text-gold-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arches.png')]"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <SectionTitle title="Guest Reviews" subtitle="What our patrons say about us" center />
          
          <div className="mt-10 min-h-[300px] flex flex-col items-center justify-center">
            <Quote className="w-12 h-12 text-gold-500 mb-6 opacity-50" />
            
            <div key={activeReview} className="animate-fade-in">
              <p className="text-xl md:text-2xl font-serif italic leading-relaxed mb-8 max-w-3xl mx-auto">
                "{REVIEWS[activeReview].text}"
              </p>
              
              <div className="flex items-center justify-center gap-1 mb-3">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`w-5 h-5 ${i < REVIEWS[activeReview].rating ? 'text-gold-400 fill-current' : 'text-royal-700'}`} />
                 ))}
              </div>
              
              <h4 className="text-lg font-bold text-white">{REVIEWS[activeReview].name}</h4>
              <p className="text-sm text-gold-400/80 uppercase tracking-widest text-xs mt-1">{REVIEWS[activeReview].role}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button 
              onClick={prevReview} 
              className="p-2 rounded-full border border-gold-500/30 hover:bg-gold-500 hover:text-royal-900 transition-colors focus:outline-none"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activeReview ? 'bg-gold-400 w-8' : 'bg-royal-600 w-2 hover:bg-gold-600'}`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextReview} 
              className="p-2 rounded-full border border-gold-500/30 hover:bg-gold-500 hover:text-royal-900 transition-colors focus:outline-none"
              aria-label="Next Review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-24 bg-white text-gray-800 relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <SectionTitle 
            title="Reserve Your Table" 
            subtitle="Experience the grandeur of Sufiyana Darbar. Reservations recommended for dinner."
            center
          />
          
          {resStatus === 'success' ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-10 rounded-lg text-center shadow-xl">
              <h3 className="text-3xl font-serif font-bold mb-4">Reservation Requested!</h3>
              <p className="text-lg mb-6">We have received your request. We will confirm via phone shortly.</p>
              <Button className="mt-2" onClick={() => setResStatus('idle')}>Make Another</Button>
            </div>
          ) : (
            <form onSubmit={handleReservation} className="bg-stone-50 p-8 md:p-10 rounded-xl shadow-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Name" required 
                  value={resData.name} 
                  onChange={e => setResData({...resData, name: e.target.value})}
                  placeholder="Your Full Name"
                />
                <Input 
                  label="Phone Number" type="tel" required 
                  value={resData.phone} 
                  onChange={e => setResData({...resData, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                />
                <Input 
                  label="Email" type="email" required 
                  value={resData.email} 
                  onChange={e => setResData({...resData, email: e.target.value})}
                  placeholder="email@example.com"
                />
                <Input 
                  label="Number of Guests" type="number" min="1" max="20" required 
                  value={resData.guests} 
                  onChange={e => setResData({...resData, guests: parseInt(e.target.value)})}
                />
                <Input 
                  label="Date" type="date" required 
                  value={resData.date} 
                  onChange={e => setResData({...resData, date: e.target.value})}
                />
                <Input 
                  label="Time" type="time" required 
                  value={resData.time} 
                  onChange={e => setResData({...resData, time: e.target.value})}
                />
              </div>
              <div className="mt-8 text-center">
                <Button type="submit" className="w-full md:w-2/3 mx-auto text-lg py-3" isLoading={resStatus === 'submitting'}>
                  Confirm Reservation
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
