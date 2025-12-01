import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Button, Input, Badge } from '../components/UI';
import { api } from '../services/data';
import { Order, MenuItem, OrderStatus, Category, Reservation, Stats } from '../types';
import { Edit2, Trash2, CheckCircle, XCircle, Plus, Power, ToggleLeft, ToggleRight } from 'lucide-react';

// --- SUB-COMPONENTS ---

const MenuManagement: React.FC = () => {
  const { menu, refreshMenu } = useStore();
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    // Simple validation
    if (!editingItem.name || !editingItem.price) return alert("Name and Price required");

    const itemToSave = {
        ...editingItem,
        id: editingItem.id || `m-${Date.now()}`,
        inStock: editingItem.inStock ?? true,
        category: editingItem.category || Category.STARTERS
    } as MenuItem;

    await api.updateMenuItem(itemToSave);
    setEditingItem(null);
    refreshMenu();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await api.deleteMenuItem(id);
      refreshMenu();
    }
  };

  const toggleStock = async (item: MenuItem) => {
    const updated = { ...item, inStock: !item.inStock };
    await api.updateMenuItem(updated);
    refreshMenu();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-royal-800">Menu Items</h2>
        <Button onClick={() => setEditingItem({})}><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSave} className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-royal-800">{editingItem.id ? 'Edit Item' : 'New Menu Item'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Name" value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} required placeholder="e.g. Shahi Paneer" />
              <Input label="Price (₹)" type="number" value={editingItem.price || ''} onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})} required />
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium mb-1">Category</label>
                 <select 
                   className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-royal-800 outline-none" 
                   value={editingItem.category || Category.STARTERS}
                   onChange={e => setEditingItem({...editingItem, category: e.target.value as Category})}
                 >
                   {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
              </div>
              <div className="md:col-span-2">
                  <Input label="Image URL" value={editingItem.imageUrl || ''} onChange={e => setEditingItem({...editingItem, imageUrl: e.target.value})} placeholder="https://..." />
              </div>
              <div className="md:col-span-2">
                  <Input label="Description" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
              </div>
              
              <div className="flex gap-6 mt-2 md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                  <input type="checkbox" checked={editingItem.inStock ?? true} onChange={e => setEditingItem({...editingItem, inStock: e.target.checked})} className="w-4 h-4 text-royal-800" />
                  <span className="font-medium">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                  <input type="checkbox" checked={editingItem.isVegetarian ?? false} onChange={e => setEditingItem({...editingItem, isVegetarian: e.target.checked})} className="w-4 h-4 text-royal-800" />
                  <span className="font-medium">Vegetarian</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                  <input type="checkbox" checked={editingItem.isChefSpecial ?? false} onChange={e => setEditingItem({...editingItem, isChefSpecial: e.target.checked})} className="w-4 h-4 text-royal-800" />
                  <span className="font-medium">Chef Special</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
              <Button type="submit">Save Item</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {menu.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                 <td className="px-4 py-2">
                    <img src={item.imageUrl} alt="" className="w-10 h-10 rounded object-cover bg-gray-200" />
                 </td>
                <td className="px-4 py-3 font-medium text-royal-900">{item.name}</td>
                <td className="px-4 py-3 text-gray-500">{item.category}</td>
                <td className="px-4 py-3 font-medium">₹{item.price}</td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => toggleStock(item)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${item.inStock ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                    title="Click to toggle stock"
                  >
                    {item.inStock ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => setEditingItem(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                      <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete">
                      <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 10000); // Polling
    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    const data = await api.getOrders();
    // Sort by newest first
    setOrders(data.sort((a,b) => b.createdAt - a.createdAt));
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    await api.updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-royal-800 mb-6">Orders</h2>
      <div className="grid gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded shadow border-l-4 border-royal-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">#{order.id.slice(-4)}</span>
                <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
                <Badge color={order.status === 'New' ? 'green' : 'gray'}>{order.status}</Badge>
              </div>
              <p className="text-sm font-medium">{order.customerName} ({order.customerPhone})</p>
              <div className="text-sm text-gray-600 mt-1">
                {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
              </div>
              <p className="font-bold text-royal-800 mt-1">Total: ₹{order.total}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {order.status === OrderStatus.NEW && (
                <Button size="sm" onClick={() => updateStatus(order.id, OrderStatus.PREPARING)}>Start Preparing</Button>
              )}
              {order.status === OrderStatus.PREPARING && (
                <Button size="sm" onClick={() => updateStatus(order.id, OrderStatus.READY)}>Mark Ready</Button>
              )}
              {order.status === OrderStatus.READY && (
                <Button size="sm" onClick={() => updateStatus(order.id, OrderStatus.COMPLETED)}>Complete</Button>
              )}
              {order.status !== OrderStatus.CANCELLED && order.status !== OrderStatus.COMPLETED && (
                <Button size="sm" variant="danger" onClick={() => updateStatus(order.id, OrderStatus.CANCELLED)}>Cancel</Button>
              )}
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-gray-500">No active orders.</p>}
      </div>
    </div>
  );
};

const ReservationManagement: React.FC = () => {
  const [res, setRes] = useState<Reservation[]>([]);

  useEffect(() => {
    api.getReservations().then(setRes);
  }, []);

  const handleAction = async (id: string, status: 'confirmed' | 'declined') => {
    await api.updateReservationStatus(id, status);
    setRes(await api.getReservations());
  };

  return (
     <div>
      <h2 className="text-2xl font-bold text-royal-800 mb-6">Reservations</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Date/Time</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Guests</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {res.map(r => (
              <tr key={r.id} className="border-b">
                <td className="p-3">{r.date} at {r.time}</td>
                <td className="p-3">{r.name}<br/><span className="text-xs text-gray-500">{r.phone}</span></td>
                <td className="p-3">{r.guests}</td>
                <td className="p-3">
                  <Badge color={r.status === 'confirmed' ? 'green' : r.status === 'declined' ? 'red' : 'yellow'}>
                    {r.status}
                  </Badge>
                </td>
                <td className="p-3 flex gap-2">
                  {r.status === 'pending' && (
                    <>
                      <button onClick={() => handleAction(r.id, 'confirmed')} className="text-green-600"><CheckCircle className="w-5 h-5"/></button>
                      <button onClick={() => handleAction(r.id, 'declined')} className="text-red-600"><XCircle className="w-5 h-5"/></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     </div>
  );
};

// --- MAIN ADMIN PAGE ---

export const AdminPage: React.FC = () => {
  const { isAdmin, loginAdmin, logoutAdmin } = useStore();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'orders' | 'res'>('dashboard');
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (isAdmin && activeTab === 'dashboard') {
        api.getStats().then(setStats);
    }
  }, [isAdmin, activeTab]);

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-royal-800">
          <h2 className="text-2xl font-serif font-bold text-center mb-6 text-royal-800">Admin Login</h2>
          <form onSubmit={(e) => { 
              e.preventDefault(); 
              if(!loginAdmin(email, pass)) {
                  alert('Invalid Credentials. Please check your email and password.');
              }
            }} className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="techarijit64@gmail.com" />
            <Input label="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="********" />
            <Button type="submit" className="w-full">Login to Dashboard</Button>
            <p className="text-xs text-center text-gray-500 mt-4">Restricted Access: Authorized Personnel Only</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-royal-900 text-gold-100 flex-shrink-0">
        <div className="p-6 font-bold text-xl border-b border-royal-700 flex items-center gap-2">
           <Power className="w-5 h-5 text-gold-500"/> Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`block w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'dashboard' ? 'bg-royal-800 text-white' : 'hover:bg-royal-800/50'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('orders')} className={`block w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'orders' ? 'bg-royal-800 text-white' : 'hover:bg-royal-800/50'}`}>Orders</button>
          <button onClick={() => setActiveTab('menu')} className={`block w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'menu' ? 'bg-royal-800 text-white' : 'hover:bg-royal-800/50'}`}>Menu Management</button>
          <button onClick={() => setActiveTab('res')} className={`block w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'res' ? 'bg-royal-800 text-white' : 'hover:bg-royal-800/50'}`}>Reservations</button>
          <button onClick={logoutAdmin} className="block w-full text-left px-4 py-2 rounded text-red-300 hover:bg-royal-800 mt-8">Logout</button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-grow p-4 md:p-8 overflow-y-auto h-screen">
        {activeTab === 'dashboard' && stats && (
          <div className="animate-fade-in">
             <h2 className="text-3xl font-bold text-royal-800 mb-8">Dashboard Overview</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-white p-6 rounded shadow border-l-4 border-gold-500">
                 <p className="text-gray-500 text-sm uppercase tracking-wide">Total Orders</p>
                 <p className="text-4xl font-bold text-royal-900">{stats.totalOrders}</p>
               </div>
               <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
                 <p className="text-gray-500 text-sm uppercase tracking-wide">Revenue (Est)</p>
                 <p className="text-4xl font-bold text-royal-900">₹{stats.totalRevenue}</p>
               </div>
             </div>
             <div className="bg-white p-6 rounded shadow">
               <h3 className="font-bold mb-4 text-xl border-b pb-2">Top Selling Items</h3>
               <ul>
                 {stats.topItems.map((item, i) => (
                   <li key={i} className="flex justify-between py-3 border-b last:border-0 hover:bg-gray-50 px-2">
                     <span className="font-medium text-gray-700">{item.name}</span>
                     <span className="font-bold text-royal-800">{item.count} sold</span>
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        )}
        {activeTab === 'menu' && <MenuManagement />}
        {activeTab === 'orders' && <OrderManagement />}
        {activeTab === 'res' && <ReservationManagement />}
      </div>
    </div>
  );
};