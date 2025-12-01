
export enum Category {
  STARTERS = 'Starters',
  KEBABS = 'Kebabs',
  BIRYANI = 'Biryani',
  CURRIES = 'Curries',
  DESSERTS = 'Desserts',
  DRINKS = 'Drinks'
}

export enum OrderStatus {
  NEW = 'New',
  PREPARING = 'Preparing',
  READY = 'Ready',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  isChefSpecial: boolean;
  inStock: boolean;
  allergens?: string[];
  calories?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number; // Timestamp
  paymentMethod: 'cod' | 'online';
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'declined';
  createdAt: number;
}

export interface Stats {
  totalOrders: number;
  totalRevenue: number;
  topItems: { name: string; count: number }[];
}
