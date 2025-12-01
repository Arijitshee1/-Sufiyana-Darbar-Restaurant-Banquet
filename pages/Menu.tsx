import React, { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SectionTitle, Button, Badge } from '../components/UI';
import { Category, MenuItem } from '../types';
import { Filter, Search, Plus, Loader2 } from 'lucide-react';

const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const { addToCart, cart } = useStore();
  const inCart = cart.find(c => c.id === item.id);
  const [notify, setNotify] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 bg-gray-200">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" loading="lazy"/>
        <div className="absolute top-2 right-2 flex gap-1">
          {item.isChefSpecial && <Badge color="yellow">Chef Special</Badge>}
          {item.isSpicy && <Badge color="red">Spicy</Badge>}
        </div>
        {!item.inStock && (
           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
             <span className="bg-red-600 text-white px-3 py-1 font-bold transform -rotate-12">OUT OF STOCK</span>
           </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight">{item.name}</h3>
          <span className="text-lg font-bold text-royal-800">₹{item.price}</span>
        </div>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-grow">{item.description}</p>
        
        <div className="text-xs text-gray-400 mb-4 space-x-2">
           {item.isVegetarian ? 
             <span className="text-green-600 border border-green-600 px-1 rounded">VEG</span> : 
             <span className="text-red-600 border border-red-600 px-1 rounded">NON-VEG</span>
           }
           {item.calories && <span>{item.calories} kcal</span>}
        </div>

        <div className="mt-auto">
          {item.inStock ? (
            <Button 
              variant={inCart ? "secondary" : "primary"} 
              className="w-full text-sm"
              onClick={() => addToCart(item)}
            >
              {inCart ? `Add More (${inCart.quantity})` : 'Add to Cart'}
            </Button>
          ) : (
            <button 
              onClick={() => setNotify(true)}
              className="w-full text-sm text-royal-800 underline hover:text-gold-600"
              disabled={notify}
            >
              {notify ? "We'll notify you!" : "Notify me when available"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const MenuPage: React.FC = () => {
  const { menu, isLoadingMenu } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [filterType, setFilterType] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Object.values(Category)];

  const filteredMenu = useMemo(() => {
    return menu.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'all' 
        ? true 
        : filterType === 'veg' ? item.isVegetarian : !item.isVegetarian;
      
      return matchCat && matchSearch && matchType;
    });
  }, [menu, activeCategory, filterType, searchQuery]);

  if (isLoadingMenu) {
    return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-gold-500" /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SectionTitle title="Our Menu" subtitle="A curation of the finest Mughal recipes." center />

      {/* Controls */}
      <div className="mb-10 flex flex-col lg:flex-row gap-6 justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        
        {/* Categories (Mobile Scroll) */}
        <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
          <div className="flex space-x-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  activeCategory === cat 
                    ? 'bg-royal-800 text-gold-100' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-400 focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1 bg-gray-50">
            <button 
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded text-sm ${filterType === 'all' ? 'bg-white shadow text-royal-800' : 'text-gray-500'}`}
            >All</button>
            <button 
              onClick={() => setFilterType('veg')}
              className={`px-3 py-1.5 rounded text-sm ${filterType === 'veg' ? 'bg-white shadow text-green-700' : 'text-gray-500'}`}
            >Veg</button>
            <button 
              onClick={() => setFilterType('nonveg')}
              className={`px-3 py-1.5 rounded text-sm ${filterType === 'nonveg' ? 'bg-white shadow text-red-700' : 'text-gray-500'}`}
            >Non-Veg</button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredMenu.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMenu.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No dishes found matching your criteria.</p>
          <button onClick={() => {setSearchQuery(''); setActiveCategory('All');}} className="text-gold-600 underline mt-2">Clear filters</button>
        </div>
      )}
    </div>
  );
};