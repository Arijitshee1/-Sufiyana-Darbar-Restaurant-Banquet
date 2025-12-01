import React, { useState } from 'react';
import { Button, Input } from '../components/UI';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { loginAdmin } = useStore(); 
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
        // Check for Admin Login first with specific credentials
        if (email === 'techarijit64@gmail.com') {
             if (loginAdmin(email, password)) {
                 navigate('/admin');
             } else {
                 alert('Invalid admin password');
             }
        } else {
             // Normal user login simulation
             alert('Logged in successfully!');
             navigate('/');
        }
    } else {
        alert('Registration successful! Please login.');
        setIsLogin(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/arches.png')] py-12">
       <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gold-500"></div>
          
          <div className="text-center mb-8">
             <h2 className="text-3xl font-serif font-bold text-royal-800">{isLogin ? 'Welcome Back' : 'Join the Family'}</h2>
             <p className="text-gray-500 mt-2">Sign in to manage your reservations and orders</p>
          </div>

          <div className="flex mb-6 border-b">
             <button 
               className={`flex-1 py-3 font-medium text-sm transition-colors ${isLogin ? 'text-royal-800 border-b-2 border-royal-800' : 'text-gray-400 hover:text-gray-600'}`}
               onClick={() => setIsLogin(true)}
             >
               Login
             </button>
             <button 
               className={`flex-1 py-3 font-medium text-sm transition-colors ${!isLogin ? 'text-royal-800 border-b-2 border-royal-800' : 'text-gray-400 hover:text-gray-600'}`}
               onClick={() => setIsLogin(false)}
             >
               Sign Up
             </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             {!isLogin && (
                <Input 
                   label="Full Name" 
                   value={name} 
                   onChange={e => setName(e.target.value)} 
                   required={!isLogin}
                   placeholder="John Doe"
                />
             )}
             <Input 
               label="Email Address" 
               type="email" 
               value={email} 
               onChange={e => setEmail(e.target.value)} 
               required 
               placeholder="you@example.com"
             />
             <Input 
               label="Password" 
               type="password" 
               value={password} 
               onChange={e => setPassword(e.target.value)} 
               required 
               placeholder="••••••••"
             />
             
             <Button type="submit" className="w-full mt-4 text-lg">
                {isLogin ? 'Sign In' : 'Create Account'}
             </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
             By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
       </div>
    </div>
  );
};