
import { MenuItem, Category, Order, Reservation, OrderStatus, Stats } from '../types';

// --- SEED DATA ---
export const SEED_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Sufiyana Special Galouti Kebab',
    description: 'Melt-in-your-mouth minced lamb patties seasoned with 132 spices, served on ulte tawe ka paratha.',
    price: 450,
    category: Category.KEBABS,
    imageUrl: 'https://picsum.photos/id/1060/500/500', 
    isVegetarian: false,
    isSpicy: true,
    isChefSpecial: true,
    inStock: true,
    allergens: ['Nutmeg', 'Cashew'],
    calories: 320
  },
  {
    id: 'm2',
    name: 'Paneer Tikka Zaffrani',
    description: 'Cottage cheese cubes marinated in saffron, yogurt and cream, grilled in tandoor.',
    price: 320,
    category: Category.STARTERS,
    imageUrl: 'https://picsum.photos/id/1080/500/500',
    isVegetarian: true,
    isSpicy: false,
    isChefSpecial: false,
    inStock: true,
    allergens: ['Dairy'],
    calories: 280
  },
  {
    id: 'm3',
    name: 'Royal Murgh Biryani',
    description: 'Long grain basmati rice cooked with chicken marinated in secret royal spices (Dum style).',
    price: 380,
    category: Category.BIRYANI,
    imageUrl: 'https://picsum.photos/id/111/500/500',
    isVegetarian: false,
    isSpicy: true,
    isChefSpecial: true,
    inStock: true,
    calories: 450
  },
  {
    id: 'm4',
    name: 'Dal Sufiyana (Dal Makhani)',
    description: 'Black lentils slow-cooked overnight with tomatoes, cream and butter.',
    price: 290,
    category: Category.CURRIES,
    imageUrl: 'https://picsum.photos/id/112/500/500',
    isVegetarian: true,
    isSpicy: false,
    isChefSpecial: true,
    inStock: true,
    allergens: ['Dairy'],
    calories: 350
  },
  {
    id: 'm5',
    name: 'Shahi Tukda',
    description: 'Fried bread slices soaked in saffron milk and topped with rabri and nuts.',
    price: 180,
    category: Category.DESSERTS,
    imageUrl: 'https://picsum.photos/id/113/500/500',
    isVegetarian: true,
    isSpicy: false,
    isChefSpecial: false,
    inStock: false, 
    allergens: ['Dairy', 'Nuts', 'Gluten'],
    calories: 400
  },
  {
    id: 'm6',
    name: 'Rose Sherbet',
    description: 'Refreshing traditional rose flavored drink with basil seeds.',
    price: 120,
    category: Category.DRINKS,
    imageUrl: 'https://picsum.photos/id/114/500/500',
    isVegetarian: true,
    isSpicy: false,
    isChefSpecial: false,
    inStock: true,
    calories: 120
  },
  {
    id: 'm7',
    name: 'Mutton Rogan Josh',
    description: 'Aromatic lamb curry with vibrant red color derived from Kashmiri chili.',
    price: 550,
    category: Category.CURRIES,
    imageUrl: 'https://picsum.photos/id/115/500/500',
    isVegetarian: false,
    isSpicy: true,
    isChefSpecial: false,
    inStock: true,
    calories: 500
  },
  {
    id: 'm8',
    name: 'Subz Biryani',
    description: 'A medley of seasonal vegetables cooked with aromatic basmati rice.',
    price: 310,
    category: Category.BIRYANI,
    imageUrl: 'https://picsum.photos/id/116/500/500',
    isVegetarian: true,
    isSpicy: false,
    isChefSpecial: false,
    inStock: true,
    calories: 300
  }
];

// Helper for safe local storage
const getLocalStorage = <T>(key: string, initial: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return initial;
    const parsed = JSON.parse(item);
    // Ensure we don't return null if the stored string was "null"
    return parsed === null ? initial : parsed;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return initial;
  }
};

const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage`, e);
  }
};

export const api = {
  // Menu
  getMenu: async (): Promise<MenuItem[]> => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    const stored = getLocalStorage<MenuItem[]>('menu', []);
    if (!stored || stored.length === 0) {
        setLocalStorage('menu', SEED_MENU);
        return SEED_MENU;
    }
    return stored;
  },

  updateMenuItem: async (item: MenuItem): Promise<void> => {
    await new Promise(r => setTimeout(r, 500));
    const menu = getLocalStorage<MenuItem[]>('menu', SEED_MENU);
    const index = menu.findIndex(i => i.id === item.id);
    if (index >= 0) {
      menu[index] = item;
    } else {
      menu.push(item);
    }
    setLocalStorage('menu', menu);
  },

  deleteMenuItem: async (id: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 300));
    let menu = getLocalStorage<MenuItem[]>('menu', SEED_MENU);
    menu = menu.filter(i => i.id !== id);
    setLocalStorage('menu', menu);
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    return getLocalStorage<Order[]>('orders', []);
  },

  createOrder: async (orderPart: Partial<Order>): Promise<Order> => {
    await new Promise(r => setTimeout(r, 800));
    const orders = getLocalStorage<Order[]>('orders', []);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      createdAt: Date.now(),
      status: OrderStatus.NEW,
      customerName: orderPart.customerName || 'Guest',
      customerPhone: orderPart.customerPhone || '',
      items: orderPart.items || [],
      total: orderPart.total || 0,
      paymentMethod: orderPart.paymentMethod || 'cod'
    };
    orders.push(newOrder);
    setLocalStorage('orders', orders);
    return newOrder;
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<void> => {
    const orders = getLocalStorage<Order[]>('orders', []);
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      setLocalStorage('orders', orders);
    }
  },

  // Reservations
  getReservations: async (): Promise<Reservation[]> => {
    return getLocalStorage<Reservation[]>('reservations', []);
  },

  createReservation: async (res: Partial<Reservation>): Promise<void> => {
    await new Promise(r => setTimeout(r, 800));
    const reservations = getLocalStorage<Reservation[]>('reservations', []);
    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      createdAt: Date.now(),
      status: 'pending',
      name: res.name || '',
      email: res.email || '',
      phone: res.phone || '',
      date: res.date || '',
      time: res.time || '',
      guests: res.guests || 2,
      notes: res.notes
    };
    reservations.push(newRes);
    setLocalStorage('reservations', reservations);
  },

  updateReservationStatus: async (id: string, status: 'confirmed' | 'declined'): Promise<void> => {
    const reservations = getLocalStorage<Reservation[]>('reservations', []);
    const res = reservations.find(r => r.id === id);
    if (res) {
      res.status = status;
      setLocalStorage('reservations', reservations);
    }
  },

  // Stats
  getStats: async (): Promise<Stats> => {
    const orders = getLocalStorage<Order[]>('orders', []);
    // Safety check in case orders is somehow not an array
    const validOrders = Array.isArray(orders) ? orders : [];
    
    const completedOrders = validOrders.filter(o => o.status === OrderStatus.COMPLETED);
    
    const revenue = completedOrders.reduce((acc, o) => acc + (o.total || 0), 0);
    
    const itemCounts: Record<string, number> = {};
    validOrders.forEach(o => {
      if (o.items && Array.isArray(o.items)) {
        o.items.forEach(i => {
          if (i && i.name) {
            itemCounts[i.name] = (itemCounts[i.name] || 0) + (i.quantity || 1);
          }
        });
      }
    });

    const topItems = Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalOrders: validOrders.length,
      totalRevenue: revenue,
      topItems
    };
  }
};
